const mongoose = require('mongoose');

const customersSchema = mongoose.Schema({
    customer_id: Number,
    first_name: String,
    last_name: String,
    phone: String,
    email: String,
    birthdate: Date,
    password: String
}, { collection: 'Customers' }
)

const model = mongoose.model('Customers', customersSchema);

module.exports = model;