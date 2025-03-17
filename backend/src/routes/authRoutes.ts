// backend/src/routes/authRoutes.ts

import * as express from 'express'
import { validateLogin, validateRegister } from 'src/common/validator/auth.validator';
import { AuthController } from 'src/controllers/authController';
import validationMiddleware from 'src/middlewares/validation.middleware';

const router: express.Router = express.Router();
const authController = AuthController.getInstance()

router.post('/login', validationMiddleware(validateLogin),  async (req, res, next) => {
    try {
        const loginRes = await authController.login(req);
        res.json(loginRes)
    } catch (error) {
        next(error);
    }
});

router.post('/register', validationMiddleware(validateRegister), async (req, res, next) => {
    try {
        const newUser = await authController.register(req);
        res.json(newUser)
    } catch (error) {
        next(error);
    }
});

export default router;
