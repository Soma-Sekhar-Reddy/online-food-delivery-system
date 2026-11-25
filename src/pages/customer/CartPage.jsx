import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuickBite } from '../../context/QuickBiteContext';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

const SAMPLE_COUPONS = [
  { code: 'QUICK50', title: '50% OFF', desc: 'Up to ₹100 on orders above ₹199' },
  { code: 'WELCOME20', title: '20% OFF', desc: 'Up to ₹80 for newcomers' },
  { code: 'TASTY30', title: '₹30 FLAT OFF', desc: 'Instant discount on any order' }
];

export default function CartPage() {
  const {
    cart,
    cartSummary,
    updateCartQuantity,
    clearCart,
    applyCoupon,
    removeCoupon,
    showToast,
    showConfirmModal,
    currentUser,
    promptCustomerLogin,
    db
  } = useQuickBite();

  const navigate = useNavigate();
  const [couponInput, setCouponInput] = useState('');
  const [voucherSearch, setVoucherSearch] = useState('');
  const [instructions, setInstructions] = useState('');

  const handleApply = (code) => {
    const targetCode = (code || couponInput || voucherSearch).trim();
    if (!targetCode) return;
    const ok = applyCoupon(targetCode);
    if (ok) {
      showToast(`Coupon "${targetCode.toUpperCase()}" applied successfully!`, 'success');
      setCouponInput('');
    } else {
      showToast('Invalid or expired coupon code. Try QUICK50 or WELCOME20', 'error');
    }
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    showToast('Coupon removed', 'info');
  };

  const handleProceed = () => {
    if (!currentUser || currentUser.role !== 'customer') {
      promptCustomerLogin('/customer/checkout');
      return;
    }
    if (instructions.trim()) {
      sessionStorage.setItem('qb_delivery_instructions', instructions.trim());
    }
    navigate('/customer/checkout');
  };

  if (!cart.items || cart.items.length === 0) {
    return (
      <div className="customer-page-wrapper">
        <Navbar />
        <div className="container" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '60px 20px' }}>
          <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'var(--color-surface-card)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <i className="fa-solid fa-cart-shopping" style={{ fontSize: '3rem', color: 'var(--color-primary)' }}></i>
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '8px' }}>Your Cart is Empty</h2>
          <p style={{ color: 'var(--color-text-muted)', maxWidth: '440px', marginBottom: '24px' }}>
            Looks like you haven't added anything to your cart yet. Explore top dishes from popular restaurants around you!
          </p>
          <Link to="/customer/restaurants" className="btn btn-primary" style={{ padding: '12px 28px', fontSize: '1rem' }}>
            <i className="fa-solid fa-utensils"></i> Explore Restaurants
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="customer-page-wrapper">
      <Navbar />

      <main className="section" style={{ minHeight: '75vh', paddingTop: '30px' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Review Your Order</h1>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={async () => {
                const confirmed = await showConfirmModal({
                  title: 'Clear Shopping Basket?',
                  message: 'Are you sure you want to remove all items from your basket?',
                  confirmText: 'Yes, Clear Basket',
                  cancelText: 'Keep Items',
                  type: 'danger'
                });
                if (confirmed) {
                  clearCart();
                  showToast('Cart cleared', 'info');
                }
              }}
              style={{ color: 'var(--color-danger)' }}
            >
              <i className="fa-solid fa-trash-can"></i> Clear Cart
            </button>
          </div>

          <div className="cart-page-grid">
            {/* Left Column: Items List & Instructions */}
            <div>
              {/* Cart Items Box */}
              <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '24px', marginBottom: '24px', boxShadow: 'var(--shadow-sm)' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <i className="fa-solid fa-bag-shopping" style={{ color: 'var(--color-primary)' }}></i>
                  Items in Basket ({cartSummary.itemCount || cartSummary.totalItems || cart.items.length})
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {cart.items.map((item) => (
                    <div
                      key={item.dishId}
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '16px', borderBottom: '1px solid var(--color-border)', flexWrap: 'wrap', gap: '12px' }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: '220px', flex: 1 }}>
                        <img
                          src={item.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=150&q=80'}
                          alt={item.name}
                          style={{ width: '64px', height: '64px', borderRadius: 'var(--radius-md)', objectFit: 'cover', flexShrink: 0 }}
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=150&q=80';
                          }}
                        />
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span className={`badge-diet ${item.isVeg ? 'veg' : 'non-veg'}`}></span>
                            <div style={{ fontWeight: 700, fontSize: '0.975rem' }}>{item.name}</div>
                          </div>
                          <div style={{ fontSize: '0.825rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>₹{item.price} each</div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          background: 'var(--color-bg)',
                          border: '1px solid var(--color-border)',
                          borderRadius: 'var(--radius-full)',
                          padding: '4px 10px'
                        }}>
                          <button
                            type="button"
                            onClick={() => updateCartQuantity(item.dishId, item.quantity - 1)}
                            style={{ background: 'none', border: 'none', color: 'var(--color-primary)', cursor: 'pointer', fontWeight: 800, fontSize: '1rem' }}
                            title="Decrease quantity"
                          >
                            <i className={item.quantity === 1 ? 'fa-solid fa-trash-can' : 'fa-solid fa-minus'} style={{ fontSize: '0.8rem' }}></i>
                          </button>
                          <span style={{ minWidth: '18px', textAlign: 'center', fontWeight: 800, fontSize: '0.9rem' }}>{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateCartQuantity(item.dishId, item.quantity + 1)}
                            style={{ background: 'none', border: 'none', color: 'var(--color-primary)', cursor: 'pointer', fontWeight: 800, fontSize: '1rem' }}
                            title="Increase quantity"
                          >
                            <i className="fa-solid fa-plus" style={{ fontSize: '0.8rem' }}></i>
                          </button>
                        </div>
                        <div style={{ minWidth: '80px', textAlign: 'right', fontWeight: 800, fontSize: '1.05rem', color: 'var(--color-text-main)' }}>
                          ₹{item.price * item.quantity}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cooking / Delivery Instructions */}
              <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '20px 24px', marginBottom: '24px' }}>
                <label style={{ display: 'block', fontWeight: 700, fontSize: '0.9rem', marginBottom: '8px' }}>
                  <i className="fa-regular fa-note-sticky" style={{ color: 'var(--color-primary)' }}></i> Cooking or Delivery Instructions (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Please make it mild spicy, don't ring doorbell, leave at door..."
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', background: 'var(--color-surface-card)', fontSize: '0.9rem' }}
                />
              </div>

              {/* Available Coupons & Vouchers */}
              {(() => {
                const dbCoupons = (db && typeof db.getCoupons === 'function') ? db.getCoupons() : [];
                const mergedCouponsMap = new Map();
                SAMPLE_COUPONS.forEach((c) => {
                  mergedCouponsMap.set(c.code.toUpperCase(), { ...c, description: c.desc || c.description });
                });
                dbCoupons.forEach((c) => {
                  const code = c.code.toUpperCase();
                  if (mergedCouponsMap.has(code)) {
                    mergedCouponsMap.set(code, {
                      ...mergedCouponsMap.get(code),
                      ...c,
                      description: c.description || mergedCouponsMap.get(code).description
                    });
                  } else {
                    mergedCouponsMap.set(code, {
                      ...c,
                      title: c.discountPercent ? `${c.discountPercent}% OFF` : (c.flatDiscount ? `₹${c.flatDiscount} FLAT OFF` : (c.freeDelivery ? 'FREE DELIVERY' : c.code)),
                      description: c.description
                    });
                  }
                });

                const appliedCode = typeof cart.coupon === 'string'
                  ? cart.coupon
                  : cart.coupon?.code;
                const isApplied = (code) => Boolean(appliedCode && appliedCode.toUpperCase() === code?.toUpperCase());

                // If an unlisted coupon is currently applied, ensure it appears in the vouchers list
                if (appliedCode && !mergedCouponsMap.has(appliedCode.toUpperCase())) {
                  mergedCouponsMap.set(appliedCode.toUpperCase(), {
                    code: appliedCode.toUpperCase(),
                    title: 'UNLISTED PROMO',
                    description: cart.coupon?.description || 'Custom promo voucher applied',
                    isUnlisted: true
                  });
                }

                const availableCoupons = Array.from(mergedCouponsMap.values());
                const searchTrim = voucherSearch.trim();
                const filteredCoupons = availableCoupons.filter((cp) => {
                  if (!searchTrim) return true;
                  const q = searchTrim.toLowerCase();
                  return (
                    cp.code.toLowerCase().includes(q) ||
                    (cp.description || cp.desc || '').toLowerCase().includes(q) ||
                    (cp.title || '').toLowerCase().includes(q)
                  );
                });
                const hasExactMatch = availableCoupons.some((cp) => cp.code.toUpperCase() === searchTrim.toUpperCase());

                return (
                  <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '20px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <i className="fa-solid fa-tag" style={{ color: 'var(--color-primary)' }}></i> Available Coupons & Vouchers
                      </h4>
                      {appliedCode && (
                        <span style={{ fontSize: '0.8rem', color: 'var(--color-success)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'var(--color-success-bg, rgba(16,185,129,0.1))', padding: '3px 10px', borderRadius: 'var(--radius-full)' }}>
                          <i className="fa-solid fa-circle-check"></i>
                          <span>{appliedCode} Applied</span>
                        </span>
                      )}
                    </div>

                    {/* Small Search Option for Listed & Unlisted Coupons */}
                    <div style={{ marginBottom: '16px' }}>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <div style={{ position: 'relative', flex: 1 }}>
                          <i className="fa-solid fa-magnifying-glass" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)', fontSize: '0.85rem' }}></i>
                          <input
                            type="text"
                            placeholder="Search voucher or enter unlisted code (e.g. WELCOME20, FESTIVE)..."
                            value={voucherSearch}
                            onChange={(e) => setVoucherSearch(e.target.value.toUpperCase())}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                if (voucherSearch.trim()) handleApply(voucherSearch.trim());
                              }
                            }}
                            style={{
                              width: '100%',
                              padding: '9px 34px 9px 36px',
                              fontSize: '0.85rem',
                              borderRadius: 'var(--radius-md)',
                              border: '1px solid var(--color-border)',
                              background: 'var(--color-surface-card)',
                              color: 'var(--color-text-main)',
                              letterSpacing: voucherSearch ? '0.5px' : 'normal',
                              fontWeight: voucherSearch ? 600 : 'normal'
                            }}
                          />
                          {voucherSearch && (
                            <button
                              type="button"
                              onClick={() => setVoucherSearch('')}
                              style={{
                                position: 'absolute',
                                right: '10px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                background: 'none',
                                border: 'none',
                                color: 'var(--color-text-muted)',
                                cursor: 'pointer',
                                fontSize: '0.85rem'
                              }}
                              title="Clear search"
                            >
                              <i className="fa-solid fa-xmark"></i>
                            </button>
                          )}
                        </div>
                        {voucherSearch.trim() && (
                          <button
                            type="button"
                            className="btn btn-primary btn-sm"
                            style={{ whiteSpace: 'nowrap', padding: '9px 16px', fontSize: '0.85rem', fontWeight: 700 }}
                            onClick={() => handleApply(voucherSearch.trim())}
                          >
                            <i className="fa-solid fa-bolt"></i> Apply
                          </button>
                        )}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <i className="fa-solid fa-circle-info" style={{ color: 'var(--color-primary)' }}></i>
                        <span>Search listed vouchers or enter any unlisted promo code to apply instantly.</span>
                      </div>
                    </div>

                    {/* Vouchers Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
                      {filteredCoupons.map((cp) => {
                        const applied = isApplied(cp.code);
                        return (
                          <div
                            key={cp.code}
                            style={{
                              border: applied ? '1.5px solid var(--color-success, #10b981)' : '1px dashed var(--color-primary)',
                              borderRadius: 'var(--radius-md)',
                              padding: '14px 16px',
                              background: applied ? 'var(--color-success-bg, rgba(16, 185, 129, 0.08))' : 'var(--color-surface-card)',
                              boxShadow: applied ? '0 2px 10px rgba(16, 185, 129, 0.18)' : 'none',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              gap: '12px',
                              transition: 'all 0.25s ease'
                            }}
                          >
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                                <span style={{
                                  fontWeight: 800,
                                  color: applied ? 'var(--color-success, #10b981)' : 'var(--color-primary)',
                                  fontSize: '0.95rem',
                                  letterSpacing: '0.5px'
                                }}>
                                  {cp.code}
                                </span>
                                {applied ? (
                                  <span style={{
                                    background: 'var(--color-success, #10b981)',
                                    color: '#ffffff',
                                    fontSize: '0.7rem',
                                    fontWeight: 800,
                                    padding: '2px 8px',
                                    borderRadius: '4px',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '4px'
                                  }}>
                                    <i className="fa-solid fa-check"></i> APPLIED
                                  </span>
                                ) : cp.title ? (
                                  <span style={{
                                    fontSize: '0.7rem',
                                    fontWeight: 700,
                                    color: 'var(--color-text-muted)',
                                    background: 'var(--color-bg)',
                                    padding: '1px 6px',
                                    borderRadius: '4px',
                                    border: '1px solid var(--color-border)'
                                  }}>
                                    {cp.title}
                                  </span>
                                ) : null}
                              </div>
                              <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginTop: '4px', lineHeight: 1.3 }}>
                                {cp.description || cp.desc}
                              </div>
                              {applied && cartSummary.discount > 0 && (
                                <div style={{ fontSize: '0.75rem', color: 'var(--color-success, #10b981)', fontWeight: 700, marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                  <i className="fa-solid fa-circle-check"></i>
                                  <span>Savings: -₹{cartSummary.discount}</span>
                                </div>
                              )}
                            </div>

                            {applied ? (
                              <button
                                type="button"
                                onClick={handleRemoveCoupon}
                                style={{
                                  background: 'rgba(239, 68, 68, 0.1)',
                                  color: 'var(--color-danger, #ef4444)',
                                  border: '1px solid var(--color-danger, #ef4444)',
                                  borderRadius: 'var(--radius-sm)',
                                  padding: '6px 14px',
                                  fontSize: '0.8rem',
                                  fontWeight: 700,
                                  cursor: 'pointer',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '6px',
                                  transition: 'all 0.15s ease',
                                  whiteSpace: 'nowrap'
                                }}
                                title="Remove this applied coupon"
                              >
                                <i className="fa-solid fa-xmark"></i> Remove
                              </button>
                            ) : (
                              <button
                                type="button"
                                className="btn btn-secondary btn-sm"
                                style={{ fontSize: '0.78rem', padding: '5px 14px', fontWeight: 700, whiteSpace: 'nowrap' }}
                                onClick={() => handleApply(cp.code)}
                              >
                                Apply
                              </button>
                            )}
                          </div>
                        );
                      })}

                      {/* If user searched for an unlisted coupon not in standard list */}
                      {searchTrim && !hasExactMatch && (
                        <div
                          style={{
                            gridColumn: '1 / -1',
                            border: isApplied(searchTrim) ? '1.5px solid var(--color-success, #10b981)' : '1.5px dashed var(--color-primary)',
                            borderRadius: 'var(--radius-md)',
                            padding: '14px 16px',
                            background: isApplied(searchTrim) ? 'var(--color-success-bg, rgba(16, 185, 129, 0.08))' : 'var(--color-surface-card)',
                            boxShadow: isApplied(searchTrim) ? '0 2px 10px rgba(16, 185, 129, 0.18)' : 'none',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            gap: '12px'
                          }}
                        >
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span style={{
                                fontSize: '0.7rem',
                                fontWeight: 800,
                                background: 'rgba(255, 107, 0, 0.12)',
                                color: 'var(--color-primary)',
                                padding: '2px 8px',
                                borderRadius: '4px'
                              }}>
                                UNLISTED VOUCHER
                              </span>
                              <span style={{ fontWeight: 900, fontSize: '0.95rem', color: isApplied(searchTrim) ? 'var(--color-success)' : 'var(--color-text-main)' }}>
                                {searchTrim.toUpperCase()}
                              </span>
                              {isApplied(searchTrim) && (
                                <span style={{
                                  background: 'var(--color-success)',
                                  color: '#fff',
                                  fontSize: '0.7rem',
                                  fontWeight: 800,
                                  padding: '2px 8px',
                                  borderRadius: '4px',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '4px'
                                }}>
                                  <i className="fa-solid fa-check"></i> APPLIED
                                </span>
                              )}
                            </div>
                            <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                              {isApplied(searchTrim)
                                ? `Applied to order! Saved ₹${cartSummary.discount}`
                                : `Click apply to test and redeem code "${searchTrim.toUpperCase()}"`}
                            </div>
                          </div>

                          {isApplied(searchTrim) ? (
                            <button
                              type="button"
                              onClick={handleRemoveCoupon}
                              style={{
                                background: 'rgba(239, 68, 68, 0.1)',
                                color: 'var(--color-danger)',
                                border: '1px solid var(--color-danger)',
                                borderRadius: 'var(--radius-sm)',
                                padding: '6px 14px',
                                fontSize: '0.8rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px'
                              }}
                            >
                              <i className="fa-solid fa-xmark"></i> Remove
                            </button>
                          ) : (
                            <button
                              type="button"
                              className="btn btn-primary btn-sm"
                              style={{ padding: '6px 16px', fontSize: '0.8rem', fontWeight: 700 }}
                              onClick={() => handleApply(searchTrim)}
                            >
                              <i className="fa-solid fa-bolt"></i> Apply Unlisted Code
                            </button>
                          )}
                        </div>
                      )}

                      {filteredCoupons.length === 0 && !searchTrim && (
                        <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '20px', color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
                          No vouchers available right now. Enter a promo code above to apply.
                        </div>
                      )}
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Right Column: Bill Summary Card */}
            <div>
              <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '28px', boxShadow: 'var(--shadow-sm)', position: 'sticky', top: '100px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '20px' }}>Bill Summary</h3>

                {/* Coupon Input Form */}
                <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
                  <input
                    type="text"
                    placeholder="ENTER COUPON CODE"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                    style={{ flex: 1, padding: '11px 14px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', fontSize: '0.875rem', textTransform: 'uppercase' }}
                  />
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => handleApply()}
                  >
                    Apply
                  </button>
                </div>

                {/* Applied Coupon Pill */}
                {cart.coupon && (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 14px', background: 'var(--color-success-bg, rgba(16,185,129,0.1))', border: '1px solid var(--color-success)', borderRadius: 'var(--radius-md)', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-success)', fontWeight: 700, fontSize: '0.85rem' }}>
                      <i className="fa-solid fa-circle-check"></i>
                      <span>{cart.coupon?.code || cart.coupon} Applied (-₹{cartSummary.discount})</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveCoupon}
                      style={{ background: 'none', border: 'none', color: 'var(--color-danger)', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer' }}
                    >
                      Remove
                    </button>
                  </div>
                )}

                {/* Breakdown Rows */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--color-text-muted)' }}>Item Subtotal</span>
                    <strong>₹{cartSummary.itemTotal}</strong>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--color-text-muted)' }}>Delivery Fee</span>
                    <strong>₹{cartSummary.deliveryFee}</strong>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--color-text-muted)' }}>Restaurant Packaging</span>
                    <strong>₹{cartSummary.packagingFee}</strong>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--color-text-muted)' }}>Taxes & GST (5%)</span>
                    <strong>₹{cartSummary.taxes}</strong>
                  </div>

                  {cartSummary.discount > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-success)', fontWeight: 700 }}>
                      <span>Coupon Discount</span>
                      <span>-₹{cartSummary.discount}</span>
                    </div>
                  )}

                  <div style={{ borderTop: '2px dashed var(--color-border)', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '1.1rem', fontWeight: 800 }}>To Pay</span>
                    <span style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-primary)' }}>₹{cartSummary.grandTotal}</span>
                  </div>
                </div>

                {(!currentUser || currentUser.role !== 'customer') && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(255, 90, 38, 0.08)',
                    border: '1px solid rgba(255, 90, 38, 0.25)',
                    marginBottom: '14px',
                    fontSize: '0.8rem',
                    color: 'var(--color-primary)',
                    fontWeight: 600
                  }}>
                    <i className="fa-solid fa-user-lock" style={{ fontSize: '0.95rem' }}></i>
                    <span>Customer sign-in required to order and track food.</span>
                  </div>
                )}

                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '14px', fontSize: '1.05rem', fontWeight: 700 }}
                  onClick={handleProceed}
                >
                  Proceed to Checkout <i className="fa-solid fa-arrow-right" style={{ marginLeft: '8px' }}></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
