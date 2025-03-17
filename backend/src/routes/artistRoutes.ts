// backend/src/routes/artistRoutes.ts


import * as express from 'express'
import { validateArtist } from 'src/common/validator/artist.validator';
import { ArtistController } from 'src/controllers/artistController';
import validatorMiddleware from 'src/middlewares/validation.middleware';
const artistController = ArtistController.getInstance()

const router: express.Router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const artists = await artistController.getArtists(req);
        res.json(artists);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const artist = await artistController.getArtistById(req);
        res.json(artist);
    } catch (error) {
        next(error);
    }
});

router.post('/', validatorMiddleware(validateArtist), async (req, res, next) => {
    try {
        const newArtist = await artistController.createArtist(req);
        res.json(newArtist);
    } catch (error) {
        next(error);
    }
});

router.post('/import', async (req, res, next) => {
    try {
        const newArtist = await artistController.createManyArtist(req);
        res.json(newArtist);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const result = await artistController.deleteArtist(req);
        res.json(result);
    } catch (error) {
        next(error);
    }
});

router.patch('/:id', async (req, res, next) => {
    try {
        const updatedArtist = await artistController.updateArtist(req);
        res.json(updatedArtist);
    } catch (error) {
        next(error);
    }
});

export default router;
