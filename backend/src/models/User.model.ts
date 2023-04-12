import { getModelForClass, index, modelOptions, pre, prop, setGlobalOptions, Severity } from '@typegoose/typegoose';
import bcrypt from 'bcryptjs';
import { addJwtToken } from '../services/user.service';
import crypto from 'crypto';

setGlobalOptions({ options: { allowMixed: Severity.ALLOW } });

export class JwtToken {
  @prop()
  token: string;
  @prop()
  signedAt: string;
};

//indexed attribute
@index({ email: 1 })
//hash the passwd only if the passwd is new or modified
@pre<User>('save', async function (next) {
  // Hash password if the password is new or was updated
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  // Hash password with costFactor of 12
  this.password = await bcrypt.hash(this.password, salt);
  return next();
})

@modelOptions({
  schemaOptions: {
    timestamps: true

  },
})


export class User {
  _id: string;
  @prop()
  username: string;
  @prop({
    required: [true, 'Provide a username']
  })
  email: string;
  @prop({
    required: [true, 'Provide a password'],
    minLength: 8,
    select: false
  })
  password: string;
  @prop({ default: 'user' })
  role: string;
  @prop()
  resetPasswordToken: string;
  @prop()
  resetPasswordExpire: number;
  @prop()
  tokens: [type: JwtToken]


  // Instance method to check if passwords match
  async comparePasswords(hashedPassword: string, candidatePassword: string) {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  }

  async addJwtTokens(token: any) {
    let oldTokens: [type: JwtToken] = this.tokens || [];

    let newToken: JwtToken = {
      token,
      signedAt: Date.now().toString()
    };

    oldTokens.filter((t: JwtToken) => {
      const timeDiff = (Date.now() - parseInt(t.signedAt)) / 1000;
      if (timeDiff < 86400) return t;
    });

    await addJwtToken(this._id, oldTokens, newToken);
  }

  getResetPasswordToken() {
    const resetToken = crypto.randomBytes(20).toString('hex');

    this.resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    //edit time of token to 15 minutes
    this.resetPasswordExpire = Date.now() + 15 * (60 * 1000);
    return resetToken;
  };
};

const userModel = getModelForClass(User);

export default userModel;


