require('dotenv').config()
const nodeMailer = require('nodemailer');
const sendGrid = require('nodemailer-sendgrid-transport') 

const transporter = nodeMailer.createTransport(sendGrid({
    auth:{
     api_key:process.env.MAILSENDERID
  }
 }
));

module.exports = transporter;