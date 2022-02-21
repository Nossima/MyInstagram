import {
  Model, Schema
} from 'mongoose';
import * as bcrypt from 'bcryptjs';
import * as mongoose from 'mongoose';

export enum Role {
  USER,
  SUBSCRIBER,
  ADMIN
}

export interface Account {
  id: string,
  username: string,
  email: string,
  role: Role,
  password: string,
  birthDate: number,
  token: string
}

export const AccountSchema = new Schema<Account>({
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  role: { type: String, enum: Role },
  password: { type: String },
  birthDate: { type: Number },
  token: { type: String }
});

AccountSchema.pre('save', function (next) {
  const user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password'))
    return next();

  // generate a salt
  bcrypt.genSalt(10, function (err, salt) {
    if (err)
      return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (e, hash) {
      if (e)
        return next(e);
      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

export const AccountModel: Model<Account> = mongoose.model<Account>('Account', AccountSchema);
