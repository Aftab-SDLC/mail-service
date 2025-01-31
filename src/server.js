import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import nodemailer from 'nodemailer';
dotenv.config();


const app = express();

app.use(cors());
app.use(express.json());

async function sendEmail(options){
    try {
     
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        port:465,
        secure: true,
        auth: {
          user: process.env.EMAIL_ID,
          pass: process.env.EMAIL_PASSWORD
        }
      });
      
      // Define mail options
      const mailOptions = {
        from: process.env.EMAIL_ID,
        to: options.email,
        subject: options.subject,
        text: options.text,
      };
    
      await transporter.sendMail(mailOptions);
      console.log(`Email sent to ${options.email}`);
      return true;
    } catch (error) {
      console.error('Failed to send email:', error.message || error);
      return false;
    }
  }

app.get('/', (req, res) => {
    res.send('Welcome to sms service!');
});
app.post("/send-sms",(req,res)=>{
    
    sendEmail(req.body)
    return res.json("Sending SMS")
})


app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})