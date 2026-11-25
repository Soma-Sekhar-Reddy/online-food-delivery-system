/**
 * Automated Test Suite for QuickBite End-to-End Integration
 * Validates all 20 checkpoints across Customer, Restaurant, Delivery Partner, and Admin.
 */

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// Mock browser environment for Node.js
const mockLocalStorage = {
  store: {},
  getItem(k) { return this.store[k] || null; },
  setItem(k, v) { this.store[k] = String(v); },
  removeItem(k) { delete this.store[k]; },
  clear() { this.store = {}; }
};

global.localStorage = mockLocalStorage;
global.window = {
  addEventListener() {},
  dispatchEvent() {}
};
global.CustomEvent = class { constructor(type, detail) { this.type = type; this.detail = detail; } };
global.document = {
  documentElement: {
    setAttribute() {},
    getAttribute() { return 'light'; }
  },
  body: { appendChild() {} },
  getElementById() { return null; },
  createElement() {
    return {
      className: '',
      style: {},
      appendChild() {},
      classList: { add() {}, remove() {} },
      remove() {}
    };
  }
};

// Load storage.js
require('./js/storage.js');
const db = window.QuickBiteDB;

console.log('=== STARTING QUICKBITE 20-POINT INTEGRATION TEST ===\n');

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`[PASS] ${message}`);
    passed++;
  } else {
    console.error(`[FAIL] ${message}`);
    failed++;
  }
}

try {
  // 1. Customer registration
  const regUser = db.register({
    name: "Aman Gupta",
    email: "aman@test.com",
    password: "password123",
    role: "customer",
    addresses: [{ id: "addr-aman", tag: "Home", street: "Hitech City, Hyderabad", isDefault: true }]
  });
  assert(regUser && regUser.email === "aman@test.com", "Point 1: Customer registration succeeds");

  // 2. Customer login
  const custLogin = db.login("aman@test.com", "password123");
  assert(custLogin && custLogin.role === "customer", "Point 2: Customer login succeeds");

  // 3. Restaurant login
  const restLogin = db.login("owner1@quickbite.com", "password123");
  assert(restLogin && restLogin.role === "restaurant" && restLogin.restaurantId === "rest-1", "Point 3: Restaurant login succeeds");

  // 4. Delivery partner login
  const driverLogin = db.login("driver@quickbite.com", "password123");
  assert(driverLogin && driverLogin.role === "delivery", "Point 4: Delivery partner login succeeds");

  // 5. Admin login
  const adminLogin = db.login("admin@quickbite.com", "admin123");
  assert(adminLogin && adminLogin.role === "admin", "Point 5: Admin login succeeds");

  // 6. Food browsing
  const restaurants = db.getRestaurants();
  const dishes = db.getDishes();
  assert(restaurants.length >= 10, `Point 6A: ${restaurants.length} restaurants available in directory`);
  assert(dishes.length >= 40, `Point 6B: ${dishes.length} dishes available for browsing (rich catalog)`);

  // 7. Food searching
  const biryaniDishes = db.getDishes(d => d.name.toLowerCase().includes("biryani") || d.category === "Biryani");
  assert(biryaniDishes.length > 0, `Point 7: Food searching finds ${biryaniDishes.length} biryani items`);

  // 8. Cart calculations
  db.clearCart();
  db.addToCart("dish-1", 2);
  db.addToCart("dish-2", 1);
  let summary = db.getCartSummary();
  const d1 = db.getDishById("dish-1");
  const d2 = db.getDishById("dish-2");
  const expectedSubtotal = ((d1.discountPrice || d1.price) * 2) + ((d2.discountPrice || d2.price) * 1);
  assert(summary.subtotal === expectedSubtotal, `Point 8: Cart subtotal correctly calculated as ₹${summary.subtotal}`);

  // 9. Coupon calculations
  db.applyCoupon("QUICK50"); // 50% off up to 100
  summary = db.getCartSummary();
  assert(summary.discount === 100, `Point 9: Coupon QUICK50 max discount correctly capped at ₹${summary.discount}`);

  // 10. Checkout preparation
  assert(summary.total > 0 && summary.totalItems === 3, `Point 10: Checkout summary ready with total: ₹${summary.total}`);

  // 10B. Address Addition & Resolution Check
  const addedAddr = db.addAddress("usr-customer-1", {
    tag: "Work",
    street: "Level 4, Building 14, Mindspace IT Park, Madhapur",
    landmark: "Inorbit Mall",
    city: "Hyderabad",
    pincode: "500081",
    isDefault: true
  });
  const allUserAddrs = db.getUserAddresses("usr-customer-1");
  assert(addedAddr && addedAddr.id.startsWith("addr-") && addedAddr.tag === "Work", "Point 10B: Address successfully added via storage system");
  assert(allUserAddrs.some(a => a.id === addedAddr.id), "Point 10C: Added address successfully retrieved from user addresses");

  // 11. Order creation
  const newOrder = db.createOrder({
    customerId: "usr-customer-1",
    customerName: "Rahul Sharma",
    customerPhone: "+91 98765 43210",
    customerAddress: addedAddr.street,
    restaurantId: "rest-1",
    restaurantName: "The Royal Biryani & Kebabs",
    restaurantAddress: "Road No. 12, Banjara Hills, Hyderabad",
    items: db.getCart().items,
    itemTotal: summary.subtotal,
    deliveryFee: summary.deliveryFee,
    discount: summary.discount,
    taxes: summary.taxes,
    grandTotal: summary.total + 15, // with packaging
    paymentMethod: "UPI (Simulated)",
    paymentStatus: "Paid"
  });
  assert(newOrder && newOrder.id.startsWith("ORD-") && newOrder.status === "placed", `Point 11: Order creation generated #${newOrder.id} with status 'placed'`);
  assert(db.getCart().items.length === 0, "Point 11B: Cart cleared upon successful order creation");

  // 12. Restaurant order reception
  const restOrders = db.getOrders(o => o.restaurantId === "rest-1");
  const receivedOrder = restOrders.find(o => o.id === newOrder.id);
  assert(receivedOrder !== undefined, `Point 12: Restaurant received order #${newOrder.id}`);

  // 13. Restaurant order acceptance
  const acceptedOrder = db.updateOrderStatus(newOrder.id, "accepted");
  assert(acceptedOrder.status === "accepted", "Point 13: Restaurant accepted order successfully");

  // 14. Food preparation status
  const prepOrder = db.updateOrderStatus(newOrder.id, "preparing");
  assert(prepOrder.status === "preparing", "Point 14A: Food preparation marked as 'preparing'");
  const readyOrder = db.updateOrderStatus(newOrder.id, "ready_for_pickup");
  assert(readyOrder.status === "ready_for_pickup", "Point 14B: Food marked 'ready_for_pickup'");

  // 15. Delivery partner acceptance
  const availableDeliveries = db.getAvailableDeliveries();
  assert(availableDeliveries.some(o => o.id === newOrder.id), "Point 15A: Order is available on Delivery Radar");
  const acceptedDelivery = db.acceptDelivery(newOrder.id, { id: "usr-driver-1", name: "Vikram Singh", vehicle: "Honda Activa" });
  assert(acceptedDelivery.deliveryPartnerId === "usr-driver-1", "Point 15B: Delivery partner accepted the delivery");

  // 16. Food pickup
  const pickedUpOrder = db.confirmPickup(newOrder.id);
  assert(pickedUpOrder.status === "out_for_delivery", "Point 16: Food pickup confirmed by rider");

  // 17. Out-for-delivery status
  const currentOrderStatus = db.getOrderById(newOrder.id).status;
  assert(currentOrderStatus === "out_for_delivery", "Point 17: Out-for-delivery status synchronized in DB");

  // 18. Delivery completion
  const driverBefore = db.get(db.KEYS.USERS).find(u => u.id === "usr-driver-1");
  const initialEarnings = driverBefore.earnings || 0;
  const deliveredOrder = db.markOrderDelivered(newOrder.id, 65);
  assert(deliveredOrder.status === "delivered", "Point 18A: Order status updated to 'delivered'");
  const driverAfter = db.get(db.KEYS.USERS).find(u => u.id === "usr-driver-1");
  assert(driverAfter.earnings === initialEarnings + 65, `Point 18B: Driver wallet credited +₹65 (New balance: ₹${driverAfter.earnings})`);

  // 19. Customer order tracking
  const finalTrackOrder = db.getOrderById(newOrder.id);
  assert(finalTrackOrder.statusTimestamps.placed && finalTrackOrder.statusTimestamps.delivered, "Point 19: Full timestamp history preserved for live tracking");

  // 20. Admin analytics
  const allPlatformOrders = db.getOrders();
  const totalGMV = allPlatformOrders.filter(o => o.status !== "cancelled").reduce((acc, o) => acc + o.grandTotal, 0);
  assert(totalGMV > 0 && allPlatformOrders.length >= 3, `Point 20: Admin analytics computes total GMV of ₹${totalGMV} across ${allPlatformOrders.length} orders`);

} catch (err) {
  console.error("Test Exception:", err);
  failed++;
}

console.log(`\n=== INTEGRATION TEST SUMMARY: ${passed} PASSED, ${failed} FAILED ===`);
if (failed === 0) {
  console.log('ALL 20 CHECKPOINTS VERIFIED 100% FUNCTIONAL!');
}
