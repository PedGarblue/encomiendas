const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({
  completed: {
    type: Boolean,
    default: false,
  },
  bike: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
});

const Delivery = mongoose.model('Delivery', deliverySchema);

module.exports = Delivery;