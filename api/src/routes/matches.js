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

// Get all matches for current user's dogs
router.get('/', async (req, res) => {
  try {
    // Get all matches where the current user's dogs are involved
    const { data: matches, error } = await supabase
      .from('matches')
      .select(`
        *,
        dog1:dog1_id(*, owner:owner_id(id, first_name, last_name, profile_image_url)),
        dog2:dog2_id(*, owner:owner_id(id, first_name, last_name, profile_image_url))
      `)
      .or(`dog1_id.in.(${await getUserDogIds(req.user.id)}),dog2_id.in.(${await getUserDogIds(req.user.id)})`);

    if (error) throw error;
    
    return res.json(matches || []);
  } catch (error) {
    return handleSupabaseError(res, error);
  }
});

// Create a new match request
router.post(
  '/',
  [
    body('dog1_id').isUUID().withMessage('Invalid dog ID format'),
    body('dog2_id').isUUID().withMessage('Invalid dog ID format'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
    }

    const { dog1_id, dog2_id } = req.body;

    try {
      // Verify that the requesting user owns one of the dogs
      const userDogIds = await getUserDogIds(req.user.id);
      if (!userDogIds.includes(dog1_id) && !userDogIds.includes(dog2_id)) {
        return res.status(StatusCodes.FORBIDDEN).json({ 
          error: 'You must be the owner of one of the dogs to create a match' 
        });
      }

      // Check if a match already exists between these dogs
      const { data: existingMatch, error: matchError } = await supabase
        .from('matches')
        .select('*')
        .or(`and(dog1_id.eq.${dog1_id},dog2_id.eq.${dog2_id}),and(dog1_id.eq.${dog2_id},dog2_id.eq.${dog1_id})`)
        .maybeSingle();

      if (matchError) throw matchError;
      
      if (existingMatch) {
        return res.status(StatusCodes.CONFLICT).json({
          error: 'A match already exists between these dogs',
          match: existingMatch,
        });
      }

      // Create the match
      const matchData = {
        dog1_id,
        dog2_id,
        status: 'pending',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      // If the other dog's owner has already liked this dog, auto-match
      const { data: reverseLike, error: reverseError } = await supabase
        .from('matches')
        .select('*')
        .eq('dog1_id', dog2_id)
        .eq('dog2_id', dog1_id)
        .eq('status', 'pending')
        .maybeSingle();

      if (reverseError) throw reverseError;

      if (reverseLike) {
        // Update the existing match to 'matched' status
        const { data: updatedMatch, error: updateError } = await supabase
          .from('matches')
          .update({ 
            status: 'matched',
            updated_at: new Date().toISOString() 
          })
          .eq('id', reverseLike.id)
          .select()
          .single();

        if (updateError) throw updateError;
        
        // Return the updated match
        return res.status(StatusCodes.OK).json(updatedMatch);
      } else {
        // Create a new pending match
        const { data: newMatch, error: createError } = await supabase
          .from('matches')
          .insert(matchData)
          .select()
          .single();

        if (createError) throw createError;
        
        return res.status(StatusCodes.CREATED).json(newMatch);
      }
    } catch (error) {
      return handleSupabaseError(res, error);
    }
  }
);

// Update match status (accept/reject)
router.patch(
  '/:matchId',
  [
    param('matchId').isUUID().withMessage('Invalid match ID format'),
    body('status').isIn(['accepted', 'rejected', 'blocked']).withMessage('Invalid status'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
    }

    const { status } = req.body;

    try {
      // Get the match
      const { data: match, error: matchError } = await supabase
        .from('matches')
        .select('*, dog1:dog1_id(*), dog2:dog2_id(*)')
        .eq('id', req.params.matchId)
        .single();

      if (matchError) throw matchError;
      if (!match) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: 'Match not found' });
      }

      // Check if the requesting user is the owner of one of the dogs in the match
      const userDogIds = await getUserDogIds(req.user.id);
      if (!userDogIds.includes(match.dog1_id) && !userDogIds.includes(match.dog2_id)) {
        return res.status(StatusCodes.FORBIDDEN).json({ 
          error: 'You are not authorized to update this match' 
        });
      }

      // Update the match status
      const { data: updatedMatch, error: updateError } = await supabase
        .from('matches')
        .update({ 
          status,
          updated_at: new Date().toISOString() 
        })
        .eq('id', req.params.matchId)
        .select()
        .single();

      if (updateError) throw updateError;
      
      return res.json(updatedMatch);
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
  return dogs.map(dog => `'${dog.id}'`).join(',');
}

export default router;
