const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true
  },
  nickname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: false
  },
  status: {
    type: Boolean,
    default: true
  },
  img: {
    type: String,
    required: false
  },
  permissionLevel: {
    type: Number,
    default: 1
  },
  reminder: {
    type: Boolean,
    default: false
  },
  points: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Points'
  },
  goals: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Goals'
  },
  notifications: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Notifications'
  }

});

userSchema.methods.toJSON = function() {
  let user = this;
  let userObject = user.toObject();
  delete userObject.password;

  return userObject;
}

userSchema.plugin( uniqueValidator, { message: '{PATH} must be unique' } );

module.exports = mongoose.model('User', userSchema);
