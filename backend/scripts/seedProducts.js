const mongoose = require('mongoose');
const Product = require('../models/Product');
const dotenv = require('dotenv');

dotenv.config();

const products = [
  {
    name: 'iPhone 15 Pro Max',
    category: 'Smartphone',
    description: 'Experience the future of smartphones with iPhone 15 Pro Max. Featuring the revolutionary A17 Pro chip, titanium design, and the most advanced camera system ever in an iPhone. Capture stunning photos with the 48MP main camera, enjoy all-day battery life, and experience gaming like never before.',
    price: 450000,
    purchasePrice: 420000,
    image: 'http://localhost:5173/assets/iphone15promax.png',
    specifications: {
      ram: '8GB',
      rom: '256GB',
      processor: 'A17 Pro chip (3nm)',
      camera: '48MP Main + 12MP Ultra Wide + 12MP Telephoto',
      battery: '4,422mAh with fast charging',
      display: '6.7-inch Super Retina XDR OLED'
    },
    stock: 10,
    warranty: '1 Year Official Apple Warranty'
  },
  {
    name: 'Samsung Galaxy S24 Ultra',
    category: 'Smartphone',
    description: 'Premium Android flagship with S Pen and AI features. The Galaxy S24 Ultra combines cutting-edge technology with elegant design. Features include the powerful Snapdragon 8 Gen 3 processor, stunning 200MP camera, and the iconic S Pen for productivity and creativity.',
    price: 380000,
    purchasePrice: 350000,
    image: 'http://localhost:5173/assets/samsungs24ultra.png',
    specifications: {
      ram: '12GB',
      rom: '512GB',
      processor: 'Snapdragon 8 Gen 3',
      camera: '200MP + 50MP + 12MP + 10MP',
      battery: '5,000mAh with 45W fast charging',
      display: '6.8-inch Dynamic AMOLED 2X'
    },
    stock: 15,
    warranty: '1 Year Official Samsung Warranty'
  },
  {
    name: 'Xiaomi 14 Pro',
    category: 'Smartphone',
    description: 'Flagship killer with Leica cameras and Snapdragon 8 Gen 3. The Xiaomi 14 Pro delivers exceptional performance with its powerful processor and stunning Leica-tuned cameras. Perfect for photography enthusiasts and power users.',
    price: 180000,
    purchasePrice: 150000,
    image: 'http://localhost:5173/assets/xiami14pro.png',
    specifications: {
      ram: '12GB',
      rom: '256GB',
      processor: 'Snapdragon 8 Gen 3',
      camera: '50MP Leica Main + 50MP Telephoto + 50MP Ultra Wide',
      battery: '4,880mAh with 120W fast charging',
      display: '6.73-inch LTPO AMOLED'
    },
    stock: 20,
    warranty: '1 Year Official Xiaomi Warranty'
  },
  {
    name: 'OnePlus 12',
    category: 'Smartphone',
    description: 'Flagship performance with Hasselblad cameras. The OnePlus 12 offers incredible speed, stunning photography, and all-day battery life. Features include the latest Snapdragon processor and Hasselblad-tuned camera system.',
    price: 165000,
    purchasePrice: 140000,
    image: 'http://localhost:5173/assets/oneplus12.png',
    specifications: {
      ram: '16GB',
      rom: '256GB',
      processor: 'Snapdragon 8 Gen 3',
      camera: '50MP Hasselblad + 48MP + 64MP',
      battery: '5,400mAh with 100W SUPERVOOC',
      display: '6.82-inch LTPO AMOLED'
    },
    stock: 25,
    warranty: '1 Year Official OnePlus Warranty'
  },
  {
    name: 'Realme GT 5 Pro',
    category: 'Smartphone',
    description: 'Gaming powerhouse with Snapdragon 8 Gen 3. The Realme GT 5 Pro delivers exceptional gaming performance with its advanced cooling system and high refresh rate display. Perfect for mobile gamers and content creators.',
    price: 140000,
    purchasePrice: 120000,
    image: 'http://localhost:5173/assets/realmegt5pro.png',
    specifications: {
      ram: '12GB',
      rom: '256GB',
      processor: 'Snapdragon 8 Gen 3',
      camera: '50MP Sony IMX890 + 8MP + 2MP',
      battery: '5,400mAh with 100W fast charging',
      display: '6.78-inch AMOLED 144Hz'
    },
    stock: 30,
    warranty: '1 Year Official Realme Warranty'
  },
  {
    name: 'Silicone Phone Cover - iPhone 15',
    category: 'Cover',
    description: 'Premium soft silicone cover with precise cutouts for perfect fit. Provides excellent protection against drops and scratches while maintaining the sleek design of your phone. Available in multiple colors.',
    price: 1500,
    purchasePrice: 500,
    image: 'http://localhost:5173/assets/siliconecoveriphone15.png',
    stock: 100,
    warranty: 'No Warranty'
  },
  {
    name: 'Fast Charger 65W GaN',
    category: 'Charger',
    description: 'Compact GaN fast charger compatible with all devices. Delivers up to 65W of power for rapid charging. Features multiple safety protections and universal compatibility with phones, tablets, and laptops.',
    price: 3500,
    purchasePrice: 2000,
    image: 'http://localhost:5173/assets/fastcharger.png',
    stock: 50,
    warranty: '6 Months Warranty'
  },
  {
    name: 'USB-C Cable 2M Braided',
    category: 'USB Cable',
    description: 'Durable braided USB-C cable with fast charging and data transfer support. 2-meter length provides flexibility and convenience. Reinforced connectors for long-lasting durability.',
    price: 800,
    purchasePrice: 300,
    image: 'http://localhost:5173/assets/cable.png',
    stock: 200,
    warranty: '3 Months Warranty'
  },
  {
    name: 'Wireless Earbuds Pro',
    category: 'Earphone',
    description: 'Premium wireless earbuds with active noise cancellation. Features include 30-hour battery life, IPX5 water resistance, and crystal-clear sound quality. Perfect for music lovers and professionals.',
    price: 12000,
    purchasePrice: 7000,
    image: 'http://localhost:5173/assets/airpods.png',
    stock: 75,
    warranty: '1 Year Warranty'
  },
  {
    name: 'Power Bank 20000mAh',
    category: 'Power Bank',
    description: 'High-capacity power bank with fast charging support. Can charge multiple devices simultaneously. Features LED display showing remaining battery and multiple safety protections.',
    price: 4500,
    purchasePrice: 2800,
    image: 'http://localhost:5173/assets/powerbank.png',
    stock: 60,
    warranty: '1 Year Warranty'
  },
  {
    name: 'Tempered Glass Screen Protector',
    category: 'Screen Protector',
    description: '9H hardness tempered glass with anti-fingerprint coating. Provides maximum protection against scratches and drops. Easy to install with bubble-free application.',
    price: 500,
    purchasePrice: 150,
    image: 'http://localhost:5173/assets/screenprotector.png',
    stock: 300,
    warranty: 'No Warranty'
  },
  {
    name: 'Smart Watch Fitness Tracker',
    category: 'Smart Watch',
    description: 'Advanced fitness tracker with heart rate monitoring and GPS. Features include sleep tracking, workout modes, and smartphone notifications. Water-resistant design perfect for active lifestyle.',
    price: 15000,
    purchasePrice: 9000,
    image: 'http://localhost:5173/assets/smartwatch.png',
    stock: 40,
    warranty: '1 Year Warranty'
  }
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany();
    console.log('Cleared existing products');

    // Insert new products
    await Product.insertMany(products);
    console.log('Products seeded successfully!');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();