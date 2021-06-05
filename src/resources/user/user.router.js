import { Router } from 'express';
import { getUser, updateUser } from './user.controllers';
import { updateUserValidation } from '../../utils/validation';

const router = Router();

router.get('/', getUser);
router.put('/', updateUserValidation, updateUser);

export default router;
