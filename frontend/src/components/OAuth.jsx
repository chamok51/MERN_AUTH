import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase'
import axios from 'axios'
import { useContext } from 'react'
import { Context } from '../context/Context'

const OAuth = () => {
  const { dispatch } = useContext(Context)

  const handleClick = async () => {
    try {
      const auth = getAuth(app)
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const res = await axios.post('https://mern-auth-api-nine.vercel.app/api/v1/auth/google', {
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      })
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data })
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <button
      onClick={handleClick}
      type='button'
      className='bg-red-500 text-white p-2'
    >
      Continue With Google
    </button>
  )
}

export default OAuth
