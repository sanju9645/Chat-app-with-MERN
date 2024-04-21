import { Navigate, Routes, Route } from 'react-router-dom';

import './App.css'
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Home from './pages/home/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthContext } from "./context/AuthContext";


function App() {
  const { authUser } = useAuthContext();

  return (
    <>
      <div className='p-4 h-screen flex items-center justify-center'>
        <ToastContainer/>
        <Routes>
          <Route path='/' element={authUser ? <Home /> : <Navigate to={"/login"} />} />
          <Route path='/home' element={authUser ? <Home /> : <Navigate to={"/login"} />} />
          <Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} />
          <Route path='/signup' element={authUser ? <Navigate to='/' /> : <Signup />} />
			</Routes>
      </div>
    </>
  )
}

export default App
