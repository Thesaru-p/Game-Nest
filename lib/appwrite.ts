import { Client, Account, Databases, Storage } from 'appwrite';

const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1';
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || 'game-nest-project';

export const client = new Client();

if (typeof window !== 'undefined') {
  client.setEndpoint(endpoint).setProject(projectId);
}

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

export const APPWRITE_CONFIG = {
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || 'game-nest-db',
  collections: {
    users: 'users',
    games: 'games',
    cartItems: 'cart_items',
    orders: 'orders',
    wishlistItems: 'wishlist_items',
  },
  buckets: {
    gameCovers: 'game_covers',
  },
};
