import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuickBite } from '../context/QuickBiteContext.jsx';
import Navbar from '../components/layout/Navbar.jsx';
import Footer from '../components/layout/Footer.jsx';

export default function LandingPage() {
  const { restaurants, favorites, toggleFavorite, addToCart, applyCoupon, removeCoupon, cart, showToast, cartSummary, currentUser, promptCustomerLogin, db, openFacultyModal } = useQuickBite();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [vegOnly, setVegOnly] = useState(false);
  const navigate = useNavigate();
  const categoriesRef = useRef(null);

  const categories = db.getCategories();
  const coupons = db.getCoupons();
  const trendingDishes = db.getTrendingDishes(8);

  // Filter restaurants
  let displayedRestaurants = restaurants.filter((r) => r.status === 'active' || r.approvalStatus === 'approved' || (!r.status && !r.approvalStatus));
  if (activeCategory !== 'all') {
    displayedRestaurants = displayedRestaurants.filter((r) => {
      const cuis = r.cuisines || r.cuisine || [];
      const catNorm = activeCategory.toLowerCase().replace(/s$/, '').trim();
      return cuis.some((c) => {
        const cNorm = c.toLowerCase().replace(/s$/, '').trim();
        return cNorm.includes(catNorm) || catNorm.includes(cNorm);
      });
    });
  }
  if (vegOnly) {
    displayedRestaurants = displayedRestaurants.filter((r) => r.isPureVeg);
  }
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    displayedRestaurants = displayedRestaurants.filter((r) => {
      const nameMatch = (r.name || '').toLowerCase().includes(q);
      const cuisMatch = (r.cuisines || r.cuisine || []).some((c) => c.toLowerCase().includes(q));
      const locMatch = (r.location || r.address || '').toLowerCase().includes(q);
      return nameMatch || cuisMatch || locMatch;
    });
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/customer/restaurants?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/customer/restaurants');
    }
  };

  const handleCopyCoupon = (code) => {
    applyCoupon(code);
    showToast(`Coupon "${code}" applied to your basket!`, 'success');
  };

  const handleAddDish = (dish) => {
    addToCart(dish.id, 1);
    showToast(`Added "${dish.name}" to basket!`, 'success');
  };

  return (
    <div className="landing-page-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      {/* Hero Section - Spacious Minimalist Modern Tech */}
      <section className="hero-section" style={{
        position: 'relative',
        padding: '90px 0 110px',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(255, 90, 38, 0.08) 0%, rgba(248, 250, 252, 0) 100%)'
      }}>
        <div className="container" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '60px',
          alignItems: 'center'
        }}>
          
          {/* Left Text Column */}
          <div className="hero-text-col">
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '9999px',
              background: 'var(--color-primary-light)',
              color: 'var(--color-primary)',
              fontSize: '0.825rem',
              fontWeight: 700,
              marginBottom: '20px',
              border: '1px solid rgba(255, 90, 38, 0.2)'
            }}>
              <i className="fa-solid fa-bolt"></i> Superfast Artisanal Food Delivery
            </div>

            <h1 style={{
              fontSize: 'clamp(2.6rem, 5.2vw, 4.2rem)',
              fontWeight: 800,
              lineHeight: 1.12,
              letterSpacing: '-1.5px',
              marginBottom: '22px',
              color: 'var(--color-text-main)'
            }}>
              Feast on the city's <span style={{
                color: 'var(--color-primary)',
                background: 'linear-gradient(135deg, #FF5A26 0%, #FF8C5A 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>finest flavours</span> in 30 minutes.
            </h1>

            <p style={{
              fontSize: '1.125rem',
              color: 'var(--color-text-muted)',
              lineHeight: 1.6,
              marginBottom: '36px',
              maxWidth: '560px'
            }}>
              Hand-tossed Neapolitan crusts, slow-cooked royal dum biryanis, gourmet burgers, and fresh organic bowls delivered steaming hot to your doorstep.
            </p>

            {/* Hero Search Box */}
            <form onSubmit={handleSearchSubmit} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              background: 'var(--color-surface)',
              padding: '8px 10px 8px 20px',
              borderRadius: 'var(--radius-full)',
              maxWidth: '560px',
              boxShadow: 'var(--shadow-lg)',
              border: '1px solid var(--color-border)'
            }}>
              <i className="fa-solid fa-magnifying-glass" style={{ color: 'var(--color-primary)', fontSize: '1.05rem' }}></i>
              <input
                type="text"
                placeholder="Search restaurants, biryani, burgers, pizza..."
                value={searchQuery}
                onChange={(e) => setSearchTerm ? setSearchTerm(e.target.value) : setSearchQuery(e.target.value)}
                style={{
                  flex: 1,
                  border: 'none',
                  outline: 'none',
                  fontSize: '0.95rem',
                  color: 'var(--color-text-main)',
                  background: 'transparent'
                }}
              />
              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  padding: '12px 28px',
                  borderRadius: 'var(--radius-full)',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  boxShadow: 'var(--shadow-primary)'
                }}
              >
                Find Food
              </button>
            </form>

            {/* Quick Metrics Strip */}
            <div style={{ display: 'flex', gap: '32px', marginTop: '36px', flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-text-main)' }}>500+</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Verified Kitchens</div>
              </div>
              <div style={{ borderLeft: '1px solid var(--color-border)' }}></div>
              <div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-text-main)' }}>24 Mins</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Avg Delivery Speed</div>
              </div>
              <div style={{ borderLeft: '1px solid var(--color-border)' }}></div>
              <div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-primary)' }}>4.8 ★</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>From 80k+ Reviews</div>
              </div>
            </div>

            {/* Faculty Presentation & Multi-Role Pipeline Launcher Banner */}
            <div style={{ marginTop: '28px' }}>
              <button
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent('quickbite:start-simulation'))}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 18px',
                  borderRadius: 'var(--radius-full)',
                  background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.12) 0%, rgba(99, 102, 241, 0.12) 100%)',
                  border: '1.5px solid rgba(139, 92, 246, 0.4)',
                  color: '#8B5CF6',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(139, 92, 246, 0.15)',
                  transition: 'all var(--transition-fast)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#8B5CF6';
                  e.currentTarget.style.color = '#FFFFFF';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(139, 92, 246, 0.12) 0%, rgba(99, 102, 241, 0.12) 100%)';
                  e.currentTarget.style.color = '#8B5CF6';
                }}
              >
                <span
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: '#8B5CF6',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem'
                  }}
                >
                  <i className="fa-solid fa-graduation-cap"></i>
                </span>
                <span>Faculty Presentation: View End-to-End Multi-Role Workflow</span>
                <i className="fa-solid fa-arrow-right" style={{ fontSize: '0.75rem' }}></i>
              </button>
            </div>
          </div>

          {/* Right Visual Column */}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            <div style={{ position: 'relative', width: '100%', maxWidth: '520px' }}>
              <img
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80"
                alt="Gourmet Dining Platter"
                style={{
                  width: '100%',
                  height: '420px',
                  objectFit: 'cover',
                  borderRadius: 'var(--radius-xl)',
                  boxShadow: 'var(--shadow-xl)',
                  border: '1px solid var(--color-border)'
                }}
              />

              {/* Floating Pill Card: 24 Mins */}
              <div style={{
                position: 'absolute',
                bottom: '-20px',
                left: '-16px',
                background: 'var(--color-surface)',
                color: 'var(--color-text-main)',
                padding: '16px 22px',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-xl)',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                border: '1px solid var(--color-border)'
              }}>
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  background: 'var(--color-primary-light)',
                  color: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.25rem'
                }}>
                  <i className="fa-solid fa-motorcycle"></i>
                </div>
                <div>
                  <strong style={{ fontSize: '1.05rem', display: 'block', fontWeight: 800 }}>24 Mins Delivery</strong>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Live GPS rider dispatch</span>
                </div>
              </div>

              {/* Floating Pill Card: Discount */}
              <div style={{
                position: 'absolute',
                top: '24px',
                right: '-16px',
                background: 'var(--color-surface)',
                color: 'var(--color-text-main)',
                padding: '10px 18px',
                borderRadius: 'var(--radius-full)',
                boxShadow: 'var(--shadow-lg)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                border: '1px solid var(--color-border)',
                fontWeight: 700,
                fontSize: '0.85rem'
              }}>
                <span style={{ color: 'var(--color-success)', fontSize: '1rem' }}>●</span> 50% Flat Off First 3 Orders
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Categories Horizontal Rail (Swiggy / Uber Eats Circular Style) */}
      <section style={{ padding: '40px 0 32px', borderBottom: '1px solid var(--color-border-subtle)' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-primary)', letterSpacing: '0.6px' }}>
                Handpicked Cuisines
              </span>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '2px' }}>Explore What You Crave</h2>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Freshly prepared dishes from top-rated kitchens</p>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button
                  type="button"
                  onClick={() => categoriesRef.current?.scrollBy({ left: -260, behavior: 'smooth' })}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    border: '1px solid var(--color-border)',
                    background: 'var(--color-surface)',
                    color: 'var(--color-text-main)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: 'var(--shadow-sm)',
                    transition: 'all 0.2s'
                  }}
                  title="Scroll Left"
                >
                  <i className="fa-solid fa-chevron-left" style={{ fontSize: '0.85rem' }}></i>
                </button>
                <button
                  type="button"
                  onClick={() => categoriesRef.current?.scrollBy({ left: 260, behavior: 'smooth' })}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    border: '1px solid var(--color-border)',
                    background: 'var(--color-surface)',
                    color: 'var(--color-text-main)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: 'var(--shadow-sm)',
                    transition: 'all 0.2s'
                  }}
                  title="Scroll Right"
                >
                  <i className="fa-solid fa-chevron-right" style={{ fontSize: '0.85rem' }}></i>
                </button>
              </div>

              <Link to="/customer/restaurants" className="btn btn-secondary btn-sm" style={{ fontWeight: 600 }}>
                View All Restaurants <i className="fa-solid fa-arrow-right" style={{ marginLeft: '6px' }}></i>
              </Link>
            </div>
          </div>

          <div
            ref={categoriesRef}
            className="categories-scroll-row"
            style={{
              display: 'flex',
              gap: '24px',
              overflowX: 'auto',
              padding: '10px 4px 18px',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              scrollBehavior: 'smooth'
            }}
          >
            {categories.map((cat) => {
              const isAll = cat.id === 'all';
              const isActive = isAll ? activeCategory === 'all' : activeCategory.toLowerCase() === cat.name.toLowerCase();

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(isAll ? 'all' : cat.name)}
                  className={`category-circle-item ${isActive ? 'active' : ''}`}
                  title={`Filter by ${cat.name}`}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '10px',
                    minWidth: '92px',
                    flexShrink: 0
                  }}
                >
                  <div
                    className="category-circle-thumb"
                    style={{
                      position: 'relative',
                      width: '84px',
                      height: '84px',
                      borderRadius: '50%',
                      overflow: 'hidden',
                      border: isActive ? '3px solid var(--color-primary)' : '2px solid var(--color-border)',
                      boxShadow: isActive ? '0 0 0 4px rgba(255, 90, 38, 0.25), 0 8px 20px rgba(255, 90, 38, 0.3)' : 'var(--shadow-sm)',
                      transform: isActive ? 'scale(1.06)' : 'none',
                      transition: 'all 0.25s ease',
                      backgroundColor: 'var(--color-surface)'
                    }}
                  >
                    <img
                      src={cat.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=80'}
                      alt={cat.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=80';
                      }}
                    />
                    {isActive && (
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'rgba(255, 90, 38, 0.15)',
                        pointerEvents: 'none'
                      }}></div>
                    )}
                  </div>
                  <span
                    className="category-circle-label"
                    style={{
                      fontSize: '0.85rem',
                      fontWeight: isActive ? 800 : 600,
                      color: isActive ? 'var(--color-primary)' : 'var(--color-text-main)',
                      letterSpacing: '-0.2px',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {cat.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Partner Restaurants Grid */}
      <section style={{ padding: '60px 0 80px' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-primary)', letterSpacing: '0.5px' }}>
                Top Dining Outlets
              </span>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, marginTop: '2px' }}>Popular Restaurants Near You</h2>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button
                onClick={() => setVegOnly(!vegOnly)}
                style={{
                  padding: '8px 18px',
                  borderRadius: 'var(--radius-full)',
                  border: vegOnly ? '1px solid var(--color-success)' : '1px solid var(--color-border)',
                  background: vegOnly ? 'var(--color-success-bg)' : 'var(--color-surface)',
                  color: vegOnly ? 'var(--color-success)' : 'var(--color-text-main)',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer'
                }}
              >
                <i className="fa-solid fa-leaf" style={{ color: 'var(--color-success)' }}></i>
                Pure Veg Only
              </button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '30px' }}>
            {displayedRestaurants.slice(0, 6).map((rest) => {
              const isFav = favorites.includes(rest.id);
              const cuis = rest.cuisines || rest.cuisine || [];

              return (
                <div
                  key={rest.id}
                  style={{
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden',
                    boxShadow: 'var(--shadow-sm)',
                    transition: 'all 0.25s ease',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                  }}
                >
                  {/* Image & Badges */}
                  <div style={{ position: 'relative', height: '210px', overflow: 'hidden' }}>
                    <Link to={`/customer/menu?id=${rest.id}`}>
                      <img
                        src={rest.image}
                        alt={rest.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80';
                        }}
                      />
                    </Link>

                    {/* Offer Tag */}
                    {(rest.offer || rest.discount) && (
                      <span style={{
                        position: 'absolute',
                        bottom: '12px',
                        left: '12px',
                        background: 'rgba(15, 23, 42, 0.85)',
                        backdropFilter: 'blur(8px)',
                        color: '#FFF',
                        padding: '5px 12px',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.785rem',
                        fontWeight: 700,
                        border: '1px solid rgba(255, 255, 255, 0.15)'
                      }}>
                        <i className="fa-solid fa-tag" style={{ color: 'var(--color-primary)', marginRight: '6px' }}></i>
                        {rest.offer || rest.discount}
                      </span>
                    )}

                    {/* Favorite Heart Button */}
                    <button
                      onClick={() => toggleFavorite(rest.id)}
                      style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        width: '38px',
                        height: '38px',
                        borderRadius: '50%',
                        background: 'rgba(255, 255, 255, 0.92)',
                        backdropFilter: 'blur(6px)',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.05rem',
                        color: isFav ? '#EF4444' : '#64748B',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                      }}
                      aria-label="Toggle Favorite"
                    >
                      <i className={`fa-${isFav ? 'solid' : 'regular'} fa-heart`}></i>
                    </button>
                  </div>

                  {/* Body Content */}
                  <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <Link to={`/customer/menu?id=${rest.id}`}>
                          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-text-main)' }}>{rest.name}</h3>
                        </Link>
                        <span style={{
                          background: 'rgba(16, 185, 129, 0.1)',
                          color: '#10B981',
                          fontWeight: 800,
                          fontSize: '0.85rem',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}>
                          <i className="fa-solid fa-star" style={{ fontSize: '0.75rem' }}></i> {rest.rating}
                        </span>
                      </div>

                      <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '16px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {cuis.join(', ')}
                      </p>
                    </div>

                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      borderTop: '1px solid var(--color-border-subtle)',
                      paddingTop: '14px',
                      fontSize: '0.85rem',
                      color: 'var(--color-text-muted)'
                    }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <i className="fa-regular fa-clock" style={{ color: 'var(--color-primary)' }}></i>
                        {rest.deliveryTime || '30 mins'}
                      </span>
                      <span>₹{rest.priceForTwo || 400} for two</span>
                      <Link
                        to={`/customer/menu?id=${rest.id}`}
                        className="btn btn-primary btn-sm"
                        style={{ padding: '6px 14px', fontSize: '0.8rem', fontWeight: 700, borderRadius: 'var(--radius-full)' }}
                      >
                        Order Now
                      </Link>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Promotional Vouchers Section */}
      <section style={{ background: 'var(--color-surface)', padding: '50px 0', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-primary)' }}>
                Exclusive Perks
              </span>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Available Promo Codes</h2>
            </div>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Click to apply instantly</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {coupons.map((c) => {
              const appliedCode = typeof cart?.coupon === 'string' ? cart.coupon : cart?.coupon?.code;
              const isApplied = Boolean(appliedCode && appliedCode.toUpperCase() === c.code.toUpperCase());
              return (
                <div
                  key={c.code}
                  onClick={() => {
                    if (isApplied) {
                      removeCoupon();
                      showToast(`Coupon "${c.code}" removed`, 'info');
                    } else {
                      handleCopyCoupon(c.code);
                    }
                  }}
                  style={{
                    border: isApplied ? '1.5px solid var(--color-success, #10b981)' : '1.5px dashed var(--color-primary)',
                    borderRadius: 'var(--radius-md)',
                    padding: '20px',
                    background: isApplied ? 'var(--color-success-bg, rgba(16, 185, 129, 0.08))' : 'var(--color-surface-card)',
                    boxShadow: isApplied ? '0 2px 10px rgba(16, 185, 129, 0.18)' : 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'none')}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '1.1rem', fontWeight: 900, color: isApplied ? 'var(--color-success, #10b981)' : 'var(--color-primary)', letterSpacing: '0.5px' }}>
                        {c.code}
                      </span>
                      {isApplied && (
                        <span style={{ background: 'var(--color-success, #10b981)', color: '#fff', fontSize: '0.7rem', fontWeight: 800, padding: '2px 8px', borderRadius: '4px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <i className="fa-solid fa-check"></i> APPLIED
                        </span>
                      )}
                    </div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', marginTop: '4px' }}>{c.title || c.code}</div>
                    <div style={{ fontSize: '0.785rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>{c.description}</div>
                  </div>
                  {isApplied ? (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeCoupon();
                        showToast(`Coupon "${c.code}" removed`, 'info');
                      }}
                      style={{
                        padding: '6px 14px',
                        background: 'rgba(239, 68, 68, 0.1)',
                        color: 'var(--color-danger, #ef4444)',
                        border: '1px solid var(--color-danger, #ef4444)',
                        fontWeight: 800,
                        fontSize: '0.8rem',
                        borderRadius: 'var(--radius-full)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <i className="fa-solid fa-xmark"></i> REMOVE
                    </button>
                  ) : (
                    <div style={{
                      padding: '6px 14px',
                      background: 'var(--color-primary-light)',
                      color: 'var(--color-primary)',
                      fontWeight: 800,
                      fontSize: '0.8rem',
                      borderRadius: 'var(--radius-full)'
                    }}>
                      APPLY
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trending Dishes Section */}
      <section style={{ padding: '60px 0 80px' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-primary)' }}>
                Foodie Bestsellers
              </span>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, marginTop: '2px' }}>Trending Bites Right Now</h2>
            </div>
            <Link to="/customer/restaurants" className="btn btn-secondary btn-sm" style={{ fontWeight: 600 }}>
              Full Catalog <i className="fa-solid fa-arrow-right" style={{ marginLeft: '6px' }}></i>
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
            {trendingDishes.map((dish) => (
              <div
                key={dish.id}
                style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div style={{ height: '170px', position: 'relative' }}>
                  <img
                    src={dish.image}
                    alt={dish.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80';
                    }}
                  />
                  <span
                    className={`badge-diet ${dish.isVeg ? 'veg' : 'non-veg'}`}
                    style={{ position: 'absolute', top: '12px', left: '12px', background: '#fff', padding: '3px', borderRadius: '4px' }}
                  ></span>
                </div>

                <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '4px' }}>{dish.name}</h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', lineHeight: 1.4, marginBottom: '14px' }}>
                      {dish.description}
                    </p>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--color-border-subtle)', paddingTop: '12px' }}>
                    <div style={{ fontSize: '1.15rem', fontWeight: 900, color: 'var(--color-text-main)' }}>
                      ₹{dish.price}
                    </div>
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      onClick={() => handleAddDish(dish)}
                      style={{ padding: '6px 14px', borderRadius: 'var(--radius-full)', fontWeight: 700 }}
                    >
                      ADD +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Floating Sticky Cart Bar */}
      {cartSummary && (cartSummary.itemCount > 0 || cartSummary.totalItems > 0) && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'calc(100% - 32px)',
          maxWidth: '780px',
          background: 'linear-gradient(90deg, #0F172A 0%, #1E293B 100%)',
          color: '#FFFFFF',
          borderRadius: 'var(--radius-xl)',
          padding: '14px 24px',
          boxShadow: '0 12px 35px rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 100,
          border: '1px solid rgba(255, 255, 255, 0.12)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'var(--color-primary)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '1rem'
            }}>
              {cartSummary.itemCount || cartSummary.totalItems}
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>
                {cartSummary.itemCount || cartSummary.totalItems} {(cartSummary.itemCount || cartSummary.totalItems) === 1 ? 'Item' : 'Items'} in Basket
              </div>
              <div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>
                Item Subtotal: ₹{cartSummary.itemTotal || cartSummary.subtotal}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <Link
              to="/customer/cart"
              className="btn btn-secondary btn-sm"
              style={{
                padding: '8px 18px',
                borderRadius: 'var(--radius-full)',
                fontWeight: 700,
                fontSize: '0.85rem'
              }}
            >
              View Cart
            </Link>
            <button
              type="button"
              onClick={() => {
                if (!currentUser || currentUser.role !== 'customer') {
                  promptCustomerLogin('/customer/checkout');
                } else {
                  navigate('/customer/checkout');
                }
              }}
              className="btn btn-primary btn-sm"
              style={{
                padding: '8px 20px',
                borderRadius: 'var(--radius-full)',
                fontWeight: 800,
                fontSize: '0.875rem',
                boxShadow: 'var(--shadow-primary)',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              Checkout <i className="fa-solid fa-arrow-right" style={{ marginLeft: '4px' }}></i>
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
