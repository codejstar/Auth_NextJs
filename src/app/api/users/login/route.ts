import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/useModel'
import {NextRequest, NextResponse} from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from "jsonwebtoken"

connect()

export async function POST(request: NextRequest){
    try{
        
        const reqBody = await request.json()
        const {email, password} = reqBody
        //validation
        console.log(reqBody);

       const user = await User.findOne({email})
       console.log(user)  

       if(!user){
        return NextResponse.json({
            error: "User does not exist"
        }, {status: 400})  
       }

       console.log("USer exists");

       const validPassword = await bcryptjs.compare(password, user.password)

       if(!validPassword){
        return NextResponse.json({
            error: "Check your credentials"
        }, {status: 400})  
       }

       console.log("password exists");
       
       const tokenData  = {
        id: user._id,
        username: user.username,
        email: user.email
       }

        console.log(tokenData)

      const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: '1h'})
    
      console.log(token)

      const response = NextResponse.json({
         message: "Logged In Success",
         success: true,
      }, {status: 200})

      console.log(response)
      //in next.js we not require to instal cookie package seprately
      response.cookies.set("token", token, {
        httpOnly: true,
      }, )

      return response
    }
    catch(err:any){
        return NextResponse.json({
            error: err.message
        }, {status: 500})  
    }
}