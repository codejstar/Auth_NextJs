'use client' //directive 
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'


export default function  LoginPage() {
 
    const router = useRouter()
    const [user, setUser] = useState({
        email: "",
        password: "",
    })

    const [buttonDisabled, setBUttonDisabled] = useState(false)
    const [loading ,setLoading] = useState(false)

    const onLogin = async () => {
        try{
          setLoading(true)

        const response =  await axios.post('/api/users/login',user)
        console.log("login success", response.data)

        router.push('/profile')
        
        }

        catch(error: any){
            console.log("Login error", error);
            toast.error(error.message)
        }
    }

    useEffect(() => {
       if(user.email.length > 0 && user.password.length > 0 ){
          setBUttonDisabled(false);
       }else{
           setBUttonDisabled(true);
       }
    },[user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-black text-white">
      <h1>{loading ? "Processing" : "login"}</h1>
      <hr />

     <label htmlFor="email">email</label> 
     <input
      className='text-black p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
      id='email'
      value={user.email}
      onChange={(e) => setUser({...user, email: e.target.value})}
      placeholder='email'
      type="email" />

     <label htmlFor="password">password</label>
     <input
      className='text-black p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
      id='password'
      value={user.password}
      onChange={(e) => setUser({...user, password: e.target.value})}
      placeholder='password'
      type="password" />

      <button onClick={onLogin} className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'>{buttonDisabled ? "No login" : "Login"}</button>
      <Link href="/signup">Visit signup page</Link>
    </div>
  )
}
