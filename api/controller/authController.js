import User from '../models/userModel.js'
import bcrypt, { genSalt } from 'bcrypt'
import asyncHandler from 'express-async-handler'
import { generateToken } from '../utils/jwtToken.js'

export const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User alredy exist')
  }
  const salt = await bcrypt.genSalt(10)
  const hashed = await bcrypt.hash(password, salt)

  const newUser = await User.create({ username, email, password: hashed })

  res.status(201).json(newUser)
})

export const signInUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  // !user && res.status(404).json({ message: 'User not found' })
  if (!user) {
    res.status(404)
    throw new Error('User Not Found')
  }
  const validatePass = await bcrypt.compare(password, user.password)
  // !validatePass && res.status(400).json({ message: ' Wrong credentials' })
  if (!validatePass) {
    res.status(400)
    throw new Error('Wrong credentials')
  }

  const { password: hashed, ...others } = user._doc

  if (user) {
    generateToken(res, user._id)
    res.status(200).json(others)
  }
})

export const signout = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  })

  res.status(200).json('user logged out')
})

export const google = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email })

  if (user) {
    generateToken(res, user._id)
    const { password: hashed, ...others } = user._doc
    res.status(200).json(others)
  } else {
    const generatePassword =
      Math.random().toString(36).slice(-8) +
      Math.random().toString(36).slice(-8)
    const hashedPass = bcrypt.hashSync(generatePassword, 10)

    const newUser = new User({
      username:
        req.body.name.split(' ').join('').toLowerCase() +
        Math.random().toString(36).slice(-8),
      email: req.body.email,
      password: hashedPass,
      profilePic: req.body.photo,
    })
    await newUser.save()
    generateToken(res, newUser._id)
    res.status(200).json(newUser)
  }
})
