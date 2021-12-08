import { Router } from 'express';

import UserController from '@controllers/user.controller';
import PostController from '@controllers/post.controller';

const router = Router();

// GET
router.get('/api/users', UserController.handleGetUsers);
router.get('/api/post/:id', PostController.handleGetPost);
router.get('/api/user/:id/drafts', PostController.handleGetDraftPosts);

// POST
router.post('/api/post', PostController.handleCreatePost);
router.post('/api/signup', UserController.handleRegisterUser);

// PUT
router.put('/api/publish/:id', PostController.handlePublishPost);
router.put('/api/post/:id/views', PostController.handleIncrementViews);

// DELETE
router.delete('/api/user/:id', UserController.handleDeleteUser);
router.delete('/api/post/:id', PostController.handleDeletePost);

export default router;
