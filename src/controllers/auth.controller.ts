import express from 'express';
import User, { IUser } from '../models/User';
import jwt from 'jsonwebtoken';

export const register = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const { username, password } = req.body;
  
  const newUser = new User({ username, password } as IUser);

  newUser.save((err: any) => {
    if (err) {
      return next(err); // Pass the error to the next middleware
    }
    
    return res.status(201).json({ message: 'User registered successfully.' });
  });
};

export const login = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const { username, password } = req.body;

  User.findOne({ username, password }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({ message: 'Authentication failed.' });
    }

    const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET || '');
    
    if (!token) {
      return next(new Error('JWT token could not be generated.'));
    }

    return res.status(200).json({ token });
  });
};
