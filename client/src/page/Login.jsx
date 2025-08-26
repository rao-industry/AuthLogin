import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { toast } from 'react-toastify';
import {useDispatch, useSelector} from "react-redux"
import axios from 'axios';
import { api } from '../config/endpoints';
import { handleSetUserDetails } from '../store/user.reducer';
import { useEffect } from 'react';
const Login = () => {
    const [data, setData] = useState({
        email: "",
        password: ""
    })
    const user = useSelector(state => state.user)
    const [showPassword , setShowPassword] = useState(false)
    const [isLoading , setIsLoading] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            const res = await axios.post(api?.user?.login ,  data)
            toast.success(res?.data?.message);
            dispatch(handleSetUserDetails(res?.data?.user))
            console.log(res , "this is res")
            localStorage.setItem("authorization" ,res?.data?.accessToken )
            navigate("/")
            setIsLoading(false)
        } catch (error) {
            console.log(error , "login error");
            toast.error(error?.response?.data?.message)
            setIsLoading(false)
        }
    }

     useEffect(() => {
            if(user.email){
                navigate("/")
            }
        },[user])
    return (
        <div className='w-full min-h-screen h-auto flex justify-center items-center shadow-lg shadow-red-600'>

            <form onSubmit={(e) => handleLogin(e)} className='w-[90%] md:w-[40%] px-6 py-10 mx-auto  rounded-md bg-[#e6cac4] shadow-lg shadow-orange-100'>
                <p className='w-full text-center text-3xl font-serif my-10'><img src="login.png" alt="" className='text-center m-auto rounded-full items-center'/></p>
                <div className='mt-10 w-full mx-auto'>
                    <div className='w-[90%] mt-5 mx-auto'>
                        <label htmlFor="email" className='ml-3 '>Enter your email</label>
                        <input id='email' type="email" name='email' onChange={(e) => setData(prev => ({ ...prev, [e.target.name]: e.target.value }))} className='w-full h-10 rounded-md text-md pl-3 shadow-lg shadow-white bg-[#F5F5F5] hover:bg-[#c6c4c4] mt-3 focus:outline-[#07b312] focus:outline-2 ' placeholder='Enter your email' />
                    </div>
                    <div className="w-[90%] mt-5 mx-auto relative">
                        <label htmlFor="password" className="ml-3">Enter your password</label>
                        <input id="password" type={showPassword ? "text" : "password"} name="password" onChange={(e) => setData((prev) => ({ ...prev, [e.target.name]: e.target.value }))} className="w-full h-10 rounded-md text-md pl-3 pr-10 shadow-lg shadow-white bg-[#F5F5F5] hover:bg-[#c6c4c4] mt-3 focus:outline-[#07b312] focus:outline-2" placeholder="Enter your password" />
                        <span className="absolute right-3 top-14 -translate-y-1/2 cursor-pointer text-gray-600" onClick={() => setShowPassword(!showPassword)} >{showPassword ? <FaRegEye /> : <FaRegEyeSlash />}</span>
                    </div>
                </div>

                <button disabled={isLoading} className='w-[90%] ml-[5%] h-10 mt-8 rounded-md bg-green-400 text-black hover:text-white hover:bg-green-800 duration-300 shadow-lg shadow-green-500' type='submit'>Login</button>
                
                <div className='text-center font-serif mt-3'>I don't have a account | <Link to="/register" className='text-blue-700 hover:text-red-700 duration-200 font-semibold'>Register</Link></div>
            </form>
        </div>
    )
}

export default Login
