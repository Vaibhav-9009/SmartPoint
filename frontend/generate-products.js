const fs = require('fs');

const categories = ["Technology", "Fashion", "Entertainment", "Furniture", "Appliances", "Footwears", "Books", "Sports", "Automotive", "Groceries"];

const baseProducts = {
  "Technology": ["Smartphone", "Laptop", "Tablet", "Monitor", "Keyboard", "Mouse", "Smartwatch", "Headphones", "Microphone", "Webcam", "USB Hub", "Hard Drive"],
  "Fashion": ["T-Shirt", "Jeans", "Jacket", "Sweater", "Dress", "Scarf", "Belt", "Sunglasses", "Hat", "Gloves"],
  "Entertainment": ["Board Game", "Action Figure", "Puzzle", "Video Game", "Controller", "Blu-ray Movie", "Trading Cards", "VR Headset", "Drone", "RC Car"],
  "Furniture": ["Office Chair", "Desk", "Sofa", "Coffee Table", "Bookshelf", "Bed Frame", "Nightstand", "Dining Table", "Cabinet", "Lamp"],
  "Appliances": ["Microwave", "Blender", "Toaster", "Coffee Machine", "Vacuum Cleaner", "Air Purifier", "Heater", "Fan", "Iron", "Rice Cooker"],
  "Footwears": ["Running Shoes", "Sneakers", "Boots", "Sandals", "Slippers", "Formal Shoes", "Heels", "Loafers", "Hiking Boots", "Cleats"],
  "Books": ["Sci-Fi Novel", "Fantasy Novel", "History Book", "Cookbook", "Biography", "Self-Help", "Thriller", "Poetry", "Comic Book", "Programming Guide"],
  "Sports": ["Basketball", "Football", "Tennis Racket", "Yoga Mat", "Dumbbells", "Jump Rope", "Cycling Helmet", "Baseball Glove", "Golf Club", "Water Bottle"],
  "Automotive": ["Car Wax", "Wiper Blades", "Seat Covers", "Tire Inflator", "Dash Cam", "Floor Mats", "Jump Starter", "Air Freshener", "Phone Mount", "Scratch Remover"],
  "Groceries": ["Organic Coffee", "Green Tea", "Almonds", "Olive Oil", "Dark Chocolate", "Honey", "Protein Bars", "Pasta", "Cereal", "Mixed Spices"]
};

const brands = {
  "Technology": ["Apple", "Dell", "Microsoft", "Samsung", "Asus", "Logitech", "Garmin", "Sony", "Razer", "Logitech", "Anker", "Seagate"],
  "Fashion": ["Zara", "Levis", "Gucci", "H&M", "Prada", "Burberry", "Hermes", "Ray-Ban", "Nike", "NorthFace"],
  "Entertainment": ["Hasbro", "Marvel", "Ravensburger", "Nintendo", "Sony", "Disney", "Pokemon", "Oculus", "DJI", "Traxxas"],
  "Furniture": ["Herman Miller", "IKEA", "Ashley", "Wayfair", "West Elm", "Pottery Barn", "CB2", "Crate & Barrel", "Steelcase", "Article"],
  "Appliances": ["Panasonic", "Ninja", "Breville", "Nespresso", "Dyson", "Philips", "DeLonghi", "Vornado", "Rowenta", "Zojirushi"],
  "Footwears": ["Nike", "Adidas", "Timberland", "Birkenstock", "Crocs", "Clarks", "Christian Louboutin", "Gucci", "Merrell", "Under Armour"],
  "Books": ["Penguin", "HarperCollins", "Macmillan", "Simon&Schuster", "Hachette", "Scholastic", "Pearson", "McGraw-Hill", "Marvel", "O'Reilly"],
  "Sports": ["Spalding", "Wilson", "Babolat", "Lululemon", "Bowflex", "Rogue", "Giro", "Rawlings", "Callaway", "Gatorade"],
  "Automotive": ["Meguiars", "Bosch", "WeatherTech", "Michelin", "Garmin", "Husky", "DeWalt", "Febreze", "iOttie", "Turtle Wax"],
  "Groceries": ["Starbucks", "Lipton", "Blue Diamond", "Filippo Berio", "Lindt", "Nature Nate", "Clif Bar", "Barilla", "Kelloggs", "McCormick"]
};

let products = [];
let idCounter = 1;

categories.forEach(category => {
  const items = baseProducts[category];
  const catBrands = brands[category];
  items.forEach((item, index) => {
    // Select accurate branding
    const brand = catBrands[index % catBrands.length];

    // Determine a fake price based on category
    let priceMultiplier = 1;
    if (category === "Technology") priceMultiplier = 5000;
    else if (category === "Automotive") priceMultiplier = 1200;
    else if (category === "Furniture") priceMultiplier = 2000;
    else if (category === "Appliances") priceMultiplier = 1500;
    else if (category === "Groceries") priceMultiplier = 150;
    else priceMultiplier = 800;

    const basePrice = Math.floor(Math.random() * (priceMultiplier * 1.5)) + (priceMultiplier * 0.5);
    const finalPrice = Math.floor(basePrice / 10) * 10 - 1; // e.g. ends in 9 or 99

    // Using the precise item name (e.g. 'laptop') combined with a distinct lock guarantees
    // that we get a 100% distinct image of a laptop for every different brand, without causing 404 Not Found errors on Flickr.
    const cleanItem = item.replace(/[^a-zA-Z]/g, '').toLowerCase();

    products.push({
      id: idCounter++,
      name: `${brand} ${item}`, // Example: Apple Laptop
      description: `Authentic ${brand} ${item.toLowerCase()} perfect for everyday use. Designed to offer maximum functionality and beautiful aesthetics.`,
      price: finalPrice < 0 ? 99 : finalPrice,
      categoryName: category,
      imageUrl: `https://loremflickr.com/800/600/${cleanItem}?lock=${idCounter}`
    });
  });
});

fs.mkdirSync('./src/data', { recursive: true });
fs.writeFileSync('./src/data/mockProducts.json', JSON.stringify(products, null, 2));

console.log(`Generated ${products.length} purely branded products successfully.`);
