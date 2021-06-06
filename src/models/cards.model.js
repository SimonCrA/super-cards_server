const mongoose = require('mongoose')
const colorValidator = (v) => (/^#([0-9a-f]{3}){1,2}$/i).test(v);

const cardsSchema = new mongoose.Schema({

  user: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  backgroundColor: {
    type: String,
    validator: [colorValidator, 'Invalid color'],
    required: true
  },
  iconColor: {
    type: String,
    validator: [colorValidator, 'Invalid color'],
    required: true
  },
  textColor: {
    type: String,
    validator: [colorValidator, 'Invalid color'],
    required: true
  },
  barColor: {
    type: String,
    validator: [colorValidator, 'Invalid color'],
    required: true
  },
  cardColor: {
    type: String,
    validator: [colorValidator, 'Invalid color'],
    required: true
  },
  footerColor: {
    type: String,
    validator: [colorValidator, 'Invalid color'],
    required: true
  },
  text: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    default: true
  }

})

module.exports = mongoose.model('Cards', cardsSchema)