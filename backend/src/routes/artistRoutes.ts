// backend/src/routes/artistRoutes.ts


import * as express from 'express'
import { ArtistController } from 'src/controllers/artistController';
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

router.post('/', async (req, res, next) => {
    try {
        const newArtist = await artistController.createArtist(req);
        res.json(newArtist);
    } catch (error) {
        next(error);
    }
});

router.delete('/', async (req, res, next) => {
    try {
        const result = await artistController.deleteArtist(req);
        res.json(result);
    } catch (error) {
        next(error);
    }
});

router.patch('/', async (req, res, next) => {
    try {
        const updatedArtist = await artistController.updateArtist(req);
        res.json(updatedArtist);
    } catch (error) {
        next(error);
    }
});

export default router;
