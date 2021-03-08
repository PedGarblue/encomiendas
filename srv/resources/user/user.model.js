const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { pick, omit } = require('../../utils/object.util');

const userSchema = mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
        validate(value) {
          if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
            throw new Error('Password must contain at least one letter and one number');
          }
        },
      },
    },
    {
      timestamps: true,
      toObject: { getters: true },
      toJSON: { getters: true },
    }
  );
  
  userSchema.methods.toJSON = function() {
    const user = this;
    return omit(user.toObject(), ['password']);
  };
  
  userSchema.methods.transform = function() {
    const user = this;
    return pick(user.toJSON(), ['id', 'name']);
  };
  
  userSchema.pre('save', async function(next) {
    const user = this;
    if (user.isModified('password')) {
      user.password = await bcrypt.hash(user.password, 8);
    }
    next();
  });
  
  const User = mongoose.model('User', userSchema);
  
  module.exports = User;