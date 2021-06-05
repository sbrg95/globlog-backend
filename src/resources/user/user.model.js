/* eslint-disable no-param-reassign */
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre('save', function hashPassword(next) {
  if (!this.isModified('password')) {
    next();
    return;
  }

  bcrypt
    .hash(this.password, 8)
    .then((hash) => {
      this.password = hash;
      next();
    })
    .catch((err) => {
      next(err);
    });
});

userSchema.pre('findOneAndUpdate', function hashPassword(next) {
  if (!this._update.password) {
    next();
    return;
  }

  bcrypt
    .hash(this._update.password, 8)
    .then((hash) => {
      this._update.password = hash;
      next();
    })
    .catch((err) => {
      next(err);
    });
});

userSchema.methods.checkPassword = function checkPassword(password) {
  const passwordHash = this.password;
  return new Promise((resolve, reject) => {
    bcrypt
      .compare(password, passwordHash)
      .then((same) => resolve(same))
      .catch((err) => reject(err));
  });
};

const User = mongoose.model('user', userSchema);

export default User;
