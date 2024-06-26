import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/useModel'
import {NextRequest, NextResponse} from 'next/server'
import bcryptjs from 'bcryptjs'
import {sendEmail} from '@/helpers/mailer'

connect()

export async function POST(request: NextRequest){
    try{
       const reqBody = await request.json()
       const {username, email, password} = reqBody
       //validation
       console.log(reqBody)

        const user = await User.findOne({email})

        if(user){
            return NextResponse.json({error: "User alredy exists"}, {status: 400})
        }

        var salt = await bcryptjs.genSaltSync(10);

        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
         })

         const savedUser = await newUser.save();
         console.log(savedUser);
        //  console.log(newUser.id);

        //  console.log(savedUser._id)
         //send verfication email
         await sendEmail({email, emailType: "VERIFY", userId: savedUser.id})

         return NextResponse.json({
            message: "User registered successfully",
            success: true,
            savedUser
         })
    }
    catch(error:any){
        return NextResponse.json({
            error: error.message
        }, {status: 500})  
    }
}