import { Router } from 'express';
import controller from './post.controllers';
import { postValidation, updatePostValidation } from '../../utils/validation';
import { protect } from '../../utils/auth';

const router = Router();

// /api/post
router
  .route('/')
  .get(controller.getMany)
  .post(protect, postValidation, controller.createOne);

// /api/post/:id
router
  .route('/:id')
  .get(controller.getOne)
  .put(protect, updatePostValidation, controller.updateOne)
  .delete(protect, controller.removeOne);

export default router;
