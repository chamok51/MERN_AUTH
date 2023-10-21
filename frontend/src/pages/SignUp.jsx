import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth'

const SignUp = () => {
  const [formData, setFormData] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const navigate = useNavigate()
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const res = await axios.post('https://mern-auth-api-nine.vercel.app/api/v1/auth/register', formData)
      setLoading(false)
      navigate('/signin')
    } catch (error) {
      setLoading(false)
      setError(error.response.data.message)
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='my-6 text-3xl font-semibold text-center'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 mt-6'>
        <input
          className='p-2 rounded-lg bg-slate-100'
          type='text'
          placeholder='Username'
          name='username'
          onChange={handleChange}
        />
        <input
          className='p-2 rounded bg-slate-100'
          type='email'
          placeholder='Email'
          name='email'
          onChange={handleChange}
        />
        <input
          className='p-2 rounded bg-slate-100'
          type='password'
          placeholder='Password'
          name='password'
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className='uppercase bg-slate-800 text-white p-2 cursor-pointer hover:opacity-95 disabled:opacity-75'
        >
          {loading ? 'loading...' : 'sign up'}
        </button>
        <OAuth />
      </form>
      <div className='flex gap-2 mt-1'>
        <p>Have an account ?</p>
        <Link to='/signin'>
          <span className='text-sky-600'>Sign in</span>
        </Link>
      </div>
      {error && (
        <h1 className='text-red-600 font-mono font-bold mt-2 text-center'>
          {error}
        </h1>
      )}
    </div>
  )
}

export default SignUp
