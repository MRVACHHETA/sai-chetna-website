// File: scripts/insertSuperAdmin.ts

require('dotenv').config({ path: '.env.local' }); // Load from .env.local
console.log("Loaded URI:", process.env.MONGODB_URI); // ✅ Debug check

const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error('❌ MONGODB_URI not found in .env.local');
  process.exit(1);
}

const client = new MongoClient(uri);

async function insertSuperAdmin() {
  try {
    await client.connect();

    const db = client.db('sai-chetna-db');
    const users = db.collection('users');

    const superAdmin = {
      name: 'Harsh Vachheta',
      email: 'superadmin@sai.com',
      password: await bcrypt.hash('123456', 10),
      role: 'super-admin',
      status: 'active',
      createdAt: new Date(),
    };

    const existing = await users.findOne({ email: superAdmin.email });

    if (existing) {
      console.log('⚠️ Super Admin already exists:', existing.email);
    } else {
      await users.insertOne(superAdmin);
      console.log('✅ Super Admin inserted successfully!');
    }
  } catch (err) {
    console.error('❌ Error inserting Super Admin:', err);
  } finally {
    await client.close();
  }
}

insertSuperAdmin();