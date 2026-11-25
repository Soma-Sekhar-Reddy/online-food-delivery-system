import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuickBite } from '../../context/QuickBiteContext.jsx';

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cart, updateCartQuantity, clearCart, applyCoupon, removeCoupon, cartSummary, currentUser, promptCustomerLogin } = useQuickBite();
  const [couponInput, setCouponInput] = useState('');
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    applyCoupon(couponInput.trim());
    setCouponInput('');
  };

  const handleCheckout = () => {
    if (!currentUser || currentUser.role !== 'customer') {
      promptCustomerLogin('/customer/checkout');
      return;
    }
    setIsCartOpen(false);
    navigate('/customer/checkout');
  };

  const handleGoToCart = () => {
    setIsCartOpen(false);
    navigate('/customer/cart');
  };

  return (
    <div className="cart-drawer-overlay active" style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(15, 23, 30, 0.65)',
      backdropFilter: 'blur(3px)',
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'flex-end',
      transition: 'opacity 0.25s ease'
    }} onClick={() => setIsCartOpen(false)}>
      
      <div className="cart-drawer" style={{
        width: '100%',
        maxWidth: '440px',
        height: '100%',
        background: 'var(--color-surface)',
        boxShadow: 'var(--shadow-xl)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }} onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div style={{ padding: '20px', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0 }}>Your Order Cart</h3>
            <span className="badge badge-primary" style={{ fontSize: '0.75rem' }}>{cartSummary.totalItems} items</span>
          </div>
          <button className="btn-icon" onClick={() => setIsCartOpen(false)} aria-label="Close Cart">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* Body / Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
          {cart.items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '50px 20px' }}>
              <i className="fa-solid fa-basket-shopping" style={{ fontSize: '3.5rem', color: 'var(--color-text-subtle)', marginBottom: '16px' }}></i>
              <h4 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px' }}>Your cart is empty</h4>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '24px' }}>
                Explore mouth-watering dishes from top artisanal restaurants.
              </p>
              <button className="btn btn-primary btn-sm" onClick={() => { setIsCartOpen(false); navigate('/customer/restaurants'); }}>
                Browse Restaurants
              </button>
            </div>
          ) : (
            <div>
              {cart.items.map((item) => (
                <div key={item.dishId} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 0', borderBottom: '1px solid var(--color-border-subtle)' }}>
                  <img
                    src={item.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=150&q=80'}
                    alt={item.name}
                    style={{ width: '56px', height: '56px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <i className="fa-solid fa-circle" style={{ color: item.isVeg ? '#10B981' : '#EF4444', fontSize: '0.55rem' }}></i>
                      <strong style={{ fontSize: '0.9rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</strong>
                    </div>
                    <div style={{ color: 'var(--color-primary)', fontWeight: 700, fontSize: '0.9rem', marginTop: '2px' }}>
                      ₹{item.price * item.quantity}
                    </div>
                  </div>

                  {/* Quantity Stepper */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--color-bg)', padding: '4px 8px', borderRadius: 'var(--radius-full)', border: '1px solid var(--color-border)' }}>
                    <button
                      onClick={() => updateCartQuantity(item.dishId, item.quantity - 1)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8rem', color: 'var(--color-primary)' }}
                      aria-label="Decrease quantity"
                    >
                      <i className="fa-solid fa-minus"></i>
                    </button>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, minWidth: '16px', textAlign: 'center' }}>{item.quantity}</span>
                    <button
                      onClick={() => updateCartQuantity(item.dishId, item.quantity + 1)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8rem', color: 'var(--color-primary)' }}
                      aria-label="Increase quantity"
                    >
                      <i className="fa-solid fa-plus"></i>
                    </button>
                  </div>
                </div>
              ))}

              {/* Coupon Bar */}
              <div style={{
                marginTop: '20px',
                padding: '14px',
                background: cart.coupon ? 'var(--color-success-bg, rgba(16, 185, 129, 0.08))' : 'var(--color-bg)',
                borderRadius: 'var(--radius-sm)',
                border: cart.coupon ? '1.5px solid var(--color-success, #10b981)' : '1px solid var(--color-border)',
                transition: 'all 0.2s ease'
              }}>
                {cart.coupon ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <i className="fa-solid fa-circle-check" style={{ color: 'var(--color-success)', fontSize: '1rem' }}></i>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <strong style={{ fontSize: '0.9rem', color: 'var(--color-success)' }}>
                            {cart.coupon?.code || cart.coupon}
                          </strong>
                          <span style={{ fontSize: '0.65rem', background: 'var(--color-success)', color: '#fff', padding: '1px 6px', borderRadius: '4px', fontWeight: 800 }}>
                            APPLIED
                          </span>
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                          Saved -₹{cartSummary.discount} on this order
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={removeCoupon}
                      style={{
                        color: 'var(--color-danger)',
                        fontSize: '0.8rem',
                        background: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid var(--color-danger)',
                        borderRadius: 'var(--radius-sm)',
                        padding: '4px 10px',
                        cursor: 'pointer',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <i className="fa-solid fa-xmark"></i> Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '8px' }}>
                    <input
                      type="text"
                      placeholder="Coupon / unlisted code (e.g. WELCOME20)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      style={{ flex: 1, padding: '8px 12px', fontSize: '0.85rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', background: 'var(--color-surface)', color: 'var(--color-text-main)' }}
                    />
                    <button type="submit" className="btn btn-primary btn-sm" style={{ padding: '8px 14px' }}>
                      Apply
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer / Summary */}
        {cart.items.length > 0 && (
          <div style={{ padding: '20px', borderTop: '1px solid var(--color-border)', background: 'var(--color-surface)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Item Subtotal</span>
              <span>₹{cartSummary.subtotal}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Delivery Partner Fee</span>
              <span>{cartSummary.deliveryFee === 0 ? <strong style={{ color: 'var(--color-success)' }}>FREE</strong> : `₹${cartSummary.deliveryFee}`}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Taxes & GST (5%)</span>
              <span>₹{cartSummary.taxes}</span>
            </div>
            {cartSummary.discount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px', color: 'var(--color-success)' }}>
                <span>Coupon Discount</span>
                <span>-₹{cartSummary.discount}</span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.15rem', fontWeight: 800, marginTop: '10px', paddingTop: '10px', borderTop: '1px solid var(--color-border)' }}>
              <span>To Pay</span>
              <span style={{ color: 'var(--color-primary)' }}>₹{cartSummary.total}</span>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
              <button
                type="button"
                className="btn btn-secondary"
                style={{ flex: 1, padding: '12px 10px', fontSize: '0.9rem', fontWeight: 700 }}
                onClick={handleGoToCart}
              >
                <i className="fa-solid fa-cart-shopping" style={{ marginRight: '6px' }}></i> Full Cart
              </button>
              <button
                type="button"
                className="btn btn-primary"
                style={{ flex: 1.4, padding: '12px 14px', fontSize: '0.925rem', fontWeight: 800 }}
                onClick={handleCheckout}
              >
                Checkout <i className="fa-solid fa-arrow-right" style={{ marginLeft: '6px' }}></i>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
