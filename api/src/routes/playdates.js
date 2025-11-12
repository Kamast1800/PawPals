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

// Get all playdates for current user's dogs
router.get('/', async (req, res) => {
  try {
    // Get all playdates where the current user's dogs are involved
    const userDogIds = await getUserDogIds(req.user.id);
    
    const { data: playdates, error } = await supabase
      .from('playdates')
      .select(`
        *,
        match:match_id(
          *,
          dog1:dog1_id(*, owner:owner_id(id, first_name, last_name, profile_image_url)),
          dog2:dog2_id(*, owner:owner_id(id, first_name, last_name, profile_image_url))
        )
      `)
      .or(`match.dog1_id.in.(${userDogIds}),match.dog2_id.in.(${userDogIds})`);

    if (error) throw error;
    
    return res.json(playdates || []);
  } catch (error) {
    return handleSupabaseError(res, error);
  }
});

// Create a new playdate
router.post(
  '/',
  [
    body('match_id').isUUID().withMessage('Invalid match ID format'),
    body('scheduled_time').isISO8601().withMessage('Invalid date format'),
    body('location').isObject().withMessage('Location must be an object'),
    body('location.latitude').isFloat({ min: -90, max: 90 }).withMessage('Invalid latitude'),
    body('location.longitude').isFloat({ min: -180, max: 180 }).withMessage('Invalid longitude'),
    body('location.name').optional().isString(),
    body('notes').optional().isString(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
    }

    const { match_id, scheduled_time, location, notes } = req.body;

    try {
      // Verify the match exists and involves the user's dog
      const { data: match, error: matchError } = await supabase
        .from('matches')
        .select('*')
        .eq('id', match_id)
        .single();

      if (matchError) throw matchError;
      if (!match) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: 'Match not found' });
      }

      // Check if the user is part of this match
      const userDogIds = await getUserDogIds(req.user.id);
      if (!userDogIds.includes(match.dog1_id) && !userDogIds.includes(match.dog2_id)) {
        return res.status(StatusCodes.FORBIDDEN).json({ 
          error: 'You are not part of this match' 
        });
      }

      // Create the playdate
      const playdateData = {
        match_id,
        scheduled_time: new Date(scheduled_time).toISOString(),
        location,
        notes: notes || null,
        status: 'scheduled',
        created_by: req.user.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const { data: playdate, error: createError } = await supabase
        .from('playdates')
        .insert(playdateData)
        .select()
        .single();

      if (createError) throw createError;
      
      return res.status(StatusCodes.CREATED).json(playdate);
    } catch (error) {
      return handleSupabaseError(res, error);
    }
  }
);

// Update a playdate
router.patch(
  '/:playdateId',
  [
    param('playdateId').isUUID().withMessage('Invalid playdate ID format'),
    body('scheduled_time').optional().isISO8601(),
    body('location').optional().isObject(),
    body('location.latitude').if(body('location').exists()).isFloat({ min: -90, max: 90 }),
    body('location.longitude').if(body('location').exists()).isFloat({ min: -180, max: 180 }),
    body('location.name').optional().isString(),
    body('notes').optional().isString(),
    body('status').optional().isIn(['scheduled', 'completed', 'cancelled']),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
    }

    try {
      // Get the playdate with match information
      const { data: playdate, error: fetchError } = await supabase
        .from('playdates')
        .select('*, match:match_id(*)')
        .eq('id', req.params.playdateId)
        .single();

      if (fetchError) throw fetchError;
      if (!playdate) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: 'Playdate not found' });
      }

      // Check if the user is part of this playdate's match
      const userDogIds = await getUserDogIds(req.user.id);
      if (!userDogIds.includes(playdate.match.dog1_id) && !userDogIds.includes(playdate.match.dog2_id)) {
        return res.status(StatusCodes.FORBIDDEN).json({ 
          error: 'You are not part of this playdate' 
        });
      }

      // Prepare update data
      const updateData = {
        ...req.body,
        updated_at: new Date().toISOString(),
      };

      // Update the playdate
      const { data: updatedPlaydate, error: updateError } = await supabase
        .from('playdates')
        .update(updateData)
        .eq('id', req.params.playdateId)
        .select()
        .single();

      if (updateError) throw updateError;
      
      return res.json(updatedPlaydate);
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
