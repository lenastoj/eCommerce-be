import nodemailer from 'nodemailer';
import ejs from 'ejs';

const transporter = nodemailer.createTransport({
  host: process.env.REACT_APP_MAIL_HOST,
  port: Number(process.env.REACT_APP_MAIL_PORT),
  auth: {
    user: process.env.REACT_APP_MAIL_USER,
    pass: process.env.REACT_APP_MAIL_PASS,
  },
});

export const mainMailSend = (email: string, subject: string, template) => {
  ejs.renderFile(template.dirname, { ...template.info }, (error, data) => {
    if (error) {
      return console.log(error);
    }

    transporter.sendMail(
      {
        from: 'ecommerce@example.com',
        to: email,
        subject,
        html: data,
      },
      (error, info) => {
        if (error) return console.log(error);
        console.log('Message sent: %s', info.messageId);
      }
    );
  });
};
