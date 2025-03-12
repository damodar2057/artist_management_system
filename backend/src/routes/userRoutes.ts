// backend/src/routes/userRoutes.ts

import * as express from 'express'
import { UserController } from 'src/controllers/userController';

const router: express.Router = express.Router();
const userController = UserController.getInstance()

router.get("/", async (req, res, next) => {
    try {
        const users = await userController.getAllUsers(req);
        res.json(users);
    } catch (error) {
        next(error);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const user = await userController.getUserById(req);
        res.json(user);
    } catch (error) {
        next(error);
    }
});

router.post("/", async (req, res, next) => {
    try {
        const newUser = await userController.createUser(req);
        res.json(newUser);
    } catch (error) {
        next(error);
    }
});

router.put("/:id", async (req, res, next) => {
    try {
        const updatedUser = await userController.updateUser(req);
        res.json(updatedUser);
    } catch (error) {
        next(error);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const result = await userController.deleteUser(req);
        res.json(result);
    } catch (error) {
        next(error);
    }
});

export default router;