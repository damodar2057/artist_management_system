// backend/src/routes/authRoutes.ts

import * as express from 'express'
import { AuthController } from 'src/controllers/authController';

const router: express.Router = express.Router();
const authController = AuthController.getInstance()

router.get('/login', async (req, res, next) => {
    try {
        await authController.login(req);
    } catch (error) {
        next(error);
    }
});

router.get('/register', async (req, res, next) => {
    try {
        await authController.register(req);
    } catch (error) {
        next(error);
    }
});

export default router;
