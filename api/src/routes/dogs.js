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

// Get all dogs for current user
router.get('/', async (req, res) => {
  try {
    const { data: dogs, error } = await supabase
      .from('dogs')
      .select('*')
      .eq('owner_id', req.user.id);

    if (error) throw error;
    
    return res.json(dogs || []);
  } catch (error) {
    return handleSupabaseError(res, error);
  }
});

// Create a new dog
router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('Dog name is required'),
    body('breed').trim().notEmpty().withMessage('Breed is required'),
    body('age').isInt({ min: 0 }).withMessage('Age must be a positive number'),
    body('size').isIn(['small', 'medium', 'large', 'giant']).withMessage('Invalid dog size'),
    body('temperament').isArray().withMessage('Temperament must be an array'),
    body('energy_level').isInt({ min: 1, max: 5 }).withMessage('Energy level must be between 1 and 5'),
    body('bio').optional().trim(),
    body('image_urls').optional().isArray().withMessage('Image URLs must be an array'),
    body('is_fixed').isBoolean().withMessage('is_fixed must be a boolean'),
    body('vaccination_status').isIn(['up_to_date', 'not_up_to_date', 'not_applicable'])
      .withMessage('Invalid vaccination status'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
    }

    const dogData = {
      ...req.body,
      owner_id: req.user.id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    try {
      const { data, error } = await supabase
        .from('dogs')
        .insert(dogData)
        .select()
        .single();

      if (error) throw error;
      
      return res.status(StatusCodes.CREATED).json(data);
    } catch (error) {
      return handleSupabaseError(res, error);
    }
  }
);

// Get a specific dog by ID
router.get(
  '/:dogId',
  [
    param('dogId').isUUID().withMessage('Invalid dog ID format'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
    }

    try {
      const { data: dog, error } = await supabase
        .from('dogs')
        .select('*')
        .eq('id', req.params.dogId)
        .single();

      if (error) throw error;
      if (!dog) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: 'Dog not found' });
      }

      // Check if the requesting user is the owner of the dog
      if (dog.owner_id !== req.user.id) {
        return res.status(StatusCodes.FORBIDDEN).json({ error: 'You can only view your own dogs' });
      }
      
      return res.json(dog);
    } catch (error) {
      return handleSupabaseError(res, error);
    }
  }
);

// Update a dog
router.patch(
  '/:dogId',
  [
    param('dogId').isUUID().withMessage('Invalid dog ID format'),
    body('name').optional().trim().notEmpty(),
    body('breed').optional().trim().notEmpty(),
    body('age').optional().isInt({ min: 0 }),
    body('size').optional().isIn(['small', 'medium', 'large', 'giant']),
    body('temperament').optional().isArray(),
    body('energy_level').optional().isInt({ min: 1, max: 5 }),
    body('bio').optional().trim(),
    body('image_urls').optional().isArray(),
    body('is_fixed').optional().isBoolean(),
    body('vaccination_status').optional().isIn(['up_to_date', 'not_up_to_date', 'not_applicable']),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
    }

    try {
      // First check if the dog exists and belongs to the user
      const { data: existingDog, error: fetchError } = await supabase
        .from('dogs')
        .select('owner_id')
        .eq('id', req.params.dogId)
        .single();

      if (fetchError) throw fetchError;
      if (!existingDog) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: 'Dog not found' });
      }
      if (existingDog.owner_id !== req.user.id) {
        return res.status(StatusCodes.FORBIDDEN).json({ error: 'You can only update your own dogs' });
      }

      const updateData = {
        ...req.body,
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from('dogs')
        .update(updateData)
        .eq('id', req.params.dogId)
        .select()
        .single();

      if (error) throw error;
      
      return res.json(data);
    } catch (error) {
      return handleSupabaseError(res, error);
    }
  }
);

// Delete a dog
router.delete(
  '/:dogId',
  [
    param('dogId').isUUID().withMessage('Invalid dog ID format'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
    }

    try {
      // First check if the dog exists and belongs to the user
      const { data: existingDog, error: fetchError } = await supabase
        .from('dogs')
        .select('owner_id')
        .eq('id', req.params.dogId)
        .single();

      if (fetchError) throw fetchError;
      if (!existingDog) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: 'Dog not found' });
      }
      if (existingDog.owner_id !== req.user.id) {
        return res.status(StatusCodes.FORBIDDEN).json({ error: 'You can only delete your own dogs' });
      }

      const { error } = await supabase
        .from('dogs')
        .delete()
        .eq('id', req.params.dogId);

      if (error) throw error;
      
      return res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
      return handleSupabaseError(res, error);
    }
  }
);

export default router;
