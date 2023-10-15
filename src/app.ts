import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import session from 'express-session';
import connectMongo from 'connect-mongo'; // Corrected import statement
import config from './config';
import authRoutes from './routes/auth.routes'; // Import authRoutes
import notesRoutes from './routes/notes.routes'; // Import notesRoutes

const app = express();
const MongoStore = connectMongo;

mongoose.connect(config.MONGODB_URI, {
  useUnifiedTopology: true,
  useCreateIndex: true,
  useNewUrlParser: true, // Include this option
} as any);


app.use(express.json());

app.use(
  session({
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection } as any),
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);
app.use('/api', notesRoutes);

app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});
