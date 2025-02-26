const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/paytm-clone");
const userSchema = new mongoose.Schema({
  userName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,

  },
  password: {
      type: String,
      required: true,
  
  },
  firstName: {
      type: String,
      required: true,
      trim: true,
   
  },
  lastName: {
      type: String,
      required: true,
      trim: true,
  }
});


const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance:{
        type: Number,
        required: true
    }
});


const Account= mongoose.model('Account', accountSchema);
const User = mongoose.model('User', userSchema);

module.exports = {
User,
Account,
};