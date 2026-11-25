import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useQuickBite } from '../../context/QuickBiteContext';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import LiveTrackingMap from '../../components/common/LiveTrackingMap.jsx';

const STATUS_STEPS = [
  { key: 'placed', label: 'Order Placed', desc: 'Order received and confirmed by restaurant' },
  { key: 'confirmed', label: 'Order Confirmed', desc: 'Kitchen accepted your order ticket' },
  { key: 'preparing', label: 'Food Preparing', desc: 'Master Chef is cooking your fresh dishes' },
  { key: 'ready', label: 'Ready for Pickup', desc: 'Insulated packaging complete & assigned to rider' },
  { key: 'out_for_delivery', label: 'Out for Delivery', desc: 'Rider is on the way to your doorstep' },
  { key: 'delivered', label: 'Delivered', desc: 'Delivered hot & fresh. Enjoy your meal!' }
];

export default function TrackingPage() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('id') || searchParams.get('orderId');

  const { orders, restaurants, showToast, showConfirmModal, db } = useQuickBite();

  // In-app Rider Chat Modal State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'rider', text: "Hello! I have picked up your order and I'm en route to your address.", time: 'Just now' }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  // In-app VoIP Calling Screen Modal State
  const [isCallOpen, setIsCallOpen] = useState(false);
  const [callStatus, setCallStatus] = useState('calling'); // 'calling' | 'connected' | 'ended'
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(true);

  // Delivery Instructions State
  const [selectedInstruction, setSelectedInstruction] = useState('door');
  const [customNote, setCustomNote] = useState('');
  const [isNoteSaved, setIsNoteSaved] = useState(false);

  // Tipping State
  const [selectedTip, setSelectedTip] = useState(null);
  const [isTipped, setIsTipped] = useState(false);

  // Live Telemetry from Map
  const [liveTelemetry, setLiveTelemetry] = useState(null);

  // Collapsible Simulator Control
  const [showSimPanel, setShowSimPanel] = useState(false);

  // Find active or selected order
  const order = useMemo(() => {
    if (orderId) {
      const found = orders.find((o) => o.id === orderId);
      if (found) return found;
    }
    return orders[0] || null;
  }, [orders, orderId]);

  const restaurant = useMemo(() => {
    if (!order) return null;
    return restaurants.find((r) => r.id === order.restaurantId) || null;
  }, [order, restaurants]);

  // Find delivery partner
  const rider = useMemo(() => {
    if (!order) return null;
    const partners = db.getDeliveryPartners ? db.getDeliveryPartners() : [];
    if (order.deliveryPartnerId) {
      const found = partners.find((p) => p.id === order.deliveryPartnerId);
      if (found) return found;
    }
    return partners[0] || {
      name: 'Vikram Singh',
      phone: '+91 98765 43210',
      vehicle: 'Bajaj Pulsar (TS 09 EZ 4082)',
      rating: 4.9,
      tripsCount: 1480,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80'
    };
  }, [order, db]);

  // Current step index
  const currentStepIndex = useMemo(() => {
    if (!order) return 0;
    const status = (order.status || 'placed').toLowerCase();
    if (status === 'cancelled') return -1;
    const idx = STATUS_STEPS.findIndex((s) => s.key === status);
    return idx >= 0 ? idx : 0;
  }, [order]);

  // Calling timer simulation
  useEffect(() => {
    let callTimer;
    if (isCallOpen) {
      setCallStatus('calling');
      setCallDuration(0);

      // Connect after 2.5 seconds
      const connectTimeout = setTimeout(() => {
        setCallStatus('connected');
      }, 2500);

      callTimer = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);

      return () => {
        clearTimeout(connectTimeout);
        clearInterval(callTimer);
      };
    }
  }, [isCallOpen]);

  const formatCallTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleSimulateNextStep = () => {
    if (!order || currentStepIndex === -1 || currentStepIndex >= STATUS_STEPS.length - 1) return;
    const nextStep = STATUS_STEPS[currentStepIndex + 1];
    db.updateOrderStatus(order.id, nextStep.key);
    showToast(`Order status updated to: ${nextStep.label}`, 'success');
  };

  const handleCancel = async () => {
    if (!order) return;
    if (currentStepIndex > 1) {
      showToast('Cannot cancel order after food preparation has begun.', 'error');
      return;
    }
    const confirmed = await showConfirmModal({
      title: 'Cancel Food Order?',
      message: 'Are you sure you want to cancel this order? Instant refund will be credited to your QuickBite Wallet.',
      confirmText: 'Yes, Cancel Order',
      cancelText: 'Keep My Order',
      type: 'danger'
    });
    if (confirmed) {
      db.updateOrderStatus(order.id, 'cancelled');
      showToast('Order was cancelled. Refund processed to your wallet.', 'info');
    }
  };

  const handleSendMessage = (textToSend) => {
    const msg = textToSend || inputMessage;
    if (!msg.trim()) return;
    setChatMessages((prev) => [
      ...prev,
      { sender: 'user', text: msg, time: 'Just now' }
    ]);
    setInputMessage('');

    // Contextual intelligent auto-reply from rider
    setTimeout(() => {
      let reply = "Got it! Thanks for letting me know. See you in a few minutes!";
      const lower = msg.toLowerCase();
      if (lower.includes('gate') || lower.includes('security')) {
        reply = "Understood, will inform security at the gate upon reaching.";
      } else if (lower.includes('door') || lower.includes('bell')) {
        reply = "Noted! I will leave it safely at your doorstep and not disturb you.";
      } else if (lower.includes('call')) {
        reply = "Sure, I will give you a call right when I arrive downstairs.";
      }

      setChatMessages((prev) => [
        ...prev,
        { sender: 'rider', text: reply, time: 'Just now' }
      ]);
    }, 1200);
  };

  const handleApplyTip = (amt) => {
    setSelectedTip(amt);
    setIsTipped(true);
    showToast(`Added ₹${amt} tip for ${rider?.name?.split(' ')[0] || 'your rider'}. Thank you!`, 'success');
  };

  const handleShareTracking = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Live tracking link copied to clipboard!', 'success');
    } else {
      showToast('Tracking link ready to share', 'info');
    }
  };

  if (!order) {
    return (
      <div className="customer-page-wrapper">
        <Navbar />
        <div className="container" style={{ minHeight: '60vh', textAlign: 'center', padding: '80px 20px' }}>
          <i className="fa-solid fa-route" style={{ fontSize: '3.5rem', color: 'var(--color-primary)', marginBottom: '16px' }}></i>
          <h2>No Active Orders to Track</h2>
          <p style={{ color: 'var(--color-text-muted)', margin: '14px 0 24px' }}>
            You don't have any placed orders currently in progress.
          </p>
          <Link to="/customer/restaurants" className="btn btn-primary">
            Browse Restaurants & Order
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const isDelivered = order.status === 'delivered';
  const isCancelled = order.status === 'cancelled';
  const isOutForDelivery = order.status === 'out_for_delivery';

  // Dynamic ETA from live telemetry or fallback estimation
  const displayEta = liveTelemetry?.etaMins
    ? `${liveTelemetry.etaMins} mins`
    : isOutForDelivery
      ? '12-16 mins'
      : isDelivered
        ? 'Delivered'
        : '22-28 mins';

  return (
    <div className="customer-page-wrapper">
      <Navbar />

      <main className="section" style={{ minHeight: '85vh', paddingTop: '20px', paddingBottom: '60px' }}>
        <div className="container" style={{ maxWidth: '1160px' }}>
          
          {/* Top Breadcrumb Bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
            <Link
              to="/customer/orders"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.875rem',
                fontWeight: 700,
                color: 'var(--color-text-muted)',
                transition: 'color var(--transition-fast)'
              }}
            >
              <i className="fa-solid fa-arrow-left"></i> Back to Orders
            </Link>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                Live GPS Active
              </span>
              <button
                type="button"
                onClick={handleShareTracking}
                className="btn btn-secondary btn-sm"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', borderRadius: '9999px' }}
              >
                <i className="fa-solid fa-share-nodes"></i> Share Live Link
              </button>
            </div>
          </div>

          {/* 1. HERO MAP: Hyper-Realistic Leaflet + Vector Live Tracking Map */}
          <LiveTrackingMap
            order={order}
            restaurant={restaurant}
            rider={rider}
            currentStepIndex={currentStepIndex}
            onTelemetryUpdate={setLiveTelemetry}
            onCallRider={() => setIsCallOpen(true)}
            onChatRider={() => setIsChatOpen(true)}
          />

          {/* 2. Customer Order Tracking Grid (Swiggy / Uber Eats Premier UI) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.42fr 1fr', gap: '24px', alignItems: 'flex-start' }} className="tracking-page-grid">
            
            {/* Left Column: Live Progress Stepper & Delivery Address */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              
              {/* Order Status & Real-time ETA Card */}
              <div
                style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-lg, 18px)',
                  padding: '26px',
                  boxShadow: 'var(--shadow-sm)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Subtle Brand Accent Bar at Top */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: isDelivered ? '#10B981' : 'var(--color-primary-gradient)' }} />

                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px', marginBottom: '16px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <span
                        style={{
                          background: isDelivered ? '#10B981' : isCancelled ? '#EF4444' : 'var(--color-primary-light, rgba(255,90,38,0.12))',
                          color: isDelivered ? '#FFFFFF' : isCancelled ? '#FFFFFF' : 'var(--color-primary)',
                          fontSize: '0.75rem',
                          fontWeight: 800,
                          padding: '4px 12px',
                          borderRadius: '9999px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}
                      >
                        {isDelivered ? 'Delivered' : isCancelled ? 'Cancelled' : isOutForDelivery ? 'Out for Delivery' : 'In Kitchen Preparation'}
                      </span>
                      {liveTelemetry && !isDelivered && (
                        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                          • {liveTelemetry.remainingKm} km away
                        </span>
                      )}
                    </div>

                    <h2 style={{ fontSize: '1.45rem', fontWeight: 800, margin: '4px 0 2px' }}>
                      {isDelivered
                        ? 'Order Delivered! Enjoy your food 🍽️'
                        : isCancelled
                          ? 'This order was cancelled'
                          : isOutForDelivery
                            ? `Rider is on the way with your order!`
                            : `Chef is preparing your meal at ${restaurant?.name || 'the kitchen'}`}
                    </h2>

                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', margin: 0 }}>
                      Order #{order.id} • {restaurant?.name || 'QuickBite Partner'} • Placed at {new Date(order.createdAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>

                  {!isDelivered && !isCancelled && (
                    <div style={{ textAlign: 'right', background: 'var(--color-surface-card)', padding: '10px 18px', borderRadius: '14px', border: '1px solid var(--color-border)' }}>
                      <div style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--color-primary)', lineHeight: 1 }}>
                        {displayEta}
                      </div>
                      <div style={{ fontSize: '0.725rem', color: 'var(--color-text-muted)', marginTop: '4px', fontWeight: 600 }}>
                        Estimated Arrival
                      </div>
                    </div>
                  )}
                </div>

                {/* Progress Bar with Glowing Head */}
                <div style={{ width: '100%', height: '8px', background: 'var(--color-border)', borderRadius: '9999px', overflow: 'hidden', margin: '20px 0 26px', position: 'relative' }}>
                  <div
                    style={{
                      width: `${isDelivered ? 100 : Math.max(12, ((currentStepIndex + 1) / STATUS_STEPS.length) * 100)}%`,
                      height: '100%',
                      background: isDelivered ? '#10B981' : 'linear-gradient(90deg, #FF5A26 0%, #FF8C5A 100%)',
                      borderRadius: '9999px',
                      transition: 'width 0.8s ease'
                    }}
                  />
                </div>

                {/* Order Stages Step Log with Timestamps */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  {STATUS_STEPS.map((step, idx) => {
                    const isCompleted = idx <= currentStepIndex;
                    const isCurrent = idx === currentStepIndex;

                    return (
                      <div key={step.key} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', position: 'relative' }}>
                        {/* Connecting Step Line */}
                        {idx < STATUS_STEPS.length - 1 && (
                          <div
                            style={{
                              position: 'absolute',
                              top: '28px',
                              left: '13px',
                              width: '2px',
                              height: 'calc(100% + 2px)',
                              background: idx < currentStepIndex ? '#10B981' : 'var(--color-border)',
                              zIndex: 1
                            }}
                          />
                        )}

                        <div
                          style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            background: isCompleted ? (isCurrent ? 'var(--color-primary)' : '#10B981') : 'var(--color-surface-card)',
                            border: isCompleted ? 'none' : '2px solid var(--color-border)',
                            color: isCompleted ? '#FFFFFF' : 'var(--color-text-subtle)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.72rem',
                            fontWeight: 800,
                            flexShrink: 0,
                            zIndex: 2,
                            boxShadow: isCurrent ? '0 0 12px rgba(255, 90, 38, 0.5)' : 'none'
                          }}
                        >
                          {isCompleted ? <i className="fa-solid fa-check"></i> : idx + 1}
                        </div>

                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ fontWeight: 700, fontSize: '0.925rem', color: isCurrent ? 'var(--color-primary)' : isCompleted ? 'var(--color-text-main)' : 'var(--color-text-muted)' }}>
                              {step.label}
                              {isCurrent && (
                                <span style={{ marginLeft: '8px', fontSize: '0.68rem', background: 'var(--color-primary-light, rgba(255,90,38,0.12))', color: 'var(--color-primary)', padding: '2px 8px', borderRadius: '8px', fontWeight: 800 }}>
                                  Active Now
                                </span>
                              )}
                            </div>
                            <span style={{ fontSize: '0.72rem', color: 'var(--color-text-subtle)' }}>
                              {isCompleted ? 'Completed' : 'Pending'}
                            </span>
                          </div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                            {step.desc}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Delivery Address & Instructions Card */}
              <div
                style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-lg, 18px)',
                  padding: '24px',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <i className="fa-solid fa-location-dot" style={{ color: 'var(--color-primary)' }}></i>
                  Delivery Address & Instructions
                </h4>

                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '4px' }}>
                  {order.deliveryAddress || 'Flat 402, Sunshine Heights, Jubilee Enclave, Banjara Hills, Hyderabad'}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
                  Recipient: <strong>{order.customerName || 'Rahul Sharma'}</strong> • {order.customerPhone || '+91 98765 43210'}
                </div>

                {/* Quick Delivery Instructions Selector */}
                <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '16px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>
                    Drop-off Instruction for Rider:
                  </span>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '14px' }}>
                    {[
                      { id: 'door', label: 'Leave at Door', icon: 'fa-door-closed' },
                      { id: 'nobell', label: 'Avoid Doorbell', icon: 'fa-bell-slash' },
                      { id: 'security', label: 'Leave with Security', icon: 'fa-shield' },
                      { id: 'call', label: 'Call on Arrival', icon: 'fa-phone' }
                    ].map((inst) => (
                      <button
                        key={inst.id}
                        type="button"
                        onClick={() => {
                          setSelectedInstruction(inst.id);
                          showToast(`Updated note: "${inst.label}" for rider`, 'success');
                        }}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '7px 14px',
                          borderRadius: '9999px',
                          border: selectedInstruction === inst.id ? '1.5px solid var(--color-primary)' : '1px solid var(--color-border)',
                          background: selectedInstruction === inst.id ? 'var(--color-primary-light, rgba(255,90,38,0.1))' : 'var(--color-surface-card)',
                          color: selectedInstruction === inst.id ? 'var(--color-primary)' : 'var(--color-text-main)',
                          fontSize: '0.775rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <i className={`fa-solid ${inst.icon}`}></i> {inst.label}
                      </button>
                    ))}
                  </div>

                  {/* Add Custom Gate / Entrance Note */}
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                      type="text"
                      value={customNote}
                      onChange={(e) => setCustomNote(e.target.value)}
                      placeholder="Add gate code or landmark note (e.g. Lift B, 4th floor)..."
                      style={{
                        flex: 1,
                        padding: '9px 14px',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--color-border)',
                        background: 'var(--color-surface-card)',
                        color: 'var(--color-text-main)',
                        fontSize: '0.825rem'
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (customNote.trim()) {
                          setIsNoteSaved(true);
                          showToast('Delivery note saved for rider!', 'success');
                        }
                      }}
                      className="btn btn-secondary btn-sm"
                      style={{ fontWeight: 700 }}
                    >
                      {isNoteSaved ? 'Saved ✓' : 'Save Note'}
                    </button>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Verified Rider Hero Card, Tipping & Receipt */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              
              {/* Delivery Partner Hero Card */}
              <div
                style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-lg, 18px)',
                  padding: '24px',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '18px' }}>
                  <div style={{ position: 'relative' }}>
                    <img
                      src={rider?.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"}
                      alt={rider?.name || "Delivery Hero"}
                      style={{ width: '62px', height: '62px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--color-primary)' }}
                    />
                    <span
                      style={{
                        position: 'absolute',
                        bottom: '-2px',
                        right: '-2px',
                        background: '#10B981',
                        color: '#FFF',
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.65rem',
                        border: '2px solid #FFF'
                      }}
                    >
                      <i className="fa-solid fa-check"></i>
                    </span>
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>{rider?.name || 'Vikram Singh'}</h4>
                      <span style={{ fontSize: '0.625rem', background: '#10B981', color: '#FFF', padding: '1px 6px', borderRadius: '4px', fontWeight: 800 }}>
                        VERIFIED RIDER
                      </span>
                    </div>

                    <div style={{ fontSize: '0.825rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                      Fleet Partner • <i className="fa-solid fa-star" style={{ color: 'var(--color-warning)' }}></i> <strong>{rider?.rating || 4.9}</strong> ({rider?.tripsCount || '1,480+'} trips)
                    </div>

                    <div style={{ fontSize: '0.775rem', color: 'var(--color-text-subtle)', marginTop: '3px' }}>
                      <i className="fa-solid fa-motorcycle" style={{ marginRight: '5px' }}></i>
                      {rider?.vehicle || 'Bajaj Pulsar (TS 09 EZ 4082)'}
                    </div>
                  </div>
                </div>

                {/* Safety & Sanitization Assurance */}
                <div
                  style={{
                    background: 'var(--color-surface-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '12px',
                    padding: '10px 14px',
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.75rem',
                    color: 'var(--color-text-muted)'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <i className="fa-solid fa-shield-virus" style={{ color: '#10B981' }}></i>
                    <span>Vaccinated & Temperature checked (98.2°F)</span>
                  </span>
                  <span style={{ color: '#0284C7', fontWeight: 700 }}>Thermal Bag 68°C</span>
                </div>

                {/* Call & Chat Action Buttons */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={() => setIsCallOpen(true)}
                    className="btn btn-secondary btn-sm"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: 700, padding: '10px' }}
                  >
                    <i className="fa-solid fa-phone" style={{ color: 'var(--color-success)' }}></i> Call Rider
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsChatOpen(true)}
                    className="btn btn-primary btn-sm"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: 700, padding: '10px' }}
                  >
                    <i className="fa-regular fa-comment-dots"></i> Chat with Rider
                  </button>
                </div>
              </div>

              {/* Rider Tipping Component (Swiggy / Uber Eats Premier Feature) */}
              <div
                style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-lg, 18px)',
                  padding: '20px',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <h4 style={{ fontSize: '0.925rem', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>☕</span> Tip {rider?.name?.split(' ')[0] || 'your delivery hero'}
                  </h4>
                  <span style={{ fontSize: '0.725rem', color: 'var(--color-text-muted)' }}>100% goes to rider</span>
                </div>

                <p style={{ fontSize: '0.785rem', color: 'var(--color-text-muted)', margin: '0 0 12px' }}>
                  Support your rider who braves weather and traffic to deliver your food hot & fresh.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                  {[
                    { amt: 20, label: '☕ ₹20' },
                    { amt: 30, label: '🥪 ₹30' },
                    { amt: 50, label: '⭐ ₹50' },
                    { amt: 100, label: '❤️ ₹100' }
                  ].map((tip) => (
                    <button
                      key={tip.amt}
                      type="button"
                      onClick={() => handleApplyTip(tip.amt)}
                      style={{
                        padding: '8px 4px',
                        borderRadius: '10px',
                        border: selectedTip === tip.amt ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                        background: selectedTip === tip.amt ? 'var(--color-primary-light, rgba(255,90,38,0.12))' : 'var(--color-surface-card)',
                        color: selectedTip === tip.amt ? 'var(--color-primary)' : 'var(--color-text-main)',
                        fontWeight: 800,
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {tip.label}
                    </button>
                  ))}
                </div>

                {isTipped && (
                  <div style={{ marginTop: '10px', fontSize: '0.75rem', color: '#10B981', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <i className="fa-solid fa-circle-check"></i> ₹{selectedTip} tip added! Vikram says thank you!
                  </div>
                )}
              </div>

              {/* Order Items & Receipt Card */}
              <div
                style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-lg, 18px)',
                  padding: '24px',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 800, margin: 0 }}>
                    Order Summary ({order.items?.length || 0} items)
                  </h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-primary)', fontWeight: 700 }}>
                    #{order.id}
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px', borderBottom: '1px solid var(--color-border)', paddingBottom: '14px' }}>
                  {(order.items || []).map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
                      <span style={{ fontWeight: 600 }}>
                        {item.name} <strong style={{ color: 'var(--color-primary)' }}>× {item.quantity}</strong>
                      </span>
                      <span style={{ fontWeight: 700 }}>₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                {/* Subtotal, Taxes, Tip & Total */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Item Total</span>
                    <span>₹{order.billSummary?.subtotal || order.total || 0}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Delivery Partner Fee</span>
                    <span>₹{order.billSummary?.deliveryFee || 30}</span>
                  </div>
                  {isTipped && selectedTip && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10B981', fontWeight: 700 }}>
                      <span>Rider Tip</span>
                      <span>+₹{selectedTip}</span>
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 800, fontSize: '1.05rem', borderTop: '1px solid var(--color-border)', paddingTop: '10px' }}>
                  <span>Total Paid ({order.paymentMethod || 'UPI'})</span>
                  <span style={{ color: 'var(--color-primary)' }}>
                    ₹{(order.billSummary?.grandTotal || order.total || 0) + (isTipped ? selectedTip : 0)}
                  </span>
                </div>
              </div>

              {/* Priority Customer Support Card */}
              <div
                style={{
                  padding: '16px 20px',
                  background: 'var(--color-surface-card)',
                  borderRadius: '14px',
                  border: '1px solid var(--color-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>Need Help with this Order?</div>
                  <div style={{ fontSize: '0.725rem', color: 'var(--color-text-muted)' }}>QuickBite 24/7 Priority Resolution</div>
                </div>
                <button
                  type="button"
                  className="btn btn-secondary btn-xs"
                  onClick={() => showToast('Opening Priority Customer Care Chat...', 'info')}
                  style={{ fontWeight: 700 }}
                >
                  Contact Support
                </button>
              </div>

            </div>

          </div>

        </div>
      </main>

      {/* =========================================================================
          IN-APP REALISTIC VOIP RIDER CALL SCREEN MODAL
          ========================================================================= */}
      {isCallOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.85)',
            backdropFilter: 'blur(8px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          <div
            style={{
              background: '#0F172A',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '24px',
              width: '100%',
              maxWidth: '380px',
              padding: '36px 24px',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.65)',
              textAlign: 'center',
              color: '#FFFFFF',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <div style={{ fontSize: '0.725rem', textTransform: 'uppercase', letterSpacing: '1px', color: '#94A3B8', marginBottom: '20px' }}>
              <i className="fa-solid fa-lock" style={{ marginRight: '6px' }}></i> Encrypted In-App VoIP Call
            </div>

            {/* Rider Avatar with Pulse Ring */}
            <div style={{ position: 'relative', width: '96px', height: '96px', margin: '0 auto 20px' }}>
              <div
                style={{
                  position: 'absolute',
                  inset: '-10px',
                  borderRadius: '50%',
                  background: 'rgba(16, 185, 129, 0.25)',
                  animation: 'pulse-radar 1.5s infinite'
                }}
              />
              <img
                src={rider?.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"}
                alt="Rider"
                style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', border: '3px solid #10B981', position: 'relative', zIndex: 2 }}
              />
            </div>

            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, margin: '0 0 4px', color: '#FFFFFF' }}>
              {rider?.name || 'Vikram Singh'}
            </h3>
            <div style={{ fontSize: '0.8rem', color: '#94A3B8', marginBottom: '14px' }}>
              QuickBite Delivery Hero • {rider?.vehicle || 'Bajaj Pulsar'}
            </div>

            {/* Call Status & Timer */}
            <div style={{ fontSize: '1.05rem', fontWeight: 700, color: callStatus === 'connected' ? '#34D399' : '#FBBF24', marginBottom: '24px' }}>
              {callStatus === 'calling' ? (
                <span>Ringing...</span>
              ) : (
                <span>Connected • {formatCallTime(callDuration)}</span>
              )}
            </div>

            {/* Simulated Live Audio Speech Transcript from Rider */}
            {callStatus === 'connected' && (
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '12px',
                  padding: '12px 14px',
                  fontSize: '0.8rem',
                  color: '#E2E8F0',
                  textAlign: 'left',
                  marginBottom: '26px',
                  lineHeight: 1.35
                }}
              >
                <div style={{ color: '#38BDF8', fontWeight: 800, fontSize: '0.72rem', marginBottom: '4px' }}>
                  <i className="fa-solid fa-volume-high"></i> Rider Audio Transcript:
                </div>
                "Hello Rahul sir! Yes, I am on Banjara Hills Main Rd, just took the turn near Taj Krishna. Should reach your apartment gate in 4-5 minutes!"
              </div>
            )}

            {/* Call Action Controls: Mute, Keypad, Speaker */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '32px' }}>
              <button
                type="button"
                onClick={() => setIsMuted(!isMuted)}
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: isMuted ? '#EF4444' : 'rgba(255, 255, 255, 0.12)',
                  border: 'none',
                  color: '#FFFFFF',
                  fontSize: '1.1rem',
                  cursor: 'pointer'
                }}
                title={isMuted ? 'Unmute microphone' : 'Mute microphone'}
              >
                <i className={isMuted ? 'fa-solid fa-microphone-slash' : 'fa-solid fa-microphone'}></i>
              </button>

              <button
                type="button"
                onClick={() => setIsSpeaker(!isSpeaker)}
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: isSpeaker ? '#0284C7' : 'rgba(255, 255, 255, 0.12)',
                  border: 'none',
                  color: '#FFFFFF',
                  fontSize: '1.1rem',
                  cursor: 'pointer'
                }}
                title={isSpeaker ? 'Speakerphone ON' : 'Speakerphone OFF'}
              >
                <i className="fa-solid fa-volume-high"></i>
              </button>
            </div>

            {/* End Call Button */}
            <button
              type="button"
              onClick={() => {
                setIsCallOpen(false);
                showToast('Call ended with delivery partner', 'info');
              }}
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: '#EF4444',
                border: 'none',
                color: '#FFFFFF',
                fontSize: '1.5rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 24px rgba(239, 68, 68, 0.5)'
              }}
              title="End Call"
            >
              <i className="fa-solid fa-phone-slash"></i>
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          IN-APP RIDER CHAT MODAL
          ========================================================================= */}
      {isChatOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.55)',
            backdropFilter: 'blur(5px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          <div
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg, 18px)',
              width: '100%',
              maxWidth: '460px',
              boxShadow: 'var(--shadow-xl)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              maxHeight: '85vh'
            }}
          >
            {/* Chat Header */}
            <div
              style={{
                padding: '14px 18px',
                borderBottom: '1px solid var(--color-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'var(--color-surface-card)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img
                  src={rider?.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"}
                  alt="Rider"
                  style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>{rider?.name || 'Vikram Singh'}</div>
                  <div style={{ fontSize: '0.72rem', color: '#10B981', fontWeight: 600 }}>
                    🟢 Active on Delivery Route • {displayEta} away
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsChatOpen(false)}
                style={{ background: 'none', border: 'none', fontSize: '1.25rem', cursor: 'pointer', color: 'var(--color-text-muted)' }}
              >
                ✕
              </button>
            </div>

            {/* Chat Message Stream */}
            <div style={{ padding: '16px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '12px', minHeight: '240px' }}>
              {chatMessages.map((msg, i) => {
                const isUser = msg.sender === 'user';
                return (
                  <div
                    key={i}
                    style={{
                      alignSelf: isUser ? 'flex-end' : 'flex-start',
                      maxWidth: '82%',
                      background: isUser ? 'var(--color-primary)' : 'var(--color-surface-card)',
                      color: isUser ? '#FFFFFF' : 'var(--color-text-main)',
                      border: isUser ? 'none' : '1px solid var(--color-border)',
                      borderRadius: isUser ? '16px 16px 2px 16px' : '16px 16px 16px 2px',
                      padding: '10px 14px',
                      fontSize: '0.85rem'
                    }}
                  >
                    <div>{msg.text}</div>
                    <div style={{ fontSize: '0.65rem', opacity: 0.75, textAlign: 'right', marginTop: '4px' }}>
                      {msg.time} {isUser && '✓✓'}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Preset Buttons */}
            <div style={{ padding: '8px 14px', borderTop: '1px solid var(--color-border)', background: 'var(--color-surface-card)', display: 'flex', gap: '6px', overflowX: 'auto' }}>
              {[
                "Please ring the bell twice",
                "Leave at doorstep",
                "Call me when downstairs",
                "Take gate number 2"
              ].map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSendMessage(preset)}
                  style={{
                    padding: '5px 10px',
                    borderRadius: '9999px',
                    border: '1px solid var(--color-border)',
                    background: 'var(--color-surface)',
                    fontSize: '0.725rem',
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    cursor: 'pointer'
                  }}
                >
                  {preset}
                </button>
              ))}
            </div>

            {/* Chat Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              style={{ padding: '12px', borderTop: '1px solid var(--color-border)', display: 'flex', gap: '8px' }}
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type message for rider..."
                style={{
                  flex: 1,
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-border)',
                  background: 'var(--color-surface)',
                  color: 'var(--color-text-main)',
                  fontSize: '0.875rem'
                }}
              />
              <button type="submit" className="btn btn-primary" style={{ padding: '10px 18px', fontWeight: 700 }}>
                <i className="fa-solid fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          UNOBTRUSIVE FLOATING DEMO CONTROLLER (For Testing All Stages)
          ========================================================================= */}
      <aside
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '8px'
        }}
      >
        {showSimPanel && (
          <div
            style={{
              background: '#0F172A',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '14px',
              padding: '14px 16px',
              boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
              color: '#FFFFFF',
              fontSize: '0.785rem',
              marginBottom: '4px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              minWidth: '240px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '6px' }}>
              <span style={{ fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-warning)' }}>
                <i className="fa-solid fa-flask"></i> Live Tracker Simulator
              </span>
              <span style={{ fontSize: '0.7rem', color: '#94A3B8' }}>Stage {currentStepIndex + 1}/{STATUS_STEPS.length}</span>
            </div>

            <button
              type="button"
              onClick={handleSimulateNextStep}
              disabled={isDelivered || isCancelled}
              style={{
                width: '100%',
                padding: '7px 12px',
                borderRadius: '8px',
                border: 'none',
                background: 'var(--color-primary)',
                color: '#FFF',
                fontWeight: 700,
                fontSize: '0.785rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
            >
              <i className="fa-solid fa-forward-step"></i> Advance Order Stage
            </button>

            <button
              type="button"
              onClick={() => setIsCallOpen(true)}
              style={{
                width: '100%',
                padding: '6px 12px',
                borderRadius: '8px',
                border: '1px solid rgba(16, 185, 129, 0.5)',
                background: 'rgba(16, 185, 129, 0.15)',
                color: '#34D399',
                fontWeight: 700,
                fontSize: '0.75rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
            >
              <i className="fa-solid fa-phone"></i> Simulate VoIP Call
            </button>

            {currentStepIndex <= 1 && (
              <button
                type="button"
                onClick={handleCancel}
                style={{
                  width: '100%',
                  padding: '5px 12px',
                  borderRadius: '6px',
                  border: '1px solid rgba(239, 68, 68, 0.4)',
                  background: 'transparent',
                  color: '#EF4444',
                  fontWeight: 600,
                  fontSize: '0.72rem',
                  cursor: 'pointer'
                }}
              >
                Simulate Order Cancel
              </button>
            )}
          </div>
        )}

        <button
          type="button"
          onClick={() => setShowSimPanel(!showSimPanel)}
          title="Toggle Live Tracking Simulator"
          style={{
            background: '#0F172A',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#E2E8F0',
            borderRadius: '9999px',
            padding: '8px 16px',
            fontSize: '0.75rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 6px 20px rgba(0,0,0,0.4)'
          }}
        >
          <i className="fa-solid fa-flask" style={{ color: 'var(--color-warning)' }}></i>
          {showSimPanel ? 'Hide Simulator' : 'Live Simulator'}
        </button>
      </aside>

      <Footer />
    </div>
  );
}
