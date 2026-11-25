import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useQuickBite } from '../../context/QuickBiteContext';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

export default function MenuPage() {
  const [searchParams] = useSearchParams();
  const restId = searchParams.get('id') || 'rest-1';

  const {
    restaurants,
    cart,
    cartSummary,
    addToCart,
    updateCartQuantity,
    favorites,
    toggleFavorite,
    showToast,
    db
  } = useQuickBite();

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [dietFilter, setDietFilter] = useState('all'); // 'all', 'veg', 'non-veg'
  const [bestsellerOnly, setBestsellerOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [collapsedCategories, setCollapsedCategories] = useState(new Set());
  const [showJumpModal, setShowJumpModal] = useState(false);

  // Find restaurant
  const restaurant = useMemo(() => {
    return restaurants.find((r) => r.id === restId) || restaurants[0] || null;
  }, [restaurants, restId]);

  // Get dishes for this restaurant
  const allDishes = useMemo(() => {
    if (!restaurant) return [];
    return db.getDishesByRestaurant(restaurant.id);
  }, [restaurant, db]);

  // Unique categories
  const categories = useMemo(() => {
    const set = new Set();
    allDishes.forEach((d) => {
      if (d.category) set.add(d.category);
    });
    return Array.from(set);
  }, [allDishes]);

  // Filter logic
  const filterDishList = (list) => {
    return list.filter((dish) => {
      if (dietFilter === 'veg' && !dish.isVeg) return false;
      if (dietFilter === 'non-veg' && dish.isVeg) return false;
      if (bestsellerOnly && !dish.isBestseller) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = dish.name.toLowerCase().includes(q);
        const matchDesc = (dish.description || '').toLowerCase().includes(q);
        const matchCat = (dish.category || '').toLowerCase().includes(q);
        if (!matchName && !matchDesc && !matchCat) return false;
      }
      return true;
    });
  };

  const isFav = restaurant ? favorites.includes(restaurant.id) : false;

  const handleToggleFav = () => {
    if (!restaurant) return;
    const res = toggleFavorite(restaurant.id);
    showToast(
      `${res ? 'Added to' : 'Removed from'} favorites: ${restaurant.name}`,
      res ? 'success' : 'info'
    );
  };

  const getDishCartQty = (dishId) => {
    const item = (cart.items || []).find((i) => i.dishId === dishId);
    return item ? item.quantity : 0;
  };

  const handleAdd = (dish) => {
    const ok = addToCart(dish.id, 1);
    if (ok) {
      showToast(`Added ${dish.name} to cart`, 'success');
    }
  };

  const toggleSectionCollapse = (cat) => {
    setCollapsedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };

  const resetFilters = () => {
    setSelectedCategory('All');
    setDietFilter('all');
    setBestsellerOnly(false);
    setSearchQuery('');
  };

  if (!restaurant) {
    return (
      <div className="customer-page-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <div className="container" style={{ padding: '80px 20px', textAlign: 'center', flex: 1 }}>
          <h2>Restaurant Not Found</h2>
          <p style={{ color: 'var(--color-text-muted)', margin: '16px 0 24px' }}>
            The restaurant you requested could not be located.
          </p>
          <Link to="/customer/restaurants" className="btn btn-primary">
            Back to Restaurants
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const cuisines = Array.isArray(restaurant.cuisine) ? restaurant.cuisine.join(' • ') : (restaurant.cuisine || '');
  const activeCategories = selectedCategory === 'All' ? categories : [selectedCategory];
  const isFiltered = dietFilter !== 'all' || bestsellerOnly || searchQuery.trim().length > 0 || selectedCategory !== 'All';

  return (
    <div className="customer-page-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      {/* Restaurant Hero Header */}
      <section className="restaurant-hero-header">
        <div className="container" style={{ maxWidth: '1080px' }}>
          
          <div className="menu-breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/customer/restaurants">Hyderabad</Link>
            <span>/</span>
            <Link to="/customer/restaurants">Restaurants</Link>
            <span>/</span>
            <span style={{ color: 'var(--color-text-main)', fontWeight: 700 }}>{restaurant.name}</span>
          </div>

          <div className="rest-header-card">
            <div style={{ position: 'relative' }}>
              <img
                src={restaurant.image}
                alt={restaurant.name}
                className="rest-header-img"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80';
                }}
              />
              {restaurant.isPureVeg && (
                <span style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  background: '#0F8A5F',
                  color: '#FFFFFF',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-full)',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}>
                  <span className="fssai-symbol veg" style={{ width: '12px', height: '12px', borderWidth: '1.5px' }}>
                    <span className="fssai-dot" style={{ width: '5px', height: '5px' }}></span>
                  </span>
                  PURE VEG
                </span>
              )}
            </div>

            <div className="rest-header-info">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
                <div>
                  <h1 className="rest-header-title">{restaurant.name}</h1>
                  <p className="rest-header-cuisines">{cuisines}</p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <i className="fa-solid fa-location-dot" style={{ color: 'var(--color-primary)' }}></i>
                    {restaurant.address || 'Banjara Hills, Hyderabad'}
                  </p>
                </div>

                <button
                  type="button"
                  className={`rest-btn-fav ${isFav ? 'active' : ''}`}
                  style={{ position: 'static', flexShrink: 0 }}
                  onClick={handleToggleFav}
                  title="Save Restaurant"
                >
                  <i className={`${isFav ? 'fa-solid' : 'fa-regular'} fa-heart`}></i>
                </button>
              </div>

              <div className="rest-header-stats-row">
                <span className="rating-pill">
                  <i className="fa-solid fa-star"></i> {restaurant.rating} ({restaurant.ratingCount || '500'}+)
                </span>
                <span className="rest-stat-item">
                  <i className="fa-solid fa-clock" style={{ color: 'var(--color-primary)' }}></i> {restaurant.deliveryTime || '30 mins'}
                </span>
                <span className="rest-stat-item">
                  <i className="fa-solid fa-wallet" style={{ color: 'var(--color-primary)' }}></i> ₹{restaurant.priceForTwo} for two
                </span>
                {restaurant.discount && (
                  <span className="badge badge-primary" style={{ marginLeft: 'auto' }}>
                    <i className="fa-solid fa-tag"></i> {restaurant.discount}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Deals Carousel */}
          <div className="rest-deals-row">
            <div className="deal-card">
              <div className="deal-icon-box"><i className="fa-solid fa-tag"></i></div>
              <div>
                <div className="deal-title">50% OFF up to ₹100</div>
                <div className="deal-sub">Use code QUICK50 | Min order ₹249</div>
              </div>
            </div>
            <div className="deal-card">
              <div className="deal-icon-box"><i className="fa-solid fa-gift"></i></div>
              <div>
                <div className="deal-title">Flat ₹50 OFF</div>
                <div className="deal-sub">Use code WELCOME | For new orders</div>
              </div>
            </div>
            <div className="deal-card">
              <div className="deal-icon-box"><i className="fa-solid fa-fire"></i></div>
              <div>
                <div className="deal-title">Flat ₹150 OFF on orders above ₹999</div>
                <div className="deal-sub">Use code PARTY | Party feast saving</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Sticky Controls Bar */}
      <nav className="menu-category-nav">
        <div className="container" style={{ maxWidth: '1080px' }}>
          <div className="menu-controls-wrap">
            
            {/* Category Pills */}
            <div className="menu-cat-list">
              <button
                type="button"
                className={`menu-cat-link ${selectedCategory === 'All' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('All')}
              >
                All Dishes ({allDishes.length})
              </button>
              {categories.map((cat) => {
                const count = allDishes.filter((d) => d.category === cat).length;
                return (
                  <button
                    key={cat}
                    type="button"
                    className={`menu-cat-link ${selectedCategory === cat ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat} ({count})
                  </button>
                );
              })}
            </div>

            {/* In-Menu Search & Diet Toggles */}
            <div className="menu-search-and-toggles">
              <div className="menu-in-search">
                <i className="fa-solid fa-magnifying-glass" style={{ color: 'var(--color-text-subtle)' }}></i>
                <input
                  type="text"
                  placeholder="Search in menu..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    style={{ color: 'var(--color-text-subtle)', cursor: 'pointer' }}
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                )}
              </div>

              <button
                type="button"
                className={`menu-filter-toggle ${dietFilter === 'veg' ? 'active' : ''}`}
                onClick={() => setDietFilter((p) => (p === 'veg' ? 'all' : 'veg'))}
              >
                <span className="fssai-symbol veg"><span className="fssai-dot"></span></span>
                <span>Veg</span>
              </button>

              <button
                type="button"
                className={`menu-filter-toggle ${dietFilter === 'non-veg' ? 'active' : ''}`}
                onClick={() => setDietFilter((p) => (p === 'non-veg' ? 'all' : 'non-veg'))}
              >
                <span className="fssai-symbol non-veg"><span className="fssai-triangle"></span></span>
                <span>Non-Veg</span>
              </button>

              <button
                type="button"
                className={`menu-filter-toggle ${bestsellerOnly ? 'active' : ''}`}
                onClick={() => setBestsellerOnly((p) => !p)}
              >
                <span style={{ color: '#F59E0B' }}>★</span>
                <span>Bestseller</span>
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* Menu Catalog Sections */}
      <main className="section" style={{ paddingTop: '36px', paddingBottom: '120px', minHeight: '60vh', flex: 1 }}>
        <div className="container" style={{ maxWidth: '1080px' }}>
          
          {isFiltered && (
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px',
              padding: '12px 20px',
              background: 'var(--color-surface-card)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)'
            }}>
              <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>
                Showing filtered results {searchQuery ? `for "${searchQuery}"` : ''}
              </span>
              <button
                type="button"
                className="btn btn-outline-primary btn-sm"
                onClick={resetFilters}
                style={{ padding: '4px 14px', fontSize: '0.8rem' }}
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* Categorized Sections */}
          <div className="menu-sections-container">
            {activeCategories.map((cat) => {
              const catDishes = allDishes.filter((d) => d.category === cat);
              const visibleDishes = filterDishList(catDishes);

              if (visibleDishes.length === 0) return null;

              const isCollapsed = collapsedCategories.has(cat);

              return (
                <div key={cat} className="menu-category-card" id={`section-${cat.replace(/[^a-zA-Z0-9]/g, '-')}`}>
                  <button
                    type="button"
                    className={`menu-category-header-btn ${!isCollapsed ? 'open' : ''}`}
                    onClick={() => toggleSectionCollapse(cat)}
                  >
                    <div className="menu-category-title-wrap">
                      <span className="menu-category-title">{cat}</span>
                      <span className="menu-category-count-badge">({visibleDishes.length})</span>
                    </div>
                    <div className="menu-category-toggle-icon">
                      <i className="fa-solid fa-chevron-down"></i>
                    </div>
                  </button>

                  {!isCollapsed && (
                    <div className="menu-category-dishes-stream">
                      {visibleDishes.map((dish) => {
                        const cartQty = getDishCartQty(dish.id);
                        const actualPrice = dish.discountPrice || dish.price;
                        const hasDiscount = dish.discountPrice && dish.discountPrice < dish.price;

                        return (
                          <div key={dish.id} className="swiggy-dish-row">
                            {/* Left Col */}
                            <div className="dish-left-col">
                              <div className="dish-indicator-strip">
                                <span className={`fssai-symbol ${dish.isVeg ? 'veg' : 'non-veg'}`}>
                                  {dish.isVeg ? <span className="fssai-dot"></span> : <span className="fssai-triangle"></span>}
                                </span>

                                {dish.isBestseller && (
                                  <span className="bestseller-ribbon">
                                    <span>★</span> BESTSELLER
                                  </span>
                                )}

                                {dish.category && (
                                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--color-text-subtle)', textTransform: 'uppercase' }}>
                                    {dish.category}
                                  </span>
                                )}
                              </div>

                              <h3 className="dish-name-heading">{dish.name}</h3>

                              <div className="dish-price-tag-row">
                                <span className="dish-price-current">₹{actualPrice}</span>
                                {hasDiscount && <span className="dish-price-original">₹{dish.price}</span>}

                                <span className="dish-rating-badge">
                                  <i className="fa-solid fa-star" style={{ fontSize: '0.7rem' }}></i> {dish.rating || '4.8'}
                                  <span style={{ color: 'var(--color-text-subtle)', fontWeight: 500 }}>
                                    ({dish.reviewsCount || '150'})
                                  </span>
                                </span>
                              </div>

                              <p className="dish-desc-paragraph">{dish.description}</p>

                              <div className="dish-tags-row">
                                {dish.prepTime && (
                                  <span className="dish-tag-chip">
                                    <i className="fa-regular fa-clock"></i> {dish.prepTime}
                                  </span>
                                )}
                                <span className="dish-tag-chip">
                                  <i className="fa-solid fa-user-group"></i> Serves 1-2
                                </span>
                                {dish.isVeg ? (
                                  <span className="dish-tag-chip" style={{ color: '#0F8A5F' }}>
                                    <i className="fa-solid fa-leaf"></i> Pure Veg
                                  </span>
                                ) : (
                                  <span className="dish-tag-chip">
                                    <i className="fa-solid fa-drumstick-bite"></i> Non-Veg
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Right Col */}
                            <div className="dish-right-col">
                              <div className="dish-thumbnail-box">
                                <img
                                  src={dish.image}
                                  alt={dish.name}
                                  loading="lazy"
                                  onError={(e) => {
                                    e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80';
                                  }}
                                />
                              </div>

                              <div className="dish-add-btn-wrapper">
                                {cartQty === 0 ? (
                                  <button
                                    type="button"
                                    className="swiggy-add-btn"
                                    onClick={() => handleAdd(dish)}
                                  >
                                    <span>ADD</span>
                                    <span style={{ fontSize: '0.8rem', marginTop: '-1px' }}>+</span>
                                  </button>
                                ) : (
                                  <div className="swiggy-qty-stepper">
                                    <button
                                      type="button"
                                      className="stepper-btn"
                                      onClick={() => updateCartQuantity(dish.id, cartQty - 1)}
                                    >
                                      −
                                    </button>
                                    <span className="stepper-val">{cartQty}</span>
                                    <button
                                      type="button"
                                      className="stepper-btn"
                                      onClick={() => updateCartQuantity(dish.id, cartQty + 1)}
                                    >
                                      +
                                    </button>
                                  </div>
                                )}
                                <div className="customisable-label">Customisable</div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </main>

      {/* Floating Browse Menu Button */}
      <button
        type="button"
        className="floating-menu-catalog-btn"
        onClick={() => setShowJumpModal(true)}
      >
        <i className="fa-solid fa-book-open"></i>
        <span>BROWSE MENU</span>
        <span style={{ background: 'rgba(255,255,255,0.25)', padding: '2px 8px', borderRadius: 'var(--radius-full)', fontSize: '0.75rem' }}>
          {categories.length} Categories
        </span>
      </button>

      {/* Categories Jump Drawer Modal */}
      {showJumpModal && (
        <div className="menu-jump-modal-overlay active" onClick={() => setShowJumpModal(false)}>
          <div className="menu-jump-modal-card" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid var(--color-border-subtle)' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Browse Menu Categories</h3>
              <button
                type="button"
                className="btn-icon"
                style={{ width: '32px', height: '32px' }}
                onClick={() => setShowJumpModal(false)}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div
                className="menu-jump-item"
                onClick={() => {
                  setSelectedCategory('All');
                  setShowJumpModal(false);
                }}
              >
                <span>All Dishes</span>
                <span style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>{allDishes.length}</span>
              </div>
              {categories.map((cat) => {
                const count = allDishes.filter((d) => d.category === cat).length;
                return (
                  <div
                    key={cat}
                    className="menu-jump-item"
                    onClick={() => {
                      setSelectedCategory(cat);
                      setShowJumpModal(false);
                    }}
                  >
                    <span>{cat}</span>
                    <span style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Floating Cart Bar */}
      {cartSummary.totalItems > 0 && (
        <div className="floating-cart-bar" style={{ display: 'flex' }}>
          <div className="floating-cart-left">
            <div className="floating-cart-count">{cartSummary.totalItems}</div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>Item(s) added in cart</div>
              <div style={{ fontSize: '0.8rem', opacity: 0.9 }}>Total: ₹{cartSummary.total}</div>
            </div>
          </div>
          <Link
            to="/customer/cart"
            className="btn btn-primary btn-sm"
            style={{ boxShadow: 'none', fontWeight: 800, padding: '10px 22px' }}
          >
            View Cart <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>
      )}

      <Footer />
    </div>
  );
}
