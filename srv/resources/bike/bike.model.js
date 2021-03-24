const mongoose = require('mongoose');
const { pick } = require('../../utils/object.util');

const bikeSchema = new mongoose.Schema({
  plate: {
    type: String,
    required: true,
  },
});

bikeSchema.methods.transform = function () {
  const bike = this;
  return pick(bike, ['id', 'plate']);
}

const Bike = mongoose.model('Bike', bikeSchema);

module.exports = Bike;