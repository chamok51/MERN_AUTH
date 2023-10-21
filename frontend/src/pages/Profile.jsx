import React, { useContext, useState, useRef, useEffect } from 'react'
import { Context } from '../context/Context'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage'
import { app } from '../firebase'

const Profile = () => {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({})
  const [image, setImage] = useState(null)
  const [percentage, setPercentage] = useState(null)
  const [imageError, setImageError] = useState(false)

  const { user, dispatch } = useContext(Context)
  const navigate = useNavigate()

  //image upload
  useEffect(() => {
    if (image) {
      handleUploadImage(image)
    }
  }, [image])

  const handleUploadImage = async (image) => {
    const storage = getStorage(app)
    const fileName = new Date().getTime() + image.name
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, image)
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100

        setPercentage(Math.round(progress))
      },
      (error) => {
        setImageError(true)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePic: downloadURL })
        )
      }
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const res = await axios.put('/api/v1/user', formData)
      dispatch({ type: 'UPDATE', payload: res.data })
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const handleClick = async () => {
    try {
      dispatch({ type: 'LOGOUT' })
      await axios.get('/api/v1/auth/signout')
      navigate('/signin')
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/v1/user/${user._id}`)
      dispatch({ type: 'DELETE' })
      navigate('/signin')
    } catch (error) {
      console.log(error)
    }
  }

  const fileRef = useRef(null)
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='my-6 text-3xl font-semibold text-center'>Profile</h1>

      <form onSubmit={handleSubmit} className='flex flex-col gap-4 mt-6'>
        <input
          type='file'
          ref={fileRef}
          hidden
          accept='image/*'
          onChange={(e) => setImage(e.target.files[0])}
        />
        <img
          className='w-24 h-24 object-cover cursor-pointer self-center rounded-full'
          src={formData.profilePic || user.profilePic}
          alt='profile pic'
          onClick={() => fileRef.current.click()}
        />
        <p className='text-sm self-center'>
          {imageError ? (
            <span className='text-red-700'>
              Error uploading image (file size must be less than 2 MB)
            </span>
          ) : percentage > 0 && percentage < 100 ? (
            <span className='text-slate-700'>{`Uploading: ${percentage} %`}</span>
          ) : percentage === 100 ? (
            <span className='text-green-700'>Image uploaded successfully</span>
          ) : (
            ''
          )}
        </p>
        <input
          className='p-2 rounded-lg bg-slate-100'
          type='text'
          name='username'
          placeholder='Username'
          onChange={handleChange}
          defaultValue={user.username}
        />
        <input
          className='p-2 rounded bg-slate-100'
          type='email'
          name='email'
          placeholder='Email'
          onChange={handleChange}
          defaultValue={user.email}
        />
        <input
          className='p-2 rounded bg-slate-100'
          type='password'
          name='password'
          placeholder='Password'
          onChange={handleChange}
        />
        <button
          type='submit'
          disabled={loading}
          className='uppercase bg-slate-800 text-white p-2 cursor-pointer hover:opacity-95 disabled:opacity-75'
        >
          {loading ? 'loading...' : 'update'}
        </button>
      </form>
      <div className='flex justify-between py-3'>
        <p className='text-red-700 cursor-pointer' onClick={handleDelete}>
          Delete Account
        </p>
        <span className='text-red-700 cursor-pointer' onClick={handleClick}>
          Sign out
        </span>
      </div>

      {/* {error && (
        <h1 className='text-red-600 font-mono font-bold mt-2 text-center'>
          {error}
        </h1>
      )} */}
    </div>
  )
}

export default Profile
