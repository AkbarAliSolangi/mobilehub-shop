const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Smartphone', 'Cover', 'Charger', 'USB Cable', 'Earphone', 'Power Bank', 'Screen Protector', 'Smart Watch']
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  purchasePrice: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  specifications: {
    ram: String,
    rom: String,
    processor: String,
    camera: String,
    battery: String,
    display: String
  },
  stock: {
    type: Number,
    required: true,
    default: 0
  },
  warranty: {
    type: String,
    default: '1 Year Official Warranty'
  },
  rating: {
    type: Number,
    default: 0
  },
  reviews: [{
    user: String,
    comment: String,
    rating: Number,
    date: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', productSchema);