import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import passport from 'passport';
import dotenv from 'dotenv'; // Import dotenv
import authRouter from './routes/auth';
import notesRouter from './routes/notes';

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 3000;
const dbUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/notes_db';
const sessionSecret = process.env.SESSION_SECRET || 'your-secret-key';

app.use(express.json());
app.use(session({ secret: sessionSecret, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

mongoose
    .connect(dbUrl, { retryWrites: true, w: 'majority' })
    .then(() => {
        console.info('Mongo connected successfully.');
        // StartServer();
    })
    .catch((error) => console.error(error));
  

app.use('/auth', authRouter);
app.use('/notes', notesRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
