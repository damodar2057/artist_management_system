// 

import * as express from 'express'
import * as musicController from '../controllers/musicController'

const router: express.Router = express.Router();

router.get('/', musicController.getMusics )
router.get('/:id', musicController.getMusicById )
router.post('/', musicController.createMusic)
router.delete('/', musicController.deleteMusic)
router.patch('/', musicController.updateMusic)

export default router;