/**
 * QUICKBITE - Main Application JavaScript
 * Handles landing page interactions, filters, cart, search, role demo switching & modals.
 */

document.addEventListener('DOMContentLoaded', () => {
  App.init();
});

const App = {
  currentCategory: 'all',
  searchQuery: '',
  vegOnlyFilter: false,

  init() {
    this.initTheme();
    this.initNavbar();
    this.initDemoRoleBar();
    this.renderCategories();
    this.renderPopularRestaurants();
    this.renderTrendingDishes();
    this.renderCoupons();
    this.renderTestimonials();
    this.initSearch();
    this.initCart();
    this.initModals();
    this.initEventListeners();
    this.updateUserSessionUI();
  },

  // ------------------------------------------------------------------------
  // Theme Management (Light / Dark Mode)
  // ------------------------------------------------------------------------
  initTheme() {
    const savedTheme = QuickBiteDB.getTheme();
    document.documentElement.setAttribute('data-theme', savedTheme);
    this.updateThemeIcon(savedTheme);

    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', () => {
        const next = QuickBiteDB.toggleTheme();
        this.updateThemeIcon(next);
        QuickBiteDB.showToast(`Switched to ${next === 'dark' ? 'Dark' : 'Light'} Mode`, 'info', 2000);
      });
    }
  },

  updateThemeIcon(theme) {
    const themeIcon = document.getElementById('theme-icon');
    if (themeIcon) {
      if (theme === 'dark') {
        themeIcon.className = 'fa-solid fa-sun';
      } else {
        themeIcon.className = 'fa-solid fa-moon';
      }
    }
  },

  // ------------------------------------------------------------------------
  // Navbar Interactions & Scroll
  // ------------------------------------------------------------------------
  initNavbar() {
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        navbar?.classList.add('scrolled');
      } else {
        navbar?.classList.remove('scrolled');
      }
    });

    // Mobile nav toggle
    const mobileBtn = document.getElementById('mobile-nav-toggle');
    const mobileMenu = document.getElementById('mobile-menu-drawer');
    if (mobileBtn && mobileMenu) {
      mobileBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
      });
    }
  },

  // ------------------------------------------------------------------------
  // Demo Role Switcher Bar (Interconnected Multi-Module Simulator)
  // ------------------------------------------------------------------------
  initDemoRoleBar() {
    const roleButtons = document.querySelectorAll('.demo-role-btn');
    const currentUser = QuickBiteDB.getCurrentUser();

    roleButtons.forEach(btn => {
      const role = btn.dataset.role;
      if (currentUser && currentUser.role === role) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }

      btn.addEventListener('click', () => {
        roleButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.switchDemoRole(role);
      });
    });
  },

  switchDemoRole(role) {
    const users = QuickBiteDB.get(QuickBiteDB.KEYS.USERS, []);
    let targetUser = users.find(u => u.role === role);
    if (!targetUser) {
      targetUser = { id: `usr-${role}-demo`, role: role, name: `Demo ${role.toUpperCase()}`, email: `${role}@quickbite.com` };
    }
    QuickBiteDB.setCurrentUser(targetUser);
    QuickBiteDB.showToast(`Switched active session to: ${targetUser.name} (${targetUser.role.toUpperCase()})`, 'success');
    this.updateUserSessionUI();

    if (role === 'restaurant') {
      setTimeout(() => {
        if (confirm("Would you like to open the Restaurant Partner Kitchen Dashboard now?")) {
          window.location.href = 'restaurant/dashboard.html';
        }
      }, 400);
    } else if (role === 'delivery') {
      setTimeout(() => {
        if (confirm("Would you like to open the Delivery Partner Fleet Dashboard now?")) {
          window.location.href = 'delivery/dashboard.html';
        }
      }, 400);
    } else if (role === 'admin') {
      setTimeout(() => {
        if (confirm("Would you like to open the Admin Master Console now?")) {
          window.location.href = 'admin/dashboard.html';
        }
      }, 400);
    }
  },

  updateUserSessionUI() {
    const user = QuickBiteDB.getCurrentUser();
    const userBtn = document.getElementById('user-profile-btn');
    const userNameSpan = document.getElementById('user-name-display');

    if (userBtn && userNameSpan) {
      if (user) {
        userNameSpan.textContent = user.name.split(' ')[0];
        userBtn.title = `${user.name} (${user.role})`;
      } else {
        userNameSpan.textContent = 'Sign In';
      }
    }
  },

  // ------------------------------------------------------------------------
  // Render Food Categories
  // ------------------------------------------------------------------------
  renderCategories() {
    const container = document.getElementById('categories-container');
    if (!container) return;

    const categories = QuickBiteDB.getCategories();
    container.innerHTML = categories.map(cat => {
      const isActive = this.currentCategory === cat.name || (this.currentCategory === 'all' && cat.id === 'all');
      return `
        <div class="category-card ${isActive ? 'active' : ''}" data-category="${cat.name || cat.id}">
          <div class="category-img-wrap">
            ${cat.image ? 
              `<img src="${cat.image}" alt="${cat.name}" onerror="handleImageError(this, 'food')">` : 
              `<div style="display:flex;align-items:center;justify-content:center;height:100%;background:var(--color-primary-light);color:var(--color-primary);font-size:1.8rem;"><i class="fa-solid ${cat.icon || 'fa-utensils'}"></i></div>`
            }
          </div>
          <span class="category-name">${cat.name}</span>
        </div>
      `;
    }).join('');

    // Click listeners on categories
    container.querySelectorAll('.category-card').forEach(card => {
      card.addEventListener('click', () => {
        const cat = card.dataset.category;
        container.querySelectorAll('.category-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');

        this.currentCategory = (cat === 'all' || cat === 'All Dishes') ? 'all' : cat;
        this.renderTrendingDishes();
        this.renderPopularRestaurants();
      });
    });
  },

  // ------------------------------------------------------------------------
  // Render Popular Restaurants
  // ------------------------------------------------------------------------
  renderPopularRestaurants() {
    const container = document.getElementById('restaurants-container');
    if (!container) return;

    let restaurants = QuickBiteDB.getRestaurants();
    const favs = QuickBiteDB.getFavorites();

    // Filter by search or category if active
    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      restaurants = restaurants.filter(r => 
        r.name.toLowerCase().includes(q) ||
        r.cuisine.some(c => c.toLowerCase().includes(q)) ||
        r.address.toLowerCase().includes(q)
      );
    }

    if (this.currentCategory !== 'all') {
      restaurants = restaurants.filter(r => 
        r.cuisine.some(c => c.toLowerCase().includes(this.currentCategory.toLowerCase()))
      );
    }

    if (this.vegOnlyFilter) {
      restaurants = restaurants.filter(r => r.isPureVeg);
    }

    if (restaurants.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 40px 20px;">
          <i class="fa-solid fa-utensils" style="font-size: 3rem; color: var(--color-text-subtle); margin-bottom: 14px;"></i>
          <h3>No restaurants matched your search</h3>
          <p style="color: var(--color-text-muted); margin-top: 6px;">Try adjusting your keywords or category filters</p>
          <button class="btn btn-primary btn-sm" style="margin-top: 16px;" onclick="App.resetFilters()">Reset Filters</button>
        </div>
      `;
      return;
    }

    container.innerHTML = restaurants.map(r => {
      const isFav = favs.includes(r.id);
      return `
        <div class="restaurant-card" data-id="${r.id}">
          <div class="rest-img-wrapper">
            <img src="${r.image}" alt="${r.name}" onerror="handleImageError(this, 'restaurant')">
            ${r.discount ? `<span class="rest-badge-discount"><i class="fa-solid fa-tag"></i> ${r.discount}</span>` : ''}
            <button class="rest-btn-fav ${isFav ? 'active' : ''}" data-id="${r.id}" title="Add to favorites">
              <i class="${isFav ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
            </button>
          </div>
          <div class="rest-body">
            <div class="rest-header-line">
              <h3 class="rest-name">${r.name}</h3>
              <span class="rating-pill">
                <i class="fa-solid fa-star"></i> ${r.rating}
              </span>
            </div>
            <p class="rest-cuisines">${r.cuisine.join(' • ')}</p>
            <div class="rest-meta-row">
              <span class="rest-meta-item">
                <i class="fa-solid fa-clock"></i> ${r.deliveryTime}
              </span>
              <span class="rest-meta-item">
                <i class="fa-solid fa-wallet"></i> ₹${r.priceForTwo} for two
              </span>
              <button class="btn btn-outline-primary btn-sm view-menu-btn" data-id="${r.id}">
                View Menu
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Attach favorite button click handlers
    container.querySelectorAll('.rest-btn-fav').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const restId = btn.dataset.id;
        const added = QuickBiteDB.toggleFavorite(restId);
        btn.classList.toggle('active', added);
        const icon = btn.querySelector('i');
        if (icon) {
          icon.className = added ? 'fa-solid fa-heart' : 'fa-regular fa-heart';
        }
      });
    });

    // Attach View Menu button click handlers
    container.querySelectorAll('.view-menu-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.openRestaurantMenuModal(btn.dataset.id);
      });
    });

    // Card click opens menu modal
    container.querySelectorAll('.restaurant-card').forEach(card => {
      card.addEventListener('click', () => {
        this.openRestaurantMenuModal(card.dataset.id);
      });
    });
  },

  // ------------------------------------------------------------------------
  // Render Trending Dishes
  // ------------------------------------------------------------------------
  renderTrendingDishes() {
    const container = document.getElementById('dishes-container');
    if (!container) return;

    let dishes = QuickBiteDB.getDishes();
    const restaurants = QuickBiteDB.getRestaurants();

    // Filter by search or category
    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      dishes = dishes.filter(d => 
        d.name.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q) ||
        d.category.toLowerCase().includes(q)
      );
    }

    if (this.currentCategory !== 'all') {
      dishes = dishes.filter(d => 
        d.category.toLowerCase().includes(this.currentCategory.toLowerCase())
      );
    }

    if (this.vegOnlyFilter) {
      dishes = dishes.filter(d => d.isVeg);
    }

    // Limit to trending / top 8 if no search active
    if (!this.searchQuery && this.currentCategory === 'all') {
      dishes = dishes.filter(d => d.isTrending || d.isBestseller).slice(0, 8);
    }

    if (dishes.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 40px 20px;">
          <i class="fa-solid fa-plate-wheat" style="font-size: 3rem; color: var(--color-text-subtle); margin-bottom: 14px;"></i>
          <h3>No dishes found matching your criteria</h3>
          <p style="color: var(--color-text-muted); margin-top: 6px;">Try searching for pizza, biryani, or burger</p>
          <button class="btn btn-primary btn-sm" style="margin-top: 16px;" onclick="App.resetFilters()">Show All Dishes</button>
        </div>
      `;
      return;
    }

    container.innerHTML = dishes.map(dish => {
      const rest = restaurants.find(r => r.id === dish.restaurantId);
      const restName = rest ? rest.name : 'QuickBite Partner';

      return `
        <div class="dish-card" data-dish-id="${dish.id}">
          <div class="dish-img-wrap">
            <img src="${dish.image}" alt="${dish.name}" onerror="handleImageError(this, 'food')">
            <span class="dish-diet-tag">
              <span class="badge-diet ${dish.isVeg ? 'veg' : 'non-veg'}" title="${dish.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}"></span>
            </span>
            ${dish.isBestseller ? `<span class="dish-badge-trending"><i class="fa-solid fa-fire"></i> Bestseller</span>` : ''}
          </div>
          <div class="dish-body">
            <span class="dish-rest-name"><i class="fa-solid fa-store"></i> ${restName}</span>
            <h4 class="dish-name">${dish.name}</h4>
            <p class="dish-desc">${dish.description}</p>
            <div class="dish-footer">
              <div class="dish-price-wrap">
                <span class="dish-price">₹${dish.discountPrice || dish.price}</span>
                ${dish.discountPrice ? `<span class="dish-original-price">₹${dish.price}</span>` : ''}
              </div>
              <button class="dish-add-btn" data-dish-id="${dish.id}">
                <i class="fa-solid fa-plus"></i> ADD
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Attach Add to Cart listener
    container.querySelectorAll('.dish-add-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const dishId = btn.dataset.dishId;
        QuickBiteDB.addToCart(dishId, 1);
        this.renderCartUI();
      });
    });
  },

  // ------------------------------------------------------------------------
  // Render Special Promotional Coupons
  // ------------------------------------------------------------------------
  renderCoupons() {
    const container = document.getElementById('offers-container');
    if (!container) return;

    const coupons = QuickBiteDB.getCoupons();
    container.innerHTML = coupons.map(c => `
      <div class="offer-card">
        <div>
          <div class="offer-header">
            <div class="offer-icon">
              <i class="fa-solid fa-percent"></i>
            </div>
            <div>
              <div class="offer-code">${c.code}</div>
              <span style="font-size:0.75rem; color:var(--color-primary); font-weight:700;">PROMO OFFER</span>
            </div>
          </div>
          <p class="offer-desc">${c.description}</p>
        </div>
        <div class="offer-footer">
          <span class="offer-min">Min Order: ₹${c.minOrder}</span>
          <button class="offer-copy-btn" data-code="${c.code}">
            <i class="fa-solid fa-copy"></i> Copy Code
          </button>
        </div>
      </div>
    `).join('');

    // Copy to clipboard handlers
    container.querySelectorAll('.offer-copy-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const code = btn.dataset.code;
        navigator.clipboard?.writeText(code).catch(() => {});
        QuickBiteDB.showToast(`Coupon code ${code} copied to clipboard!`, 'success');
      });
    });
  },

  // ------------------------------------------------------------------------
  // Render Testimonials
  // ------------------------------------------------------------------------
  renderTestimonials() {
    const container = document.getElementById('testimonials-container');
    if (!container) return;

    container.innerHTML = DEFAULT_TESTIMONIALS.map(t => `
      <div class="testimonial-card">
        <div class="test-stars">
          ${Array(t.rating).fill('<i class="fa-solid fa-star"></i>').join('')}
        </div>
        <p class="test-quote">"${t.review}"</p>
        <div class="test-author-row">
          <img src="${t.avatar}" alt="${t.name}" class="test-avatar" onerror="handleImageError(this, 'avatar')">
          <div class="test-author-info">
            <h4>${t.name}</h4>
            <p>${t.role} • Loves ${t.favoriteDish}</p>
          </div>
        </div>
      </div>
    `).join('');
  },

  // ------------------------------------------------------------------------
  // Search Bar & Filter Pills
  // ------------------------------------------------------------------------
  initSearch() {
    const searchInput = document.getElementById('hero-search-input');
    const searchBtn = document.getElementById('hero-search-btn');

    const handleSearch = () => {
      this.searchQuery = searchInput ? searchInput.value.trim() : '';
      this.renderPopularRestaurants();
      this.renderTrendingDishes();

      if (this.searchQuery) {
        // Smooth scroll to results
        const restSection = document.getElementById('popular-restaurants-section');
        restSection?.scrollIntoView({ behavior: 'smooth' });
      }
    };

    if (searchInput) {
      searchInput.addEventListener('input', () => {
        this.searchQuery = searchInput.value.trim();
        this.renderPopularRestaurants();
        this.renderTrendingDishes();
      });

      searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          handleSearch();
        }
      });
    }

    if (searchBtn) {
      searchBtn.addEventListener('click', handleSearch);
    }

    // Hero quick filter pills
    document.querySelectorAll('.hero-pill-btn').forEach(pill => {
      pill.addEventListener('click', () => {
        const query = pill.dataset.query;
        if (query === 'Pure Veg') {
          this.vegOnlyFilter = !this.vegOnlyFilter;
          pill.classList.toggle('active', this.vegOnlyFilter);
        } else {
          if (searchInput) searchInput.value = query;
          this.searchQuery = query;
        }
        this.renderPopularRestaurants();
        this.renderTrendingDishes();
      });
    });
  },

  resetFilters() {
    this.searchQuery = '';
    this.currentCategory = 'all';
    this.vegOnlyFilter = false;
    const searchInput = document.getElementById('hero-search-input');
    if (searchInput) searchInput.value = '';
    this.renderCategories();
    this.renderPopularRestaurants();
    this.renderTrendingDishes();
  },

  // ------------------------------------------------------------------------
  // Shopping Cart & Drawer
  // ------------------------------------------------------------------------
  initCart() {
    const cartBtn = document.getElementById('cart-toggle-btn');
    const cartDrawer = document.getElementById('cart-drawer');
    const cartOverlay = document.getElementById('cart-drawer-overlay');
    const closeBtn = document.getElementById('close-cart-btn');

    const openCart = () => {
      this.renderCartUI();
      cartDrawer?.classList.add('active');
      cartOverlay?.classList.add('active');
    };

    const closeCart = () => {
      cartDrawer?.classList.remove('active');
      cartOverlay?.classList.remove('active');
    };

    cartBtn?.addEventListener('click', openCart);
    closeBtn?.addEventListener('click', closeCart);
    cartOverlay?.addEventListener('click', closeCart);

    // Initial Cart Count badge render
    this.updateCartBadge();

    // Listen to storage broadcast
    window.addEventListener('quickbite:cart-updated', () => {
      this.updateCartBadge();
      this.renderCartUI();
    });

    // Apply Coupon form in cart
    const applyCouponBtn = document.getElementById('cart-apply-coupon-btn');
    const couponInput = document.getElementById('cart-coupon-input');
    if (applyCouponBtn && couponInput) {
      applyCouponBtn.addEventListener('click', () => {
        const code = couponInput.value.trim();
        if (code) {
          QuickBiteDB.applyCoupon(code);
        }
      });
    }

    // Checkout button handler
    const checkoutBtn = document.getElementById('cart-checkout-btn');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => {
        this.handleCheckoutFlow();
      });
    }
  },

  updateCartBadge() {
    const badge = document.getElementById('cart-badge-count');
    const summary = QuickBiteDB.getCartSummary();
    if (badge) {
      badge.textContent = summary.totalItems;
      badge.style.display = summary.totalItems > 0 ? 'inline-flex' : 'none';
    }
  },

  renderCartUI() {
    const cart = QuickBiteDB.getCart();
    const summary = QuickBiteDB.getCartSummary();
    const itemsList = document.getElementById('cart-items-container');
    const emptyState = document.getElementById('cart-empty-container');
    const footer = document.getElementById('cart-footer-container');

    this.updateCartBadge();

    if (!itemsList) return;

    if (cart.items.length === 0) {
      itemsList.style.display = 'none';
      if (emptyState) emptyState.style.display = 'block';
      if (footer) footer.style.display = 'none';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';
    itemsList.style.display = 'flex';
    if (footer) footer.style.display = 'block';

    itemsList.innerHTML = cart.items.map(item => `
      <div class="cart-item-row">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img" onerror="handleImageError(this, 'food')">
        <div class="cart-item-info">
          <h4 class="cart-item-name">${item.name}</h4>
          <span class="cart-item-price">₹${item.price * item.quantity}</span>
        </div>
        <div class="cart-item-controls">
          <button class="qty-btn" onclick="App.modifyCartQty('${item.dishId}', ${item.quantity - 1})">-</button>
          <span class="qty-display">${item.quantity}</span>
          <button class="qty-btn" onclick="App.modifyCartQty('${item.dishId}', ${item.quantity + 1})">+</button>
        </div>
      </div>
    `).join('');

    // Update Bill Breakdowns
    const subtotalEl = document.getElementById('cart-subtotal');
    const deliveryEl = document.getElementById('cart-delivery-fee');
    const discountEl = document.getElementById('cart-discount-row');
    const discountAmtEl = document.getElementById('cart-discount-amt');
    const totalEl = document.getElementById('cart-grand-total');

    if (subtotalEl) subtotalEl.textContent = `₹${summary.subtotal}`;
    if (deliveryEl) deliveryEl.textContent = summary.deliveryFee === 0 ? 'FREE' : `₹${summary.deliveryFee}`;

    if (discountEl && discountAmtEl) {
      if (summary.discount > 0) {
        discountEl.style.display = 'flex';
        discountAmtEl.textContent = `-₹${summary.discount}`;
      } else {
        discountEl.style.display = 'none';
      }
    }

    if (totalEl) totalEl.textContent = `₹${summary.total}`;
  },

  modifyCartQty(dishId, newQty) {
    QuickBiteDB.updateCartQuantity(dishId, newQty);
    this.renderCartUI();
  },

  handleCheckoutFlow() {
    const summary = QuickBiteDB.getCartSummary();
    if (summary.totalItems === 0) {
      QuickBiteDB.showToast("Your cart is empty", "warning");
      return;
    }

    const user = QuickBiteDB.getCurrentUser();
    if (!user) {
      this.openAuthModal('signin');
      QuickBiteDB.showToast("Please sign in to complete your checkout", "info");
      return;
    }

    // Place simulated order instantly into shared LocalStorage
    const cart = QuickBiteDB.getCart();
    const rest = QuickBiteDB.getRestaurantById(cart.items[0]?.restaurantId) || {
      id: "rest-1",
      name: "The Royal Biryani & Kebabs",
      address: "Banjara Hills, Hyderabad"
    };

    const newOrder = QuickBiteDB.createOrder({
      customerId: user.id,
      customerName: user.name,
      customerPhone: user.phone || "+91 98765 43210",
      customerAddress: user.addresses?.[0]?.street || "Jubilee Enclave, Flat 402, Hyderabad",
      restaurantId: rest.id,
      restaurantName: rest.name,
      restaurantAddress: rest.address,
      items: cart.items,
      itemTotal: summary.subtotal,
      deliveryFee: summary.deliveryFee,
      discount: summary.discount,
      couponApplied: summary.coupon?.code || null,
      taxes: summary.taxes,
      grandTotal: summary.total,
      paymentMethod: "Credit Card (Simulated)",
      paymentStatus: "Paid"
    });

    // Close drawer and show confirmation
    const cartDrawer = document.getElementById('cart-drawer');
    const cartOverlay = document.getElementById('cart-drawer-overlay');
    cartDrawer?.classList.remove('active');
    cartOverlay?.classList.remove('active');

    this.showOrderSuccessModal(newOrder);
  },

  showOrderSuccessModal(order) {
    const modalHtml = `
      <div class="modal-overlay active" id="order-success-modal">
        <div class="modal-card" style="text-align: center; max-width: 460px;">
          <div class="modal-body" style="padding: 40px 28px;">
            <div style="width: 76px; height: 76px; border-radius: 50%; background: var(--color-success-bg); color: var(--color-success); font-size: 2.2rem; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
              <i class="fa-solid fa-check"></i>
            </div>
            <h3 style="font-size: 1.5rem; margin-bottom: 8px;">Order Placed Successfully!</h3>
            <p style="color: var(--color-text-muted); font-size: 0.95rem; margin-bottom: 20px;">
              Your order <strong>#${order.id}</strong> has been sent to <strong>${order.restaurantName}</strong>.
            </p>
            <div style="background: var(--color-bg); padding: 16px; border-radius: var(--radius-md); text-align: left; margin-bottom: 24px; font-size: 0.875rem;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                <span style="color: var(--color-text-muted);">Amount Paid:</span>
                <strong>₹${order.grandTotal}</strong>
              </div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                <span style="color: var(--color-text-muted);">Status:</span>
                <span class="badge badge-warning">Preparing in Kitchen</span>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: var(--color-text-muted);">Estimated Delivery:</span>
                <strong>25 - 35 mins</strong>
              </div>
            </div>
            <div style="display: flex; gap: 10px; margin-top: 10px;">
              <a href="customer/tracking.html?orderId=${order.id}" class="btn btn-primary" style="flex: 1;">
                <i class="fa-solid fa-route"></i> Track Order
              </a>
              <a href="customer/orders.html" class="btn btn-secondary" style="flex: 1;">
                <i class="fa-solid fa-clock-rotate-left"></i> My Orders
              </a>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
  },

  // ------------------------------------------------------------------------
  // Restaurant Menu Modal
  // ------------------------------------------------------------------------
  openRestaurantMenuModal(restaurantId) {
    const rest = QuickBiteDB.getRestaurantById(restaurantId);
    if (!rest) return;

    const dishes = QuickBiteDB.getDishesByRestaurant(restaurantId);

    const modalHtml = `
      <div class="modal-overlay active" id="restaurant-menu-modal">
        <div class="modal-card" style="max-width: 760px;">
          <div class="modal-header">
            <div>
              <h3 class="modal-title">${rest.name}</h3>
              <p style="font-size:0.85rem; color:var(--color-text-muted); margin-top:2px;">
                ${rest.cuisine.join(', ')} • <i class="fa-solid fa-star" style="color:#10B981"></i> ${rest.rating} (${rest.ratingCount}+ ratings)
              </p>
            </div>
            <button class="toast-close" onclick="document.getElementById('restaurant-menu-modal').remove()">
              <i class="fa-solid fa-xmark" style="font-size: 1.3rem;"></i>
            </button>
          </div>
          <div class="modal-body" style="padding: 20px;">
            <div style="margin-bottom: 18px; display: flex; gap: 12px; align-items: center;">
              <span class="badge badge-primary"><i class="fa-solid fa-clock"></i> ${rest.deliveryTime}</span>
              <span class="badge badge-success"><i class="fa-solid fa-tag"></i> ${rest.discount || 'Special Menu'}</span>
              <span style="font-size:0.85rem; color:var(--color-text-muted); margin-left:auto;">${rest.address}</span>
            </div>
            <div style="display: flex; flex-direction: column; gap: 16px;">
              ${dishes.map(dish => `
                <div style="display:flex; gap:16px; align-items:center; padding:14px; background:var(--color-surface-card); border:1px solid var(--color-border); border-radius:var(--radius-md);">
                  <img src="${dish.image}" alt="${dish.name}" style="width:84px; height:84px; object-fit:cover; border-radius:var(--radius-sm); flex-shrink:0;" onerror="handleImageError(this, 'food')">
                  <div style="flex:1;">
                    <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px;">
                      <span class="badge-diet ${dish.isVeg ? 'veg' : 'non-veg'}"></span>
                      <h4 style="font-size:1rem; font-weight:700;">${dish.name}</h4>
                    </div>
                    <p style="font-size:0.825rem; color:var(--color-text-muted); margin-bottom:6px; line-height:1.4;">${dish.description}</p>
                    <div style="display:flex; align-items:baseline; gap:8px;">
                      <strong style="color:var(--color-primary); font-size:1.05rem;">₹${dish.discountPrice || dish.price}</strong>
                      ${dish.discountPrice ? `<span style="text-decoration:line-through; font-size:0.8rem; color:var(--color-text-subtle);">₹${dish.price}</span>` : ''}
                    </div>
                  </div>
                  <button class="dish-add-btn" onclick="QuickBiteDB.addToCart('${dish.id}', 1); App.renderCartUI();">
                    <i class="fa-solid fa-plus"></i> ADD
                  </button>
                </div>
              `).join('')}
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary btn-sm" onclick="document.getElementById('restaurant-menu-modal').remove()">
              Close
            </button>
            <button class="btn btn-primary btn-sm" onclick="document.getElementById('restaurant-menu-modal').remove(); document.getElementById('cart-toggle-btn').click();">
              Go To Cart
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
  },

  // ------------------------------------------------------------------------
  // User Authentication Modal (Sign In / Register)
  // ------------------------------------------------------------------------
  initModals() {
    const userBtn = document.getElementById('user-profile-btn');
    userBtn?.addEventListener('click', () => {
      const user = QuickBiteDB.getCurrentUser();
      if (user) {
        this.openUserAccountModal(user);
      } else {
        this.openAuthModal('signin');
      }
    });
  },

  openAuthModal(tab = 'signin') {
    const existing = document.getElementById('auth-modal');
    if (existing) existing.remove();

    const modalHtml = `
      <div class="modal-overlay active" id="auth-modal">
        <div class="modal-card" style="max-width: 440px;">
          <div class="modal-header">
            <h3 class="modal-title" id="auth-title">${tab === 'signin' ? 'Sign In to QuickBite' : 'Create an Account'}</h3>
            <button class="toast-close" onclick="document.getElementById('auth-modal').remove()">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div class="modal-body">
            <!-- Tabs -->
            <div style="display:flex; border-bottom:1px solid var(--color-border); margin-bottom:20px;">
              <button id="tab-btn-signin" style="flex:1; padding:10px; font-weight:700; border-bottom:2px solid ${tab === 'signin' ? 'var(--color-primary)' : 'transparent'}; color:${tab === 'signin' ? 'var(--color-primary)' : 'var(--color-text-muted)'};" onclick="App.toggleAuthTab('signin')">
                Sign In
              </button>
              <button id="tab-btn-register" style="flex:1; padding:10px; font-weight:700; border-bottom:2px solid ${tab === 'register' ? 'var(--color-primary)' : 'transparent'}; color:${tab === 'register' ? 'var(--color-primary)' : 'var(--color-text-muted)'};" onclick="App.toggleAuthTab('register')">
                Register
              </button>
            </div>

            <!-- Sign In Form -->
            <form id="signin-form" style="display:${tab === 'signin' ? 'flex' : 'none'}; flex-direction:column; gap:14px;">
              <div>
                <label style="display:block; font-size:0.85rem; font-weight:600; margin-bottom:6px;">Email Address</label>
                <input type="email" id="signin-email" value="customer@quickbite.com" required style="width:100%; padding:12px; border:1px solid var(--color-border); border-radius:var(--radius-sm); background:var(--color-surface-card);">
              </div>
              <div>
                <label style="display:block; font-size:0.85rem; font-weight:600; margin-bottom:6px;">Password</label>
                <input type="password" id="signin-password" value="password123" required style="width:100%; padding:12px; border:1px solid var(--color-border); border-radius:var(--radius-sm); background:var(--color-surface-card);">
              </div>
              <button type="submit" class="btn btn-primary" style="width:100%; margin-top:6px;">
                Sign In
              </button>
              <div style="margin-top:12px; font-size:0.825rem; color:var(--color-text-muted); text-align:center;">
                <strong>Demo quick fill:</strong>
                <div style="display:flex; justify-content:center; gap:8px; margin-top:6px;">
                  <button type="button" class="btn btn-secondary btn-sm" onclick="App.fillLogin('customer@quickbite.com', 'password123')">Customer</button>
                  <button type="button" class="btn btn-secondary btn-sm" onclick="App.fillLogin('owner1@quickbite.com', 'password123')">Restaurant</button>
                  <button type="button" class="btn btn-secondary btn-sm" onclick="App.fillLogin('admin@quickbite.com', 'admin123')">Admin</button>
                </div>
              </div>
            </form>

            <!-- Register Form -->
            <form id="register-form" style="display:${tab === 'register' ? 'flex' : 'none'}; flex-direction:column; gap:14px;">
              <div>
                <label style="display:block; font-size:0.85rem; font-weight:600; margin-bottom:6px;">Full Name</label>
                <input type="text" id="reg-name" placeholder="John Doe" required style="width:100%; padding:12px; border:1px solid var(--color-border); border-radius:var(--radius-sm); background:var(--color-surface-card);">
              </div>
              <div>
                <label style="display:block; font-size:0.85rem; font-weight:600; margin-bottom:6px;">Email Address</label>
                <input type="email" id="reg-email" placeholder="john@example.com" required style="width:100%; padding:12px; border:1px solid var(--color-border); border-radius:var(--radius-sm); background:var(--color-surface-card);">
              </div>
              <div>
                <label style="display:block; font-size:0.85rem; font-weight:600; margin-bottom:6px;">Password</label>
                <input type="password" id="reg-password" placeholder="••••••••" required style="width:100%; padding:12px; border:1px solid var(--color-border); border-radius:var(--radius-sm); background:var(--color-surface-card);">
              </div>
              <button type="submit" class="btn btn-primary" style="width:100%; margin-top:6px;">
                Create Account
              </button>
            </form>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);

    // Form submits
    const signinForm = document.getElementById('signin-form');
    signinForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('signin-email').value;
      const pass = document.getElementById('signin-password').value;
      const user = QuickBiteDB.login(email, pass);
      if (user) {
        document.getElementById('auth-modal')?.remove();
        this.updateUserSessionUI();
      }
    });

    const regForm = document.getElementById('register-form');
    regForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('reg-name').value;
      const email = document.getElementById('reg-email').value;
      const pass = document.getElementById('reg-password').value;
      const user = QuickBiteDB.register({ name, email, password: pass, role: 'customer' });
      if (user) {
        document.getElementById('auth-modal')?.remove();
        this.updateUserSessionUI();
      }
    });
  },

  toggleAuthTab(tab) {
    const signinForm = document.getElementById('signin-form');
    const registerForm = document.getElementById('register-form');
    const tabSignin = document.getElementById('tab-btn-signin');
    const tabRegister = document.getElementById('tab-btn-register');
    const title = document.getElementById('auth-title');

    if (tab === 'signin') {
      if (signinForm) signinForm.style.display = 'flex';
      if (registerForm) registerForm.style.display = 'none';
      if (tabSignin) {
        tabSignin.style.borderColor = 'var(--color-primary)';
        tabSignin.style.color = 'var(--color-primary)';
      }
      if (tabRegister) {
        tabRegister.style.borderColor = 'transparent';
        tabRegister.style.color = 'var(--color-text-muted)';
      }
      if (title) title.textContent = 'Sign In to QuickBite';
    } else {
      if (signinForm) signinForm.style.display = 'none';
      if (registerForm) registerForm.style.display = 'flex';
      if (tabSignin) {
        tabSignin.style.borderColor = 'transparent';
        tabSignin.style.color = 'var(--color-text-muted)';
      }
      if (tabRegister) {
        tabRegister.style.borderColor = 'var(--color-primary)';
        tabRegister.style.color = 'var(--color-primary)';
      }
      if (title) title.textContent = 'Create an Account';
    }
  },

  fillLogin(email, password) {
    const emailInput = document.getElementById('signin-email');
    const passInput = document.getElementById('signin-password');
    if (emailInput) emailInput.value = email;
    if (passInput) passInput.value = password;
  },

  openUserAccountModal(user) {
    const existing = document.getElementById('user-modal');
    if (existing) existing.remove();

    const modalHtml = `
      <div class="modal-overlay active" id="user-modal">
        <div class="modal-card" style="max-width: 440px;">
          <div class="modal-header">
            <h3 class="modal-title">My Profile</h3>
            <button class="toast-close" onclick="document.getElementById('user-modal').remove()">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div class="modal-body" style="text-align: center;">
            <img src="${user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}" style="width:80px; height:80px; border-radius:50%; margin:0 auto 14px; object-fit:cover; border:3px solid var(--color-primary);" onerror="handleImageError(this, 'avatar')">
            <h4 style="font-size:1.2rem; font-weight:700;">${user.name}</h4>
            <p style="color:var(--color-text-muted); font-size:0.9rem; margin-bottom:12px;">${user.email}</p>
            <span class="badge badge-primary" style="text-transform:uppercase; letter-spacing:0.8px;">${user.role} Module</span>

            <div style="margin-top:24px; padding:16px; background:var(--color-surface-card); border-radius:var(--radius-md); text-align:left; font-size:0.875rem;">
              <div style="margin-bottom:8px;"><strong>Phone:</strong> ${user.phone || '+91 98765 43210'}</div>
              <div><strong>Default Address:</strong> ${user.addresses?.[0]?.street || 'Jubilee Enclave, Hyderabad'}</div>
            </div>

            <a href="customer/restaurants.html" class="btn btn-primary btn-sm" style="width:100%; margin-top:16px;">
              <i class="fa-solid fa-utensils"></i> Open Customer Portal
            </a>
            <a href="customer/orders.html" class="btn btn-secondary btn-sm" style="width:100%; margin-top:8px;">
              <i class="fa-solid fa-clock-rotate-left"></i> My Orders & Live Tracking
            </a>
            <a href="customer/profile.html" class="btn btn-secondary btn-sm" style="width:100%; margin-top:8px;">
              <i class="fa-regular fa-user"></i> Account Settings
            </a>

            <button class="btn btn-secondary btn-sm" style="width:100%; margin-top:12px; color:var(--color-danger);" onclick="QuickBiteDB.logout(); document.getElementById('user-modal').remove(); App.updateUserSessionUI();">
              <i class="fa-solid fa-right-from-bracket"></i> Sign Out
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
  },

  // ------------------------------------------------------------------------
  // Event Listeners for Location & Global Shortcuts
  // ------------------------------------------------------------------------
  initEventListeners() {
    const locPicker = document.querySelector('.location-picker');
    locPicker?.addEventListener('click', () => {
      const locations = ['Banjara Hills, Hyderabad', 'Indiranagar, Bangalore', 'Koramangala, Bangalore', 'Connaught Place, New Delhi', 'Bandra West, Mumbai'];
      const chosen = prompt("Select or enter your delivery location:", locations[0]);
      if (chosen) {
        const text = locPicker.querySelector('.loc-text');
        if (text) text.textContent = chosen;
        QuickBiteDB.showToast(`Delivery location updated to: ${chosen}`, 'info');
      }
    });

    // Newsletter subscribe
    const newsletterForm = document.querySelector('.newsletter-form');
    newsletterForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input');
      if (input && input.value) {
        QuickBiteDB.showToast(`Thank you for subscribing, ${input.value}! Enjoy ₹100 off your first order.`, 'success');
        input.value = '';
      }
    });
  }
};
