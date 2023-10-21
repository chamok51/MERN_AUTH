import User from '../models/userModel.js'
import asynchandler from 'express-async-handler'
import bcrypt from 'bcrypt'

export const getUserProfile = asynchandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    username: req.user.username,
    email: req.user.email,
  }

  res.status(200).json(user)
})

export const updateUser = asynchandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.username = req.body.username || user.username
    user.email = req.body.email || user.email
    user.profilePic = req.body.profilePic || user.profilePic

    if (req.body.password) {
      user.password = bcrypt.hashSync(req.body.password, 10)
    }

    const updatedUser = await user.save()

    const { password: hashed, ...others } = user._doc
    res.status(200).json(others)
  } else {
    res.status(404)
    throw new Error('User Not found')
  }
})

export const deleteUser = asynchandler(async (req, res) => {
  if (req.user.id !== req.params.id) {
    res.status(404)
    throw new Error('you can delete only your account')
  } else {
    await User.findByIdAndDelete(req.params.id)
    res.status(200).json('User has been deleted successfully')
  }
})
