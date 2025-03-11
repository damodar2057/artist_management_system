// 

import * as express from 'express'
import * as artistController from '../controllers/artistController'

const router = express.Router();

router.get('/', artistController.getArtists )
router.get('/:id', artistController.getArtistById )
router.post('/', artistController.createArtist)
router.delete('/', artistController.deleteArtist)
router.patch('/', artistController.updateArtist)

export default router;