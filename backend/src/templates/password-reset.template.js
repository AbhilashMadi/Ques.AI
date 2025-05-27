/**
 * Generates the email options for password reset.
 * 
 * @param {Object} params
 * @param {string} params.from  - Sender email address
 * @param {string} params.fullName - Full name of the user
 * @param {string} params.email - Email address of the user
 * @param {string} params.resetLink - Password reset link
 * @param {number} [params.expiryMinutes=15] - Expiry time in minutes
 * @returns {import('nodemailer').SendMailOptions}
 */
module.exports = ({ fullName, from, email, resetLink, expiryMinutes = 15 }) => ({
  from: `"Ques.AI Support" <${from}>`,
  to: email,
  subject: 'Reset Your Password',
  html: `
    <div>
      <p>Hi <strong>${fullName}</strong>,</p>
      <p>You recently requested to reset your password. Click the link below to proceed:</p>
      <p><a href="${resetLink}">${resetLink}</a></p>
      <p>This link will expire in <strong>${expiryMinutes} minutes</strong>.</p>
      <p>If you did not request a password reset, please ignore this email.</p>
      <br />
      <p>The Ques.AI Team</p>
    </div>
  `
});
