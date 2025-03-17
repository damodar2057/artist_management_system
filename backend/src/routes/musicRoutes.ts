// backend/src/routes/musicRoutes.ts

import * as express from 'express'
import { validateMusic } from 'src/common/validator/music.validator';
import { MusicController } from 'src/controllers/musicController';
import validatorMiddleware from 'src/middlewares/validation.middleware';

const router: express.Router = express.Router();
const musicController = MusicController.getInstance()

router.get('/', async (req, res, next) => {
    try {
        const musics = await musicController.getMusics(req);
        res.json(musics);
    } catch (error) {
        next(error);
    }
});
router.get('/:artist_id/songs', async (req, res, next) => {
    try {
        const musics = await musicController.getMusics(req);
        res.json(musics);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const music = await musicController.getMusicById(req);
        res.json(music);
    } catch (error) {
        next(error);
    }
});

router.post('/', validatorMiddleware(validateMusic), async (req, res, next) => {
    try {
        const newMusic = await musicController.createMusic(req);
        res.json(newMusic);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const result = await musicController.deleteMusic(req);
        res.json(result);
    } catch (error) {
        next(error);
    }
});

router.patch('/:id', async (req, res, next) => {
    try {
        const updatedMusic = await musicController.updateMusic(req);
        res.json(updatedMusic);
    } catch (error) {
        next(error);
    }
});

export default router;

