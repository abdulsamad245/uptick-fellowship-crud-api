import dotenv from 'dotenv';

dotenv.config();

const config = {
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/notes-api',

  SESSION_SECRET: process.env.SESSION_SECRET || 'your-secret',

  JWT_SECRET: process.env.JWT_SECRET || '',

  PORT: process.env.PORT || 3000,
};

export default config;
