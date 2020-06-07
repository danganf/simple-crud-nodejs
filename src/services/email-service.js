'use strict';

const nodemailer = require("nodemailer");
const {CON_SMTP, CON_PORT, CON_AUTH_USER, CON_AUTH_PASS} = require('../configs/config-email');

class emailService{

    constructor(){
        this.transport = nodemailer.createTransport({
            host: CON_SMTP,
            port: CON_PORT,
            auth: { user: CON_AUTH_USER, pass: CON_AUTH_PASS }
          });
    }

    async send(to, subject, bodyHtml){
       
        let info = await this.transport.sendMail({
            from: '"Daniel" <daniel@gmail.com>', // sender address
            to: to, // list of receivers
            subject: subject, // Subject line
            html: bodyHtml, // html body
        });

        //console.log("Message sent: %s", info.messageId);
        //console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }

}

module.exports = emailService;