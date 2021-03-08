const mongoose = require('mongoose');

const bikeSchema = new mongoose.Schema({
  plate: {
    type: String,
    required: true,
  },
});

const Bike = mongoose.model('Bike', bikeSchema);

module.exports = Bike;