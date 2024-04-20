const nodemailer=require("nodemailer")

module.exports=async(email,subject,text)=>{
    try {
        const transporter=nodemailer.createTransport({
            host:process.env.HOST,
            service:process.env.SERVICE,
           post:Number(process.env.EMAIL_PORT),
            host:process.env.HOST,
        })
    } catch (error) {
        
    }
}