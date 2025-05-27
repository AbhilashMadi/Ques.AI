module.exports = ({ fullName, from, otp, expiryMinutes, email }) => ({
  from: `"Ques.AI" <${from}>`,
  to: email,
  subject: 'Your OTP Code for Verification',
  html: `
    <div>
      <p>Hello <strong>${fullName}</strong>,</p>
      <p>Your OTP is: <strong>${otp}</strong></p>
      <p>This code is valid for ${expiryMinutes} minutes.</p>
      <p>Do not share it with anyone.</p>
      <br/>
      <p>Team Ques.AI</p>
    </div>
  `
})
