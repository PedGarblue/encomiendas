const mongoose = require('mongoose');

const validProducts = ['cookies', 'apples', 'fororo']

const deliverySchema = new mongoose.Schema({
  bike: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  products: {
    type: Array,
    validate: {
      validator(value) {
        return value.every(item => validProducts.includes(item));
      },
      message: () => `Invalid products`,
    },
    required: true,
  },
  hour: {
    type: String,
    validate: {
      validator(value) {
        return /^[0-2]?[0-9]:[0-5][0-9](AM|PM)$/.test(value);
      },
      message: () => `Invalid hour`,
    },
  },
});

const Delivery = mongoose.model('Delivery', deliverySchema);

module.exports = Delivery;