import crypto from 'crypto';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Provide a username'],
  },
  email: {
    type: String,
    required: [true, 'Provide an email'],
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'provide a valid email',
    ],
  },
  password: {
    type: String,
    required: [true, 'Provide a password'],
    minLength: 6,
    select: false,
  },
  roles: [
    {
      ref: 'Role',
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  tokens: [{ type: Object }],
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.getSignedJwtToken = function () {
  const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
  this.addJwtTokens(token);
  return token;
};

UserSchema.methods.addJwtTokens = async function (token) {
  let oldTokens = this.tokens || [];

  if (oldTokens.length) {
    oldTokens = oldTokens.filter((t) => {
      const timeDiff = (Date.now() - parseInt(t.signedAt)) / 1000;
      if (timeDiff < 86400) return t;
    });
  }

  await User.findByIdAndUpdate(this._id, {
    tokens: [...oldTokens, { token, signedAt: Date.now().toString() }],
  });
};

UserSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString('hex');

  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  //edit time of token to 15 minutes
  this.resetPasswordExpire = Date.now() + 15 * (60 * 1000);

  return resetToken;
};
const User = mongoose.model('User', UserSchema);

export default User;
