import jwt from 'jsonwebtoken';
import config from '../config';
import User from '../resources/user/user.model';
import { cleanResponse } from './functions';

export const newToken = (user) =>
  jwt.sign({ id: user.id }, config.secrets.jwt, {
    expiresIn: config.secrets.jwtExp,
  });

export const verifyToken = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, config.secrets.jwt, (err, payload) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(payload);
    });
  });

export const signup = async (req, res) => {
  let user = await User.findOne({ email: req.body.email }).exec();
  if (user) {
    res.status(400).json({ message: 'Email already in use' });
    return;
  }

  user = await User.create(req.body);
  const token = newToken(user);
  res.status(201).json({ token });
};

export const signin = async (req, res) => {
  const invalid = { message: 'Invalid email and password combination' };

  const user = await User.findOne({ email: req.body.email })
    .select('email password')
    .exec();

  if (!user) {
    res.status(401).json(invalid);
    return;
  }

  const match = await user.checkPassword(req.body.password);

  if (!match) {
    res.status(401).json(invalid);
    return;
  }

  const token = newToken(user);
  res.status(201).json({ token });
};

export const protect = async (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer || !bearer.startsWith('Bearer ')) {
    res.status(401).end();
    return;
  }

  const token = bearer.split('Bearer ')[1].trim();

  const payload = await verifyToken(token);

  const user = await User.findById(payload.id)
    .select('-password')
    .lean()
    .exec();

  if (!user) {
    res.status(401).end();
    return;
  }

  req.user = cleanResponse(user);
  next();
};
