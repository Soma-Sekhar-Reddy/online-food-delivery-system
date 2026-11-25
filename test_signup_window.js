/**
 * Automated Verification Suite for:
 * 1. 1-Hour Signup Window Requirement on http://localhost:3000/
 * 2. Forced Logout ("leave it") Rule
 * 3. Window Expiration Handling
 */

const storageMap = new Map();
global.localStorage = {
  getItem: (key) => storageMap.get(key) || null,
  setItem: (key, val) => storageMap.set(key, String(val)),
  removeItem: (key) => storageMap.delete(key),
  clear: () => storageMap.clear()
};

global.window = {
  addEventListener: () => {},
  removeEventListener: () => {},
  dispatchEvent: () => true
};

global.CustomEvent = class CustomEvent {
  constructor(name, params) {
    this.type = name;
    this.detail = params?.detail;
  }
};

global.document = {
  documentElement: {
    setAttribute: () => {},
    getAttribute: () => 'light'
  },
  getElementById: () => null,
  createElement: () => ({ appendChild: () => {}, setAttribute: () => {}, style: {} }),
  body: { appendChild: () => {}, removeChild: () => {} }
};

let passed = 0;
let failed = 0;

function assert(cond, msg) {
  if (cond) {
    console.log(`[PASS] ${msg}`);
    passed++;
  } else {
    console.error(`[FAIL] ${msg}`);
    failed++;
  }
}

async function runTests() {
  console.log('=== STARTING 1-HOUR SIGNUP & FORCED LOGOUT VERIFICATION SUITE ===\n');

  const { default: QuickBiteDB } = await import('./src/services/storage.js');

  // Test 1: Fresh launch initializes 1-hour window
  storageMap.clear();
  QuickBiteDB.init();

  const status1 = QuickBiteDB.getSignupWindowStatus();
  assert(status1.isActive === true, 'Case 1A: 1-hour signup window is active on initialization');
  assert(status1.remainingMinutes >= 59 && status1.remainingMinutes <= 60, `Case 1B: Remaining duration is ~60 minutes (${status1.remainingMinutes}m)`);
  assert(QuickBiteDB.isForcedLogout() === false, 'Case 1C: Forced logout flag is false on fresh visitor');
  assert(QuickBiteDB.getCurrentUser() === null, 'Case 1D: Current user is null (no auto-login bypassing signup)');

  // Simulation of RootRoute decision logic for fresh visitor
  function simulateRootRouteDecision(db) {
    const currentUser = db.getCurrentUser();
    const isForcedLogout = db.isForcedLogout();
    const isSignupActive = db.isSignupWindowActive();

    if (currentUser) return { route: '/', action: 'render_landing' };
    if (isForcedLogout) return { route: '/', action: 'render_landing_guest' };
    if (isSignupActive) return { route: '/signup', action: 'redirect_to_signup' };
    return { route: '/', action: 'render_landing' };
  }

  const decision1 = simulateRootRouteDecision(QuickBiteDB);
  assert(decision1.action === 'redirect_to_signup' && decision1.route === '/signup', 'Case 1E: Opening http://localhost:3000/ correctly redirects fresh visitor to /signup');

  // Test 2: User completes registration (sign up)
  const newUser = QuickBiteDB.register({
    name: 'Priya Sharma',
    email: 'priya@test.com',
    phone: '+91 9876543210',
    password: 'password123',
    role: 'customer'
  });
  assert(newUser && newUser.email === 'priya@test.com', 'Case 2A: User successfully registered');
  assert(QuickBiteDB.getCurrentUser()?.email === 'priya@test.com', 'Case 2B: Current user is now active');
  assert(QuickBiteDB.isForcedLogout() === false, 'Case 2C: Forced logout remains false after registration');

  const decision2 = simulateRootRouteDecision(QuickBiteDB);
  assert(decision2.action === 'render_landing', 'Case 2D: Registered/authenticated user accessing http://localhost:3000/ can view Landing Page');

  // Test 3: User forcedly logs out
  QuickBiteDB.logout();
  assert(QuickBiteDB.getCurrentUser() === null, 'Case 3A: User session cleared on logout');
  assert(QuickBiteDB.isForcedLogout() === true, 'Case 3B: isForcedLogout flag is set to true');

  // Test reload/init persistence: does init() respect forced logout?
  QuickBiteDB.init();
  assert(QuickBiteDB.getCurrentUser() === null, 'Case 3C: After reload/init, user stays logged out (no unwanted demo auto-login)');

  // Test RootRoute decision after forced logout: "if the user forcedly logout leave it"
  const decision3 = simulateRootRouteDecision(QuickBiteDB);
  assert(decision3.action === 'render_landing_guest', 'Case 3D: After forced logout, opening http://localhost:3000/ leaves them on landing in guest mode (NOT redirected to signup)');

  // Test 4: User explicitly logs in again
  const loggedInUser = QuickBiteDB.login('priya@test.com', 'password123');
  assert(loggedInUser && loggedInUser.email === 'priya@test.com', 'Case 4A: User can sign back in');
  assert(QuickBiteDB.isForcedLogout() === false, 'Case 4B: Successful login clears forced logout flag');

  // Test 5: Window expiration after 1 hour (simulate elapsed > 1 hour)
  QuickBiteDB.logout();
  QuickBiteDB.setForcedLogout(false); // Reset forced logout to test pure window expiration
  QuickBiteDB.expireSignupWindow(); // Expire window

  const expiredStatus = QuickBiteDB.getSignupWindowStatus();
  assert(expiredStatus.isActive === false, 'Case 5A: 1-hour window correctly detected as expired');
  assert(expiredStatus.remainingMs === 0, 'Case 5B: Remaining ms is 0');

  const decision5 = simulateRootRouteDecision(QuickBiteDB);
  assert(decision5.action === 'render_landing', 'Case 5C: When 1-hour period has elapsed, opening http://localhost:3000/ renders landing page normally without redirect');

  // Test 6: Window reset functionality
  QuickBiteDB.resetSignupWindow(60);
  const resetStatus = QuickBiteDB.getSignupWindowStatus();
  assert(resetStatus.isActive === true, 'Case 6A: resetSignupWindow(60) restarts the active window');
  assert(QuickBiteDB.isForcedLogout() === false, 'Case 6B: resetSignupWindow clears forced logout state');

  console.log(`\n=== SUITE SUMMARY: ${passed} PASSED, ${failed} FAILED ===`);
  if (failed > 0) process.exit(1);
}

runTests().catch(err => {
  console.error('[SUITE ERROR]', err);
  process.exit(1);
});
