import { Request, Response, NextFunction } from 'express';

import PostService from '@services/post.service';
import { logger } from '@utils/logger.util';

export default class PostController {
    public static handleCreatePost = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const { title, content, authorEmail } = req.body;
            logger.info(title, content, authorEmail);
            const post = await PostService.createPost(
                title,
                content,
                authorEmail,
            );

            res.json(post);
        } catch (error) {
            next(error);
        }
    };

    public static handleIncrementViews = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const { id } = req.params;

            const post = await PostService.incrementViews(id);
            res.json(post);
        } catch (error) {
            next(error);
        }
    };

    public static handlePublishPost = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const { id } = req.params;

            const updatedPost = await PostService.publishPost(id);
            res.json(updatedPost);
        } catch (error) {
            next(error);
        }
    };

    public static handleGetDraftPosts = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const { id } = req.params;

            const posts = await PostService.getUnpublishedPosts(id);
            res.json(posts);
        } catch (error) {
            next(error);
        }
    };

    public static handleGetPost = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const { id } = req.params;

            const post = await PostService.getPost(id);
            res.json(post);
        } catch (error) {
            next(error);
        }
    };

    public static handleDeletePost = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const { id } = req.params;

            const post = await PostService.deletePost(id);
            res.json(post);
        } catch (error) {
            next(error);
        }
    };
}
