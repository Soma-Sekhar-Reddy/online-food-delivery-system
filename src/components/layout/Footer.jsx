import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer" style={{ background: 'var(--color-navy)', color: '#FFFFFF', padding: '60px 0 24px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '40px', marginBottom: '40px' }}>
          
          {/* Brand Col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', color: '#FFF' }}>
                <i className="fa-solid fa-burger"></i>
              </div>
              <span style={{ fontSize: '1.4rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>Quick<span style={{ color: 'var(--color-primary)' }}>Bite</span></span>
            </div>
            <p style={{ color: 'var(--color-text-subtle)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '20px' }}>
              QuickBite is an artisanal, ultra-fast food delivery ecosystem connecting hungry foodies with premier city restaurants and dedicated delivery fleet partners.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <a href="#" className="footer-social-link" style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF' }}><i className="fa-brands fa-instagram"></i></a>
              <a href="#" className="footer-social-link" style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF' }}><i className="fa-brands fa-twitter"></i></a>
              <a href="#" className="footer-social-link" style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF' }}><i className="fa-brands fa-linkedin-in"></i></a>
            </div>
          </div>

          {/* Customer Portal */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '16px', color: '#FFFFFF' }}>Customer Portal</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.875rem' }}>
              <li><Link to="/customer/restaurants" style={{ color: 'var(--color-text-subtle)' }}>Explore Restaurants</Link></li>
              <li><Link to="/customer/orders" style={{ color: 'var(--color-text-subtle)' }}>Order History & Tracking</Link></li>
              <li><Link to="/customer/cart" style={{ color: 'var(--color-text-subtle)' }}>My Shopping Cart</Link></li>
              <li><Link to="/customer/profile" style={{ color: 'var(--color-text-subtle)' }}>Saved Delivery Addresses</Link></li>
            </ul>
          </div>

          {/* Partner Portals */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '16px', color: '#FFFFFF' }}>Interconnected Portals</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.875rem' }}>
              <li><Link to="/restaurant/dashboard" style={{ color: 'var(--color-text-subtle)' }}><i className="fa-solid fa-store" style={{ color: 'var(--color-primary)', marginRight: '6px' }}></i> Restaurant Kitchen Hub</Link></li>
              <li><Link to="/delivery/dashboard" style={{ color: 'var(--color-text-subtle)' }}><i className="fa-solid fa-motorcycle" style={{ color: 'var(--color-primary)', marginRight: '6px' }}></i> Delivery Rider Fleet</Link></li>
              <li><Link to="/admin/dashboard" style={{ color: 'var(--color-text-subtle)' }}><i className="fa-solid fa-shield-halved" style={{ color: 'var(--color-primary)', marginRight: '6px' }}></i> Super Admin Console</Link></li>
              <li><Link to="/login" style={{ color: 'var(--color-text-subtle)' }}><i className="fa-solid fa-key" style={{ marginRight: '6px' }}></i> Sign In / 1-Click Role Fill</Link></li>
            </ul>
          </div>

          {/* Cuisines */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '16px', color: '#FFFFFF' }}>Top City Cuisines</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {['Hyderabadi Dum Biryani', 'Woodfired Pizza', 'Smashed Burgers', 'Dimsums', 'Healthy Organic Bowls', 'South Indian Dosa', 'Kulhad Chai'].map((c) => (
                <Link key={c} to="/customer/restaurants" style={{ fontSize: '0.75rem', padding: '4px 10px', borderRadius: 'var(--radius-full)', background: 'rgba(255,255,255,0.08)', color: 'var(--color-text-subtle)' }}>
                  {c}
                </Link>
              ))}
            </div>
          </div>

        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', fontSize: '0.8rem', color: 'var(--color-text-subtle)' }}>
          <div>&copy; {new Date().getFullYear()} QuickBite Technologies Inc. Built with Vite + React. All rights reserved.</div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="#" style={{ color: 'inherit' }}>Privacy Policy</a>
            <a href="#" style={{ color: 'inherit' }}>Terms of Service</a>
            <a href="#" style={{ color: 'inherit' }}>Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
