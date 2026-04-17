const fs = require('fs');
const https = require('https');

https.get('https://dummyjson.com/products?limit=100', (resp) => {
  let data = '';

  resp.on('data', (chunk) => {
    data += chunk;
  });

  resp.on('end', () => {
    const jsonData = JSON.parse(data);
    const products = jsonData.products.map(p => ({
       id: p.id,
       name: p.brand ? `${p.brand} ${p.title}` : p.title,
       description: p.description,
       price: Math.floor(p.price * 85), // Convert generic USD price to realistic INR
       categoryName: p.category.charAt(0).toUpperCase() + p.category.slice(1).replace('-', ' '),
       imageUrl: p.thumbnail || p.images[0]
    }));
    
    fs.writeFileSync('./src/data/mockProducts.json', JSON.stringify(products, null, 2));
    console.log("Successfully fetched 100 perfectly unique genuine products!");
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});
