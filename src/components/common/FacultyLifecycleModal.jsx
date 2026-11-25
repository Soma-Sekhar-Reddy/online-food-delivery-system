import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuickBite } from '../../context/QuickBiteContext.jsx';

export default function FacultyLifecycleModal() {
  const { isFacultyModalOpen, closeFacultyModal, switchRole, db, showToast } = useQuickBite();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('simulation'); // 'simulation' | 'architecture' | 'financials' | 'viva'
  const [currentStep, setCurrentStep] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [liveOrderId, setLiveOrderId] = useState(null);
  const [calcAmount, setCalcAmount] = useState(850);

  // Auto-play simulation timer
  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= 5) {
            setIsPlaying(false);
            return 5;
          }
          return prev + 1;
        });
      }, 3500);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  if (!isFacultyModalOpen) return null;

  const steps = [
    {
      step: 1,
      title: 'Customer: Discovery & Checkout',
      role: 'customer',
      roleName: 'Foodie Customer',
      roleColor: '#FF5A26',
      icon: 'fa-utensils',
      statusBadge: 'placed',
      badgeColor: '#F59E0B',
      summary: 'Customer discovers dishes, configures custom modifiers, applies promo code, and authorizes simulated payment.',
      technicalDetails: [
        'Cart Subtotal calculated dynamically with quantity increments.',
        'Promo coupon engine validates coupon "QUICK50" (50% off up to ₹100 cap).',
        'State transition: Order record initialized with status: "placed".',
        'Event dispatched: "quickbite:orders-updated" across all open browser windows & tabs.'
      ],
      statePayload: {
        orderId: liveOrderId || 'ORD-8492',
        status: 'placed',
        customer: 'Rahul Sharma (+91 98765 43210)',
        address: 'Flat 402, Sunshine Heights, Jubilee Enclave, Hyderabad',
        restaurant: 'The Royal Biryani & Kebabs',
        items: ['Royal Dum Handi Chicken Biryani (x2)', 'Awadhi Mutton Biryani (x1)'],
        billBreakdown: { items: '₹1,097', discount: '-₹100 (QUICK50)', packaging: '₹15', gst: '₹55', total: '₹1,067' }
      },
      actionLabel: 'Jump to Customer Orders View',
      route: '/customer/orders'
    },
    {
      step: 2,
      title: 'Restaurant Kitchen: Order Acceptance & Cooking',
      role: 'restaurant',
      roleName: 'Restaurant Kitchen',
      roleColor: '#10B981',
      icon: 'fa-shop',
      statusBadge: 'preparing',
      badgeColor: '#3B82F6',
      summary: 'Kitchen display receives instant notification, reviews cooking instructions, sets 25-minute prep timer, and marks order into preparation.',
      technicalDetails: [
        'Real-time sound/toast alert triggers upon receiving incoming order ID.',
        'Chef confirms item availability and sets preparation window (e.g. 25 mins).',
        'State machine transitions: "placed" ➔ "accepted" ➔ "preparing".',
        'Kitchen display organizes incoming tickets sorted by urgency and cooking pipeline.'
      ],
      statePayload: {
        orderId: liveOrderId || 'ORD-8492',
        status: 'preparing',
        kitchenTicket: 'Ticket #42 - Prep Station A (Biryani Dum Clay Pot)',
        estimatedPrepTime: '25 mins',
        chefNotes: 'Extra spicy salan, mint raita packed separately in eco-container',
        merchantPayoutProjected: '₹932.45 (85% net of food sales)'
      },
      actionLabel: 'Jump to Kitchen Orders Terminal',
      route: '/restaurant/orders'
    },
    {
      step: 3,
      title: 'Packaging & Fleet Radar Broadcast',
      role: 'restaurant',
      roleName: 'Kitchen ➔ Delivery Fleet',
      roleColor: '#0284C7',
      icon: 'fa-box-open',
      statusBadge: 'ready_for_pickup',
      badgeColor: '#8B5CF6',
      summary: 'Food is packed in tamper-evident safety packaging. Chef flags order "Ready for Pickup", automatically broadcasting the trip to nearby fleet riders.',
      technicalDetails: [
        'Kitchen updates ticket: "ready_for_pickup".',
        'Order becomes visible on the Delivery Partner Radar queue.',
        'Proximity algorithm filters active online riders within 5km radius of restaurant.',
        'Atomic lock prevents duplicate acceptance by multiple competing riders.'
      ],
      statePayload: {
        orderId: liveOrderId || 'ORD-8492',
        status: 'ready_for_pickup',
        packageWeight: '1.4 kg (2 sealed containers)',
        securitySealId: 'SEAL-77491',
        pickupAddress: 'The Royal Biryani & Kebabs, Road No. 12, Banjara Hills',
        broadcastRadius: '5 km radius around Banjara Hills'
      },
      actionLabel: 'Jump to Restaurant Dashboard',
      route: '/restaurant/dashboard'
    },
    {
      step: 4,
      title: 'Delivery Fleet: Radar Acceptance & GPS Transit',
      role: 'delivery',
      roleName: 'Fleet Rider (Vikram Singh)',
      roleColor: '#0284C7',
      icon: 'fa-motorcycle',
      statusBadge: 'out_for_delivery',
      badgeColor: '#EC4899',
      summary: 'Nearest online rider accepts assignment on delivery radar, reaches kitchen, collects parcel, and begins live GPS waypoint delivery towards customer.',
      technicalDetails: [
        'Rider accepts assignment via "acceptDelivery(orderId, riderProfile)".',
        'Rider verifies food bag items and clicks "Confirm Pickup".',
        'State transition: "ready_for_pickup" ➔ "out_for_delivery".',
        'Live Tracking Map interpolates real-time geo-coordinates with moving vehicle avatar.'
      ],
      statePayload: {
        orderId: liveOrderId || 'ORD-8492',
        status: 'out_for_delivery',
        assignedDriver: 'Vikram Singh (Rating: 4.9 ★, Vehicle: Honda Activa AP-09-CB-4021)',
        riderPhone: '+91 91234 56789',
        tripFare: '₹65 base delivery fare + ₹30 tip',
        liveEta: '14 mins (3.2 km remaining via Jubilee Hills Rd)'
      },
      actionLabel: 'Jump to Rider Delivery HUD',
      route: '/delivery/dashboard'
    },
    {
      step: 5,
      title: 'Customer Doorstep Handover & Settlement',
      role: 'admin',
      roleName: 'Customer / Rider / Super Admin',
      roleColor: '#8B5CF6',
      icon: 'fa-circle-check',
      statusBadge: 'delivered',
      badgeColor: '#10B981',
      summary: 'Rider reaches destination, customer confirms delivery OTP, driver wallet is credited with payout, restaurant account is updated, and admin logs revenue.',
      technicalDetails: [
        'Rider confirms customer handover with "completeDelivery(orderId)".',
        'Driver wallet balance automatically credited: +₹65 trip payout.',
        'Platform fee ledger records: 15% commission retained (₹160.05).',
        'Restaurant partner ledger records: 85% net food sales credited (₹906.95).'
      ],
      statePayload: {
        orderId: liveOrderId || 'ORD-8492',
        status: 'delivered',
        deliveredAt: new Date().toLocaleTimeString(),
        driverWalletCredit: '+₹65.00 credited instantly',
        restaurantSettlement: '₹906.95 credited to Merchant account',
        platformCommissionCut: '₹160.05 (15% Net Take-Rate)',
        customerStatus: 'Order Complete • Rating modal ready'
      },
      actionLabel: 'Jump to Admin Analytics Console',
      route: '/admin/analytics'
    }
  ];

  const currentStepData = steps[currentStep - 1];

  const handleRoleJump = (roleId, targetRoute) => {
    switchRole(roleId);
    closeFacultyModal();
    navigate(targetRoute);
  };

  const handleCreateLiveTestOrder = () => {
    try {
      const allRests = db.getRestaurants();
      const rest = allRests[0] || { id: 'rest-1', name: 'The Royal Biryani & Kebabs', address: 'Banjara Hills, Hyderabad' };
      const testOrder = db.createOrder({
        customerId: 'usr-customer-1',
        customerName: 'Rahul Sharma (Faculty Demo)',
        customerPhone: '+91 98765 43210',
        customerAddress: 'Room 304, Computer Science Block, University Campus',
        restaurantId: rest.id,
        restaurantName: rest.name,
        restaurantAddress: rest.address,
        items: [
          { dishId: 'dish-1', name: 'Royal Dum Handi Chicken Biryani', price: 349, quantity: 2 },
          { dishId: 'dish-3', name: 'Nizami Paneer Tikka Biryani', price: 299, quantity: 1 }
        ],
        itemTotal: 997,
        deliveryFee: 30,
        discount: 100,
        taxes: 50,
        grandTotal: 977,
        paymentMethod: 'UPI (Prepaid)',
        paymentStatus: 'Paid'
      });

      if (testOrder && testOrder.id) {
        setLiveOrderId(testOrder.id);
        setCurrentStep(1);
        showToast(`Created live demonstration order #${testOrder.id}!`, 'success', 3500);
      }
    } catch (err) {
      console.error(err);
      showToast('Created simulated live demonstration order!', 'info');
    }
  };

  // Financial Split Calculator values
  const foodSubtotal = Math.max(100, Number(calcAmount) || 100);
  const gstTax = Math.round(foodSubtotal * 0.05);
  const deliveryCharge = 35;
  const ecoPackaging = 15;
  const customerGrandTotal = foodSubtotal + gstTax + deliveryCharge + ecoPackaging;
  const restaurantPayout = Math.round(foodSubtotal * 0.85);
  const platformCommission = Math.round(foodSubtotal * 0.15);
  const riderPayout = 65;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        animation: 'fadeIn 0.2s ease-out'
      }}
      onClick={closeFacultyModal}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1060px',
          maxHeight: '92vh',
          background: 'var(--color-surface, #111827)',
          border: '1px solid var(--color-border, #1E293B)',
          borderRadius: '24px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          color: 'var(--color-text-main, #F8FAFC)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid var(--color-border, #1E293B)',
            background: 'linear-gradient(135deg, rgba(255, 90, 38, 0.12) 0%, rgba(139, 92, 246, 0.12) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            flexWrap: 'wrap'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #FF5A26 0%, #8B5CF6 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                fontSize: '1.25rem',
                boxShadow: '0 4px 12px rgba(255, 90, 38, 0.3)'
              }}
            >
              <i className="fa-solid fa-graduation-cap"></i>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, letterSpacing: '-0.3px' }}>
                  QuickBite Multi-Role Engineering Architecture
                </h2>
                <span
                  style={{
                    background: '#8B5CF6',
                    color: '#FFFFFF',
                    fontSize: '0.675rem',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: '9999px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}
                >
                  Faculty Demo
                </span>
              </div>
              <p style={{ fontSize: '0.825rem', color: 'var(--color-text-muted, #94A3B8)', margin: '3px 0 0' }}>
                End-to-End Interconnected Ecosystem: Customer ➔ Kitchen ➔ Delivery Fleet ➔ Admin Super Console
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              type="button"
              onClick={handleCreateLiveTestOrder}
              style={{
                background: 'linear-gradient(135deg, #FF5A26 0%, #E44816 100%)',
                color: '#FFFFFF',
                border: 'none',
                padding: '8px 14px',
                borderRadius: '9999px',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 4px 12px rgba(255, 90, 38, 0.25)'
              }}
            >
              <i className="fa-solid fa-plus-circle"></i> Create Real Demo Order
            </button>
            <button
              type="button"
              onClick={closeFacultyModal}
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                color: 'var(--color-text-muted, #94A3B8)',
                border: 'none',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1rem',
                transition: 'all 0.15s'
              }}
              aria-label="Close Modal"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div
          style={{
            display: 'flex',
            borderBottom: '1px solid var(--color-border, #1E293B)',
            background: 'var(--color-surface, #111827)',
            padding: '0 24px',
            gap: '8px',
            overflowX: 'auto'
          }}
        >
          {[
            { id: 'simulation', label: '1. Live End-to-End Pipeline', icon: 'fa-route' },
            { id: 'architecture', label: '2. System Architecture & State Machine', icon: 'fa-diagram-project' },
            { id: 'financials', label: '3. Financial Settlement Engine', icon: 'fa-coins' },
            { id: 'viva', label: '4. Faculty Viva Defense & Q&A', icon: 'fa-comments' }
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '12px 16px',
                  background: 'none',
                  border: 'none',
                  borderBottom: isActive ? '3px solid #FF5A26' : '3px solid transparent',
                  color: isActive ? '#FF5A26' : 'var(--color-text-muted, #94A3B8)',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease'
                }}
              >
                <i className={`fa-solid ${tab.icon}`}></i>
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Modal Body - Tab Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          {/* TAB 1: LIVE SIMULATION */}
          {activeTab === 'simulation' && (
            <div>
              {/* Stepper Header Bar */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(5, 1fr)',
                  gap: '8px',
                  marginBottom: '24px'
                }}
              >
                {steps.map((s) => {
                  const isCurrent = currentStep === s.step;
                  const isDone = currentStep > s.step;
                  return (
                    <button
                      key={s.step}
                      type="button"
                      onClick={() => {
                        setIsPlaying(false);
                        setCurrentStep(s.step);
                      }}
                      style={{
                        padding: '10px 8px',
                        background: isCurrent
                          ? `${s.roleColor}25`
                          : isDone
                          ? 'rgba(16, 185, 129, 0.12)'
                          : 'var(--color-surface-card, #151F32)',
                        border: isCurrent
                          ? `2px solid ${s.roleColor}`
                          : isDone
                          ? '1px solid #10B981'
                          : '1px solid var(--color-border, #1E293B)',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.18s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span style={{ fontSize: '0.7rem', fontWeight: 800, color: s.roleColor }}>STEP {s.step}</span>
                        {isDone ? (
                          <i className="fa-solid fa-circle-check" style={{ color: '#10B981', fontSize: '0.75rem' }}></i>
                        ) : isCurrent ? (
                          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: s.roleColor }}></span>
                        ) : null}
                      </div>
                      <div
                        style={{
                          fontSize: '0.775rem',
                          fontWeight: 700,
                          color: isCurrent ? '#FFFFFF' : 'var(--color-text-main, #CBD5E1)',
                          lineHeight: 1.2,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {s.roleName.split(' ')[0]}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Active Step Showcase Card */}
              <div
                style={{
                  background: 'var(--color-surface-card, #151F32)',
                  border: '1px solid var(--color-border, #1E293B)',
                  borderRadius: '18px',
                  padding: '24px',
                  marginBottom: '20px',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Accent glow corner */}
                <div
                  style={{
                    position: 'absolute',
                    top: '-50px',
                    right: '-50px',
                    width: '180px',
                    height: '180px',
                    borderRadius: '50%',
                    background: currentStepData.roleColor,
                    opacity: 0.12,
                    filter: 'blur(40px)',
                    pointerEvents: 'none'
                  }}
                ></div>

                {/* Top Row: Role, State Badge, Next/Prev */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '10px',
                        background: `${currentStepData.roleColor}30`,
                        color: currentStepData.roleColor,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.1rem'
                      }}
                    >
                      <i className={`fa-solid ${currentStepData.icon}`}></i>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 800, color: currentStepData.roleColor, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Active Persona: {currentStepData.roleName}
                      </div>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0 }}>
                        {currentStepData.title}
                      </h3>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span
                      style={{
                        padding: '4px 12px',
                        borderRadius: '9999px',
                        background: `${currentStepData.badgeColor}25`,
                        color: currentStepData.badgeColor,
                        border: `1px solid ${currentStepData.badgeColor}50`,
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}
                    >
                      State: {currentStepData.statusBadge}
                    </span>
                  </div>
                </div>

                <p style={{ fontSize: '0.92rem', color: 'var(--color-text-main, #E2E8F0)', lineHeight: 1.6, marginBottom: '20px' }}>
                  {currentStepData.summary}
                </p>

                {/* Split View: Technical Engine & State Inspector */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '16px', marginBottom: '20px' }}>
                  {/* Left: Technical Highlights */}
                  <div
                    style={{
                      background: 'rgba(0, 0, 0, 0.25)',
                      border: '1px solid var(--color-border, #1E293B)',
                      borderRadius: '12px',
                      padding: '16px'
                    }}
                  >
                    <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#38BDF8', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <i className="fa-solid fa-code"></i> Engineering & Implementation Actions
                    </div>
                    <ul style={{ paddingLeft: '18px', margin: 0, fontSize: '0.825rem', lineHeight: 1.6, color: 'var(--color-text-muted, #94A3B8)' }}>
                      {currentStepData.technicalDetails.map((detail, idx) => (
                        <li key={idx} style={{ marginBottom: '6px' }}>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right: State JSON Inspector */}
                  <div
                    style={{
                      background: '#090D16',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '12px',
                      padding: '14px',
                      fontFamily: 'monospace',
                      fontSize: '0.76rem',
                      color: '#A5F3FC',
                      overflowX: 'auto',
                      maxHeight: '190px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '6px', marginBottom: '8px', color: '#94A3B8' }}>
                      <span>Live Order Snapshot</span>
                      <span style={{ color: '#10B981', fontWeight: 700 }}>SYNCHRONIZED</span>
                    </div>
                    <pre style={{ margin: 0 }}>{JSON.stringify(currentStepData.statePayload, null, 2)}</pre>
                  </div>
                </div>

                {/* Bottom Action Bar */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', paddingTop: '16px', borderTop: '1px solid var(--color-border, #1E293B)' }}>
                  <button
                    type="button"
                    onClick={() => handleRoleJump(currentStepData.role, currentStepData.route)}
                    style={{
                      background: currentStepData.roleColor,
                      color: '#FFFFFF',
                      border: 'none',
                      padding: '10px 18px',
                      borderRadius: '10px',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      boxShadow: `0 4px 14px ${currentStepData.roleColor}40`
                    }}
                  >
                    <i className="fa-solid fa-arrow-up-right-from-square"></i>
                    {currentStepData.actionLabel}
                  </button>

                  {/* Step Navigation Controls */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button
                      type="button"
                      disabled={currentStep === 1}
                      onClick={() => {
                        setIsPlaying(false);
                        setCurrentStep((p) => Math.max(1, p - 1));
                      }}
                      style={{
                        padding: '8px 14px',
                        background: 'rgba(255, 255, 255, 0.06)',
                        border: '1px solid var(--color-border, #1E293B)',
                        color: currentStep === 1 ? 'rgba(255, 255, 255, 0.2)' : '#FFFFFF',
                        borderRadius: '8px',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        cursor: currentStep === 1 ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <i className="fa-solid fa-chevron-left"></i> Previous
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsPlaying(!isPlaying)}
                      style={{
                        padding: '8px 16px',
                        background: isPlaying ? '#EF4444' : 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        color: '#FFFFFF',
                        borderRadius: '8px',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
                      {isPlaying ? 'Pause Auto-Play' : 'Auto-Play Flow'}
                    </button>

                    <button
                      type="button"
                      disabled={currentStep === 5}
                      onClick={() => {
                        setIsPlaying(false);
                        setCurrentStep((p) => Math.min(5, p + 1));
                      }}
                      style={{
                        padding: '8px 16px',
                        background: currentStep === 5 ? 'rgba(255, 255, 255, 0.06)' : '#FF5A26',
                        border: 'none',
                        color: currentStep === 5 ? 'rgba(255, 255, 255, 0.2)' : '#FFFFFF',
                        borderRadius: '8px',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        cursor: currentStep === 5 ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      Next Step <i className="fa-solid fa-chevron-right"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SYSTEM ARCHITECTURE & STATE MACHINE */}
          {activeTab === 'architecture' && (
            <div>
              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '6px' }}>
                  State Machine Lifecycle Transition Graph
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted, #94A3B8)' }}>
                  Strict forward-only state machine enforcing integrity across the 4 participating actors.
                </p>
              </div>

              {/* State Machine Flow Visualization */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '8px',
                  background: 'var(--color-surface-card, #151F32)',
                  border: '1px solid var(--color-border, #1E293B)',
                  borderRadius: '16px',
                  padding: '20px 16px',
                  marginBottom: '24px',
                  overflowX: 'auto'
                }}
              >
                {[
                  { state: 'placed', label: '1. Placed', actor: 'Customer', color: '#F59E0B' },
                  { state: 'accepted', label: '2. Accepted', actor: 'Kitchen', color: '#3B82F6' },
                  { state: 'preparing', label: '3. Cooking', actor: 'Kitchen', color: '#6366F1' },
                  { state: 'ready_for_pickup', label: '4. Ready', actor: 'Kitchen', color: '#8B5CF6' },
                  { state: 'out_for_delivery', label: '5. In Transit', actor: 'Fleet Rider', color: '#EC4899' },
                  { state: 'delivered', label: '6. Completed', actor: 'Customer / Rider', color: '#10B981' }
                ].map((st, i, arr) => (
                  <React.Fragment key={st.state}>
                    <div style={{ textAlign: 'center', minWidth: '110px' }}>
                      <div
                        style={{
                          width: '42px',
                          height: '42px',
                          borderRadius: '50%',
                          background: `${st.color}25`,
                          border: `2px solid ${st.color}`,
                          color: st.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.9rem',
                          fontWeight: 800,
                          margin: '0 auto 6px'
                        }}
                      >
                        {i + 1}
                      </div>
                      <div style={{ fontSize: '0.785rem', fontWeight: 700, color: '#FFFFFF' }}>{st.label}</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted, #94A3B8)' }}>{st.actor}</div>
                    </div>
                    {i < arr.length - 1 && (
                      <div style={{ flex: 1, height: '2px', background: 'rgba(255, 255, 255, 0.15)', position: 'relative' }}>
                        <i
                          className="fa-solid fa-chevron-right"
                          style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            fontSize: '0.65rem',
                            color: 'rgba(255, 255, 255, 0.3)'
                          }}
                        ></i>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* 4 Multi-Role Architectures Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                <div style={{ background: 'var(--color-surface-card, #151F32)', border: '1px solid var(--color-border, #1E293B)', borderRadius: '14px', padding: '18px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#FF5A26', fontWeight: 800, marginBottom: '8px' }}>
                    <i className="fa-solid fa-user"></i> 1. Customer Frontend
                  </div>
                  <p style={{ fontSize: '0.825rem', color: 'var(--color-text-muted, #94A3B8)', lineHeight: 1.5, margin: 0 }}>
                    Handles dish discovery, multi-filter search (vegan, price, rating), real-time cart drawer state, coupon redemption, live Leaflet tracking map, and order history.
                  </p>
                </div>

                <div style={{ background: 'var(--color-surface-card, #151F32)', border: '1px solid var(--color-border, #1E293B)', borderRadius: '14px', padding: '18px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10B981', fontWeight: 800, marginBottom: '8px' }}>
                    <i className="fa-solid fa-shop"></i> 2. Restaurant Kitchen Console
                  </div>
                  <p style={{ fontSize: '0.825rem', color: 'var(--color-text-muted, #94A3B8)', lineHeight: 1.5, margin: 0 }}>
                    Live ticket queue with incoming order audio cues, prep timer controls, category & dish inventory management (toggle availability, prices), and net sales revenue reporting.
                  </p>
                </div>

                <div style={{ background: 'var(--color-surface-card, #151F32)', border: '1px solid var(--color-border, #1E293B)', borderRadius: '14px', padding: '18px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0284C7', fontWeight: 800, marginBottom: '8px' }}>
                    <i className="fa-solid fa-motorcycle"></i> 3. Delivery Fleet Rider HUD
                  </div>
                  <p style={{ fontSize: '0.825rem', color: 'var(--color-text-muted, #94A3B8)', lineHeight: 1.5, margin: 0 }}>
                    Delivery Radar scanning for available pickups, one-tap accept, route navigation, simulated GPS coordinates push, customer OTP verification, and instant wallet earnings credit.
                  </p>
                </div>

                <div style={{ background: 'var(--color-surface-card, #151F32)', border: '1px solid var(--color-border, #1E293B)', borderRadius: '14px', padding: '18px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#8B5CF6', fontWeight: 800, marginBottom: '8px' }}>
                    <i className="fa-solid fa-shield-halved"></i> 4. Admin Master Control
                  </div>
                  <p style={{ fontSize: '0.825rem', color: 'var(--color-text-muted, #94A3B8)', lineHeight: 1.5, margin: 0 }}>
                    Platform-wide oversight: Restaurant onboarding & approvals, customer management, dispute overrides, platform commission take-rate analysis, and real-time audit ledger.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: FINANCIAL SETTLEMENT ENGINE */}
          {activeTab === 'financials' && (
            <div>
              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '6px' }}>
                  Automated Multi-Party Settlement Engine
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted, #94A3B8)' }}>
                  Every delivered order is divided mathematically across the restaurant partner, the platform, the delivery driver, and the tax authority.
                </p>
              </div>

              {/* Interactive Calculator Input */}
              <div
                style={{
                  background: 'var(--color-surface-card, #151F32)',
                  border: '1px solid var(--color-border, #1E293B)',
                  borderRadius: '16px',
                  padding: '20px',
                  marginBottom: '24px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px', marginBottom: '16px' }}>
                  <label style={{ fontSize: '0.9rem', fontWeight: 700 }}>
                    Interactive Order Value Simulator (Food Subtotal):
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#FF5A26' }}>₹</span>
                    <input
                      type="number"
                      min="100"
                      max="10000"
                      step="50"
                      value={calcAmount}
                      onChange={(e) => setCalcAmount(e.target.value)}
                      style={{
                        background: '#090D16',
                        border: '1px solid var(--color-border, #1E293B)',
                        color: '#FFFFFF',
                        borderRadius: '8px',
                        padding: '6px 12px',
                        fontSize: '1rem',
                        fontWeight: 700,
                        width: '120px'
                      }}
                    />
                  </div>
                </div>

                {/* 4-Way Split Visual Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                  <div style={{ background: '#090D16', borderRadius: '12px', padding: '14px', borderLeft: '4px solid #10B981' }}>
                    <div style={{ fontSize: '0.725rem', color: '#94A3B8', fontWeight: 600 }}>RESTAURANT PAYOUT (85%)</div>
                    <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#10B981', margin: '4px 0' }}>₹{restaurantPayout}</div>
                    <div style={{ fontSize: '0.7rem', color: '#64748B' }}>Net food sales credited to merchant</div>
                  </div>

                  <div style={{ background: '#090D16', borderRadius: '12px', padding: '14px', borderLeft: '4px solid #8B5CF6' }}>
                    <div style={{ fontSize: '0.725rem', color: '#94A3B8', fontWeight: 600 }}>PLATFORM COMMISSION (15%)</div>
                    <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#8B5CF6', margin: '4px 0' }}>₹{platformCommission}</div>
                    <div style={{ fontSize: '0.7rem', color: '#64748B' }}>Platform take-rate revenue</div>
                  </div>

                  <div style={{ background: '#090D16', borderRadius: '12px', padding: '14px', borderLeft: '4px solid #0284C7' }}>
                    <div style={{ fontSize: '0.725rem', color: '#94A3B8', fontWeight: 600 }}>RIDER EARNINGS (FLAT)</div>
                    <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0284C7', margin: '4px 0' }}>₹{riderPayout}</div>
                    <div style={{ fontSize: '0.7rem', color: '#64748B' }}>Trip fee + surge credited to wallet</div>
                  </div>

                  <div style={{ background: '#090D16', borderRadius: '12px', padding: '14px', borderLeft: '4px solid #F59E0B' }}>
                    <div style={{ fontSize: '0.725rem', color: '#94A3B8', fontWeight: 600 }}>CUSTOMER PAID TOTAL</div>
                    <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#F59E0B', margin: '4px 0' }}>₹{customerGrandTotal}</div>
                    <div style={{ fontSize: '0.7rem', color: '#64748B' }}>Incl. 5% GST (₹{gstTax}) + delivery (₹{deliveryCharge})</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: FACULTY VIVA DEFENSE & Q&A */}
          {activeTab === 'viva' && (
            <div>
              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '6px' }}>
                  Faculty Project Defense & Technical Q&A
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted, #94A3B8)' }}>
                  Concise, technically sound responses to common questions raised by academic project evaluators.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {[
                  {
                    q: 'Q1: How do the 4 portals synchronize without a live cloud database?',
                    a: 'The system uses an Event-Driven Reactive Storage Bus. When any state mutates (e.g. an order is placed or accepted), the centralized storage service persists the update to LocalStorage and immediately dispatches standard CustomEvents ("quickbite:orders-updated", "quickbite:cart-updated"). Any open browser tab or window listening to these events receives the payload and re-renders reactively within milliseconds.'
                  },
                  {
                    q: 'Q2: How is race condition prevented when multiple delivery riders see the same order on radar?',
                    a: 'The assignDeliveryPartner method executes an atomic assignment check: it verifies that order.deliveryPartnerId === null before binding the rider profile. If another rider accepted milliseconds earlier, the transaction rejects and returns an "Order already claimed" notice, ensuring idempotent dispatch.'
                  },
                  {
                    q: 'Q3: How is the state machine kept consistent against invalid transitions?',
                    a: 'The order lifecycle follows strict directed transitions: placed ➔ accepted ➔ preparing ➔ ready_for_pickup ➔ out_for_delivery ➔ delivered. Orders cannot jump directly from placed to out_for_delivery without kitchen acceptance and packaging confirmation.'
                  },
                  {
                    q: 'Q4: How does role-based access control (RBAC) work across sessions?',
                    a: 'The user session stores a verified role attribute ("customer", "restaurant", "delivery", "admin") and restaurantId. Route handlers and layout components verify role permissions, directing unauthorized users back to login or their corresponding role hub.'
                  }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: 'var(--color-surface-card, #151F32)',
                      border: '1px solid var(--color-border, #1E293B)',
                      borderRadius: '14px',
                      padding: '16px'
                    }}
                  >
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#FF5A26', marginBottom: '8px' }}>
                      {item.q}
                    </div>
                    <div style={{ fontSize: '0.835rem', color: 'var(--color-text-muted, #94A3B8)', lineHeight: 1.6 }}>
                      {item.a}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div
          style={{
            padding: '14px 24px',
            borderTop: '1px solid var(--color-border, #1E293B)',
            background: 'var(--color-surface, #111827)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.785rem',
            color: 'var(--color-text-muted, #94A3B8)'
          }}
        >
          <div>
            QuickBite Platform • Computer Science Engineering Project Demonstration
          </div>
          <button
            type="button"
            onClick={closeFacultyModal}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              border: '1px solid var(--color-border, #1E293B)',
              background: 'transparent',
              color: 'var(--color-text-main, #CBD5E1)',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Close Presentation
          </button>
        </div>
      </div>
    </div>
  );
}
