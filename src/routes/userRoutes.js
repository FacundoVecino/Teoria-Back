import express from 'express';
import {
  getUsers,
  postUser,
  putUser,
  deleteUser,
} from '../controllers/userController.js';
import { validateBody } from '../middlewares/validateBody.js';
import { post_userSchema, put_userSchema } from '../helpers/validationSchemas/userSchemas.js';
import { isAuthenticated } from '../middlewares/isAuthenticated.js';

const router = express.Router();

// GET
router.get('/', getUsers);

// POST -------- Utilizamos un callback para mandar el schema y hacerlo generico a validateBody
router.post(
  '/',
  (req, res, next) => validateBody(req, res, next, post_userSchema),
  postUser,
);

// PUT
router.put(
  '/:id',
  isAuthenticated,
  (req, res, next) => validateBody(req, res, next, put_userSchema),
  putUser,
);

// DELETE
router.delete('/:id', isAuthenticated, deleteUser);

export default router;
