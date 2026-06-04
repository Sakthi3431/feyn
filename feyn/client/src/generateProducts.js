const categories = {
  Electronics: [
    "Wireless Headphones",
    "Smart Watch",
    "Gaming Mouse",
    "Bluetooth Speaker",
    "Laptop Stand",
    "Power Bank",
    "Keyboard",
    "Monitor",
    "Webcam",
    "USB Hub"
  ],
  Fashion: [
    "Casual Shirt",
    "Jeans",
    "Sneakers",
    "Handbag",
    "Sunglasses",
    "T-Shirt",
    "Jacket",
    "Dress",
    "Watch",
    "Cap"
  ],
  Beauty: [
    "Face Wash",
    "Lipstick",
    "Perfume",
    "Hair Dryer",
    "Moisturizer",
    "Shampoo",
    "Conditioner",
    "Body Lotion",
    "Serum",
    "Face Cream"
  ],
  Toys: [
    "Teddy Bear",
    "RC Car",
    "Puzzle Set",
    "Building Blocks",
    "Toy Train",
    "Action Figure",
    "Doll",
    "Board Game",
    "Drone Toy",
    "Robot Toy"
  ],
  Food: [
    "Cookies",
    "Potato Chips",
    "Green Tea",
    "Coffee Powder",
    "Chocolate",
    "Noodles",
    "Biscuits",
    "Fruit Juice",
    "Energy Bar",
    "Dry Fruits"
  ],
  "Home & Appliances": [
    "Electric Kettle",
    "Vacuum Cleaner",
    "Mixer Grinder",
    "Table Lamp",
    "Air Purifier",
    "Iron Box",
    "Rice Cooker",
    "Toaster",
    "Fan",
    "Water Heater"
  ],
  Sports: [
    "Football",
    "Cricket Bat",
    "Yoga Mat",
    "Dumbbells",
    "Basketball",
    "Tennis Racket",
    "Skipping Rope",
    "Gym Gloves",
    "Helmet",
    "Cycling Bottle"
  ]
};

const brands = [
  "Samsung",
  "Sony",
  "Nike",
  "Adidas",
  "Puma",
  "Apple",
  "Boat",
  "HP",
  "LG",
  "Mi"
];

const products = [];

for (let i = 1; i <= 500; i++) {
  const categoryNames = Object.keys(categories);
  const category =
    categoryNames[Math.floor(Math.random() * categoryNames.length)];

  const productName =
    categories[category][
      Math.floor(Math.random() * categories[category].length)
    ];

  products.push({
    id: i,
    name: productName,
    category,
    brand: brands[Math.floor(Math.random() * brands.length)],
    price: Math.floor(Math.random() * 5000) + 100,
    rating: (Math.random() * 2 + 3).toFixed(1),
    stock: Math.floor(Math.random() * 100) + 1,
    image: `https://picsum.photos/300/300?random=${i}`,
    description: `Premium ${productName} for everyday use.`
  });
}

console.log(products);