import express from 'express'
import {
  getUserProfile,
  updateUser,
  deleteUser,
} from '../controller/userController.js'
import { protect } from '../middleware/jwtMiddleware.js'

const router = express.Router()

router.put('/user', protect, updateUser)
router.get('/user/profile', protect, getUserProfile)
router.delete('/user/:id', protect, deleteUser)

export default router
