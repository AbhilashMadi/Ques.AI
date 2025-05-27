const { Schema, model } = require('mongoose');
const { hashPassword, comparePassword } = require('#lib/bcrypt');
const { EMAIL_REGEX } = require('#resources/regex-patterns');

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    index: true,
    match: [EMAIL_REGEX, 'Please enter a valid email address'],
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    // select: false,
  },
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  active: {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform(_doc, ret) {
      ret.userId = ret._id;

      delete ret.password;
      delete ret._id;
      delete ret.__v;

      return ret;
    },
  },
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await hashPassword(this.password);
  next();
});

// Instance method to compare password
userSchema.methods.comparePassword = function (candidatePassword) {
  return comparePassword(candidatePassword, this.password);
};

module.exports = model('User', userSchema);
