const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const customersModel = require('../models/customersModel');

class AuthService {
  constructor() {
    this.secretKey = process.env.JWT_SECRET; 
}

  async registerUser(first_name, last_name, phone, email, password, birthdate) {
    const existingUser = await customersModel.findOne({ email });
    if (existingUser) {
      return { success: false, message: 'המשתמש קיים במערכת' }
    }
    const maxCustomer = await customersModel.findOne().sort({ customer_id: -1 }).select('customer_id -_id');
    const customer_id = maxCustomer ? maxCustomer.customer_id + 1 : 1;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new customersModel({customer_id, first_name, last_name, phone, email, birthdate, password: hashedPassword });
    await newUser.save();
    return { success: true, user: newUser };
  }

  async loginUser (email, password){
    const user = await customersModel.findOne({ email });
    if (!user) {
      return { success: false, message: 'המשתמש לא נמצא' }
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new Error('Invalid password');
    }
    const token = jwt.sign({ userId: user._id }, this.secretKey, { expiresIn: '1h' });
    return { success: true, token:token, user:user };
  };

}

let authService = new AuthService();
module.exports = authService;
