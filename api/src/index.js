import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { StatusCodes } from 'http-status-codes';
import profilesRouter from './routes/profiles.js';
import dogsRouter from './routes/dogs.js';
import matchesRouter from './routes/matches.js';
import playdatesRouter from './routes/playdates.js';
import ratingsRouter from './routes/ratings.js';
import messagesRouter from './routes/messages.js';

// Load environment variables
dotenv.config();

// Debug: Log environment variables
console.log('SUPABASE_URL:', process.env.SUPABASE_URL ? '***URL is set***' : 'URL is MISSING');
console.log('SUPABASE_ANON_KEY:', process.env.SUPABASE_ANON_KEY ? '***Key is set***' : 'Key is MISSING');

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
  console.error('ERROR: Missing required environment variables. Please check your .env file.');
  process.exit(1);
}

// Initialize Supabase client
export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: false,
    },
  }
);

// Create Express app
const app = express();
const PORT = process.env.PORT || 4000;
const API_PREFIX = '/v1';

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Authentication middleware
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'No token provided' });
  }

  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error) throw error;
    if (!user) return res.sendStatus(StatusCodes.FORBIDDEN);

    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Invalid or expired token' });
  }
};

// Routes
app.use(`${API_PREFIX}/profiles`, authenticateToken, profilesRouter);
app.use(`${API_PREFIX}/dogs`, authenticateToken, dogsRouter);
app.use(`${API_PREFIX}/matches`, authenticateToken, matchesRouter);
app.use(`${API_PREFIX}/playdates`, authenticateToken, playdatesRouter);
app.use(`${API_PREFIX}/ratings`, authenticateToken, ratingsRouter);
app.use(`${API_PREFIX}/messages`, authenticateToken, messagesRouter);

// Health check endpoint
app.get(`${API_PREFIX}/health`, (req, res) => {
  res.status(StatusCodes.OK).json({ status: 'ok' });
});

// 404 handler
app.use((req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({ error: 'Not Found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}${API_PREFIX}`);
});

export default app;
