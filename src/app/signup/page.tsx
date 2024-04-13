'use client' //directive 
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'


export default function SignUppage() {
 
    const router = useRouter()
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: ""
    })

    const [buttonDisabled, setBUttonDisabled] = useState(false)
    const [loading ,setLoading] = useState(false)

    const onSignup = async () => {
        try{
          setLoading(true)

        const response =  await axios.post('/api/users/signup',user)
        console.log("Singup success", response.data)

        router.push('/login')
        
        }
        catch(error: any){
            console.log("Singup error", error);
            toast.error(error.message)
        }
    }

    useEffect(() => {
       if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
          setBUttonDisabled(false);
       }else{
           setBUttonDisabled(true);
       }
    },[user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-black text-white">
      <h1>{loading ? "Processing" : "Singup"}</h1>
      <hr />
      <label htmlFor="username">username</label>
      <input
      className='text-black p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
      id='username'
      value={user.username}
      onChange={(e) => setUser({...user, username: e.target.value})}
      placeholder='username'
      type="text" />

     <label htmlFor="username">email</label> 
     <input
      className='text-black p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
      id='username'
      value={user.email}
      onChange={(e) => setUser({...user, email: e.target.value})}
      placeholder='email'
      type="email" />

     <label htmlFor="username">password</label>
     <input
      className='text-black p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
      id='username'
      value={user.password}
      onChange={(e) => setUser({...user, password: e.target.value})}
      placeholder='password'
      type="password" />

      <button onClick={onSignup} className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'>{buttonDisabled ? "No signup" : "singup"}</button>
      <Link href="/login">Visit login page</Link>
    </div>
  )
}
