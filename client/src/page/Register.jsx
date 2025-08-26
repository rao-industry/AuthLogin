import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { api } from '../config/endpoints';
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
const Register = () => {
    const navigate = useNavigate()
    const user = useSelector(state => state.user)
    const [isLoading , setIsLoading] = useState(false)
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        role:""
    });
    const [showPassword, setShowPassword] = useState(false)
    const handleRegister = async (e) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            console.log(data, "user Register data")
            const res = await axios.post(api.user.register, data);
            console.log(res , "this is res")
            toast.success(res?.data?.message)
            navigate("/login")
            setIsLoading(false)
        } catch (error) {
            console.log(error, "Error while user Register")
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

            <form onSubmit={(e) => handleRegister(e)} className='w-[90%] md:w-[40%] px-6 py-10 mx-auto  rounded-md bg-[#e6cac4] shadow-lg shadow-orange-100'>
                <div className='w-full text-center text-3xl font-serif my-10'><img src="register.png" alt="logo" className='ml-47 mt-0 rounded-full  '/></div>
                
                    <div className='flex'>
                                <div className=' w-full mx-auto'>
                            <div className='w-[90%]  mx-auto'>
                                <label htmlFor="name" className='ml-3 '>Enter your name</label>
                                <input id='name' type="text" name='name' onChange={(e) => setData(prev => ({ ...prev, [e.target.name]: e.target.value }))} className='w-full h-10 rounded-md text-md pl-3 shadow-lg shadow-white bg-[#F5F5F5] hover:bg-[#c6c4c4] mt-3 focus:outline-[#0b9b04] focus:outline-2 ' placeholder='Enter your name' />
                            </div>
                            <div className='w-[90%] mt-11 mx-auto'>
                                <label htmlFor="email" className='ml-3 '>Enter your email</label>
                                <input id='email' type="email" name='email' onChange={(e) => setData(prev => ({ ...prev, [e.target.name]: e.target.value }))} className='w-full h-10 rounded-md text-md pl-3 shadow-lg shadow-white bg-[#F5F5F5] hover:bg-[#c6c4c4] mt-3 focus:outline-[#0b9b04] focus:outline-2 ' placeholder='Enter your email' />
                            </div>
                        
                        </div>

                        <div  className=' w-full mx-auto'>
                           <div className="w-[90%] mx-auto mt-1">
                                <label htmlFor="role" className="ml-3">Select your role</label>
                                <select
                                    id="role"
                                    name="role"
                                    value={data.role || ""}
                                    onChange={(e) => setData((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
                                    className={`w-full h-10 rounded-md text-md pl-3 shadow-lg shadow-white bg-[#F5F5F5] hover:bg-[#c6c4c4] mt-2 focus:outline-[#0b9b04] focus:outline-2 ${!data.role ? "text-red-500" : "text-black"}`}
                                >
                                    <option value="" disabled hidden> Please select a role </option>
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                                </div>

                            <div className="w-[90%] mt-11  mx-auto relative">
                                <label htmlFor="password" className="ml-3">Create a password</label>
                                <input id="password" type={showPassword ? "text" : "password"} name="password" onChange={(e) => setData((prev) => ({ ...prev, [e.target.name]: e.target.value }))} className="w-full h-10 rounded-md text-md pl-3 pr-10 shadow-lg shadow-white bg-[#F5F5F5] hover:bg-[#c6c4c4] mt-3 focus:outline-[#0b9b04] focus:outline-2" placeholder="Create a password" />
                                <span className="absolute right-3 top-14 -translate-y-1/2 cursor-pointer text-gray-600" onClick={() => setShowPassword(!showPassword)} >{showPassword ? <FaRegEye /> : <FaRegEyeSlash />}</span>
                            </div>
                        </div>
                        
                    </div>
                    <button disabled={isLoading} className='w-[90%] md:w-full  h-10 mt-14 rounded-md bg-green-400 text-black hover:text-white hover:bg-green-800 duration-300 font-semibold  shadow-lg shadow-green-500' type='submit'>Register</button>
                    <br />
                <div className='text-center font-serif mt-1'>I already have an account | <Link to="/login" className='text-blue-700 hover:text-red-700 duration-200 font-semibold'>Login</Link></div>
            </form>
        </div>
    )
}

export default Register
