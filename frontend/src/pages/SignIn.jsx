import React, { useContext, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { Context } from '../context/Context'
import OAuth from '../components/OAuth'

const SignUp = () => {
  const [formData, setFormData] = useState({})
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const { dispatch } = useContext(Context)

  const navigate = useNavigate()
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      dispatch({ type: 'LOGIN_START' })
      const res = await axios.post('/api/v1/auth/signin', formData)

      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data })

      navigate('/')
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE' })
      setError(error.response.data.message)
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='my-6 text-3xl font-semibold text-center'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 mt-6'>
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
          {loading ? 'loading...' : 'sign in'}
        </button>
        <OAuth />
      </form>
      <div className='flex gap-2 mt-1'>
        <p>don't have an account ?</p>
        <Link to='/signup'>
          <span className='text-sky-600'>Sign up</span>
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
