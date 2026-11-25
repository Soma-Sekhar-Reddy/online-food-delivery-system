import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuickBite } from '../context/QuickBiteContext.jsx';

export default function LoginPage() {
  const [email, setEmail] = useState('customer@quickbite.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [activePersona, setActivePersona] = useState('customer');

  // Simulation state
  const [isSimRunning, setIsSimRunning] = useState(false);
  const [simStep, setSimStep] = useState(0); // 0: idle, 1: customer, 2: restaurant, 3: rider, 4: complete
  const [simProgress, setSimProgress] = useState(0);
  const [simStatusMsg, setSimStatusMsg] = useState('Click Run to watch complete lifecycle from order to doorstep delivery');
  const [simOrderId, setSimOrderId] = useState(null);

  const simTimersRef = useRef([]);

  const { login, showToast, db } = useQuickBite();
  const navigate = useNavigate();

  const demoAccounts = [
    {
      role: 'customer',
      label: 'Customer',
      tag: 'Foodie',
      email: 'customer@quickbite.com',
      password: 'password123',
      icon: 'fa-solid fa-user',
      color: 'var(--color-primary, #FF5A26)'
    },
    {
      role: 'restaurant',
      label: 'Restaurant',
      tag: 'Kitchen',
      email: 'owner1@quickbite.com',
      password: 'password123',
      icon: 'fa-solid fa-store',
      color: '#10B981'
    },
    {
      role: 'delivery',
      label: 'Delivery Rider',
      tag: 'Fleet',
      email: 'driver@quickbite.com',
      password: 'password123',
      icon: 'fa-solid fa-motorcycle',
      color: '#0284C7'
    },
    {
      role: 'admin',
      label: 'Admin Console',
      tag: 'Superuser',
      email: 'admin@quickbite.com',
      password: 'admin123',
      icon: 'fa-solid fa-shield-halved',
      color: '#8B5CF6'
    }
  ];

  const handleFillRole = (account) => {
    setEmail(account.email);
    setPassword(account.password);
    setActivePersona(account.role);
    showToast(`Autofilled credentials for ${account.label} (${account.email})`, 'info', 1600);
  };

  const handleJumpToSimRole = (role) => {
    const acc = demoAccounts.find((a) => a.role === role);
    if (acc) {
      handleFillRole(acc);
    }
  };

  const clearSimTimers = () => {
    simTimersRef.current.forEach((t) => clearTimeout(t));
    simTimersRef.current = [];
  };

  useEffect(() => {
    return () => clearSimTimers();
  }, []);

  const handleToggleSimulation = () => {
    if (isSimRunning) {
      clearSimTimers();
      setIsSimRunning(false);
      setSimStep(0);
      setSimProgress(0);
      setSimStatusMsg('Simulation stopped. Click Run to start fresh.');
      showToast('Simulation stopped', 'info', 1600);
      return;
    }

    clearSimTimers();
    setIsSimRunning(true);
    setSimStep(1);
    setSimProgress(33);

    // Create realistic live order
    const rest = db?.getRestaurants?.()?.[0] || { id: 'rest-1', name: 'The Royal Biryani Kitchen', address: 'Madhapur, Hyderabad' };
    const newOrder = db?.createOrder ? db.createOrder({
      customerId: 'usr-customer-1',
      customerName: 'Rahul Sharma (Demo)',
      customerPhone: '+91 98765 43210',
      customerAddress: 'Flat 402, Sunshine Heights, Jubilee Enclave, Hyderabad',
      restaurantId: rest.id,
      restaurantName: rest.name,
      restaurantAddress: rest.address,
      items: [
        { dishId: 'dish-1', name: 'Royal Dum Handi Chicken Biryani', price: 349, quantity: 2 },
        { dishId: 'dish-3', name: 'Nizami Paneer Tikka Biryani', price: 299, quantity: 1 }
      ],
      itemTotal: 997,
      deliveryFee: 0,
      discount: 100,
      taxes: 50,
      grandTotal: 947,
      paymentMethod: 'UPI (Authorized)',
      paymentStatus: 'Paid'
    }) : { id: `ORD-${Date.now().toString().slice(-4)}` };

    setSimOrderId(newOrder.id);
    setSimStatusMsg(`Step 1: Customer placed Order #${newOrder.id} (Paid ₹947 via UPI)`);
    showToast(`👤 Step 1: Customer ordered Biryani Feast & paid ₹947 via UPI`, 'info', 2200);

    // Step 2: Restaurant Kitchen (2s)
    const t1 = setTimeout(() => {
      if (db?.updateOrderStatus) {
        db.updateOrderStatus(newOrder.id, 'accepted');
        db.updateOrderStatus(newOrder.id, 'preparing');
      }
      setSimStep(2);
      setSimProgress(66);
      setSimStatusMsg(`Step 2: ${rest.name} accepted Order #${newOrder.id} & meal is cooking!`);
      showToast(`🏪 Step 2: ${rest.name} accepted order & started kitchen prep!`, 'info', 2200);
    }, 2000);

    // Step 3: Rider Out for Delivery (4s)
    const t2 = setTimeout(() => {
      if (db?.updateOrderStatus) {
        db.updateOrderStatus(newOrder.id, 'ready_for_pickup');
        db.updateOrderStatus(newOrder.id, 'out_for_delivery');
      }
      setSimStep(3);
      setSimProgress(100);
      setSimStatusMsg(`Step 3: Delivery Rider Ravi picked up order and is on the way!`);
      showToast(`🛵 Step 3: Rider Ravi dispatched for delivery to Sunshine Heights!`, 'info', 2200);
    }, 4000);

    // Completion (6s)
    const t3 = setTimeout(() => {
      if (db?.updateOrderStatus) {
        db.updateOrderStatus(newOrder.id, 'delivered');
      }
      setIsSimRunning(false);
      setSimStep(4);
      setSimStatusMsg(`✨ Order #${newOrder.id} Delivered! Full 3-step lifecycle completed successfully.`);
      showToast(`🎉 3-Step Lifecycle Complete! Order #${newOrder.id} delivered to customer!`, 'success', 3200);
    }, 6000);

    simTimersRef.current = [t1, t2, t3];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = login(email, password);
    if (user) {
      const redirectTarget = new URLSearchParams(window.location.search).get('redirect');
      setTimeout(() => {
        if (user.role === 'customer') {
          navigate(redirectTarget || '/customer/restaurants');
        } else if (user.role === 'restaurant') {
          navigate('/restaurant/dashboard');
        } else if (user.role === 'delivery') {
          navigate('/delivery/dashboard');
        } else if (user.role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate(redirectTarget || '/');
        }
      }, 400);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      background: 'radial-gradient(circle at 10% 20%, rgba(255, 107, 53, 0.08) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(23, 32, 42, 0.05) 0%, transparent 40%), var(--color-bg)',
      position: 'relative'
    }}>
      {/* Top back button */}
      <div style={{ position: 'absolute', top: '20px', left: '24px', zIndex: 10 }}>
        <Link to="/" className="btn btn-secondary btn-sm" style={{ borderRadius: 'var(--radius-full)', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <i className="fa-solid fa-arrow-left"></i> Back to Home
        </Link>
      </div>

      <div style={{
        width: '100%',
        maxWidth: '980px',
        background: 'var(--color-surface)',
        borderRadius: 'var(--radius-xl, 20px)',
        boxShadow: 'var(--shadow-xl, 0 20px 40px rgba(0,0,0,0.12))',
        border: '1px solid var(--color-border)',
        overflow: 'hidden',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))'
      }}>
        
        {/* Left: Promotional Food Banner */}
        <div style={{
          background: "linear-gradient(135deg, rgba(23, 32, 42, 0.88) 0%, rgba(36, 51, 66, 0.92) 100%), url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80') center/cover",
          color: '#FFFFFF',
          padding: '50px 40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: '520px'
        }}>
          <div>
            <Link to="/" className="brand-logo" style={{ color: '#FFFFFF', display: 'inline-flex', marginBottom: '20px' }}>
              <div className="logo-icon-wrap" style={{ width: '42px', height: '42px', fontSize: '1.25rem' }}>
                <i className="fa-solid fa-burger"></i>
              </div>
              <div className="brand-text" style={{ fontSize: '1.65rem' }}>
                Quick<span style={{ color: 'var(--color-primary)' }}>Bite</span>
              </div>
            </Link>

            <h2 style={{ color: '#FFFFFF', fontSize: '2.1rem', fontWeight: 800, lineHeight: 1.25, marginTop: '16px' }}>
              Taste the Magic, Faster Than Ever.
            </h2>
            <p style={{ color: '#CBD5E1', fontSize: '0.975rem', lineHeight: 1.6, marginTop: '14px' }}>
              Join over 50,000 satisfied foodies enjoying real-time delivery tracking, verified top restaurants, and exclusive daily promo codes.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.9rem', fontWeight: 500 }}>
                <i className="fa-solid fa-circle-check" style={{ color: 'var(--color-primary)', fontSize: '1.1rem' }}></i>
                <span>Live Order Tracking across 4 modules</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.9rem', fontWeight: 500 }}>
                <i className="fa-solid fa-circle-check" style={{ color: 'var(--color-primary)', fontSize: '1.1rem' }}></i>
                <span>Shared LocalStorage Synchronized State</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.9rem', fontWeight: 500 }}>
                <i className="fa-solid fa-circle-check" style={{ color: 'var(--color-primary)', fontSize: '1.1rem' }}></i>
                <span>Exclusive 50% Welcome Discount code: QUICK50</span>
              </div>
            </div>
          </div>

          <div style={{ fontSize: '0.8rem', color: '#94A3B8', marginTop: '30px' }}>
            &copy; 2026 QuickBite Technologies Inc.
          </div>
        </div>

        {/* Right: Auth Form & Demo Tools */}
        <div style={{ padding: '32px 30px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          
          <div style={{ marginBottom: '16px' }}>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.5px', margin: '0 0 4px' }}>
              Welcome Back!
            </h1>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', margin: 0 }}>
              Sign in to access your orders, saved addresses & favorites
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '5px', color: 'var(--color-text-main)' }}>
                Email Address
              </label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <i className="fa-solid fa-envelope" style={{ position: 'absolute', left: '14px', color: 'var(--color-text-subtle)', fontSize: '0.9rem' }}></i>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setActivePersona(null);
                  }}
                  placeholder="name@example.com"
                  required
                  style={{
                    width: '100%',
                    padding: '10px 14px 10px 38px',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--color-surface-card)',
                    fontSize: '0.9rem',
                    color: 'var(--color-text-main)',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '5px', color: 'var(--color-text-main)' }}>
                Password
              </label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <i className="fa-solid fa-lock" style={{ position: 'absolute', left: '14px', color: 'var(--color-text-subtle)', fontSize: '0.9rem' }}></i>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  style={{
                    width: '100%',
                    padding: '10px 38px 10px 38px',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--color-surface-card)',
                    fontSize: '0.9rem',
                    color: 'var(--color-text-main)',
                    outline: 'none'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '12px', background: 'none', border: 'none', color: 'var(--color-text-subtle)', cursor: 'pointer', padding: '4px', fontSize: '0.9rem' }}
                  aria-label="Toggle password visibility"
                >
                  <i className={showPassword ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye'}></i>
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', fontSize: '0.825rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: 'var(--color-text-muted)' }}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{ accentColor: 'var(--color-primary)' }}
                />
                <span>Remember me</span>
              </label>
              <a
                href="#forgot"
                onClick={(e) => {
                  e.preventDefault();
                  showToast('Reset password link sent to your registered email (Demo)', 'info');
                }}
                style={{ color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'none' }}
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg"
              style={{ width: '100%', padding: '11px', fontSize: '0.95rem', fontWeight: 800, borderRadius: 'var(--radius-md)' }}
            >
              Sign In to Account
            </button>
          </form>

          {/* 1-Click Demo Account Autofill (2x2 Grid) */}
          <div style={{
            background: 'var(--color-bg)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: '12px',
            marginTop: '16px'
          }}>
            <span style={{ display: 'block', fontSize: '0.74rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--color-text-muted)', marginBottom: '6px' }}>
              <i className="fa-solid fa-bolt" style={{ color: 'var(--color-warning, #F59E0B)', marginRight: '4px' }}></i> 1-Click Demo Account Autofill:
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '6px' }}>
              {demoAccounts.map((acc) => {
                const isSelected = activePersona === acc.role;
                return (
                  <button
                    key={acc.role}
                    type="button"
                    onClick={() => handleFillRole(acc)}
                    style={{
                      padding: '7px 8px',
                      fontSize: '0.76rem',
                      fontWeight: 700,
                      borderRadius: 'var(--radius-sm)',
                      background: isSelected ? `${acc.color}15` : 'var(--color-surface)',
                      border: isSelected ? `1.5px solid ${acc.color}` : '1px solid var(--color-border)',
                      color: isSelected ? acc.color : 'var(--color-text-main)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.18s ease'
                    }}
                  >
                    <i className={acc.icon} style={{ color: acc.color }}></i>
                    <span>{acc.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Live 3-Step Order Lifecycle Simulation (User ➔ Restaurant ➔ Rider) */}
          <div style={{
            marginTop: '14px',
            padding: '12px 14px',
            background: 'linear-gradient(135deg, rgba(255, 90, 38, 0.04) 0%, rgba(59, 130, 246, 0.04) 100%), var(--color-surface)',
            border: '1.5px solid var(--color-border)',
            borderRadius: 'var(--radius-md, 12px)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.74rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.6px', color: 'var(--color-primary)', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                <i className="fa-solid fa-bolt"></i> Live 3‑Step Lifecycle Simulation
              </span>
              <span style={{
                fontSize: '0.68rem',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: '12px',
                background: 'var(--color-surface-card)',
                border: '1px solid var(--color-border)',
                color: simStep === 4 ? '#10B981' : (simStep > 0 ? 'var(--color-primary)' : 'var(--color-text-muted)')
              }}>
                {simStep === 0 && 'Ready'}
                {simStep === 1 && 'Step 1/3: Customer'}
                {simStep === 2 && 'Step 2/3: Kitchen'}
                {simStep === 3 && 'Step 3/3: Rider'}
                {simStep === 4 && 'Delivered 🎉'}
              </span>
            </div>

            {/* 3 Step Nodes Connected Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr auto 1fr', alignItems: 'center', gap: '4px', marginBottom: '10px' }}>
              {/* Step 1: User */}
              <div
                onClick={() => handleJumpToSimRole('customer')}
                style={{
                  background: 'var(--color-surface-card)',
                  border: simStep === 1 || simStep === 4 ? '1.5px solid var(--color-primary)' : '1px solid var(--color-border)',
                  boxShadow: simStep === 1 ? '0 3px 10px rgba(255, 90, 38, 0.25)' : 'none',
                  transform: simStep === 1 ? 'translateY(-2px)' : 'none',
                  borderRadius: 'var(--radius-sm)',
                  padding: '7px 4px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ width: '28px', height: '28px', margin: '0 auto 3px', borderRadius: '50%', background: 'rgba(255, 90, 38, 0.12)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center', fontSize: '0.8rem' }}>
                  <i className="fa-solid fa-user"></i>
                </div>
                <div style={{ fontSize: '0.76rem', fontWeight: 800, color: 'var(--color-text-main)' }}>1. User</div>
                <div style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Order & Pay</div>
              </div>

              <div style={{ color: 'var(--color-text-subtle)', fontSize: '0.7rem' }}>
                <i className="fa-solid fa-chevron-right"></i>
              </div>

              {/* Step 2: Restaurant */}
              <div
                onClick={() => handleJumpToSimRole('restaurant')}
                style={{
                  background: 'var(--color-surface-card)',
                  border: simStep === 2 || simStep === 4 ? '1.5px solid #10B981' : '1px solid var(--color-border)',
                  boxShadow: simStep === 2 ? '0 3px 10px rgba(16, 185, 129, 0.25)' : 'none',
                  transform: simStep === 2 ? 'translateY(-2px)' : 'none',
                  borderRadius: 'var(--radius-sm)',
                  padding: '7px 4px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ width: '28px', height: '28px', margin: '0 auto 3px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.12)', color: '#10B981', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center', fontSize: '0.8rem' }}>
                  <i className="fa-solid fa-store"></i>
                </div>
                <div style={{ fontSize: '0.76rem', fontWeight: 800, color: 'var(--color-text-main)' }}>2. Restaurant</div>
                <div style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Kitchen Prep</div>
              </div>

              <div style={{ color: 'var(--color-text-subtle)', fontSize: '0.7rem' }}>
                <i className="fa-solid fa-chevron-right"></i>
              </div>

              {/* Step 3: Rider */}
              <div
                onClick={() => handleJumpToSimRole('delivery')}
                style={{
                  background: 'var(--color-surface-card)',
                  border: simStep === 3 || simStep === 4 ? '1.5px solid #0284C7' : '1px solid var(--color-border)',
                  boxShadow: simStep === 3 ? '0 3px 10px rgba(2, 132, 199, 0.25)' : 'none',
                  transform: simStep === 3 ? 'translateY(-2px)' : 'none',
                  borderRadius: 'var(--radius-sm)',
                  padding: '7px 4px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ width: '28px', height: '28px', margin: '0 auto 3px', borderRadius: '50%', background: 'rgba(2, 132, 199, 0.12)', color: '#0284C7', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center', fontSize: '0.8rem' }}>
                  <i className="fa-solid fa-motorcycle"></i>
                </div>
                <div style={{ fontSize: '0.76rem', fontWeight: 800, color: 'var(--color-text-main)' }}>3. Rider</div>
                <div style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Fast Delivery</div>
              </div>
            </div>

            {/* Dynamic Progress Bar & Status Text */}
            <div style={{ marginBottom: '8px' }}>
              <div style={{ height: '5px', background: 'var(--color-border)', borderRadius: '99px', overflow: 'hidden', marginBottom: '6px' }}>
                <div style={{
                  height: '100%',
                  width: `${simProgress}%`,
                  background: 'linear-gradient(90deg, var(--color-primary), #10B981, #0284C7)',
                  borderRadius: '99px',
                  transition: 'width 0.5s ease'
                }}></div>
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', textAlign: 'center', fontWeight: 600, minHeight: '16px' }}>
                {simStatusMsg}
              </div>
            </div>

            {/* Simulation Action Buttons */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleToggleSimulation}
                style={{
                  flex: 1,
                  padding: '8px 10px',
                  fontSize: '0.825rem',
                  fontWeight: 700,
                  borderRadius: 'var(--radius-sm)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <i className={isSimRunning ? 'fa-solid fa-stop' : (simStep === 4 ? 'fa-solid fa-rotate-right' : 'fa-solid fa-play')}></i>
                <span>{isSimRunning ? 'Stop Simulation' : (simStep === 4 ? 'Replay Simulation' : 'Run Live Simulation')}</span>
              </button>
              {simOrderId && (
                <Link
                  to={`/customer/tracking?id=${simOrderId}`}
                  className="btn btn-secondary"
                  style={{ padding: '8px 10px', fontSize: '0.825rem', fontWeight: 700, borderRadius: 'var(--radius-sm)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                  title="View Live GPS Tracking"
                >
                  <i className="fa-solid fa-route"></i> Track
                </Link>
              )}
            </div>
          </div>

          <p style={{ textAlign: 'center', marginTop: '16px', fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: 0 }}>
            Don't have an account yet?{' '}
            <Link to="/register" style={{ color: 'var(--color-primary)', fontWeight: 700, textDecoration: 'none' }}>
              Sign Up
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}
