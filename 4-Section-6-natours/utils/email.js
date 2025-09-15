const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');
module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split('')[0];
    this.url = url;
    this.from = `asif shaikh <${process.env.EMAIL_FROM}>`;
  }
  newTransport() {
    if (process.env.Node_ENV === 'production') {
      // sendgrid
      return 1;
    }
    return nodemailer.createTransport({
      // 1)create transporter

      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASS,
      },
    });
  }
  // send actual email
  async send(template, subject) {
    // 1) Render HTML based on a pug template
    //*dont forget to create email.pug
    const html = pug.renderFile(`${__dirname}/../views/emails/${template}.pug`,{
        firstName:this.firstName,
        url:this.url,
        subject
    });
    //2) define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject: this.subject,
      html,
      text: htmlToText.fromString(html),
    };
    // 3) Create a transport and send email
       await this.newTransport().sendMail(mailOptions) ;
  }
  async sendwelcome() {
   await  this.send('welcome', 'welcome to natours');
  }
};

/* const sendEmail = async (options) => {
   1)create transporter
    const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASS,
    },
  }); 
   2)define the email options
   const mailOptions = {
    from: 'asif shaikh <asif@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  }; 

   3) actually sned the email
  await transporter.sendMail(mailOptions);
};

 module.exports = sendEmail; */
