import nodemailer from 'nodemailer';
import ejs from 'ejs';

const transporter = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: 'c787918160a27a',
    pass: '18cf05b43c85e5',
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
