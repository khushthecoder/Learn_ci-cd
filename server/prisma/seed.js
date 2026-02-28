const prisma = require('../src/lib/prisma');

const unsplash = (id) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&h=1000&q=80`;


const tshirtImages = [
  '1521572163474-6864f9cf17ab',
  '1503341504253-dff4815485f1',
  '1562157873-818bc0726f68',
  '1618354691373-d851c5c3a990',
  '1583743814966-8936f5b7be1a',
  '1576566588028-4147f3842f27',
  '1581655353564-df123a1eb820',
  '1578587018452-892bacefd3f2',
  '1622445275463-afa2ab738c34',
  '1529374255404-311a2a4f1fd9',
  '1489987707025-afc232f7ea0f',
  '1583744946564-b52ac1c389c8',
];

const shirtImages = [
  '1602810318383-e386cc2a3ccf',
  '1596755094514-f87e34085b2c',
  '1594938298603-c8148c4dae35',
  '1603252109303-2751441dd157',
  '1607345366928-199ea26cfe3e',
  '1563630423918-b58f07336ac9',
  '1589310243389-96a5483213a8',
  '1626497764746-6dc36546b388',
  '1598033129183-c4f50c736f10',
  '1608234808654-2a8875faa7fd',
  '1622470953794-aa9c70b0fb9d',
];

const hoodieImages = [
  '1556905055-8f358a7a47b2',
  '1620799140408-edc6dcb6d633',
  '1556821840-3a63f95609a7',
  '1618354691792-d1d42acfd860',
  '1620799140188-3b2a02fd9a77',
  '1542272604-787c3835535d',
  '1578768079052-aa76e52ff62e',
  '1591047139829-d91aecb6caea',
  '1517466787929-bc90951d0974',
];

const tshirtAdjectives = [
  'Midnight', 'Neon', 'Cloud', 'Obsidian', 'Sunset', 'Vintage', 'Retro', 'Arctic',
  'Phantom', 'Ember', 'Lunar', 'Solar', 'Crimson', 'Cosmic', 'Shadow', 'Velvet',
  'Chrome', 'Indigo', 'Coral', 'Mist', 'Iron', 'Amber', 'Static', 'Quartz',
  'Mirage', 'Noir', 'Ivory', 'Frost', 'Blaze', 'Zenith',
];
const tshirtNouns = [
  'Oversized Tee', 'Graphic Tee', 'Essential Tee', 'Streetwear Tee', 'Drop Shoulder Tee',
  'Box Fit Tee', 'Washed Tee', 'Relaxed Tee', 'Crew Tee', 'Pocket Tee',
];

const shirtAdjectives = [
  'Urban', 'Denim', 'Sage', 'Noir', 'Oxford', 'Linen', 'Classic', 'Slim',
  'Monochrome', 'Checked', 'Striped', 'Rustic', 'Retro', 'Minimal', 'Casual', 'Textured',
  'Heritage', 'Tailored', 'Draft', 'Weekend', 'Silk', 'Twilight', 'Metro',
];
const shirtNouns = [
  'Flannel Shirt', 'Button-Up Shirt', 'Linen Shirt', 'Oxford Shirt', 'Overshirt',
  'Chambray Shirt', 'Cuban Collar Shirt', 'Utility Shirt', 'Camp Shirt', 'Western Shirt',
];

const hoodieAdjectives = [
  'Obsidian', 'Lavender', 'Concrete', 'Arctic', 'Velvet', 'Monolith', 'Apex', 'Drift',
  'Stealth', 'Static', 'Neon', 'Horizon', 'Storm', 'Aurora', 'Tundra', 'Chrome',
  'Ember', 'Granite', 'Crimson', 'Smoke', 'Glacier', 'Terrain', 'Cipher',
];
const hoodieNouns = [
  'Pullover Hoodie', 'Zip-Up Hoodie', 'Cropped Hoodie', 'Heavyweight Hoodie',
  'Fleece Hoodie', 'Oversized Hoodie', 'Tech Hoodie', 'Sherpa Hoodie', 'Logo Hoodie',
];

const colorPool = [
  'Black', 'White', 'Charcoal', 'Sand', 'Olive', 'Navy', 'Sage Green', 'Cream',
  'Dusty Pink', 'Lavender', 'Stone Grey', 'Burnt Orange', 'Maroon', 'Teal',
  'Mustard', 'Sky Blue', 'Forest Green', 'Coral', 'Mocha', 'Bone', 'Plum',
];

const sizePool = ['S,M,L,XL', 'XS,S,M,L,XL', 'M,L,XL,XXL', 'S,M,L', 'M,L,XL', 'S,M,L,XL,XXL'];

const tshirtDescriptions = [
  'Premium combed cotton tee with a relaxed box fit. Perfect for layering or going solo.',
  'Heavyweight 240gsm jersey with a lived-in wash. Drops clean, wears broken-in.',
  'Garment-dyed crewneck made from breathable organic cotton. Everyday essential.',
  'Drop-shoulder silhouette with a subtle graphic. Built for the off-duty grind.',
  'Oversized fit with ribbed collar and side-slit hem. Streetwear foundation piece.',
];

const shirtDescriptions = [
  'Brushed flannel in a classic check. Slim fit with mother-of-pearl buttons.',
  'Lightweight linen build with a camp collar. Vacation-ready, day or night.',
  'Crisp oxford cotton with a button-down collar. Works dressed up or down.',
  'Overshirt cut from heavy twill. Layer it over a tee or wear it as a light jacket.',
  'Vintage wash denim shirt with western snap buttons. Effortlessly lived-in.',
];

const hoodieDescriptions = [
  'Heavyweight 450gsm fleece with a roomy kangaroo pocket. Cozy meets streetwear.',
  'Brushed inside, smooth outside. Ribbed cuffs and hem keep the silhouette sharp.',
  'Oversized cut with drop shoulders and a boxy hem. Built to layer.',
  'Full-zip construction with a YKK zipper and flatlock seams. Technical comfort.',
  'Mid-weight French terry with an embroidered chest hit. Wear it every day.',
];

const categoryConfig = {
  tshirt: {
    adjectives: tshirtAdjectives,
    nouns: tshirtNouns,
    descriptions: tshirtDescriptions,
    images: tshirtImages,
    minPrice: 899,
    maxPrice: 2499,
    count: 120,
  },
  shirt: {
    adjectives: shirtAdjectives,
    nouns: shirtNouns,
    descriptions: shirtDescriptions,
    images: shirtImages,
    minPrice: 1599,
    maxPrice: 4499,
    count: 90,
  },
  hoodie: {
    adjectives: hoodieAdjectives,
    nouns: hoodieNouns,
    descriptions: hoodieDescriptions,
    images: hoodieImages,
    minPrice: 2499,
    maxPrice: 5999,
    count: 100,
  },
};

function pick(arr, i) {
  return arr[i % arr.length];
}

function priceBetween(min, max, i) {
  const span = max - min;
  const step = Math.round((span / 20) * ((i * 7) % 20));
  const price = min + step;
  return Math.round(price / 50) * 50 - 1;
}

function stockFor(i) {
  const pattern = [45, 30, 60, 15, 0, 80, 25, 50, 8, 38, 5, 72, 20, 14, 100, 0, 42, 18, 55, 3];
  return pattern[i % pattern.length];
}

function buildProducts() {
  const products = [];
  for (const [category, config] of Object.entries(categoryConfig)) {
    for (let i = 0; i < config.count; i++) {
      const adj = pick(config.adjectives, i);
      const noun = pick(config.nouns, Math.floor(i / config.adjectives.length) + i);
      const name = `${adj} ${noun}`;
      const color = pick(colorPool, i + category.length);
      const size = pick(sizePool, i);
      const description = pick(config.descriptions, i);
      const price = priceBetween(config.minPrice, config.maxPrice, i);
      const stock = stockFor(i);
      const imageId = pick(config.images, i);
      products.push({
        name,
        description,
        price,
        image: unsplash(imageId),
        category,
        size,
        color,
        stock,
      });
    }
  }
  return products;
}

async function main() {
  const products = buildProducts();
  console.log(`Seeding ${products.length} products...`);

  await prisma.product.deleteMany();
  await prisma.product.createMany({ data: products });

  const count = await prisma.product.count();
  console.log(`Done. ${count} products in database.`);
}

main()
  .then(() => prisma.$disconnect())
  .catch((err) => {
    console.error(err);
    prisma.$disconnect();
    process.exit(1);
  });

// minor update

// minor update

// minor update

// minor update

// minor update

// minor update

// minor update
