import { Game, AppUser } from './types';

export const INITIAL_GAMES: Game[] = [
  {
    gameId: 'game-1',
    sellerId: 'seller-chronos',
    sellerName: 'Chronos Official Store',
    title: 'CHRONO ODYSSEY',
    subtitle: 'CHRONOSWISS EXCLUSIVE EDITION',
    description: 'A breathtaking next-generation Open World MMORPG centered around time manipulation, dark cosmic power, and cinematic obsidian battlegrounds. Features exclusive luxury in-game armor set and timekeeper status.',
    genre: 'Action RPG',
    platform: 'PC (Steam)',
    price: 89.99,
    originalPrice: 119.99,
    coverImage: '/images/chronos_hero.png',
    badge: 'limited',
    stock: 24,
    status: 'active',
    createdAt: '2026-08-15T10:00:00Z',
    rating: 4.9,
    publisher: 'NPIXEL / Chronos Studio',
    releaseDate: 'Q4 2026',
    features: [
      'Chronos Manipulation combat mechanics',
      'Exclusive Copper & Gold Chronos Timekeeper Armor Set',
      'Unreal Engine 5 Next-Gen Visuals',
      'Global Cross-Platform Seamless World',
      'Digital Soundtrack & Artbook Included'
    ],
    systemReqs: {
      os: 'Windows 11 (64-bit)',
      processor: 'Intel Core i7-13700K or AMD Ryzen 7 7800X3D',
      memory: '32 GB RAM',
      graphics: 'NVIDIA GeForce RTX 4080 (16GB) or AMD Radeon RX 7900 XT',
      storage: '120 GB NVMe SSD'
    }
  },
  {
    gameId: 'game-2',
    sellerId: 'seller-fromsoft',
    sellerName: 'FromSoftware Official',
    title: 'ELDEN RING: SHADOW OF THE ERDTREE',
    subtitle: 'COLLECTOR KEY & AMBER EMBERS',
    description: 'Enter the Realm of Shadow where the Erdtree casts its darkest amber glow. Uncover hidden secrets of Miquella and battle nightmarish gods in this critically acclaimed masterpiece expansion.',
    genre: 'Dark Fantasy',
    platform: 'PlayStation 5',
    price: 59.99,
    originalPrice: 69.99,
    coverImage: '/images/elden_phantom.png',
    badge: 'new',
    stock: 50,
    status: 'active',
    createdAt: '2026-08-18T14:30:00Z',
    rating: 4.95,
    publisher: 'Bandai Namco Entertainment',
    releaseDate: 'June 2024',
    features: [
      'Over 10 New Boss Encounters',
      '8 New Weapon Categories & Martial Arts',
      'Massive Seamless Realm of Shadow Map',
      'Instant Digital Key Activation'
    ],
    systemReqs: {
      os: 'Windows 10 / 11',
      processor: 'Intel Core i7-8700K or AMD Ryzen 5 3600X',
      memory: '16 GB RAM',
      graphics: 'NVIDIA GeForce RTX 3070 (8GB)',
      storage: '80 GB SSD'
    }
  },
  {
    gameId: 'game-3',
    sellerId: 'seller-cdpr',
    sellerName: 'CD PROJEKT RED Vault',
    title: 'CYBERPUNK 2077: PHANTOM LIBERTY',
    subtitle: 'NIGHT CITY CHRONO CUT',
    description: 'Phantom Liberty is a dark spy-thriller expansion for Cyberpunk 2077. Return as cyber-enhanced mercenary V and embark on a high-stakes mission of espionage to save the NUSA President.',
    genre: 'Sci-Fi Cyberpunk',
    platform: 'PC (Steam)',
    price: 49.99,
    originalPrice: 59.99,
    coverImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
    badge: 'sale',
    stock: 100,
    status: 'active',
    createdAt: '2026-07-20T09:12:00Z',
    rating: 4.88,
    publisher: 'CD PROJEKT RED',
    releaseDate: 'September 2023',
    features: [
      'Dogtown District Unlocked',
      'Relic Skill Tree with Cyberware Overclock',
      'Spies, Intrigue & Multiple Endings',
      'Full Ray Tracing Overdrive Mode Support'
    ],
    systemReqs: {
      os: 'Windows 11',
      processor: 'Intel Core i7-12700K',
      memory: '32 GB RAM',
      graphics: 'RTX 4070 Ti',
      storage: '70 GB NVMe SSD'
    }
  },
  {
    gameId: 'game-4',
    sellerId: 'seller-ubisoft',
    sellerName: 'Galactic Outlaw Syndicate',
    title: 'STAR WARS OUTLAWS',
    subtitle: 'GOLD EDITION DIGITAL KEY',
    description: 'Experience the first-ever open-world Star Wars game set between The Empire Strikes Back and Return of the Jedi. Explore distinct planets across the galaxy, both iconic and new.',
    genre: 'Action-Adventure',
    platform: 'Xbox Series X',
    price: 79.99,
    originalPrice: 99.99,
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    badge: 'limited',
    stock: 12,
    status: 'active',
    createdAt: '2026-08-01T16:45:00Z',
    rating: 4.7,
    publisher: 'Ubisoft / Lucasfilm Games',
    releaseDate: 'August 2024',
    features: [
      '3-Day Early Access Key',
      'Season Pass Included',
      'Rogue Trait Customization & Trailblazer Ship',
      'Nix Companion Gameplay Dynamics'
    ],
    systemReqs: {
      os: 'Windows 10/11 64-bit',
      processor: 'AMD Ryzen 5 5600X / Intel i5-11600K',
      memory: '16 GB RAM',
      graphics: 'NVIDIA GeForce RTX 3060 Ti',
      storage: '65 GB SSD'
    }
  },
  {
    gameId: 'game-5',
    sellerId: 'seller-game-science',
    sellerName: 'Game Science Reserve',
    title: 'BLACK MYTH: WUKONG',
    subtitle: 'IMPERIAL DESTINED ONE BUNDLE',
    description: 'An action RPG rooted in Chinese mythology. You shall set out as the Destined One to venture into the challenges and marvels ahead, to uncover the obscured truth beneath the veil of a glorious legend from the past.',
    genre: 'Action RPG',
    platform: 'PC (Steam)',
    price: 69.99,
    coverImage: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80',
    badge: 'new',
    stock: 85,
    status: 'active',
    createdAt: '2026-08-25T11:00:00Z',
    rating: 4.96,
    publisher: 'Game Science',
    releaseDate: 'August 2024',
    features: [
      '72 Transformations & Folk Legend Spells',
      'Unreal Engine 5 Full Path Tracing',
      'Folk Mythology Boss Roster',
      'Exclusive Bronze Folk Armor & Staff'
    ],
    systemReqs: {
      os: 'Windows 11 64-bit',
      processor: 'Intel Core i7-10700K',
      memory: '32 GB RAM',
      graphics: 'NVIDIA RTX 4070',
      storage: '130 GB SSD'
    }
  },
  {
    gameId: 'game-6',
    sellerId: 'seller-apex',
    sellerName: 'Apex Speedworks',
    title: 'FORZA HORIZON 5: APEX EDITION',
    subtitle: 'CHRONO GOLD HYPERCAR PACK',
    description: 'Your Ultimate Horizon Adventure awaits! Explore the vibrant and ever-evolving open world landscapes of Mexico with limitless, fun driving action in hundreds of the world’s greatest cars.',
    genre: 'Racing',
    platform: 'PC (Steam)',
    price: 44.99,
    originalPrice: 59.99,
    coverImage: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80',
    badge: 'sale',
    stock: 40,
    status: 'active',
    createdAt: '2026-06-10T12:00:00Z',
    rating: 4.8,
    publisher: 'Xbox Game Studios',
    releaseDate: 'November 2021',
    features: [
      'Includes Rally Adventure & Hot Wheels Expansions',
      '4K 60FPS Ultra-HDR Support',
      'Custom Livery Editor & Tuning Community',
      'Instant VIP Membership Perks'
    ],
    systemReqs: {
      os: 'Windows 10 version 1909 or higher',
      processor: 'Intel i7-10700K / Ryzen 7 3800X',
      memory: '16 GB RAM',
      graphics: 'RTX 3070',
      storage: '110 GB SSD'
    }
  }
];

export const DEMO_USERS: Record<string, AppUser> = {
  seller: {
    userId: 'seller-demo-id',
    name: 'Alexander Chronos',
    email: 'seller@gamenest.com',
    role: 'seller',
    storeName: 'Chronos Vault Store',
    createdAt: '2026-01-01T00:00:00Z'
  },
  customer: {
    userId: 'customer-demo-id',
    name: 'Elena Vance',
    email: 'customer@gamenest.com',
    role: 'customer',
    createdAt: '2026-02-15T00:00:00Z'
  }
};
