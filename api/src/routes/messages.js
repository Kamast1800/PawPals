import express from 'express';
import { body, param, validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import { supabase } from '../index.js';

const router = express.Router();

// Helper function to handle Supabase errors
const handleSupabaseError = (res, error) => {
  console.error('Supabase error:', error);
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    error: 'Database error',
    message: error.message,
  });
};

// Get all conversations for the current user
router.get('/conversations', async (req, res) => {
  try {
    // Get all matches where the user's dogs are involved
    const userDogIds = await getUserDogIds(req.user.id);
    
    // Get all matches where the user's dogs are involved
    const { data: matches, error: matchesError } = await supabase
      .from('matches')
      .select(`
        id,
        status,
        dog1:dog1_id(*, owner:owner_id(id, first_name, last_name, profile_image_url)),
        dog2:dog2_id(*, owner:owner_id(id, first_name, last_name, profile_image_url)),
        messages:messages!match_id(
          id,
          content,
          created_at,
          sender_id,
          read_at
        )
      `)
      .or(`dog1_id.in.(${userDogIds}),dog2_id.in.(${userDogIds})`)
      .order('created_at', { ascending: false, foreignTable: 'messages' });

    if (matchesError) throw matchesError;

    // Format the response to group messages by conversation
    const conversations = matches.map(match => {
      // Determine the other user's dog and profile
      const otherDog = match.dog1.owner.id === req.user.id ? match.dog2 : match.dog1;
      const currentUserDog = match.dog1.owner.id === req.user.id ? match.dog1 : match.dog2;
      
      // Get the last message
      const lastMessage = match.messages && match.messages.length > 0 
        ? match.messages[0] 
        : null;
      
      // Count unread messages
      const unreadCount = match.messages ? 
        match.messages.filter(msg => !msg.read_at && msg.sender_id !== req.user.id).length : 0;

      return {
        match_id: match.id,
        status: match.status,
        other_user: {
          id: otherDog.owner.id,
          first_name: otherDog.owner.first_name,
          last_name: otherDog.owner.last_name,
          profile_image_url: otherDog.owner.profile_image_url,
        },
        other_dog: {
          id: otherDog.id,
          name: otherDog.name,
          breed: otherDog.breed,
          age: otherDog.age,
          image_url: otherDog.image_urls ? otherDog.image_urls[0] : null,
        },
        my_dog: {
          id: currentUserDog.id,
          name: currentUserDog.name,
        },
        last_message: lastMessage ? {
          id: lastMessage.id,
          content: lastMessage.content,
          sent_at: lastMessage.created_at,
          is_from_me: lastMessage.sender_id === req.user.id,
          read: !!lastMessage.read_at,
        } : null,
        unread_count: unreadCount,
      };
    });
    
    return res.json(conversations || []);
  } catch (error) {
    return handleSupabaseError(res, error);
  }
});

// Get messages for a specific match/conversation
router.get(
  '/match/:matchId',
  [
    param('matchId').isUUID().withMessage('Invalid match ID format'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
    }

    try {
      // Verify the user is part of this match
      const userDogIds = await getUserDogIds(req.user.id);
      
      const { data: match, error: matchError } = await supabase
        .from('matches')
        .select('*')
        .eq('id', req.params.matchId)
        .or(`dog1_id.in.(${userDogIds}),dog2_id.in.(${userDogIds})`)
        .single();

      if (matchError) throw matchError;
      if (!match) {
        return res.status(StatusCodes.NOT_FOUND).json({ 
          error: 'Match not found or you are not part of this match' 
        });
      }

      // Get messages for this match
      const { data: messages, error: messagesError } = await supabase
        .from('messages')
        .select('*')
        .eq('match_id', req.params.matchId)
        .order('created_at', { ascending: true });

      if (messagesError) throw messagesError;

      // Mark messages as read if they are from the other user
      const unreadMessages = messages.filter(
        msg => !msg.read_at && msg.sender_id !== req.user.id
      );

      if (unreadMessages.length > 0) {
        const messageIds = unreadMessages.map(msg => msg.id);
        const { error: updateError } = await supabase
          .from('messages')
          .update({ read_at: new Date().toISOString() })
          .in('id', messageIds);

        if (updateError) throw updateError;

        // Update the read_at timestamps in the response
        messages.forEach(msg => {
          if (messageIds.includes(msg.id)) {
            msg.read_at = new Date().toISOString();
          }
        });
      }
      
      return res.json(messages || []);
    } catch (error) {
      return handleSupabaseError(res, error);
    }
  }
);

// Send a new message
router.post(
  '/',
  [
    body('match_id').isUUID().withMessage('Invalid match ID format'),
    body('content').trim().notEmpty().withMessage('Message content is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
    }

    const { match_id, content } = req.body;

    try {
      // Verify the user is part of this match
      const userDogIds = await getUserDogIds(req.user.id);
      
      const { data: match, error: matchError } = await supabase
        .from('matches')
        .select('*')
        .eq('id', match_id)
        .or(`dog1_id.in.(${userDogIds}),dog2_id.in.(${userDogIds})`)
        .single();

      if (matchError) throw matchError;
      if (!match) {
        return res.status(StatusCodes.NOT_FOUND).json({ 
          error: 'Match not found or you are not part of this match' 
        });
      }

      // Verify the match is active
      if (match.status !== 'matched') {
        return res.status(StatusCodes.BAD_REQUEST).json({
          error: 'Cannot send messages to this match. The match is not active.'
        });
      }

      // Create the message
      const messageData = {
        match_id,
        sender_id: req.user.id,
        content,
        created_at: new Date().toISOString(),
      };

      const { data: message, error: createError } = await supabase
        .from('messages')
        .insert(messageData)
        .select()
        .single();

      if (createError) throw createError;
      
      // Here you would typically emit a real-time event to the other user
      // using WebSockets or a similar technology
      
      return res.status(StatusCodes.CREATED).json(message);
    } catch (error) {
      return handleSupabaseError(res, error);
    }
  }
);

// Mark messages as read
router.post(
  '/mark-read',
  [
    body('message_ids').isArray().withMessage('message_ids must be an array'),
    body('message_ids.*').isUUID().withMessage('Invalid message ID format'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
    }

    const { message_ids } = req.body;

    try {
      // Verify the user is the recipient of these messages
      const { data: messages, error: fetchError } = await supabase
        .from('messages')
        .select('id, match:match_id(dog1_id, dog2_id)')
        .in('id', message_ids);

      if (fetchError) throw fetchError;

      // Get all dog IDs owned by the user
      const userDogIds = await getUserDogIds(req.user.id);
      
      // Check if all messages belong to matches involving the user's dogs
      const invalidMessages = messages.filter(message => {
        return !userDogIds.includes(message.match.dog1_id) && 
               !userDogIds.includes(message.match.dog2_id);
      });

      if (invalidMessages.length > 0) {
        return res.status(StatusCodes.FORBIDDEN).json({
          error: 'You are not authorized to mark these messages as read'
        });
      }

      // Mark messages as read
      const { error: updateError } = await supabase
        .from('messages')
        .update({ read_at: new Date().toISOString() })
        .in('id', message_ids)
        .is('read_at', null);

      if (updateError) throw updateError;
      
      return res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
      return handleSupabaseError(res, error);
    }
  }
);

// Helper function to get all dog IDs owned by a user
async function getUserDogIds(userId) {
  const { data: dogs, error } = await supabase
    .from('dogs')
    .select('id')
    .eq('owner_id', userId);

  if (error) throw error;
  return dogs.map(dog => dog.id);
}

export default router;
