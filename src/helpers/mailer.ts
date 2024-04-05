import User from '@/models/useModel';
import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';

export const sendEmail = async ({email, emailType, userId}:any) => {
    try{
        //to do : configure mail for usage
     const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if(emailType === "VERTIFY"){
            await User.findByIdAndUpdate(userId,{verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000})
        } else if(emailType === "RESET"){
            await User.findByIdAndUpdate(userId,{forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000})
        }

        // const transporter = nodemailer.createTransport({
        //     host: "smtp.ethereal.email",
        //     port: 587,
        //     secure: false, // Use `true` for port 465, `false` for all other ports
        //     auth: {
        //       user: "maddison53@ethereal.email",
        //       pass: "jn7jnAPss4f63QBp6D",
        //     },
        //   });

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "ba5adc1a9ed937", // not allowed
              pass: "5f5b259b710d7b" //not allowed
            }
          });

        const mailOptions = {
            from: 'maddison53@ethereal.gmail.com', // sender address
            to: email, // list of receivers
            subject: emailType === 'VERIFY' ? "Verify your email" :  "Reset your password", // Subject line
            html: `<p>click here <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a>to $ {emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser <br/>
            ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`, // html body
          }

          const mailResponse = await transport.sendMail(mailOptions)

          return mailResponse
    }
    catch(err:any) {
            throw new Error(err.message)
    }
}