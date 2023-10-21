import express from 'express'
import {
  registerUser,
  signInUser,
  signout,
  google,
} from '../controller/authController.js'
const router = express.Router()

router.post('/auth/register', registerUser)
router.post('/auth/signin', signInUser)
router.post('/auth/google', google)
router.get('/auth/signout', signout)

export default router
