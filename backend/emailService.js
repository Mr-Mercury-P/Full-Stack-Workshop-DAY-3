const nodemailer=require("nodemailer")

const transporter=nodemailer.createTransport({
    service:"Gmail",
    auth:{
        user:"22501a4452@pvpsit.ac.in",
        pass:"LqDGp161"
    }
})
module.exports=transporter