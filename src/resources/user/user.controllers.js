import User from './user.model';
import { cleanResponse } from '../../utils/functions';

export const getUser = (req, res) => {
  res.status(200).json({ data: req.user });
};

export const updateUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
  })
    .select('-password')
    .lean()
    .exec();
  res.status(200).json({ data: cleanResponse(user) });
};
