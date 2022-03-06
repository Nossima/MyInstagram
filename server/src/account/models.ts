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
  bio: string,
  avatar: string,
  role: Role,
  password: string,
  birthDate: number,
  private: boolean,
  following: Array<string>,
  followedBy: Array<string>,
  posts: Array<string>,
  friendRequests: Array<string>
}

export const AccountSchema = new Schema<Account>({
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  bio: { type: String },
  avatar: { type: String },
  role: { type: String, enum: Role },
  password: { type: String },
  birthDate: { type: Number },
  private: { type: Boolean, default: false },
  following: { type: [String] },
  followedBy: { type: [String] },
  posts: { type: [String] },
  friendRequests: { type: [String] }
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
