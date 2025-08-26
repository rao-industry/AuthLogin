import { useDispatch, useSelector } from 'react-redux'
import { handleDeleteUser } from '../store/user.reducer'
import { Link } from 'react-router-dom'

const Home = () => {

  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(handleDeleteUser())
    localStorage.removeItem("authorization")
    
  }
  return (
    <div className='flex justify-center items-center h-screen w-full'>
        {user.email ? <div className='flex justify-center items-center flex-col gap-3'>
            <p className='text-4xl text-center font-bold text-green-800'><font className="text-red-800">Welcome</font> {user.name}</p>
            <p className='text-center text-xl mt-5 font-bold'>Role : {user.role}</p>
            <button className='px-5 py-2  font-semibold w-40 h-15 bg-red-400 text-black hover:text-white hover:bg-red-800 duration-300 rounded-3xl shadow-lg shadow-red-500 text-2xl' onClick={(e) => handleLogout(e)}>Log Out</button>
        </div> : <div className='flex justify-center items-center flex-col gap-3'> 
              <div  className='text-4xl text-center font-serif flex gap-5'>
                <button className='w-40 h-15 bg-green-400 text-black hover:text-white hover:bg-green-800 duration-300 rounded-3xl shadow-lg shadow-green-500'><Link to="/login">Login</Link></button>
                <button className='w-40 h-15 bg-red-400 text-black hover:text-white hover:bg-red-800 duration-300 rounded-3xl shadow-lg shadow-red-500'><Link to="/register">Register</Link></button>
              </div>
                  <p className='text-center text-4xl font-serif mt-3 font-semibold text-green-800'><font className="text-red-800">Wel</font>come</p>
          </div>}
    </div>
  )
}

export default Home
