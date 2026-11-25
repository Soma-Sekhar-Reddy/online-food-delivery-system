import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useQuickBite } from '../../context/QuickBiteContext';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

const CUISINES = [
  'All',
  'Biryani',
  'North Indian',
  'South Indian',
  'Burgers',
  'Pizza',
  'Chinese',
  'Healthy',
  'Desserts',
  'Rolls'
];

export default function RestaurantsPage() {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';

  const { restaurants, favorites, toggleFavorite, showToast } = useQuickBite();
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const [sortBy, setSortBy] = useState('rating');
  const [vegOnly, setVegOnly] = useState(false);
  const [topRatedOnly, setTopRatedOnly] = useState(false);
  const [under300Only, setUnder300Only] = useState(false);
  const [favsOnly, setFavsOnly] = useState(false);

  const filteredRestaurants = useMemo(() => {
    return restaurants
      .filter((r) => {
        if (r.status !== 'active' && r.approvalStatus === 'rejected') return false;
        if (searchTerm.trim()) {
          const q = searchTerm.toLowerCase();
          const matchName = (r.name || '').toLowerCase().includes(q);
          const matchCuisine = (r.cuisines || r.cuisine || []).some((c) => c.toLowerCase().includes(q));
          const matchLocation = (r.location || r.address || '').toLowerCase().includes(q);
          if (!matchName && !matchCuisine && !matchLocation) return false;
        }
        if (selectedCuisine !== 'All') {
          const cuis = r.cuisines || r.cuisine || [];
          if (!cuis.some((c) => c.toLowerCase() === selectedCuisine.toLowerCase())) {
            return false;
          }
        }
        if (vegOnly && !r.isPureVeg) return false;
        if (topRatedOnly && Number(r.rating) < 4.2) return false;
        if (under300Only && Number(r.priceForTwo || 300) > 300) return false;
        if (favsOnly && !favorites.includes(r.id)) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return Number(b.rating) - Number(a.rating);
        if (sortBy === 'deliveryTime') return parseInt(a.deliveryTime || '30') - parseInt(b.deliveryTime || '30');
        if (sortBy === 'priceAsc') return (a.priceForTwo || 0) - (b.priceForTwo || 0);
        if (sortBy === 'priceDesc') return (b.priceForTwo || 0) - (a.priceForTwo || 0);
        return 0;
      });
  }, [restaurants, searchTerm, selectedCuisine, sortBy, vegOnly, topRatedOnly, under300Only, favsOnly, favorites]);

  const handleToggleFav = (e, restId, name) => {
    e.preventDefault();
    e.stopPropagation();
    const isFav = toggleFavorite(restId);
    showToast(`${isFav ? 'Added to' : 'Removed from'} favorites: ${name}`, isFav ? 'success' : 'info');
  };

  return (
    <div className="customer-page-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      {/* Filter & Search Bar Section - Full Width & Clean */}
      <section style={{
        background: 'var(--color-surface)',
        borderBottom: '1px solid var(--color-border)',
        padding: '24px 0 20px',
        position: 'sticky',
        top: 'var(--header-height)',
        zIndex: 40,
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div className="container">
          
          {/* Row 1: Search & Sort */}
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px', flexWrap: 'wrap' }}>
            <div style={{
              flex: 1,
              minWidth: '280px',
              maxWidth: '680px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              background: 'var(--color-bg)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-full)',
              padding: '10px 18px'
            }}>
              <i className="fa-solid fa-magnifying-glass" style={{ color: 'var(--color-primary)', fontSize: '0.95rem' }}></i>
              <input
                type="text"
                placeholder="Search restaurants, biryani, pizzas, burgers, rolls..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  flex: 1,
                  border: 'none',
                  outline: 'none',
                  fontSize: '0.9rem',
                  color: 'var(--color-text-main)',
                  background: 'transparent'
                }}
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)' }}
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              )}
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              background: 'var(--color-bg)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.85rem'
            }}>
              <i className="fa-solid fa-arrow-down-wide-short" style={{ color: 'var(--color-text-muted)' }}></i>
              <span style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  fontWeight: 700,
                  color: 'var(--color-text-main)',
                  cursor: 'pointer',
                  border: 'none',
                  outline: 'none',
                  background: 'transparent'
                }}
              >
                <option value="rating">Rating: High to Low</option>
                <option value="deliveryTime">Delivery Speed</option>
                <option value="priceAsc">Price: Low to High</option>
                <option value="priceDesc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Row 2: Cuisine Pills Carousel */}
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '10px' }} className="categories-scroll-row">
            {CUISINES.map((cuisine) => {
              const active = selectedCuisine === cuisine;
              return (
                <button
                  key={cuisine}
                  type="button"
                  onClick={() => setSelectedCuisine(cuisine)}
                  style={{
                    padding: '7px 16px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.825rem',
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                    border: active ? '1px solid var(--color-primary)' : '1px solid var(--color-border)',
                    background: active ? 'var(--color-primary)' : 'var(--color-bg)',
                    color: active ? '#FFFFFF' : 'var(--color-text-main)',
                    boxShadow: active ? 'var(--shadow-primary)' : 'none',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  {cuisine}
                </button>
              );
            })}
          </div>

          {/* Row 3: Quick Filter Chips */}
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap', marginTop: '8px' }}>
            <button
              type="button"
              onClick={() => setVegOnly(!vegOnly)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                border: vegOnly ? '1px solid var(--color-success)' : '1px solid var(--color-border)',
                background: vegOnly ? 'var(--color-success-bg)' : 'transparent',
                color: vegOnly ? 'var(--color-success)' : 'var(--color-text-main)',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              <i className="fa-solid fa-seedling" style={{ color: 'var(--color-success)' }}></i> Pure Veg
            </button>

            <button
              type="button"
              onClick={() => setTopRatedOnly(!topRatedOnly)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                border: topRatedOnly ? '1px solid var(--color-warning)' : '1px solid var(--color-border)',
                background: topRatedOnly ? 'var(--color-warning-bg)' : 'transparent',
                color: topRatedOnly ? '#D97706' : 'var(--color-text-main)',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              <i className="fa-solid fa-star" style={{ color: 'var(--color-warning)' }}></i> 4.2+ Rating
            </button>

            <button
              type="button"
              onClick={() => setUnder300Only(!under300Only)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                border: under300Only ? '1px solid #3B82F6' : '1px solid var(--color-border)',
                background: under300Only ? '#EFF6FF' : 'transparent',
                color: under300Only ? '#2563EB' : 'var(--color-text-main)',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              <i className="fa-solid fa-indian-rupee-sign"></i> Under ₹300 for Two
            </button>

            <button
              type="button"
              onClick={() => setFavsOnly(!favsOnly)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                border: favsOnly ? '1px solid var(--color-danger)' : '1px solid var(--color-border)',
                background: favsOnly ? 'var(--color-danger-bg)' : 'transparent',
                color: favsOnly ? 'var(--color-danger)' : 'var(--color-text-main)',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              <i className="fa-solid fa-heart" style={{ color: 'var(--color-danger)' }}></i> Favorites ({favorites.length})
            </button>

            {(searchTerm || selectedCuisine !== 'All' || vegOnly || topRatedOnly || under300Only || favsOnly) && (
              <button
                type="button"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCuisine('All');
                  setVegOnly(false);
                  setTopRatedOnly(false);
                  setUnder300Only(false);
                  setFavsOnly(false);
                }}
                style={{
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-full)',
                  border: 'none',
                  background: 'none',
                  color: 'var(--color-danger)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                <i className="fa-solid fa-rotate-left"></i> Reset
              </button>
            )}
          </div>

        </div>
      </section>

      {/* Restaurant Grid Section - Full-Screen Spacious View */}
      <main style={{ flex: 1, padding: '40px 0 80px' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>
              {selectedCuisine === 'All' ? 'Restaurants in Your Area' : `${selectedCuisine} Specialists`}
              <span style={{ fontSize: '0.925rem', fontWeight: 600, color: 'var(--color-text-muted)', marginLeft: '10px' }}>
                ({filteredRestaurants.length} outlets)
              </span>
            </h2>
          </div>

          {filteredRestaurants.length === 0 ? (
            <div style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-xl)',
              textAlign: 'center',
              padding: '80px 20px',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <i className="fa-solid fa-utensils" style={{ fontSize: '3.5rem', color: 'var(--color-text-subtle)', marginBottom: '16px' }}></i>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '8px' }}>No restaurants match your filters</h3>
              <p style={{ color: 'var(--color-text-muted)', maxWidth: '420px', margin: '0 auto 24px' }}>
                Try adjusting your search query, selecting "All Cuisines", or clearing active dietary filters.
              </p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCuisine('All');
                  setVegOnly(false);
                  setTopRatedOnly(false);
                  setUnder300Only(false);
                  setFavsOnly(false);
                }}
                style={{ padding: '10px 24px', borderRadius: 'var(--radius-full)', fontWeight: 700 }}
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
              gap: '30px'
            }}>
              {filteredRestaurants.map((rest) => {
                const isFav = favorites.includes(rest.id);
                const cuis = rest.cuisines || rest.cuisine || [];

                return (
                  <Link
                    to={`/customer/menu?id=${rest.id}`}
                    key={rest.id}
                    style={{
                      background: 'var(--color-surface)',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-lg)',
                      overflow: 'hidden',
                      boxShadow: 'var(--shadow-sm)',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'all 0.25s ease'
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
                    {/* Image Wrap */}
                    <div style={{ position: 'relative', height: '210px', overflow: 'hidden' }}>
                      <img
                        src={rest.image}
                        alt={rest.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                        loading="lazy"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80';
                        }}
                      />

                      {/* Offer Badge */}
                      {(rest.offer || rest.discount) && (
                        <span style={{
                          position: 'absolute',
                          bottom: '12px',
                          left: '12px',
                          background: 'rgba(15, 23, 42, 0.85)',
                          backdropFilter: 'blur(8px)',
                          color: '#FFF',
                          padding: '4px 12px',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: '0.785rem',
                          fontWeight: 700,
                          border: '1px solid rgba(255, 255, 255, 0.15)'
                        }}>
                          <i className="fa-solid fa-tag" style={{ color: 'var(--color-primary)', marginRight: '6px' }}></i>
                          {rest.offer || rest.discount}
                        </span>
                      )}

                      {/* Heart Favorite Button */}
                      <button
                        type="button"
                        onClick={(e) => handleToggleFav(e, rest.id, rest.name)}
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
                          fontSize: '1rem',
                          color: isFav ? '#EF4444' : '#64748B',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                        }}
                        title={isFav ? 'Remove from favorites' : 'Add to favorites'}
                      >
                        <i className={isFav ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}></i>
                      </button>

                      {/* Pure Veg Tag */}
                      {rest.isPureVeg && (
                        <span style={{
                          position: 'absolute',
                          top: '12px',
                          left: '12px',
                          background: 'rgba(16, 185, 129, 0.92)',
                          color: '#FFF',
                          padding: '3px 10px',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '0.725rem',
                          fontWeight: 800,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px'
                        }}>
                          <i className="fa-solid fa-seedling"></i> Pure Veg
                        </span>
                      )}
                    </div>

                    {/* Card Body */}
                    <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-text-main)' }}>{rest.name}</h3>
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
                        <span style={{ color: 'var(--color-text-subtle)', fontSize: '0.8rem' }}>
                          {rest.location || 'Mumbai'}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
