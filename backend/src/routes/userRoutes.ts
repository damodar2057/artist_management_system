//

import * as express from 'express'
import * as userController from '../controllers/userController'

const router: express.Router = express.Router();

// router.get('/', userController.getUsers )
router.get('/:id', userController.getUserById )
router.post('/', userController.createUser)
router.delete('/', userController.deleteUser)
router.patch('/', userController.updateUser)

export default router;