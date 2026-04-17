const fs = require('fs');

const categories = ["Technology", "Fashion", "Entertainment", "Furniture", "Appliances", "Footwears", "Books", "Sports", "Automotive", "Groceries"];

const brands = {
  "Technology": ["Apple", "Dell", "Asus", "Lenovo", "Sony", "Samsung", "HP", "Alienware", "Microsoft"],
  "Fashion": ["Zara", "Gucci", "H&M", "Prada", "Burberry", "Levis", "Hermes", "Versace", "Rolex"],
  "Entertainment": ["Nintendo", "PlayStation", "Xbox", "Marvel", "DC", "Hasbro", "Sony", "Lego", "Bandai"],
  "Furniture": ["Herman Miller", "IKEA", "Ashley", "Wayfair", "West Elm", "Pottery Barn", "CB2", "Crate & Barrel", "Steelcase"],
  "Appliances": ["LG", "Samsung", "Whirlpool", "Bosch", "Dyson", "Philips", "Panasonic", "Miele", "KitchenAid"],
  "Footwears": ["Nike", "Adidas", "Puma", "Reebok", "Timberland", "Vans", "Converse", "Under Armour", "New Balance"],
  "Books": ["Penguin", "HarperCollins", "Macmillan", "Simon & Schuster", "Hachette", "Scholastic", "Pearson", "McGraw-Hill", "Oxford"],
  "Sports": ["Wilson", "Spalding", "Rawlings", "Babolat", "Titleist", "Gatorade", "Bowflex", "Peloton", "Speedo"],
  "Automotive": ["Ford", "Toyota", "Honda", "BMW", "Mercedes", "Audi", "Chevrolet", "Tesla", "Nissan"],
  "Groceries": ["Nestle", "PepsiCo", "Coca-Cola", "Kellogg's", "Mars", "Heinz", "Kraft", "General Mills", "Danone"]
};

// 50 hand-picked premium unsplash photo IDs grouped securely by matching category concepts.
const photoDict = {
  "Technology": ["1593640408182-31c70c8268f5", "1496181133206-80ce9b88a853", "1511707171634-5f897ff02aa9", "1505740420928-5e560c06d30e", "1546868871-7041f2a55e12"],
  "Fashion": ["1445205170230-053b83016050", "1515372039744-b8f02a3ae446", "1551028719-00167b16eac5", "1521572163474-6864f9cf17ab", "1483985988355-763728e1935b"],
  "Furniture": ["1555041469-a586c61ea9bc", "1586023492125-27b2c045efd7", "1524758631624-e2822e304c36", "1505693416388-ac5ce068fe85", "1540574163026-643ea20d25b5"],
  "Footwears": ["1542291026-7eec264c27ff", "1608231387042-66d1773070a5", "1460353581641-37baddab0fa2", "1560769629-975ec94e6a86", "1525966222134-fcfa99b8ae77"],
  "Automotive": ["1492144534655-ae79c964c9d7", "1503376713504-20704403165b", "1542362567-b07e54358753", "1552519507-da3b142c6e3d", "1583121274602-3e2820c69888"],
  "Groceries": ["1542838132-92c53300491e", "1621939514649-280e2ee25f60", "1506459225024-1428097a7e18", "1488459716781-31db52582fe9", "1604719312566-8912e9227c6a"],
  "Books": ["1495446815901-a7297e633e8d", "1589829085413-56de8ae18c73", "1512820790803-83ca734da794", "1524578971084-dfae59d3eec9", "1544716278-e513176b2210"],
  "Entertainment": ["1511512578047-dfb367046420", "1550745165-9bc0b252726f", "1612287230202-1ff1d85d1bdf", "1534438327276-14e5300c3a48", "1605901309584-818e25960b8f"],
  "Appliances": ["1556910103-1c02745aae4d", "1584286595398-a59f21d313f5", "1626808642875-0aa545ed7d0d", "1570222094114-d054a817e56b", "1590756254032-40c2162649a3"],
  "Sports": ["1461896836934-ffe607ba8211", "1517649763962-0c623066013b", "1518611012118-69007e781075", "1600965962361-f4c0840c9469", "1534440050810-74591a27e02e"]
};

let products = [];
let idCounter = 1;

categories.forEach(category => {
  const catBrands = brands[category];
  const photos = photoDict[category];
  
  // Create 9 products per category (Total: 90 products exactly)
  for(let i=0; i<9; i++) {
    const brand = catBrands[i];
    // Rotate through the 5 category specific photos, delivering distinct views across brands!
    const photoId = photos[i % photos.length];
    
    let basePrice = 1499;
    if (category === "Technology") basePrice = 120000;
    else if (category === "Automotive") basePrice = 8000;
    else if (category === "Furniture") basePrice = 25000;

    const modifier = Math.floor(Math.random() * 5000);
    
    products.push({
      id: idCounter++,
      name: `Authentic ${brand} Product`,
      description: `Official branded product by ${brand}. Features premium materials and robust construction highly rated by reviewers worldwide.`,
      price: basePrice + modifier,
      categoryName: category,
      imageUrl: `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=800&q=80` // 100% UN-BREAKABLE DIRECT UNSPLASH CDN LINK
    });
  }
});

fs.writeFileSync('./src/data/mockProducts.json', JSON.stringify(products, null, 2));
console.log(`Generated exactly ${products.length} totally native branded products!`);
