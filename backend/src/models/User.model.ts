import { getModelForClass, index, modelOptions, pre, prop } from '@typegoose/typegoose';
import bcrypt from 'bcryptjs';

//indexed attribute
@index({ email: 1 })
//hash the passwd only if the passwd is new or modified
@pre<User>('save', async function () {
  // Hash password if the password is new or was updated
  if (!this.isModified('password')) return;

  // Hash password with costFactor of 12
  this.password = await bcrypt.hash(this.password, 12);
})
@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})

export class User {
  @prop()
  username: string;
  @prop({
    required: [true, 'Provide a username']
  })
  email: string;
  @prop({
    required: [true, 'Provide a password'],
    minLength: 6,
    select: false
  })
  password: string;
  @prop()
  role: string;

  // Instance method to check if passwords match
  async comparePasswords(hashedPassword: string, candidatePassword: string) {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  }

}

const userModel = getModelForClass(User);

export default userModel;


/*
export interface UserDocument extends Document {
  username: String,
  email: String,
  password: String,
  roles: any
};

export interface UserModel extends Model<UserDocument> {
  findByIdentity: (this: UserModel, identity: string) => Promise<UserDocument | null>
}

const UserSchema = new mongoose.Schema<UserDocument, UserModel>({
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

  tokens: [{ type: Object }],// another attribute useful implement at final
});


UserSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();

  const SALT_WORK_FACTOR = 10;

  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);

  const hash = await bcrypt.hash(this.password, salt); // Property 'password' does not exist on type 'Document<any>'.

  this.password = hash; // Property 'password' does not exist on type 'Document<any>'.

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
*/