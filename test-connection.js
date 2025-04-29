// test-connection.js
require('dotenv').config();
const mongoose = require('mongoose');

async function testConnection() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conexión a MongoDB exitosa!');
    return mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error de conexión a MongoDB:', error);
  }
}

testConnection();