// Supported Delivering Cities & Hubs
export const DELIVERY_CITIES = [
  {
    id: 'hyderabad',
    name: 'Hyderabad',
    tagline: 'Biryani, Kebabs & Irani Chai',
    areas: ['Banjara Hills', 'Jubilee Hills', 'HITEC City', 'Gachibowli', 'Madhapur', 'Kondapur'],
    defaultArea: 'Banjara Hills, Hyderabad',
    lat: 17.4245,
    lon: 78.4390
  },
  {
    id: 'bangalore',
    name: 'Bangalore',
    tagline: 'Craft Breweries, Dosas & Global Bites',
    areas: ['Indiranagar', 'Koramangala', 'Whitefield', 'HSR Layout', 'Malleswaram', 'Jayanagar'],
    defaultArea: 'Indiranagar, Bangalore',
    lat: 12.9716,
    lon: 77.5946
  },
  {
    id: 'mumbai',
    name: 'Mumbai',
    tagline: 'Street Chaat, Coastal Seafood & Sushi',
    areas: ['Bandra West', 'BKC', 'Powai', 'Andheri West', 'Girgaon Chowpatty', 'Colaba'],
    defaultArea: 'Bandra West, Mumbai',
    lat: 19.0760,
    lon: 72.8777
  },
  {
    id: 'delhi-ncr',
    name: 'Delhi NCR / Gurugram',
    tagline: 'Dimsums, Kebabs, Dhabas & Street Eats',
    areas: ['Cyber City DLF', 'Sector 29 Gurugram', 'Defence Colony', 'Sector 18 Noida', 'Chandni Chowk'],
    defaultArea: 'Cyber City DLF, Gurugram',
    lat: 28.4595,
    lon: 77.0266
  },
  {
    id: 'pune',
    name: 'Pune',
    tagline: 'Tex-Mex, Bakeries & Student Hangouts',
    areas: ['Koregaon Park', 'Viman Nagar', 'MG Road', 'Kothrud', 'Baner'],
    defaultArea: 'Koregaon Park, Pune',
    lat: 18.5204,
    lon: 73.8567
  },
  {
    id: 'chennai',
    name: 'Chennai',
    tagline: 'Ghee Roast, Filter Coffee & Chettinad',
    areas: ['T. Nagar', 'Adyar', 'Nungambakkam', 'Anna Nagar', 'Mylapore'],
    defaultArea: 'T. Nagar, Chennai',
    lat: 13.0827,
    lon: 80.2707
  }
];

/**
 * QUICKBITE - Centralized LocalStorage Database & State Management System
 * Shared across Customer, Restaurant, Delivery Partner, and Admin modules.
 */

// Fallback image helper
if (typeof window !== 'undefined') {
  window.handleImageError = function(img, fallbackCategory = 'food') {
    img.onerror = null;
    const fallbacks = {
      food: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
      restaurant: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    };
    img.src = fallbacks[fallbackCategory] || fallbacks.food;
  };
}

// Initial Seed Data: 10 Realistic Restaurants
const DEFAULT_RESTAURANTS = [
  {
    "id": "rest-1",
    "approvalStatus": "approved",
    "name": "The Royal Biryani & Kebabs",
    "tagline": "Authentic Hyderabadi Dum & Nawabi Flavours",
    "cuisine": [
      "Biryani",
      "Hyderabadi",
      "Mughlai",
      "Kebabs",
      "Curries"
    ],
    "rating": 4.9,
    "ratingCount": 1850,
    "deliveryTime": "20-25 min",
    "deliveryFee": 30,
    "priceForTwo": 350,
    "address": "Plot 14, Road No. 12, Banjara Hills, Hyderabad - 500034",
    "image": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    "banner": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1200&q=80",
    "isFeatured": true,
    "isPureVeg": false,
    "badge": "Bestseller",
    "discount": "50% OFF up to ₹100",
    "discountCode": "QUICK50",
    "status": "open",
    "ownerEmail": "owner1@quickbite.com",
    "city": "Hyderabad",
    "locality": "Banjara Hills",
    "distance": 1.8,
    "distanceText": "1.8 km"
  },
  {
    "id": "rest-2",
    "approvalStatus": "approved",
    "name": "Artisan Crust Pizzeria",
    "tagline": "Hand-tossed Woodfired Neapolitan Pizza & Pasta",
    "cuisine": [
      "Italian",
      "Pizza",
      "Pasta",
      "Garlic Bread"
    ],
    "rating": 4.8,
    "ratingCount": 1420,
    "deliveryTime": "20-30 min",
    "deliveryFee": 25,
    "priceForTwo": 450,
    "address": "Shop 5, 100ft Road, HAL 2nd Stage, Indiranagar, Bangalore - 560038",
    "image": "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80",
    "banner": "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=1200&q=80",
    "isFeatured": true,
    "isPureVeg": false,
    "badge": "Chef's Special",
    "discount": "Flat ₹120 OFF",
    "discountCode": "FEAST120",
    "status": "open",
    "ownerEmail": "owner2@quickbite.com",
    "city": "Bangalore",
    "locality": "Indiranagar",
    "distance": 2.3,
    "distanceText": "2.3 km"
  },
  {
    "id": "rest-3",
    "approvalStatus": "approved",
    "name": "Burger Forge & Co.",
    "tagline": "Smashed Patties, Brioche Buns & Thick Shakes",
    "cuisine": [
      "American",
      "Burgers",
      "Fast Food",
      "Fries",
      "Shakes"
    ],
    "rating": 4.9,
    "ratingCount": 2450,
    "deliveryTime": "25-30 min",
    "deliveryFee": 20,
    "priceForTwo": 300,
    "address": "82, 5th Block, Jyoti Nivas College Rd, Koramangala, Bangalore - 560095",
    "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
    "banner": "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80",
    "isFeatured": true,
    "isPureVeg": false,
    "badge": "Trending",
    "discount": "FREE Delivery",
    "discountCode": "FREEDEL",
    "status": "open",
    "ownerEmail": "owner3@quickbite.com",
    "city": "Bangalore",
    "locality": "Koramangala",
    "distance": 3.1,
    "distanceText": "3.1 km"
  },
  {
    "id": "rest-4",
    "approvalStatus": "approved",
    "name": "Dragon Bowl Asian Kitchen",
    "tagline": "Steamed Dimsums, Wok Noodles & Sizzling Curries",
    "cuisine": [
      "Pan-Asian",
      "Chinese",
      "Noodles",
      "Dimsums",
      "Asian"
    ],
    "rating": 4.7,
    "ratingCount": 1180,
    "deliveryTime": "25-35 min",
    "deliveryFee": 35,
    "priceForTwo": 420,
    "address": "Building 8B, Ground Floor, DLF Cyber City Phase 2, Gurugram - 122002",
    "image": "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80",
    "banner": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1200&q=80",
    "isFeatured": false,
    "isPureVeg": false,
    "badge": "Asian Delight",
    "discount": "20% OFF",
    "discountCode": "ASIAN20",
    "status": "open",
    "ownerEmail": "owner4@quickbite.com",
    "city": "Delhi NCR / Gurugram",
    "locality": "DLF Cyber City",
    "distance": 2.7,
    "distanceText": "2.7 km"
  },
  {
    "id": "rest-5",
    "approvalStatus": "approved",
    "name": "Madras Tiffin Room",
    "tagline": "Crispy Ghee Roast, Button Idlis & Degree Filter Coffee",
    "cuisine": [
      "South Indian",
      "Dosa",
      "Tiffin",
      "Breakfast"
    ],
    "rating": 4.9,
    "reviewsCount": 2600,
    "deliveryTime": "15-20 min",
    "deliveryFee": 20,
    "priceForTwo": 200,
    "address": "22, Ranganathan Street, T. Nagar, Chennai - 600017",
    "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
    "banner": "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=1200&q=80",
    "isFeatured": true,
    "isPureVeg": true,
    "badge": "Pure Veg",
    "discount": "Flat ₹40 OFF",
    "discountCode": "TIFFIN40",
    "status": "open",
    "ownerEmail": "owner5@quickbite.com",
    "city": "Chennai",
    "locality": "T. Nagar",
    "distance": 1.4,
    "distanceText": "1.4 km"
  },
  {
    "id": "rest-6",
    "approvalStatus": "approved",
    "name": "The Green Bowl Healthy & Salads",
    "tagline": "Superfood Power Bowls, Cold Pressed Juices & Wraps",
    "cuisine": [
      "Healthy",
      "Salads",
      "Bowls",
      "Juices",
      "Vegan"
    ],
    "rating": 4.8,
    "ratingCount": 940,
    "deliveryTime": "25-30 min",
    "deliveryFee": 25,
    "priceForTwo": 380,
    "address": "Unit 3, G Block, Bandra Kurla Complex (BKC), Mumbai - 400051",
    "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    "banner": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80",
    "isFeatured": false,
    "isPureVeg": false,
    "badge": "Fit Choice",
    "discount": "15% OFF",
    "discountCode": "FIT15",
    "status": "open",
    "ownerEmail": "owner6@quickbite.com",
    "city": "Mumbai",
    "locality": "BKC",
    "distance": 3.6,
    "distanceText": "3.6 km"
  },
  {
    "id": "rest-7",
    "approvalStatus": "approved",
    "name": "Tokyo Drift Sushi Bar",
    "tagline": "Fresh Nigiri, Crispy Tempura & Tonkotsu Ramen",
    "cuisine": [
      "Japanese",
      "Sushi",
      "Ramen",
      "Asian"
    ],
    "rating": 4.9,
    "ratingCount": 1120,
    "deliveryTime": "35-45 min",
    "deliveryFee": 40,
    "priceForTwo": 650,
    "address": "Central Avenue, Hiranandani Gardens, Powai, Mumbai - 400076",
    "image": "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80",
    "banner": "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1200&q=80",
    "isFeatured": true,
    "isPureVeg": false,
    "badge": "Premium Dining",
    "discount": "15% OFF",
    "discountCode": "TOKYO15",
    "status": "open",
    "ownerEmail": "owner7@quickbite.com",
    "city": "Mumbai",
    "locality": "Powai",
    "distance": 5.2,
    "distanceText": "5.2 km"
  },
  {
    "id": "rest-8",
    "approvalStatus": "approved",
    "name": "Sweet Cravings Pastry Lab",
    "tagline": "Belgian Waffles, Lava Cakes, Tarts & Gelato",
    "cuisine": [
      "Desserts",
      "Bakery",
      "Cakes",
      "Waffles"
    ],
    "rating": 4.9,
    "ratingCount": 2140,
    "deliveryTime": "20-25 min",
    "deliveryFee": 20,
    "priceForTwo": 260,
    "address": "Plot 220, Near Check Post, Jubilee Hills, Hyderabad - 500033",
    "image": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
    "banner": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80",
    "isFeatured": false,
    "isPureVeg": true,
    "badge": "Sweet Tooth",
    "discount": "Buy 1 Get 1 Free",
    "discountCode": "BOGO",
    "status": "open",
    "ownerEmail": "owner8@quickbite.com",
    "city": "Hyderabad",
    "locality": "Jubilee Hills",
    "distance": 2.9,
    "distanceText": "2.9 km"
  },
  {
    "id": "rest-9",
    "approvalStatus": "approved",
    "name": "Taco Fiesta Mexican Grill",
    "tagline": "Sizzling Fajitas, Loaded Nachos & Stuffed Burritos",
    "cuisine": [
      "Mexican",
      "Tacos",
      "Burritos",
      "Nachos"
    ],
    "rating": 4.8,
    "ratingCount": 890,
    "deliveryTime": "30-35 min",
    "deliveryFee": 30,
    "priceForTwo": 340,
    "address": "Aurora Towers, 9 Moledina Rd, Camp, MG Road, Pune - 411001",
    "image": "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80",
    "banner": "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=1200&q=80",
    "isFeatured": false,
    "isPureVeg": false,
    "badge": "Fiesta Pick",
    "discount": "25% OFF",
    "discountCode": "FIESTA25",
    "status": "open",
    "ownerEmail": "owner9@quickbite.com",
    "city": "Pune",
    "locality": "MG Road",
    "distance": 4.1,
    "distanceText": "4.1 km"
  },
  {
    "id": "rest-10",
    "approvalStatus": "approved",
    "name": "South Coast Dosa & Tiffin",
    "tagline": "Bangalore Benne Dosa, Thatte Idli & Filter Kaapi",
    "cuisine": [
      "South Indian",
      "Dosa",
      "Tiffin",
      "Breakfast"
    ],
    "rating": 4.8,
    "ratingCount": 1840,
    "deliveryTime": "30-35 min",
    "deliveryFee": 20,
    "priceForTwo": 220,
    "address": "74, Margosa Road, 8th Cross, Malleswaram, Bangalore - 560003",
    "image": "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=800&q=80",
    "banner": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1200&q=80",
    "isFeatured": true,
    "isPureVeg": true,
    "badge": "Pure Veg",
    "discount": "₹50 OFF on ₹199",
    "discountCode": "SOUTH50",
    "status": "open",
    "ownerEmail": "owner10@quickbite.com",
    "city": "Bangalore",
    "locality": "Malleswaram",
    "distance": 4.6,
    "distanceText": "4.6 km"
  },
  {
    "id": "rest-11",
    "approvalStatus": "approved",
    "name": "Amritsari Dhaba & Kulcha House",
    "tagline": "Stuffed Chur Chur Kulcha, Pindi Chole & Kesar Lassi",
    "cuisine": [
      "North Indian",
      "Punjabi",
      "Dhaba",
      "Thali",
      "Curries"
    ],
    "rating": 4.9,
    "ratingCount": 1650,
    "deliveryTime": "35-40 min",
    "deliveryFee": 25,
    "priceForTwo": 280,
    "address": "Pocket J, Sector 18 Market, Noida, Delhi NCR - 201301",
    "image": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80",
    "banner": "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=1200&q=80",
    "isFeatured": true,
    "isPureVeg": true,
    "badge": "Dhaba King",
    "discount": "Flat ₹60 OFF",
    "discountCode": "DHABA60",
    "status": "open",
    "ownerEmail": "owner11@quickbite.com",
    "city": "Delhi NCR / Gurugram",
    "locality": "Sector 18 Noida",
    "distance": 6.8,
    "distanceText": "6.8 km"
  },
  {
    "id": "rest-12",
    "approvalStatus": "approved",
    "name": "Chaat Gali & Bombay Street Eats",
    "tagline": "Buttery Pav Bhaji, Sev Puri, Pani Puri & Vada Pav",
    "cuisine": [
      "Street Food",
      "Chaat",
      "Fast Food",
      "Mumbai"
    ],
    "rating": 4.8,
    "ratingCount": 2340,
    "deliveryTime": "15-20 min",
    "deliveryFee": 15,
    "priceForTwo": 180,
    "address": "Marine Drive Promenade, Girgaon Chowpatty, Mumbai - 400007",
    "image": "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=800&q=80",
    "banner": "https://images.unsplash.com/photo-1781243680771-1fea4521e196?auto=format&fit=crop&w=1200&q=80",
    "isFeatured": true,
    "isPureVeg": true,
    "badge": "Street Legends",
    "discount": "20% OFF",
    "discountCode": "CHAAT20",
    "status": "open",
    "ownerEmail": "owner12@quickbite.com",
    "city": "Mumbai",
    "locality": "Girgaon Chowpatty",
    "distance": 1.2,
    "distanceText": "1.2 km"
  },
  {
    "id": "rest-13",
    "approvalStatus": "approved",
    "name": "Sultan's Shawarma & Arabian Grills",
    "tagline": "Rotisserie Chicken Shawarma, Falafel & Creamy Mezze",
    "cuisine": [
      "Middle Eastern",
      "Shawarma",
      "Arabian",
      "Grills",
      "Kebabs",
      "Rolls"
    ],
    "rating": 4.8,
    "ratingCount": 1580,
    "deliveryTime": "35-40 min",
    "deliveryFee": 25,
    "priceForTwo": 320,
    "address": "41, Mosque Road, Pulikeshi Nagar, Frazer Town, Bangalore - 560005",
    "image": "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=800&q=80",
    "banner": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80",
    "isFeatured": true,
    "isPureVeg": false,
    "badge": "Arabian Nights",
    "discount": "Flat ₹75 OFF",
    "discountCode": "SULTAN75",
    "status": "open",
    "ownerEmail": "owner13@quickbite.com",
    "city": "Bangalore",
    "locality": "Frazer Town",
    "distance": 5.7,
    "distanceText": "5.7 km"
  },
  {
    "id": "rest-14",
    "approvalStatus": "approved",
    "name": "Coastal Catch & Goan Seafood Shacks",
    "tagline": "Fiery Goan Prawn Curry, Surmai Rava Fry & Butter Crab",
    "cuisine": [
      "Seafood",
      "Goan",
      "Coastal",
      "Fish Fry",
      "Curry",
      "Curries"
    ],
    "rating": 4.9,
    "ratingCount": 1190,
    "deliveryTime": "30-35 min",
    "deliveryFee": 35,
    "priceForTwo": 580,
    "address": "Plot 18, Inorbit Mall Road, Madhapur, Hyderabad - 500081",
    "image": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80",
    "banner": "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=1200&q=80",
    "isFeatured": true,
    "isPureVeg": false,
    "badge": "Fresh Catch",
    "discount": "Flat ₹100 OFF",
    "discountCode": "SEAFOOD100",
    "status": "open",
    "ownerEmail": "owner14@quickbite.com",
    "city": "Hyderabad",
    "locality": "Madhapur",
    "distance": 4.3,
    "distanceText": "4.3 km"
  },
  {
    "id": "rest-15",
    "approvalStatus": "approved",
    "name": "The Sizzler Factory & American Smokehouse",
    "tagline": "Sizzling Steaks, Smoked BBQ Ribs & Cheesy Mash",
    "cuisine": [
      "Continental",
      "Sizzlers",
      "Steaks",
      "BBQ",
      "American"
    ],
    "rating": 4.8,
    "ratingCount": 870,
    "deliveryTime": "35-40 min",
    "deliveryFee": 30,
    "priceForTwo": 550,
    "address": "15, Walton Road Corner, Lavelle Road, Bangalore - 560001",
    "image": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    "banner": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80",
    "isFeatured": false,
    "isPureVeg": false,
    "badge": "Sizzling Hot",
    "discount": "20% OFF",
    "discountCode": "SIZZLE20",
    "status": "open",
    "ownerEmail": "owner15@quickbite.com",
    "city": "Bangalore",
    "locality": "Lavelle Road",
    "distance": 6.3,
    "distanceText": "6.3 km"
  },
  {
    "id": "rest-16",
    "approvalStatus": "approved",
    "name": "Polar Frost Artisan Ice Creams & Sundaes",
    "tagline": "Death by Chocolate, Roasted Almond Kulfi & Sundaes",
    "cuisine": [
      "Ice Cream",
      "Desserts",
      "Sundaes",
      "Kulfi"
    ],
    "rating": 4.9,
    "ratingCount": 3120,
    "deliveryTime": "35-45 min",
    "deliveryFee": 15,
    "priceForTwo": 220,
    "address": "330, 11th Main, 4th Block, Jayanagar, Bangalore - 560011",
    "image": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80",
    "banner": "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=1200&q=80",
    "isFeatured": true,
    "isPureVeg": true,
    "badge": "Dessert Craze",
    "discount": "Buy 2 Get 1 Free",
    "discountCode": "FROST3",
    "status": "open",
    "ownerEmail": "owner16@quickbite.com",
    "city": "Bangalore",
    "locality": "Jayanagar",
    "distance": 7.4,
    "distanceText": "7.4 km"
  },
  {
    "id": "rest-17",
    "approvalStatus": "approved",
    "name": "The Parisian Bistro & All-Day Brunch",
    "tagline": "English Breakfast, Eggs Benedict, Savory Crepes & Quiche",
    "cuisine": [
      "European",
      "French",
      "Breakfast",
      "Brunch",
      "Continental"
    ],
    "rating": 4.8,
    "ratingCount": 780,
    "deliveryTime": "35-40 min",
    "deliveryFee": 30,
    "priceForTwo": 520,
    "address": "Shop 19, Main Market, Defence Colony, New Delhi - 110024",
    "image": "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80",
    "banner": "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=1200&q=80",
    "isFeatured": false,
    "isPureVeg": false,
    "badge": "Gourmet Brunch",
    "discount": "Flat ₹80 OFF",
    "discountCode": "BRUNCH80",
    "status": "open",
    "ownerEmail": "owner17@quickbite.com",
    "city": "Delhi NCR / Gurugram",
    "locality": "Defence Colony",
    "distance": 5.9,
    "distanceText": "5.9 km"
  },
  {
    "id": "rest-18",
    "approvalStatus": "approved",
    "name": "Roast & Toast Artisan Coffee Roasters",
    "tagline": "Single-Origin Pour Over, Cold Brew, Butter Croissants & Bagels",
    "cuisine": [
      "Café",
      "Coffee",
      "Bakery",
      "Sandwiches",
      "Breakfast",
      "Beverages"
    ],
    "rating": 4.9,
    "ratingCount": 1420,
    "deliveryTime": "25-30 min",
    "deliveryFee": 20,
    "priceForTwo": 320,
    "address": "House 582, Road No. 45, Jubilee Hills, Hyderabad - 500033",
    "image": "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80",
    "banner": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80",
    "isFeatured": true,
    "isPureVeg": false,
    "badge": "Café Culture",
    "discount": "25% OFF",
    "discountCode": "ROAST25",
    "status": "open",
    "ownerEmail": "owner18@quickbite.com",
    "city": "Hyderabad",
    "locality": "Jubilee Hills",
    "distance": 3.4,
    "distanceText": "3.4 km"
  },
  {
    "id": "rest-19",
    "approvalStatus": "approved",
    "name": "Halwai Royal Sweets, Samosas & Savouries",
    "tagline": "Kaju Katli, Desi Ghee Jalebi, Dhokla, Samosa & Kachori",
    "cuisine": [
      "Indian Sweets",
      "Mithai",
      "Snacks",
      "Street Food"
    ],
    "rating": 4.9,
    "ratingCount": 3890,
    "deliveryTime": "40-50 min",
    "deliveryFee": 15,
    "priceForTwo": 190,
    "address": "1856, Dariba Kalan, Chandni Chowk, Delhi - 110006",
    "image": "https://images.unsplash.com/photo-1605194000384-439c3ced8d15?auto=format&fit=crop&w=800&q=80",
    "banner": "https://images.unsplash.com/photo-1778448806371-b55a71bf9a35?auto=format&fit=crop&w=1200&q=80",
    "isFeatured": true,
    "isPureVeg": true,
    "badge": "Heritage Pick",
    "discount": "Flat ₹50 OFF",
    "discountCode": "MITHAI50",
    "status": "open",
    "ownerEmail": "owner19@quickbite.com",
    "city": "Delhi NCR / Gurugram",
    "locality": "Chandni Chowk",
    "distance": 7.9,
    "distanceText": "7.9 km"
  },
  {
    "id": "rest-20",
    "approvalStatus": "approved",
    "name": "Himalayan Kitchen, Thukpa & Tibetan Momos",
    "tagline": "Steamed Chicken Kothey Momos, Tibetan Thukpa & Tingmo",
    "cuisine": [
      "Tibetan",
      "Himalayan",
      "Momos",
      "Noodles",
      "Asian"
    ],
    "rating": 4.8,
    "ratingCount": 1280,
    "deliveryTime": "45-50 min",
    "deliveryFee": 20,
    "priceForTwo": 260,
    "address": "House 26, New Aruna Nagar, Majnu Ka Tilla, Delhi - 110054",
    "image": "https://images.unsplash.com/photo-1625398407796-82650a8c135f?auto=format&fit=crop&w=800&q=80",
    "banner": "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=1200&q=80",
    "isFeatured": false,
    "isPureVeg": false,
    "badge": "Mountain Flavours",
    "discount": "Flat ₹40 OFF",
    "discountCode": "MOMO40",
    "status": "open",
    "ownerEmail": "owner20@quickbite.com",
    "city": "Delhi NCR / Gurugram",
    "locality": "Majnu Ka Tilla",
    "distance": 8.5,
    "distanceText": "8.5 km"
  },
  {
    "id": "rest-21",
    "name": "Wok & Roll Express",
    "tagline": "Express Asian Bowls, Spring Rolls & Boba",
    "cuisine": [
      "Asian",
      "Chinese",
      "Fast Food",
      "Rolls"
    ],
    "rating": 4.5,
    "ratingCount": 110,
    "deliveryTime": "35-40 min",
    "deliveryFee": 25,
    "priceForTwo": 280,
    "address": "Shop 12, RTO Office Road, Kondapur, Hyderabad - 500084",
    "image": "https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=800&q=80",
    "banner": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1200&q=80",
    "isFeatured": false,
    "isPureVeg": false,
    "badge": "New Applicant",
    "discount": "20% OFF",
    "discountCode": "WOK20",
    "status": "pending",
    "approvalStatus": "pending",
    "ownerEmail": "wokroll@quickbite.com",
    "city": "Hyderabad",
    "locality": "Kondapur",
    "distance": 6.1,
    "distanceText": "6.1 km"
  },
  {
    "id": "rest-22",
    "name": "Kebab Nation Grills",
    "tagline": "Charcoal Skewers, Tikka Rolls & Biryani",
    "cuisine": [
      "Kebabs",
      "Mughlai",
      "Barbecue",
      "Rolls",
      "Biryani",
      "North Indian"
    ],
    "rating": 4.6,
    "ratingCount": 150,
    "deliveryTime": "25-30 min",
    "deliveryFee": 30,
    "priceForTwo": 350,
    "address": "SCO 38, Main Leisure Valley Market, Sector 29, Gurugram - 122009",
    "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
    "banner": "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=1200&q=80",
    "isFeatured": false,
    "isPureVeg": false,
    "badge": "New Applicant",
    "discount": "15% OFF",
    "discountCode": "NATION15",
    "status": "pending",
    "approvalStatus": "pending",
    "ownerEmail": "kebabnation@quickbite.com",
    "city": "Delhi NCR / Gurugram",
    "locality": "Sector 29",
    "distance": 3.8,
    "distanceText": "3.8 km"
  }
];

const DEFAULT_DISHES = [
  {
    "id": "dish-1",
    "restaurantId": "rest-1",
    "name": "Royal Dum Handi Chicken Biryani",
    "category": "Biryani Specialties",
    "price": 349,
    "discountPrice": 299,
    "rating": 4.9,
    "reviewsCount": 850,
    "isVeg": false,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80",
    "description": "Slow-cooked long grain aged basmati rice layered with juicy chicken thighs, saffron, mint and authentic royal spices. Served with Mirchi Ka Salan and creamy Raita. Serves 1-2.",
    "prepTime": "25 mins",
    "available": true
  },
  {
    "id": "dish-2",
    "restaurantId": "rest-1",
    "name": "Awadhi Mutton Dum Biryani",
    "category": "Biryani Specialties",
    "price": 449,
    "discountPrice": 399,
    "rating": 4.9,
    "reviewsCount": 620,
    "isVeg": false,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80",
    "description": "Tender baby mutton bone-in pieces marinated for 12 hours in yogurt, brown onions and secret Awadhi potli masala, dum-cooked in sealed clay handi. Serves 1-2.",
    "prepTime": "30 mins",
    "available": true
  },
  {
    "id": "dish-3",
    "restaurantId": "rest-1",
    "name": "Nizami Paneer Tikka Biryani",
    "category": "Biryani Specialties",
    "price": 299,
    "discountPrice": 259,
    "rating": 4.8,
    "reviewsCount": 430,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80",
    "description": "Charcoal grilled fresh cottage cheese cubes layered with caramelized onions, kewra water and saffron infused basmati rice. Serves 1-2.",
    "prepTime": "20 mins",
    "available": true
  },
  {
    "id": "dish-4",
    "restaurantId": "rest-1",
    "name": "Hyderabadi Egg Dum Biryani",
    "category": "Biryani Specialties",
    "price": 269,
    "discountPrice": 229,
    "rating": 4.7,
    "reviewsCount": 310,
    "isVeg": false,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80",
    "description": "Golden fried boiled eggs nestled in aromatic spicy biryani rice garnished with crispy fried onions, fresh mint leaves and royal saffron.",
    "prepTime": "20 mins",
    "available": true
  },
  {
    "id": "dish-5",
    "restaurantId": "rest-1",
    "name": "Subz Handi Dum Biryani (Veg)",
    "category": "Biryani Specialties",
    "price": 279,
    "discountPrice": 239,
    "rating": 4.7,
    "reviewsCount": 290,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80",
    "description": "Garden fresh carrots, baby potatoes, green peas and French beans simmered in Lucknowi spices, layered with fragrant rice. Serves 1-2.",
    "prepTime": "20 mins",
    "available": true
  },
  {
    "id": "dish-6",
    "restaurantId": "rest-1",
    "name": "Tandoori Murgh Full",
    "category": "Tandoor & Starters",
    "price": 420,
    "discountPrice": 379,
    "rating": 4.8,
    "reviewsCount": 540,
    "isVeg": false,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80",
    "description": "Whole spring chicken marinated overnight in hung curd, Kashmiri deggi mirch and roasted cumin, charcoal roasted in traditional clay oven.",
    "prepTime": "25 mins",
    "available": true
  },
  {
    "id": "dish-7",
    "restaurantId": "rest-1",
    "name": "Mutton Shahi Galouti Kebab (4 pcs)",
    "category": "Tandoor & Starters",
    "price": 389,
    "discountPrice": 349,
    "rating": 4.9,
    "reviewsCount": 420,
    "isVeg": false,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80",
    "description": "Mouth-melting smoked minced mutton patties blended with raw papaya paste, 32 secret spices and clarified ghee. Served with mint dip.",
    "prepTime": "20 mins",
    "available": true
  },
  {
    "id": "dish-8",
    "restaurantId": "rest-1",
    "name": "Paneer Malai Tikka (6 pcs)",
    "category": "Tandoor & Starters",
    "price": 299,
    "discountPrice": 269,
    "rating": 4.8,
    "reviewsCount": 380,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80",
    "description": "Velvety cottage cheese cubes marinated in rich cashew paste, cardamom, cheese and fresh heavy cream, chargrilled to golden perfection.",
    "prepTime": "18 mins",
    "available": true
  },
  {
    "id": "dish-9",
    "restaurantId": "rest-1",
    "name": "Murgh Malai Tikka (6 pcs)",
    "category": "Tandoor & Starters",
    "price": 349,
    "discountPrice": 310,
    "rating": 4.8,
    "reviewsCount": 310,
    "isVeg": false,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80",
    "description": "Boneless chicken breast pieces marinated in cream, cheddar cheese, white pepper and crushed garlic, flame broiled on skewers.",
    "prepTime": "20 mins",
    "available": true
  },
  {
    "id": "dish-10",
    "restaurantId": "rest-1",
    "name": "Butter Chicken Murgh Makhani",
    "category": "Curries & Gravies",
    "price": 369,
    "discountPrice": 329,
    "rating": 4.9,
    "reviewsCount": 980,
    "isVeg": false,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80",
    "description": "Tandoori chicken pulled and simmered in a luscious, velvety tomato satin gravy enriched with butter, cashew cream and fragrant dried fenugreek.",
    "prepTime": "20 mins",
    "available": true
  },
  {
    "id": "dish-11",
    "restaurantId": "rest-1",
    "name": "Dal Makhani Slow-Cooked 24hrs",
    "category": "Curries & Gravies",
    "price": 289,
    "discountPrice": 249,
    "rating": 4.9,
    "reviewsCount": 840,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80",
    "description": "Whole black urad lentils and kidney beans slow-simmered overnight on charcoal hearth with white butter, fresh tomatoes and cream.",
    "prepTime": "15 mins",
    "available": true
  },
  {
    "id": "dish-12",
    "restaurantId": "rest-1",
    "name": "Paneer Lababdar",
    "category": "Curries & Gravies",
    "price": 319,
    "discountPrice": 279,
    "rating": 4.8,
    "reviewsCount": 420,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80",
    "description": "Fresh soft paneer chunks tossed with grated paneer in an onion-tomato gravy with chopped coriander and crushed kasuri methi.",
    "prepTime": "18 mins",
    "available": true
  },
  {
    "id": "dish-13",
    "restaurantId": "rest-1",
    "name": "Kashmiri Mutton Rogan Josh",
    "category": "Curries & Gravies",
    "price": 429,
    "discountPrice": 389,
    "rating": 4.8,
    "reviewsCount": 350,
    "isVeg": false,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80",
    "description": "Traditional Kashmiri delicacy of tender mutton stewed with Ratan Jot, fennel seeds, ginger and aromatic red chillies in clarified butter.",
    "prepTime": "25 mins",
    "available": true
  },
  {
    "id": "dish-14",
    "restaurantId": "rest-1",
    "name": "Butter Garlic Naan",
    "category": "Tandoori Breads",
    "price": 69,
    "discountPrice": 59,
    "rating": 4.8,
    "reviewsCount": 610,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=600&q=80",
    "description": "Freshly kneaded leavened refined flour flatbread cooked against tandoor walls, brushed generously with minced garlic and melted salted butter.",
    "prepTime": "10 mins",
    "available": true
  },
  {
    "id": "dish-15",
    "restaurantId": "rest-1",
    "name": "Cheese Stuffed Tandoori Naan",
    "category": "Tandoori Breads",
    "price": 109,
    "discountPrice": 89,
    "rating": 4.8,
    "reviewsCount": 420,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=600&q=80",
    "description": "Crispy yet pillowy naan stuffed with mozzarella and cheddar cheese herbs, topped with nigella seeds and butter.",
    "prepTime": "12 mins",
    "available": true
  },
  {
    "id": "dish-16",
    "restaurantId": "rest-1",
    "name": "Royal Shahi Tukda with Rabri",
    "category": "Desserts & Beverages",
    "price": 179,
    "discountPrice": 149,
    "rating": 4.9,
    "reviewsCount": 510,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1571867424488-4565932edb41?auto=format&fit=crop&w=600&q=80",
    "description": "Crispy fried golden bread slices soaked in saffron sugar syrup, smothered in thick artisanal pistachio rabri with silver vark.",
    "prepTime": "10 mins",
    "available": true
  },
  {
    "id": "dish-17",
    "restaurantId": "rest-1",
    "name": "Kesari Rasmalai (2 pcs)",
    "category": "Desserts & Beverages",
    "price": 149,
    "discountPrice": 129,
    "rating": 4.8,
    "reviewsCount": 390,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1571867424488-4565932edb41?auto=format&fit=crop&w=600&q=80",
    "description": "Pillowy soft cottage cheese dumplings poached in thickened cardamom milk laced with pure Kashmiri saffron and toasted slivered almonds.",
    "prepTime": "5 mins",
    "available": true
  },
  {
    "id": "dish-18",
    "restaurantId": "rest-1",
    "name": "Alphonso Mango Lassi",
    "category": "Desserts & Beverages",
    "price": 129,
    "discountPrice": 99,
    "rating": 4.8,
    "reviewsCount": 470,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80",
    "description": "Chilled thick churned curd blended with real Ratnagiri Alphonso mango pulp, topped with crushed pistachios.",
    "prepTime": "5 mins",
    "available": true
  },
  {
    "id": "dish-19",
    "restaurantId": "rest-2",
    "name": "Classic Margherita Burrata Pizza (11-inch)",
    "category": "Artisan Pizzas",
    "price": 449,
    "discountPrice": 389,
    "rating": 4.9,
    "reviewsCount": 780,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80",
    "description": "San Marzano tomato sauce, fresh buffalo mozzarella, aromatic fresh basil leaves, extra virgin olive oil and a whole soft burrata center.",
    "prepTime": "20 mins",
    "available": true
  },
  {
    "id": "dish-20",
    "restaurantId": "rest-2",
    "name": "Double Pepperoni Classic Pizza (11-inch)",
    "category": "Artisan Pizzas",
    "price": 549,
    "discountPrice": 479,
    "rating": 4.9,
    "reviewsCount": 920,
    "isVeg": false,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80",
    "description": "Wood-fired sourdough crust loaded with premium cured spicy pork pepperoni slices, melted fior di latte mozzarella and chili honey drizzle.",
    "prepTime": "20 mins",
    "available": true
  },
  {
    "id": "dish-21",
    "restaurantId": "rest-2",
    "name": "Truffle Wild Mushroom Pizza (11-inch)",
    "category": "Artisan Pizzas",
    "price": 529,
    "discountPrice": 469,
    "rating": 4.8,
    "reviewsCount": 440,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80",
    "description": "Roasted shiitake and button mushrooms, creamy fontina cheese, fresh thyme, caramelized garlic and aromatic black truffle oil infusion.",
    "prepTime": "22 mins",
    "available": true
  },
  {
    "id": "dish-22",
    "restaurantId": "rest-2",
    "name": "Quattro Formaggi 4-Cheese Pizza (11-inch)",
    "category": "Artisan Pizzas",
    "price": 499,
    "discountPrice": 439,
    "rating": 4.8,
    "reviewsCount": 380,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80",
    "description": "Indulgent blend of Italian mozzarella, sharp gorgonzola blue cheese, creamy ricotta and aged 24-month parmesan reggiano.",
    "prepTime": "20 mins",
    "available": true
  },
  {
    "id": "dish-23",
    "restaurantId": "rest-2",
    "name": "Fiery Peri-Peri Chicken Pizza (11-inch)",
    "category": "Artisan Pizzas",
    "price": 499,
    "discountPrice": 429,
    "rating": 4.7,
    "reviewsCount": 510,
    "isVeg": false,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80",
    "description": "Spicy roasted peri peri chicken chunks, sliced red bell peppers, jalapeños, red onions and melted smoked scamorza cheese.",
    "prepTime": "20 mins",
    "available": true
  },
  {
    "id": "dish-24",
    "restaurantId": "rest-2",
    "name": "Tuscan Fettuccine Alfredo Cream",
    "category": "Gourmet Pastas",
    "price": 389,
    "discountPrice": 329,
    "rating": 4.8,
    "reviewsCount": 610,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1621996346565-e3d5d6281686?auto=format&fit=crop&w=600&q=80",
    "description": "Fresh handcrafted ribbon pasta tossed in emulsion of Italian sweet butter, rich heavy cream and freshly grated Parmigiano-Reggiano with cracked black pepper.",
    "prepTime": "18 mins",
    "available": true
  },
  {
    "id": "dish-25",
    "restaurantId": "rest-2",
    "name": "Penne Arrabbiata Rustic Piccante",
    "category": "Gourmet Pastas",
    "price": 349,
    "discountPrice": 299,
    "rating": 4.7,
    "reviewsCount": 410,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1621996346565-e3d5d6281686?auto=format&fit=crop&w=600&q=80",
    "description": "Al dente penne in a fiery crushed San Marzano tomato sauce spiked with garlic, dried Calabrian chili flakes and torn sweet basil.",
    "prepTime": "15 mins",
    "available": true
  },
  {
    "id": "dish-26",
    "restaurantId": "rest-2",
    "name": "Spaghetti Bolognese Slow-Simmered",
    "category": "Gourmet Pastas",
    "price": 429,
    "discountPrice": 379,
    "rating": 4.8,
    "reviewsCount": 490,
    "isVeg": false,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1621996346565-e3d5d6281686?auto=format&fit=crop&w=600&q=80",
    "description": "Classic minced meat ragu slow-simmered for 4 hours with tomatoes, rosemary and red wine, twirled over spaghetti with parmesan shavings.",
    "prepTime": "20 mins",
    "available": true
  },
  {
    "id": "dish-27",
    "restaurantId": "rest-2",
    "name": "Genovese Pesto Penne Pasta",
    "category": "Gourmet Pastas",
    "price": 379,
    "discountPrice": 329,
    "rating": 4.8,
    "reviewsCount": 350,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1621996346565-e3d5d6281686?auto=format&fit=crop&w=600&q=80",
    "description": "Vibrant emerald sauce made with crushed basil leaves, toasted pine nuts, garlic, extra virgin olive oil and parmesan cheese with cherry tomatoes.",
    "prepTime": "16 mins",
    "available": true
  },
  {
    "id": "dish-28",
    "restaurantId": "rest-2",
    "name": "Garlic Dough Sticks with Herb Butter",
    "category": "Starters & Breads",
    "price": 199,
    "discountPrice": 169,
    "rating": 4.8,
    "reviewsCount": 710,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80",
    "description": "Wood-fired sourdough breadsticks seasoned with sea salt, oregano and served with warm house whipped garlic rosemary butter and marinara dip.",
    "prepTime": "12 mins",
    "available": true
  },
  {
    "id": "dish-29",
    "restaurantId": "rest-2",
    "name": "Mozzarella Stuffed Arancini (4 pcs)",
    "category": "Starters & Breads",
    "price": 249,
    "discountPrice": 219,
    "rating": 4.7,
    "reviewsCount": 320,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80",
    "description": "Crispy golden crumb-fried saffron risotto spheres filled with molten fresh mozzarella, served over warm pomodoro sauce.",
    "prepTime": "15 mins",
    "available": true
  },
  {
    "id": "dish-30",
    "restaurantId": "rest-2",
    "name": "Bruschetta al Pomodoro e Basilico (4 pcs)",
    "category": "Starters & Breads",
    "price": 219,
    "discountPrice": 189,
    "rating": 4.7,
    "reviewsCount": 280,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80",
    "description": "Charred sourdough baguette toasts topped with ripe heirloom tomatoes, garlic, torn basil, balsamic glaze reduction and sea salt.",
    "prepTime": "12 mins",
    "available": true
  },
  {
    "id": "dish-31",
    "restaurantId": "rest-2",
    "name": "Venetian Tiramisu Classico",
    "category": "Desserts & Sodas",
    "price": 249,
    "discountPrice": 209,
    "rating": 4.9,
    "reviewsCount": 810,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80",
    "description": "Savoiardi ladyfingers steeped in rich dark espresso, layered with whipped mascarpone cream and dusted with raw Dutch cocoa powder.",
    "prepTime": "5 mins",
    "available": true
  },
  {
    "id": "dish-32",
    "restaurantId": "rest-2",
    "name": "Nutella Marshmallow Calzone Pocket",
    "category": "Desserts & Sodas",
    "price": 229,
    "discountPrice": 199,
    "rating": 4.8,
    "reviewsCount": 390,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80",
    "description": "Folded wood-fired pizza pastry oozing with molten Nutella hazelnut spread, mini toasted marshmallows and powdered sugar.",
    "prepTime": "12 mins",
    "available": true
  },
  {
    "id": "dish-33",
    "restaurantId": "rest-2",
    "name": "Sicilian Sparkling Blood Orange Soda",
    "category": "Desserts & Sodas",
    "price": 139,
    "discountPrice": 109,
    "rating": 4.7,
    "reviewsCount": 260,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80",
    "description": "Sparkling Italian mineral water infused with sun-ripened Sicilian red blood orange juice, fresh mint sprig and crushed ice.",
    "prepTime": "5 mins",
    "available": true
  },
  {
    "id": "dish-34",
    "restaurantId": "rest-2",
    "name": "Iced Limoncello Mint Fizz",
    "category": "Desserts & Sodas",
    "price": 129,
    "discountPrice": 99,
    "rating": 4.8,
    "reviewsCount": 310,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80",
    "description": "Zesty Italian lemon cordial with sparkling soda, fresh garden mint, crushed lime wheels and a hint of Mediterranean rosemary.",
    "prepTime": "5 mins",
    "available": true
  },
  {
    "id": "dish-35",
    "restaurantId": "rest-3",
    "name": "Signature Double Smash Cheeseburger",
    "category": "Smash Burgers",
    "price": 349,
    "discountPrice": 299,
    "rating": 4.9,
    "reviewsCount": 1120,
    "isVeg": false,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
    "description": "Two crispy lacy-edge smashed beef/chicken patties, double American cheddar cheese, caramelized onions, dill pickles and secret house smash sauce on a toasted brioche bun.",
    "prepTime": "15 mins",
    "available": true
  },
  {
    "id": "dish-36",
    "restaurantId": "rest-3",
    "name": "Korean Fire Fried Chicken Burger",
    "category": "Smash Burgers",
    "price": 329,
    "discountPrice": 289,
    "rating": 4.9,
    "reviewsCount": 940,
    "isVeg": false,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
    "description": "Extra crunchy double buttermilk fried chicken breast dunked in spicy Gochujang chili glaze, Asian sesame kimchi slaw and kewpie mayo.",
    "prepTime": "18 mins",
    "available": true
  },
  {
    "id": "dish-37",
    "restaurantId": "rest-3",
    "name": "Truffle Black Angus Gourmet Burger",
    "category": "Smash Burgers",
    "price": 429,
    "discountPrice": 379,
    "rating": 4.8,
    "reviewsCount": 510,
    "isVeg": false,
    "isBestseller": false,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
    "description": "Juicy 180g prime patty, melted Swiss Gruyere cheese, butter sautéed wild portobello mushrooms and fragrant black truffle aioli.",
    "prepTime": "20 mins",
    "available": true
  },
  {
    "id": "dish-38",
    "restaurantId": "rest-3",
    "name": "Crispy Paneer Schezwan Burger",
    "category": "Smash Burgers",
    "price": 279,
    "discountPrice": 239,
    "rating": 4.8,
    "reviewsCount": 680,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
    "description": "Thick slab of fresh cottage cheese coated in spicy crunchy batter, fiery Schezwan glaze, crisp lettuce, cheddar slice and chipotle mayo.",
    "prepTime": "15 mins",
    "available": true
  },
  {
    "id": "dish-39",
    "restaurantId": "rest-3",
    "name": "Smoky BBQ Pulled Chicken Burger",
    "category": "Smash Burgers",
    "price": 319,
    "discountPrice": 279,
    "rating": 4.7,
    "reviewsCount": 420,
    "isVeg": false,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
    "description": "Slow-smoked shredded chicken tossed in sweet hickory BBQ sauce, topped with crispy onion strings, melted Monterey Jack and pickled jalapeños.",
    "prepTime": "16 mins",
    "available": true
  },
  {
    "id": "dish-40",
    "restaurantId": "rest-3",
    "name": "The Ultimate Veggie Supreme Burger",
    "category": "Smash Burgers",
    "price": 249,
    "discountPrice": 219,
    "rating": 4.7,
    "reviewsCount": 380,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
    "description": "Artisanal roasted sweet potato, quinoa and mushroom patty with fresh avocado mash, rocket leaves, sun-dried tomato and vegan aioli.",
    "prepTime": "15 mins",
    "available": true
  },
  {
    "id": "dish-41",
    "restaurantId": "rest-3",
    "name": "Truffle Parmesan Crinkle Fries",
    "category": "Sides & Loaded Fries",
    "price": 199,
    "discountPrice": 169,
    "rating": 4.9,
    "reviewsCount": 850,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80",
    "description": "Golden crispy crinkle-cut potatoes tossed in aromatic white truffle oil, freshly shaved parmesan cheese, chopped parsley and rosemary sea salt.",
    "prepTime": "10 mins",
    "available": true
  },
  {
    "id": "dish-42",
    "restaurantId": "rest-3",
    "name": "Peri Peri Seasoned French Fries",
    "category": "Sides & Loaded Fries",
    "price": 149,
    "discountPrice": 129,
    "rating": 4.8,
    "reviewsCount": 610,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80",
    "description": "Crisp shoestring potatoes dusted with house African bird eye peri peri spice mix, served with garlic herb mayo dip.",
    "prepTime": "10 mins",
    "available": true
  },
  {
    "id": "dish-43",
    "restaurantId": "rest-3",
    "name": "Loaded Smoky Bacon Cheese Fries",
    "category": "Sides & Loaded Fries",
    "price": 249,
    "discountPrice": 219,
    "rating": 4.8,
    "reviewsCount": 490,
    "isVeg": false,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80",
    "description": "Mountain of hot fries smothered in molten cheddar cheese sauce, crispy smoked bacon crumbles, sour cream and fresh green spring onions.",
    "prepTime": "12 mins",
    "available": true
  },
  {
    "id": "dish-44",
    "restaurantId": "rest-3",
    "name": "Spicy Buffalo Hot Chicken Wings (6 pcs)",
    "category": "Sides & Loaded Fries",
    "price": 269,
    "discountPrice": 239,
    "rating": 4.8,
    "reviewsCount": 540,
    "isVeg": false,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80",
    "description": "Crispy fried chicken wings tossed in tangy cayenne pepper butter sauce, served with blue cheese dip and celery sticks.",
    "prepTime": "15 mins",
    "available": true
  },
  {
    "id": "dish-45",
    "restaurantId": "rest-3",
    "name": "Crispy Beer-Battered Onion Rings",
    "category": "Sides & Loaded Fries",
    "price": 169,
    "discountPrice": 139,
    "rating": 4.7,
    "reviewsCount": 310,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80",
    "description": "Thick-cut sweet Spanish onions dipped in seasoned craft batter and fried to golden crunch, served with BBQ ranch dip.",
    "prepTime": "10 mins",
    "available": true
  },
  {
    "id": "dish-46",
    "restaurantId": "rest-3",
    "name": "Jalapeno Cheesy Poppers (6 pcs)",
    "category": "Sides & Loaded Fries",
    "price": 189,
    "discountPrice": 159,
    "rating": 4.7,
    "reviewsCount": 270,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80",
    "description": "Crisp breaded bites filled with molten cream cheese, sharp cheddar and minced spicy jalapeños.",
    "prepTime": "10 mins",
    "available": true
  },
  {
    "id": "dish-47",
    "restaurantId": "rest-3",
    "name": "Monster Nutella Oreo Thickshake",
    "category": "Monster Shakes",
    "price": 229,
    "discountPrice": 189,
    "rating": 4.9,
    "reviewsCount": 980,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80",
    "description": "Thick blend of whole milk, vanilla bean gelato, crushed chocolate Oreo biscuits, swirl of Nutella, topped with whipped cream and chocolate drizzle.",
    "prepTime": "8 mins",
    "available": true
  },
  {
    "id": "dish-48",
    "restaurantId": "rest-3",
    "name": "Salted Caramel Pretzel Shake",
    "category": "Monster Shakes",
    "price": 219,
    "discountPrice": 179,
    "rating": 4.8,
    "reviewsCount": 430,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80",
    "description": "Rich artisanal salted caramel syrup churned with ice cream, topped with crunchy salted pretzels, toffee crumbles and chantilly cream.",
    "prepTime": "8 mins",
    "available": true
  },
  {
    "id": "dish-49",
    "restaurantId": "rest-3",
    "name": "Strawberry Shortcake Milkshake",
    "category": "Monster Shakes",
    "price": 199,
    "discountPrice": 169,
    "rating": 4.7,
    "reviewsCount": 320,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80",
    "description": "Real farm strawberry puree blended with cream, vanilla shortbread biscuit crumbs and finished with white chocolate pearls.",
    "prepTime": "8 mins",
    "available": true
  },
  {
    "id": "dish-50",
    "restaurantId": "rest-3",
    "name": "Fresh Mint Limeade Cooler",
    "category": "Monster Shakes",
    "price": 119,
    "discountPrice": 99,
    "rating": 4.7,
    "reviewsCount": 210,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80",
    "description": "Ice-cold sparkling limeade muddled with fresh spearmint leaves, rock salt and organic cane sugar.",
    "prepTime": "5 mins",
    "available": true
  },
  {
    "id": "dish-51",
    "restaurantId": "rest-4",
    "name": "Cantonese Chicken Hakka Noodles",
    "category": "Wok Noodles & Rice",
    "price": 289,
    "discountPrice": 249,
    "rating": 4.8,
    "reviewsCount": 780,
    "isVeg": false,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80",
    "description": "Hand-pulled spring noodles wok-tossed on high flame with shredded chicken breast, bell peppers, scallions, beansprouts and supreme dark soy.",
    "prepTime": "18 mins",
    "available": true
  },
  {
    "id": "dish-52",
    "restaurantId": "rest-4",
    "name": "Burnt Garlic Veg Fried Rice",
    "category": "Wok Noodles & Rice",
    "price": 249,
    "discountPrice": 219,
    "rating": 4.7,
    "reviewsCount": 540,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80",
    "description": "Fragrant jasmine rice stir-fried with golden crunchy burnt garlic flakes, finely diced carrots, sweet corn, baby beans and sesame oil.",
    "prepTime": "15 mins",
    "available": true
  },
  {
    "id": "dish-53",
    "restaurantId": "rest-4",
    "name": "Bangkok Pad Thai Street Noodles",
    "category": "Wok Noodles & Rice",
    "price": 319,
    "discountPrice": 279,
    "rating": 4.8,
    "reviewsCount": 610,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80",
    "description": "Flat rice noodles stir-fried in sweet and sour tamarind sauce with pressed tofu, beansprouts, chives, crushed roasted peanuts and fresh lime.",
    "prepTime": "18 mins",
    "available": true
  },
  {
    "id": "dish-54",
    "restaurantId": "rest-4",
    "name": "Schezwan Triple Chicken Fried Rice",
    "category": "Wok Noodles & Rice",
    "price": 349,
    "discountPrice": 309,
    "rating": 4.8,
    "reviewsCount": 490,
    "isVeg": false,
    "isBestseller": false,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80",
    "description": "Indo-Chinese combination of spicy fried rice and noodles tossed with chicken, served with separate bowl of Schezwan chicken gravy and fried egg.",
    "prepTime": "20 mins",
    "available": true
  },
  {
    "id": "dish-55",
    "restaurantId": "rest-4",
    "name": "Juicy Chicken Xiao Long Bao (6 pcs)",
    "category": "Dim Sum & Momos",
    "price": 299,
    "discountPrice": 269,
    "rating": 4.9,
    "reviewsCount": 650,
    "isVeg": false,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1625398407796-82650a8c135f?auto=format&fit=crop&w=600&q=80",
    "description": "Steamed delicate handmade dumplings burst filled with savory seasoned minced chicken and gelatinized rich ginger bone broth.",
    "prepTime": "18 mins",
    "available": true
  },
  {
    "id": "dish-56",
    "restaurantId": "rest-4",
    "name": "Crystal Truffle Edamame Dimsums (6 pcs)",
    "category": "Dim Sum & Momos",
    "price": 319,
    "discountPrice": 279,
    "rating": 4.8,
    "reviewsCount": 420,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1625398407796-82650a8c135f?auto=format&fit=crop&w=600&q=80",
    "description": "Translucent pleated dumplings stuffed with mashed edamame beans, water chestnuts, exotic shiitake mushrooms and white truffle essence.",
    "prepTime": "18 mins",
    "available": true
  },
  {
    "id": "dish-57",
    "restaurantId": "rest-4",
    "name": "Pan-Fried Schezwan Paneer Momos (6 pcs)",
    "category": "Dim Sum & Momos",
    "price": 239,
    "discountPrice": 199,
    "rating": 4.7,
    "reviewsCount": 510,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1625398407796-82650a8c135f?auto=format&fit=crop&w=600&q=80",
    "description": "Crisp bottom potstickers stuffed with spicy grated cottage cheese and scallions, served with spicy red chili dip.",
    "prepTime": "15 mins",
    "available": true
  },
  {
    "id": "dish-58",
    "restaurantId": "rest-4",
    "name": "Crispy Prawn Har Gow (4 pcs)",
    "category": "Dim Sum & Momos",
    "price": 349,
    "discountPrice": 309,
    "rating": 4.9,
    "reviewsCount": 380,
    "isVeg": false,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1625398407796-82650a8c135f?auto=format&fit=crop&w=600&q=80",
    "description": "Traditional Cantonese dim sum with whole succulent tiger prawns and bamboo shoots encased in delicate translucent wheat starch wrapper.",
    "prepTime": "18 mins",
    "available": true
  },
  {
    "id": "dish-59",
    "restaurantId": "rest-4",
    "name": "Spicy Salmon Crunch Roll (8 pcs)",
    "category": "Sushi & Rolls",
    "price": 499,
    "discountPrice": 449,
    "rating": 4.9,
    "reviewsCount": 520,
    "isVeg": false,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80",
    "description": "Fresh Norwegian salmon, cucumber, spicy sriracha mayo rolled inside seasoned sushi rice, topped with tempura crunch flakes and tobiko roe.",
    "prepTime": "20 mins",
    "available": true
  },
  {
    "id": "dish-60",
    "restaurantId": "rest-4",
    "name": "Creamy Avocado Cucumber Maki (8 pcs)",
    "category": "Sushi & Rolls",
    "price": 369,
    "discountPrice": 329,
    "rating": 4.8,
    "reviewsCount": 340,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80",
    "description": "Hass avocado slices, English cucumber ribbons and Philadelphia cream cheese wrapped in seasoned nori seaweed and toasted white sesame.",
    "prepTime": "15 mins",
    "available": true
  },
  {
    "id": "dish-61",
    "restaurantId": "rest-4",
    "name": "Thai Aromatic Green Curry with Jasmine Rice",
    "category": "Asian Curries & Mains",
    "price": 379,
    "discountPrice": 329,
    "rating": 4.8,
    "reviewsCount": 590,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80",
    "description": "Velvety coconut cream simmered with house green curry paste, bamboo shoots, Thai eggplants, kaffir lime leaves and steamed fragrant jasmine rice.",
    "prepTime": "20 mins",
    "available": true
  },
  {
    "id": "dish-62",
    "restaurantId": "rest-4",
    "name": "General Tso's Sweet & Spicy Crispy Chicken",
    "category": "Asian Curries & Mains",
    "price": 349,
    "discountPrice": 299,
    "rating": 4.8,
    "reviewsCount": 480,
    "isVeg": false,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=600&q=80",
    "description": "Crispy golden battered chicken bites tossed in glossy sweet, tangy and savory garlic ginger glaze with toasted sesame and dried red chilies.",
    "prepTime": "18 mins",
    "available": true
  },
  {
    "id": "dish-63",
    "restaurantId": "rest-4",
    "name": "Kung Pao Paneer with Lotus Stem",
    "category": "Asian Curries & Mains",
    "price": 319,
    "discountPrice": 279,
    "rating": 4.7,
    "reviewsCount": 310,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=600&q=80",
    "description": "Crispy cottage cheese cubes and sliced lotus stem wok-seared with Sichuan peppers, roasted crunchy peanuts and spring onion batons.",
    "prepTime": "18 mins",
    "available": true
  },
  {
    "id": "dish-64",
    "restaurantId": "rest-4",
    "name": "Crispy Chinese Darsaan with Vanilla Gelato",
    "category": "Desserts & Boba",
    "price": 189,
    "discountPrice": 159,
    "rating": 4.8,
    "reviewsCount": 410,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80",
    "description": "Honey-glazed fried crispy flat noodles tossed in roasted sesame seeds, served with a scoop of artisanal Madagascar vanilla bean gelato.",
    "prepTime": "10 mins",
    "available": true
  },
  {
    "id": "dish-65",
    "restaurantId": "rest-4",
    "name": "Taiwanese Brown Sugar Boba Milk Tea",
    "category": "Desserts & Boba",
    "price": 199,
    "discountPrice": 169,
    "rating": 4.9,
    "reviewsCount": 890,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1558857563-b37fcda7d727?auto=format&fit=crop&w=600&q=80",
    "description": "Slow-cooked chewy brown sugar tapioca pearls tiger-striped in fresh whole milk and brewed Ceylon black tea with cracked ice.",
    "prepTime": "5 mins",
    "available": true
  },
  {
    "id": "dish-66",
    "restaurantId": "rest-4",
    "name": "Taro Coconut Iced Bubble Tea",
    "category": "Desserts & Boba",
    "price": 189,
    "discountPrice": 159,
    "rating": 4.8,
    "reviewsCount": 350,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80",
    "description": "Sweet purple taro root brewed with creamy coconut milk and green tea, packed with chewy grass jelly and brown sugar pearls.",
    "prepTime": "5 mins",
    "available": true
  },
  {
    "id": "dish-67",
    "restaurantId": "rest-5",
    "name": "Ghee Roast Masala Dosa",
    "category": "Crispy Dosas",
    "price": 179,
    "discountPrice": 149,
    "rating": 4.9,
    "reviewsCount": 1250,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=80",
    "description": "Ultra crispy paper-thin fermented rice crepe roasted in fragrant pure cow ghee, filled with spiced tempered potato masala. Served with 3 chutneys and hot sambar.",
    "prepTime": "12 mins",
    "available": true
  },
  {
    "id": "dish-68",
    "restaurantId": "rest-5",
    "name": "Mysore Butter Masala Dosa",
    "category": "Crispy Dosas",
    "price": 199,
    "discountPrice": 169,
    "rating": 4.9,
    "reviewsCount": 980,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=80",
    "description": "Golden crispy dosa layered with fiery red garlic-chili paste, dollop of fresh white butter and signature spiced potato filling.",
    "prepTime": "12 mins",
    "available": true
  },
  {
    "id": "dish-69",
    "restaurantId": "rest-5",
    "name": "Gunpowder Podi Ghee Dosa",
    "category": "Crispy Dosas",
    "price": 189,
    "discountPrice": 159,
    "rating": 4.8,
    "reviewsCount": 670,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=80",
    "description": "Roasted crispy dosa generously dusted inside and out with spicy homemade idli podi (gunpowder) roasted in hot cow ghee.",
    "prepTime": "10 mins",
    "available": true
  },
  {
    "id": "dish-70",
    "restaurantId": "rest-5",
    "name": "Cheese Burst Open Face Dosa",
    "category": "Crispy Dosas",
    "price": 219,
    "discountPrice": 189,
    "rating": 4.8,
    "reviewsCount": 540,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=80",
    "description": "Crisp thick dosa topped with melted mozzarella, chopped onions, capsicum, sweet corn and sprinkled with peri peri podi.",
    "prepTime": "14 mins",
    "available": true
  },
  {
    "id": "dish-71",
    "restaurantId": "rest-5",
    "name": "Rava Onion Chili Crisp Dosa",
    "category": "Crispy Dosas",
    "price": 189,
    "discountPrice": 159,
    "rating": 4.7,
    "reviewsCount": 420,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=80",
    "description": "Lacy, crunchy semolina batter crepe studded with cracked black pepper, cumin seeds, finely diced red onions and curry leaves.",
    "prepTime": "15 mins",
    "available": true
  },
  {
    "id": "dish-72",
    "restaurantId": "rest-5",
    "name": "Button Ghee Sambar Mini Idlis (14 pcs)",
    "category": "Idli & Vada Platters",
    "price": 169,
    "discountPrice": 139,
    "rating": 4.9,
    "reviewsCount": 1100,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80",
    "description": "Fourteen bite-sized feather-light steamed idlis submerged in piping hot shallot sambar, crowned with a generous spoonful of pure melted ghee.",
    "prepTime": "8 mins",
    "available": true
  },
  {
    "id": "dish-73",
    "restaurantId": "rest-5",
    "name": "Crispy Medu Vada Sambar Combo (2 pcs)",
    "category": "Idli & Vada Platters",
    "price": 139,
    "discountPrice": 119,
    "rating": 4.8,
    "reviewsCount": 850,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80",
    "description": "Golden crunchy on the outside, fluffy cloud on the inside urad dal fritters studded with peppercorns and curry leaves. Served with coconut chutney.",
    "prepTime": "10 mins",
    "available": true
  },
  {
    "id": "dish-74",
    "restaurantId": "rest-5",
    "name": "Ghee Podi Paniyaram (7 pcs)",
    "category": "Idli & Vada Platters",
    "price": 149,
    "discountPrice": 129,
    "rating": 4.8,
    "reviewsCount": 380,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80",
    "description": "Crispy round dumplings roasted in cast iron appe pan with onions, mustard seeds, curry leaves, and tossed in spicy gun powder.",
    "prepTime": "12 mins",
    "available": true
  },
  {
    "id": "dish-75",
    "restaurantId": "rest-5",
    "name": "Royal South Indian Mini Thali",
    "category": "Rice Bowls & Meals",
    "price": 279,
    "discountPrice": 239,
    "rating": 4.9,
    "reviewsCount": 920,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80",
    "description": "Complete meal: Steamed Sona Masoori rice, Bisibelebath, Curd Rice, 1 Mini Masala Dosa, Drumstick Sambar, Rasam, Kootu, Appalam, Pickle and Payasam.",
    "prepTime": "15 mins",
    "available": true
  },
  {
    "id": "dish-76",
    "restaurantId": "rest-5",
    "name": "Karnataka Bisibelebath with Boondi & Ghee",
    "category": "Rice Bowls & Meals",
    "price": 189,
    "discountPrice": 159,
    "rating": 4.8,
    "reviewsCount": 610,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?auto=format&fit=crop&w=600&q=80",
    "description": "Traditional comfort dish of rice, toor dal and assorted vegetables simmered in spicy clove-nutmeg masala, topped with crispy spiced boondi and ghee.",
    "prepTime": "12 mins",
    "available": true
  },
  {
    "id": "dish-77",
    "restaurantId": "rest-5",
    "name": "Creamy Temple Curd Rice with Pomegranate",
    "category": "Rice Bowls & Meals",
    "price": 149,
    "discountPrice": 129,
    "rating": 4.8,
    "reviewsCount": 450,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?auto=format&fit=crop&w=600&q=80",
    "description": "Soft mashed rice blended with set curd, whole milk, tempered with mustard, ginger, green chilies, curry leaves and topped with ruby red pomegranate seeds.",
    "prepTime": "8 mins",
    "available": true
  },
  {
    "id": "dish-78",
    "restaurantId": "rest-5",
    "name": "Artisanal Pure Ghee Mysore Pak (3 pcs)",
    "category": "Sweets & Kaapi",
    "price": 129,
    "discountPrice": 99,
    "rating": 4.9,
    "reviewsCount": 780,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1571867424488-4565932edb41?auto=format&fit=crop&w=600&q=80",
    "description": "Rich melt-in-mouth traditional sweet cooked with pure gram flour, caramelized sugar and lavish quantities of warm desi ghee.",
    "prepTime": "5 mins",
    "available": true
  },
  {
    "id": "dish-79",
    "restaurantId": "rest-5",
    "name": "Warm Badam Halwa with Saffron",
    "category": "Sweets & Kaapi",
    "price": 169,
    "discountPrice": 139,
    "rating": 4.8,
    "reviewsCount": 390,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1571867424488-4565932edb41?auto=format&fit=crop&w=600&q=80",
    "description": "Decadent dessert prepared from whole blanched almonds ground into paste, roasted slowly in pure ghee with saffron and cardamom.",
    "prepTime": "5 mins",
    "available": true
  },
  {
    "id": "dish-80",
    "restaurantId": "rest-5",
    "name": "Kumbakonam Degree Filter Coffee (Hot)",
    "category": "Sweets & Kaapi",
    "price": 79,
    "discountPrice": 59,
    "rating": 4.9,
    "reviewsCount": 1420,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
    "description": "Authentic decoction brewed from freshly roasted chicory coffee beans, poured back and forth with frothy full-cream cow milk in traditional brass dabarah.",
    "prepTime": "5 mins",
    "available": true
  },
  {
    "id": "dish-81",
    "restaurantId": "rest-5",
    "name": "Spiced Masala Buttermilk (Chaas)",
    "category": "Sweets & Kaapi",
    "price": 69,
    "discountPrice": 49,
    "rating": 4.8,
    "reviewsCount": 510,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=600&q=80",
    "description": "Refreshing chilled churned yogurt with roasted cumin seeds, ginger, green chilies, coriander and black salt.",
    "prepTime": "5 mins",
    "available": true
  },
  {
    "id": "dish-82",
    "restaurantId": "rest-5",
    "name": "Pineapple Kesari Bath with Cashews",
    "category": "Sweets & Kaapi",
    "price": 109,
    "discountPrice": 89,
    "rating": 4.7,
    "reviewsCount": 310,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1605194000384-439c3ced8d15?auto=format&fit=crop&w=600&q=80",
    "description": "Sweet semolina pudding infused with real crushed pineapple tidbits, cardamom, pure ghee and golden roasted whole cashews.",
    "prepTime": "5 mins",
    "available": true
  },
  {
    "id": "dish-83",
    "restaurantId": "rest-6",
    "name": "Mediterranean Falafel Super Harvest Bowl",
    "category": "Superfood Bowls",
    "price": 349,
    "discountPrice": 299,
    "rating": 4.8,
    "reviewsCount": 610,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80",
    "description": "Herb baked chickpea falafel patties, organic tri-color quinoa, roasted cherry tomatoes, English cucumbers, Kalamata olives, creamy house hummus and tahini garlic dressing.",
    "prepTime": "15 mins",
    "available": true
  },
  {
    "id": "dish-84",
    "restaurantId": "rest-6",
    "name": "Grilled Lemon Herb Chicken Quinoa Bowl",
    "category": "Superfood Bowls",
    "price": 389,
    "discountPrice": 339,
    "rating": 4.9,
    "reviewsCount": 780,
    "isVeg": false,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80",
    "description": "Sous-vide grilled chicken breast, fluffy red quinoa, roasted sweet potatoes, steamed broccoli florets, Hass avocado slices and honey mustard vinaigrette.",
    "prepTime": "18 mins",
    "available": true
  },
  {
    "id": "dish-85",
    "restaurantId": "rest-6",
    "name": "Teriyaki Glazed Tofu Sesame Bowl",
    "category": "Superfood Bowls",
    "price": 329,
    "discountPrice": 289,
    "rating": 4.7,
    "reviewsCount": 410,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80",
    "description": "Pan-seared firm organic tofu in low sodium teriyaki glaze, brown basmati rice, edamame, pickled carrots, purple cabbage and toasted sesame seeds.",
    "prepTime": "15 mins",
    "available": true
  },
  {
    "id": "dish-86",
    "restaurantId": "rest-6",
    "name": "Fiesta Burrito Power Bowl (Veg)",
    "category": "Superfood Bowls",
    "price": 299,
    "discountPrice": 259,
    "rating": 4.8,
    "reviewsCount": 490,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80",
    "description": "Cilantro lime brown rice, spiced black beans, charred corn salsa, fresh guacamole, pico de gallo and chipotle yogurt dressing.",
    "prepTime": "14 mins",
    "available": true
  },
  {
    "id": "dish-87",
    "restaurantId": "rest-6",
    "name": "Classic Caesar Salad with Herb Croutons",
    "category": "Gourmet Salads",
    "price": 269,
    "discountPrice": 229,
    "rating": 4.8,
    "reviewsCount": 580,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80",
    "description": "Crisp romaine hearts tossed in creamy Greek yogurt Caesar dressing with garlic sourdough croutons and freshly grated parmesan reggiano shavings.",
    "prepTime": "10 mins",
    "available": true
  },
  {
    "id": "dish-88",
    "restaurantId": "rest-6",
    "name": "Greek Feta & Kalamata Olive Salad",
    "category": "Gourmet Salads",
    "price": 289,
    "discountPrice": 249,
    "rating": 4.7,
    "reviewsCount": 340,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80",
    "description": "Chunky vine tomatoes, Persian cucumbers, red onion rings, Kalamata olives and a slab of authentic Greek sheep feta with oregano olive oil.",
    "prepTime": "10 mins",
    "available": true
  },
  {
    "id": "dish-89",
    "restaurantId": "rest-6",
    "name": "Thai Crunchy Peanut Chicken Salad",
    "category": "Gourmet Salads",
    "price": 329,
    "discountPrice": 289,
    "rating": 4.8,
    "reviewsCount": 420,
    "isVeg": false,
    "isBestseller": false,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80",
    "description": "Shredded chicken, Napa cabbage, snow peas, cilantro, mint and crushed roasted peanuts tossed in a fiery sweet chili peanut dressing.",
    "prepTime": "12 mins",
    "available": true
  },
  {
    "id": "dish-90",
    "restaurantId": "rest-6",
    "name": "Paneer Tikka Multigrain Protein Wrap",
    "category": "High Protein Wraps",
    "price": 249,
    "discountPrice": 219,
    "rating": 4.8,
    "reviewsCount": 510,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80",
    "description": "Charbroiled spiced paneer chunks rolled in a warm handmade 7-grain flatbread with mint yogurt dip, pickled onions and crunchy bell peppers.",
    "prepTime": "12 mins",
    "available": true
  },
  {
    "id": "dish-91",
    "restaurantId": "rest-6",
    "name": "Grilled Chicken Pesto Whole Wheat Wrap",
    "category": "High Protein Wraps",
    "price": 279,
    "discountPrice": 239,
    "rating": 4.8,
    "reviewsCount": 430,
    "isVeg": false,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80",
    "description": "Tender grilled chicken tossed in basil pesto, sun-dried tomatoes, mozzarella and baby spinach wrapped in toasted whole wheat tortilla.",
    "prepTime": "12 mins",
    "available": true
  },
  {
    "id": "dish-92",
    "restaurantId": "rest-6",
    "name": "Pure Acai Berry Antioxidant Smoothie Bowl",
    "category": "Smoothies & Juices",
    "price": 299,
    "discountPrice": 259,
    "rating": 4.9,
    "reviewsCount": 720,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80",
    "description": "Frozen Amazonian organic acai berry puree blended thick with bananas and almond milk, topped with chia seeds, toasted granola, fresh blueberries and strawberries.",
    "prepTime": "8 mins",
    "available": true
  },
  {
    "id": "dish-93",
    "restaurantId": "rest-6",
    "name": "Glow Green Cold Pressed Detox Juice",
    "category": "Smoothies & Juices",
    "price": 169,
    "discountPrice": 139,
    "rating": 4.8,
    "reviewsCount": 460,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80",
    "description": "100% pure raw cold-pressed celery, baby spinach, crisp Granny Smith green apple, cucumber, lemon and ginger. No added sugar.",
    "prepTime": "5 mins",
    "available": true
  },
  {
    "id": "dish-94",
    "restaurantId": "rest-6",
    "name": "Golden Turmeric Ginger Immunity Booster",
    "category": "Smoothies & Juices",
    "price": 159,
    "discountPrice": 129,
    "rating": 4.7,
    "reviewsCount": 290,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80",
    "description": "Cold-pressed fresh orange juice, whole carrots, fresh turmeric root, ginger and a pinch of black pepper.",
    "prepTime": "5 mins",
    "available": true
  },
  {
    "id": "dish-95",
    "restaurantId": "rest-6",
    "name": "Dark Chocolate Avocado Protein Mousse",
    "category": "Smoothies & Juices",
    "price": 189,
    "discountPrice": 159,
    "rating": 4.8,
    "reviewsCount": 350,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80",
    "description": "Guilt-free dessert whipped from ripe avocados, 85% Belgian dark cocoa, maple syrup and sea salt flakes. 12g protein.",
    "prepTime": "5 mins",
    "available": true
  },
  {
    "id": "dish-96",
    "restaurantId": "rest-6",
    "name": "Chia Mango Super Protein Pudding",
    "category": "Smoothies & Juices",
    "price": 179,
    "discountPrice": 149,
    "rating": 4.7,
    "reviewsCount": 280,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80",
    "description": "Organic chia seeds soaked overnight in coconut milk, layered with fresh mango compote and toasted coconut shavings.",
    "prepTime": "5 mins",
    "available": true
  },
  {
    "id": "dish-97",
    "restaurantId": "rest-6",
    "name": "Activated Charcoal Detox Lemonade",
    "category": "Smoothies & Juices",
    "price": 139,
    "discountPrice": 109,
    "rating": 4.7,
    "reviewsCount": 240,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80",
    "description": "Ultra-purified water with coconut shell activated charcoal, freshly squeezed lemons and agave nectar.",
    "prepTime": "5 mins",
    "available": true
  },
  {
    "id": "dish-98",
    "restaurantId": "rest-7",
    "name": "Tokyo Flaming Dragon Roll (8 pcs)",
    "category": "Specialty Sushi",
    "price": 549,
    "discountPrice": 489,
    "rating": 4.9,
    "reviewsCount": 670,
    "isVeg": false,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80",
    "description": "Crispy prawn tempura and cucumber roll draped with torch-seared BBQ unagi eel, avocado slices, unagi glaze, spicy mayo and flying fish roe.",
    "prepTime": "20 mins",
    "available": true
  },
  {
    "id": "dish-99",
    "restaurantId": "rest-7",
    "name": "Spicy Crunchy Tuna Roll (8 pcs)",
    "category": "Specialty Sushi",
    "price": 489,
    "discountPrice": 429,
    "rating": 4.8,
    "reviewsCount": 510,
    "isVeg": false,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80",
    "description": "Sashimi grade yellowfin tuna minced with Japanese togarashi chili, sriracha, scallions and crunchy tempura crisps.",
    "prepTime": "18 mins",
    "available": true
  },
  {
    "id": "dish-100",
    "restaurantId": "rest-7",
    "name": "Aburi Flame-Torched Salmon Nigiri (4 pcs)",
    "category": "Specialty Sushi",
    "price": 429,
    "discountPrice": 379,
    "rating": 4.9,
    "reviewsCount": 460,
    "isVeg": false,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80",
    "description": "Pristine Norwegian salmon laid over seasoned Akita rice pillows, blow-torched tableside with sweet soy reduction and truffle mayo.",
    "prepTime": "15 mins",
    "available": true
  },
  {
    "id": "dish-101",
    "restaurantId": "rest-7",
    "name": "Crispy Asparagus & Cream Cheese Roll (8 pcs)",
    "category": "Specialty Sushi",
    "price": 389,
    "discountPrice": 339,
    "rating": 4.7,
    "reviewsCount": 320,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80",
    "description": "Panko crusted baby asparagus stalks, Philadelphia cream cheese and avocado rolled with toasted black sesame seeds.",
    "prepTime": "15 mins",
    "available": true
  },
  {
    "id": "dish-102",
    "restaurantId": "rest-7",
    "name": "Rich Tonkotsu Chashu Ramen",
    "category": "Ramen & Noodles",
    "price": 479,
    "discountPrice": 419,
    "rating": 4.9,
    "reviewsCount": 890,
    "isVeg": false,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80",
    "description": "16-hour simmered creamy rich pork bone broth with handmade ramen noodles, melt-in-mouth braised chashu pork slices, ajitsuke tamago egg, menma bamboo and nori.",
    "prepTime": "20 mins",
    "available": true
  },
  {
    "id": "dish-103",
    "restaurantId": "rest-7",
    "name": "Tokyo Shoyu Chicken Paitan Ramen",
    "category": "Ramen & Noodles",
    "price": 429,
    "discountPrice": 379,
    "rating": 4.8,
    "reviewsCount": 540,
    "isVeg": false,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80",
    "description": "Golden chicken collagen broth, tender sous-vide chicken breast slices, marinated soft-boiled egg, scallions and black garlic oil.",
    "prepTime": "20 mins",
    "available": true
  },
  {
    "id": "dish-104",
    "restaurantId": "rest-7",
    "name": "Spicy Miso Tofu & Mushroom Veg Ramen",
    "category": "Ramen & Noodles",
    "price": 389,
    "discountPrice": 339,
    "rating": 4.8,
    "reviewsCount": 420,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80",
    "description": "Hearty red miso broth flavored with chili garlic oil, silken tofu cubes, shiitake mushrooms, sweet corn, bok choy and spring onions.",
    "prepTime": "18 mins",
    "available": true
  },
  {
    "id": "dish-105",
    "restaurantId": "rest-7",
    "name": "Chicken Karaage Japanese Crispy Bites",
    "category": "Izakaya Appetizers",
    "price": 289,
    "discountPrice": 249,
    "rating": 4.8,
    "reviewsCount": 610,
    "isVeg": false,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=600&q=80",
    "description": "Juicy chicken thigh nuggets marinated in soy, mirin and ginger, coated in potato starch and fried crispy. Served with Japanese Kewpie mayo and lemon wedge.",
    "prepTime": "15 mins",
    "available": true
  },
  {
    "id": "dish-106",
    "restaurantId": "rest-7",
    "name": "Crispy Tiger Prawn Tempura (4 pcs)",
    "category": "Izakaya Appetizers",
    "price": 369,
    "discountPrice": 329,
    "rating": 4.9,
    "reviewsCount": 480,
    "isVeg": false,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1535400255456-984241443b29?auto=format&fit=crop&w=600&q=80",
    "description": "Giant tiger prawns dipped in feather-light ice-cold tempura batter and flash-fried to golden crunch. Served with warm tentsuyu dipping broth.",
    "prepTime": "15 mins",
    "available": true
  },
  {
    "id": "dish-107",
    "restaurantId": "rest-7",
    "name": "Pan-Seared Pork Gyoza Dumplings (5 pcs)",
    "category": "Izakaya Appetizers",
    "price": 279,
    "discountPrice": 239,
    "rating": 4.8,
    "reviewsCount": 390,
    "isVeg": false,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1625398407796-82650a8c135f?auto=format&fit=crop&w=600&q=80",
    "description": "Crescent dumplings with a lacy crispy skirt, filled with seasoned minced pork, garlic chives and cabbage. Served with chili vinegar soy dip.",
    "prepTime": "14 mins",
    "available": true
  },
  {
    "id": "dish-108",
    "restaurantId": "rest-7",
    "name": "Steamed Sea Salt Edamame Pods",
    "category": "Izakaya Appetizers",
    "price": 189,
    "discountPrice": 159,
    "rating": 4.7,
    "reviewsCount": 310,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=600&q=80",
    "description": "Fresh whole young soybean pods steamed to order, sprinkled with coarse Maldon sea salt flakes and roasted sesame.",
    "prepTime": "8 mins",
    "available": true
  },
  {
    "id": "dish-109",
    "restaurantId": "rest-7",
    "name": "Crispy Japanese Vegetable Tempura Platter",
    "category": "Izakaya Appetizers",
    "price": 249,
    "discountPrice": 219,
    "rating": 4.7,
    "reviewsCount": 260,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
    "description": "Sweet potato, shiitake mushrooms, bell peppers and lotus root dipped in airy tempura batter and fried crisp.",
    "prepTime": "14 mins",
    "available": true
  },
  {
    "id": "dish-110",
    "restaurantId": "rest-7",
    "name": "Artisanal Mochi Ice Cream Trio (3 pcs)",
    "category": "Japanese Treats",
    "price": 229,
    "discountPrice": 189,
    "rating": 4.9,
    "reviewsCount": 640,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80",
    "description": "Three chewy pounded sweet rice dough balls encasing premium matcha green tea, black sesame and Alphonso mango ice cream centers.",
    "prepTime": "5 mins",
    "available": true
  },
  {
    "id": "dish-111",
    "restaurantId": "rest-7",
    "name": "Matcha Green Tea Baked Cheesecake",
    "category": "Japanese Treats",
    "price": 249,
    "discountPrice": 219,
    "rating": 4.8,
    "reviewsCount": 380,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80",
    "description": "Velvety smooth New York style cheesecake infused with ceremonial grade Uji matcha, over a dark chocolate cookie crust.",
    "prepTime": "5 mins",
    "available": true
  },
  {
    "id": "dish-112",
    "restaurantId": "rest-7",
    "name": "Iced Ceremonial Matcha Latte",
    "category": "Japanese Treats",
    "price": 199,
    "discountPrice": 169,
    "rating": 4.9,
    "reviewsCount": 570,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
    "description": "Stone-ground Kyoto green tea whisked with cold whole milk, hint of vanilla and poured over crystal clear ice.",
    "prepTime": "5 mins",
    "available": true
  },
  {
    "id": "dish-113",
    "restaurantId": "rest-7",
    "name": "Classic Japanese Ramune Marble Soda",
    "category": "Japanese Treats",
    "price": 149,
    "discountPrice": 129,
    "rating": 4.7,
    "reviewsCount": 290,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80",
    "description": "Original glass-marble neck Japanese carbonated lemon-lime soft drink. Refreshing and nostalgic.",
    "prepTime": "5 mins",
    "available": true
  },
  {
    "id": "dish-114",
    "restaurantId": "rest-8",
    "name": "Triple Belgian Chocolate Waffle",
    "category": "Belgian Waffles",
    "price": 269,
    "discountPrice": 229,
    "rating": 4.9,
    "reviewsCount": 1150,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=600&q=80",
    "description": "Freshly ironed crispy Liege waffle smothered in melted Belgian milk chocolate, dark chocolate ganache, white chocolate shavings and chocolate pearls.",
    "prepTime": "12 mins",
    "available": true
  },
  {
    "id": "dish-115",
    "restaurantId": "rest-8",
    "name": "Lotus Biscoff Crumble Overload Waffle",
    "category": "Belgian Waffles",
    "price": 289,
    "discountPrice": 249,
    "rating": 4.9,
    "reviewsCount": 890,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=600&q=80",
    "description": "Warm caramelized waffle drizzled lavishly with warm Biscoff spread, crushed spiced speculoos biscuits and a scoop of vanilla ice cream.",
    "prepTime": "12 mins",
    "available": true
  },
  {
    "id": "dish-116",
    "restaurantId": "rest-8",
    "name": "Nutella Strawberry Paradise Waffle",
    "category": "Belgian Waffles",
    "price": 279,
    "discountPrice": 239,
    "rating": 4.8,
    "reviewsCount": 720,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=600&q=80",
    "description": "Golden waffle spread with authentic Ferrero Nutella, sliced Mahabaleshwar strawberries, toasted hazelnuts and powdered sugar.",
    "prepTime": "12 mins",
    "available": true
  },
  {
    "id": "dish-117",
    "restaurantId": "rest-8",
    "name": "Fluffy Japanese Souffle Pancakes (2 pcs)",
    "category": "Belgian Waffles",
    "price": 299,
    "discountPrice": 259,
    "rating": 4.8,
    "reviewsCount": 540,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=600&q=80",
    "description": "Ultra light, airy jiggly pancakes served with whipped butter, pure Canadian maple syrup and fresh mixed berry compote.",
    "prepTime": "15 mins",
    "available": true
  },
  {
    "id": "dish-118",
    "restaurantId": "rest-8",
    "name": "Molten Dark Chocolate Lava Cake",
    "category": "Gourmet Cakes",
    "price": 219,
    "discountPrice": 179,
    "rating": 4.9,
    "reviewsCount": 1340,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80",
    "description": "Warm baked individual dark chocolate cake with a molten liquid center that erupts when sliced. Served with vanilla bean cream.",
    "prepTime": "10 mins",
    "available": true
  },
  {
    "id": "dish-119",
    "restaurantId": "rest-8",
    "name": "New York Baked Blueberry Cheesecake Slice",
    "category": "Gourmet Cakes",
    "price": 269,
    "discountPrice": 229,
    "rating": 4.8,
    "reviewsCount": 810,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80",
    "description": "Dense and creamy classic baked cream cheese over a buttery graham cracker crust, topped with wild blueberry coulis.",
    "prepTime": "5 mins",
    "available": true
  },
  {
    "id": "dish-120",
    "restaurantId": "rest-8",
    "name": "Velvet Red Sponge Cake with Cream Cheese",
    "category": "Gourmet Cakes",
    "price": 239,
    "discountPrice": 199,
    "rating": 4.8,
    "reviewsCount": 610,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80",
    "description": "Ruby red cocoa sponge layered with silky smooth Madagascar vanilla cream cheese frosting and cake crumbles.",
    "prepTime": "5 mins",
    "available": true
  },
  {
    "id": "dish-121",
    "restaurantId": "rest-8",
    "name": "Basque Burnt Cheesecake Slice",
    "category": "Gourmet Cakes",
    "price": 279,
    "discountPrice": 239,
    "rating": 4.9,
    "reviewsCount": 520,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80",
    "description": "Caramelized burnt crust with an ultra-custardy, almost molten creamy center originating from San Sebastian, Spain.",
    "prepTime": "5 mins",
    "available": true
  },
  {
    "id": "dish-122",
    "restaurantId": "rest-8",
    "name": "Parisian Macaron Gift Box (6 pcs)",
    "category": "French Pastries",
    "price": 349,
    "discountPrice": 299,
    "rating": 4.9,
    "reviewsCount": 690,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=600&q=80",
    "description": "Six delicate almond meringue shells with chewy centers: Pistachio, Dark Chocolate, Salted Caramel, Raspberry, Vanilla and Lemon.",
    "prepTime": "5 mins",
    "available": true
  },
  {
    "id": "dish-123",
    "restaurantId": "rest-8",
    "name": "Fresh Seasonal Fruit Tart",
    "category": "French Pastries",
    "price": 199,
    "discountPrice": 169,
    "rating": 4.7,
    "reviewsCount": 380,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&w=600&q=80",
    "description": "Crispy sweet sablee tart shell filled with velvety vanilla bean diplomat cream, crowned with glazed fresh berries and kiwi.",
    "prepTime": "5 mins",
    "available": true
  },
  {
    "id": "dish-124",
    "restaurantId": "rest-8",
    "name": "French Toasted Almond Croissant",
    "category": "French Pastries",
    "price": 179,
    "discountPrice": 149,
    "rating": 4.8,
    "reviewsCount": 490,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80",
    "description": "Flaky double-baked pure butter croissant filled with frangipane almond cream and covered in toasted sliced almonds.",
    "prepTime": "8 mins",
    "available": true
  },
  {
    "id": "dish-125",
    "restaurantId": "rest-8",
    "name": "Belgian Dark Chocolate Truffle Pastry",
    "category": "French Pastries",
    "price": 189,
    "discountPrice": 159,
    "rating": 4.8,
    "reviewsCount": 560,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80",
    "description": "Layers of moist chocolate sponge and 70% dark chocolate ganache glazed in mirror chocolate shine.",
    "prepTime": "5 mins",
    "available": true
  },
  {
    "id": "dish-126",
    "restaurantId": "rest-8",
    "name": "Thick Italian Dark Hot Chocolate",
    "category": "Dessert Shakes",
    "price": 199,
    "discountPrice": 169,
    "rating": 4.9,
    "reviewsCount": 890,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80",
    "description": "Pudding-thick European style drinking chocolate made from melted dark chocolate blocks and cream. So thick it coats the spoon.",
    "prepTime": "8 mins",
    "available": true
  },
  {
    "id": "dish-127",
    "restaurantId": "rest-8",
    "name": "Belgian Dark Chocolate Overload Shake",
    "category": "Dessert Shakes",
    "price": 229,
    "discountPrice": 189,
    "rating": 4.8,
    "reviewsCount": 640,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80",
    "description": "Creamy blend of whole milk, chocolate gelato, brownie bits and fudge, crowned with whipped cream.",
    "prepTime": "8 mins",
    "available": true
  },
  {
    "id": "dish-128",
    "restaurantId": "rest-8",
    "name": "Bronte Pistachio Artisanal Gelato Tub",
    "category": "Dessert Shakes",
    "price": 219,
    "discountPrice": 179,
    "rating": 4.8,
    "reviewsCount": 380,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80",
    "description": "Authentic Italian slow-churned gelato made with 100% roasted Sicilian pistachio paste and whole milk.",
    "prepTime": "5 mins",
    "available": true
  },
  {
    "id": "dish-129",
    "restaurantId": "rest-8",
    "name": "Wild Berry Sparkling Spritzer",
    "category": "Dessert Shakes",
    "price": 149,
    "discountPrice": 119,
    "rating": 4.7,
    "reviewsCount": 260,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80",
    "description": "Sparkling water infused with macerated blackberries, raspberries, mint and lime.",
    "prepTime": "5 mins",
    "available": true
  },
  {
    "id": "dish-130",
    "restaurantId": "rest-9",
    "name": "Crispy Baja Fish Tacos (3 pcs)",
    "category": "Street Tacos",
    "price": 369,
    "discountPrice": 319,
    "rating": 4.9,
    "reviewsCount": 780,
    "isVeg": false,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80",
    "description": "Beer-battered crispy sea bass in warm corn tortillas with shredded chipotle lime slaw, pico de gallo, avocado slices and creamy Baja crema.",
    "prepTime": "15 mins",
    "available": true
  },
  {
    "id": "dish-131",
    "restaurantId": "rest-9",
    "name": "Smoky Tinga Chicken Tacos (3 pcs)",
    "category": "Street Tacos",
    "price": 329,
    "discountPrice": 289,
    "rating": 4.8,
    "reviewsCount": 610,
    "isVeg": false,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80",
    "description": "Shredded chicken slow-braised in smoky chipotle and roasted tomato sauce, topped with cotija cheese, pickled red onions and fresh cilantro.",
    "prepTime": "14 mins",
    "available": true
  },
  {
    "id": "dish-132",
    "restaurantId": "rest-9",
    "name": "Grilled Chipotle Paneer Tacos (3 pcs)",
    "category": "Street Tacos",
    "price": 289,
    "discountPrice": 249,
    "rating": 4.7,
    "reviewsCount": 450,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80",
    "description": "Charred spiced cottage cheese cubes, sweet grilled corn salsa, black beans, guacamole and cilantro crema in soft flour tortillas.",
    "prepTime": "14 mins",
    "available": true
  },
  {
    "id": "dish-133",
    "restaurantId": "rest-9",
    "name": "Slow Cooked Birria Tacos with Consomme (3 pcs)",
    "category": "Street Tacos",
    "price": 429,
    "discountPrice": 379,
    "rating": 4.9,
    "reviewsCount": 890,
    "isVeg": false,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80",
    "description": "Crispy corn tortillas dipped in chili oil, filled with tender shredded slow-cooked meat and molten cheese. Served with piping hot rich spiced consomme dip.",
    "prepTime": "18 mins",
    "available": true
  },
  {
    "id": "dish-134",
    "restaurantId": "rest-9",
    "name": "Supreme Grande Loaded Nachos Platter",
    "category": "Nachos & Quesadillas",
    "price": 319,
    "discountPrice": 279,
    "rating": 4.9,
    "reviewsCount": 940,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1618040996337-56904b7850b9?auto=format&fit=crop&w=600&q=80",
    "description": "Crispy stone-ground corn chips piled with warm queso cheese sauce, black beans, jalapeños, pico de gallo, sour cream and a big scoop of fresh guacamole.",
    "prepTime": "12 mins",
    "available": true
  },
  {
    "id": "dish-135",
    "restaurantId": "rest-9",
    "name": "Smoky Pulled Chicken Cheesy Quesadilla",
    "category": "Nachos & Quesadillas",
    "price": 329,
    "discountPrice": 289,
    "rating": 4.8,
    "reviewsCount": 570,
    "isVeg": false,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1618040996337-56904b7850b9?auto=format&fit=crop&w=600&q=80",
    "description": "Toasted 12-inch flour tortilla stuffed with melted Monterey Jack, seasoned chicken, roasted peppers and caramelized onions. Served with sour cream.",
    "prepTime": "15 mins",
    "available": true
  },
  {
    "id": "dish-136",
    "restaurantId": "rest-9",
    "name": "3-Cheese Spinach & Mushroom Quesadilla",
    "category": "Nachos & Quesadillas",
    "price": 279,
    "discountPrice": 239,
    "rating": 4.7,
    "reviewsCount": 380,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1618040996337-56904b7850b9?auto=format&fit=crop&w=600&q=80",
    "description": "Sautéed garlic spinach, button mushrooms and blend of cheddar, mozzarella and queso fresco pressed until crispy and gooey.",
    "prepTime": "14 mins",
    "available": true
  },
  {
    "id": "dish-137",
    "restaurantId": "rest-9",
    "name": "Fresh Table-Side Guacamole & Warm Chips",
    "category": "Nachos & Quesadillas",
    "price": 249,
    "discountPrice": 219,
    "rating": 4.9,
    "reviewsCount": 620,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1618040996337-56904b7850b9?auto=format&fit=crop&w=600&q=80",
    "description": "Ripe Hass avocados hand-mashed with lime juice, sea salt, diced red onions, jalapeños and fresh cilantro. Served with warm house tortilla chips.",
    "prepTime": "8 mins",
    "available": true
  },
  {
    "id": "dish-138",
    "restaurantId": "rest-9",
    "name": "Mission Style Chipotle Chicken Burrito",
    "category": "Burritos & Bowls",
    "price": 349,
    "discountPrice": 299,
    "rating": 4.8,
    "reviewsCount": 710,
    "isVeg": false,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80",
    "description": "Giant warm tortilla packed with grilled chipotle chicken, cilantro lime rice, pinto beans, melted cheese, shredded lettuce, pico and chipotle aioli.",
    "prepTime": "15 mins",
    "available": true
  },
  {
    "id": "dish-139",
    "restaurantId": "rest-9",
    "name": "Fiesta Veggie Crunch Burrito Bowl",
    "category": "Burritos & Bowls",
    "price": 299,
    "discountPrice": 259,
    "rating": 4.8,
    "reviewsCount": 490,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80",
    "description": "Brown cilantro lime rice, seasoned black beans, fajita grilled peppers and onions, fresh guacamole, roasted corn salsa and salsa verde.",
    "prepTime": "12 mins",
    "available": true
  },
  {
    "id": "dish-140",
    "restaurantId": "rest-9",
    "name": "Sizzling Grilled Chicken Fajitas with Warm Tortillas",
    "category": "Burritos & Bowls",
    "price": 399,
    "discountPrice": 349,
    "rating": 4.8,
    "reviewsCount": 430,
    "isVeg": false,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80",
    "description": "Marinated chicken strips sizzling with tri-color bell peppers and red onions. Served with 3 warm tortillas, sour cream and salsa.",
    "prepTime": "18 mins",
    "available": true
  },
  {
    "id": "dish-141",
    "restaurantId": "rest-9",
    "name": "Spicy Black Bean & Avocado Burrito",
    "category": "Burritos & Bowls",
    "price": 279,
    "discountPrice": 239,
    "rating": 4.7,
    "reviewsCount": 310,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80",
    "description": "Slow simmered Cuban style black beans, Hass avocado, Monterey jack cheese, Mexican rice and habanero salsa in toasted tortilla.",
    "prepTime": "14 mins",
    "available": true
  },
  {
    "id": "dish-142",
    "restaurantId": "rest-9",
    "name": "Cinnamon Sugar Churros with Dulce de Leche (4 pcs)",
    "category": "Sweets & Sips",
    "price": 199,
    "discountPrice": 169,
    "rating": 4.9,
    "reviewsCount": 850,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=600&q=80",
    "description": "Traditional extruded Mexican dough fried until golden crisp, rolled in fragrant cinnamon sugar and served with warm dulce de leche caramel dip.",
    "prepTime": "10 mins",
    "available": true
  },
  {
    "id": "dish-143",
    "restaurantId": "rest-9",
    "name": "Tres Leches Moist Vanilla Cake",
    "category": "Sweets & Sips",
    "price": 219,
    "discountPrice": 179,
    "rating": 4.8,
    "reviewsCount": 420,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80",
    "description": "Traditional sponge cake soaked in three milks: evaporated milk, condensed milk and heavy cream, topped with whipped cream and cinnamon.",
    "prepTime": "5 mins",
    "available": true
  },
  {
    "id": "dish-144",
    "restaurantId": "rest-9",
    "name": "Authentic Mexican Horchata Drink",
    "category": "Sweets & Sips",
    "price": 139,
    "discountPrice": 109,
    "rating": 4.8,
    "reviewsCount": 380,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=600&q=80",
    "description": "Creamy traditional beverage made from soaked rice, almonds, Mexican cinnamon and sweet milk served over crushed ice.",
    "prepTime": "5 mins",
    "available": true
  },
  {
    "id": "dish-145",
    "restaurantId": "rest-9",
    "name": "Mango Jalapeno Agua Fresca",
    "category": "Sweets & Sips",
    "price": 129,
    "discountPrice": 99,
    "rating": 4.7,
    "reviewsCount": 260,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80",
    "description": "Ice-cold refreshing fresh mango juice shaken with sliced jalapeño pepper, lime juice, mint and sea salt.",
    "prepTime": "5 mins",
    "available": true
  },
  {
    "id": "dish-146",
    "restaurantId": "rest-10",
    "name": "Bangalore Benne Butter Dosa",
    "category": "Ghee & Butter Dosas",
    "price": 169,
    "discountPrice": 139,
    "rating": 4.9,
    "reviewsCount": 1180,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=80",
    "description": "Thick, golden, porous and incredibly crisp outside, soft inside dosa cooked with generous white butter (benne). Served with coconut chutney and aloo palya.",
    "prepTime": "12 mins",
    "available": true
  },
  {
    "id": "dish-147",
    "restaurantId": "rest-10",
    "name": "Davangere Open Benne Masala Dosa",
    "category": "Ghee & Butter Dosas",
    "price": 189,
    "discountPrice": 159,
    "rating": 4.9,
    "reviewsCount": 890,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=80",
    "description": "Authentic Karnataka style dosa topped with aromatic dry chutney powder, sweet potato palya and melting lump of homemade white butter.",
    "prepTime": "12 mins",
    "available": true
  },
  {
    "id": "dish-148",
    "restaurantId": "rest-10",
    "name": "Ghee Podi Onion Crisp Dosa",
    "category": "Ghee & Butter Dosas",
    "price": 179,
    "discountPrice": 149,
    "rating": 4.8,
    "reviewsCount": 640,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=80",
    "description": "Thin crispy dosa roasted in pure desi ghee, smothered with freshly chopped shallots and aromatic spicy roasted lentil podi.",
    "prepTime": "10 mins",
    "available": true
  },
  {
    "id": "dish-149",
    "restaurantId": "rest-10",
    "name": "Paneer Bhurji Stuffed Dosa",
    "category": "Ghee & Butter Dosas",
    "price": 219,
    "discountPrice": 189,
    "rating": 4.8,
    "reviewsCount": 470,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=80",
    "description": "Crisp paper roast dosa filled with spicy scrambled cottage cheese tossed with onions, tomatoes and green chillies.",
    "prepTime": "14 mins",
    "available": true
  },
  {
    "id": "dish-150",
    "restaurantId": "rest-10",
    "name": "Cheese Chili Garlic Crisp Dosa",
    "category": "Ghee & Butter Dosas",
    "price": 209,
    "discountPrice": 179,
    "rating": 4.7,
    "reviewsCount": 390,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=80",
    "description": "Fusion favorite: crisp golden crepe brushed with spicy roasted garlic paste, covered in shredded mozzarella and chopped green chilies.",
    "prepTime": "12 mins",
    "available": true
  },
  {
    "id": "dish-151",
    "restaurantId": "rest-10",
    "name": "Legendary Bidadi Thatte Idli with Red Chutney",
    "category": "Tiffin & Vadas",
    "price": 129,
    "discountPrice": 99,
    "rating": 4.9,
    "reviewsCount": 1320,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80",
    "description": "Plate-sized ultra-fluffy steamed rice cake served hot with spicy coconut red chutney, fragrant podi and a dollop of pure ghee.",
    "prepTime": "8 mins",
    "available": true
  },
  {
    "id": "dish-152",
    "restaurantId": "rest-10",
    "name": "Crispy Onion Medu Vada (2 pcs)",
    "category": "Tiffin & Vadas",
    "price": 119,
    "discountPrice": 99,
    "rating": 4.8,
    "reviewsCount": 780,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80",
    "description": "Crunchy lentil donuts made with crushed black pepper, fresh ginger and curry leaves. Served with piping hot sambar.",
    "prepTime": "10 mins",
    "available": true
  },
  {
    "id": "dish-153",
    "restaurantId": "rest-10",
    "name": "Ghee Guntaponganalu / Paniyaram (8 pcs)",
    "category": "Tiffin & Vadas",
    "price": 139,
    "discountPrice": 119,
    "rating": 4.8,
    "reviewsCount": 420,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80",
    "description": "Round fermented batter spheres roasted golden in cast iron mould with shallots and mustard seeds, served with tomato chutney.",
    "prepTime": "12 mins",
    "available": true
  },
  {
    "id": "dish-154",
    "restaurantId": "rest-10",
    "name": "Ghee Rava Pongal with Roasted Cashews",
    "category": "Tiffin & Vadas",
    "price": 149,
    "discountPrice": 129,
    "rating": 4.8,
    "reviewsCount": 510,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80",
    "description": "Savory roasted semolina and moong dal porridge tempered with whole black pepper, cumin seeds, ginger, curry leaves and ghee-roasted cashews.",
    "prepTime": "10 mins",
    "available": true
  },
  {
    "id": "dish-155",
    "restaurantId": "rest-10",
    "name": "Fragrant Coconut Milk Pulao with Vegetable Kurma",
    "category": "Traditional Meals",
    "price": 229,
    "discountPrice": 199,
    "rating": 4.8,
    "reviewsCount": 610,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80",
    "description": "Seeraga Samba rice cooked in freshly pressed thick coconut milk with whole spices, served with rich South Indian mixed vegetable kurma.",
    "prepTime": "15 mins",
    "available": true
  },
  {
    "id": "dish-156",
    "restaurantId": "rest-10",
    "name": "Tamarind Puliyogare Temple Rice",
    "category": "Traditional Meals",
    "price": 159,
    "discountPrice": 139,
    "rating": 4.8,
    "reviewsCount": 440,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?auto=format&fit=crop&w=600&q=80",
    "description": "Tangy and spicy tamarind rice tempered with roasted peanuts, red chillies, mustard, asafoetida and sesame oil in traditional temple style.",
    "prepTime": "10 mins",
    "available": true
  },
  {
    "id": "dish-157",
    "restaurantId": "rest-10",
    "name": "Authentic Tomato Rasam Rice with Ghee & Papad",
    "category": "Traditional Meals",
    "price": 149,
    "discountPrice": 129,
    "rating": 4.7,
    "reviewsCount": 380,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80",
    "description": "Piping hot aromatic garlic tomato pepper rasam poured over hot steamed rice with a dollop of pure ghee and roasted appalam.",
    "prepTime": "10 mins",
    "available": true
  },
  {
    "id": "dish-158",
    "restaurantId": "rest-10",
    "name": "South Coast Signature Tiffin Platter",
    "category": "Traditional Meals",
    "price": 269,
    "discountPrice": 229,
    "rating": 4.9,
    "reviewsCount": 780,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
    "description": "Grand breakfast spread: 1 Mini Masala Dosa, 1 Thatte Idli, 1 Crispy Vada, Kesari Bath, Sambar, 3 fresh chutneys and Filter Coffee.",
    "prepTime": "15 mins",
    "available": true
  },
  {
    "id": "dish-159",
    "restaurantId": "rest-10",
    "name": "Warm Moong Dal Halwa with Cashews",
    "category": "Sweets & Filter Kaapi",
    "price": 139,
    "discountPrice": 119,
    "rating": 4.8,
    "reviewsCount": 420,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1571867424488-4565932edb41?auto=format&fit=crop&w=600&q=80",
    "description": "Rich golden halwa slow cooked from split yellow moong lentils, caramelized milk, pure ghee and crunchy roasted cashews.",
    "prepTime": "5 mins",
    "available": true
  },
  {
    "id": "dish-160",
    "restaurantId": "rest-10",
    "name": "Madras Degree Filter Coffee (Hot)",
    "category": "Sweets & Filter Kaapi",
    "price": 79,
    "discountPrice": 59,
    "rating": 4.9,
    "reviewsCount": 1650,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
    "description": "Authentic, dark, thick decoction poured with steaming boiled full cream cow milk in traditional brass davarah-tumbler with creamy froth.",
    "prepTime": "5 mins",
    "available": true
  },
  {
    "id": "dish-161",
    "restaurantId": "rest-10",
    "name": "Chilled Rose Badam Milk",
    "category": "Sweets & Filter Kaapi",
    "price": 99,
    "discountPrice": 79,
    "rating": 4.8,
    "reviewsCount": 380,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80",
    "description": "Chilled thickened milk flavored with Damascus rose syrup, slivered almonds and soaked sabja basil seeds.",
    "prepTime": "5 mins",
    "available": true
  },
  {
    "id": "dish-162",
    "restaurantId": "rest-11",
    "name": "Amritsari Aloo Pyaaz Chur Chur Kulcha with Chole",
    "category": "Amritsari Kulchas",
    "price": 229,
    "discountPrice": 189,
    "rating": 4.9,
    "reviewsCount": 1120,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=600&q=80",
    "description": "Flaky, multi-layered tandoori kulcha crushed by hand with generous white butter, served with spicy Pindi chole, tangy imli onion chutney and boondi raita.",
    "prepTime": "15 mins",
    "available": true
  },
  {
    "id": "dish-163",
    "restaurantId": "rest-11",
    "name": "Paneer Stuffed Tandoori Kulcha Thali",
    "category": "Amritsari Kulchas",
    "price": 269,
    "discountPrice": 229,
    "rating": 4.9,
    "reviewsCount": 850,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=600&q=80",
    "description": "Crisp tandoori bread loaded with spiced crumbled paneer and fresh coriander, served with rich dal makhani, chole and pickle.",
    "prepTime": "18 mins",
    "available": true
  },
  {
    "id": "dish-164",
    "restaurantId": "rest-11",
    "name": "Legendary Chole Bhature (2 pcs)",
    "category": "Amritsari Kulchas",
    "price": 199,
    "discountPrice": 169,
    "rating": 4.9,
    "reviewsCount": 2450,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=600&q=80",
    "description": "Giant puffed golden bhaturas served with slow-cooked dark spicy Punjabi chole, fried green chili, pickled amla and onions.",
    "prepTime": "12 mins",
    "available": true
  },
  {
    "id": "dish-165",
    "restaurantId": "rest-11",
    "name": "Highway Dhaba Dal Makhani",
    "category": "Dhaba Curries",
    "price": 259,
    "discountPrice": 219,
    "rating": 4.8,
    "reviewsCount": 940,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80",
    "description": "Slow-simmered black urad lentils infused with whole garlic cloves, tomatoes, green chillies and finished with fresh homemade white makhan.",
    "prepTime": "15 mins",
    "available": true
  },
  {
    "id": "dish-166",
    "restaurantId": "rest-11",
    "name": "Dhaba Style Kadhai Paneer",
    "category": "Dhaba Curries",
    "price": 289,
    "discountPrice": 249,
    "rating": 4.8,
    "reviewsCount": 670,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80",
    "description": "Fresh cottage cheese, chunky bell peppers and onions tossed in freshly roasted pounded coriander, dry red chillies and tomato gravy.",
    "prepTime": "18 mins",
    "available": true
  },
  {
    "id": "dish-167",
    "restaurantId": "rest-11",
    "name": "Sarson Da Saag with Makki Di Roti (2 pcs)",
    "category": "Dhaba Curries",
    "price": 279,
    "discountPrice": 239,
    "rating": 4.9,
    "reviewsCount": 810,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=600&q=80",
    "description": "Traditional winter greens stew slow-cooked with bathua, spinach, mustard leaves, served with 2 hot cornmeal flatbreads, white butter and jaggery.",
    "prepTime": "18 mins",
    "available": true
  },
  {
    "id": "dish-168",
    "restaurantId": "rest-11",
    "name": "Punjabi Kadi Pakoda with Steamed Rice",
    "category": "Dhaba Curries",
    "price": 219,
    "discountPrice": 189,
    "rating": 4.7,
    "reviewsCount": 520,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80",
    "description": "Tangy spiced yogurt and gram flour gravy simmered with soft onion fritters, tempered with fenugreek seeds and dry red chillies over basmati rice.",
    "prepTime": "15 mins",
    "available": true
  },
  {
    "id": "dish-169",
    "restaurantId": "rest-11",
    "name": "Rajma Masala with Desi Ghee Jeera Rice",
    "category": "Dhaba Curries",
    "price": 229,
    "discountPrice": 199,
    "rating": 4.9,
    "reviewsCount": 1340,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1545247181-516773cae754?auto=format&fit=crop&w=600&q=80",
    "description": "Melt-in-mouth Jammu red kidney beans cooked in aromatic onion-tomato gravy with roasted cumin seeds, served with hot jeera rice.",
    "prepTime": "12 mins",
    "available": true
  },
  {
    "id": "dish-170",
    "restaurantId": "rest-11",
    "name": "Butter Garlic Tandoori Naan",
    "category": "Breads & Rice",
    "price": 65,
    "discountPrice": 55,
    "rating": 4.8,
    "reviewsCount": 780,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=600&q=80",
    "description": "Soft tandoori naan brushed with chopped garlic, fresh cilantro and melting butter.",
    "prepTime": "8 mins",
    "available": true
  },
  {
    "id": "dish-171",
    "restaurantId": "rest-11",
    "name": "Tandoori Butter Laccha Paratha",
    "category": "Breads & Rice",
    "price": 55,
    "discountPrice": 45,
    "rating": 4.8,
    "reviewsCount": 540,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=600&q=80",
    "description": "Crispy spiraled whole wheat bread cooked in tandoor with multiple buttery flaky rings.",
    "prepTime": "8 mins",
    "available": true
  },
  {
    "id": "dish-172",
    "restaurantId": "rest-11",
    "name": "Patiala Sweet Lassi in Kulhad (400ml)",
    "category": "Sweets & Lassi",
    "price": 119,
    "discountPrice": 99,
    "rating": 4.9,
    "reviewsCount": 1620,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80",
    "description": "Ultra thick hand-churned yogurt drink served in earthen clay kulhad with heavy dollop of malai cream, rose syrup and crushed pistachios.",
    "prepTime": "5 mins",
    "available": true
  },
  {
    "id": "dish-173",
    "restaurantId": "rest-11",
    "name": "Kesar Pista Badam Lassi (400ml)",
    "category": "Sweets & Lassi",
    "price": 139,
    "discountPrice": 119,
    "rating": 4.8,
    "reviewsCount": 890,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80",
    "description": "Pure saffron infused thick sweet lassi blended with roasted almonds, cardamom and topped with thick fresh malai.",
    "prepTime": "5 mins",
    "available": true
  },
  {
    "id": "dish-174",
    "restaurantId": "rest-11",
    "name": "Warm Desi Ghee Gulab Jamun (2 pcs)",
    "category": "Sweets & Lassi",
    "price": 89,
    "discountPrice": 69,
    "rating": 4.8,
    "reviewsCount": 780,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80",
    "description": "Soft khoya milk dough balls fried in desi ghee, steeped in cardamom-scented warm sugar syrup with pistachio garnish.",
    "prepTime": "5 mins",
    "available": true
  },
  {
    "id": "dish-175",
    "restaurantId": "rest-11",
    "name": "Dhaba Royal Thali Platter",
    "category": "Amritsari Kulchas",
    "price": 319,
    "discountPrice": 279,
    "rating": 4.9,
    "reviewsCount": 940,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=600&q=80",
    "description": "Grand meal: Dal Makhani, Paneer Butter Masala, Pindi Chole, Jeera Rice, 2 Butter Naans, Raita, Salad, Pickle and Gulab Jamun.",
    "prepTime": "18 mins",
    "available": true
  },
  {
    "id": "dish-176",
    "restaurantId": "rest-12",
    "name": "Chowpatty Special Butter Pav Bhaji",
    "category": "Pav Bhaji & Vada Pav",
    "price": 189,
    "discountPrice": 159,
    "rating": 4.9,
    "reviewsCount": 2890,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=600&q=80",
    "description": "Spicy mashed mixed vegetables simmered with special Bombay pav bhaji masala, topped with a giant block of melting Amul butter, served with 2 buttery toasted pavs.",
    "prepTime": "12 mins",
    "available": true
  },
  {
    "id": "dish-177",
    "restaurantId": "rest-12",
    "name": "Cheese Burst Loaded Pav Bhaji",
    "category": "Pav Bhaji & Vada Pav",
    "price": 229,
    "discountPrice": 189,
    "rating": 4.9,
    "reviewsCount": 1640,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=600&q=80",
    "description": "Signature buttery bhaji covered with thick layer of melted Amul processed cheese and mozzarella, served with 2 grilled cheese pavs.",
    "prepTime": "14 mins",
    "available": true
  },
  {
    "id": "dish-178",
    "restaurantId": "rest-12",
    "name": "Authentic Bombay Vada Pav (2 pcs)",
    "category": "Pav Bhaji & Vada Pav",
    "price": 99,
    "discountPrice": 79,
    "rating": 4.9,
    "reviewsCount": 3410,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=600&q=80",
    "description": "Crispy golden fried spiced potato batata vada sandwiched in soft pav smeared with spicy garlic peanut chutney, mint dip and fried green chili.",
    "prepTime": "8 mins",
    "available": true
  },
  {
    "id": "dish-179",
    "restaurantId": "rest-12",
    "name": "Classic Bombay Sev Puri (6 pcs)",
    "category": "Crispy Chaat Specialties",
    "price": 119,
    "discountPrice": 99,
    "rating": 4.8,
    "reviewsCount": 1420,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80",
    "description": "Crispy flat puris topped with diced potatoes, onions, trio of spicy-sweet chutneys and completely smothered under mountain of fine crispy nylon sev.",
    "prepTime": "8 mins",
    "available": true
  },
  {
    "id": "dish-180",
    "restaurantId": "rest-12",
    "name": "Delhi Style Golgappe / Pani Puri (8 pcs)",
    "category": "Crispy Chaat Specialties",
    "price": 99,
    "discountPrice": 79,
    "rating": 4.9,
    "reviewsCount": 2780,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1781243680771-1fea4521e196?auto=format&fit=crop&w=600&q=80",
    "description": "Eight hollow crispy semolina puris served with spicy mint-coriander water, sweet tamarind sonth water, ragda and spiced potato stuffing.",
    "prepTime": "5 mins",
    "available": true
  },
  {
    "id": "dish-181",
    "restaurantId": "rest-12",
    "name": "Creamy Dahi Batata Puri (6 pcs)",
    "category": "Crispy Chaat Specialties",
    "price": 129,
    "discountPrice": 109,
    "rating": 4.8,
    "reviewsCount": 1180,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1781243680771-1fea4521e196?auto=format&fit=crop&w=600&q=80",
    "description": "Crisp puffed puris filled with potatoes and sprouts, drenched in chilled sweet curd, date tamarind chutney and sprinkled with chaat masala.",
    "prepTime": "8 mins",
    "available": true
  },
  {
    "id": "dish-182",
    "restaurantId": "rest-12",
    "name": "Royal Shahi Raj Kachori",
    "category": "Crispy Chaat Specialties",
    "price": 169,
    "discountPrice": 139,
    "rating": 4.9,
    "reviewsCount": 980,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80",
    "description": "Crispy king-sized hollow sphere stuffed with lentil dumplings, boiled potatoes, chickpeas, whipped sweet yogurt, chutneys, pomegranate and sev.",
    "prepTime": "10 mins",
    "available": true
  },
  {
    "id": "dish-183",
    "restaurantId": "rest-12",
    "name": "Delhi Style Crunchy Samosa Chaat",
    "category": "Hot Street Snacks",
    "price": 139,
    "discountPrice": 119,
    "rating": 4.8,
    "reviewsCount": 1250,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80",
    "description": "Two crushed hot crispy samosas topped with spicy Amritsari chole gravy, whipped curd, tangy mint chutney, sweet sonth and coriander.",
    "prepTime": "8 mins",
    "available": true
  },
  {
    "id": "dish-184",
    "restaurantId": "rest-12",
    "name": "Crispy Tawa Aloo Tikki Chaat",
    "category": "Hot Street Snacks",
    "price": 129,
    "discountPrice": 109,
    "rating": 4.7,
    "reviewsCount": 890,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80",
    "description": "Golden griddled spiced potato patties bathed in warm ragda, seasoned curd, tamarind chutney, ginger slivers and fresh cilantro.",
    "prepTime": "10 mins",
    "available": true
  },
  {
    "id": "dish-185",
    "restaurantId": "rest-12",
    "name": "Irani Chai with Bun Maska",
    "category": "Street Shakes & Tea",
    "price": 99,
    "discountPrice": 79,
    "rating": 4.8,
    "reviewsCount": 1640,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80",
    "description": "Creamy reduced milk dum brewed Irani chai served with soft sweet bun stuffed with dollop of salted Amul butter and tutti frutti.",
    "prepTime": "5 mins",
    "available": true
  },
  {
    "id": "dish-186",
    "restaurantId": "rest-12",
    "name": "Pune Special Mango Mastani Shake",
    "category": "Street Shakes & Tea",
    "price": 169,
    "discountPrice": 139,
    "rating": 4.9,
    "reviewsCount": 1120,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80",
    "description": "Thick Alphonso mango shake topped with a large scoop of mango ice cream, diced mango fruit, tutti-frutti, roasted dry fruits and cherry.",
    "prepTime": "6 mins",
    "available": true
  },
  {
    "id": "dish-187",
    "restaurantId": "rest-12",
    "name": "Royal Kulfi Rabri Falooda",
    "category": "Street Shakes & Tea",
    "price": 159,
    "discountPrice": 129,
    "rating": 4.8,
    "reviewsCount": 890,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80",
    "description": "Sliced malai kulfi layered with vermicelli falooda noodles, chilled sweetened rose milk, sabja seeds and thick pistachio rabri.",
    "prepTime": "6 mins",
    "available": true
  },
  {
    "id": "dish-188",
    "restaurantId": "rest-13",
    "name": "Signature Jumbo Chicken Shawarma Roll",
    "category": "Rotisserie Shawarmas",
    "price": 199,
    "discountPrice": 169,
    "rating": 4.9,
    "reviewsCount": 1940,
    "isVeg": false,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=600&q=80",
    "description": "Slow vertical-spit roasted spiced chicken shavings, crispy pickled cucumbers, French fries and luscious garlic toum aioli wrapped in rumali bread.",
    "prepTime": "10 mins",
    "available": true
  },
  {
    "id": "dish-189",
    "restaurantId": "rest-13",
    "name": "Open-Face Arabian Shawarma Platter",
    "category": "Rotisserie Shawarmas",
    "price": 279,
    "discountPrice": 239,
    "rating": 4.8,
    "reviewsCount": 810,
    "isVeg": false,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=600&q=80",
    "description": "Generous portion of carved chicken shawarma, 2 warm kuboos pita breads, garlic toum dip, spicy harissa, pickled turnips and hot salted fries.",
    "prepTime": "12 mins",
    "available": true
  },
  {
    "id": "dish-190",
    "restaurantId": "rest-13",
    "name": "Crispy Falafel & Tahini Pita Pocket",
    "category": "Rotisserie Shawarmas",
    "price": 169,
    "discountPrice": 139,
    "rating": 4.8,
    "reviewsCount": 650,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=600&q=80",
    "description": "Golden fried parsley chickpea falafels stuffed inside warm pocket pita with shredded lettuce, tomatoes, tahini and pickled gherkins.",
    "prepTime": "10 mins",
    "available": true
  },
  {
    "id": "dish-191",
    "restaurantId": "rest-13",
    "name": "Charbroiled Mutton Seekh Kebabs (4 pcs)",
    "category": "Arabian Charcoal Grills",
    "price": 349,
    "discountPrice": 299,
    "rating": 4.9,
    "reviewsCount": 870,
    "isVeg": false,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80",
    "description": "Skewered minced mutton infused with sumac, fresh mint, Arabic baharat spices and garlic, grilled over smoldering coals.",
    "prepTime": "18 mins",
    "available": true
  },
  {
    "id": "dish-192",
    "restaurantId": "rest-13",
    "name": "Shish Taouk Lemon Garlic Skewers (6 pcs)",
    "category": "Arabian Charcoal Grills",
    "price": 319,
    "discountPrice": 279,
    "rating": 4.8,
    "reviewsCount": 620,
    "isVeg": false,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80",
    "description": "Succulent chicken cubes marinated in Greek yogurt, lemon juice, garlic paste and tomato paste, chargrilled with bell peppers.",
    "prepTime": "16 mins",
    "available": true
  },
  {
    "id": "dish-193",
    "restaurantId": "rest-13",
    "name": "Authentic Chicken Mandi Rice Feast",
    "category": "Arabian Charcoal Grills",
    "price": 399,
    "discountPrice": 349,
    "rating": 4.9,
    "reviewsCount": 1240,
    "isVeg": false,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80",
    "description": "Tender charcoal-roasted chicken leg quarter served over long grain spiced Mandi rice with spicy tomato dakous sauce and fried almonds.",
    "prepTime": "20 mins",
    "available": true
  },
  {
    "id": "dish-194",
    "restaurantId": "rest-13",
    "name": "Sultan's Royal Mezze Platter",
    "category": "Mezze & Sides",
    "price": 349,
    "discountPrice": 299,
    "rating": 4.9,
    "reviewsCount": 540,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
    "description": "Creamy Hummus, Smoky Baba Ganoush, Tabbouleh salad, 4 pieces falafel, mixed pickles, olives and 3 hot pita breads.",
    "prepTime": "12 mins",
    "available": true
  },
  {
    "id": "dish-195",
    "restaurantId": "rest-13",
    "name": "Extra Creamy Olive Oil Hummus with Pita",
    "category": "Mezze & Sides",
    "price": 199,
    "discountPrice": 169,
    "rating": 4.8,
    "reviewsCount": 680,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1637949385162-e416fb15b2ce?auto=format&fit=crop&w=600&q=80",
    "description": "Velvety smooth chickpea tahini puree drizzled with extra virgin Spanish olive oil, paprika and whole chickpeas with 2 pitas.",
    "prepTime": "8 mins",
    "available": true
  },
  {
    "id": "dish-196",
    "restaurantId": "rest-13",
    "name": "Authentic Turkish Pistachio Kunafa",
    "category": "Middle Eastern Sweets",
    "price": 279,
    "discountPrice": 239,
    "rating": 4.9,
    "reviewsCount": 1450,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1741424605439-9b3b0f54d755?auto=format&fit=crop&w=600&q=80",
    "description": "Warm shredded kataifi pastry baked with molten Akawi cheese, soaked in orange blossom sugar syrup and crowned with crushed Iranian pistachios.",
    "prepTime": "15 mins",
    "available": true
  },
  {
    "id": "dish-197",
    "restaurantId": "rest-13",
    "name": "Assorted Royal Baklava Gift Box (6 pcs)",
    "category": "Middle Eastern Sweets",
    "price": 299,
    "discountPrice": 259,
    "rating": 4.9,
    "reviewsCount": 680,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1676014959543-81df1079b423?auto=format&fit=crop&w=600&q=80",
    "description": "Layered crisp phyllo pastry filled with chopped walnuts and pistachios, sweetened with pure honey syrup.",
    "prepTime": "5 mins",
    "available": true
  },
  {
    "id": "dish-198",
    "restaurantId": "rest-14",
    "name": "Surmai Kingfish Rava Fry",
    "category": "Coastal Seafood Starters",
    "price": 389,
    "discountPrice": 339,
    "rating": 4.9,
    "reviewsCount": 980,
    "isVeg": false,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1535400255456-984241443b29?auto=format&fit=crop&w=600&q=80",
    "description": "Fresh catch seer fish steak marinated in fiery Goan recheado red masala, coated in crunchy semolina and shallow fried in coconut oil.",
    "prepTime": "15 mins",
    "available": true
  },
  {
    "id": "dish-199",
    "restaurantId": "rest-14",
    "name": "Butter Garlic Jumbo Tiger Prawns (6 pcs)",
    "category": "Coastal Seafood Starters",
    "price": 449,
    "discountPrice": 399,
    "rating": 4.9,
    "reviewsCount": 780,
    "isVeg": false,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1535400255456-984241443b29?auto=format&fit=crop&w=600&q=80",
    "description": "Succulent ocean tiger prawns pan-tossed in melted butter, roasted garlic flakes, cracked white pepper, lime and fresh parsley.",
    "prepTime": "14 mins",
    "available": true
  },
  {
    "id": "dish-200",
    "restaurantId": "rest-14",
    "name": "Fiery Goan Prawn Curry with Steamed Rice",
    "category": "Coastal Curries",
    "price": 399,
    "discountPrice": 349,
    "rating": 4.9,
    "reviewsCount": 1120,
    "isVeg": false,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1535400255456-984241443b29?auto=format&fit=crop&w=600&q=80",
    "description": "Tiger prawns simmered in authentic Goan coconut milk gravy spiced with Kashmiri chilies, coriander seeds, cumin and tart kokum.",
    "prepTime": "18 mins",
    "available": true
  },
  {
    "id": "dish-201",
    "restaurantId": "rest-14",
    "name": "Mangalorean Anjal Fish Curry",
    "category": "Coastal Curries",
    "price": 429,
    "discountPrice": 379,
    "rating": 4.8,
    "reviewsCount": 640,
    "isVeg": false,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1535400255456-984241443b29?auto=format&fit=crop&w=600&q=80",
    "description": "Seer fish steeped in roasted Byadgi chili coconut paste, tamarind pulp and tempered with curry leaves.",
    "prepTime": "18 mins",
    "available": true
  },
  {
    "id": "dish-202",
    "restaurantId": "rest-14",
    "name": "Soft Neer Dosa with Fish Curry (4 pcs)",
    "category": "Coastal Breads",
    "price": 249,
    "discountPrice": 219,
    "rating": 4.8,
    "reviewsCount": 510,
    "isVeg": false,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=80",
    "description": "Delicate, lace-thin steamed rice crepes served with choice of spicy coconut fish gravy and coconut chutney.",
    "prepTime": "12 mins",
    "available": true
  },
  {
    "id": "dish-203",
    "restaurantId": "rest-14",
    "name": "Authentic Sol Kadi Refreshing Drink",
    "category": "Coastal Breads",
    "price": 79,
    "discountPrice": 59,
    "rating": 4.9,
    "reviewsCount": 940,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80",
    "description": "Digestive chilled pink drink made with freshly extracted coconut milk, kokum infusion, green chillies, garlic and coriander.",
    "prepTime": "5 mins",
    "available": true
  },
  {
    "id": "dish-204",
    "restaurantId": "rest-15",
    "name": "Sizzling Cottage Cheese Steak with Peppercorn Sauce",
    "category": "Signature Sizzlers",
    "price": 399,
    "discountPrice": 349,
    "rating": 4.8,
    "reviewsCount": 610,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80",
    "description": "Cast-iron platter with grilled paneer steak over herb rice, french fries, butter-glazed veggies and smoking cracked black pepper sauce.",
    "prepTime": "20 mins",
    "available": true
  },
  {
    "id": "dish-205",
    "restaurantId": "rest-15",
    "name": "Charbroiled Chicken Breast Sizzler",
    "category": "Signature Sizzlers",
    "price": 449,
    "discountPrice": 399,
    "rating": 4.9,
    "reviewsCount": 890,
    "isVeg": false,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80",
    "description": "Tender grilled whole chicken breast resting on bed of butter noodles, cheesy mashed potatoes, grilled tomato and sizzling mushroom demi-glace.",
    "prepTime": "22 mins",
    "available": true
  },
  {
    "id": "dish-206",
    "restaurantId": "rest-15",
    "name": "Hickory Smoked BBQ Chicken Ribs",
    "category": "Smoked BBQ Mains",
    "price": 489,
    "discountPrice": 429,
    "rating": 4.8,
    "reviewsCount": 540,
    "isVeg": false,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80",
    "description": "Slow-smoked in applewood for 6 hours, slathered in sticky sweet bourbon BBQ glaze, served with coleslaw and french fries.",
    "prepTime": "20 mins",
    "available": true
  },
  {
    "id": "dish-207",
    "restaurantId": "rest-15",
    "name": "Creamy Garlic Truffle Mashed Potatoes",
    "category": "Smoked BBQ Mains",
    "price": 189,
    "discountPrice": 159,
    "rating": 4.8,
    "reviewsCount": 420,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80",
    "description": "Whipped Yukon gold potatoes blended with sweet butter, roasted garlic, heavy cream and white truffle drizzle.",
    "prepTime": "10 mins",
    "available": true
  },
  {
    "id": "dish-208",
    "restaurantId": "rest-15",
    "name": "Sizzling Brownie with Vanilla Ice Cream",
    "category": "Smoked BBQ Mains",
    "price": 229,
    "discountPrice": 189,
    "rating": 4.9,
    "reviewsCount": 1450,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80",
    "description": "Warm walnut fudge brownie served on a smoking hot iron skillet with vanilla ice cream and sizzling molten chocolate sauce poured tableside.",
    "prepTime": "10 mins",
    "available": true
  },
  {
    "id": "dish-209",
    "restaurantId": "rest-16",
    "name": "Legendary Death By Chocolate (DBC) Sundae",
    "category": "Artisan Sundaes",
    "price": 249,
    "discountPrice": 209,
    "rating": 4.9,
    "reviewsCount": 3890,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80",
    "description": "Two scoops of dark Dutch chocolate ice cream over warm chocolate brownie cake, hot molten fudge sauce, roasted cashew nuts and Maraschino cherries.",
    "prepTime": "5 mins",
    "available": true
  },
  {
    "id": "dish-210",
    "restaurantId": "rest-16",
    "name": "Royal Kesar Pista Matka Kulfi",
    "category": "Artisan Sundaes",
    "price": 149,
    "discountPrice": 129,
    "rating": 4.9,
    "reviewsCount": 1420,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80",
    "description": "Traditional slow-boiled reduced milk frozen in earthen pot with Kashmiri saffron, crushed green cardamom and crunchy pistachios.",
    "prepTime": "5 mins",
    "available": true
  },
  {
    "id": "dish-211",
    "restaurantId": "rest-16",
    "name": "Belgian Chocolate Fudge Waffle Sundae",
    "category": "Artisan Sundaes",
    "price": 269,
    "discountPrice": 229,
    "rating": 4.8,
    "reviewsCount": 980,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=600&q=80",
    "description": "Crisp warm waffle cone bowl filled with chocolate chip ice cream, hot chocolate sauce, crushed Oreos and whipped cream.",
    "prepTime": "8 mins",
    "available": true
  },
  {
    "id": "dish-212",
    "restaurantId": "rest-16",
    "name": "Salted Butter Caramel Crunch Tub (500ml)",
    "category": "Artisan Sundaes",
    "price": 299,
    "discountPrice": 249,
    "rating": 4.9,
    "reviewsCount": 1120,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80",
    "description": "Slow-churned sweet cream ice cream swirled with golden Brittany sea salt caramel ribbons and roasted almond brittle praline.",
    "prepTime": "5 mins",
    "available": true
  },
  {
    "id": "dish-213",
    "restaurantId": "rest-17",
    "name": "Full English Breakfast Platter",
    "category": "All-Day Brunch",
    "price": 389,
    "discountPrice": 339,
    "rating": 4.9,
    "reviewsCount": 890,
    "isVeg": false,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
    "description": "Two sunny-side up eggs, grilled chicken sausages, smoked bacon rashers, baked beans, sautéed button mushrooms, grilled tomato and buttered sourdough toast.",
    "prepTime": "15 mins",
    "available": true
  },
  {
    "id": "dish-214",
    "restaurantId": "rest-17",
    "name": "Brioche Eggs Benedict with Hollandaise",
    "category": "All-Day Brunch",
    "price": 329,
    "discountPrice": 289,
    "rating": 4.8,
    "reviewsCount": 670,
    "isVeg": false,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80",
    "description": "Two poached organic eggs on toasted brioche rounds with honey-glazed ham, covered in velvety warm lemon butter Hollandaise sauce.",
    "prepTime": "15 mins",
    "available": true
  },
  {
    "id": "dish-215",
    "restaurantId": "rest-17",
    "name": "Sourdough Smashed Avocado Toast with Feta",
    "category": "All-Day Brunch",
    "price": 279,
    "discountPrice": 239,
    "rating": 4.8,
    "reviewsCount": 810,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80",
    "description": "Toasted rustic sourdough topped with seasoned Hass avocado mash, crumbled Greek feta, cherry tomatoes, chili flakes and extra virgin olive oil.",
    "prepTime": "10 mins",
    "available": true
  },
  {
    "id": "dish-216",
    "restaurantId": "rest-17",
    "name": "French Nutella Banana Crêpe",
    "category": "All-Day Brunch",
    "price": 229,
    "discountPrice": 189,
    "rating": 4.8,
    "reviewsCount": 540,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=600&q=80",
    "description": "Paper thin golden French crepe folded with molten Nutella, fresh sliced bananas, toasted hazelnuts and powdered sugar.",
    "prepTime": "12 mins",
    "available": true
  },
  {
    "id": "dish-217",
    "restaurantId": "rest-18",
    "name": "16-Hour Cold Brew Coffee (350ml)",
    "category": "Artisan Coffee",
    "price": 179,
    "discountPrice": 149,
    "rating": 4.9,
    "reviewsCount": 1180,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
    "description": "Single-origin Arabica beans steeped in cold mountain spring water for 16 hours. Ultra smooth, chocolatey and zero bitterness.",
    "prepTime": "5 mins",
    "available": true
  },
  {
    "id": "dish-218",
    "restaurantId": "rest-18",
    "name": "Spanish Iced Caramel Latte (350ml)",
    "category": "Artisan Coffee",
    "price": 199,
    "discountPrice": 169,
    "rating": 4.9,
    "reviewsCount": 890,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
    "description": "Double espresso shot poured over sweetened condensed milk, whole milk and ice, drizzled with buttery caramel syrup.",
    "prepTime": "5 mins",
    "available": true
  },
  {
    "id": "dish-219",
    "restaurantId": "rest-18",
    "name": "French Pure Butter Croissant",
    "category": "Artisan Bakery",
    "price": 149,
    "discountPrice": 119,
    "rating": 4.8,
    "reviewsCount": 670,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80",
    "description": "Golden, flaky 27-layer crescent roll made with imported French butter. Light, airy honeycomb crumb.",
    "prepTime": "5 mins",
    "available": true
  },
  {
    "id": "dish-220",
    "restaurantId": "rest-18",
    "name": "Grilled Sourdough Pesto Chicken Panini",
    "category": "Artisan Bakery",
    "price": 279,
    "discountPrice": 239,
    "rating": 4.8,
    "reviewsCount": 510,
    "isVeg": false,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80",
    "description": "Tender grilled chicken, basil pesto, melted fresh mozzarella and sun-dried tomatoes pressed in artisan sourdough bread.",
    "prepTime": "12 mins",
    "available": true
  },
  {
    "id": "dish-221",
    "restaurantId": "rest-19",
    "name": "Pure Silver Vark Kaju Katli (250g)",
    "category": "Royal Mithai",
    "price": 299,
    "discountPrice": 249,
    "rating": 4.9,
    "reviewsCount": 3120,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1571867424488-4565932edb41?auto=format&fit=crop&w=600&q=80",
    "description": "Melt-in-mouth diamond fudge crafted from 100% premium Goan cashews, desi sugar and pure edible silver leaf. No fillers.",
    "prepTime": "5 mins",
    "available": true
  },
  {
    "id": "dish-222",
    "restaurantId": "rest-19",
    "name": "Desi Ghee Crisp Jalebi with Rabri (250g)",
    "category": "Royal Mithai",
    "price": 199,
    "discountPrice": 169,
    "rating": 4.9,
    "reviewsCount": 2450,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1571867424488-4565932edb41?auto=format&fit=crop&w=600&q=80",
    "description": "Spiral golden jalebis fried crisp in pure desi ghee, soaked in saffron syrup, served piping hot with bowl of thick pistachio rabri.",
    "prepTime": "10 mins",
    "available": true
  },
  {
    "id": "dish-223",
    "restaurantId": "rest-19",
    "name": "Crispy Punjabi Samosa with Chutneys (2 pcs)",
    "category": "Halwai Namkeen",
    "price": 69,
    "discountPrice": 49,
    "rating": 4.8,
    "reviewsCount": 2890,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1571867424488-4565932edb41?auto=format&fit=crop&w=600&q=80",
    "description": "Flaky golden pyramid pastries stuffed with spiced potatoes, green peas and whole coriander seeds, with saunth and mint dip.",
    "prepTime": "5 mins",
    "available": true
  },
  {
    "id": "dish-224",
    "restaurantId": "rest-19",
    "name": "Spongy Gujarati Nylon Khaman Dhokla (4 pcs)",
    "category": "Halwai Namkeen",
    "price": 89,
    "discountPrice": 69,
    "rating": 4.8,
    "reviewsCount": 1120,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1571867424488-4565932edb41?auto=format&fit=crop&w=600&q=80",
    "description": "Feather-light steamed gram flour cakes tempered with mustard seeds, green chillies, curry leaves and fresh grated coconut.",
    "prepTime": "5 mins",
    "available": true
  },
  {
    "id": "dish-225",
    "restaurantId": "rest-20",
    "name": "Steamed Juicy Himalayan Chicken Momos (8 pcs)",
    "category": "Tibetan Momos",
    "price": 199,
    "discountPrice": 169,
    "rating": 4.9,
    "reviewsCount": 2180,
    "isVeg": false,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1625398407796-82650a8c135f?auto=format&fit=crop&w=600&q=80",
    "description": "Hand-folded dumplings packed with spiced minced chicken, scallions and ginger, steamed to juicy perfection. Served with fiery red Dalle chili dip.",
    "prepTime": "15 mins",
    "available": true
  },
  {
    "id": "dish-226",
    "restaurantId": "rest-20",
    "name": "Crispy Pan-Fried Chicken Kothey Momos (8 pcs)",
    "category": "Tibetan Momos",
    "price": 229,
    "discountPrice": 189,
    "rating": 4.9,
    "reviewsCount": 1650,
    "isVeg": false,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1625398407796-82650a8c135f?auto=format&fit=crop&w=600&q=80",
    "description": "Steamed and then pan-fried until bottoms are super crunchy and golden brown, juicy inside. Served with peanut sesame chutney.",
    "prepTime": "18 mins",
    "available": true
  },
  {
    "id": "dish-227",
    "restaurantId": "rest-20",
    "name": "Himalayan Paneer & Cheese Steamed Momos (8 pcs)",
    "category": "Tibetan Momos",
    "price": 189,
    "discountPrice": 159,
    "rating": 4.8,
    "reviewsCount": 980,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1625398407796-82650a8c135f?auto=format&fit=crop&w=600&q=80",
    "description": "Stuffed with seasoned crumbled cottage cheese, cheddar, chopped cabbage and herbs. Served with Tibetan red chutney.",
    "prepTime": "15 mins",
    "available": true
  },
  {
    "id": "dish-228",
    "restaurantId": "rest-20",
    "name": "Comforting Chicken Tibetan Thukpa Noodle Soup",
    "category": "Thukpa & Soups",
    "price": 249,
    "discountPrice": 219,
    "rating": 4.8,
    "reviewsCount": 890,
    "isVeg": false,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80",
    "description": "Steaming bowl of hand-pulled noodles in fragrant ginger bone broth with shredded chicken, carrots, spinach, egg and coriander.",
    "prepTime": "15 mins",
    "available": true
  },
  {
    "id": "dish-229",
    "restaurantId": "rest-20",
    "name": "Fluffy Tibetan Tingmo Steamed Bread with Veg Stew",
    "category": "Thukpa & Soups",
    "price": 199,
    "discountPrice": 169,
    "rating": 4.7,
    "reviewsCount": 420,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80",
    "description": "Two soft flower-shaped steamed yeast buns served with warm spiced vegetable and mushroom soup.",
    "prepTime": "12 mins",
    "available": true
  },
  {
    "id": "dish-230",
    "restaurantId": "rest-14",
    "name": "Butter Garlic Mud Crab Masala",
    "category": "Coastal Seafood Starters",
    "price": 549,
    "discountPrice": 479,
    "rating": 4.9,
    "reviewsCount": 540,
    "isVeg": false,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1535400255456-984241443b29?auto=format&fit=crop&w=600&q=80",
    "description": "Whole mud crab cracked and cooked in roasted garlic butter sauce with Goan spices and fresh coriander.",
    "prepTime": "22 mins",
    "available": true
  },
  {
    "id": "dish-231",
    "restaurantId": "rest-14",
    "name": "Crispy Bombil (Bombay Duck) Fry (4 pcs)",
    "category": "Coastal Seafood Starters",
    "price": 289,
    "discountPrice": 249,
    "rating": 4.8,
    "reviewsCount": 610,
    "isVeg": false,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1535400255456-984241443b29?auto=format&fit=crop&w=600&q=80",
    "description": "Tender fresh Bombay duck fish coated with crushed semolina and rice flour, fried until ultra crispy.",
    "prepTime": "12 mins",
    "available": true
  },
  {
    "id": "dish-232",
    "restaurantId": "rest-14",
    "name": "Malabar King Prawn Dum Biryani",
    "category": "Coastal Curries",
    "price": 429,
    "discountPrice": 379,
    "rating": 4.9,
    "reviewsCount": 890,
    "isVeg": false,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80",
    "description": "Short-grain fragrant Kaima rice slow-cooked with fresh tiger prawns, fried onions, cashews and Malabar spices.",
    "prepTime": "22 mins",
    "available": true
  },
  {
    "id": "dish-233",
    "restaurantId": "rest-14",
    "name": "Traditional Goan Bebinca Cake",
    "category": "Coastal Breads",
    "price": 189,
    "discountPrice": 159,
    "rating": 4.8,
    "reviewsCount": 420,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80",
    "description": "7-layer traditional Indo-Portuguese pudding cake baked with coconut milk, egg yolks, nutmeg and pure ghee.",
    "prepTime": "5 mins",
    "available": true
  },
  {
    "id": "dish-234",
    "restaurantId": "rest-14",
    "name": "Koliwada Crispy Calamari Squid Rings",
    "category": "Coastal Seafood Starters",
    "price": 349,
    "discountPrice": 299,
    "rating": 4.8,
    "reviewsCount": 490,
    "isVeg": false,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1535400255456-984241443b29?auto=format&fit=crop&w=600&q=80",
    "description": "Squid rings tossed in spicy carom seed and red chili batter, deep-fried to crisp perfection.",
    "prepTime": "12 mins",
    "available": true
  },
  {
    "id": "dish-235",
    "restaurantId": "rest-14",
    "name": "Fluffy Kerala Appams with Vegetable Stew (2 pcs)",
    "category": "Coastal Breads",
    "price": 199,
    "discountPrice": 169,
    "rating": 4.7,
    "reviewsCount": 380,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80",
    "description": "Bowl-shaped fermented rice pancakes with soft spongy centers and lacy borders, served with mild coconut milk vegetable stew.",
    "prepTime": "12 mins",
    "available": true
  },
  {
    "id": "dish-236",
    "restaurantId": "rest-15",
    "name": "Mixed Seafood Sizzler Feast",
    "category": "Signature Sizzlers",
    "price": 549,
    "discountPrice": 489,
    "rating": 4.9,
    "reviewsCount": 490,
    "isVeg": false,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80",
    "description": "Pan-seared fish fillet, grilled tiger prawns, calamari on bed of garlic noodles, sautéed French beans and smoking lemon butter sauce.",
    "prepTime": "22 mins",
    "available": true
  },
  {
    "id": "dish-237",
    "restaurantId": "rest-15",
    "name": "Texas BBQ Pulled Chicken Platter",
    "category": "Smoked BBQ Mains",
    "price": 389,
    "discountPrice": 339,
    "rating": 4.8,
    "reviewsCount": 540,
    "isVeg": false,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
    "description": "Slow-smoked pulled chicken in sweet hickory sauce, served with warm sweet cornbread, pickled cucumbers and baked beans.",
    "prepTime": "15 mins",
    "available": true
  },
  {
    "id": "dish-238",
    "restaurantId": "rest-15",
    "name": "Crispy Beer-Battered Onion Haystack",
    "category": "Smoked BBQ Mains",
    "price": 179,
    "discountPrice": 149,
    "rating": 4.7,
    "reviewsCount": 380,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1639024471287-032f66e6545b?auto=format&fit=crop&w=600&q=80",
    "description": "Thinly shaved sweet onions tossed in seasoned batter and fried into crispy golden haystack. Served with ranch dip.",
    "prepTime": "10 mins",
    "available": true
  },
  {
    "id": "dish-239",
    "restaurantId": "rest-15",
    "name": "Classic Fresh Mint Mojito",
    "category": "Smoked BBQ Mains",
    "price": 139,
    "discountPrice": 109,
    "rating": 4.8,
    "reviewsCount": 610,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80",
    "description": "Muddled garden mint, fresh lime wheels, cane sugar, sparkling soda and crushed crystal ice.",
    "prepTime": "5 mins",
    "available": true
  },
  {
    "id": "dish-240",
    "restaurantId": "rest-16",
    "name": "Alphonso Mango Real Fruit Sundae",
    "category": "Artisan Sundaes",
    "price": 229,
    "discountPrice": 189,
    "rating": 4.9,
    "reviewsCount": 1120,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80",
    "description": "Fresh Alphonso mango gelato topped with diced ripe mango chunks, mango coulis, whipped cream and almond slivers.",
    "prepTime": "5 mins",
    "available": true
  },
  {
    "id": "dish-241",
    "restaurantId": "rest-16",
    "name": "Madagascan Vanilla Bean Ice Cream (500ml)",
    "category": "Artisan Sundaes",
    "price": 249,
    "discountPrice": 209,
    "rating": 4.8,
    "reviewsCount": 780,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80",
    "description": "Rich full-cream dairy ice cream flecked with authentic real Madagascar Bourbon vanilla bean specks.",
    "prepTime": "5 mins",
    "available": true
  },
  {
    "id": "dish-242",
    "restaurantId": "rest-16",
    "name": "Nutella Chocolate Chip Cookie Sundae",
    "category": "Artisan Sundaes",
    "price": 259,
    "discountPrice": 219,
    "rating": 4.9,
    "reviewsCount": 940,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80",
    "description": "Warm baked chocolate chip cookie topped with vanilla gelato, swirl of Nutella and roasted hazelnut crunch.",
    "prepTime": "8 mins",
    "available": true
  },
  {
    "id": "dish-243",
    "restaurantId": "rest-16",
    "name": "Cold Coffee with Vanilla Ice Cream Float",
    "category": "Artisan Sundaes",
    "price": 169,
    "discountPrice": 139,
    "rating": 4.8,
    "reviewsCount": 850,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80",
    "description": "Thick blended cold espresso coffee topped with large scoop of vanilla bean ice cream and chocolate drizzle.",
    "prepTime": "5 mins",
    "available": true
  },
  {
    "id": "dish-244",
    "restaurantId": "rest-17",
    "name": "Classic French Croque Monsieur",
    "category": "All-Day Brunch",
    "price": 299,
    "discountPrice": 259,
    "rating": 4.8,
    "reviewsCount": 510,
    "isVeg": false,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80",
    "description": "Toasted brioche sandwich stuffed with smoked ham, Dijon mustard, smothered in creamy béchamel and melted Gruyere cheese.",
    "prepTime": "15 mins",
    "available": true
  },
  {
    "id": "dish-245",
    "restaurantId": "rest-17",
    "name": "Baked Truffle Mac & Cheese Gratin",
    "category": "All-Day Brunch",
    "price": 319,
    "discountPrice": 279,
    "rating": 4.9,
    "reviewsCount": 780,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1621996346565-e3d5d6281686?auto=format&fit=crop&w=600&q=80",
    "description": "Elbow macaroni enveloped in rich sauce of mature cheddar, parmesan and gruyere, scented with white truffle oil, baked golden with herb panko.",
    "prepTime": "15 mins",
    "available": true
  },
  {
    "id": "dish-246",
    "restaurantId": "rest-17",
    "name": "Mushroom & Brie Savory French Crepe",
    "category": "All-Day Brunch",
    "price": 269,
    "discountPrice": 229,
    "rating": 4.8,
    "reviewsCount": 420,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=600&q=80",
    "description": "Buckwheat galette folded with sautéed garlic wild mushrooms, French brie cheese, caramelized onions and baby spinach.",
    "prepTime": "14 mins",
    "available": true
  },
  {
    "id": "dish-247",
    "restaurantId": "rest-17",
    "name": "Fluffy Buttermilk Pancakes with Maple Syrup (3 pcs)",
    "category": "All-Day Brunch",
    "price": 249,
    "discountPrice": 209,
    "rating": 4.8,
    "reviewsCount": 640,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=600&q=80",
    "description": "Stack of 3 fluffy golden buttermilk pancakes topped with salted butter, Canadian maple syrup and fresh blueberries.",
    "prepTime": "12 mins",
    "available": true
  },
  {
    "id": "dish-248",
    "restaurantId": "rest-18",
    "name": "Velvety Flat White with Whole Milk (250ml)",
    "category": "Artisan Coffee",
    "price": 169,
    "discountPrice": 139,
    "rating": 4.9,
    "reviewsCount": 940,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
    "description": "Expertly extracted double ristretto shot poured with silky microfoam milk and delicate latte art.",
    "prepTime": "5 mins",
    "available": true
  },
  {
    "id": "dish-249",
    "restaurantId": "rest-18",
    "name": "Pain au Chocolat (Chocolate Croissant)",
    "category": "Artisan Bakery",
    "price": 169,
    "discountPrice": 139,
    "rating": 4.8,
    "reviewsCount": 780,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80",
    "description": "Buttery laminated French pastry rolled around two batons of 60% bittersweet dark chocolate.",
    "prepTime": "5 mins",
    "available": true
  },
  {
    "id": "dish-250",
    "restaurantId": "rest-18",
    "name": "Grilled Triple Cheese Melt Sandwich",
    "category": "Artisan Bakery",
    "price": 229,
    "discountPrice": 189,
    "rating": 4.8,
    "reviewsCount": 610,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80",
    "description": "Sharp cheddar, mozzarella and cream cheese melted between butter-grilled artisan brioche bread with garlic herb butter.",
    "prepTime": "10 mins",
    "available": true
  },
  {
    "id": "dish-251",
    "restaurantId": "rest-18",
    "name": "Cinnamon Brown Sugar Swirl Roll",
    "category": "Artisan Bakery",
    "price": 159,
    "discountPrice": 129,
    "rating": 4.8,
    "reviewsCount": 540,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80",
    "description": "Pillowy sweet brioche roll swirled with Korintje cinnamon, dark brown sugar and glazed with cream cheese icing.",
    "prepTime": "5 mins",
    "available": true
  },
  {
    "id": "dish-252",
    "restaurantId": "rest-19",
    "name": "Motichoor Desi Ghee Ladoo (250g)",
    "category": "Royal Mithai",
    "price": 219,
    "discountPrice": 179,
    "rating": 4.9,
    "reviewsCount": 2150,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1571867424488-4565932edb41?auto=format&fit=crop&w=600&q=80",
    "description": "Tiny gram flour pearls fried in pure cow desi ghee, soaked in saffron syrup, rolled with melon seeds and crushed cardamom.",
    "prepTime": "5 mins",
    "available": true
  },
  {
    "id": "dish-253",
    "restaurantId": "rest-19",
    "name": "Kolkata Sponge Rasgulla (4 pcs)",
    "category": "Royal Mithai",
    "price": 149,
    "discountPrice": 119,
    "rating": 4.8,
    "reviewsCount": 1640,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1571867424488-4565932edb41?auto=format&fit=crop&w=600&q=80",
    "description": "Feather-soft, spongy chenna spheres steeped in clear aromatic cardamom sugar syrup. Authentic Kolkata recipe.",
    "prepTime": "5 mins",
    "available": true
  },
  {
    "id": "dish-254",
    "restaurantId": "rest-19",
    "name": "Khasta Moong Dal Kachori (2 pcs)",
    "category": "Halwai Namkeen",
    "price": 79,
    "discountPrice": 59,
    "rating": 4.8,
    "reviewsCount": 1180,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1571867424488-4565932edb41?auto=format&fit=crop&w=600&q=80",
    "description": "Flaky, crusty fried kachoris stuffed with spiced yellow moong lentil masala, served with sweet sonth and green chili.",
    "prepTime": "5 mins",
    "available": true
  },
  {
    "id": "dish-255",
    "restaurantId": "rest-19",
    "name": "Crispy Jalebi Fafda Combo with Papaya Sambharo",
    "category": "Halwai Namkeen",
    "price": 189,
    "discountPrice": 159,
    "rating": 4.9,
    "reviewsCount": 1890,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1571867424488-4565932edb41?auto=format&fit=crop&w=600&q=80",
    "description": "Traditional Gujarati breakfast combo: 4 crispy gram flour fafdas, 100g hot jalebi, raw papaya sambharo and fried green chilies.",
    "prepTime": "8 mins",
    "available": true
  },
  {
    "id": "dish-256",
    "restaurantId": "rest-20",
    "name": "Kathmandu Jhol Momos in Spiced Sesame Broth (8 pcs)",
    "category": "Tibetan Momos",
    "price": 229,
    "discountPrice": 199,
    "rating": 4.9,
    "reviewsCount": 1540,
    "isVeg": false,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1625398407796-82650a8c135f?auto=format&fit=crop&w=600&q=80",
    "description": "Steamed dumplings submerged in piping hot roasted sesame, tomato, soybean and Szechuan pepper spicy jhol broth.",
    "prepTime": "15 mins",
    "available": true
  },
  {
    "id": "dish-257",
    "restaurantId": "rest-20",
    "name": "Crispy Tibetan Meat Shaphalay (2 pcs)",
    "category": "Tibetan Momos",
    "price": 219,
    "discountPrice": 189,
    "rating": 4.8,
    "reviewsCount": 780,
    "isVeg": false,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1625398407796-82650a8c135f?auto=format&fit=crop&w=600&q=80",
    "description": "Semi-circular bread stuffed with seasoned minced chicken, ginger and scallions, deep-fried until crisp and golden.",
    "prepTime": "15 mins",
    "available": true
  },
  {
    "id": "dish-258",
    "restaurantId": "rest-20",
    "name": "Tibetan Steamed Tingmo Flower Buns (2 pcs)",
    "category": "Thukpa & Soups",
    "price": 99,
    "discountPrice": 79,
    "rating": 4.7,
    "reviewsCount": 510,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80",
    "description": "Fluffy, cloud-soft braided steamed yeast dough buns, perfect for dipping into spicy broths and curries.",
    "prepTime": "10 mins",
    "available": true
  },
  {
    "id": "dish-259",
    "restaurantId": "rest-20",
    "name": "Crispy Honey Chili Potato",
    "category": "Thukpa & Soups",
    "price": 189,
    "discountPrice": 159,
    "rating": 4.8,
    "reviewsCount": 890,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80",
    "description": "Crispy fried potato finger batons glazed in sweet honey, roasted chili paste, sesame seeds and green scallions.",
    "prepTime": "12 mins",
    "available": true
  },
  {
    "id": "dish-260",
    "restaurantId": "rest-1",
    "name": "Nawabi Mutton Keema Dum Biryani",
    "category": "Biryani Specialties",
    "price": 429,
    "discountPrice": 389,
    "rating": 4.6,
    "reviewsCount": 150,
    "isVeg": false,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80",
    "description": "Minced lamb keema spiced with royal garam masala, layered with aromatic basmati rice, browned onions, saffron and fresh coriander.",
    "prepTime": "25 mins",
    "available": true
  },
  {
    "id": "dish-261",
    "restaurantId": "rest-1",
    "name": "Shahi Kathal (Jackfruit) Dum Biryani",
    "category": "Biryani Specialties",
    "price": 319,
    "discountPrice": 279,
    "rating": 4.7,
    "reviewsCount": 215,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80",
    "description": "Tender raw jackfruit chunks marinated in spiced yogurt and layered with aged fragrant basmati rice in a sealed earthen pot.",
    "prepTime": "22 mins",
    "available": true
  },
  {
    "id": "dish-262",
    "restaurantId": "rest-1",
    "name": "Afghani Murgh Malai Tikka",
    "category": "Tandoor & Starters",
    "price": 389,
    "discountPrice": 349,
    "rating": 4.6,
    "reviewsCount": 150,
    "isVeg": false,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80",
    "description": "Succulent boneless chicken chunks marinated in rich cashew paste, hung curd, fresh cream and green cardamom, clay-oven roasted.",
    "prepTime": "20 mins",
    "available": true
  },
  {
    "id": "dish-263",
    "restaurantId": "rest-1",
    "name": "Lucknowi Melt-in-Mouth Galouti Kebab",
    "category": "Tandoor & Starters",
    "price": 449,
    "discountPrice": 399,
    "rating": 4.7,
    "reviewsCount": 215,
    "isVeg": false,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80",
    "description": "Finely minced smoked lamb patties blended with 32 secret spices, griddle-seared on mahi tawa. Served with mint chutney and mini ulta tawa paratha.",
    "prepTime": "22 mins",
    "available": true
  },
  {
    "id": "dish-264",
    "restaurantId": "rest-1",
    "name": "Tandoori Malai Broccoli Florets",
    "category": "Tandoor & Starters",
    "price": 329,
    "discountPrice": 289,
    "rating": 4.8,
    "reviewsCount": 280,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80",
    "description": "Fresh broccoli florets steeped in cheese, cream, cracked black pepper and green cardamom marinade, lightly charred in the tandoor.",
    "prepTime": "18 mins",
    "available": true
  },
  {
    "id": "dish-265",
    "restaurantId": "rest-1",
    "name": "Purani Dilli Chicken Tikka Masala",
    "category": "Curries & Gravies",
    "price": 399,
    "discountPrice": 359,
    "rating": 4.6,
    "reviewsCount": 150,
    "isVeg": false,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80",
    "description": "Char-grilled smokey chicken tikka cooked in a velvety spiced tomato, butter, and cashew gravy with aromatic kasuri methi.",
    "prepTime": "20 mins",
    "available": true
  },
  {
    "id": "dish-266",
    "restaurantId": "rest-1",
    "name": "Kashmiri Mutton Rogan Josh",
    "category": "Curries & Gravies",
    "price": 469,
    "discountPrice": 429,
    "rating": 4.7,
    "reviewsCount": 215,
    "isVeg": false,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80",
    "description": "Traditional slow-braised lamb shanks infused with Kashmiri dry red chilies, ratanjyot, fennel, and dry ginger powder.",
    "prepTime": "25 mins",
    "available": true
  },
  {
    "id": "dish-267",
    "restaurantId": "rest-1",
    "name": "Slow-Simmered Dal Makhani",
    "category": "Curries & Gravies",
    "price": 299,
    "discountPrice": 259,
    "rating": 4.8,
    "reviewsCount": 280,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80",
    "description": "Black whole urad lentils and kidney beans slow-cooked overnight on tandoor embers with white butter, fresh tomato puree, and cream.",
    "prepTime": "20 mins",
    "available": true
  },
  {
    "id": "dish-268",
    "restaurantId": "rest-1",
    "name": "Flaky Butter Garlic Naan",
    "category": "Tandoori Breads",
    "price": 79,
    "discountPrice": 69,
    "rating": 4.6,
    "reviewsCount": 150,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=600&q=80",
    "description": "Refined flour flatbread brushed with crushed garlic and butter, slapped onto tandoor walls and baked to bubbly golden perfection.",
    "prepTime": "10 mins",
    "available": true
  },
  {
    "id": "dish-269",
    "restaurantId": "rest-1",
    "name": "Artisanal Cheese & Green Chili Naan",
    "category": "Tandoori Breads",
    "price": 119,
    "discountPrice": 99,
    "rating": 4.7,
    "reviewsCount": 215,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=600&q=80",
    "description": "Stuffed with mozzarella and processed cheese with finely chopped green chilies and coriander, baked till molten cheese bubbles.",
    "prepTime": "12 mins",
    "available": true
  },
  {
    "id": "dish-270",
    "restaurantId": "rest-1",
    "name": "Soft Hand-Stretched Roomali Roti",
    "category": "Tandoori Breads",
    "price": 59,
    "discountPrice": 49,
    "rating": 4.8,
    "reviewsCount": 280,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=600&q=80",
    "description": "Ultra-thin handkerchief style Indian bread expertly tossed in the air and cooked on an inverted kadhai.",
    "prepTime": "8 mins",
    "available": true
  },
  {
    "id": "dish-271",
    "restaurantId": "rest-1",
    "name": "Crisp Multi-Layered Laccha Paratha",
    "category": "Tandoori Breads",
    "price": 69,
    "discountPrice": 59,
    "rating": 4.9,
    "reviewsCount": 345,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=600&q=80",
    "description": "Layered whole wheat bread folded with pure ghee and baked crisp in tandoor with crunchy spiral crust.",
    "prepTime": "10 mins",
    "available": true
  },
  {
    "id": "dish-272",
    "restaurantId": "rest-1",
    "name": "Amritsari Missi Roti with Ajwain",
    "category": "Tandoori Breads",
    "price": 65,
    "discountPrice": 55,
    "rating": 4.6,
    "reviewsCount": 410,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=600&q=80",
    "description": "Nutritious chickpea and wheat flour flatbread seasoned with carom seeds, onions, pomegranate seeds, and fresh coriander.",
    "prepTime": "10 mins",
    "available": true
  },
  {
    "id": "dish-273",
    "restaurantId": "rest-1",
    "name": "Royal Shahi Tukda with Rabdi",
    "category": "Desserts & Beverages",
    "price": 189,
    "discountPrice": 159,
    "rating": 4.6,
    "reviewsCount": 150,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80",
    "description": "Crispy ghee-fried brioche triangles soaked in fragrant saffron sugar syrup, smothered with thickened saffron malai rabdi and silver vark.",
    "prepTime": "12 mins",
    "available": true
  },
  {
    "id": "dish-274",
    "restaurantId": "rest-1",
    "name": "Matka Malai Kesar Pista Kulfi",
    "category": "Desserts & Beverages",
    "price": 149,
    "discountPrice": 129,
    "rating": 4.7,
    "reviewsCount": 215,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1571867424488-4565932edb41?auto=format&fit=crop&w=600&q=80",
    "description": "Traditional slow-boiled milk kulfi infused with Kashmiri saffron strands and crushed roasted pistachios, served chilled in a clay pot.",
    "prepTime": "8 mins",
    "available": true
  },
  {
    "id": "dish-275",
    "restaurantId": "rest-1",
    "name": "Zafrani Rose Phirni in Clay Kasora",
    "category": "Desserts & Beverages",
    "price": 139,
    "discountPrice": 119,
    "rating": 4.8,
    "reviewsCount": 280,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80",
    "description": "Ground basmati rice pudding slow-simmered in whole milk, flavored with rose water, cardamom and garnished with almond flakes.",
    "prepTime": "8 mins",
    "available": true
  },
  {
    "id": "dish-276",
    "restaurantId": "rest-1",
    "name": "Royal Khus & Chia Sherbet Cooler",
    "category": "Desserts & Beverages",
    "price": 129,
    "discountPrice": 109,
    "rating": 4.9,
    "reviewsCount": 345,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1571867424488-4565932edb41?auto=format&fit=crop&w=600&q=80",
    "description": "Refreshing green vetiver root extract blended with chilled mineral water, soaked basil seeds (sabja), fresh lime, and crushed mint.",
    "prepTime": "5 mins",
    "available": true
  },
  {
    "id": "dish-277",
    "restaurantId": "rest-2",
    "name": "Truffle Wild Mushroom & Goat Cheese Pizza",
    "category": "Artisan Pizzas",
    "price": 549,
    "discountPrice": 489,
    "rating": 4.6,
    "reviewsCount": 150,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80",
    "description": "Hand-stretched sourdough crust topped with roasted portobello, creamy goat cheese, mozzarella, white truffle oil, and fresh thyme.",
    "prepTime": "20 mins",
    "available": true
  },
  {
    "id": "dish-278",
    "restaurantId": "rest-2",
    "name": "Smoky BBQ Pulled Chicken Pizza",
    "category": "Artisan Pizzas",
    "price": 499,
    "discountPrice": 449,
    "rating": 4.7,
    "reviewsCount": 215,
    "isVeg": false,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80",
    "description": "San Marzano tomato base, hickory smoked chicken shreds, red caramelized onions, pickled jalapenos, and smoked scamorza cheese.",
    "prepTime": "22 mins",
    "available": true
  },
  {
    "id": "dish-279",
    "restaurantId": "rest-2",
    "name": "Classic Fettuccine Alfredo with Roasted Garlic",
    "category": "Gourmet Pastas",
    "price": 429,
    "discountPrice": 389,
    "rating": 4.6,
    "reviewsCount": 150,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1621996346565-e3d5d6281686?auto=format&fit=crop&w=600&q=80",
    "description": "Fresh handmade ribbon fettuccine tossed in a rich emulsified sauce of Parmigiano Reggiano, heavy cream, cracked pepper, and garlic.",
    "prepTime": "18 mins",
    "available": true
  },
  {
    "id": "dish-280",
    "restaurantId": "rest-2",
    "name": "Fiery Penne all'Arrabbiata with Kalamata Olives",
    "category": "Gourmet Pastas",
    "price": 389,
    "discountPrice": 349,
    "rating": 4.7,
    "reviewsCount": 215,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1621996346565-e3d5d6281686?auto=format&fit=crop&w=600&q=80",
    "description": "Al dente penne in a spicy crushed tomato sauce with garlic, peperoncino flakes, black Kalamata olives, and fresh torn basil leaves.",
    "prepTime": "16 mins",
    "available": true
  },
  {
    "id": "dish-281",
    "restaurantId": "rest-2",
    "name": "Spinach & Ricotta Stuffed Ravioli in Sage Butter",
    "category": "Gourmet Pastas",
    "price": 479,
    "discountPrice": 429,
    "rating": 4.8,
    "reviewsCount": 280,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1621996346565-e3d5d6281686?auto=format&fit=crop&w=600&q=80",
    "description": "Delicate homemade egg pasta pillows filled with spiced ricotta and wilted baby spinach, pan-glazed in brown noisette sage butter.",
    "prepTime": "20 mins",
    "available": true
  },
  {
    "id": "dish-282",
    "restaurantId": "rest-2",
    "name": "Cheesy Pull-Apart Garlic Breadstick Loaf",
    "category": "Starters & Breads",
    "price": 249,
    "discountPrice": 219,
    "rating": 4.6,
    "reviewsCount": 150,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80",
    "description": "Freshly baked artisan sourdough loaf stuffed with mozzarella, roasted garlic herb butter, and oregano seasoning.",
    "prepTime": "14 mins",
    "available": true
  },
  {
    "id": "dish-283",
    "restaurantId": "rest-2",
    "name": "Crispy Bruschetta al Pomodoro e Basilico",
    "category": "Starters & Breads",
    "price": 229,
    "discountPrice": 199,
    "rating": 4.7,
    "reviewsCount": 215,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80",
    "description": "Toasted country ciabatta slices rubbed with fresh garlic, topped with marinated heirloom cherry tomatoes, extra virgin olive oil, and balsamic.",
    "prepTime": "12 mins",
    "available": true
  },
  {
    "id": "dish-284",
    "restaurantId": "rest-2",
    "name": "Crisp Mozzarella Arancini Rice Balls",
    "category": "Starters & Breads",
    "price": 279,
    "discountPrice": 249,
    "rating": 4.8,
    "reviewsCount": 280,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80",
    "description": "Golden panko-crusted saffron risotto balls with molten bocconcini centers, served over warm marinara pomodoro dip.",
    "prepTime": "15 mins",
    "available": true
  },
  {
    "id": "dish-285",
    "restaurantId": "rest-2",
    "name": "Parmesan Herb Loaded Potato Wedges",
    "category": "Starters & Breads",
    "price": 219,
    "discountPrice": 189,
    "rating": 4.9,
    "reviewsCount": 345,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80",
    "description": "Double-cooked Idaho potato wedges tossed with aged parmesan shavings, rosemary sea salt, and garlic truffle aioli.",
    "prepTime": "14 mins",
    "available": true
  },
  {
    "id": "dish-286",
    "restaurantId": "rest-2",
    "name": "Traditional Italian Espresso Tiramisu",
    "category": "Desserts & Sodas",
    "price": 299,
    "discountPrice": 269,
    "rating": 4.6,
    "reviewsCount": 150,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80",
    "description": "Savoiardi ladyfinger biscuits soaked in Illy espresso liqueur, layered with fluffy mascarpone zabaione cream and Dutch cocoa powder.",
    "prepTime": "10 mins",
    "available": true
  },
  {
    "id": "dish-287",
    "restaurantId": "rest-2",
    "name": "Warm Woodfired Nutella & Hazelnut Calzone",
    "category": "Desserts & Sodas",
    "price": 279,
    "discountPrice": 249,
    "rating": 4.7,
    "reviewsCount": 215,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80",
    "description": "Folded pizza crust pocket stuffed with molten Nutella chocolate and toasted Piemonte hazelnut chunks, dusted with powdered sugar.",
    "prepTime": "15 mins",
    "available": true
  },
  {
    "id": "dish-288",
    "restaurantId": "rest-2",
    "name": "Sicilian Blood Orange Sparkling Soda",
    "category": "Desserts & Sodas",
    "price": 169,
    "discountPrice": 149,
    "rating": 4.8,
    "reviewsCount": 280,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80",
    "description": "Artisanal handcrafted soda made with cold-pressed Sicilian red orange pulp, sparkling mountain mineral water, and mint.",
    "prepTime": "5 mins",
    "available": true
  },
  {
    "id": "dish-289",
    "restaurantId": "rest-3",
    "name": "Truffle Butter Double Smashed Cheeseburger",
    "category": "Smash Burgers",
    "price": 389,
    "discountPrice": 349,
    "rating": 4.6,
    "reviewsCount": 150,
    "isVeg": false,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
    "description": "Twin 100% smashed beef patties with crispy lace edges, white truffle butter, double aged cheddar, and house relish on glazed brioche.",
    "prepTime": "18 mins",
    "available": true
  },
  {
    "id": "dish-290",
    "restaurantId": "rest-3",
    "name": "Texas Chili Cheese Loaded Crinkle Fries",
    "category": "Sides & Loaded Fries",
    "price": 249,
    "discountPrice": 219,
    "rating": 4.6,
    "reviewsCount": 150,
    "isVeg": false,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80",
    "description": "Crispy crinkle-cut fries smothered in slow-cooked spiced bean chili, molten yellow cheddar sauce, sour cream, and jalapeño slices.",
    "prepTime": "14 mins",
    "available": true
  },
  {
    "id": "dish-291",
    "restaurantId": "rest-3",
    "name": "Salted Caramel Pretzel Freakshake",
    "category": "Monster Shakes",
    "price": 289,
    "discountPrice": 249,
    "rating": 4.6,
    "reviewsCount": 150,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80",
    "description": "Rich vanilla ice cream blended with homemade salted butter caramel, topped with whipped cream, chocolate pretzels, and caramel drizzle.",
    "prepTime": "10 mins",
    "available": true
  },
  {
    "id": "dish-292",
    "restaurantId": "rest-3",
    "name": "Red Velvet Cheesecake Thickshake",
    "category": "Monster Shakes",
    "price": 299,
    "discountPrice": 259,
    "rating": 4.7,
    "reviewsCount": 215,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80",
    "description": "Creamy blend of whole milk, Philadelphia cream cheese, and red velvet cake crumble, crowned with a mini red velvet cupcake.",
    "prepTime": "10 mins",
    "available": true
  },
  {
    "id": "dish-293",
    "restaurantId": "rest-3",
    "name": "Lotus Biscoff Speculoos Crunch Shake",
    "category": "Monster Shakes",
    "price": 299,
    "discountPrice": 259,
    "rating": 4.8,
    "reviewsCount": 280,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80",
    "description": "Belgian caramelized Biscoff spread pureed with cold milk and dairy ice cream, garnished with crushed Biscoff biscuit crumb.",
    "prepTime": "10 mins",
    "available": true
  },
  {
    "id": "dish-294",
    "restaurantId": "rest-4",
    "name": "Singapore Street Chili Garlic Hakka Noodles",
    "category": "Wok Noodles & Rice",
    "price": 289,
    "discountPrice": 249,
    "rating": 4.6,
    "reviewsCount": 150,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80",
    "description": "Wok-tossed noodles with shredded cabbage, bell peppers, scallions, dry red chilies, and fiery garlic oil with soy glaze.",
    "prepTime": "16 mins",
    "available": true
  },
  {
    "id": "dish-295",
    "restaurantId": "rest-4",
    "name": "Teriyaki Chicken Fried Rice with Edamame",
    "category": "Wok Noodles & Rice",
    "price": 329,
    "discountPrice": 289,
    "rating": 4.7,
    "reviewsCount": 215,
    "isVeg": false,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80",
    "description": "Aromatic jasmine rice flash-fried with grilled chicken cubes, sweet edamame beans, scrambled egg, and sweet teriyaki glaze.",
    "prepTime": "18 mins",
    "available": true
  },
  {
    "id": "dish-296",
    "restaurantId": "rest-4",
    "name": "Bangkok Street Pad Thai with Roasted Peanuts",
    "category": "Wok Noodles & Rice",
    "price": 349,
    "discountPrice": 309,
    "rating": 4.8,
    "reviewsCount": 280,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80",
    "description": "Flat rice noodles stir-fried with tofu, bean sprouts, Chinese chives, tamarind palm sugar sauce, and crushed roasted peanuts.",
    "prepTime": "18 mins",
    "available": true
  },
  {
    "id": "dish-297",
    "restaurantId": "rest-4",
    "name": "Crystal Truffle & Edamame Dumplings (6 pcs)",
    "category": "Dim Sum & Momos",
    "price": 349,
    "discountPrice": 309,
    "rating": 4.6,
    "reviewsCount": 150,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1625398407796-82650a8c135f?auto=format&fit=crop&w=600&q=80",
    "description": "Translucent potato starch skins packed with steamed edamame mash, water chestnuts, and fragrant white truffle essence.",
    "prepTime": "16 mins",
    "available": true
  },
  {
    "id": "dish-298",
    "restaurantId": "rest-4",
    "name": "Fiery Schezwan Chicken Steamed Momos (6 pcs)",
    "category": "Dim Sum & Momos",
    "price": 279,
    "discountPrice": 249,
    "rating": 4.7,
    "reviewsCount": 215,
    "isVeg": false,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1625398407796-82650a8c135f?auto=format&fit=crop&w=600&q=80",
    "description": "Tender minced chicken breast dumplings tossed in home-brewed Sichuan peppercorn chili oil with garlic and spring onions.",
    "prepTime": "15 mins",
    "available": true
  },
  {
    "id": "dish-299",
    "restaurantId": "rest-4",
    "name": "Pan-Fried Shanghai Vegetable Gyoza (6 pcs)",
    "category": "Dim Sum & Momos",
    "price": 269,
    "discountPrice": 239,
    "rating": 4.8,
    "reviewsCount": 280,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1625398407796-82650a8c135f?auto=format&fit=crop&w=600&q=80",
    "description": "Japanese style crescent dumplings with crunchy pan-seared bottoms, filled with shiitake mushrooms, carrots, and bok choy.",
    "prepTime": "16 mins",
    "available": true
  },
  {
    "id": "dish-300",
    "restaurantId": "rest-4",
    "name": "Crispy Tempura Prawn Uramaki Roll (8 pcs)",
    "category": "Sushi & Rolls",
    "price": 449,
    "discountPrice": 399,
    "rating": 4.6,
    "reviewsCount": 150,
    "isVeg": false,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80",
    "description": "Inside-out sushi roll with golden batter-fried tiger prawns, cucumber, spicy mayo, and toasted sesame seed coating.",
    "prepTime": "20 mins",
    "available": true
  },
  {
    "id": "dish-301",
    "restaurantId": "rest-4",
    "name": "Avocado & Cream Cheese Maki Roll (8 pcs)",
    "category": "Sushi & Rolls",
    "price": 369,
    "discountPrice": 329,
    "rating": 4.7,
    "reviewsCount": 215,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80",
    "description": "Hass avocado batons and Philadelphia cream cheese rolled in seasoned vinegared sushi rice and crisp nori seaweed.",
    "prepTime": "18 mins",
    "available": true
  },
  {
    "id": "dish-302",
    "restaurantId": "rest-4",
    "name": "Spicy Salmon Flame-Seared Roll (8 pcs)",
    "category": "Sushi & Rolls",
    "price": 499,
    "discountPrice": 449,
    "rating": 4.8,
    "reviewsCount": 280,
    "isVeg": false,
    "isBestseller": false,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80",
    "description": "Fresh Atlantic salmon, chili scallion mix, torch-seared with unagi sweet glaze and flying fish roe.",
    "prepTime": "20 mins",
    "available": true
  },
  {
    "id": "dish-303",
    "restaurantId": "rest-4",
    "name": "Teriyaki Chicken Crunch Roll (8 pcs)",
    "category": "Sushi & Rolls",
    "price": 399,
    "discountPrice": 359,
    "rating": 4.9,
    "reviewsCount": 345,
    "isVeg": false,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80",
    "description": "Glazed teriyaki chicken breast, cucumber, sweet soy drizzle, and crunchy tempura flake topping.",
    "prepTime": "18 mins",
    "available": true
  },
  {
    "id": "dish-304",
    "restaurantId": "rest-4",
    "name": "Rainbow Dragon Cucumber Maki (8 pcs)",
    "category": "Sushi & Rolls",
    "price": 349,
    "discountPrice": 309,
    "rating": 4.6,
    "reviewsCount": 410,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80",
    "description": "Crisp English cucumber, pickled daikon radish, and bell pepper roll topped with sliced avocado sheets and sesame.",
    "prepTime": "16 mins",
    "available": true
  },
  {
    "id": "dish-305",
    "restaurantId": "rest-4",
    "name": "Thai Green Coconut Curry with Jasmine Rice",
    "category": "Asian Curries & Mains",
    "price": 399,
    "discountPrice": 359,
    "rating": 4.6,
    "reviewsCount": 150,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=600&q=80",
    "description": "Aromatic lemongrass, kaffir lime, and green chili paste simmered in rich coconut milk with Asian greens, bamboo shoots, and steamed jasmine rice.",
    "prepTime": "20 mins",
    "available": true
  },
  {
    "id": "dish-306",
    "restaurantId": "rest-4",
    "name": "Kung Pao Crispy Chicken with Dry Chilies",
    "category": "Asian Curries & Mains",
    "price": 389,
    "discountPrice": 349,
    "rating": 4.7,
    "reviewsCount": 215,
    "isVeg": false,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80",
    "description": "Crisp diced chicken wok-tossed with Sichuan peppers, roasted crunchy peanuts, scallions, and tangy-sweet dark soy sauce.",
    "prepTime": "18 mins",
    "available": true
  },
  {
    "id": "dish-307",
    "restaurantId": "rest-4",
    "name": "Cantonese Sweet & Sour Silken Tofu Medley",
    "category": "Asian Curries & Mains",
    "price": 329,
    "discountPrice": 289,
    "rating": 4.8,
    "reviewsCount": 280,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=600&q=80",
    "description": "Golden fried tofu cubes, pineapple chunks, bell peppers, and sweet onions glazed in classic sweet and sour plum sauce.",
    "prepTime": "16 mins",
    "available": true
  },
  {
    "id": "dish-308",
    "restaurantId": "rest-4",
    "name": "Black Pepper Sliced Chicken in Claypot",
    "category": "Asian Curries & Mains",
    "price": 399,
    "discountPrice": 359,
    "rating": 4.9,
    "reviewsCount": 345,
    "isVeg": false,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80",
    "description": "Tender chicken fillets flash-seared with coarsely ground Tellicherry black peppercorns, dark soy, and sweet caramelized onions.",
    "prepTime": "20 mins",
    "available": true
  },
  {
    "id": "dish-309",
    "restaurantId": "rest-4",
    "name": "Classic Brown Sugar Tiger Milk Boba",
    "category": "Desserts & Boba",
    "price": 219,
    "discountPrice": 189,
    "rating": 4.6,
    "reviewsCount": 150,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1558857563-b37fcda7d727?auto=format&fit=crop&w=600&q=80",
    "description": "Fresh chewy tapioca pearls cooked in caramelized brown sugar syrup, swirled with fresh chilled organic milk and black tea.",
    "prepTime": "8 mins",
    "available": true
  },
  {
    "id": "dish-310",
    "restaurantId": "rest-4",
    "name": "Taro Coconut Bubble Milk Tea",
    "category": "Desserts & Boba",
    "price": 229,
    "discountPrice": 199,
    "rating": 4.7,
    "reviewsCount": 215,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80",
    "description": "Velvety purple taro root puree blended with coconut milk, Assam tea, and honey-infused popping boba pearls.",
    "prepTime": "8 mins",
    "available": true
  },
  {
    "id": "dish-311",
    "restaurantId": "rest-4",
    "name": "Warm Honey Darsaan with Vanilla Ice Cream",
    "category": "Desserts & Boba",
    "price": 189,
    "discountPrice": 159,
    "rating": 4.8,
    "reviewsCount": 280,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80",
    "description": "Crisp fried flat noodles tossed in warm blossom honey, toasted sesame seeds, served with a scoop of Madagascar vanilla bean gelato.",
    "prepTime": "12 mins",
    "available": true
  },
  {
    "id": "dish-312",
    "restaurantId": "rest-4",
    "name": "Thai Coconut Mango Sweet Sticky Rice",
    "category": "Desserts & Boba",
    "price": 249,
    "discountPrice": 219,
    "rating": 4.9,
    "reviewsCount": 345,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1558857563-b37fcda7d727?auto=format&fit=crop&w=600&q=80",
    "description": "Steamed glutinous sweet rice bathed in salty-sweet coconut cream, paired with fresh sweet Alphonso mango slices.",
    "prepTime": "12 mins",
    "available": true
  },
  {
    "id": "dish-313",
    "restaurantId": "rest-5",
    "name": "Guntur Karam Podi Butter Dosa",
    "category": "Crispy Dosas",
    "price": 179,
    "discountPrice": 149,
    "rating": 4.6,
    "reviewsCount": 150,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=80",
    "description": "Paper-thin fermented rice crepe smeared with fiery red chili garlic Karam podi and generous dollops of Amul butter.",
    "prepTime": "12 mins",
    "available": true
  },
  {
    "id": "dish-314",
    "restaurantId": "rest-5",
    "name": "Chettinad Pepper Mushroom Roast Dosa",
    "category": "Crispy Dosas",
    "price": 199,
    "discountPrice": 169,
    "rating": 4.7,
    "reviewsCount": 215,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=80",
    "description": "Golden roasted dosa stuffed with spicy Chettinad-style crushed black pepper and button mushroom masala.",
    "prepTime": "15 mins",
    "available": true
  },
  {
    "id": "dish-315",
    "restaurantId": "rest-5",
    "name": "Mini Ghee Podi Button Idlis (14 pcs)",
    "category": "Idli & Vada Platters",
    "price": 169,
    "discountPrice": 139,
    "rating": 4.6,
    "reviewsCount": 150,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80",
    "description": "Bite-sized coin idlis tossed in hot clarified cow ghee and gunpowder lentil spice mix, served with coconut chutney.",
    "prepTime": "10 mins",
    "available": true
  },
  {
    "id": "dish-316",
    "restaurantId": "rest-5",
    "name": "Crispy Rava Onion Medu Vada (2 pcs)",
    "category": "Idli & Vada Platters",
    "price": 129,
    "discountPrice": 109,
    "rating": 4.7,
    "reviewsCount": 215,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80",
    "description": "Golden fried donut dumplings with semolina crunch, whole black peppercorns, curry leaves, and ginger.",
    "prepTime": "12 mins",
    "available": true
  },
  {
    "id": "dish-317",
    "restaurantId": "rest-5",
    "name": "Kanchipuram Spiced Steamed Idli (2 pcs)",
    "category": "Idli & Vada Platters",
    "price": 149,
    "discountPrice": 129,
    "rating": 4.8,
    "reviewsCount": 280,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80",
    "description": "Coarsely ground fermented batter seasoned with dry ginger, cumin, pepper, and asafetida, steamed in traditional mandharai leaf cups.",
    "prepTime": "12 mins",
    "available": true
  },
  {
    "id": "dish-318",
    "restaurantId": "rest-5",
    "name": "Thayir Vadai (Chilled Curd Vada) with Boondi",
    "category": "Idli & Vada Platters",
    "price": 149,
    "discountPrice": 129,
    "rating": 4.9,
    "reviewsCount": 345,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80",
    "description": "Medu vadas soaked in chilled sweet-tangy whipped yogurt, tempered with mustard, green chilies, and crisp kara boondi.",
    "prepTime": "8 mins",
    "available": true
  },
  {
    "id": "dish-319",
    "restaurantId": "rest-5",
    "name": "Karnataka Bisi Bele Bath with Pure Ghee",
    "category": "Rice Bowls & Meals",
    "price": 189,
    "discountPrice": 159,
    "rating": 4.6,
    "reviewsCount": 150,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?auto=format&fit=crop&w=600&q=80",
    "description": "Comforting one-pot blend of rice, lentils, vegetables, tamarind, and aromatic spices cooked with dollops of fresh country ghee.",
    "prepTime": "15 mins",
    "available": true
  },
  {
    "id": "dish-320",
    "restaurantId": "rest-5",
    "name": "Creamy Tempered Curd Rice (Thayir Sadam)",
    "category": "Rice Bowls & Meals",
    "price": 149,
    "discountPrice": 129,
    "rating": 4.7,
    "reviewsCount": 215,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80",
    "description": "Soft mashed rice blended with set yogurt, milk, mustard seeds, curry leaves, grated ginger, pomegranate seeds, and raw mango pickle.",
    "prepTime": "10 mins",
    "available": true
  },
  {
    "id": "dish-321",
    "restaurantId": "rest-5",
    "name": "Kovil Tamarind Rice (Puliyodarai) with Peanuts",
    "category": "Rice Bowls & Meals",
    "price": 169,
    "discountPrice": 139,
    "rating": 4.8,
    "reviewsCount": 280,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?auto=format&fit=crop&w=600&q=80",
    "description": "Temple style spicy and tangy rice tossed in cooked tamarind pulp paste with crunchy roasted peanuts and sesame oil.",
    "prepTime": "12 mins",
    "available": true
  },
  {
    "id": "dish-322",
    "restaurantId": "rest-5",
    "name": "Kerala Vegetable Stew with Appams (2 pcs)",
    "category": "Rice Bowls & Meals",
    "price": 219,
    "discountPrice": 189,
    "rating": 4.9,
    "reviewsCount": 345,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80",
    "description": "Mildly spiced coconut milk stew with potatoes, carrots, green peas, and whole spices, paired with soft lacy appams.",
    "prepTime": "16 mins",
    "available": true
  },
  {
    "id": "dish-323",
    "restaurantId": "rest-5",
    "name": "Authentic Ghee Mysore Pak (200g)",
    "category": "Sweets & Kaapi",
    "price": 199,
    "discountPrice": 169,
    "rating": 4.6,
    "reviewsCount": 150,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1605194000384-439c3ced8d15?auto=format&fit=crop&w=600&q=80",
    "description": "Melt-in-mouth traditional royal sweet made from roasted gram flour, sugar, and generous streams of hot melted cow ghee.",
    "prepTime": "8 mins",
    "available": true
  },
  {
    "id": "dish-324",
    "restaurantId": "rest-5",
    "name": "Tender Coconut (Elaneer) Warm Payasam",
    "category": "Sweets & Kaapi",
    "price": 159,
    "discountPrice": 139,
    "rating": 4.7,
    "reviewsCount": 215,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1571867424488-4565932edb41?auto=format&fit=crop&w=600&q=80",
    "description": "Subtle and fragrant dessert made from fresh tender coconut pulp, coconut milk, condensed milk, and green cardamom.",
    "prepTime": "10 mins",
    "available": true
  },
  {
    "id": "dish-325",
    "restaurantId": "rest-6",
    "name": "Roasted Sweet Potato & Black Bean Bowl",
    "category": "Superfood Bowls",
    "price": 349,
    "discountPrice": 309,
    "rating": 4.6,
    "reviewsCount": 150,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80",
    "description": "Spiced baked sweet potato cubes, seasoned black beans, sweet corn, brown rice, creamy guacamole, and cilantro lime dressing.",
    "prepTime": "16 mins",
    "available": true
  },
  {
    "id": "dish-326",
    "restaurantId": "rest-6",
    "name": "Mediterranean Falafel, Hummus & Quinoa Bowl",
    "category": "Superfood Bowls",
    "price": 369,
    "discountPrice": 329,
    "rating": 4.7,
    "reviewsCount": 215,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80",
    "description": "Golden herb falafels over organic tricolor quinoa, cucumber tomato salad, creamy tahini hummus, and pickled kalamata olives.",
    "prepTime": "16 mins",
    "available": true
  },
  {
    "id": "dish-327",
    "restaurantId": "rest-6",
    "name": "Teriyaki Tofu Sesame Soba Noodle Bowl",
    "category": "Superfood Bowls",
    "price": 359,
    "discountPrice": 319,
    "rating": 4.8,
    "reviewsCount": 280,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80",
    "description": "Pan-seared organic tofu glazed in low-sodium teriyaki, buck wheat soba noodles, steamed edamame, and pickled red cabbage.",
    "prepTime": "18 mins",
    "available": true
  },
  {
    "id": "dish-328",
    "restaurantId": "rest-6",
    "name": "Classic Greek Village Salad with Feta",
    "category": "Gourmet Salads",
    "price": 299,
    "discountPrice": 269,
    "rating": 4.6,
    "reviewsCount": 150,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80",
    "description": "Crisp cucumbers, vine-ripened tomatoes, sweet peppers, red onions, Greek kalamata olives, and a slab of barrel-aged herb feta.",
    "prepTime": "12 mins",
    "available": true
  },
  {
    "id": "dish-329",
    "restaurantId": "rest-6",
    "name": "Caesar Crunch Salad with Sourdough Croutons",
    "category": "Gourmet Salads",
    "price": 289,
    "discountPrice": 249,
    "rating": 4.7,
    "reviewsCount": 215,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80",
    "description": "Crisp romaine hearts, shaved grana padano parmesan, whole wheat garlic croutons, and creamy eggless garlic parmesan dressing.",
    "prepTime": "12 mins",
    "available": true
  },
  {
    "id": "dish-330",
    "restaurantId": "rest-6",
    "name": "Asian Crunchy Peanut & Edamame Slaw",
    "category": "Gourmet Salads",
    "price": 279,
    "discountPrice": 249,
    "rating": 4.8,
    "reviewsCount": 280,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80",
    "description": "Shredded purple cabbage, carrots, edamame, bell peppers, fresh cilantro, roasted peanuts, and spicy ginger lime vinaigrette.",
    "prepTime": "12 mins",
    "available": true
  },
  {
    "id": "dish-331",
    "restaurantId": "rest-6",
    "name": "Roasted Beetroot, Walnut & Goat Cheese Salad",
    "category": "Gourmet Salads",
    "price": 319,
    "discountPrice": 289,
    "rating": 4.9,
    "reviewsCount": 345,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80",
    "description": "Oven-roasted baby beets, candied California walnuts, creamy goat cheese crumbles, wild baby arugula, and honey balsamic glaze.",
    "prepTime": "14 mins",
    "available": true
  },
  {
    "id": "dish-332",
    "restaurantId": "rest-6",
    "name": "Grilled Basil Pesto Chicken Whole Wheat Wrap",
    "category": "High Protein Wraps",
    "price": 299,
    "discountPrice": 269,
    "rating": 4.6,
    "reviewsCount": 150,
    "isVeg": false,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80",
    "description": "Herb-marinated chicken breast, sun-dried tomatoes, fresh mozzarella, baby spinach, and walnut basil pesto in high-fiber flatbread.",
    "prepTime": "14 mins",
    "available": true
  },
  {
    "id": "dish-333",
    "restaurantId": "rest-6",
    "name": "Chipotle Black Bean & Guacamole Protein Burrito",
    "category": "High Protein Wraps",
    "price": 279,
    "discountPrice": 249,
    "rating": 4.7,
    "reviewsCount": 215,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80",
    "description": "Slow-simmered black beans, brown rice, roasted peppers, cheddar, fresh guacamole, and Greek yogurt sour cream.",
    "prepTime": "14 mins",
    "available": true
  },
  {
    "id": "dish-334",
    "restaurantId": "rest-6",
    "name": "Smoked Paneer Tikka & Mint Hummus Wrap",
    "category": "High Protein Wraps",
    "price": 269,
    "discountPrice": 239,
    "rating": 4.8,
    "reviewsCount": 280,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80",
    "description": "Tandoor-smoked low-fat paneer cubes, spiced mint hummus, crunchy pickled onions, and cucumber ribbons in whole wheat roti.",
    "prepTime": "14 mins",
    "available": true
  },
  {
    "id": "dish-335",
    "restaurantId": "rest-6",
    "name": "Lebanese Falafel Tahini Whole Wheat Wrap",
    "category": "High Protein Wraps",
    "price": 259,
    "discountPrice": 229,
    "rating": 4.9,
    "reviewsCount": 345,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80",
    "description": "Crispy chickpea falafels, shredded lettuce, pickled turnips, tomatoes, and nutty sesame tahini dressing.",
    "prepTime": "12 mins",
    "available": true
  },
  {
    "id": "dish-336",
    "restaurantId": "rest-6",
    "name": "Egg White & Avocado Sunrise Burrito",
    "category": "High Protein Wraps",
    "price": 289,
    "discountPrice": 259,
    "rating": 4.6,
    "reviewsCount": 410,
    "isVeg": false,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80",
    "description": "Four egg whites scrambled with baby spinach and mushrooms, paired with sliced Hass avocado and smoked salsa verde.",
    "prepTime": "12 mins",
    "available": true
  },
  {
    "id": "dish-337",
    "restaurantId": "rest-6",
    "name": "Golden Turmeric & Mango Glow Cold-Pressed Juice",
    "category": "Smoothies & Juices",
    "price": 189,
    "discountPrice": 159,
    "rating": 4.6,
    "reviewsCount": 150,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80",
    "description": "Cold-pressed raw turmeric root, sweet Alphonso mango, Valencia orange, ginger, and black pepper for maximum immunity.",
    "prepTime": "6 mins",
    "available": true
  },
  {
    "id": "dish-338",
    "restaurantId": "rest-7",
    "name": "Volcano Prawn Tempura Roll (8 pcs)",
    "category": "Specialty Sushi",
    "price": 529,
    "discountPrice": 479,
    "rating": 4.6,
    "reviewsCount": 150,
    "isVeg": false,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80",
    "description": "Crispy tempura tiger prawns rolled with avocado, topped with baked spicy crab salad, tobiko caviar, and sweet unagi glaze.",
    "prepTime": "20 mins",
    "available": true
  },
  {
    "id": "dish-339",
    "restaurantId": "rest-7",
    "name": "Vegetarian Caterpillar Avocado Roll (8 pcs)",
    "category": "Specialty Sushi",
    "price": 419,
    "discountPrice": 379,
    "rating": 4.7,
    "reviewsCount": 215,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80",
    "description": "Grilled tender asparagus and cream cheese rolled inside, draped with paper-thin ripe avocado slices in a caterpillar design.",
    "prepTime": "18 mins",
    "available": true
  },
  {
    "id": "dish-340",
    "restaurantId": "rest-7",
    "name": "Seared Yellowfin Tuna Nigiri (4 pcs)",
    "category": "Specialty Sushi",
    "price": 489,
    "discountPrice": 439,
    "rating": 4.8,
    "reviewsCount": 280,
    "isVeg": false,
    "isBestseller": false,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80",
    "description": "Sashimi-grade yellowfin tuna brushed with nikiri sweet soy, lightly flame-torched and served over hand-pressed sushi rice.",
    "prepTime": "16 mins",
    "available": true
  },
  {
    "id": "dish-341",
    "restaurantId": "rest-7",
    "name": "Spicy Miso Tofu & Corn Rich Ramen",
    "category": "Ramen & Noodles",
    "price": 429,
    "discountPrice": 389,
    "rating": 4.6,
    "reviewsCount": 150,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80",
    "description": "Hearty fermented red miso broth, springy wheat ramen noodles, silken tofu, buttered sweet corn, menma bamboo, and scallions.",
    "prepTime": "20 mins",
    "available": true
  },
  {
    "id": "dish-342",
    "restaurantId": "rest-7",
    "name": "Tonkotsu-Style Rich Braised Chicken Ramen",
    "category": "Ramen & Noodles",
    "price": 469,
    "discountPrice": 429,
    "rating": 4.7,
    "reviewsCount": 215,
    "isVeg": false,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80",
    "description": "Collagen-rich 12-hour simmered chicken paitan broth, tender chashu chicken roll, seasoned soft-boiled egg, and nori sheets.",
    "prepTime": "22 mins",
    "available": true
  },
  {
    "id": "dish-343",
    "restaurantId": "rest-7",
    "name": "Tokyo Street Vegetable Yaki Udon Stir Fry",
    "category": "Ramen & Noodles",
    "price": 379,
    "discountPrice": 339,
    "rating": 4.8,
    "reviewsCount": 280,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80",
    "description": "Thick chewy Japanese udon wheat noodles stir-fried with shiitake mushrooms, shredded cabbage, carrots, and sweet-savory tare sauce.",
    "prepTime": "18 mins",
    "available": true
  },
  {
    "id": "dish-344",
    "restaurantId": "rest-7",
    "name": "Shoyu Soy Broth Ramen with Ajitsuke Tamago",
    "category": "Ramen & Noodles",
    "price": 439,
    "discountPrice": 399,
    "rating": 4.9,
    "reviewsCount": 345,
    "isVeg": false,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80",
    "description": "Clear chicken and dashi broth seasoned with barrel-aged Japanese shoyu soy, spring noodles, wood ear mushrooms, and ramen egg.",
    "prepTime": "20 mins",
    "available": true
  },
  {
    "id": "dish-345",
    "restaurantId": "rest-7",
    "name": "Crispy Chicken Karaage with Kewpie Dip",
    "category": "Izakaya Appetizers",
    "price": 349,
    "discountPrice": 309,
    "rating": 4.6,
    "reviewsCount": 150,
    "isVeg": false,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=600&q=80",
    "description": "Bite-sized chicken thighs marinated in ginger, garlic, sake, and soy, double-fried in potato starch for supreme crunchiness.",
    "prepTime": "16 mins",
    "available": true
  },
  {
    "id": "dish-346",
    "restaurantId": "rest-7",
    "name": "Takoyaki Octopus Batter Balls (6 pcs)",
    "category": "Izakaya Appetizers",
    "price": 369,
    "discountPrice": 329,
    "rating": 4.7,
    "reviewsCount": 215,
    "isVeg": false,
    "isBestseller": false,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1535400255456-984241443b29?auto=format&fit=crop&w=600&q=80",
    "description": "Osaka street-style battered balls with tender octopus filling, brushed with takoyaki sauce, Japanese mayo, and dancing bonito flakes.",
    "prepTime": "16 mins",
    "available": true
  },
  {
    "id": "dish-347",
    "restaurantId": "rest-7",
    "name": "Sweet Red Bean Dorayaki Pancakes (2 pcs)",
    "category": "Japanese Treats",
    "price": 189,
    "discountPrice": 159,
    "rating": 4.6,
    "reviewsCount": 150,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80",
    "description": "Fluffy honey sponge castella pancakes sandwiched around sweet adzuki red bean paste, a beloved Japanese classic.",
    "prepTime": "8 mins",
    "available": true
  },
  {
    "id": "dish-348",
    "restaurantId": "rest-7",
    "name": "Matcha Green Tea Swirl Roll Cake Slice",
    "category": "Japanese Treats",
    "price": 219,
    "discountPrice": 189,
    "rating": 4.7,
    "reviewsCount": 215,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80",
    "description": "Airy chiffon sponge flavored with ceremonial Uji matcha powder, rolled with lightly sweetened Hokkaido milk whipped cream.",
    "prepTime": "8 mins",
    "available": true
  },
  {
    "id": "dish-349",
    "restaurantId": "rest-7",
    "name": "Crispy Taiyaki Fish Waffle with Vanilla Custard",
    "category": "Japanese Treats",
    "price": 179,
    "discountPrice": 149,
    "rating": 4.8,
    "reviewsCount": 280,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80",
    "description": "Traditional Japanese fish-shaped golden waffle freshly pressed and stuffed with warm rich vanilla bean custard cream.",
    "prepTime": "12 mins",
    "available": true
  },
  {
    "id": "dish-350",
    "restaurantId": "rest-8",
    "name": "Fresh Strawberry & Clotted Cream Waffle",
    "category": "Belgian Waffles",
    "price": 289,
    "discountPrice": 249,
    "rating": 4.6,
    "reviewsCount": 150,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=600&q=80",
    "description": "Crispy golden Brussels waffle topped with handpicked Mahabaleshwar strawberries, French chantilly cream, and strawberry coulis.",
    "prepTime": "14 mins",
    "available": true
  },
  {
    "id": "dish-351",
    "restaurantId": "rest-8",
    "name": "Campfire S'mores Toasted Marshmallow Waffle",
    "category": "Belgian Waffles",
    "price": 299,
    "discountPrice": 259,
    "rating": 4.7,
    "reviewsCount": 215,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=600&q=80",
    "description": "Belgian pearl sugar waffle layered with molten Hershey's chocolate fudge, crushed graham crackers, and torch-flamed marshmallows.",
    "prepTime": "15 mins",
    "available": true
  },
  {
    "id": "dish-352",
    "restaurantId": "rest-8",
    "name": "Salted Butter Caramel & Roasted Pecan Waffle",
    "category": "Belgian Waffles",
    "price": 299,
    "discountPrice": 259,
    "rating": 4.8,
    "reviewsCount": 280,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=600&q=80",
    "description": "Deep pocketed waffle drenched in warm salted butter caramel sauce, topped with toasted caramelized Georgia pecans.",
    "prepTime": "14 mins",
    "available": true
  },
  {
    "id": "dish-353",
    "restaurantId": "rest-8",
    "name": "Classic French Opera Gateau Slice",
    "category": "Gourmet Cakes",
    "price": 299,
    "discountPrice": 269,
    "rating": 4.6,
    "reviewsCount": 150,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80",
    "description": "Almond sponge soaked in Grand Marnier coffee syrup, layered with French coffee buttercream and rich dark chocolate ganache.",
    "prepTime": "8 mins",
    "available": true
  },
  {
    "id": "dish-354",
    "restaurantId": "rest-8",
    "name": "Spanish Basque Burnt Caramel Cheesecake",
    "category": "Gourmet Cakes",
    "price": 319,
    "discountPrice": 289,
    "rating": 4.7,
    "reviewsCount": 215,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80",
    "description": "Crustless San Sebastian cheesecake baked at high heat for a dark caramelized exterior and super creamy custard-like interior.",
    "prepTime": "8 mins",
    "available": true
  },
  {
    "id": "dish-355",
    "restaurantId": "rest-8",
    "name": "Lemon Curd & Wild Blueberry Chiffon Cake",
    "category": "Gourmet Cakes",
    "price": 279,
    "discountPrice": 249,
    "rating": 4.8,
    "reviewsCount": 280,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80",
    "description": "Fluffy light lemon sponge cake filled with tangy handmade Meyer lemon curd and compote of wild Maine blueberries.",
    "prepTime": "8 mins",
    "available": true
  },
  {
    "id": "dish-356",
    "restaurantId": "rest-8",
    "name": "Almond Frangipane Flaky Butter Croissant",
    "category": "French Pastries",
    "price": 199,
    "discountPrice": 169,
    "rating": 4.6,
    "reviewsCount": 150,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=600&q=80",
    "description": "Double-baked pure French butter croissant filled with almond frangipane cream and encrusted with sliced toasted almonds.",
    "prepTime": "8 mins",
    "available": true
  },
  {
    "id": "dish-357",
    "restaurantId": "rest-8",
    "name": "Assorted Parisian Macarons Gift Box (6 pcs)",
    "category": "French Pastries",
    "price": 349,
    "discountPrice": 309,
    "rating": 4.7,
    "reviewsCount": 215,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&w=600&q=80",
    "description": "Delicate almond meringue sandwich cookies in assorted flavors: Pistachio, Raspberry, Dark Chocolate, Salted Caramel, Vanilla, and Coffee.",
    "prepTime": "6 mins",
    "available": true
  },
  {
    "id": "dish-358",
    "restaurantId": "rest-8",
    "name": "Valrhona Dark Chocolate Crisp Choux Eclair",
    "category": "French Pastries",
    "price": 189,
    "discountPrice": 159,
    "rating": 4.8,
    "reviewsCount": 280,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80",
    "description": "Crisp choux pastry finger piped with silky 70% Valrhona dark chocolate pastry cream, dipped in shiny mirror cocoa glaze.",
    "prepTime": "8 mins",
    "available": true
  },
  {
    "id": "dish-359",
    "restaurantId": "rest-8",
    "name": "Hazelnut Praline Thick Glace Milkshake",
    "category": "Dessert Shakes",
    "price": 249,
    "discountPrice": 219,
    "rating": 4.6,
    "reviewsCount": 150,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80",
    "description": "Creamy roasted hazelnut praline gelato blended with whole milk and topped with crushed gianduja wafers.",
    "prepTime": "10 mins",
    "available": true
  },
  {
    "id": "dish-360",
    "restaurantId": "rest-8",
    "name": "Pure Sicilian Pistachio & Rose Shake",
    "category": "Dessert Shakes",
    "price": 269,
    "discountPrice": 239,
    "rating": 4.7,
    "reviewsCount": 215,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80",
    "description": "Imported Bronte pistachio paste whirled with French vanilla bean cream and fragrant damask rose water.",
    "prepTime": "10 mins",
    "available": true
  },
  {
    "id": "dish-361",
    "restaurantId": "rest-8",
    "name": "Double Shot Dark Espresso Mocha Frappe",
    "category": "Dessert Shakes",
    "price": 239,
    "discountPrice": 209,
    "rating": 4.8,
    "reviewsCount": 280,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80",
    "description": "Freshly pulled double shot dark roast espresso blended with chocolate fudge, ice, and whole milk, crowned with whipped cream.",
    "prepTime": "8 mins",
    "available": true
  },
  {
    "id": "dish-362",
    "restaurantId": "rest-9",
    "name": "Slow-Braised Beef Barbacoa Soft Tacos (3 pcs)",
    "category": "Street Tacos",
    "price": 369,
    "discountPrice": 329,
    "rating": 4.6,
    "reviewsCount": 150,
    "isVeg": false,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80",
    "description": "Tender shredded brisket slow-cooked with chipotle and Mexican spices, served on warm corn tortillas with diced onions, cilantro, and salsa roja.",
    "prepTime": "18 mins",
    "available": true
  },
  {
    "id": "dish-363",
    "restaurantId": "rest-9",
    "name": "Crispy Baja California Fish Tacos (3 pcs)",
    "category": "Street Tacos",
    "price": 359,
    "discountPrice": 319,
    "rating": 4.7,
    "reviewsCount": 215,
    "isVeg": false,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80",
    "description": "Beer-battered crispy white fish fillets, crunchy cabbage slaw, pico de gallo, and creamy chipotle lime crema in grilled tortillas.",
    "prepTime": "16 mins",
    "available": true
  },
  {
    "id": "dish-364",
    "restaurantId": "rest-9",
    "name": "Charred Chipotle Mushroom & Black Bean Tacos (3 pcs)",
    "category": "Street Tacos",
    "price": 299,
    "discountPrice": 269,
    "rating": 4.8,
    "reviewsCount": 280,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80",
    "description": "Smoky seasoned button mushrooms, slow-cooked black beans, sweet corn relish, cotija cheese, and tomatillo verde salsa.",
    "prepTime": "14 mins",
    "available": true
  },
  {
    "id": "dish-365",
    "restaurantId": "rest-9",
    "name": "Four-Cheese & Charred Jalapeno Quesadilla",
    "category": "Nachos & Quesadillas",
    "price": 299,
    "discountPrice": 269,
    "rating": 4.6,
    "reviewsCount": 150,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1618040996337-56904b7850b9?auto=format&fit=crop&w=600&q=80",
    "description": "Toasted flour tortilla loaded with Monterey Jack, mozzarella, cheddar, and queso fresco with fire-roasted spicy jalapeños.",
    "prepTime": "14 mins",
    "available": true
  },
  {
    "id": "dish-366",
    "restaurantId": "rest-9",
    "name": "BBQ Pulled Chicken Loaded Sheet-Pan Nachos",
    "category": "Nachos & Quesadillas",
    "price": 349,
    "discountPrice": 309,
    "rating": 4.7,
    "reviewsCount": 215,
    "isVeg": false,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1618040996337-56904b7850b9?auto=format&fit=crop&w=600&q=80",
    "description": "Crispy stone-ground tortilla chips piled high with smoky pulled chicken, warm queso, black beans, guacamole, and salsa.",
    "prepTime": "16 mins",
    "available": true
  },
  {
    "id": "dish-367",
    "restaurantId": "rest-9",
    "name": "Spinach, Roasted Corn & Pepper Jack Quesadilla",
    "category": "Nachos & Quesadillas",
    "price": 289,
    "discountPrice": 249,
    "rating": 4.8,
    "reviewsCount": 280,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1618040996337-56904b7850b9?auto=format&fit=crop&w=600&q=80",
    "description": "Griddled golden tortilla stuffed with seasoned baby spinach, sweet charred corn, black beans, and spicy pepper jack cheese.",
    "prepTime": "14 mins",
    "available": true
  },
  {
    "id": "dish-368",
    "restaurantId": "rest-9",
    "name": "Mission-Style Carnitas Pork Burrito",
    "category": "Burritos & Bowls",
    "price": 389,
    "discountPrice": 349,
    "rating": 4.6,
    "reviewsCount": 150,
    "isVeg": false,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80",
    "description": "Slow-cooked citrus braised pork, Mexican cilantro lime rice, pinto beans, melted cheese, sour cream, and salsa wrapped in a giant flour tortilla.",
    "prepTime": "18 mins",
    "available": true
  },
  {
    "id": "dish-369",
    "restaurantId": "rest-9",
    "name": "Chipotle Lime Grilled Shrimp Fiesta Bowl",
    "category": "Burritos & Bowls",
    "price": 419,
    "discountPrice": 379,
    "rating": 4.7,
    "reviewsCount": 215,
    "isVeg": false,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80",
    "description": "Charred wild prawns over brown rice, roasted fajita bell peppers, black beans, sweet mango salsa, and fresh avocado slices.",
    "prepTime": "18 mins",
    "available": true
  },
  {
    "id": "dish-370",
    "restaurantId": "rest-9",
    "name": "Smoky Fajita Veggie & Guacamole Burrito",
    "category": "Burritos & Bowls",
    "price": 319,
    "discountPrice": 289,
    "rating": 4.8,
    "reviewsCount": 280,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80",
    "description": "Sizzling bell peppers, red onions, seasoned black beans, Mexican rice, shredded Monterey Jack, and house-made guacamole.",
    "prepTime": "16 mins",
    "available": true
  },
  {
    "id": "dish-371",
    "restaurantId": "rest-9",
    "name": "Cinnamon Sugar Churros with Dulce de Leche (4 pcs)",
    "category": "Sweets & Sips",
    "price": 199,
    "discountPrice": 169,
    "rating": 4.6,
    "reviewsCount": 150,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80",
    "description": "Fresh extruded Spanish doughnuts fried crisp, dusted in fragrant Mexican canela cinnamon and sugar, served with warm caramel dip.",
    "prepTime": "12 mins",
    "available": true
  },
  {
    "id": "dish-372",
    "restaurantId": "rest-9",
    "name": "Classic Tres Leches Vanilla Sponge Cake",
    "category": "Sweets & Sips",
    "price": 229,
    "discountPrice": 199,
    "rating": 4.7,
    "reviewsCount": 215,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=600&q=80",
    "description": "Light sponge cake soaked overnight in an authentic three-milk mixture of evaporated milk, condensed milk, and heavy cream, topped with cinnamon.",
    "prepTime": "8 mins",
    "available": true
  },
  {
    "id": "dish-373",
    "restaurantId": "rest-9",
    "name": "Authentic Horchata Spiced Cinnamon Rice Milk",
    "category": "Sweets & Sips",
    "price": 149,
    "discountPrice": 129,
    "rating": 4.8,
    "reviewsCount": 280,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80",
    "description": "Traditional Mexican cooling beverage made from soaked ground rice, almond milk, Mexican cinnamon, vanilla, and crushed ice.",
    "prepTime": "5 mins",
    "available": true
  },
  {
    "id": "dish-374",
    "restaurantId": "rest-10",
    "name": "Mysore Special Benne Khara Masala Dosa",
    "category": "Ghee & Butter Dosas",
    "price": 189,
    "discountPrice": 159,
    "rating": 4.6,
    "reviewsCount": 150,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=80",
    "description": "Thick and spongy inside, golden crispy outside roasted in white butter (benne), smeared with spicy Mysore garlic red paste and potato mash.",
    "prepTime": "14 mins",
    "available": true
  },
  {
    "id": "dish-375",
    "restaurantId": "rest-10",
    "name": "Crispy Rava Onion Coriander Roast Dosa",
    "category": "Ghee & Butter Dosas",
    "price": 169,
    "discountPrice": 139,
    "rating": 4.7,
    "reviewsCount": 215,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=80",
    "description": "Lacy semolina crepe studded with finely chopped shallots, green chilies, cumin seeds, and fresh coriander, roasted crisp.",
    "prepTime": "15 mins",
    "available": true
  },
  {
    "id": "dish-376",
    "restaurantId": "rest-10",
    "name": "Crispy Onion Medu Vada Sambar Dip (2 pcs)",
    "category": "Tiffin & Vadas",
    "price": 129,
    "discountPrice": 109,
    "rating": 4.6,
    "reviewsCount": 150,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80",
    "description": "Crunchy golden fried urad dal donuts served submerged in piping hot spiced drumstick vegetable sambar.",
    "prepTime": "10 mins",
    "available": true
  },
  {
    "id": "dish-377",
    "restaurantId": "rest-10",
    "name": "Karnataka Rava Upma Loaded with Cashews & Ghee",
    "category": "Tiffin & Vadas",
    "price": 119,
    "discountPrice": 99,
    "rating": 4.7,
    "reviewsCount": 215,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80",
    "description": "Roasted semolina cooked with mustard seeds, ginger, curry leaves, carrots, green peas, and whole golden cashews in pure cow ghee.",
    "prepTime": "12 mins",
    "available": true
  },
  {
    "id": "dish-378",
    "restaurantId": "rest-10",
    "name": "Batata Poha with Roasted Peanuts & Lemon",
    "category": "Tiffin & Vadas",
    "price": 109,
    "discountPrice": 89,
    "rating": 4.8,
    "reviewsCount": 280,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80",
    "description": "Flattened rice flakes tempered with mustard, turmeric, soft potatoes, crunchy peanuts, fresh grated coconut, and lemon.",
    "prepTime": "10 mins",
    "available": true
  },
  {
    "id": "dish-379",
    "restaurantId": "rest-10",
    "name": "Karnataka Vangi Bath (Spiced Brinjal Rice)",
    "category": "Traditional Meals",
    "price": 179,
    "discountPrice": 149,
    "rating": 4.6,
    "reviewsCount": 150,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
    "description": "Fragrant rice tossed with tender baby eggplants and house-ground Vangi Bath masala of roasted lentils, dry coconut, and cinnamon.",
    "prepTime": "14 mins",
    "available": true
  },
  {
    "id": "dish-380",
    "restaurantId": "rest-10",
    "name": "South Indian Lemon Rice with Crunchy Chana Dal",
    "category": "Traditional Meals",
    "price": 149,
    "discountPrice": 129,
    "rating": 4.7,
    "reviewsCount": 215,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80",
    "description": "Tempered turmeric rice flavored with freshly squeezed lemon juice, green chilies, ginger, curry leaves, and crunchy split lentils.",
    "prepTime": "12 mins",
    "available": true
  },
  {
    "id": "dish-381",
    "restaurantId": "rest-10",
    "name": "Mangalore Neer Dosa with Veg Gassi (3 pcs)",
    "category": "Traditional Meals",
    "price": 199,
    "discountPrice": 169,
    "rating": 4.8,
    "reviewsCount": 280,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?auto=format&fit=crop&w=600&q=80",
    "description": "Delicate paper-thin lace crepes made with unfermented rice batter, accompanied by traditional coconut vegetable gassi curry.",
    "prepTime": "15 mins",
    "available": true
  },
  {
    "id": "dish-382",
    "restaurantId": "rest-10",
    "name": "Pure Ghee Badam Halwa Cup (150g)",
    "category": "Sweets & Filter Kaapi",
    "price": 199,
    "discountPrice": 169,
    "rating": 4.6,
    "reviewsCount": 150,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80",
    "description": "Rich and decadent pudding made from blanched California almonds ground and slow-stirred with milk, sugar, and generous cow ghee.",
    "prepTime": "6 mins",
    "available": true
  },
  {
    "id": "dish-383",
    "restaurantId": "rest-10",
    "name": "Kasi Halwa (Ash Gourd Dumrot Sweet)",
    "category": "Sweets & Filter Kaapi",
    "price": 159,
    "discountPrice": 139,
    "rating": 4.7,
    "reviewsCount": 215,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1571867424488-4565932edb41?auto=format&fit=crop&w=600&q=80",
    "description": "Traditional wedding banquet sweet prepared from grated winter melon, ghee, saffron, and roasted cashew nuts.",
    "prepTime": "8 mins",
    "available": true
  },
  {
    "id": "dish-384",
    "restaurantId": "rest-10",
    "name": "Rava Kesari with Saffron & Golden Raisins",
    "category": "Sweets & Filter Kaapi",
    "price": 129,
    "discountPrice": 109,
    "rating": 4.8,
    "reviewsCount": 280,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
    "description": "Mouth-watering semolina dessert cooked in pure ghee, flavored with natural saffron, crushed green cardamom, and golden raisins.",
    "prepTime": "8 mins",
    "available": true
  },
  {
    "id": "dish-385",
    "restaurantId": "rest-10",
    "name": "Sukku Malli Herbal Spiced Filter Coffee",
    "category": "Sweets & Filter Kaapi",
    "price": 89,
    "discountPrice": 75,
    "rating": 4.9,
    "reviewsCount": 345,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80",
    "description": "Traditional medicinal decoction made with dry ginger (sukku), coriander seeds (malli), and jaggery, topped with foamy boiled milk.",
    "prepTime": "6 mins",
    "available": true
  },
  {
    "id": "dish-386",
    "restaurantId": "rest-11",
    "name": "Paneer Pyaz Stuffed Chur Chur Kulcha",
    "category": "Amritsari Kulchas",
    "price": 199,
    "discountPrice": 169,
    "rating": 4.6,
    "reviewsCount": 150,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=600&q=80",
    "description": "Crushed flaky tandoori flatbread stuffed with spiced cottage cheese and onions, served with spicy Chole, butter, and tamarind chutney.",
    "prepTime": "16 mins",
    "available": true
  },
  {
    "id": "dish-387",
    "restaurantId": "rest-11",
    "name": "Gobhi Methi Spiced Amritsari Kulcha",
    "category": "Amritsari Kulchas",
    "price": 179,
    "discountPrice": 149,
    "rating": 4.7,
    "reviewsCount": 215,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=600&q=80",
    "description": "Crispy clay-oven baked bread stuffed with grated spiced cauliflower, fresh fenugreek leaves, and ajwain.",
    "prepTime": "15 mins",
    "available": true
  },
  {
    "id": "dish-388",
    "restaurantId": "rest-11",
    "name": "Pind Special Mixed Vegetable Chur Chur Kulcha",
    "category": "Amritsari Kulchas",
    "price": 199,
    "discountPrice": 169,
    "rating": 4.8,
    "reviewsCount": 280,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=600&q=80",
    "description": "Stuffed with potatoes, paneer, onions, and cauliflower, baked crisp in tandoor and crushed with melting white desi makhan.",
    "prepTime": "16 mins",
    "available": true
  },
  {
    "id": "dish-389",
    "restaurantId": "rest-11",
    "name": "Authentic Pindi Chole Masala with Green Chilies",
    "category": "Dhaba Curries",
    "price": 279,
    "discountPrice": 249,
    "rating": 4.6,
    "reviewsCount": 150,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80",
    "description": "Dark spiced chickpeas cooked without onion or garlic in an iron vessel with pomegranate seeds, dry amla, and carom seeds.",
    "prepTime": "18 mins",
    "available": true
  },
  {
    "id": "dish-390",
    "restaurantId": "rest-11",
    "name": "Kadhai Paneer with Crushed Coriander & Peppers",
    "category": "Dhaba Curries",
    "price": 329,
    "discountPrice": 289,
    "rating": 4.7,
    "reviewsCount": 215,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=600&q=80",
    "description": "Cottage cheese batons stir-fried with thick capsicum chunks and whole roasted spices in a rustic tomato-onion gravy.",
    "prepTime": "18 mins",
    "available": true
  },
  {
    "id": "dish-391",
    "restaurantId": "rest-11",
    "name": "Makki Di Roti with Desi Makhan (2 pcs)",
    "category": "Breads & Rice",
    "price": 89,
    "discountPrice": 75,
    "rating": 4.6,
    "reviewsCount": 150,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=600&q=80",
    "description": "Rustic yellow cornmeal flatbreads hand-patted and roasted on tawa, topped with fresh homemade white butter.",
    "prepTime": "12 mins",
    "available": true
  },
  {
    "id": "dish-392",
    "restaurantId": "rest-11",
    "name": "Garlic Butter Laccha Paratha",
    "category": "Breads & Rice",
    "price": 79,
    "discountPrice": 69,
    "rating": 4.7,
    "reviewsCount": 215,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=600&q=80",
    "description": "Multi-layered whole wheat spiral flatbread roasted in tandoor and brushed with roasted garlic butter.",
    "prepTime": "10 mins",
    "available": true
  },
  {
    "id": "dish-393",
    "restaurantId": "rest-11",
    "name": "Tandoori Roti with Desi Ghee (2 pcs)",
    "category": "Breads & Rice",
    "price": 49,
    "discountPrice": 39,
    "rating": 4.8,
    "reviewsCount": 280,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=600&q=80",
    "description": "Whole wheat roundels baked in clay oven and brushed with pure desi cow ghee.",
    "prepTime": "8 mins",
    "available": true
  },
  {
    "id": "dish-394",
    "restaurantId": "rest-11",
    "name": "Fragrant Jeera Matar Pulao",
    "category": "Breads & Rice",
    "price": 179,
    "discountPrice": 149,
    "rating": 4.9,
    "reviewsCount": 345,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=600&q=80",
    "description": "Steamed basmati rice tempered with whole cumin seeds, green cardamom, and tender sweet green peas.",
    "prepTime": "14 mins",
    "available": true
  },
  {
    "id": "dish-395",
    "restaurantId": "rest-11",
    "name": "Kashmiri Sweet Dry Fruit Pulao",
    "category": "Breads & Rice",
    "price": 249,
    "discountPrice": 219,
    "rating": 4.6,
    "reviewsCount": 410,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=600&q=80",
    "description": "Fragrant saffron basmati rice tossed with fried cashews, almonds, raisins, and garnished with fresh pomegranate pearls.",
    "prepTime": "16 mins",
    "available": true
  },
  {
    "id": "dish-396",
    "restaurantId": "rest-11",
    "name": "Malai Rabdi Jalebi Plate (200g)",
    "category": "Sweets & Lassi",
    "price": 189,
    "discountPrice": 159,
    "rating": 4.6,
    "reviewsCount": 150,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80",
    "description": "Crispy piping-hot saffron jalebi spirals served with chilled, thickened cardamon-infused malai rabdi.",
    "prepTime": "10 mins",
    "available": true
  },
  {
    "id": "dish-397",
    "restaurantId": "rest-11",
    "name": "Mawa Stuffed Gulab Jamun (2 pcs)",
    "category": "Sweets & Lassi",
    "price": 119,
    "discountPrice": 99,
    "rating": 4.7,
    "reviewsCount": 215,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80",
    "description": "Soft golden khoya dumplings stuffed with pistachios and cardamom, soaked in rose and saffron sugar syrup.",
    "prepTime": "6 mins",
    "available": true
  },
  {
    "id": "dish-398",
    "restaurantId": "rest-11",
    "name": "Amritsari Kesar Dry Fruit Malai Lassi",
    "category": "Sweets & Lassi",
    "price": 149,
    "discountPrice": 129,
    "rating": 4.8,
    "reviewsCount": 280,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80",
    "description": "Traditional churned thick sweet yogurt drink topped with a thick layer of fresh malai, saffron syrup, and sliced almonds.",
    "prepTime": "6 mins",
    "available": true
  },
  {
    "id": "dish-399",
    "restaurantId": "rest-11",
    "name": "Desi Ghee Moong Dal Halwa (150g)",
    "category": "Sweets & Lassi",
    "price": 179,
    "discountPrice": 149,
    "rating": 4.9,
    "reviewsCount": 345,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80",
    "description": "Classic winter delicacy made by slow roasting split yellow lentils in pure desi ghee, sugar, and milk.",
    "prepTime": "8 mins",
    "available": true
  },
  {
    "id": "dish-400",
    "restaurantId": "rest-12",
    "name": "Cheese Burst Amul Butter Pav Bhaji",
    "category": "Pav Bhaji & Vada Pav",
    "price": 219,
    "discountPrice": 189,
    "rating": 4.6,
    "reviewsCount": 150,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=600&q=80",
    "description": "Slow-mashed spiced vegetable bhaji simmered in Amul butter on an iron tawa, topped with a thick blanket of molten cheese, served with 2 buttery pavs.",
    "prepTime": "15 mins",
    "available": true
  },
  {
    "id": "dish-401",
    "restaurantId": "rest-12",
    "name": "Schezwan Spicy Crispy Vada Pav",
    "category": "Pav Bhaji & Vada Pav",
    "price": 79,
    "discountPrice": 65,
    "rating": 4.7,
    "reviewsCount": 215,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=600&q=80",
    "description": "Mumbai potato vada smeared with fiery Schezwan chili garlic chutney and green mint sauce inside butter-toasted pav.",
    "prepTime": "10 mins",
    "available": true
  },
  {
    "id": "dish-402",
    "restaurantId": "rest-12",
    "name": "Kolhapuri Misal Pav with Fiery Farsan & Lemon",
    "category": "Pav Bhaji & Vada Pav",
    "price": 169,
    "discountPrice": 139,
    "rating": 4.8,
    "reviewsCount": 280,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=600&q=80",
    "description": "Sprouted moth bean curry in a spicy red chili 'tarri' broth, topped with crunchy farsan, diced onions, and lemon, with 2 pavs.",
    "prepTime": "12 mins",
    "available": true
  },
  {
    "id": "dish-403",
    "restaurantId": "rest-12",
    "name": "Ulta Vada Pav (Upside Down Battered)",
    "category": "Pav Bhaji & Vada Pav",
    "price": 89,
    "discountPrice": 75,
    "rating": 4.9,
    "reviewsCount": 345,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=600&q=80",
    "description": "Pav stuffed with spicy potato mash, coated completely in spiced chickpea batter and deep-fried golden crisp.",
    "prepTime": "12 mins",
    "available": true
  },
  {
    "id": "dish-404",
    "restaurantId": "rest-12",
    "name": "Dahi Batata Puri with Chilled Sweet Curd (6 pcs)",
    "category": "Crispy Chaat Specialties",
    "price": 139,
    "discountPrice": 119,
    "rating": 4.6,
    "reviewsCount": 150,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80",
    "description": "Crisp puffed puris stuffed with boiled potatoes and sprouts, drenched in sweet whipped curd, tamarind chutney, and fine sev.",
    "prepTime": "8 mins",
    "available": true
  },
  {
    "id": "dish-405",
    "restaurantId": "rest-12",
    "name": "Sev Puri Loaded with Raw Mango & Chutneys",
    "category": "Crispy Chaat Specialties",
    "price": 129,
    "discountPrice": 109,
    "rating": 4.7,
    "reviewsCount": 215,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1781243680771-1fea4521e196?auto=format&fit=crop&w=600&q=80",
    "description": "Crispy flat papdis topped with diced potatoes, onions, raw green mango slivers, three spicy chutneys, and nylon sev.",
    "prepTime": "8 mins",
    "available": true
  },
  {
    "id": "dish-406",
    "restaurantId": "rest-12",
    "name": "Bombay Sukha Bhel with Salted Peanuts",
    "category": "Crispy Chaat Specialties",
    "price": 119,
    "discountPrice": 99,
    "rating": 4.8,
    "reviewsCount": 280,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80",
    "description": "Dry puffed rice mixed with roasted peanuts, crushed papdi, boiled potatoes, chopped onions, green chilies, and dry garlic chutney.",
    "prepTime": "8 mins",
    "available": true
  },
  {
    "id": "dish-407",
    "restaurantId": "rest-12",
    "name": "Mumbai Masala Toast Sandwich (Grilled)",
    "category": "Hot Street Snacks",
    "price": 149,
    "discountPrice": 129,
    "rating": 4.6,
    "reviewsCount": 150,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80",
    "description": "Layered with spicy boiled potato mash, sliced beetroot, cucumber, tomato, green chutney, and grilled crispy with Amul butter.",
    "prepTime": "12 mins",
    "available": true
  },
  {
    "id": "dish-408",
    "restaurantId": "rest-12",
    "name": "Bombay Vegetable Franky Roll",
    "category": "Hot Street Snacks",
    "price": 139,
    "discountPrice": 119,
    "rating": 4.7,
    "reviewsCount": 215,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80",
    "description": "Roti wrap filled with spiced potato cutlet, chopped onions, tangy Franky masala powder, and green chili vinegar.",
    "prepTime": "12 mins",
    "available": true
  },
  {
    "id": "dish-409",
    "restaurantId": "rest-12",
    "name": "Cheese Chili Garlic Toast (4 pcs)",
    "category": "Hot Street Snacks",
    "price": 149,
    "discountPrice": 129,
    "rating": 4.8,
    "reviewsCount": 280,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80",
    "description": "Thick bread slices topped with minced garlic butter, spicy green chilies, and generous melted cheese, toasted crunchy.",
    "prepTime": "10 mins",
    "available": true
  },
  {
    "id": "dish-410",
    "restaurantId": "rest-12",
    "name": "Paneer Tikka Frankie Kathi Roll",
    "category": "Hot Street Snacks",
    "price": 179,
    "discountPrice": 149,
    "rating": 4.9,
    "reviewsCount": 345,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80",
    "description": "Grilled cottage cheese cubes wrapped in flaky paratha with sliced capsicum, pickled red onions, and mint chutney.",
    "prepTime": "14 mins",
    "available": true
  },
  {
    "id": "dish-411",
    "restaurantId": "rest-12",
    "name": "Kanda Bhajiya (Crispy Onion Pakoda Plate)",
    "category": "Hot Street Snacks",
    "price": 119,
    "discountPrice": 99,
    "rating": 4.6,
    "reviewsCount": 410,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80",
    "description": "Thinly sliced red onions coated in seasoned gram flour batter, deep-fried crunchy, served with fried green chilies.",
    "prepTime": "12 mins",
    "available": true
  },
  {
    "id": "dish-412",
    "restaurantId": "rest-12",
    "name": "Mumbai Cutting Masala Chai Flask (Serves 2)",
    "category": "Street Shakes & Tea",
    "price": 99,
    "discountPrice": 79,
    "rating": 4.6,
    "reviewsCount": 150,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80",
    "description": "Strong Assam tea brewed with whole milk, crushed ginger, green cardamom, black pepper, and cinnamon, served in a thermal flask.",
    "prepTime": "8 mins",
    "available": true
  },
  {
    "id": "dish-413",
    "restaurantId": "rest-12",
    "name": "Royal Bombay Falooda with Sabja & Ice Cream",
    "category": "Street Shakes & Tea",
    "price": 179,
    "discountPrice": 149,
    "rating": 4.7,
    "reviewsCount": 215,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80",
    "description": "Chilled rose milk layered with falooda sev, sweet basil seeds (sabja), rose syrup, and topped with rich vanilla ice cream.",
    "prepTime": "8 mins",
    "available": true
  },
  {
    "id": "dish-414",
    "restaurantId": "rest-12",
    "name": "Chowpatty Kala Khatta Crushed Ice Chuski",
    "category": "Street Shakes & Tea",
    "price": 99,
    "discountPrice": 79,
    "rating": 4.8,
    "reviewsCount": 280,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80",
    "description": "Shaved ice on a stick dipped in tangy black currant kala khatta syrup, rock salt, and fresh lemon juice.",
    "prepTime": "5 mins",
    "available": true
  },
  {
    "id": "dish-415",
    "restaurantId": "rest-12",
    "name": "Kesariya Badam Chilled Milk Bottle",
    "category": "Street Shakes & Tea",
    "price": 129,
    "discountPrice": 109,
    "rating": 4.9,
    "reviewsCount": 345,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80",
    "description": "Slow-simmered whole milk infused with crushed almond paste, saffron strands, and green cardamom, served chilled.",
    "prepTime": "5 mins",
    "available": true
  },
  {
    "id": "dish-416",
    "restaurantId": "rest-13",
    "name": "Peri Peri Spicy Charcoal Chicken Shawarma",
    "category": "Rotisserie Shawarmas",
    "price": 199,
    "discountPrice": 169,
    "rating": 4.6,
    "reviewsCount": 150,
    "isVeg": false,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=600&q=80",
    "description": "Juicy rotisserie chicken strips tossed in African bird's eye chili Peri Peri glaze, rolled in fresh rumali with toum garlic sauce.",
    "prepTime": "12 mins",
    "available": true
  },
  {
    "id": "dish-417",
    "restaurantId": "rest-13",
    "name": "Crispy Falafel Hummus Tahini Shawarma",
    "category": "Rotisserie Shawarmas",
    "price": 169,
    "discountPrice": 139,
    "rating": 4.7,
    "reviewsCount": 215,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=600&q=80",
    "description": "Freshly fried chickpea falafels, creamy hummus, pickled cucumbers, shredded lettuce, and nutty tahini in soft flatbread.",
    "prepTime": "12 mins",
    "available": true
  },
  {
    "id": "dish-418",
    "restaurantId": "rest-13",
    "name": "Open Deconstructed Shawarma Platter",
    "category": "Rotisserie Shawarmas",
    "price": 289,
    "discountPrice": 249,
    "rating": 4.8,
    "reviewsCount": 280,
    "isVeg": false,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=600&q=80",
    "description": "Generous mound of seasoned rotisserie chicken served with 2 warm pitas, pickled pink turnips, french fries, and creamy toum dip.",
    "prepTime": "15 mins",
    "available": true
  },
  {
    "id": "dish-419",
    "restaurantId": "rest-13",
    "name": "Cheesy Melted Jalapeno Chicken Shawarma",
    "category": "Rotisserie Shawarmas",
    "price": 219,
    "discountPrice": 189,
    "rating": 4.9,
    "reviewsCount": 345,
    "isVeg": false,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=600&q=80",
    "description": "Spit-roasted chicken folded with melted cheddar cheese sauce, pickled jalapenos, and French fries inside toasted bread.",
    "prepTime": "14 mins",
    "available": true
  },
  {
    "id": "dish-420",
    "restaurantId": "rest-13",
    "name": "Charcoal Grilled Shish Tawook Skewers (4 pcs)",
    "category": "Arabian Charcoal Grills",
    "price": 349,
    "discountPrice": 309,
    "rating": 4.6,
    "reviewsCount": 150,
    "isVeg": false,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80",
    "description": "Tender boneless chicken cubes marinated in yogurt, lemon juice, tomato paste, garlic, and Lebanese 7-spices, grilled over charcoal.",
    "prepTime": "18 mins",
    "available": true
  },
  {
    "id": "dish-421",
    "restaurantId": "rest-13",
    "name": "Arabic Lamb Kofta Kebab with Spiced Rice",
    "category": "Arabian Charcoal Grills",
    "price": 429,
    "discountPrice": 389,
    "rating": 4.7,
    "reviewsCount": 215,
    "isVeg": false,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80",
    "description": "Minced lamb kebabs spiced with sumac, parsley, and onions on skewers, served with fragrant golden Mandi rice.",
    "prepTime": "20 mins",
    "available": true
  },
  {
    "id": "dish-422",
    "restaurantId": "rest-13",
    "name": "Garlic Lemon Charred Baby Chicken (Quarter)",
    "category": "Arabian Charcoal Grills",
    "price": 299,
    "discountPrice": 269,
    "rating": 4.8,
    "reviewsCount": 280,
    "isVeg": false,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80",
    "description": "Bone-in young chicken marinated in garlic puree, olive oil, and dried oregano, flame-kissed on charcoal grill.",
    "prepTime": "20 mins",
    "available": true
  },
  {
    "id": "dish-423",
    "restaurantId": "rest-13",
    "name": "Grilled Halloumi Cheese Skewers with Mint",
    "category": "Arabian Charcoal Grills",
    "price": 329,
    "discountPrice": 289,
    "rating": 4.9,
    "reviewsCount": 345,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80",
    "description": "Thick slabs of Cypriot halloumi cheese grilled to golden grill marks, brushed with za'atar herb oil and fresh mint.",
    "prepTime": "15 mins",
    "available": true
  },
  {
    "id": "dish-424",
    "restaurantId": "rest-13",
    "name": "Creamy Traditional Hummus with Olive Oil & Pita",
    "category": "Mezze & Sides",
    "price": 199,
    "discountPrice": 169,
    "rating": 4.6,
    "reviewsCount": 150,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
    "description": "Ultra-smooth chickpea puree blended with tahini, garlic, and fresh lemon juice, drizzled with Spanish olive oil, served with warm pita.",
    "prepTime": "8 mins",
    "available": true
  },
  {
    "id": "dish-425",
    "restaurantId": "rest-13",
    "name": "Smoky Moutabal Roasted Eggplant Dip",
    "category": "Mezze & Sides",
    "price": 219,
    "discountPrice": 189,
    "rating": 4.7,
    "reviewsCount": 215,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1637949385162-e416fb15b2ce?auto=format&fit=crop&w=600&q=80",
    "description": "Fire-roasted whole eggplants mashed with tahini, garlic, yogurt, and pomegranate seeds with warm flatbread.",
    "prepTime": "10 mins",
    "available": true
  },
  {
    "id": "dish-426",
    "restaurantId": "rest-13",
    "name": "Crispy Lebanese Golden Falafel (6 pcs)",
    "category": "Mezze & Sides",
    "price": 169,
    "discountPrice": 139,
    "rating": 4.8,
    "reviewsCount": 280,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
    "description": "Ground chickpea, parsley, cilantro, and garlic balls fried golden and crispy, accompanied by garlic tahini dip.",
    "prepTime": "12 mins",
    "available": true
  },
  {
    "id": "dish-427",
    "restaurantId": "rest-13",
    "name": "Fattoush Salad with Crispy Sumac Pita Chips",
    "category": "Mezze & Sides",
    "price": 189,
    "discountPrice": 159,
    "rating": 4.9,
    "reviewsCount": 345,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1637949385162-e416fb15b2ce?auto=format&fit=crop&w=600&q=80",
    "description": "Crisp romaine, radishes, cucumbers, and tomatoes tossed in pomegranate molasses dressing with toasted za'atar pita croutons.",
    "prepTime": "10 mins",
    "available": true
  },
  {
    "id": "dish-428",
    "restaurantId": "rest-13",
    "name": "Tabbouleh Fresh Parsley & Cracked Wheat Salad",
    "category": "Mezze & Sides",
    "price": 179,
    "discountPrice": 149,
    "rating": 4.6,
    "reviewsCount": 410,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
    "description": "Finely chopped flat-leaf parsley, mint, diced ripe tomatoes, bulgur wheat, and lemon olive oil dressing.",
    "prepTime": "10 mins",
    "available": true
  },
  {
    "id": "dish-429",
    "restaurantId": "rest-13",
    "name": "Pistachio Filled Crisp Baklava Diamonds (2 pcs)",
    "category": "Middle Eastern Sweets",
    "price": 199,
    "discountPrice": 169,
    "rating": 4.6,
    "reviewsCount": 150,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1676014959543-81df1079b423?auto=format&fit=crop&w=600&q=80",
    "description": "Forty paper-thin layers of flaky buttered filo pastry packed with crushed Turkish pistachios and fragrant orange blossom syrup.",
    "prepTime": "8 mins",
    "available": true
  },
  {
    "id": "dish-430",
    "restaurantId": "rest-13",
    "name": "Warm Cheese Kunafa with Rose Sugar Syrup",
    "category": "Middle Eastern Sweets",
    "price": 269,
    "discountPrice": 229,
    "rating": 4.7,
    "reviewsCount": 215,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1741424605439-9b3b0f54d755?auto=format&fit=crop&w=600&q=80",
    "description": "Crisp shredded kataifi filo dough baked over molten sweet akkawi cheese, soaked in hot rose water syrup with crushed pistachios.",
    "prepTime": "14 mins",
    "available": true
  },
  {
    "id": "dish-431",
    "restaurantId": "rest-13",
    "name": "Umm Ali Egyptian Baked Sweet Bread Pudding",
    "category": "Middle Eastern Sweets",
    "price": 229,
    "discountPrice": 199,
    "rating": 4.8,
    "reviewsCount": 280,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1676014959543-81df1079b423?auto=format&fit=crop&w=600&q=80",
    "description": "Warm baked puff pastry pudding soaked in sweetened milk, cream, coconut flakes, raisins, and roasted pine nuts.",
    "prepTime": "15 mins",
    "available": true
  },
  {
    "id": "dish-432",
    "restaurantId": "rest-13",
    "name": "Turkish Delight Assortment Box (4 pcs)",
    "category": "Middle Eastern Sweets",
    "price": 169,
    "discountPrice": 139,
    "rating": 4.9,
    "reviewsCount": 345,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1741424605439-9b3b0f54d755?auto=format&fit=crop&w=600&q=80",
    "description": "Chewy Ottoman confection cubes in rose, pomegranate, and pistachio flavors, dusted in powdered sugar.",
    "prepTime": "6 mins",
    "available": true
  },
  {
    "id": "dish-433",
    "restaurantId": "rest-13",
    "name": "Refreshing Mint Limonana Cooler",
    "category": "Middle Eastern Sweets",
    "price": 129,
    "discountPrice": 109,
    "rating": 4.6,
    "reviewsCount": 410,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1676014959543-81df1079b423?auto=format&fit=crop&w=600&q=80",
    "description": "Iced Middle Eastern frozen lemonade blended with abundant fresh spearmint leaves and pure cane sugar.",
    "prepTime": "5 mins",
    "available": true
  },
  {
    "id": "dish-434",
    "restaurantId": "rest-14",
    "name": "Mangalorean Rava Fried Anjal (King Fish)",
    "category": "Coastal Seafood Starters",
    "price": 449,
    "discountPrice": 399,
    "rating": 4.6,
    "reviewsCount": 150,
    "isVeg": false,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1535400255456-984241443b29?auto=format&fit=crop&w=600&q=80",
    "description": "Fresh king fish steaks coated in Byadgi chili garlic paste, semolina crusted, and shallow pan-fried on coconut oil.",
    "prepTime": "18 mins",
    "available": true
  },
  {
    "id": "dish-435",
    "restaurantId": "rest-14",
    "name": "Golden Calamari Squid Pepper Fry",
    "category": "Coastal Seafood Starters",
    "price": 369,
    "discountPrice": 329,
    "rating": 4.7,
    "reviewsCount": 215,
    "isVeg": false,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1535400255456-984241443b29?auto=format&fit=crop&w=600&q=80",
    "description": "Tender fresh squid rings flash-tossed with curry leaves, cracked black pepper, caramelized shallots, and crushed fennel.",
    "prepTime": "16 mins",
    "available": true
  },
  {
    "id": "dish-436",
    "restaurantId": "rest-14",
    "name": "Authentic Goan Prawn Curry with Kokum",
    "category": "Coastal Curries",
    "price": 429,
    "discountPrice": 389,
    "rating": 4.6,
    "reviewsCount": 150,
    "isVeg": false,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1535400255456-984241443b29?auto=format&fit=crop&w=600&q=80",
    "description": "Fresh sea prawns simmered in a creamy ground coconut, Kashmiri chili, coriander, and sour kokum berry gravy.",
    "prepTime": "20 mins",
    "available": true
  },
  {
    "id": "dish-437",
    "restaurantId": "rest-14",
    "name": "Malabar Meen Fish Curry in Claypot",
    "category": "Coastal Curries",
    "price": 399,
    "discountPrice": 359,
    "rating": 4.7,
    "reviewsCount": 215,
    "isVeg": false,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80",
    "description": "Seer fish fillets cooked in traditional Kerala clay pot with thick coconut milk, Kudampuli (pot tamarind), and fenugreek.",
    "prepTime": "22 mins",
    "available": true
  },
  {
    "id": "dish-438",
    "restaurantId": "rest-14",
    "name": "Chettinad Spicy Crab Masala Roast",
    "category": "Coastal Curries",
    "price": 489,
    "discountPrice": 439,
    "rating": 4.8,
    "reviewsCount": 280,
    "isVeg": false,
    "isBestseller": false,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1535400255456-984241443b29?auto=format&fit=crop&w=600&q=80",
    "description": "Fresh blue swimmer crab cooked in an aromatic gravy of roasted dry spices, black pepper, shallots, and curry leaves.",
    "prepTime": "25 mins",
    "available": true
  },
  {
    "id": "dish-439",
    "restaurantId": "rest-14",
    "name": "Kerala Style Raw Mango Vegetable Curry",
    "category": "Coastal Curries",
    "price": 279,
    "discountPrice": 249,
    "rating": 4.9,
    "reviewsCount": 345,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80",
    "description": "Seasonal raw green mangoes, drumsticks, and carrots simmered in ground coconut and turmeric gravy.",
    "prepTime": "18 mins",
    "available": true
  },
  {
    "id": "dish-440",
    "restaurantId": "rest-14",
    "name": "Soft Lacy Coconut Appams (2 pcs)",
    "category": "Coastal Breads",
    "price": 79,
    "discountPrice": 65,
    "rating": 4.6,
    "reviewsCount": 150,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=80",
    "description": "Bowl-shaped fermented rice and coconut milk pancakes with soft spongy centers and delicate crispy lace borders.",
    "prepTime": "10 mins",
    "available": true
  },
  {
    "id": "dish-441",
    "restaurantId": "rest-14",
    "name": "Steamed Idiyappam String Hoppers (3 pcs)",
    "category": "Coastal Breads",
    "price": 89,
    "discountPrice": 75,
    "rating": 4.7,
    "reviewsCount": 215,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80",
    "description": "Delicate steamed rice flour noodles pressed into nests, perfect for mopping up rich coconut seafood curries.",
    "prepTime": "10 mins",
    "available": true
  },
  {
    "id": "dish-442",
    "restaurantId": "rest-14",
    "name": "Flaky Layered Malabar Parotta (2 pcs)",
    "category": "Coastal Breads",
    "price": 79,
    "discountPrice": 65,
    "rating": 4.8,
    "reviewsCount": 280,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=80",
    "description": "Hand-stretched layered refined flour flatbread skillfully fluffed by hand to reveal dozens of crisp buttery layers.",
    "prepTime": "12 mins",
    "available": true
  },
  {
    "id": "dish-443",
    "restaurantId": "rest-15",
    "name": "Sizzling Herb Grilled Chicken with Black Pepper Sauce",
    "category": "Signature Sizzlers",
    "price": 489,
    "discountPrice": 439,
    "rating": 4.6,
    "reviewsCount": 150,
    "isVeg": false,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80",
    "description": "Tender grilled chicken breasts served on a smoking cast-iron platter with herb butter rice, mashed potatoes, glazed veggies, and cracked pepper jus.",
    "prepTime": "22 mins",
    "available": true
  },
  {
    "id": "dish-444",
    "restaurantId": "rest-15",
    "name": "Sizzling Cottage Cheese Shashlik with Rice",
    "category": "Signature Sizzlers",
    "price": 429,
    "discountPrice": 389,
    "rating": 4.7,
    "reviewsCount": 215,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80",
    "description": "Charred marinated paneer cubes and bell pepper skewers served sizzling with buttered parsley rice and sweet chili barbecue sauce.",
    "prepTime": "20 mins",
    "available": true
  },
  {
    "id": "dish-445",
    "restaurantId": "rest-15",
    "name": "Sizzling Teriyaki Salmon with Wok Greens",
    "category": "Signature Sizzlers",
    "price": 589,
    "discountPrice": 529,
    "rating": 4.8,
    "reviewsCount": 280,
    "isVeg": false,
    "isBestseller": false,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80",
    "description": "Pan-seared Atlantic salmon fillet glazed in teriyaki sauce, served sizzling over buttered noodles, sauteed broccoli, and baby corn.",
    "prepTime": "22 mins",
    "available": true
  },
  {
    "id": "dish-446",
    "restaurantId": "rest-15",
    "name": "Sizzling Spaghetti Carbonara with Garlic Bread",
    "category": "Signature Sizzlers",
    "price": 449,
    "discountPrice": 399,
    "rating": 4.9,
    "reviewsCount": 345,
    "isVeg": false,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80",
    "description": "Creamy pasta sizzler with smoked bacon bits, parmesan sauce, grilled garlic baguette, and French fries.",
    "prepTime": "20 mins",
    "available": true
  },
  {
    "id": "dish-447",
    "restaurantId": "rest-15",
    "name": "Applewood Smoked Pork Belly Ribs Slab",
    "category": "Smoked BBQ Mains",
    "price": 599,
    "discountPrice": 539,
    "rating": 4.6,
    "reviewsCount": 150,
    "isVeg": false,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80",
    "description": "St. Louis cut ribs slow-smoked over applewood for 6 hours, basted in tangy bourbon barbecue glaze, served with coleslaw.",
    "prepTime": "25 mins",
    "available": true
  },
  {
    "id": "dish-448",
    "restaurantId": "rest-18",
    "name": "Spanish Cortado with Sweet Condensed Milk",
    "category": "Artisan Coffee",
    "price": 189,
    "discountPrice": 159,
    "rating": 4.6,
    "reviewsCount": 150,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
    "description": "Equal parts double espresso and warm steamed milk with a base layer of sweet condensed milk, served in a piccolo glass.",
    "prepTime": "6 mins",
    "available": true
  },
  {
    "id": "dish-449",
    "restaurantId": "rest-18",
    "name": "Vanilla Bean Iced Shakerato",
    "category": "Artisan Coffee",
    "price": 199,
    "discountPrice": 169,
    "rating": 4.7,
    "reviewsCount": 215,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
    "description": "Double shot espresso vigorously shaken with ice, Madagascar vanilla bean syrup, and orange peel until thick and frothy.",
    "prepTime": "6 mins",
    "available": true
  },
  {
    "id": "dish-450",
    "restaurantId": "rest-18",
    "name": "Manual Pour-Over Single Origin Arabica (V60)",
    "category": "Artisan Coffee",
    "price": 219,
    "discountPrice": 189,
    "rating": 4.8,
    "reviewsCount": 280,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
    "description": "Hand-poured specialty roast coffee using Hario V60 paper filter, extracting bright floral and citrus berry tasting notes.",
    "prepTime": "8 mins",
    "available": true
  },
  {
    "id": "dish-451",
    "restaurantId": "rest-18",
    "name": "Salted Butter Caramel Iced Latte",
    "category": "Artisan Coffee",
    "price": 219,
    "discountPrice": 189,
    "rating": 4.9,
    "reviewsCount": 345,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
    "description": "Chilled whole milk and espresso poured over ice, swirled with house-made salted caramel and a pinch of Maldon sea salt.",
    "prepTime": "6 mins",
    "available": true
  },
  {
    "id": "dish-452",
    "restaurantId": "rest-18",
    "name": "Sourdough Avocado Tartine with Danish Feta",
    "category": "Artisan Bakery",
    "price": 279,
    "discountPrice": 249,
    "rating": 4.6,
    "reviewsCount": 150,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80",
    "description": "Toasted country sourdough bread topped with crushed Haas avocado, crumbled feta cheese, cherry tomatoes, and microgreens.",
    "prepTime": "12 mins",
    "available": true
  },
  {
    "id": "dish-453",
    "restaurantId": "rest-18",
    "name": "Toasted Banana Walnut Loaf with Espresso Butter",
    "category": "Artisan Bakery",
    "price": 179,
    "discountPrice": 149,
    "rating": 4.7,
    "reviewsCount": 215,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80",
    "description": "Moist spiced banana bread slice packed with California walnuts, served warm with whipped espresso honey butter.",
    "prepTime": "8 mins",
    "available": true
  },
  {
    "id": "dish-454",
    "restaurantId": "rest-19",
    "name": "Bikaneri Rasgulla Sponges in Rose Syrup (2 pcs)",
    "category": "Royal Mithai",
    "price": 99,
    "discountPrice": 79,
    "rating": 4.6,
    "reviewsCount": 150,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1571867424488-4565932edb41?auto=format&fit=crop&w=600&q=80",
    "description": "Feather-light cottage cheese chenna dumplings poached in light aromatic rose-infused sugar syrup.",
    "prepTime": "5 mins",
    "available": true
  },
  {
    "id": "dish-455",
    "restaurantId": "rest-19",
    "name": "Kaju Pista Roll Royal Cylinders (200g)",
    "category": "Royal Mithai",
    "price": 289,
    "discountPrice": 249,
    "rating": 4.7,
    "reviewsCount": 215,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1571867424488-4565932edb41?auto=format&fit=crop&w=600&q=80",
    "description": "Fine cashew nut fudge rolls filled with aromatic roasted pistachio paste and wrapped in edible silver leaf.",
    "prepTime": "6 mins",
    "available": true
  },
  {
    "id": "dish-456",
    "restaurantId": "rest-19",
    "name": "Shahi Desi Ghee Moti Choor Ladoo (4 pcs)",
    "category": "Royal Mithai",
    "price": 149,
    "discountPrice": 129,
    "rating": 4.8,
    "reviewsCount": 280,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1571867424488-4565932edb41?auto=format&fit=crop&w=600&q=80",
    "description": "Fine gram flour pearls fried in pure cow ghee, soaked in saffron syrup, and pressed into traditional golden spheres.",
    "prepTime": "6 mins",
    "available": true
  },
  {
    "id": "dish-457",
    "restaurantId": "rest-19",
    "name": "Crispy Dal Kachori with Tamarind Dip (2 pcs)",
    "category": "Halwai Namkeen",
    "price": 89,
    "discountPrice": 75,
    "rating": 4.6,
    "reviewsCount": 150,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1571867424488-4565932edb41?auto=format&fit=crop&w=600&q=80",
    "description": "Flaky crust pastry pockets filled with spicy ground moong dal and asafetida, served with sweet saunth chutney.",
    "prepTime": "8 mins",
    "available": true
  },
  {
    "id": "dish-458",
    "restaurantId": "rest-19",
    "name": "Dilli Special Samosa Chaat with Chole Gravy",
    "category": "Halwai Namkeen",
    "price": 139,
    "discountPrice": 119,
    "rating": 4.7,
    "reviewsCount": 215,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1571867424488-4565932edb41?auto=format&fit=crop&w=600&q=80",
    "description": "Two crushed golden potato samosas topped with spiced chickpea curry, sweetened yogurt, sev, and zesty chutneys.",
    "prepTime": "10 mins",
    "available": true
  },
  {
    "id": "dish-459",
    "restaurantId": "rest-19",
    "name": "Bikaneri Aloo Bhujia & Roasted Nut Medley (200g)",
    "category": "Halwai Namkeen",
    "price": 129,
    "discountPrice": 109,
    "rating": 4.8,
    "reviewsCount": 280,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1571867424488-4565932edb41?auto=format&fit=crop&w=600&q=80",
    "description": "Famous crispy spiced potato and moth flour sev tossed with roasted cashews, almonds, and curry leaves.",
    "prepTime": "5 mins",
    "available": true
  },
  {
    "id": "dish-460",
    "restaurantId": "rest-20",
    "name": "Kathmandu Jhol Momos in Spiced Sesame Broth (6 pcs)",
    "category": "Tibetan Momos",
    "price": 249,
    "discountPrice": 219,
    "rating": 4.6,
    "reviewsCount": 150,
    "isVeg": false,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1625398407796-82650a8c135f?auto=format&fit=crop&w=600&q=80",
    "description": "Steamed chicken momos served immersed in a cold, tangy, and spicy roasted tomato, timur pepper, and sesame seed jhol soup.",
    "prepTime": "16 mins",
    "available": true
  },
  {
    "id": "dish-461",
    "restaurantId": "rest-20",
    "name": "Pan-Fried Crispy Kothey Momos (6 pcs)",
    "category": "Tibetan Momos",
    "price": 229,
    "discountPrice": 199,
    "rating": 4.7,
    "reviewsCount": 215,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1625398407796-82650a8c135f?auto=format&fit=crop&w=600&q=80",
    "description": "Traditional vegetable dumplings half-steamed and half-pan-fried with crunchy golden base, served with chili dip.",
    "prepTime": "15 mins",
    "available": true
  },
  {
    "id": "dish-462",
    "restaurantId": "rest-20",
    "name": "Fiery Tibetan Vegetable Thukpa Noodle Soup",
    "category": "Thukpa & Soups",
    "price": 229,
    "discountPrice": 199,
    "rating": 4.6,
    "reviewsCount": 150,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80",
    "description": "Comforting Himalayan noodle soup with handmade noodles, bok choy, carrots, wild mushrooms in garlic ginger broth.",
    "prepTime": "16 mins",
    "available": true
  },
  {
    "id": "dish-463",
    "restaurantId": "rest-20",
    "name": "Chicken Manchow Soup with Crispy Fried Noodles",
    "category": "Thukpa & Soups",
    "price": 199,
    "discountPrice": 169,
    "rating": 4.7,
    "reviewsCount": 215,
    "isVeg": false,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80",
    "description": "Dark spicy broth loaded with minced chicken, fresh cilantro, black pepper, and chili oil, topped with crispy noodles.",
    "prepTime": "14 mins",
    "available": true
  },
  {
    "id": "dish-464",
    "restaurantId": "rest-20",
    "name": "Tingmo Steamed Tibetan Bread with Spicy Sepen Dip",
    "category": "Thukpa & Soups",
    "price": 139,
    "discountPrice": 119,
    "rating": 4.8,
    "reviewsCount": 280,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80",
    "description": "Soft and fluffy flower-shaped steamed yeast bread, ideal for dipping in hot broths or fiery tomato sepen chili paste.",
    "prepTime": "12 mins",
    "available": true
  },
  {
    "id": "dish-465",
    "restaurantId": "rest-21",
    "name": "Chili Garlic Veg Hakka Noodles",
    "category": "Wok Noodles & Fried Rice",
    "price": 249,
    "discountPrice": 209,
    "rating": 4.6,
    "reviewsCount": 165,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80",
    "description": "High-flame wok-tossed noodles with julienned bell peppers, cabbage, scallions, burnt garlic, and fiery red chili paste.",
    "prepTime": "16 mins",
    "available": true
  },
  {
    "id": "dish-466",
    "restaurantId": "rest-21",
    "name": "Wok & Roll Signature Chicken Schezwan Noodles",
    "category": "Wok Noodles & Fried Rice",
    "price": 299,
    "discountPrice": 259,
    "rating": 4.7,
    "reviewsCount": 223,
    "isVeg": false,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=600&q=80",
    "description": "Tender chicken strips and springy noodles tossed in house-fermented Sichuan peppercorn and dried red chili sauce.",
    "prepTime": "18 mins",
    "available": true
  },
  {
    "id": "dish-467",
    "restaurantId": "rest-21",
    "name": "Burnt Garlic & Edamame Fried Rice",
    "category": "Wok Noodles & Fried Rice",
    "price": 259,
    "discountPrice": 219,
    "rating": 4.8,
    "reviewsCount": 281,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80",
    "description": "Fragrant jasmine rice stir-fried with crispy golden garlic chips, shelled edamame beans, sweet corn, and light soy.",
    "prepTime": "15 mins",
    "available": true
  },
  {
    "id": "dish-468",
    "restaurantId": "rest-21",
    "name": "Bangkok Basil Chicken Pad Kra Pao Bowl",
    "category": "Wok Noodles & Fried Rice",
    "price": 329,
    "discountPrice": 289,
    "rating": 4.9,
    "reviewsCount": 339,
    "isVeg": false,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=600&q=80",
    "description": "Minced spiced chicken stir-fried with Thai holy basil and bird's eye chilies over steamed jasmine rice topped with a crispy fried egg.",
    "prepTime": "18 mins",
    "available": true
  },
  {
    "id": "dish-469",
    "restaurantId": "rest-21",
    "name": "Singapore Curry Rice Vermicelli (Bee Hoon)",
    "category": "Wok Noodles & Fried Rice",
    "price": 269,
    "discountPrice": 229,
    "rating": 4.6,
    "reviewsCount": 397,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80",
    "description": "Delicate rice vermicelli tossed with mild Madras curry spice, crunchy bean sprouts, tofu puffs, and shredded greens.",
    "prepTime": "16 mins",
    "available": true
  },
  {
    "id": "dish-470",
    "restaurantId": "rest-21",
    "name": "Teriyaki Glazed Crispy Tofu Noodle Bowl",
    "category": "Wok Noodles & Fried Rice",
    "price": 279,
    "discountPrice": 239,
    "rating": 4.7,
    "reviewsCount": 455,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=600&q=80",
    "description": "Golden crusted silken tofu glazed in sweet-savory house teriyaki sauce over sesame udon noodles and steamed broccoli.",
    "prepTime": "17 mins",
    "available": true
  },
  {
    "id": "dish-471",
    "restaurantId": "rest-21",
    "name": "Cantonese Roast Chicken & Egg Fried Rice",
    "category": "Wok Noodles & Fried Rice",
    "price": 319,
    "discountPrice": 279,
    "rating": 4.8,
    "reviewsCount": 513,
    "isVeg": false,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80",
    "description": "Smoky wok-seared rice loaded with roasted chicken breast dices, fluffy scrambled egg, snow peas, and toasted sesame oil.",
    "prepTime": "18 mins",
    "available": true
  },
  {
    "id": "dish-472",
    "restaurantId": "rest-21",
    "name": "Crispy Shanghai Vegetable Spring Rolls (6 pcs)",
    "category": "Dimsums & Spring Rolls",
    "price": 219,
    "discountPrice": 179,
    "rating": 4.6,
    "reviewsCount": 165,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1625398407796-82650a8c135f?auto=format&fit=crop&w=600&q=80",
    "description": "Paper-thin crisp pastry cigars stuffed with shiitake mushroom, glass noodles, water chestnut, and cabbage. Served with sweet chili plum dip.",
    "prepTime": "14 mins",
    "available": true
  },
  {
    "id": "dish-473",
    "restaurantId": "rest-21",
    "name": "Sichuan Crispy Chicken & Scallion Egg Rolls (4 pcs)",
    "category": "Dimsums & Spring Rolls",
    "price": 259,
    "discountPrice": 219,
    "rating": 4.7,
    "reviewsCount": 223,
    "isVeg": false,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80",
    "description": "Blistered golden rolls packed with spiced shredded chicken, ginger, spring onions, and toasted sesame served with hot mustard.",
    "prepTime": "15 mins",
    "available": true
  },
  {
    "id": "dish-474",
    "restaurantId": "rest-21",
    "name": "Crystal Truffle Edamame Dimsums (6 pcs)",
    "category": "Dimsums & Spring Rolls",
    "price": 289,
    "discountPrice": 249,
    "rating": 4.8,
    "reviewsCount": 281,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1625398407796-82650a8c135f?auto=format&fit=crop&w=600&q=80",
    "description": "Translucent steamed wheat-starch dumplings filled with crushed edamame, water chestnuts, corn, and fragrant black truffle oil.",
    "prepTime": "16 mins",
    "available": true
  },
  {
    "id": "dish-475",
    "restaurantId": "rest-21",
    "name": "Steamed Chicken & Chive Gyoza Dumplings (6 pcs)",
    "category": "Dimsums & Spring Rolls",
    "price": 279,
    "discountPrice": 239,
    "rating": 4.9,
    "reviewsCount": 339,
    "isVeg": false,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80",
    "description": "Delicately pleated half-moon dumplings steamed with juicy minced chicken, ginger, and garlic chives with soy chili oil.",
    "prepTime": "16 mins",
    "available": true
  },
  {
    "id": "dish-476",
    "restaurantId": "rest-21",
    "name": "Crispy Lotus Stem in Honey Chili Sesame Glaze",
    "category": "Dimsums & Spring Rolls",
    "price": 269,
    "discountPrice": 229,
    "rating": 4.6,
    "reviewsCount": 397,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1625398407796-82650a8c135f?auto=format&fit=crop&w=600&q=80",
    "description": "Crunchy sliced lotus roots tossed in sticky blossom honey, roasted red chilies, scallions, and white sesame seeds.",
    "prepTime": "14 mins",
    "available": true
  },
  {
    "id": "dish-477",
    "restaurantId": "rest-21",
    "name": "Pan-Seared Veg & Tofu Potstickers (6 pcs)",
    "category": "Dimsums & Spring Rolls",
    "price": 249,
    "discountPrice": 209,
    "rating": 4.7,
    "reviewsCount": 455,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80",
    "description": "Crisp-bottomed pan-fried dumplings filled with bok choy, shiitake, tofu, and pickled ginger, served with ponzu dip.",
    "prepTime": "15 mins",
    "available": true
  },
  {
    "id": "dish-478",
    "restaurantId": "rest-21",
    "name": "Prawn Hargow & Water Chestnut Rolls (6 pcs)",
    "category": "Dimsums & Spring Rolls",
    "price": 339,
    "discountPrice": 299,
    "rating": 4.8,
    "reviewsCount": 513,
    "isVeg": false,
    "isBestseller": false,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1625398407796-82650a8c135f?auto=format&fit=crop&w=600&q=80",
    "description": "Juicy tiger prawn dumplings and crisp bamboo shoots wrapped in delicate wrappers, served with roasted garlic chili dip.",
    "prepTime": "18 mins",
    "available": true
  },
  {
    "id": "dish-479",
    "restaurantId": "rest-21",
    "name": "Taiwanese Brown Sugar Pearl Boba Milk Tea",
    "category": "Boba & Iced Teas",
    "price": 199,
    "discountPrice": 169,
    "rating": 4.6,
    "reviewsCount": 165,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1558857563-b37fcda7d727?auto=format&fit=crop&w=600&q=80",
    "description": "Warm caramelized brown sugar tapioca pearls swirled into creamy Assam milk tea over crushed crystal ice.",
    "prepTime": "7 mins",
    "available": true
  },
  {
    "id": "dish-480",
    "restaurantId": "rest-21",
    "name": "Yuzu Peach Sparkling Jasmine Iced Tea",
    "category": "Boba & Iced Teas",
    "price": 169,
    "discountPrice": 139,
    "rating": 4.7,
    "reviewsCount": 223,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80",
    "description": "Cold-brewed jasmine green tea infused with Japanese yuzu citrus, muddled white peach, and mint over sparkling soda.",
    "prepTime": "5 mins",
    "available": true
  },
  {
    "id": "dish-481",
    "restaurantId": "rest-21",
    "name": "Matcha Ceremonial Oat Milk Boba Latte",
    "category": "Boba & Iced Teas",
    "price": 229,
    "discountPrice": 199,
    "rating": 4.8,
    "reviewsCount": 281,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1558857563-b37fcda7d727?auto=format&fit=crop&w=600&q=80",
    "description": "Stone-ground Uji matcha whisked with chilled creamy oat milk, vanilla bean syrup, and honey chewy tapioca pearls.",
    "prepTime": "7 mins",
    "available": true
  },
  {
    "id": "dish-482",
    "restaurantId": "rest-21",
    "name": "Thai Spiced Orange Condensed Milk Iced Tea",
    "category": "Boba & Iced Teas",
    "price": 189,
    "discountPrice": 159,
    "rating": 4.9,
    "reviewsCount": 339,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80",
    "description": "Authentic brewed Thai Ceylon black tea lightly spiced with star anise, poured over ice and finished with evaporated cream.",
    "prepTime": "6 mins",
    "available": true
  },
  {
    "id": "dish-483",
    "restaurantId": "rest-21",
    "name": "Lychee Rose Popping Boba Cooler",
    "category": "Boba & Iced Teas",
    "price": 179,
    "discountPrice": 149,
    "rating": 4.6,
    "reviewsCount": 397,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1558857563-b37fcda7d727?auto=format&fit=crop&w=600&q=80",
    "description": "Refreshing chilled lychee nectar blended with rose hibiscus tea and juicy burst-in-mouth mango popping boba.",
    "prepTime": "6 mins",
    "available": true
  },
  {
    "id": "dish-484",
    "restaurantId": "rest-21",
    "name": "Taro Purple Velvet Cream Cheese Boba",
    "category": "Boba & Iced Teas",
    "price": 219,
    "discountPrice": 189,
    "rating": 4.7,
    "reviewsCount": 455,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80",
    "description": "Creamy Taiwanese taro root milk tea crowned with a lightly salted whipped cream cheese foam and black sugar pearls.",
    "prepTime": "7 mins",
    "available": true
  },
  {
    "id": "dish-485",
    "restaurantId": "rest-21",
    "name": "Vietnamese Condensed Milk Cold Brew Coffee",
    "category": "Boba & Iced Teas",
    "price": 179,
    "discountPrice": 149,
    "rating": 4.8,
    "reviewsCount": 513,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1558857563-b37fcda7d727?auto=format&fit=crop&w=600&q=80",
    "description": "Bold dark-roast Robusta phin coffee slowly dripped over sweet condensed milk and cracked ice cubes.",
    "prepTime": "6 mins",
    "available": true
  },
  {
    "id": "dish-486",
    "restaurantId": "rest-22",
    "name": "Charcoal Mutton Seekh Kebab Skewers (6 pcs)",
    "category": "Charcoal Skewers & Kebabs",
    "price": 429,
    "discountPrice": 379,
    "rating": 4.6,
    "reviewsCount": 165,
    "isVeg": false,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80",
    "description": "Hand-minced lamb blended with roasted cumin, fresh coriander, ginger, and green chilies, skewered over live glowing charcoal.",
    "prepTime": "22 mins",
    "available": true
  },
  {
    "id": "dish-487",
    "restaurantId": "rest-22",
    "name": "Smoky Murgh Malai Reshmi Kebab (6 pcs)",
    "category": "Charcoal Skewers & Kebabs",
    "price": 369,
    "discountPrice": 329,
    "rating": 4.7,
    "reviewsCount": 223,
    "isVeg": false,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80",
    "description": "Velvety chicken tenderloins marinated overnight in cashew paste, cheddar cream, and white pepper, blistered in clay tandoor.",
    "prepTime": "20 mins",
    "available": true
  },
  {
    "id": "dish-488",
    "restaurantId": "rest-22",
    "name": "Old Delhi Paneer Tikka Shashlik Skewers",
    "category": "Charcoal Skewers & Kebabs",
    "price": 329,
    "discountPrice": 289,
    "rating": 4.8,
    "reviewsCount": 281,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80",
    "description": "Char-grilled cottage cheese slabs skewered with crunchy bell peppers and red onions in tangy ajwain-mustard yogurt.",
    "prepTime": "18 mins",
    "available": true
  },
  {
    "id": "dish-489",
    "restaurantId": "rest-22",
    "name": "Bhatti Da Murgh Crispy Charred Legs (4 pcs)",
    "category": "Charcoal Skewers & Kebabs",
    "price": 389,
    "discountPrice": 349,
    "rating": 4.9,
    "reviewsCount": 339,
    "isVeg": false,
    "isBestseller": false,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80",
    "description": "Punjabi roadside classic chicken drumsticks rubbed in black cardamom, roasted gram flour, and dark garam masala.",
    "prepTime": "24 mins",
    "available": true
  },
  {
    "id": "dish-490",
    "restaurantId": "rest-22",
    "name": "Tandoori Dahi Ke Kebab Crispy Patties (6 pcs)",
    "category": "Charcoal Skewers & Kebabs",
    "price": 299,
    "discountPrice": 259,
    "rating": 4.6,
    "reviewsCount": 397,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80",
    "description": "Melt-in-mouth hung curd patties stuffed with roasted cashews, green cardamom, and fresh mint, pan-seared crisp golden.",
    "prepTime": "16 mins",
    "available": true
  },
  {
    "id": "dish-491",
    "restaurantId": "rest-22",
    "name": "Peshawari Lamb Boti Charcoal Tikka",
    "category": "Charcoal Skewers & Kebabs",
    "price": 469,
    "discountPrice": 419,
    "rating": 4.7,
    "reviewsCount": 455,
    "isVeg": false,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80",
    "description": "Tender boneless mutton chunks seared on skewers with raw papaya, crushed coriander seeds, and clarified butter basting.",
    "prepTime": "25 mins",
    "available": true
  },
  {
    "id": "dish-492",
    "restaurantId": "rest-22",
    "name": "Tandoori Stuffed Soya Chaap Angara Skewers",
    "category": "Charcoal Skewers & Kebabs",
    "price": 289,
    "discountPrice": 249,
    "rating": 4.8,
    "reviewsCount": 513,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80",
    "description": "Smoky protein-rich soya chaap batons marinated in Kashmiri red chili, roasted cumin, and tangy chaat masala.",
    "prepTime": "18 mins",
    "available": true
  },
  {
    "id": "dish-493",
    "restaurantId": "rest-22",
    "name": "Double Egg Chicken Tikka Kathi Roll",
    "category": "Tikka Rolls & Wraps",
    "price": 249,
    "discountPrice": 209,
    "rating": 4.6,
    "reviewsCount": 165,
    "isVeg": false,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80",
    "description": "Flaky lachha paratha coated with double beaten egg, stuffed with charred chicken tikka, pickled onions, and mint chutney.",
    "prepTime": "14 mins",
    "available": true
  },
  {
    "id": "dish-494",
    "restaurantId": "rest-22",
    "name": "Mutton Seekh & Caramelized Onion Rumali Wrap",
    "category": "Tikka Rolls & Wraps",
    "price": 289,
    "discountPrice": 249,
    "rating": 4.7,
    "reviewsCount": 223,
    "isVeg": false,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=600&q=80",
    "description": "Smoky minced lamb seekh kebab wrapped in paper-thin hand-tossed roomali roti with fiery garlic mayo and coriander.",
    "prepTime": "16 mins",
    "available": true
  },
  {
    "id": "dish-495",
    "restaurantId": "rest-22",
    "name": "Smoky Paneer Makhani Tikka Roll",
    "category": "Tikka Rolls & Wraps",
    "price": 229,
    "discountPrice": 189,
    "rating": 4.8,
    "reviewsCount": 281,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80",
    "description": "Tandoori paneer cubes tossed in velvety buttery makhani sauce inside a crispy flaky paratha with crunchy slaw.",
    "prepTime": "14 mins",
    "available": true
  },
  {
    "id": "dish-496",
    "restaurantId": "rest-22",
    "name": "Malai Chicken Cheese Melt Paratha Roll",
    "category": "Tikka Rolls & Wraps",
    "price": 269,
    "discountPrice": 229,
    "rating": 4.9,
    "reviewsCount": 339,
    "isVeg": false,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=600&q=80",
    "description": "Creamy Afghani murgh malai tikka layered with melted mozzarella and tangy green chili chutney inside warm paratha.",
    "prepTime": "15 mins",
    "available": true
  },
  {
    "id": "dish-497",
    "restaurantId": "rest-22",
    "name": "Peri-Peri Tandoori Soya Chaap Kathi Roll",
    "category": "Tikka Rolls & Wraps",
    "price": 209,
    "discountPrice": 179,
    "rating": 4.6,
    "reviewsCount": 397,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80",
    "description": "Fire-roasted soya chaap shreds tossed in zesty peri-peri masala, onion rings, and mint yogurt inside whole-wheat wrap.",
    "prepTime": "14 mins",
    "available": true
  },
  {
    "id": "dish-498",
    "restaurantId": "rest-22",
    "name": "Kolkata Classic Aloo & Spiced Chana Eggless Roll",
    "category": "Tikka Rolls & Wraps",
    "price": 179,
    "discountPrice": 149,
    "rating": 4.7,
    "reviewsCount": 455,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=600&q=80",
    "description": "Spiced baby potatoes and black chickpeas sautéed with cumin, lime juice, and crispy sev rolled in flaky tawa paratha.",
    "prepTime": "12 mins",
    "available": true
  },
  {
    "id": "dish-499",
    "restaurantId": "rest-22",
    "name": "Chargrilled Butter Garlic Prawn Kebab Roll",
    "category": "Tikka Rolls & Wraps",
    "price": 329,
    "discountPrice": 289,
    "rating": 4.8,
    "reviewsCount": 513,
    "isVeg": false,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80",
    "description": "Juicy tandoor-seared prawns glazed with roasted garlic butter, pickled cabbage, and coastal green chutney in soft rumali.",
    "prepTime": "18 mins",
    "available": true
  },
  {
    "id": "dish-500",
    "restaurantId": "rest-22",
    "name": "Kebab Nation Charcoal Chicken Tikka Biryani",
    "category": "Royal Biryani & Breads",
    "price": 359,
    "discountPrice": 319,
    "rating": 4.6,
    "reviewsCount": 165,
    "isVeg": false,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80",
    "description": "Smoky tandoori chicken tikka layered with aged saffron basmati rice, fried onions, and rich makhani spices. Served with burani raita.",
    "prepTime": "24 mins",
    "available": true
  },
  {
    "id": "dish-501",
    "restaurantId": "rest-22",
    "name": "Lucknowi Mutton Seekh & Dum Rice Handi",
    "category": "Royal Biryani & Breads",
    "price": 429,
    "discountPrice": 389,
    "rating": 4.7,
    "reviewsCount": 223,
    "isVeg": false,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=600&q=80",
    "description": "Aromatic kewra and rose-water scented basmati rice slow-cooked in a clay handi with sliced charcoal mutton seekh kebabs.",
    "prepTime": "26 mins",
    "available": true
  },
  {
    "id": "dish-502",
    "restaurantId": "rest-22",
    "name": "Subz Charminar Paneer Tikka Biryani",
    "category": "Royal Biryani & Breads",
    "price": 309,
    "discountPrice": 269,
    "rating": 4.8,
    "reviewsCount": 281,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80",
    "description": "Char-grilled cottage cheese and garden vegetables slow-steamed with whole spices, saffron milk, and mint leaves.",
    "prepTime": "22 mins",
    "available": true
  },
  {
    "id": "dish-503",
    "restaurantId": "rest-22",
    "name": "Truffle Butter Garlic Tandoori Naan",
    "category": "Royal Biryani & Breads",
    "price": 89,
    "discountPrice": 75,
    "rating": 4.9,
    "reviewsCount": 339,
    "isVeg": true,
    "isBestseller": true,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=600&q=80",
    "description": "Hand-slapped clay oven naan brushed with melted white butter, roasted minced garlic, and chopped fresh coriander.",
    "prepTime": "10 mins",
    "available": true
  },
  {
    "id": "dish-504",
    "restaurantId": "rest-22",
    "name": "Warqi Crispy Flaky Roomali & Laccha Basket",
    "category": "Royal Biryani & Breads",
    "price": 119,
    "discountPrice": 99,
    "rating": 4.6,
    "reviewsCount": 397,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80",
    "description": "Assorted kebab accompaniment basket featuring one paper-thin roomali roti and one golden multi-layered ghee laccha paratha.",
    "prepTime": "12 mins",
    "available": true
  },
  {
    "id": "dish-505",
    "restaurantId": "rest-22",
    "name": "Stuffed Mutton Keema Kulcha with Gravy",
    "category": "Royal Biryani & Breads",
    "price": 189,
    "discountPrice": 159,
    "rating": 4.7,
    "reviewsCount": 455,
    "isVeg": false,
    "isBestseller": false,
    "isTrending": true,
    "image": "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=600&q=80",
    "description": "Crisp tandoor-baked flatbread stuffed generously with spiced minced lamb keema, served alongside rich brown onion dip.",
    "prepTime": "15 mins",
    "available": true
  },
  {
    "id": "dish-506",
    "restaurantId": "rest-22",
    "name": "Zafrani Sheermal Sweet Saffron Flatbread",
    "category": "Royal Biryani & Breads",
    "price": 109,
    "discountPrice": 89,
    "rating": 4.8,
    "reviewsCount": 513,
    "isVeg": true,
    "isBestseller": false,
    "isTrending": false,
    "image": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80",
    "description": "Traditional Awadhi lightly sweetened milk-and-saffron flatbread brushed with pure desi ghee, ideal with spicy kebabs.",
    "prepTime": "12 mins",
    "available": true
  }
];

// Initial Categories for navigation and filtering
const DEFAULT_CATEGORIES = [
  { id: "all", name: "All Cuisines", icon: "fa-utensils", emoji: "🍽️", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=360&q=80" },
  { id: "Biryani", name: "Biryani", icon: "fa-bowl-rice", emoji: "🍲", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=360&q=80" },
  { id: "Pizzas", name: "Pizzas", icon: "fa-pizza-slice", emoji: "🍕", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=360&q=80" },
  { id: "Burgers", name: "Burgers", icon: "fa-burger", emoji: "🍔", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=360&q=80" },
  { id: "Asian & Noodles", name: "Asian", icon: "fa-bowl-food", emoji: "🍜", image: "https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=360&q=80" },
  { id: "Healthy Bowls", name: "Healthy", icon: "fa-seedling", emoji: "🥗", image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=360&q=80" },
  { id: "Curries", name: "Curries", icon: "fa-fire-burner", emoji: "🍛", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=360&q=80" },
  { id: "Sushi & Japanese", name: "Sushi", icon: "fa-fish-fins", emoji: "🍣", image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=360&q=80" },
  { id: "Desserts", name: "Desserts", icon: "fa-ice-cream", emoji: "🍰", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=360&q=80" },
  { id: "Mexican", name: "Mexican", icon: "fa-pepper-hot", emoji: "🌮", image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=360&q=80" },
  { id: "South Indian", name: "South Indian", icon: "fa-sun", emoji: "🥞", image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=360&q=80" },
  { id: "Tibetan Momos", name: "Momos", icon: "fa-cloud", emoji: "🥟", image: "https://images.unsplash.com/photo-1625398407796-82650a8c135f?auto=format&fit=crop&w=360&q=80" },
  { id: "Coffee & Shakes", name: "Beverages", icon: "fa-mug-hot", emoji: "☕", image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=360&q=80" }
];

// Realistic Pre-registered Accounts across all 4 modules
const DEFAULT_USERS = [
  {
    id: "usr-customer-1",
    email: "customer@quickbite.com",
    password: "password123",
    role: "customer",
    name: "Rahul Sharma",
    phone: "+91 98765 43210",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
    status: "active",
    joinedAt: "2026-07-15T08:30:00.000Z",
    addresses: [
      { id: "addr-1", tag: "Home", street: "Flat 402, Sunshine Heights, Jubilee Enclave", city: "Hyderabad", pincode: "500081", isDefault: true },
      { id: "addr-2", tag: "Work", street: "Tower B, Level 6, Cyber Gateway", city: "Hyderabad", pincode: "500081", isDefault: false }
    ],
    favorites: ["rest-1", "rest-3"]
  },
  {
    id: "usr-customer-2",
    email: "priya.patel@gmail.com",
    password: "password123",
    role: "customer",
    name: "Priya Patel",
    phone: "+91 98451 22334",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    status: "active",
    joinedAt: "2026-08-14T10:00:00.000Z",
    addresses: [
      { id: "addr-3", tag: "Home", street: "Villa 18, Palm Meadows, Whitefield", city: "Bangalore", pincode: "560066", isDefault: true }
    ],
    favorites: ["rest-2", "rest-5"]
  },
  {
    id: "usr-customer-3",
    email: "sneha.reddy@gmail.com",
    password: "password123",
    role: "customer",
    name: "Sneha Reddy",
    phone: "+91 97001 88992",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    status: "active",
    joinedAt: "2026-09-02T11:30:00.000Z",
    addresses: [
      { id: "addr-4", tag: "Home", street: "Road No 36, Jubilee Hills", city: "Hyderabad", pincode: "500033", isDefault: true }
    ],
    favorites: ["rest-1", "rest-4"]
  },
  {
    id: "usr-customer-4",
    email: "amit.verma@outlook.com",
    password: "password123",
    role: "customer",
    name: "Amit Verma",
    phone: "+91 99102 33445",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    status: "active",
    joinedAt: "2026-09-20T14:15:00.000Z",
    addresses: [
      { id: "addr-5", tag: "Home", street: "A-24, Sector 62", city: "Noida", pincode: "201301", isDefault: true }
    ],
    favorites: ["rest-3"]
  },
  {
    id: "usr-customer-5",
    email: "ananya.iyer@yahoo.com",
    password: "password123",
    role: "customer",
    name: "Ananya Iyer",
    phone: "+91 94441 55667",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    status: "active",
    joinedAt: "2026-10-05T09:40:00.000Z",
    addresses: [
      { id: "addr-6", tag: "Home", street: "12th Cross, Indiranagar", city: "Bangalore", pincode: "560038", isDefault: true }
    ],
    favorites: ["rest-2", "rest-10"]
  },
  {
    id: "usr-customer-6",
    email: "rohan.kapoor@gmail.com",
    password: "password123",
    role: "customer",
    name: "Rohan Kapoor",
    phone: "+91 98200 44332",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
    status: "blocked",
    joinedAt: "2026-10-18T16:20:00.000Z",
    addresses: [
      { id: "addr-7", tag: "Home", street: "7th floor, Sea View Apts, Bandra West", city: "Mumbai", pincode: "400050", isDefault: true }
    ],
    favorites: []
  },
  {
    id: "usr-customer-7",
    email: "neha.g@gmail.com",
    password: "password123",
    role: "customer",
    name: "Neha Gupta",
    phone: "+91 96500 77112",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
    status: "active",
    joinedAt: "2026-11-01T12:00:00.000Z",
    addresses: [
      { id: "addr-8", tag: "Home", street: "Lane 5, Koregaon Park", city: "Pune", pincode: "411001", isDefault: true }
    ],
    favorites: ["rest-5"]
  },
  {
    id: "usr-customer-8",
    email: "dev.joshi@techcorp.in",
    password: "password123",
    role: "customer",
    name: "Devendra Joshi",
    phone: "+91 98711 00223",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
    status: "active",
    joinedAt: "2026-11-10T15:30:00.000Z",
    addresses: [
      { id: "addr-9", tag: "Home", street: "Flat 101, Lake Breeze, Gachibowli", city: "Hyderabad", pincode: "500032", isDefault: true }
    ],
    favorites: ["rest-10"]
  },
  {
    id: "usr-rest-1",
    email: "owner1@quickbite.com",
    password: "password123",
    role: "restaurant",
    restaurantId: "rest-1",
    name: "Farooq Ahmed",
    phone: "+91 98490 11223",
    status: "active",
    avatar: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "usr-rest-2",
    email: "owner2@quickbite.com",
    password: "password123",
    role: "restaurant",
    restaurantId: "rest-2",
    name: "Chef Marco Rossi",
    phone: "+91 98220 33445",
    status: "active",
    avatar: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "usr-driver-1",
    email: "driver@quickbite.com",
    password: "password123",
    role: "delivery",
    name: "Vikram Singh",
    phone: "+91 91234 56789",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    vehicle: "Honda Activa 6G (TS 09 EQ 4022)",
    rating: 4.9,
    totalDeliveries: 342,
    earnings: 14250,
    status: "active"
  },
  {
    id: "usr-driver-2",
    email: "rajesh.driver@quickbite.com",
    password: "password123",
    role: "delivery",
    name: "Rajesh Kumar",
    phone: "+91 98112 33445",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    vehicle: "TVS Jupiter 125 (KA 04 MN 8821)",
    rating: 4.8,
    totalDeliveries: 218,
    earnings: 9810,
    status: "busy"
  },
  {
    id: "usr-driver-3",
    email: "suresh.driver@quickbite.com",
    password: "password123",
    role: "delivery",
    name: "Suresh Patel",
    phone: "+91 97223 44556",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80",
    vehicle: "Hero Splendor+ (MH 12 AB 4590)",
    rating: 4.7,
    totalDeliveries: 154,
    earnings: 6930,
    status: "offline"
  },
  {
    id: "usr-driver-4",
    email: "ali.driver@quickbite.com",
    password: "password123",
    role: "delivery",
    name: "Mohammad Ali",
    phone: "+91 99334 55667",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80",
    vehicle: "Ather 450X EV (DL 3S CD 1982)",
    rating: 4.95,
    totalDeliveries: 420,
    earnings: 18900,
    status: "active"
  },
  {
    id: "usr-driver-5",
    email: "deepak.driver@quickbite.com",
    password: "password123",
    role: "delivery",
    name: "Deepak Sharma",
    phone: "+91 96556 77889",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80",
    vehicle: "Bajaj Pulsar 150 (TS 07 XY 6634)",
    rating: 4.6,
    totalDeliveries: 89,
    earnings: 4005,
    status: "active"
  },
  {
    id: "usr-admin-1",
    email: "admin@quickbite.com",
    password: "admin123",
    role: "admin",
    name: "Anita Desai (Administrator)",
    phone: "+91 99999 88888",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    status: "active"
  }
];

// Active and Completed Demo Orders for Instant Cross-Module Interactivity
const DEFAULT_ORDERS = [
  {
    id: "ORD-9285",
    transactionId: "TXN-98214",
    customerId: "usr-customer-1",
    customerName: "Rahul Sharma",
    customerPhone: "+91 98765 43210",
    customerAddress: "Flat 402, Sunshine Heights, Jubilee Enclave, Banjara Hills, Hyderabad - 500034",
    restaurantId: "rest-1",
    restaurantName: "The Royal Biryani & Kebabs",
    restaurantAddress: "Plot 14, Road No. 12, Banjara Hills, Hyderabad - 500034",
    items: [
      { dishId: "dish-1", name: "Royal Dum Handi Chicken Biryani", price: 279, quantity: 2, isVeg: false },
      { dishId: "dish-3", name: "Mirchi Ka Salan & Raita Combo", price: 120, quantity: 1, isVeg: true }
    ],
    itemTotal: 678,
    deliveryFee: 30,
    discount: 50,
    couponApplied: "QUICK50",
    taxes: 34,
    grandTotal: 692,
    paymentMethod: "UPI (Google Pay)",
    paymentStatus: "Paid",
    status: "placed",
    deliveryPartnerId: null,
    deliveryPartnerName: null,
    createdAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    statusTimestamps: {
      placed: new Date(Date.now() - 10 * 60 * 1000).toISOString()
    }
  },
  {
    id: "ORD-9284",
    transactionId: "TXN-98213",
    customerId: "usr-customer-2",
    customerName: "Priya Patel",
    customerPhone: "+91 98451 22334",
    customerAddress: "Villa 18, Palm Meadows, 100ft Road, Indiranagar, Bangalore - 560038",
    restaurantId: "rest-2",
    restaurantName: "Artisan Crust Pizzeria",
    restaurantAddress: "Shop 5, 100ft Road, HAL 2nd Stage, Indiranagar, Bangalore - 560038",
    items: [
      { dishId: "dish-5", name: "Artisan Burrata Margherita Pizza", price: 389, quantity: 1, isVeg: true },
      { dishId: "dish-7", name: "Stuffed Garlic Dough Sticks", price: 149, quantity: 1, isVeg: true }
    ],
    itemTotal: 538,
    deliveryFee: 25,
    discount: 0,
    couponApplied: null,
    taxes: 27,
    grandTotal: 590,
    paymentMethod: "Credit Card (HDFC)",
    paymentStatus: "Paid",
    status: "preparing",
    deliveryPartnerId: "usr-driver-2",
    deliveryPartnerName: "Rajesh Kumar",
    deliveryPartnerPhone: "+91 98112 33445",
    createdAt: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    statusTimestamps: {
      placed: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
      accepted: new Date(Date.now() - 22 * 60 * 1000).toISOString(),
      preparing: new Date(Date.now() - 15 * 60 * 1000).toISOString()
    }
  },
  {
    id: "ORD-9283",
    transactionId: "TXN-98212",
    customerId: "usr-customer-3",
    customerName: "Sneha Reddy",
    customerPhone: "+91 97001 88992",
    customerAddress: "Tower 4, Flat 602, DLF Phase 2, Cyber City, Gurugram - 122002",
    restaurantId: "rest-4",
    restaurantName: "Dragon Bowl Asian Kitchen",
    restaurantAddress: "Building 8B, Ground Floor, DLF Cyber City Phase 2, Gurugram - 122002",
    items: [
      { dishId: "dish-13", name: "Steamed Crystal Dimsums", price: 299, quantity: 2, isVeg: true },
      { dishId: "dish-14", name: "Spicy Schezwan Hakka Noodles", price: 249, quantity: 1, isVeg: false }
    ],
    itemTotal: 847,
    deliveryFee: 35,
    discount: 100,
    couponApplied: "TASTYTREAT",
    taxes: 42,
    grandTotal: 824,
    paymentMethod: "UPI (PhonePe)",
    paymentStatus: "Paid",
    status: "ready_for_pickup",
    deliveryPartnerId: "usr-driver-4",
    deliveryPartnerName: "Mohammad Ali",
    deliveryPartnerPhone: "+91 99334 55667",
    createdAt: new Date(Date.now() - 40 * 60 * 1000).toISOString(),
    statusTimestamps: {
      placed: new Date(Date.now() - 40 * 60 * 1000).toISOString(),
      accepted: new Date(Date.now() - 36 * 60 * 1000).toISOString(),
      preparing: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
      ready_for_pickup: new Date(Date.now() - 10 * 60 * 1000).toISOString()
    }
  },
  {
    id: "ORD-9282",
    transactionId: "TXN-98211",
    customerId: "usr-customer-4",
    customerName: "Amit Verma",
    customerPhone: "+91 99102 33445",
    customerAddress: "Flat 12B, Sea Green Apts, Perry Cross Rd, Bandra West, Mumbai - 400050",
    restaurantId: "rest-5",
    restaurantName: "Green Leaf Healthy Bowls",
    restaurantAddress: "Unit 3, G Block, Bandra Kurla Complex (BKC), Mumbai - 400051",
    items: [
      { dishId: "dish-17", name: "Mediterranean Harvest Quinoa Bowl", price: 320, quantity: 1, isVeg: true },
      { dishId: "dish-19", name: "Cold Pressed Orange Ginger Juice", price: 140, quantity: 1, isVeg: true }
    ],
    itemTotal: 460,
    deliveryFee: 25,
    discount: 0,
    couponApplied: null,
    taxes: 23,
    grandTotal: 508,
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Pending COD",
    status: "out_for_delivery",
    deliveryPartnerId: "usr-driver-5",
    deliveryPartnerName: "Deepak Sharma",
    deliveryPartnerPhone: "+91 96556 77889",
    createdAt: new Date(Date.now() - 35 * 60 * 1000).toISOString(),
    statusTimestamps: {
      placed: new Date(Date.now() - 35 * 60 * 1000).toISOString(),
      accepted: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      preparing: new Date(Date.now() - 20 * 60 * 1000).toISOString(),
      ready_for_pickup: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
      out_for_delivery: new Date(Date.now() - 5 * 60 * 1000).toISOString()
    }
  },
  {
    id: "ORD-9281",
    transactionId: "TXN-98210",
    customerId: "usr-customer-1",
    customerName: "Rahul Sharma",
    customerPhone: "+91 98765 43210",
    customerAddress: "House 24, Road No 10, Jubilee Hills, Hyderabad - 500033",
    restaurantId: "rest-1",
    restaurantName: "The Royal Biryani & Kebabs",
    restaurantAddress: "Plot 14, Road No. 12, Banjara Hills, Hyderabad - 500034",
    items: [
      { dishId: "dish-1", name: "Royal Dum Handi Chicken Biryani", price: 279, quantity: 2, isVeg: false },
      { dishId: "dish-2", name: "Mutton Shahi Galouti Kebab (4 pcs)", price: 340, quantity: 1, isVeg: false }
    ],
    itemTotal: 898,
    deliveryFee: 30,
    discount: 100,
    couponApplied: "QUICK50",
    taxes: 45,
    grandTotal: 873,
    paymentMethod: "Credit Card (Simulated)",
    paymentStatus: "Paid",
    status: "delivered",
    deliveryPartnerId: "usr-driver-1",
    deliveryPartnerName: "Vikram Singh",
    deliveryPartnerPhone: "+91 91234 56789",
    createdAt: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
    statusTimestamps: {
      placed: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
      accepted: new Date(Date.now() - 85 * 60 * 1000).toISOString(),
      preparing: new Date(Date.now() - 70 * 60 * 1000).toISOString(),
      ready_for_pickup: new Date(Date.now() - 50 * 60 * 1000).toISOString(),
      out_for_delivery: new Date(Date.now() - 40 * 60 * 1000).toISOString(),
      delivered: new Date(Date.now() - 20 * 60 * 1000).toISOString()
    }
  },
  {
    id: "ORD-9280",
    transactionId: "TXN-98209",
    customerId: "usr-customer-5",
    customerName: "Ananya Iyer",
    customerPhone: "+91 94441 55667",
    customerAddress: "House 18, 4th Cross, 5th Block, Koramangala, Bangalore - 560095",
    restaurantId: "rest-3",
    restaurantName: "Burger Forge & Co.",
    restaurantAddress: "82, 5th Block, Jyoti Nivas College Rd, Koramangala, Bangalore - 560095",
    items: [
      { dishId: "dish-9", name: "The Forge Double Smashed Cheeseburger", price: 249, quantity: 2, isVeg: false },
      { dishId: "dish-11", name: "Crispy Truffle Parmesan Fries", price: 139, quantity: 1, isVeg: true }
    ],
    itemTotal: 637,
    deliveryFee: 0,
    discount: 50,
    couponApplied: "FREEDEL",
    taxes: 32,
    grandTotal: 619,
    paymentMethod: "UPI (Paytm)",
    paymentStatus: "Paid",
    status: "delivered",
    deliveryPartnerId: "usr-driver-1",
    deliveryPartnerName: "Vikram Singh",
    deliveryPartnerPhone: "+91 91234 56789",
    createdAt: new Date(Date.now() - 160 * 60 * 1000).toISOString(),
    statusTimestamps: {
      placed: new Date(Date.now() - 160 * 60 * 1000).toISOString(),
      accepted: new Date(Date.now() - 150 * 60 * 1000).toISOString(),
      preparing: new Date(Date.now() - 135 * 60 * 1000).toISOString(),
      ready_for_pickup: new Date(Date.now() - 120 * 60 * 1000).toISOString(),
      out_for_delivery: new Date(Date.now() - 100 * 60 * 1000).toISOString(),
      delivered: new Date(Date.now() - 75 * 60 * 1000).toISOString()
    }
  },
  {
    id: "ORD-9279",
    transactionId: "TXN-98208",
    customerId: "usr-customer-7",
    customerName: "Neha Gupta",
    customerPhone: "+91 96500 77112",
    customerAddress: "Villa 24, 12th Main, HAL 2nd Stage, Indiranagar, Bangalore - 560038",
    restaurantId: "rest-2",
    restaurantName: "Artisan Crust Pizzeria",
    restaurantAddress: "Shop 5, 100ft Road, HAL 2nd Stage, Indiranagar, Bangalore - 560038",
    items: [
      { dishId: "dish-5", name: "Artisan Burrata Margherita Pizza", price: 389, quantity: 2, isVeg: true }
    ],
    itemTotal: 778,
    deliveryFee: 25,
    discount: 50,
    couponApplied: "QUICK50",
    taxes: 39,
    grandTotal: 792,
    paymentMethod: "UPI (Google Pay)",
    paymentStatus: "Paid",
    status: "delivered",
    deliveryPartnerId: "usr-driver-2",
    deliveryPartnerName: "Rajesh Kumar",
    deliveryPartnerPhone: "+91 98112 33445",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    statusTimestamps: {
      placed: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      delivered: new Date(Date.now() - 23.4 * 60 * 60 * 1000).toISOString()
    }
  },
  {
    id: "ORD-9278",
    transactionId: "TXN-98207",
    customerId: "usr-customer-8",
    customerName: "Devendra Joshi",
    customerPhone: "+91 98711 00223",
    customerAddress: "Flat 304, Sampige Residency, 8th Cross, Malleswaram, Bangalore - 560003",
    restaurantId: "rest-10",
    restaurantName: "South Coast Dosa & Tiffin",
    restaurantAddress: "74, Margosa Road, 8th Cross, Malleswaram, Bangalore - 560003",
    items: [
      { dishId: "dish-37", name: "Crispy Ghee Podi Masala Dosa", price: 140, quantity: 2, isVeg: true },
      { dishId: "dish-39", name: "Filter Kaapi (Brass Tumbler)", price: 60, quantity: 2, isVeg: true }
    ],
    itemTotal: 400,
    deliveryFee: 20,
    discount: 50,
    couponApplied: "SOUTH50",
    taxes: 20,
    grandTotal: 390,
    paymentMethod: "Net Banking (SBI)",
    paymentStatus: "Paid",
    status: "delivered",
    deliveryPartnerId: "usr-driver-4",
    deliveryPartnerName: "Mohammad Ali",
    deliveryPartnerPhone: "+91 99334 55667",
    createdAt: new Date(Date.now() - 28 * 60 * 60 * 1000).toISOString(),
    statusTimestamps: {
      placed: new Date(Date.now() - 28 * 60 * 60 * 1000).toISOString(),
      delivered: new Date(Date.now() - 27.5 * 60 * 60 * 1000).toISOString()
    }
  },
  {
    id: "ORD-9277",
    transactionId: "TXN-98206",
    customerId: "usr-customer-6",
    customerName: "Rohan Kapoor",
    customerPhone: "+91 98200 44332",
    customerAddress: "SCO 42, Galleria Market, DLF Phase 4, Gurugram - 122009",
    restaurantId: "rest-4",
    restaurantName: "Dragon Bowl Asian Kitchen",
    restaurantAddress: "Building 8B, Ground Floor, DLF Cyber City Phase 2, Gurugram - 122002",
    items: [
      { dishId: "dish-15", name: "Crispy Korean Fried Chicken Wings", price: 349, quantity: 2, isVeg: false }
    ],
    itemTotal: 698,
    deliveryFee: 35,
    discount: 0,
    couponApplied: null,
    taxes: 35,
    grandTotal: 768,
    paymentMethod: "Credit Card (ICICI)",
    paymentStatus: "Refunded",
    status: "cancelled",
    cancelReason: "Customer cancelled before cooking commenced",
    deliveryPartnerId: null,
    deliveryPartnerName: null,
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    statusTimestamps: {
      placed: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
      cancelled: new Date(Date.now() - 47.8 * 60 * 60 * 1000).toISOString()
    }
  },
  {
    id: "ORD-9276",
    transactionId: "TXN-98205",
    customerId: "usr-customer-2",
    customerName: "Priya Patel",
    customerPhone: "+91 98451 22334",
    customerAddress: "Plot 88, Near Check Post, Jubilee Hills, Hyderabad - 500033",
    restaurantId: "rest-1",
    restaurantName: "The Royal Biryani & Kebabs",
    restaurantAddress: "Plot 14, Road No. 12, Banjara Hills, Hyderabad - 500034",
    items: [
      { dishId: "dish-1", name: "Royal Dum Handi Chicken Biryani", price: 279, quantity: 3, isVeg: false },
      { dishId: "dish-2", name: "Mutton Shahi Galouti Kebab (4 pcs)", price: 340, quantity: 1, isVeg: false }
    ],
    itemTotal: 1177,
    deliveryFee: 30,
    discount: 120,
    couponApplied: "FEAST120",
    taxes: 59,
    grandTotal: 1146,
    paymentMethod: "Credit Card (Axis)",
    paymentStatus: "Paid",
    status: "delivered",
    deliveryPartnerId: "usr-driver-1",
    deliveryPartnerName: "Vikram Singh",
    deliveryPartnerPhone: "+91 91234 56789",
    createdAt: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
    statusTimestamps: {
      placed: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
      delivered: new Date(Date.now() - 71.3 * 60 * 60 * 1000).toISOString()
    }
  },
  {
    id: "ORD-9275",
    transactionId: "TXN-98204",
    customerId: "usr-customer-3",
    customerName: "Sneha Reddy",
    customerPhone: "+91 97001 88992",
    customerAddress: "House 18, 4th Cross, 5th Block, Koramangala, Bangalore - 560095",
    restaurantId: "rest-3",
    restaurantName: "Burger Forge & Co.",
    restaurantAddress: "82, 5th Block, Jyoti Nivas College Rd, Koramangala, Bangalore - 560095",
    items: [
      { dishId: "dish-9", name: "The Forge Double Smashed Cheeseburger", price: 249, quantity: 2, isVeg: false },
      { dishId: "dish-12", name: "Salted Caramel Thick Milkshake", price: 169, quantity: 1, isVeg: true }
    ],
    itemTotal: 667,
    deliveryFee: 20,
    discount: 50,
    couponApplied: "QUICK50",
    taxes: 33,
    grandTotal: 670,
    paymentMethod: "UPI (PhonePe)",
    paymentStatus: "Paid",
    status: "delivered",
    deliveryPartnerId: "usr-driver-2",
    deliveryPartnerName: "Rajesh Kumar",
    deliveryPartnerPhone: "+91 98112 33445",
    createdAt: new Date(Date.now() - 96 * 60 * 60 * 1000).toISOString(),
    statusTimestamps: {
      placed: new Date(Date.now() - 96 * 60 * 60 * 1000).toISOString(),
      delivered: new Date(Date.now() - 95.2 * 60 * 60 * 1000).toISOString()
    }
  },
  {
    id: "ORD-9274",
    transactionId: "TXN-98203",
    customerId: "usr-customer-5",
    customerName: "Ananya Iyer",
    customerPhone: "+91 94441 55667",
    customerAddress: "Suite 501, One BKC, G Block, Bandra Kurla Complex, Mumbai - 400051",
    restaurantId: "rest-5",
    restaurantName: "Green Leaf Healthy Bowls",
    restaurantAddress: "Unit 3, G Block, Bandra Kurla Complex (BKC), Mumbai - 400051",
    items: [
      { dishId: "dish-17", name: "Mediterranean Harvest Quinoa Bowl", price: 320, quantity: 1, isVeg: true },
      { dishId: "dish-18", name: "Avocado & Edamame Green Salad", price: 280, quantity: 1, isVeg: true }
    ],
    itemTotal: 600,
    deliveryFee: 25,
    discount: 60,
    couponApplied: "GREEN30",
    taxes: 30,
    grandTotal: 595,
    paymentMethod: "UPI (Google Pay)",
    paymentStatus: "Paid",
    status: "delivered",
    deliveryPartnerId: "usr-driver-4",
    deliveryPartnerName: "Mohammad Ali",
    deliveryPartnerPhone: "+91 99334 55667",
    createdAt: new Date(Date.now() - 120 * 60 * 60 * 1000).toISOString(),
    statusTimestamps: {
      placed: new Date(Date.now() - 120 * 60 * 60 * 1000).toISOString(),
      delivered: new Date(Date.now() - 119.1 * 60 * 60 * 1000).toISOString()
    }
  }
];

// Available Discount Coupons
const DEFAULT_COUPONS = [
  { code: "QUICK50", discountPercent: 50, maxDiscount: 100, minOrder: 199, description: "50% OFF up to ₹100 on your favorite meals" },
  { code: "WELCOME20", discountPercent: 20, maxDiscount: 80, minOrder: 149, description: "20% OFF up to ₹80 for newcomers" },
  { code: "TASTY30", flatDiscount: 30, minOrder: 99, description: "Flat ₹30 OFF instant discount on any order" },
  { code: "FEAST120", flatDiscount: 120, minOrder: 499, description: "Flat ₹120 OFF on orders above ₹499" },
  { code: "FREEDEL", freeDelivery: true, minOrder: 199, description: "Zero Delivery Fee on orders above ₹199" },
  { code: "TASTYTREAT", discountPercent: 20, maxDiscount: 150, minOrder: 299, description: "20% OFF up to ₹150 on Pan-Asian and Desserts" }
];

// Testimonials for Landing Page
const DEFAULT_TESTIMONIALS = [
  {
    name: "Priya Sundaram",
    role: "Food Blogger & Critic",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    review: "QuickBite has elevated everyday food delivery! The packaging stays steaming hot, and tracking the rider live is smooth as silk. The Royal Biryani here is unbeatable.",
    favoriteDish: "Royal Dum Biryani"
  },
  {
    name: "Arjun Verma",
    role: "Tech Lead & Gourmet Enthusiast",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    review: "The restaurant choices are truly artisanal. From woodfired Neapolitan crusts to Tokyo style ramen, QuickBite delivers in under 30 minutes every single time.",
    favoriteDish: "Artisan Crust Margherita"
  },
  {
    name: "Sneha Kapur",
    role: "Health & Fitness Coach",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    review: "Finally a platform that makes clean healthy eating convenient! Fresh organic quinoa bowls and cold-pressed juices delivered right after my morning workouts.",
    favoriteDish: "Mediterranean Harvest Bowl"
  }
];

// Default QuickBite Wallet Data
const DEFAULT_WALLET = {
  balance: 450,
  transactions: [
    { id: 'txn-1', type: 'credit', title: 'Welcome Promotional Cashback', amount: 500, date: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(), status: 'Success' },
    { id: 'txn-2', type: 'debit', title: 'Order #ORD-7192 Payment', amount: 350, date: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(), status: 'Success' },
    { id: 'txn-3', type: 'credit', title: 'QuickBite Wallet Top-up (UPI)', amount: 300, date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), status: 'Success' }
  ]
};

// Default Saved Cards
const DEFAULT_SAVED_CARDS = [
  { id: 'card-1', brand: 'visa', number: '•••• •••• •••• 8821', holder: 'Rahul Sharma', expiry: '08/29', bank: 'HDFC Bank', isDefault: true },
  { id: 'card-2', brand: 'mastercard', number: '•••• •••• •••• 1140', holder: 'Rahul Sharma', expiry: '11/30', bank: 'ICICI Bank', isDefault: false }
];

// Default Saved UPI IDs
const DEFAULT_SAVED_UPI = [
  { id: 'upi-1', vpa: 'user@okhdfcbank', appName: 'Google Pay', isDefault: true },
  { id: 'upi-2', vpa: '9876543210@paytm', appName: 'Paytm', isDefault: false }
];

// Default Saved Addresses
const DEFAULT_ADDRESSES = [
  { id: 'addr-1', type: 'Home', address: 'Flat 402, Sunshine Towers, Rd No 12, Banjara Hills', landmark: 'Near City Center Mall', city: 'Hyderabad', pincode: '500034', phone: '+91 98765 43210', isDefault: true },
  { id: 'addr-2', type: 'Work', address: 'Cyber Towers, 4th Floor, Phase 2, HITEC City', landmark: 'Opposite Cyber Gateway', city: 'Hyderabad', pincode: '500081', phone: '+91 98765 43210', isDefault: false }
];

// Default User Preferences & Security Settings
const DEFAULT_USER_PREFERENCES = {
  dietary: 'all',
  spiceLevel: 'medium',
  defaultDeliveryInstruction: 'Leave at door',
  notifications: {
    sms: true,
    whatsapp: true,
    email: false,
    offers: true
  },
  twoFactorEnabled: false
};

/**
 * Storage Engine Class with Event Broadcasting
 */
class QuickBiteStorageManager {
  constructor() {
    this._memoryFallback = new Map();
    this.KEYS = {
      RESTAURANTS: 'quickbite_restaurants',
      DISHES: 'quickbite_dishes',
      CATEGORIES: 'quickbite_categories',
      USERS: 'quickbite_users',
      CURRENT_USER: 'quickbite_current_user',
      ORDERS: 'quickbite_orders',
      CART: 'quickbite_cart',
      COUPONS: 'quickbite_coupons',
      THEME: 'quickbite_theme',
      DELIVERY_CITY: 'quickbite_delivery_city',
      FAVORITES: 'quickbite_favorites',
      WALLET: 'quickbite_wallet',
      SAVED_CARDS: 'quickbite_saved_cards',
      SAVED_UPI: 'quickbite_saved_upi',
      ADDRESSES: 'quickbite_addresses',
      USER_PREFERENCES: 'quickbite_user_prefs'
    };

    // Purge any lingering permanent localStorage keys so sensitive data/passwords never persist on disk
    this.purgePermanentStorage();

    this.init();
    this.setupCrossTabSync();
    this.setupLifecycleCleanup();
  }

  /**
   * Temporary Session Storage Provider
   * Guarantees data and passwords only live for the duration of the application session,
   * completely destroyed when the application or browser tab closes.
   */
  get storage() {
    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        return window.sessionStorage;
      }
    } catch (e) {}
    try {
      if (typeof sessionStorage !== 'undefined') {
        return sessionStorage;
      }
    } catch (e) {}
    try {
      if (typeof localStorage !== 'undefined') {
        return localStorage;
      }
    } catch (e) {}
    return {
      getItem: (k) => this._memoryFallback.get(k) || null,
      setItem: (k, v) => this._memoryFallback.set(k, String(v)),
      removeItem: (k) => this._memoryFallback.delete(k),
      clear: () => this._memoryFallback.clear()
    };
  }

  purgePermanentStorage() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        Object.values(this.KEYS).forEach(k => {
          try { window.localStorage.removeItem(k); } catch (e) {}
        });
        window.localStorage.removeItem('quickbite_forced_logout');
        window.localStorage.removeItem('quickbite_signup_window_start');
        window.localStorage.removeItem('quickbite_signup_window_duration');
        window.localStorage.removeItem('quickbite_demo_bar_minimized');
      }
    } catch (e) {}
  }

  setupLifecycleCleanup() {
    if (typeof window !== 'undefined') {
      const handleExit = () => {
        try {
          this.purgePermanentStorage();
        } catch (e) {}
      };
      window.addEventListener('beforeunload', handleExit);
      window.addEventListener('pagehide', handleExit);
    }
  }

  init() {
    try {
      const storedRestsStr = this.storage.getItem(this.KEYS.RESTAURANTS);
      let storedRests = [];
      try { storedRests = storedRestsStr ? JSON.parse(storedRestsStr) : []; } catch(e) {}
      if (!storedRests || storedRests.length < DEFAULT_RESTAURANTS.length) {
        this.storage.setItem(this.KEYS.RESTAURANTS, JSON.stringify(DEFAULT_RESTAURANTS));
      }
      const storedDishesStr = this.storage.getItem(this.KEYS.DISHES);
      let storedDishes = [];
      try { storedDishes = storedDishesStr ? JSON.parse(storedDishesStr) : []; } catch(e) {}
      if (!storedDishes || storedDishes.length < DEFAULT_DISHES.length) {
        this.storage.setItem(this.KEYS.DISHES, JSON.stringify(DEFAULT_DISHES));
      }
      if (!this.storage.getItem(this.KEYS.CATEGORIES)) {
        this.storage.setItem(this.KEYS.CATEGORIES, JSON.stringify(DEFAULT_CATEGORIES));
      }
      if (!this.storage.getItem(this.KEYS.USERS)) {
        this.storage.setItem(this.KEYS.USERS, JSON.stringify(DEFAULT_USERS));
      }
      if (!this.storage.getItem(this.KEYS.ORDERS)) {
        this.storage.setItem(this.KEYS.ORDERS, JSON.stringify(DEFAULT_ORDERS));
      }
      if (!this.storage.getItem(this.KEYS.COUPONS)) {
        this.storage.setItem(this.KEYS.COUPONS, JSON.stringify(DEFAULT_COUPONS));
      }
      if (!this.storage.getItem(this.KEYS.CART)) {
        this.storage.setItem(this.KEYS.CART, JSON.stringify({ items: [], coupon: null }));
      }
      if (!this.storage.getItem(this.KEYS.FAVORITES)) {
        this.storage.setItem(this.KEYS.FAVORITES, JSON.stringify(["rest-1", "rest-3"]));
      }
      // Initialize 1-hour introductory signup window in session
      this.getSignupWindowStatus();

      // Only default to guest or customer session if user has not forcedly logged out and signup window is not active
      if (!this.storage.getItem(this.KEYS.CURRENT_USER)) {
        const isForced = this.storage.getItem('quickbite_forced_logout') === 'true';
        const isSignupActive = this.isSignupWindowActive();
        if (!isForced && !isSignupActive) {
          this.storage.setItem(this.KEYS.CURRENT_USER, JSON.stringify(DEFAULT_USERS[0])); // Start as demo customer
        }
      }
      if (!this.storage.getItem(this.KEYS.WALLET)) {
        this.storage.setItem(this.KEYS.WALLET, JSON.stringify(DEFAULT_WALLET));
      }
      if (!this.storage.getItem(this.KEYS.SAVED_CARDS)) {
        this.storage.setItem(this.KEYS.SAVED_CARDS, JSON.stringify(DEFAULT_SAVED_CARDS));
      }
      if (!this.storage.getItem(this.KEYS.SAVED_UPI)) {
        this.storage.setItem(this.KEYS.SAVED_UPI, JSON.stringify(DEFAULT_SAVED_UPI));
      }
      if (!this.storage.getItem(this.KEYS.ADDRESSES)) {
        this.storage.setItem(this.KEYS.ADDRESSES, JSON.stringify(DEFAULT_ADDRESSES));
      }
      if (!this.storage.getItem(this.KEYS.USER_PREFERENCES)) {
        this.storage.setItem(this.KEYS.USER_PREFERENCES, JSON.stringify(DEFAULT_USER_PREFERENCES));
      }

      // Auto-Enrich existing sessions to ensure full dataset across all modules
      this.ensureCompleteDataset();
    } catch (e) {
      console.error("Storage initialization error:", e);
    }
  }

  ensureCompleteDataset() {
    try {
      // 1. Ensure approvalStatus on restaurants and synchronized fresh accurate images
      const rests = this.get(this.KEYS.RESTAURANTS, []);
      if (rests && rests.length > 0) {
        let restsUpdated = false;
        rests.forEach(r => {
          if (!r.approvalStatus) {
            r.approvalStatus = 'approved';
            restsUpdated = true;
          }
          const defMatch = DEFAULT_RESTAURANTS.find(def => def.id === r.id);
          if (defMatch) {
            if (r.image !== defMatch.image || r.banner !== defMatch.banner || JSON.stringify(r.cuisine) !== JSON.stringify(defMatch.cuisine)) {
              r.image = defMatch.image;
              r.banner = defMatch.banner;
              r.cuisine = defMatch.cuisine;
              restsUpdated = true;
            }
          }
        });
        DEFAULT_RESTAURANTS.forEach(defR => {
          if (!rests.some(r => r.id === defR.id)) {
            rests.push(defR);
            restsUpdated = true;
          }
        });
        if (restsUpdated) this.set(this.KEYS.RESTAURANTS, rests);
      }

      // 2. Ensure dishes data and synchronized matching images
      const dishes = this.get(this.KEYS.DISHES, []);
      if (dishes && dishes.length > 0) {
        let dishesUpdated = false;
        dishes.forEach(d => {
          const defDish = DEFAULT_DISHES.find(def => def.id === d.id);
          if (defDish && d.image !== defDish.image) {
            d.image = defDish.image;
            dishesUpdated = true;
          }
        });
        DEFAULT_DISHES.forEach(defD => {
          if (!dishes.some(d => d.id === defD.id)) {
            dishes.push(defD);
            dishesUpdated = true;
          }
        });
        if (dishesUpdated) this.set(this.KEYS.DISHES, dishes);
      }

      // 3. Ensure categories have latest images
      this.set(this.KEYS.CATEGORIES, DEFAULT_CATEGORIES);

      // 4. Ensure customer & fleet directory is fully populated
      const users = this.get(this.KEYS.USERS, []);
      if (users && users.length > 0) {
        let usersUpdated = false;
        DEFAULT_USERS.forEach(defU => {
          if (!users.some(u => u.id === defU.id || u.email === defU.email)) {
            users.push(defU);
            usersUpdated = true;
          }
        });
        if (usersUpdated) this.set(this.KEYS.USERS, users);
      }

      // 5. Ensure orders stream is populated
      const orders = this.get(this.KEYS.ORDERS, []);
      if (orders && orders.length < 6) {
        let ordersUpdated = false;
        DEFAULT_ORDERS.forEach(defO => {
          if (!orders.some(o => o.id === defO.id)) {
            orders.push(defO);
            ordersUpdated = true;
          }
        });
        if (ordersUpdated) this.set(this.KEYS.ORDERS, orders);
      }
    } catch (err) {
      console.warn("Dataset auto-enrichment non-critical notice:", err);
    }
  }

  setupCrossTabSync() {
    window.addEventListener('storage', (event) => {
      if (event.key === this.KEYS.CART) {
        window.dispatchEvent(new CustomEvent('quickbite:cart-updated', { detail: this.getCart() }));
      }
      if (event.key === this.KEYS.ORDERS) {
        window.dispatchEvent(new CustomEvent('quickbite:orders-updated', { detail: this.getOrders() }));
      }
      if (event.key === this.KEYS.CURRENT_USER) {
        window.dispatchEvent(new CustomEvent('quickbite:auth-changed', { detail: this.getCurrentUser() }));
      }
    });
  }

  // --- Core CRUD (Scoped to Temporary Session) ---
  get(key, defaultValue = null) {
    try {
      const data = this.storage.getItem(key);
      return data ? JSON.parse(data) : defaultValue;
    } catch (e) {
      console.error(`Error reading key ${key}:`, e);
      return defaultValue;
    }
  }

  set(key, value) {
    try {
      this.storage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(`Error writing key ${key}:`, e);
    }
  }

  clear() {
    try {
      this.storage.clear();
      this.init();
    } catch (e) {
      console.error("Error clearing session storage:", e);
    }
  }

  // --- Restaurants ---
  getRestaurants() {
    return this.get(this.KEYS.RESTAURANTS, DEFAULT_RESTAURANTS);
  }

  getRestaurantById(id) {
    const list = this.getRestaurants();
    return list.find(r => r.id === id) || null;
  }

  getPopularRestaurants(limit = 6) {
    const list = this.getRestaurants();
    return [...list].sort((a, b) => b.rating - a.rating).slice(0, limit);
  }

  saveRestaurant(restaurant) {
    const list = this.getRestaurants();
    const index = list.findIndex(r => r.id === restaurant.id);
    if (index >= 0) {
      list[index] = restaurant;
    } else {
      list.push(restaurant);
    }
    this.set(this.KEYS.RESTAURANTS, list);
    window.dispatchEvent(new CustomEvent('quickbite:restaurants-updated'));
    return restaurant;
  }

  // --- Dishes ---
  getDishes(filterFn = null) {
    const list = this.get(this.KEYS.DISHES, DEFAULT_DISHES);
    return filterFn ? list.filter(filterFn) : list;
  }

  getDishById(id) {
    const list = this.getDishes();
    return list.find(d => d.id === id) || null;
  }

  getDishesByRestaurant(restaurantId) {
    return this.getDishes(d => d.restaurantId === restaurantId);
  }

  getTrendingDishes(limit = 8) {
    const list = this.getDishes();
    return list.filter(d => d.isTrending || d.isBestseller).slice(0, limit);
  }

  saveDish(dish) {
    const list = this.getDishes();
    const index = list.findIndex(d => d.id === dish.id);
    if (index >= 0) {
      list[index] = dish;
    } else {
      list.push(dish);
    }
    this.set(this.KEYS.DISHES, list);
    window.dispatchEvent(new CustomEvent('quickbite:dishes-updated'));
    return dish;
  }

  deleteDish(dishId) {
    const list = this.getDishes().filter(d => d.id !== dishId);
    this.set(this.KEYS.DISHES, list);
    window.dispatchEvent(new CustomEvent('quickbite:dishes-updated'));
  }


  // --- Delivery Cities & Locations ---
  getDeliveryCities() {
    return DELIVERY_CITIES;
  }

  getDeliveryCity() {
    const saved = this.get(this.KEYS.DELIVERY_CITY, null);
    if (saved && saved.id) {
      const match = DELIVERY_CITIES.find(c => c.id === saved.id);
      if (match) return { ...match, ...saved };
    }
    return DELIVERY_CITIES[0]; // Default: Hyderabad
  }

  setDeliveryCity(cityOrId) {
    let target = null;
    if (typeof cityOrId === 'string') {
      const q = cityOrId.toLowerCase();
      target = DELIVERY_CITIES.find(c => c.id === q || c.name.toLowerCase().includes(q));
    } else if (cityOrId && cityOrId.id) {
      target = DELIVERY_CITIES.find(c => c.id === cityOrId.id) || cityOrId;
    }
    if (!target) target = DELIVERY_CITIES[0];
    this.set(this.KEYS.DELIVERY_CITY, target);
    window.dispatchEvent(new CustomEvent('quickbite:delivery-city-updated', { detail: target }));
    return target;
  }

  // --- Categories & Coupons ---
  getCategories() {
    const list = this.get(this.KEYS.CATEGORIES, null);
    if (!list || !Array.isArray(list) || list.length === 0 || !list[0].image || list.length < DEFAULT_CATEGORIES.length) {
      this.set(this.KEYS.CATEGORIES, DEFAULT_CATEGORIES);
      return DEFAULT_CATEGORIES;
    }
    return list;
  }

  getCoupons() {
    return this.get(this.KEYS.COUPONS, DEFAULT_COUPONS);
  }

  getCoupon(code) {
    if (!code) return null;
    const cleanCode = code.trim().toUpperCase();
    const coupons = this.getCoupons();
    const existing = coupons.find(c => c.code.toUpperCase() === cleanCode);
    if (existing) return existing;

    const defaultMatch = DEFAULT_COUPONS.find(c => c.code.toUpperCase() === cleanCode);
    if (defaultMatch) return defaultMatch;

    // Support unlisted / custom promotional codes
    if (cleanCode.length >= 2) {
      const numMatch = cleanCode.match(/\d+/);
      const discountVal = numMatch ? parseInt(numMatch[0], 10) : 15;
      if (discountVal > 0 && discountVal <= 50) {
        return {
          code: cleanCode,
          discountPercent: discountVal,
          maxDiscount: Math.max(60, discountVal * 2),
          minOrder: 99,
          description: `Special Voucher: ${discountVal}% OFF (up to ₹${Math.max(60, discountVal * 2)})`,
          isUnlisted: true
        };
      } else if (discountVal > 50 && discountVal <= 250) {
        return {
          code: cleanCode,
          flatDiscount: discountVal,
          minOrder: Math.max(149, discountVal + 50),
          description: `Special Voucher: Flat ₹${discountVal} OFF`,
          isUnlisted: true
        };
      } else {
        return {
          code: cleanCode,
          discountPercent: 15,
          maxDiscount: 75,
          minOrder: 99,
          description: "Special Promo Voucher: 15% OFF up to ₹75",
          isUnlisted: true
        };
      }
    }

    return null;
  }

  // --- Cart System ---
  getCart() {
    return this.get(this.KEYS.CART, { items: [], coupon: null });
  }

  saveCart(cart) {
    this.set(this.KEYS.CART, cart);
    window.dispatchEvent(new CustomEvent('quickbite:cart-updated', { detail: cart }));
  }

  addToCart(dishId, quantity = 1, forceReset = false) {
    const dish = this.getDishById(dishId);
    if (!dish) return false;

    const cart = this.getCart();
    
    // Check if adding from different restaurant
    if (cart.items.length > 0) {
      const currentRestId = cart.items[0].restaurantId;
      if (currentRestId !== dish.restaurantId) {
        if (forceReset) {
          cart.items = [];
          cart.coupon = null;
        } else {
          const replace = typeof window !== 'undefined' && window.confirm ?
            confirm("Your cart contains dishes from another restaurant. Would you like to reset your cart to add this delicious item?") : true;
          if (replace) {
            cart.items = [];
            cart.coupon = null;
          } else {
            return false;
          }
        }
      }
    }

    const existingIndex = cart.items.findIndex(item => item.dishId === dishId);
    if (existingIndex >= 0) {
      cart.items[existingIndex].quantity += quantity;
    } else {
      cart.items.push({
        dishId: dish.id,
        restaurantId: dish.restaurantId,
        name: dish.name,
        price: dish.discountPrice || dish.price,
        originalPrice: dish.price,
        image: dish.image,
        isVeg: dish.isVeg,
        quantity: quantity
      });
    }

    this.saveCart(cart);
    this.showToast(`Added ${dish.name} to cart!`, 'success');
    return true;
  }

  updateCartQuantity(dishId, newQty) {
    const cart = this.getCart();
    if (newQty <= 0) {
      cart.items = cart.items.filter(item => item.dishId !== dishId);
    } else {
      const item = cart.items.find(i => i.dishId === dishId);
      if (item) {
        item.quantity = newQty;
      }
    }
    this.saveCart(cart);
  }

  clearCart() {
    this.saveCart({ items: [], coupon: null });
  }

  applyCoupon(code) {
    const coupon = this.getCoupon(code);
    if (!coupon) {
      this.showToast("Invalid coupon code", "error");
      return false;
    }

    const cart = this.getCart();
    const itemTotal = this.getCartSubtotal();

    if (coupon.minOrder && itemTotal < coupon.minOrder) {
      this.showToast(`Minimum order amount of ₹${coupon.minOrder} required for ${coupon.code}`, "warning");
      return false;
    }

    cart.coupon = coupon;
    this.saveCart(cart);
    this.showToast(`Coupon ${coupon.code} applied successfully!`, "success");
    return true;
  }

  removeCoupon() {
    const cart = this.getCart();
    cart.coupon = null;
    this.saveCart(cart);
    this.showToast("Coupon removed", "info");
  }

  getCartSubtotal() {
    const cart = this.getCart();
    return cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  getCartSummary() {
    const cart = this.getCart();
    const subtotal = this.getCartSubtotal();
    let deliveryFee = cart.items.length > 0 ? 30 : 0;
    let discount = 0;

    if (cart.coupon) {
      if (cart.coupon.freeDelivery) {
        deliveryFee = 0;
      }
      if (cart.coupon.discountPercent) {
        discount = Math.round((subtotal * cart.coupon.discountPercent) / 100);
        if (cart.coupon.maxDiscount) {
          discount = Math.min(discount, cart.coupon.maxDiscount);
        }
      }
      if (cart.coupon.flatDiscount) {
        discount = Math.min(subtotal, cart.coupon.flatDiscount);
      }
    }

    const packagingFee = cart.items.length > 0 ? 20 : 0;
    const taxes = cart.items.length > 0 ? Math.round(subtotal * 0.05) : 0; // 5% GST
    const total = Math.max(0, subtotal + deliveryFee + packagingFee + taxes - discount);
    const totalItems = cart.items.reduce((acc, item) => acc + item.quantity, 0);

    return {
      subtotal,
      itemTotal: subtotal,
      deliveryFee,
      packagingFee,
      discount,
      taxes,
      total,
      grandTotal: total,
      totalItems,
      itemCount: totalItems,
      coupon: cart.coupon
    };
  }

  // --- Orders Lifecycle ---
  getOrders(filterFn = null) {
    const orders = this.get(this.KEYS.ORDERS, DEFAULT_ORDERS);
    return filterFn ? orders.filter(filterFn) : orders;
  }

  getOrderById(id) {
    const orders = this.getOrders();
    return orders.find(o => o.id === id) || null;
  }

  createOrder(orderPayload) {
    const orders = this.getOrders();
    const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder = {
      id: orderId,
      createdAt: new Date().toISOString(),
      status: 'placed',
      statusTimestamps: {
        placed: new Date().toISOString()
      },
      ...orderPayload
    };

    orders.unshift(newOrder);
    this.set(this.KEYS.ORDERS, orders);
    this.clearCart();
    window.dispatchEvent(new CustomEvent('quickbite:orders-updated', { detail: orders }));
    this.showToast(`Order #${orderId} placed successfully!`, 'success');
    return newOrder;
  }

  updateOrderStatus(orderId, newStatus, extraData = {}) {
    const orders = this.getOrders();
    const order = orders.find(o => o.id === orderId);
    if (!order) return null;

    order.status = newStatus;
    if (!order.statusTimestamps) order.statusTimestamps = {};
    order.statusTimestamps[newStatus] = new Date().toISOString();

    Object.assign(order, extraData);

    this.set(this.KEYS.ORDERS, orders);
    window.dispatchEvent(new CustomEvent('quickbite:orders-updated', { detail: orders }));
    return order;
  }

  // --- User Session & Auth ---
  getCurrentUser() {
    return this.get(this.KEYS.CURRENT_USER, null);
  }

  setCurrentUser(user) {
    this.set(this.KEYS.CURRENT_USER, user);
    if (user) {
      try {
        this.storage.removeItem('quickbite_forced_logout');
      } catch (e) {}
    }
    window.dispatchEvent(new CustomEvent('quickbite:auth-changed', { detail: user }));
    window.dispatchEvent(new CustomEvent('quickbite:signup-window-updated'));
  }

  logout() {
    this.storage.removeItem(this.KEYS.CURRENT_USER);
    try {
      this.storage.setItem('quickbite_forced_logout', 'true');
    } catch (e) {}
    window.dispatchEvent(new CustomEvent('quickbite:auth-changed', { detail: null }));
    window.dispatchEvent(new CustomEvent('quickbite:signup-window-updated'));
    this.showToast("Signed out successfully", "info");
  }

  login(email, password) {
    const users = this.get(this.KEYS.USERS, DEFAULT_USERS);
    const user = users.find(u => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password);
    if (user) {
      try {
        this.storage.removeItem('quickbite_forced_logout');
      } catch (e) {}
      this.setCurrentUser(user);
      this.showToast(`Welcome back, ${user.name}!`, "success");
      return user;
    }
    this.showToast("Invalid email or password", "error");
    return null;
  }

  register(userData) {
    const users = this.get(this.KEYS.USERS, DEFAULT_USERS);
    if (users.some(u => u.email.toLowerCase() === userData.email.trim().toLowerCase())) {
      this.showToast("An account with this email already exists", "error");
      return null;
    }
    const newUser = {
      id: `usr-${Date.now()}`,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      favorites: [],
      addresses: [],
      ...userData
    };
    users.push(newUser);
    this.set(this.KEYS.USERS, users);
    try {
      this.storage.removeItem('quickbite_forced_logout');
    } catch (e) {}
    this.setCurrentUser(newUser);
    this.showToast("Account created successfully! Welcome to QuickBite.", "success");
    return newUser;
  }

  // --- 1-Hour Signup Window & Forced-Logout Management ---
  getSignupWindowStatus() {
    const keyStart = 'quickbite_signup_window_start';
    const keyDuration = 'quickbite_signup_window_duration';
    let start = null;
    let duration = null;

    try {
      const startRaw = this.storage.getItem(keyStart);
      const durRaw = this.storage.getItem(keyDuration);
      if (startRaw) start = parseInt(startRaw, 10);
      if (durRaw) duration = parseInt(durRaw, 10);

      if (!start || isNaN(start)) {
        start = Date.now();
        duration = 60 * 60 * 1000; // Default 1 hour
        this.storage.setItem(keyStart, String(start));
        this.storage.setItem(keyDuration, String(duration));
      }
      if (!duration || isNaN(duration)) {
        duration = 60 * 60 * 1000;
        this.storage.setItem(keyDuration, String(duration));
      }
    } catch (e) {
      start = Date.now();
      duration = 60 * 60 * 1000;
    }

    const now = Date.now();
    const durationMs = duration || (60 * 60 * 1000);
    const elapsedMs = Math.max(0, now - (start || now));
    const remainingMs = Math.max(0, durationMs - elapsedMs);
    const isActive = remainingMs > 0;
    const remainingMinutes = Math.ceil(remainingMs / 60000);
    const isForcedLogout = this.isForcedLogout();

    return {
      isActive,
      startTime: start || now,
      durationMs,
      elapsedMs,
      remainingMs,
      remainingMinutes,
      expiresAt: (start || now) + durationMs,
      isForcedLogout
    };
  }

  isSignupWindowActive() {
    return this.getSignupWindowStatus().isActive;
  }

  isForcedLogout() {
    try {
      return this.storage.getItem('quickbite_forced_logout') === 'true';
    } catch {
      return false;
    }
  }

  setForcedLogout(flag) {
    try {
      if (flag) {
        this.storage.setItem('quickbite_forced_logout', 'true');
      } else {
        this.storage.removeItem('quickbite_forced_logout');
      }
    } catch (e) {}
    if (typeof window !== 'undefined' && window.dispatchEvent) {
      window.dispatchEvent(new CustomEvent('quickbite:signup-window-updated'));
    }
  }

  resetSignupWindow(durationMinutes = 60) {
    try {
      const start = Date.now();
      const duration = durationMinutes * 60 * 1000;
      this.storage.setItem('quickbite_signup_window_start', String(start));
      this.storage.setItem('quickbite_signup_window_duration', String(duration));
      this.storage.removeItem('quickbite_forced_logout');
    } catch (e) {}
    if (typeof window !== 'undefined' && window.dispatchEvent) {
      window.dispatchEvent(new CustomEvent('quickbite:signup-window-updated'));
    }
    return this.getSignupWindowStatus();
  }

  expireSignupWindow() {
    try {
      const duration = 60 * 60 * 1000;
      const start = Date.now() - duration - 1000; // Expired 1 second ago
      this.storage.setItem('quickbite_signup_window_start', String(start));
      this.storage.setItem('quickbite_signup_window_duration', String(duration));
    } catch (e) {}
    if (typeof window !== 'undefined' && window.dispatchEvent) {
      window.dispatchEvent(new CustomEvent('quickbite:signup-window-updated'));
    }
    return this.getSignupWindowStatus();
  }

  // Favorites
  getFavorites() {
    return this.get(this.KEYS.FAVORITES, []);
  }

  toggleFavorite(restaurantId) {
    let favs = this.getFavorites();
    const index = favs.indexOf(restaurantId);
    let added = false;
    if (index >= 0) {
      favs.splice(index, 1);
    } else {
      favs.push(restaurantId);
      added = true;
    }
    this.set(this.KEYS.FAVORITES, favs);
    window.dispatchEvent(new CustomEvent('quickbite:favorites-updated', { detail: favs }));
    this.showToast(added ? "Added to favorites ❤️" : "Removed from favorites", "info");
    return added;
  }

  // --- UI Toast Notifications ---
  showToast(message, type = 'info', duration = 3500) {
    if (typeof document === 'undefined' || !document.body) return;
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    if (!toast || !toast.classList) return;
    toast.className = `toast toast-${type} toast-enter`;

    const iconMap = {
      success: 'fa-circle-check',
      error: 'fa-circle-xmark',
      warning: 'fa-triangle-exclamation',
      info: 'fa-circle-info'
    };

    toast.innerHTML = `
      <i class="fa-solid ${iconMap[type] || 'fa-bell'} toast-icon"></i>
      <div class="toast-content">
        <p class="toast-message">${message}</p>
      </div>
      <button class="toast-close" onclick="this.parentElement.remove()" aria-label="Close notification">
        <i class="fa-solid fa-xmark"></i>
      </button>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast?.classList?.remove?.('toast-enter');
    }, 10);

    setTimeout(() => {
      toast?.classList?.add?.('toast-exit');
      setTimeout(() => toast?.remove?.(), 350);
    }, duration);
  }

  // --- Customer Profile & Address Management ---
  updateUserProfile(userId, data) {
    const users = this.get(this.KEYS.USERS, []);
    const idx = users.findIndex(u => u.id === userId);
    if (idx >= 0) {
      users[idx] = { ...users[idx], ...data };
      this.set(this.KEYS.USERS, users);
      
      const current = this.getCurrentUser();
      if (current && current.id === userId) {
        this.setCurrentUser(users[idx]);
      }
      this.showToast("Profile updated successfully!", "success");
      return users[idx];
    }
    return null;
  }

  getUserAddresses(userId = null) {
    let addrs = [];
    const user = userId ? this.getUserById(userId) : this.getCurrentUser();
    if (user && Array.isArray(user.addresses) && user.addresses.length > 0) {
      addrs = user.addresses;
    } else {
      const globalAddrs = this.getAddresses();
      if (globalAddrs && globalAddrs.length > 0) {
        addrs = globalAddrs;
      } else {
        addrs = DEFAULT_ADDRESSES;
      }
    }
    return addrs.map(a => ({
      id: a.id || `addr-${Date.now()}`,
      tag: a.tag || a.type || 'Home',
      type: a.type || a.tag || 'Home',
      street: a.street || a.address || 'Flat 402, Sunshine Heights, Jubilee Enclave',
      address: a.address || a.street || 'Flat 402, Sunshine Heights, Jubilee Enclave',
      landmark: a.landmark || '',
      city: a.city || 'Hyderabad',
      pincode: a.pincode || '500081',
      phone: a.phone || '+91 98765 43210',
      isDefault: !!a.isDefault
    }));
  }

  addAddress(userId, addressData) {
    const rawStreet = addressData.street || addressData.address || 'Flat 402, Sunshine Heights, Jubilee Enclave';
    const newAddress = {
      id: addressData.id || `addr-${Date.now()}`,
      tag: addressData.tag || addressData.type || 'Home',
      type: addressData.type || addressData.tag || 'Home',
      street: rawStreet,
      address: rawStreet,
      landmark: addressData.landmark || '',
      city: addressData.city || 'Hyderabad',
      pincode: addressData.pincode || '500081',
      phone: addressData.phone || '+91 98765 43210',
      isDefault: addressData.isDefault !== undefined ? !!addressData.isDefault : true
    };

    // 1. Sync to global addresses list
    const globalAddrs = this.getAddresses();
    if (newAddress.isDefault) {
      globalAddrs.forEach(a => a.isDefault = false);
    }
    const existingIdx = globalAddrs.findIndex(a => a.id === newAddress.id);
    if (existingIdx >= 0) {
      globalAddrs[existingIdx] = { ...globalAddrs[existingIdx], ...newAddress };
    } else {
      globalAddrs.push(newAddress);
    }
    this.set(this.KEYS.ADDRESSES, globalAddrs);

    // 2. Sync to user record if user exists
    const users = this.get(this.KEYS.USERS, []);
    let user = userId ? users.find(u => u.id === userId) : null;
    if (!user) {
      const curr = this.getCurrentUser();
      if (curr) user = users.find(u => u.id === curr.id);
    }
    if (!user && users.length > 0) {
      user = users[0];
    }
    if (user) {
      if (!user.addresses) user.addresses = [];
      if (newAddress.isDefault) {
        user.addresses.forEach(a => a.isDefault = false);
      }
      const uIdx = user.addresses.findIndex(a => a.id === newAddress.id);
      if (uIdx >= 0) {
        user.addresses[uIdx] = { ...user.addresses[uIdx], ...newAddress };
      } else {
        user.addresses.push(newAddress);
      }
      this.set(this.KEYS.USERS, users);
      const curr = this.getCurrentUser();
      if (curr && curr.id === user.id) {
        this.setCurrentUser(user);
      }
    }

    window.dispatchEvent(new CustomEvent('quickbite:addresses-updated', { detail: globalAddrs }));
    this.showToast("Address saved successfully!", "success");
    return newAddress;
  }

  deleteAddress(userId, addressId) {
    let globalAddrs = this.getAddresses().filter(a => a.id !== addressId);
    if (globalAddrs.length > 0 && !globalAddrs.some(a => a.isDefault)) {
      globalAddrs[0].isDefault = true;
    }
    this.set(this.KEYS.ADDRESSES, globalAddrs);

    const users = this.get(this.KEYS.USERS, []);
    let user = userId ? users.find(u => u.id === userId) : null;
    if (!user) {
      const curr = this.getCurrentUser();
      if (curr) user = users.find(u => u.id === curr.id);
    }
    if (user && user.addresses) {
      user.addresses = user.addresses.filter(a => a.id !== addressId);
      if (user.addresses.length > 0 && !user.addresses.some(a => a.isDefault)) {
        user.addresses[0].isDefault = true;
      }
      this.set(this.KEYS.USERS, users);
      const curr = this.getCurrentUser();
      if (curr && curr.id === user.id) {
        this.setCurrentUser(user);
      }
    }

    window.dispatchEvent(new CustomEvent('quickbite:addresses-updated', { detail: globalAddrs }));
    this.showToast("Address removed", "info");
    return true;
  }

  // --- Reordering & Order Actions ---
  reorder(orderId) {
    const order = this.getOrderById(orderId);
    if (!order) {
      this.showToast("Order not found", "error");
      return false;
    }

    const cart = {
      items: order.items.map(item => {
        const dish = this.getDishById(item.dishId) || item;
        return {
          dishId: item.dishId,
          restaurantId: order.restaurantId,
          name: item.name,
          price: item.price,
          originalPrice: dish.price || item.price,
          image: dish.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
          isVeg: item.isVeg !== undefined ? item.isVeg : true,
          quantity: item.quantity || 1
        };
      }),
      coupon: null
    };

    this.saveCart(cart);
    this.showToast(`Items from #${orderId} added to cart!`, "success");
    return true;
  }

  rateOrder(orderId, rating, comment = "") {
    const orders = this.getOrders();
    const order = orders.find(o => o.id === orderId);
    if (order) {
      order.rating = rating;
      order.reviewComment = comment;
      order.ratedAt = new Date().toISOString();
      this.set(this.KEYS.ORDERS, orders);
      this.showToast("Thank you for your rating!", "success");
      window.dispatchEvent(new CustomEvent('quickbite:orders-updated', { detail: orders }));
      return true;
    }
    return false;
  }

  cancelOrder(orderId, reason = "Customer requested cancellation") {
    const order = this.getOrderById(orderId);
    if (!order) return false;
    if (order.status === 'out_for_delivery' || order.status === 'delivered') {
      this.showToast("Cannot cancel an order that is already on its way or delivered", "error");
      return false;
    }
    this.updateOrderStatus(orderId, 'cancelled', { cancelReason: reason });
    this.showToast(`Order #${orderId} has been cancelled`, "info");
    return true;
  }

  // --- Delivery Partner Fleet Operations ---
  getAvailableDeliveries() {
    const orders = this.getOrders();
    return orders.filter(o => 
      (o.status === 'ready_for_pickup' || o.status === 'preparing') && 
      (!o.deliveryPartnerId || o.deliveryPartnerId === '')
    );
  }

  getPartnerDeliveries(partnerId = 'usr-driver-1') {
    const orders = this.getOrders();
    return orders.filter(o => o.deliveryPartnerId === partnerId);
  }

  acceptDelivery(orderId, partnerData = {}) {
    const orders = this.getOrders();
    const order = orders.find(o => o.id === orderId);
    if (!order) return null;

    order.deliveryPartnerId = partnerData.id || "usr-driver-1";
    order.deliveryPartnerName = partnerData.name || "Vikram Singh";
    order.deliveryPartnerPhone = partnerData.phone || "+91 91234 56789";
    order.deliveryPartnerVehicle = partnerData.vehicle || "Honda Activa 6G (TS 09 EQ 4022)";
    order.estimatedPayout = order.estimatedPayout || 65;

    if (!order.statusTimestamps) order.statusTimestamps = {};
    order.statusTimestamps.accepted_by_driver = new Date().toISOString();

    // If ready, moves to out_for_delivery, otherwise assigned
    if (order.status === 'ready_for_pickup') {
      order.status = 'out_for_delivery';
      order.statusTimestamps.out_for_delivery = new Date().toISOString();
    }

    this.set(this.KEYS.ORDERS, orders);
    this.showToast(`Delivery for Order #${orderId} accepted!`, "success");
    window.dispatchEvent(new CustomEvent('quickbite:orders-updated', { detail: orders }));
    return order;
  }

  confirmPickup(orderId) {
    const orders = this.getOrders();
    const order = orders.find(o => o.id === orderId);
    if (!order) return null;

    order.status = 'out_for_delivery';
    if (!order.statusTimestamps) order.statusTimestamps = {};
    order.statusTimestamps.out_for_delivery = new Date().toISOString();

    this.set(this.KEYS.ORDERS, orders);
    this.showToast(`Food picked up! Heading to customer location.`, "info");
    window.dispatchEvent(new CustomEvent('quickbite:orders-updated', { detail: orders }));
    return order;
  }

  markOrderDelivered(orderId, payout = 65) {
    const orders = this.getOrders();
    const order = orders.find(o => o.id === orderId);
    if (!order) return null;

    order.status = 'delivered';
    if (!order.statusTimestamps) order.statusTimestamps = {};
    order.statusTimestamps.delivered = new Date().toISOString();

    // Increment driver earnings in user record
    const users = this.get(this.KEYS.USERS, []);
    const driver = users.find(u => u.id === (order.deliveryPartnerId || 'usr-driver-1'));
    if (driver) {
      driver.earnings = (driver.earnings || 0) + payout;
      driver.totalDeliveries = (driver.totalDeliveries || 0) + 1;
      this.set(this.KEYS.USERS, users);
      
      const current = this.getCurrentUser();
      if (current && current.id === driver.id) {
        this.setCurrentUser(driver);
      }
    }

    this.set(this.KEYS.ORDERS, orders);
    this.showToast(`Order #${orderId} delivered! +₹${payout} added to your earnings.`, "success");
    window.dispatchEvent(new CustomEvent('quickbite:orders-updated', { detail: orders }));
    return order;
  }

  // --- Theme ---
  getTheme() {
    const saved = this.get(this.KEYS.THEME, null);
    if (saved) return saved;
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }

  setTheme(theme) {
    this.set(this.KEYS.THEME, theme);
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
      document.documentElement.style.colorScheme = theme;
      if (theme === 'dark') {
        document.documentElement.style.backgroundColor = '#090D16';
      } else {
        document.documentElement.style.backgroundColor = '#F8FAFC';
      }
    }
  }

  toggleTheme() {
    if (typeof document !== 'undefined' && document.body) {
      document.body.classList.add('theme-transitioning');
      setTimeout(() => {
        document.body.classList.remove('theme-transitioning');
      }, 350);
    }
    const nextTheme = this.getTheme() === 'dark' ? 'light' : 'dark';
    this.setTheme(nextTheme);
    return nextTheme;
  }

  // ========================================================================
  // ADMIN PLATFORM MANAGEMENT METHODS
  // ========================================================================

  getUsers(filterFn = null) {
    const users = this.get(this.KEYS.USERS, DEFAULT_USERS);
    return filterFn ? users.filter(filterFn) : users;
  }

  getUserById(id) {
    const users = this.getUsers();
    return users.find(u => u.id === id) || null;
  }

  saveUser(userData) {
    const users = this.getUsers();
    const idx = users.findIndex(u => u.id === userData.id);
    if (idx >= 0) {
      users[idx] = { ...users[idx], ...userData };
    } else {
      if (!userData.id) userData.id = `usr-${Date.now()}`;
      if (!userData.joinedAt) userData.joinedAt = new Date().toISOString();
      if (!userData.status) userData.status = 'active';
      users.unshift(userData);
    }
    this.set(this.KEYS.USERS, users);
    window.dispatchEvent(new CustomEvent('quickbite:users-updated', { detail: users }));
    this.showToast(`User record for "${userData.name}" saved successfully!`, 'success');
    return userData;
  }

  deleteUser(userId) {
    let users = this.getUsers();
    const user = users.find(u => u.id === userId);
    if (!user) return false;
    if (user.role === 'admin') {
      this.showToast("Cannot delete primary system Administrator account", "error");
      return false;
    }
    users = users.filter(u => u.id !== userId);
    this.set(this.KEYS.USERS, users);
    this.showToast(`Customer ${user.name} removed from system`, "info");
    window.dispatchEvent(new CustomEvent('quickbite:users-updated', { detail: users }));
    return true;
  }

  toggleUserStatus(userId) {
    const users = this.getUsers();
    const user = users.find(u => u.id === userId);
    if (!user) return null;
    user.status = user.status === 'blocked' ? 'active' : 'blocked';
    this.set(this.KEYS.USERS, users);
    this.showToast(`Customer "${user.name}" status set to ${user.status.toUpperCase()}`, user.status === 'active' ? 'success' : 'warning');
    window.dispatchEvent(new CustomEvent('quickbite:users-updated', { detail: users }));
    return user;
  }

  // --- Restaurant Admin Operations ---
  approveRestaurant(restId) {
    const rest = this.getRestaurantById(restId);
    if (!rest) return false;
    rest.approvalStatus = 'approved';
    rest.status = 'open';
    delete rest.rejectionReason;
    this.saveRestaurant(rest);
    this.showToast(`Restaurant "${rest.name}" approved successfully! Live on QuickBite.`, 'success');
    return true;
  }

  rejectRestaurant(restId, reason = "Documentation incomplete or hygiene check pending") {
    const rest = this.getRestaurantById(restId);
    if (!rest) return false;
    rest.approvalStatus = 'rejected';
    rest.rejectionReason = reason;
    rest.status = 'closed';
    this.saveRestaurant(rest);
    this.showToast(`Restaurant "${rest.name}" application rejected.`, 'warning');
    return true;
  }

  deleteRestaurant(restId) {
    let list = this.getRestaurants();
    const rest = list.find(r => r.id === restId);
    if (!rest) return false;
    list = list.filter(r => r.id !== restId);
    this.set(this.KEYS.RESTAURANTS, list);
    this.showToast(`Restaurant "${rest.name}" deregistered from platform`, 'info');
    window.dispatchEvent(new CustomEvent('quickbite:restaurants-updated'));
    return true;
  }

  toggleRestaurantStatus(restId) {
    const rest = this.getRestaurantById(restId);
    if (!rest) return null;
    rest.status = (rest.status === 'closed') ? 'open' : 'closed';
    this.saveRestaurant(rest);
    this.showToast(`Restaurant "${rest.name}" is now ${rest.status.toUpperCase()}`, 'info');
    return rest;
  }

  toggleRestaurantFeatured(restId) {
    const rest = this.getRestaurantById(restId);
    if (!rest) return null;
    rest.isFeatured = !rest.isFeatured;
    this.saveRestaurant(rest);
    this.showToast(`Restaurant "${rest.name}" featured: ${rest.isFeatured ? 'YES' : 'NO'}`, 'info');
    return rest;
  }

  // --- Delivery Fleet Operations ---
  getDeliveryPartners() {
    return this.getUsers(u => u.role === 'delivery');
  }

  saveDeliveryPartner(data) {
    const partnerData = {
      role: 'delivery',
      status: 'active',
      rating: 4.8,
      totalDeliveries: 0,
      earnings: 0,
      joinedAt: new Date().toISOString(),
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      ...data
    };
    return this.saveUser(partnerData);
  }

  assignDeliveryPartner(orderId, partnerId) {
    const order = this.getOrderById(orderId);
    const partner = this.getUserById(partnerId);
    if (!order || !partner) {
      this.showToast("Order or Delivery Partner record not found", "error");
      return null;
    }
    order.deliveryPartnerId = partner.id;
    order.deliveryPartnerName = partner.name;
    order.deliveryPartnerPhone = partner.phone;
    order.deliveryPartnerVehicle = partner.vehicle || 'Motorcycle';
    
    if (order.status === 'placed') {
      order.status = 'preparing';
    } else if (order.status === 'ready_for_pickup') {
      order.status = 'out_for_delivery';
    }
    if (!order.statusTimestamps) order.statusTimestamps = {};
    order.statusTimestamps.assigned_driver = new Date().toISOString();

    const orders = this.getOrders();
    const idx = orders.findIndex(o => o.id === orderId);
    if (idx >= 0) orders[idx] = order;
    this.set(this.KEYS.ORDERS, orders);

    this.showToast(`Rider ${partner.name} assigned to Order #${order.id}`, "success");
    window.dispatchEvent(new CustomEvent('quickbite:orders-updated', { detail: orders }));
    return order;
  }

  deleteOrder(orderId) {
    let orders = this.getOrders();
    orders = orders.filter(o => o.id !== orderId);
    this.set(this.KEYS.ORDERS, orders);
    this.showToast(`Order #${orderId} deleted from database`, "info");
    window.dispatchEvent(new CustomEvent('quickbite:orders-updated', { detail: orders }));
    return true;
  }

  // --- Financial Transactions Derived from Orders ---
  getTransactions() {
    const orders = this.getOrders();
    return orders.map((o, idx) => {
      const gmv = o.grandTotal || 0;
      const commission = Math.round(gmv * 0.15); // QuickBite 15% platform commission
      const deliveryPayout = o.deliveryFee || 30;
      const restaurantPayout = Math.max(0, gmv - commission - deliveryPayout);
      return {
        id: o.transactionId || `TXN-${98200 + idx}`,
        orderId: o.id,
        customerId: o.customerId,
        customerName: o.customerName,
        restaurantName: o.restaurantName,
        paymentMethod: o.paymentMethod || 'UPI (Simulated)',
        paymentStatus: o.status === 'cancelled' ? 'Refunded' : (o.paymentStatus || 'Paid'),
        amount: gmv,
        platformCommission: commission,
        restaurantPayout: restaurantPayout,
        deliveryPayout: deliveryPayout,
        createdAt: o.createdAt || new Date().toISOString()
      };
    });
  }

  // --- Dynamic Admin Aggregate Stats Calculated from LocalStorage ---
  getAdminStats() {
    const users = this.get(this.KEYS.USERS, DEFAULT_USERS);
    const restaurants = this.get(this.KEYS.RESTAURANTS, DEFAULT_RESTAURANTS);
    const orders = this.get(this.KEYS.ORDERS, DEFAULT_ORDERS);

    const customers = users.filter(u => u.role === 'customer');
    const drivers = users.filter(u => u.role === 'delivery');

    const totalOrders = orders.length;
    const deliveredOrders = orders.filter(o => o.status === 'delivered');
    const cancelledOrders = orders.filter(o => o.status === 'cancelled');
    const activeOrders = orders.filter(o => !['delivered', 'cancelled'].includes(o.status));

    const totalGMV = orders
      .filter(o => o.status !== 'cancelled')
      .reduce((sum, o) => sum + (o.grandTotal || 0), 0);

    const deliveredRevenue = deliveredOrders.reduce((sum, o) => sum + (o.grandTotal || 0), 0);
    const platformCommission = Math.round(deliveredRevenue * 0.15);
    const avgOrderValue = deliveredOrders.length > 0 ? Math.round(deliveredRevenue / deliveredOrders.length) : 0;

    const pendingRestaurants = restaurants.filter(r => r.approvalStatus === 'pending');
    const approvedRestaurants = restaurants.filter(r => r.approvalStatus !== 'pending' && r.approvalStatus !== 'rejected');
    const activeFleet = drivers.filter(d => d.status !== 'offline');

    return {
      totalCustomers: customers.length,
      activeCustomers: customers.filter(c => c.status !== 'blocked').length,
      blockedCustomers: customers.filter(c => c.status === 'blocked').length,

      totalRestaurants: restaurants.length,
      approvedRestaurants: approvedRestaurants.length,
      pendingRestaurants: pendingRestaurants.length,
      openRestaurants: restaurants.filter(r => r.status === 'open').length,

      totalDrivers: drivers.length,
      activeDrivers: activeFleet.length,
      busyDrivers: drivers.filter(d => d.status === 'busy').length,

      totalOrders,
      deliveredOrders: deliveredOrders.length,
      activeOrders: activeOrders.length,
      cancelledOrders: cancelledOrders.length,

      totalGMV,
      totalRevenue: deliveredRevenue,
      platformCommission,
      avgOrderValue
    };
  }

  // --- Wallet Operations ---
  getWallet() {
    return this.get(this.KEYS.WALLET, DEFAULT_WALLET);
  }

  addWalletMoney(amount, paymentSource = 'UPI') {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) return false;
    const wallet = this.getWallet();
    wallet.balance = (wallet.balance || 0) + numAmount;
    const txn = {
      id: `txn-${Date.now()}`,
      type: 'credit',
      title: `Top-up via ${paymentSource}`,
      amount: numAmount,
      date: new Date().toISOString(),
      status: 'Success'
    };
    if (!wallet.transactions) wallet.transactions = [];
    wallet.transactions.unshift(txn);
    this.set(this.KEYS.WALLET, wallet);
    window.dispatchEvent(new CustomEvent('quickbite:wallet-updated', { detail: wallet }));
    this.showToast(`₹${numAmount} added to QuickBite Wallet!`, 'success');
    return wallet;
  }

  deductWalletMoney(amount, orderId = '') {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) return false;
    const wallet = this.getWallet();
    if ((wallet.balance || 0) < numAmount) return false;
    wallet.balance -= numAmount;
    const txn = {
      id: `txn-${Date.now()}`,
      type: 'debit',
      title: `Order #${orderId || 'QB'} Payment`,
      amount: numAmount,
      date: new Date().toISOString(),
      status: 'Success'
    };
    if (!wallet.transactions) wallet.transactions = [];
    wallet.transactions.unshift(txn);
    this.set(this.KEYS.WALLET, wallet);
    window.dispatchEvent(new CustomEvent('quickbite:wallet-updated', { detail: wallet }));
    return true;
  }

  // --- Saved Cards Operations ---
  getSavedCards() {
    return this.get(this.KEYS.SAVED_CARDS, DEFAULT_SAVED_CARDS);
  }

  saveCard(cardData) {
    const cards = this.getSavedCards();
    const newCard = {
      id: `card-${Date.now()}`,
      brand: cardData.brand || 'visa',
      number: cardData.number,
      holder: cardData.holder || 'Rahul Sharma',
      expiry: cardData.expiry || '12/28',
      bank: cardData.bank || 'Bank Card',
      isDefault: cards.length === 0 || !!cardData.isDefault
    };
    if (newCard.isDefault) {
      cards.forEach(c => c.isDefault = false);
    }
    cards.push(newCard);
    this.set(this.KEYS.SAVED_CARDS, cards);
    window.dispatchEvent(new CustomEvent('quickbite:cards-updated', { detail: cards }));
    this.showToast('Card saved securely!', 'success');
    return newCard;
  }

  removeCard(cardId) {
    let cards = this.getSavedCards().filter(c => c.id !== cardId);
    if (cards.length > 0 && !cards.some(c => c.isDefault)) {
      cards[0].isDefault = true;
    }
    this.set(this.KEYS.SAVED_CARDS, cards);
    window.dispatchEvent(new CustomEvent('quickbite:cards-updated', { detail: cards }));
    this.showToast('Card removed', 'info');
    return cards;
  }

  setDefaultCard(cardId) {
    const cards = this.getSavedCards();
    cards.forEach(c => {
      c.isDefault = (c.id === cardId);
    });
    this.set(this.KEYS.SAVED_CARDS, cards);
    window.dispatchEvent(new CustomEvent('quickbite:cards-updated', { detail: cards }));
    this.showToast('Default payment card updated', 'success');
    return cards;
  }

  // --- Saved UPI Operations ---
  getSavedUpi() {
    return this.get(this.KEYS.SAVED_UPI, DEFAULT_SAVED_UPI);
  }

  saveUpi(vpa, appName = 'UPI') {
    const cleanVpa = (vpa || '').trim();
    if (!cleanVpa.includes('@')) {
      this.showToast('Please enter a valid UPI VPA (e.g. user@okhdfcbank)', 'error');
      return null;
    }
    const upiList = this.getSavedUpi();
    if (upiList.some(u => u.vpa.toLowerCase() === cleanVpa.toLowerCase())) {
      this.showToast('This UPI ID is already saved', 'warning');
      return null;
    }
    const newUpi = {
      id: `upi-${Date.now()}`,
      vpa: cleanVpa,
      appName: appName || 'UPI App',
      isDefault: upiList.length === 0
    };
    upiList.push(newUpi);
    this.set(this.KEYS.SAVED_UPI, upiList);
    window.dispatchEvent(new CustomEvent('quickbite:upi-updated', { detail: upiList }));
    this.showToast('UPI ID saved successfully!', 'success');
    return newUpi;
  }

  removeUpi(upiId) {
    let upiList = this.getSavedUpi().filter(u => u.id !== upiId);
    if (upiList.length > 0 && !upiList.some(u => u.isDefault)) {
      upiList[0].isDefault = true;
    }
    this.set(this.KEYS.SAVED_UPI, upiList);
    window.dispatchEvent(new CustomEvent('quickbite:upi-updated', { detail: upiList }));
    this.showToast('UPI ID removed', 'info');
    return upiList;
  }

  setDefaultUpi(upiId) {
    const upiList = this.getSavedUpi();
    upiList.forEach(u => {
      u.isDefault = (u.id === upiId);
    });
    this.set(this.KEYS.SAVED_UPI, upiList);
    window.dispatchEvent(new CustomEvent('quickbite:upi-updated', { detail: upiList }));
    this.showToast('Default UPI ID updated', 'success');
    return upiList;
  }

  // --- Address Operations ---
  getAddresses() {
    return this.get(this.KEYS.ADDRESSES, DEFAULT_ADDRESSES);
  }

  saveAddress(addressData) {
    return this.addAddress(null, addressData);
  }

  removeAddress(addressId) {
    return this.deleteAddress(null, addressId);
  }

  setDefaultAddress(addressId) {
    const addresses = this.getAddresses();
    addresses.forEach(a => {
      a.isDefault = (a.id === addressId);
    });
    this.set(this.KEYS.ADDRESSES, addresses);

    // Also sync to current user
    const users = this.get(this.KEYS.USERS, []);
    const curr = this.getCurrentUser();
    if (curr) {
      const user = users.find(u => u.id === curr.id);
      if (user && user.addresses) {
        user.addresses.forEach(a => {
          a.isDefault = (a.id === addressId);
        });
        this.set(this.KEYS.USERS, users);
        this.setCurrentUser(user);
      }
    }

    window.dispatchEvent(new CustomEvent('quickbite:addresses-updated', { detail: addresses }));
    this.showToast('Default delivery address updated', 'success');
    return addresses;
  }

  // --- User Preferences & Security ---
  getUserPreferences() {
    return this.get(this.KEYS.USER_PREFERENCES, DEFAULT_USER_PREFERENCES);
  }

  saveUserPreferences(newPrefs) {
    const current = this.getUserPreferences();
    const updated = { ...current, ...newPrefs };
    this.set(this.KEYS.USER_PREFERENCES, updated);
    window.dispatchEvent(new CustomEvent('quickbite:preferences-updated', { detail: updated }));
    this.showToast('Preferences saved successfully!', 'success');
    return updated;
  }

  changePassword(currentPassword, newPassword) {
    const user = this.getCurrentUser();
    if (!user) return { success: false, message: 'User not logged in' };
    const users = this.get(this.KEYS.USERS, DEFAULT_USERS);
    const targetIdx = users.findIndex(u => u.id === user.id || u.email === user.email);
    if (targetIdx >= 0) {
      if (users[targetIdx].password && users[targetIdx].password !== currentPassword) {
        this.showToast('Current password does not match', 'error');
        return { success: false, message: 'Incorrect current password' };
      }
      users[targetIdx].password = newPassword;
      this.set(this.KEYS.USERS, users);
      user.password = newPassword;
      this.setCurrentUser(user);
      this.showToast('Password updated securely!', 'success');
      return { success: true };
    }
    return { success: false, message: 'User record not found' };
  }

}

// Global Singleton Instance
const QuickBiteDB = new QuickBiteStorageManager();
if (typeof window !== 'undefined') {
  window.QuickBiteDB = QuickBiteDB;
}

export default QuickBiteDB;
export {
  QuickBiteStorageManager,
  DEFAULT_RESTAURANTS,
  DEFAULT_DISHES,
  DEFAULT_CATEGORIES,
  DEFAULT_USERS,
  DEFAULT_ORDERS,
  DEFAULT_COUPONS,
  DEFAULT_WALLET,
  DEFAULT_SAVED_CARDS,
  DEFAULT_SAVED_UPI,
  DEFAULT_ADDRESSES,
  DEFAULT_USER_PREFERENCES
};
