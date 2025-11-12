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

// Get current user's profile
router.get('/me', async (req, res) => {
  try {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', req.user.id)
      .single();

    if (error) throw error;
    if (!profile) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: 'Profile not found' });
    }

    return res.json(profile);
  } catch (error) {
    return handleSupabaseError(res, error);
  }
});

// Create or update current user's profile
router.post(
  '/',
  [
    body('first_name').trim().notEmpty().withMessage('First name is required'),
    body('last_name').trim().notEmpty().withMessage('Last name is required'),
    body('phone').trim().notEmpty().withMessage('Phone number is required'),
    body('bio').optional().trim(),
    body('profile_image_url').optional().isURL().withMessage('Profile image must be a valid URL'),
    body('neighborhood').optional().trim(),
    body('is_walker').optional().isBoolean().withMessage('is_walker must be a boolean'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
    }

    const profileData = {
      id: req.user.id,
      email: req.user.email,
      ...req.body,
      updated_at: new Date().toISOString(),
    };

    try {
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', req.user.id)
        .single();

      let data, error;
      
      if (existingProfile) {
        // Update existing profile
        const { data: updatedData, error: updateError } = await supabase
          .from('profiles')
          .update(profileData)
          .eq('id', req.user.id)
          .select()
          .single();
        
        data = updatedData;
        error = updateError;
      } else {
        // Create new profile
        profileData.created_at = new Date().toISOString();
        const { data: createdData, error: createError } = await supabase
          .from('profiles')
          .insert(profileData)
          .select()
          .single();
        
        data = createdData;
        error = createError;
      }

      if (error) throw error;
      
      const statusCode = existingProfile ? StatusCodes.OK : StatusCodes.CREATED;
      return res.status(statusCode).json(data);
    } catch (error) {
      return handleSupabaseError(res, error);
    }
  }
);

// Get profile by user ID
router.get(
  '/:userId',
  [
    param('userId').isUUID().withMessage('Invalid user ID format'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
    }

    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', req.params.userId)
        .single();

      if (error) throw error;
      if (!profile) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: 'Profile not found' });
      }

      // Don't return sensitive information for other users
      const { phone, email, ...publicProfile } = profile;
      
      return res.json(publicProfile);
    } catch (error) {
      return handleSupabaseError(res, error);
    }
  }
);

// Update profile
router.patch(
  '/:userId',
  [
    param('userId').isUUID().withMessage('Invalid user ID format'),
    body('first_name').optional().trim().notEmpty(),
    body('last_name').optional().trim().notEmpty(),
    body('phone').optional().trim().notEmpty(),
    body('bio').optional().trim(),
    body('profile_image_url').optional().isURL(),
    body('neighborhood').optional().trim(),
    body('is_walker').optional().isBoolean(),
  ],
  async (req, res) => {
    // Check if user is updating their own profile
    if (req.params.userId !== req.user.id) {
      return res.status(StatusCodes.FORBIDDEN).json({ error: 'You can only update your own profile' });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
    }

    const updateData = {
      ...req.body,
      updated_at: new Date().toISOString(),
    };

    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', req.user.id)
        .select()
        .single();

      if (error) throw error;
      
      return res.json(data);
    } catch (error) {
      return handleSupabaseError(res, error);
    }
  }
);

export default router;
