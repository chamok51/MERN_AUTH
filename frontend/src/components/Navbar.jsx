import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Context } from '../context/Context'
import axios from 'axios'

const Navbar = () => {
  const { user, dispatch } = useContext(Context)
  const navigate = useNavigate()

  const handleClick = async () => {
    try {
      dispatch({ type: 'LOGOUT' })
      await axios.get('/api/v1/auth/signout')
      navigate('/signin')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='bg-slate-200 '>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
          <h1 className='font-sans font-bold'>MERN AUTH</h1>
        </Link>
        <ul className='flex gap-4'>
          <Link to='/'>
            <li>HOME</li>
          </Link>

          <Link to='/about'>
            <li>ABOUT</li>
          </Link>
          {user ? (
            <Link to='/profile'>
              <div className='w-[25px] h-[25px] cursor-pointer '>
                <img
                  className='object-cover rounded-full '
                  src={user?.profilePic}
                  alt=''
                />
              </div>
            </Link>
          ) : (
            <Link to='/signin'>
              <li>Sign In</li>
            </Link>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Navbar
