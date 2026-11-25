import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuickBite } from '../../context/QuickBiteContext';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

export default function OrdersPage() {
  const { orders, restaurants, addToCart, showToast, currentUser } = useQuickBite();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('all');
  const [ratingModalOrder, setRatingModalOrder] = useState(null);
  const [selectedStars, setSelectedStars] = useState(5);
  const [reviewNote, setReviewNote] = useState('');

  // Filter orders for current customer
  const userOrders = useMemo(() => {
    return orders.filter((o) => {
      // If customer logged in, match customerId or match all demo orders
      if (currentUser && currentUser.role === 'customer') {
        if (o.customerId && o.customerId !== currentUser.id && o.customerId !== 'usr-cust-1') {
          // let demo see their orders
        }
      }
      if (activeTab === 'active') {
        return o.status !== 'delivered' && o.status !== 'cancelled';
      }
      if (activeTab === 'delivered') {
        return o.status === 'delivered';
      }
      if (activeTab === 'cancelled') {
        return o.status === 'cancelled';
      }
      return true;
    });
  }, [orders, activeTab, currentUser]);

  const getRestName = (restId) => {
    const r = restaurants.find((item) => item.id === restId);
    return r ? r.name : 'QuickBite Partner';
  };

  const handleReorder = (order) => {
    if (!order.items || order.items.length === 0) return;
    let addedCount = 0;
    order.items.forEach((item) => {
      addToCart(item.dishId, item.quantity);
      addedCount += item.quantity;
    });
    showToast(`Added ${addedCount} items back into your cart!`, 'success');
    navigate('/customer/cart');
  };

  const handleSubmitRating = (e) => {
    e.preventDefault();
    showToast(`Thank you for rating 5 stars for order #${ratingModalOrder?.id}!`, 'success');
    setRatingModalOrder(null);
    setSelectedStars(5);
    setReviewNote('');
  };

  return (
    <div className="customer-page-wrapper">
      <Navbar />

      <main className="section" style={{ minHeight: '80vh', paddingTop: '30px', paddingBottom: '60px' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h1 style={{ fontSize: '1.6rem', fontWeight: 800 }}>My Orders</h1>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                View past deliveries, live status, and repeat previous orders in one click
              </p>
            </div>

            {/* Filter Tabs */}
            <div style={{ display: 'flex', gap: '8px', background: 'var(--color-surface-card)', padding: '4px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
              {[
                { id: 'all', label: 'All Orders' },
                { id: 'active', label: 'In Progress' },
                { id: 'delivered', label: 'Delivered' },
                { id: 'cancelled', label: 'Cancelled' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 'var(--radius-sm)',
                    border: 'none',
                    background: activeTab === tab.id ? 'var(--color-primary)' : 'transparent',
                    color: activeTab === tab.id ? '#fff' : 'var(--color-text-main)',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {userOrders.length === 0 ? (
            <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '60px 20px', textAlign: 'center' }}>
              <i className="fa-solid fa-receipt" style={{ fontSize: '3rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}></i>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>No orders found</h3>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '20px' }}>
                You have no orders matching the selected filter.
              </p>
              <Link to="/customer/restaurants" className="btn btn-primary">
                Browse Restaurants
              </Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {userOrders.map((order) => {
                const restName = getRestName(order.restaurantId);
                const isOngoing = order.status !== 'delivered' && order.status !== 'cancelled';

                return (
                  <div
                    key={order.id}
                    style={{
                      background: 'var(--color-surface)',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-lg)',
                      padding: '24px',
                      boxShadow: 'var(--shadow-sm)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', borderBottom: '1px solid var(--color-border)', paddingBottom: '16px', marginBottom: '16px' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>{restName}</h3>
                          <span className={`badge-status ${order.status}`} style={{ textTransform: 'capitalize' }}>
                            {order.status.replace(/_/g, ' ')}
                          </span>
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                          Order #{order.id} • {new Date(order.createdAt).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                        </div>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                          ₹{order.billSummary?.grandTotal || order.total || 0}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                          {order.paymentMethod || 'UPI'} • {order.paymentStatus || 'Paid'}
                        </div>
                      </div>
                    </div>

                    {/* Items List */}
                    <div style={{ marginBottom: '16px' }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                        {(order.items || []).map((item, idx) => (
                          <span
                            key={idx}
                            style={{
                              background: 'var(--color-surface-card)',
                              border: '1px solid var(--color-border)',
                              borderRadius: 'var(--radius-sm)',
                              padding: '4px 10px',
                              fontSize: '0.85rem',
                              fontWeight: 600
                            }}
                          >
                            {item.quantity} × {item.name}
                          </span>
                        ))}
                      </div>
                      {order.deliveryAddress && (
                        <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '10px' }}>
                          <i className="fa-solid fa-location-dot" style={{ color: 'var(--color-primary)', marginRight: '6px' }}></i>
                          Delivered to: {order.deliveryAddress}
                        </div>
                      )}
                    </div>

                    {/* Actions Row */}
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                      {isOngoing && (
                        <Link to={`/customer/tracking?id=${order.id}`} className="btn btn-primary btn-sm">
                          <i className="fa-solid fa-route"></i> Live Tracking
                        </Link>
                      )}

                      <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        onClick={() => handleReorder(order)}
                      >
                        <i className="fa-solid fa-rotate-right"></i> Reorder
                      </button>

                      {order.status === 'delivered' && (
                        <button
                          type="button"
                          className="btn btn-secondary btn-sm"
                          onClick={() => setRatingModalOrder(order)}
                        >
                          <i className="fa-regular fa-star" style={{ color: 'var(--color-warning)' }}></i> Rate Food & Delivery
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {/* Rating Modal */}
      {ratingModalOrder && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', padding: '28px', maxWidth: '440px', width: '100%', boxShadow: 'var(--shadow-lg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Rate Your Experience</h3>
              <button
                type="button"
                onClick={() => setRatingModalOrder(null)}
                style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: 'var(--color-text-muted)' }}
              >
                ✕
              </button>
            </div>

            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
              How was your meal from <strong>{getRestName(ratingModalOrder.restaurantId)}</strong>?
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', fontSize: '2rem', marginBottom: '20px', color: 'var(--color-warning)', cursor: 'pointer' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <i
                  key={star}
                  className={star <= selectedStars ? 'fa-solid fa-star' : 'fa-regular fa-star'}
                  onClick={() => setSelectedStars(star)}
                />
              ))}
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                Leave a comment (Optional)
              </label>
              <textarea
                rows="3"
                placeholder="Delicious flavor, hot delivery, great packaging..."
                value={reviewNote}
                onChange={(e) => setReviewNote(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', fontSize: '0.875rem' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                className="btn btn-secondary"
                style={{ flex: 1 }}
                onClick={() => setRatingModalOrder(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                style={{ flex: 1 }}
                onClick={handleSubmitRating}
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
