import Navbar from './components/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import { useContext } from 'react'
import { Context } from './context/Context'
import Profile from './pages/Profile'

function App() {
  const { user } = useContext(Context)
  return (
    <>
      <Navbar />

      <Routes>
        <Route path='/' element={user ? <Home /> : <SignIn />} />
        <Route path='/about' element={user ? <About /> : <SignIn />} />
        <Route path='/signin' element={user ? <Home /> : <SignIn />} />
        <Route path='/signup' element={user ? <Home /> : <SignUp />} />
        <Route path='/profile' element={user ? <Profile /> : <SignUp />} />
      </Routes>
    </>
  )
}

export default App
