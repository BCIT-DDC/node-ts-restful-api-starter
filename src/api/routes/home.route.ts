import { Router } from 'express';

const path = '/';
const router = Router();

router.get(path, (req, res) => {
    res.status(200).send('Welcome to the RESTful API!');
});

export default router;
