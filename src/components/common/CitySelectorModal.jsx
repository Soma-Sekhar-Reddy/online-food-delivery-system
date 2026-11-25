import React, { useState } from 'react';
import { useQuickBite } from '../../context/QuickBiteContext.jsx';

export default function CitySelectorModal({ isOpen, onClose }) {
  const { deliveryCity, setDeliveryCity, deliveryCities = [] } = useQuickBite();
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const currentCityId = deliveryCity?.id || 'hyd';

  // Filter cities or localities by search
  const filteredCities = deliveryCities.filter((c) => {
    const q = searchTerm.toLowerCase().trim();
    if (!q) return true;
    return (
      c.name.toLowerCase().includes(q) ||
      c.state.toLowerCase().includes(q) ||
      c.localities.some((loc) => loc.toLowerCase().includes(q))
    );
  });

  const handleSelectCity = (city, locality = null) => {
    const updated = {
      ...city,
      defaultArea: locality || city.defaultArea || (city.localities && city.localities[0]) || city.name
    };
    setDeliveryCity(updated);
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        animation: 'fadeIn 0.2s ease-out'
      }}
      onClick={onClose}
    >
      <div
        className="custom-modal-card"
        style={{
          background: 'var(--color-surface, #FFFFFF)',
          color: 'var(--color-text-main, #0F172A)',
          border: '1px solid var(--color-border, #E2E8F0)',
          borderRadius: 'var(--radius-xl, 24px)',
          boxShadow: 'var(--shadow-xl, 0 24px 48px -12px rgba(0,0,0,0.25))',
          width: '100%',
          maxWidth: '680px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          animation: 'modalSlideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '24px 28px 18px',
            borderBottom: '1px solid var(--color-border, #E2E8F0)',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '16px'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: 'rgba(255, 90, 38, 0.12)',
                  color: 'var(--color-primary, #FF5A26)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.1rem'
                }}
              >
                <i className="fa-solid fa-location-dot"></i>
              </div>
              <h3
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  margin: 0,
                  color: 'var(--color-text-main, #0F172A)',
                  letterSpacing: '-0.3px'
                }}
              >
                Select Delivery City & Locality
              </h3>
            </div>
            <p
              style={{
                fontSize: '0.85rem',
                color: 'var(--color-text-muted, #64748B)',
                margin: '8px 0 0',
                lineHeight: 1.4
              }}
            >
              QuickBite operates within designated delivery hubs. Choose your city to explore local restaurants and accurate delivery distances.
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              background: 'var(--color-surface-hover, #F1F5F9)',
              border: 'none',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--color-text-muted, #64748B)',
              fontSize: '1rem',
              flexShrink: 0,
              transition: 'all 0.2s'
            }}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* Search input */}
        <div style={{ padding: '16px 28px 10px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: 'var(--color-surface-hover, #F8FAFC)',
              border: '1px solid var(--color-border, #E2E8F0)',
              borderRadius: 'var(--radius-lg, 14px)',
              padding: '10px 16px'
            }}
          >
            <i className="fa-solid fa-magnifying-glass" style={{ color: 'var(--color-text-subtle, #94A3B8)' }}></i>
            <input
              type="text"
              placeholder="Search by city (Hyderabad, Gurugram, etc.) or locality (Indiranagar, Hitec City...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                border: 'none',
                background: 'transparent',
                outline: 'none',
                width: '100%',
                fontSize: '0.9rem',
                color: 'var(--color-text-main, #0F172A)'
              }}
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-text-subtle)',
                  cursor: 'pointer',
                  fontSize: '0.85rem'
                }}
              >
                <i className="fa-solid fa-circle-xmark"></i>
              </button>
            )}
          </div>
        </div>

        {/* City Hubs List */}
        <div
          style={{
            padding: '10px 28px 24px',
            overflowY: 'auto',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}
        >
          {filteredCities.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '32px 16px', color: 'var(--color-text-muted)' }}>
              <i className="fa-solid fa-location-crosshairs" style={{ fontSize: '2rem', marginBottom: '10px', opacity: 0.5 }}></i>
              <p style={{ margin: 0, fontWeight: 600 }}>No delivery hubs match "{searchTerm}"</p>
              <p style={{ fontSize: '0.8rem', marginTop: '4px' }}>
                We currently deliver exclusively in Hyderabad, Bangalore, Mumbai, Delhi NCR / Gurugram, Pune, and Chennai.
              </p>
            </div>
          ) : (
            filteredCities.map((city) => {
              const isSelected = currentCityId === city.id;
              return (
                <div
                  key={city.id}
                  style={{
                    border: isSelected ? '2px solid var(--color-primary, #FF5A26)' : '1px solid var(--color-border, #E2E8F0)',
                    background: isSelected ? 'rgba(255, 90, 38, 0.04)' : 'var(--color-surface, #FFFFFF)',
                    borderRadius: '16px',
                    padding: '16px 18px',
                    transition: 'all 0.2s ease',
                    boxShadow: isSelected ? '0 4px 14px rgba(255, 90, 38, 0.12)' : 'none'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '10px',
                      cursor: 'pointer'
                    }}
                    onClick={() => handleSelectCity(city)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div
                        style={{
                          width: '38px',
                          height: '38px',
                          borderRadius: '10px',
                          background: isSelected ? 'var(--color-primary, #FF5A26)' : 'var(--color-border-subtle, #F1F5F9)',
                          color: isSelected ? '#FFFFFF' : 'var(--color-text-main, #0F172A)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1rem',
                          fontWeight: 700
                        }}
                      >
                        <i className={`fa-solid ${city.icon || 'fa-city'}`}></i>
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--color-text-main, #0F172A)' }}>
                            {city.name}
                          </span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted, #64748B)', fontWeight: 500 }}>
                            ({city.state})
                          </span>
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-subtle, #94A3B8)', marginTop: '2px' }}>
                          Hyper-local delivery active • Unique verified restaurants
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      {isSelected ? (
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            background: 'var(--color-primary, #FF5A26)',
                            color: '#FFFFFF',
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            padding: '4px 10px',
                            borderRadius: '20px'
                          }}
                        >
                          <i className="fa-solid fa-check"></i> Selected City
                        </span>
                      ) : (
                        <button
                          type="button"
                          className="btn btn-sm"
                          style={{
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            padding: '6px 14px',
                            borderRadius: '8px',
                            border: '1px solid var(--color-border, #CBD5E1)',
                            background: 'transparent',
                            color: 'var(--color-text-main)'
                          }}
                        >
                          Select City
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Localities chips */}
                  <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px dashed var(--color-border, #E2E8F0)' }}>
                    <div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-subtle, #94A3B8)', marginBottom: '8px', letterSpacing: '0.5px' }}>
                      Popular Localities / Delivery Sectors:
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {city.localities?.map((loc) => {
                        const isLocActive = isSelected && deliveryCity?.defaultArea?.includes(loc);
                        return (
                          <button
                            key={loc}
                            type="button"
                            onClick={() => handleSelectCity(city, loc)}
                            style={{
                              border: isLocActive ? '1px solid var(--color-primary)' : '1px solid var(--color-border, #E2E8F0)',
                              background: isLocActive ? 'var(--color-primary)' : 'var(--color-surface-hover, #F8FAFC)',
                              color: isLocActive ? '#FFFFFF' : 'var(--color-text-main)',
                              borderRadius: '20px',
                              padding: '3px 10px',
                              fontSize: '0.75rem',
                              fontWeight: isLocActive ? 700 : 500,
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              transition: 'all 0.15s ease'
                            }}
                          >
                            <i className="fa-solid fa-location-pin" style={{ fontSize: '0.65rem', opacity: 0.8 }}></i>
                            {loc}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info banner */}
        <div
          style={{
            padding: '14px 28px',
            background: 'var(--color-surface-hover, #F8FAFC)',
            borderTop: '1px solid var(--color-border, #E2E8F0)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}
        >
          <i className="fa-solid fa-shield-halved" style={{ color: 'var(--color-primary, #FF5A26)', fontSize: '1rem', flexShrink: 0 }}></i>
          <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted, #64748B)', lineHeight: 1.3 }}>
            <strong>Hyper-Local Delivery Promise:</strong> We only deliver from restaurants within your selected city. Cross-city orders (such as Gurugram to Hyderabad) are strictly prevented.
          </span>
        </div>
      </div>
    </div>
  );
}
