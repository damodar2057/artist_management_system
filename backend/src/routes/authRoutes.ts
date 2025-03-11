//

import * as express from 'express'
import * as authController from '../controllers/authController'

const router: express.Router = express.Router();

router.get('/login', authController.login )
router.get('/register', authController.register )


export default router;