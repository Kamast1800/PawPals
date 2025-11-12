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

// Get all ratings for a dog
router.get(
  '/dog/:dogId',
  [
    param('dogId').isUUID().withMessage('Invalid dog ID format'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
    }

    try {
      const { data: ratings, error } = await supabase
        .from('ratings')
        .select(`
          *,
          rater:rater_id(id, first_name, last_name, profile_image_url)
        `)
        .eq('rated_dog_id', req.params.dogId);

      if (error) throw error;
      
      return res.json(ratings || []);
    } catch (error) {
      return handleSupabaseError(res, error);
    }
  }
);

// Create a new rating
router.post(
  '/',
  [
    body('playdate_id').isUUID().withMessage('Invalid playdate ID format'),
    body('rated_dog_id').isUUID().withMessage('Invalid dog ID format'),
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    body('review').optional().isString(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
    }

    const { playdate_id, rated_dog_id, rating, review } = req.body;

    try {
      // Verify the playdate exists and is completed
      const { data: playdate, error: playdateError } = await supabase
        .from('playdates')
        .select('*, match:match_id(*)')
        .eq('id', playdate_id)
        .eq('status', 'completed')
        .single();

      if (playdateError) throw playdateError;
      if (!playdate) {
        return res.status(StatusCodes.NOT_FOUND).json({ 
          error: 'Playdate not found or not completed' 
        });
      }

      // Verify the rated dog is part of the playdate
      const { data: match, error: matchError } = await supabase
        .from('matches')
        .select('*')
        .eq('id', playdate.match_id)
        .single();

      if (matchError) throw matchError;
      if (match.dog1_id !== rated_dog_id && match.dog2_id !== rated_dog_id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          error: 'The rated dog is not part of this playdate'
        });
      }

      // Verify the rater is the owner of the other dog in the match
      const userDogIds = await getUserDogIds(req.user.id);
      const otherDogId = match.dog1_id === rated_dog_id ? match.dog2_id : match.dog1_id;
      
      if (!userDogIds.includes(otherDogId)) {
        return res.status(StatusCodes.FORBIDDEN).json({
          error: 'You can only rate dogs that your dog has had a playdate with'
        });
      }

      // Check if a rating already exists for this playdate and rater
      const { data: existingRating, error: existingError } = await supabase
        .from('ratings')
        .select('*')
        .eq('playdate_id', playdate_id)
        .eq('rater_id', req.user.id)
        .eq('rated_dog_id', rated_dog_id)
        .maybeSingle();

      if (existingError) throw existingError;
      
      if (existingRating) {
        return res.status(StatusCodes.CONFLICT).json({
          error: 'You have already rated this dog for this playdate'
        });
      }

      // Create the rating
      const ratingData = {
        playdate_id,
        rater_id: req.user.id,
        rated_dog_id,
        rating,
        review: review || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const { data: newRating, error: createError } = await supabase
        .from('ratings')
        .insert(ratingData)
        .select()
        .single();

      if (createError) throw createError;
      
      return res.status(StatusCodes.CREATED).json(newRating);
    } catch (error) {
      return handleSupabaseError(res, error);
    }
  }
);

// Update a rating
router.patch(
  '/:ratingId',
  [
    param('ratingId').isUUID().withMessage('Invalid rating ID format'),
    body('rating').optional().isInt({ min: 1, max: 5 }),
    body('review').optional().isString(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
    }

    try {
      // Get the existing rating
      const { data: existingRating, error: fetchError } = await supabase
        .from('ratings')
        .select('*')
        .eq('id', req.params.ratingId)
        .single();

      if (fetchError) throw fetchError;
      if (!existingRating) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: 'Rating not found' });
      }

      // Verify the rater is the owner of the rating
      if (existingRating.rater_id !== req.user.id) {
        return res.status(StatusCodes.FORBIDDEN).json({
          error: 'You can only update your own ratings'
        });
      }

      // Prepare update data
      const updateData = {
        ...req.body,
        updated_at: new Date().toISOString(),
      };

      // Update the rating
      const { data: updatedRating, error: updateError } = await supabase
        .from('ratings')
        .update(updateData)
        .eq('id', req.params.ratingId)
        .select()
        .single();

      if (updateError) throw updateError;
      
      return res.json(updatedRating);
    } catch (error) {
      return handleSupabaseError(res, error);
    }
  }
);

// Delete a rating
router.delete(
  '/:ratingId',
  [
    param('ratingId').isUUID().withMessage('Invalid rating ID format'),
  ],
  async (req, res) => {
    try {
      // Get the existing rating
      const { data: existingRating, error: fetchError } = await supabase
        .from('ratings')
        .select('*')
        .eq('id', req.params.ratingId)
        .single();

      if (fetchError) throw fetchError;
      if (!existingRating) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: 'Rating not found' });
      }

      // Verify the rater is the owner of the rating
      if (existingRating.rater_id !== req.user.id) {
        return res.status(StatusCodes.FORBIDDEN).json({
          error: 'You can only delete your own ratings'
        });
      }

      // Delete the rating
      const { error: deleteError } = await supabase
        .from('ratings')
        .delete()
        .eq('id', req.params.ratingId);

      if (deleteError) throw deleteError;
      
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
