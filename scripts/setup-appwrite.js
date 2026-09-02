const { Client, Databases, Storage, Permission, Role } = require('node-appwrite');
require('dotenv').config({ path: '.env.local' });

// Appwrite Endpoint and Credentials
const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1';
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const apiKey = process.env.APPWRITE_API_KEY; // API Key with Database & Storage write permissions
const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || 'game-nest-db';

if (!projectId || projectId.includes('your_') || !apiKey) {
  console.error('\n❌ ERROR: Missing Appwrite configuration in .env.local!');
  console.log('\nPlease make sure .env.local has:');
  console.log('  NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1');
  console.log('  NEXT_PUBLIC_APPWRITE_PROJECT_ID=<your_project_id>');
  console.log('  NEXT_PUBLIC_APPWRITE_DATABASE_ID=game-nest-db');
  console.log('  APPWRITE_API_KEY=<your_appwrite_api_key>\n');
  console.log('💡 To create an API Key: Go to Appwrite Console -> Project Settings -> API Keys -> Create API Key with (Databases.read, Databases.write, Storage.read, Storage.write) permissions.\n');
  process.exit(1);
}

const client = new Client()
  .setEndpoint(endpoint)
  .setProject(projectId)
  .setKey(apiKey);

const databases = new Databases(client);
const storage = new Storage(client);

async function setup() {
  console.log(`\n🚀 Initializing Appwrite Database (${databaseId}) on project (${projectId})...\n`);

  // 1. Create Database if not existing
  try {
    await databases.create(databaseId, 'Game-Nest Database');
    console.log(`✅ Database "${databaseId}" created.`);
  } catch (err) {
    if (err.code === 409) {
      console.log(`ℹ️  Database "${databaseId}" already exists.`);
    } else {
      console.error(`⚠️ Database setup warning:`, err.message);
    }
  }

  const collections = [
    {
      id: 'users',
      name: 'Users',
      attributes: [
        { key: 'userId', type: 'string', size: 128, required: true },
        { key: 'name', type: 'string', size: 128, required: true },
        { key: 'email', type: 'string', size: 256, required: true },
        { key: 'role', type: 'string', size: 32, required: true },
        { key: 'createdAt', type: 'string', size: 64, required: true },
      ],
    },
    {
      id: 'games',
      name: 'Games',
      attributes: [
        { key: 'gameId', type: 'string', size: 128, required: true },
        { key: 'sellerId', type: 'string', size: 128, required: true },
        { key: 'sellerName', type: 'string', size: 128, required: false },
        { key: 'title', type: 'string', size: 256, required: true },
        { key: 'subtitle', type: 'string', size: 256, required: false },
        { key: 'description', type: 'string', size: 4000, required: true },
        { key: 'genre', type: 'string', size: 64, required: true },
        { key: 'platform', type: 'string', size: 64, required: true },
        { key: 'price', type: 'float', required: true },
        { key: 'originalPrice', type: 'float', required: false },
        { key: 'coverImage', type: 'string', size: 1024, required: true },
        { key: 'badge', type: 'string', size: 32, required: false },
        { key: 'stock', type: 'integer', required: true },
        { key: 'rating', type: 'float', required: false },
        { key: 'status', type: 'string', size: 32, required: false },
        { key: 'createdAt', type: 'string', size: 64, required: true },
      ],
    },
    {
      id: 'cart_items',
      name: 'Cart Items',
      attributes: [
        { key: 'cartItemId', type: 'string', size: 128, required: true },
        { key: 'customerId', type: 'string', size: 128, required: true },
        { key: 'gameId', type: 'string', size: 128, required: true },
        { key: 'quantity', type: 'integer', required: true },
      ],
    },
    {
      id: 'orders',
      name: 'Orders',
      attributes: [
        { key: 'orderId', type: 'string', size: 128, required: true },
        { key: 'customerId', type: 'string', size: 128, required: true },
        { key: 'customerEmail', type: 'string', size: 256, required: true },
        { key: 'items', type: 'string', size: 10000, required: true },
        { key: 'total', type: 'float', required: true },
        { key: 'status', type: 'string', size: 32, required: true },
        { key: 'paymentMethod', type: 'string', size: 32, required: true },
        { key: 'createdAt', type: 'string', size: 64, required: true },
      ],
    },
    {
      id: 'wishlist_items',
      name: 'Wishlist Items',
      attributes: [
        { key: 'wishlistItemId', type: 'string', size: 128, required: true },
        { key: 'customerId', type: 'string', size: 128, required: true },
        { key: 'gameId', type: 'string', size: 128, required: true },
      ],
    },
  ];

  // Helper delay function
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // 2. Create Collections & Attributes
  for (const col of collections) {
    let createdNew = false;
    try {
      await databases.createCollection(
        databaseId,
        col.id,
        col.name,
        [
          Permission.read(Role.any()),
          Permission.create(Role.any()),
          Permission.update(Role.any()),
          Permission.delete(Role.any()),
        ]
      );
      console.log(`📦 Collection created: "${col.name}" (${col.id})`);
      createdNew = true;
    } catch (err) {
      if (err.code === 409) {
        console.log(`ℹ️  Collection "${col.name}" already exists.`);
      } else {
        console.error(`⚠️ Error creating collection ${col.id}:`, err.message || err);
        if (err.response) console.error('  Response details:', err.response);
      }
    }

    // Wait for Appwrite Cloud collection indexing if newly created
    if (createdNew) {
      await sleep(1500);
    }

    // Create Attributes with slight delay between each call
    for (const attr of col.attributes) {
      let attempts = 0;
      let success = false;
      while (attempts < 3 && !success) {
        attempts++;
        try {
          if (attr.type === 'string') {
            await databases.createStringAttribute(databaseId, col.id, attr.key, attr.size, attr.required);
          } else if (attr.type === 'float') {
            await databases.createFloatAttribute(databaseId, col.id, attr.key, attr.required);
          } else if (attr.type === 'integer') {
            await databases.createIntegerAttribute(databaseId, col.id, attr.key, attr.required);
          }
          console.log(`   └─ Attribute created: ${attr.key} (${attr.type})`);
          success = true;
          await sleep(600); // 600ms delay between attributes
        } catch (err) {
          if (err.code === 409) {
            console.log(`   └─ Attribute "${attr.key}" already exists.`);
            success = true;
          } else if (attempts < 3) {
            await sleep(1500);
          } else {
            console.error(`   ⚠️ Attribute error (${attr.key}):`, err.message || 'Rate limit / async queue');
          }
        }
      }
    }
  }

  // 3. Create Storage Bucket
  try {
    await storage.createBucket(
      'game_covers',
      'Game Cover Images',
      [Permission.read(Role.any()), Permission.create(Role.any())],
      false,
      true
    );
    console.log(`\n🖼️  Storage Bucket "game_covers" created successfully.`);
  } catch (err) {
    if (err.code === 409) {
      console.log(`\nℹ️  Storage Bucket "game_covers" already exists.`);
    } else {
      console.error(`⚠️ Storage Bucket creation warning:`, err.message);
    }
  }

  console.log(`\n✨ Appwrite Database Setup Completed Successfully!\n`);
}

setup().catch(console.error);
