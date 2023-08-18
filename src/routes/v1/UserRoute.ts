import express from 'express'
import { addUserController, getAllUsersController, getUserByIdController } from '../../controllers/UserController'
const router = express.Router()

router.get('/', getAllUsersController)
router.post('/', addUserController)
router.get('/:id', getUserByIdController)

module.exports = router