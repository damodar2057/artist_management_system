// backend/src/routes/authRoutes.ts

import * as express from 'express'
import { AuthController } from 'src/controllers/authController';

const router: express.Router = express.Router();
const authController = AuthController.getInstance()

router.post('/login', async (req, res, next) => {
    try {
        const loginRes = await authController.login(req);
        res.json(loginRes)
    } catch (error) {
        next(error);
    }
});

router.post('/register', async (req, res, next) => {
    try {
        const newUser = await authController.register(req);
        res.json(newUser)
    } catch (error) {
        next(error);
    }
});

export default router;
