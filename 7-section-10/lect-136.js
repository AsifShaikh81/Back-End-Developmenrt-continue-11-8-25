// lect 136. Sending Emails with Nodemailer
// router.route('/forgotPassword').post(authController.forgotPassword)
// util folder
const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // 1)create transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASS,
    },
  });
  // 2)define the email options
  const mailOptions = {
    from: 'asif shaikh <asif@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  // 3) actually sned the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;

// config file
/* EMAIL_USERNAME=d3bddffa72d032
EMAIL_PASS=3d5dae50a4bc50
EMAIL_HOST=sandbox.smtp.mailtrap.io
EMAIL_PORT=25 */

// IN AUTH CONTROLLER
const sendEmail = require('./../utils/email');

// in auth controller
exports.forgotPassword = tryCatchAsync(async (req, res, next) => {
  //*1) get user based on posted email
  const user = await userM.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('there is no user with the email address'));
  }
  // 2) generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });
  //  lect 136--in this lect main focus
  // 3) send it to user's email
  const reseturl = `${req.protocol}//${req.get('host')}/api/v1/users/resetPassword/${resetToken}`;

  const message = `forgot ur pass? submit patch req and pass confirm to: ${reseturl}`;

  try {
    await sendEmail({ email: user.email, subject: 'your pass reset token(valid for 10)', message });

    res.status(200).json({
      status: 'success',
      message: 'token sent to email',
    });
  } catch (error) {
    ((user.passwordResetToken = undefined),
      (user.passwordResetExpires = undefined),
      await user.save({ validateBeforeSave: false }));
    return next(new AppError('error sending email', 500));
  }
});
