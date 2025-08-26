
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

function App() {
  

  return (
    <>
      
      <main className='bg-[#F5F5F5] min-h-screen'>
        <Outlet />
        <ToastContainer />
      </main>
    </>
  )
}

export default App
