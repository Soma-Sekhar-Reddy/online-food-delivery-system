import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuickBite } from '../../context/QuickBiteContext';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

const AVATAR_PRESETS = [
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
];

export default function ProfilePage() {
  const {
    currentUser,
    setCurrentUser,
    orders,
    favorites,
    restaurants,
    logout,
    showToast,
    toggleFavorite,
    showConfirmModal,
    wallet,
    topUpWallet,
    savedCards,
    saveCard,
    removeCard,
    setDefaultCard,
    savedUpi,
    saveUpi,
    removeUpi,
    setDefaultUpi,
    addresses,
    saveAddress,
    removeAddress,
    setDefaultAddress,
    userPreferences,
    saveUserPreferences,
    changePassword,
    db
  } = useQuickBite();

  const navigate = useNavigate();

  // Tab State
  const [activeTab, setActiveTab] = useState('profile');

  // Profile Details Form
  const [name, setName] = useState(currentUser?.name || 'Rahul Sharma');
  const [phone, setPhone] = useState(currentUser?.phone || '+91 98765 43210');
  const [email] = useState(currentUser?.email || 'customer@quickbite.com');
  const [dob, setDob] = useState(currentUser?.dob || '1996-08-14');
  const [gender, setGender] = useState(currentUser?.gender || 'Male');
  const [avatar, setAvatar] = useState(currentUser?.avatar || AVATAR_PRESETS[0]);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [customAvatarUrl, setCustomAvatarUrl] = useState('');

  // Wallet Top-up state
  const [topUpAmount, setTopUpAmount] = useState('500');
  const [topUpSource, setTopUpSource] = useState('UPI');
  const [isProcessingTopUp, setIsProcessingTopUp] = useState(false);

  // Add Card Form State
  const [showAddCard, setShowAddCard] = useState(false);
  const [cardHolder, setCardHolder] = useState(currentUser?.name || 'Rahul Sharma');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardBank, setCardBank] = useState('HDFC Bank');
  const [cardBrand, setCardBrand] = useState('visa');
  const [isDefaultCard, setIsDefaultCard] = useState(false);

  // Add UPI Form State
  const [showAddUpi, setShowAddUpi] = useState(false);
  const [upiVpa, setUpiVpa] = useState('');
  const [upiApp, setUpiApp] = useState('Google Pay');

  // Address Form State
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [addrType, setAddrType] = useState('Home');
  const [addrStreet, setAddrStreet] = useState('');
  const [addrLandmark, setAddrLandmark] = useState('');
  const [addrCity, setAddrCity] = useState('Hyderabad');
  const [addrPincode, setAddrPincode] = useState('500034');
  const [addrPhone, setAddrPhone] = useState(currentUser?.phone || '+91 98765 43210');
  const [addrIsDefault, setAddrIsDefault] = useState(false);

  // Preferences Form State
  const [dietary, setDietary] = useState(userPreferences?.dietary || 'all');
  const [spiceLevel, setSpiceLevel] = useState(userPreferences?.spiceLevel || 'medium');
  const [defaultDeliveryInstruction, setDefaultDeliveryInstruction] = useState(userPreferences?.defaultDeliveryInstruction || 'Leave at door');
  const [notifySms, setNotifySms] = useState(userPreferences?.notifications?.sms ?? true);
  const [notifyWhatsapp, setNotifyWhatsapp] = useState(userPreferences?.notifications?.whatsapp ?? true);
  const [notifyEmail, setNotifyEmail] = useState(userPreferences?.notifications?.email ?? false);
  const [notifyOffers, setNotifyOffers] = useState(userPreferences?.notifications?.offers ?? true);

  // Security Form State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswords, setShowPasswords] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(userPreferences?.twoFactorEnabled ?? false);

  const favoriteRestaurants = restaurants.filter((r) => favorites.includes(r.id));

  // Auto detect card brand from number
  const handleCardNumberChange = (val) => {
    const raw = val.replace(/\D/g, '').slice(0, 16);
    const formatted = raw.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardNumber(formatted);

    if (raw.startsWith('4')) {
      setCardBrand('visa');
    } else if (raw.startsWith('5') || raw.startsWith('2')) {
      setCardBrand('mastercard');
    } else if (raw.startsWith('6') || raw.startsWith('8')) {
      setCardBrand('rupay');
    } else if (raw.startsWith('3')) {
      setCardBrand('amex');
    }
  };

  const handleExpiryChange = (val) => {
    const raw = val.replace(/\D/g, '').slice(0, 4);
    if (raw.length >= 2) {
      setCardExpiry(`${raw.slice(0, 2)}/${raw.slice(2)}`);
    } else {
      setCardExpiry(raw);
    }
  };

  // Profile Save
  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (currentUser) {
      const updated = {
        ...currentUser,
        name: name.trim(),
        phone: phone.trim(),
        dob,
        gender,
        avatar
      };
      setCurrentUser(updated);
      db.setCurrentUser(updated);
    }
    showToast('Personal information updated successfully!', 'success');
  };

  // Top Up Wallet
  const handleTopUpSubmit = (e) => {
    e.preventDefault();
    const amt = parseFloat(topUpAmount);
    if (isNaN(amt) || amt < 50) {
      showToast('Minimum top-up amount is ₹50', 'warning');
      return;
    }
    setIsProcessingTopUp(true);
    setTimeout(() => {
      topUpWallet(amt, topUpSource);
      setIsProcessingTopUp(false);
      setTopUpAmount('500');
    }, 900);
  };

  // Add Card Submit
  const handleAddCardSubmit = (e) => {
    e.preventDefault();
    const cleanNumber = cardNumber.replace(/\s+/g, '');
    if (cleanNumber.length < 12) {
      showToast('Please enter a valid 16-digit card number', 'error');
      return;
    }
    if (!cardExpiry || cardExpiry.length < 5) {
      showToast('Please enter a valid expiry date (MM/YY)', 'error');
      return;
    }
    if (!cardCvv || cardCvv.length < 3) {
      showToast('Please enter a 3 or 4-digit CVV', 'error');
      return;
    }

    const maskedNumber = `•••• •••• •••• ${cleanNumber.slice(-4)}`;
    saveCard({
      brand: cardBrand,
      number: maskedNumber,
      holder: cardHolder.trim() || 'Cardholder',
      expiry: cardExpiry,
      bank: cardBank,
      isDefault: isDefaultCard
    });

    setCardNumber('');
    setCardExpiry('');
    setCardCvv('');
    setShowAddCard(false);
  };

  // Add UPI Submit
  const handleAddUpiSubmit = (e) => {
    e.preventDefault();
    const clean = upiVpa.trim();
    if (!clean.includes('@')) {
      showToast('Please enter a valid UPI VPA (e.g. user@okhdfcbank)', 'error');
      return;
    }
    const created = saveUpi(clean, upiApp);
    if (created) {
      setUpiVpa('');
      setShowAddUpi(false);
    }
  };

  // Address Submit
  const handleAddressSubmit = (e) => {
    e.preventDefault();
    if (!addrStreet.trim()) {
      showToast('Please enter house/flat details and street address', 'warning');
      return;
    }

    saveAddress({
      id: editingAddressId || undefined,
      type: addrType,
      address: addrStreet.trim(),
      landmark: addrLandmark.trim(),
      city: addrCity.trim(),
      pincode: addrPincode.trim(),
      phone: addrPhone.trim(),
      isDefault: addrIsDefault
    });

    // Reset Form
    setEditingAddressId(null);
    setAddrStreet('');
    setAddrLandmark('');
    setShowAddressForm(false);
  };

  const startEditAddress = (addr) => {
    setEditingAddressId(addr.id);
    setAddrType(addr.type || 'Home');
    setAddrStreet(addr.address || '');
    setAddrLandmark(addr.landmark || '');
    setAddrCity(addr.city || 'Hyderabad');
    setAddrPincode(addr.pincode || '500034');
    setAddrPhone(addr.phone || phone);
    setAddrIsDefault(!!addr.isDefault);
    setShowAddressForm(true);
  };

  // Preferences Save
  const handleSavePreferences = (e) => {
    e.preventDefault();
    saveUserPreferences({
      dietary,
      spiceLevel,
      defaultDeliveryInstruction,
      notifications: {
        sms: notifySms,
        whatsapp: notifyWhatsapp,
        email: notifyEmail,
        offers: notifyOffers
      },
      twoFactorEnabled
    });
  };

  // Password Change
  const handleChangePassword = (e) => {
    e.preventDefault();
    if (!currentPassword) {
      showToast('Please enter your current password', 'warning');
      return;
    }
    if (newPassword.length < 6) {
      showToast('New password must be at least 6 characters long', 'error');
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast('New passwords do not match', 'error');
      return;
    }

    const res = changePassword(currentPassword, newPassword);
    if (res.success) {
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }
  };

  // Danger Zone: Reset
  const handleResetData = async () => {
    const confirmed = await showConfirmModal({
      title: 'Reset Local Account Data?',
      message: 'This will reset your local QuickBite demo state, orders, and addresses back to the original baseline.',
      confirmText: 'Reset Everything',
      cancelText: 'Cancel',
      type: 'danger'
    });
    if (confirmed) {
      db.clear();
      showToast('Account data reset. Reloading session...', 'info');
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  };

  const handleSignOut = () => {
    logout();
    showToast('Signed out successfully', 'info');
    navigate('/login');
  };

  return (
    <div className="customer-page-wrapper">
      <Navbar />

      <main className="section" style={{ minHeight: '80vh', paddingTop: '30px', paddingBottom: '70px' }}>
        <div className="container" style={{ maxWidth: '1120px' }}>
          
          {/* Header Title & Breadcrumb */}
          <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
            <div>
              <h1 style={{ fontSize: '1.85rem', fontWeight: 800, margin: 0 }}>Account Settings</h1>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
                Manage your profile, saved payment options, QuickBite wallet, and delivery preferences
              </p>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <Link to="/customer/restaurants" className="btn btn-secondary btn-sm" style={{ borderRadius: 'var(--radius-full)' }}>
                <i className="fa-solid fa-utensils"></i> Order Food
              </Link>
              <Link to="/customer/orders" className="btn btn-primary btn-sm" style={{ borderRadius: 'var(--radius-full)' }}>
                <i className="fa-solid fa-receipt"></i> Order History
              </Link>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '290px 1fr', gap: '30px', alignItems: 'flex-start' }}>
            
            {/* Left User Navigation Sidebar */}
            <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '24px 20px', boxShadow: 'var(--shadow-sm)' }}>
              
              {/* User Avatar & Identity Header */}
              <div style={{ textAlign: 'center', marginBottom: '22px' }}>
                <div style={{ position: 'relative', display: 'inline-block', margin: '0 auto 12px' }}>
                  <img
                    src={avatar}
                    alt={name}
                    style={{
                      width: '94px',
                      height: '94px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '3px solid var(--color-primary)',
                      boxShadow: '0 4px 12px rgba(255, 90, 38, 0.25)'
                    }}
                    onError={(e) => {
                      e.target.src = AVATAR_PRESETS[0];
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowAvatarPicker(!showAvatarPicker)}
                    style={{
                      position: 'absolute',
                      bottom: '2px',
                      right: '2px',
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      background: 'var(--color-primary)',
                      color: '#FFFFFF',
                      border: '2px solid var(--color-surface)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      fontSize: '0.75rem',
                      boxShadow: 'var(--shadow-sm)'
                    }}
                    title="Change Avatar"
                  >
                    <i className="fa-solid fa-camera"></i>
                  </button>
                </div>

                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0 0 2px' }}>{name}</h3>
                <p style={{ fontSize: '0.825rem', color: 'var(--color-text-muted)', margin: 0 }}>{email}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '8px' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, background: 'var(--color-success-bg, rgba(16,185,129,0.15))', color: 'var(--color-success)', padding: '2px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>
                    <i className="fa-solid fa-shield-check" style={{ marginRight: '4px' }}></i> Verified Foodie
                  </span>
                </div>
              </div>

              {/* Avatar Selector Tray */}
              {showAvatarPicker && (
                <div style={{ background: 'var(--color-surface-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '14px', marginBottom: '20px' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, marginBottom: '8px' }}>Choose Profile Avatar</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '10px' }}>
                    {AVATAR_PRESETS.map((pUrl, idx) => (
                      <img
                        key={idx}
                        src={pUrl}
                        alt="Preset"
                        onClick={() => {
                          setAvatar(pUrl);
                          if (currentUser) {
                            const updated = { ...currentUser, avatar: pUrl };
                            setCurrentUser(updated);
                            db.setCurrentUser(updated);
                          }
                          setShowAvatarPicker(false);
                          showToast('Profile photo updated!', 'success');
                        }}
                        style={{
                          width: '100%',
                          height: '54px',
                          borderRadius: '50%',
                          objectFit: 'cover',
                          cursor: 'pointer',
                          border: avatar === pUrl ? '2px solid var(--color-primary)' : '1px solid var(--color-border)'
                        }}
                      />
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <input
                      type="url"
                      placeholder="Or paste image URL"
                      value={customAvatarUrl}
                      onChange={(e) => setCustomAvatarUrl(e.target.value)}
                      style={{ flex: 1, padding: '6px 10px', fontSize: '0.75rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)' }}
                    />
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      style={{ padding: '6px 10px', fontSize: '0.75rem' }}
                      onClick={() => {
                        if (customAvatarUrl.trim()) {
                          setAvatar(customAvatarUrl.trim());
                          if (currentUser) {
                            const updated = { ...currentUser, avatar: customAvatarUrl.trim() };
                            setCurrentUser(updated);
                            db.setCurrentUser(updated);
                          }
                          setCustomAvatarUrl('');
                          setShowAvatarPicker(false);
                          showToast('Custom avatar applied!', 'success');
                        }
                      }}
                    >
                      Use
                    </button>
                  </div>
                </div>
              )}

              {/* Sidebar Tabs */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {[
                  { id: 'profile', label: 'Account Details', icon: 'fa-regular fa-user' },
                  { id: 'wallet-payments', label: 'Wallet & Payments', icon: 'fa-solid fa-wallet', badge: `₹${wallet?.balance || 0}` },
                  { id: 'addresses', label: 'Saved Addresses', icon: 'fa-solid fa-map-location-dot', count: addresses.length },
                  { id: 'preferences', label: 'Food & Delivery', icon: 'fa-solid fa-sliders' },
                  { id: 'security', label: 'Security & Logins', icon: 'fa-solid fa-shield-halved' },
                  { id: 'favorites', label: 'Favorites', icon: 'fa-regular fa-heart', count: favorites.length }
                ].map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '11px 14px',
                        borderRadius: 'var(--radius-md)',
                        border: 'none',
                        background: isActive ? 'var(--color-primary-light, rgba(255,90,38,0.12))' : 'transparent',
                        color: isActive ? 'var(--color-primary)' : 'var(--color-text-main)',
                        fontWeight: isActive ? 700 : 600,
                        fontSize: '0.88rem',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all var(--transition-fast)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <i className={tab.icon} style={{ width: '18px', textAlign: 'center' }}></i>
                        <span>{tab.label}</span>
                      </div>
                      {tab.badge && (
                        <span style={{ fontSize: '0.75rem', fontWeight: 800, background: 'var(--color-primary)', color: '#fff', padding: '2px 8px', borderRadius: 'var(--radius-full)' }}>
                          {tab.badge}
                        </span>
                      )}
                      {tab.count !== undefined && (
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)' }}>
                          {tab.count}
                        </span>
                      )}
                    </button>
                  );
                })}

                <div style={{ borderTop: '1px solid var(--color-border)', margin: '8px 0' }}></div>

                <button
                  type="button"
                  onClick={handleSignOut}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '11px 14px',
                    borderRadius: 'var(--radius-md)',
                    border: 'none',
                    background: 'transparent',
                    color: 'var(--color-danger)',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <i className="fa-solid fa-arrow-right-from-bracket" style={{ width: '18px', textAlign: 'center' }}></i>
                  <span>Sign Out</span>
                </button>
              </div>
            </div>

            {/* Right Tab Content Panel */}
            <div>
              
              {/* TAB 1: Profile Details */}
              {activeTab === 'profile' && (
                <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '28px', boxShadow: 'var(--shadow-sm)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <div>
                      <h2 style={{ fontSize: '1.35rem', fontWeight: 800, margin: 0 }}>Personal Information</h2>
                      <p style={{ fontSize: '0.825rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                        Update your identity details, primary phone number, and delivery profile
                      </p>
                    </div>
                  </div>

                  {/* KPI Quick Stats Row */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '26px' }}>
                    <div style={{ background: 'var(--color-surface-card)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', textAlign: 'center' }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-primary)' }}>{orders.length}</div>
                      <div style={{ fontSize: '0.775rem', color: 'var(--color-text-muted)' }}>Total Orders</div>
                    </div>
                    <div style={{ background: 'var(--color-surface-card)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', textAlign: 'center' }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-success)' }}>₹{wallet?.balance || 0}</div>
                      <div style={{ fontSize: '0.775rem', color: 'var(--color-text-muted)' }}>Wallet Balance</div>
                    </div>
                    <div style={{ background: 'var(--color-surface-card)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', textAlign: 'center' }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#3b82f6' }}>{addresses.length}</div>
                      <div style={{ fontSize: '0.775rem', color: 'var(--color-text-muted)' }}>Saved Addresses</div>
                    </div>
                    <div style={{ background: 'var(--color-surface-card)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', textAlign: 'center' }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-warning)' }}>{favorites.length}</div>
                      <div style={{ fontSize: '0.775rem', color: 'var(--color-text-muted)' }}>Favorites</div>
                    </div>
                  </div>

                  <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>Full Name *</label>
                        <input
                          type="text"
                          value={name}
                          required
                          onChange={(e) => setName(e.target.value)}
                          style={{ width: '100%', padding: '12px 14px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', fontSize: '0.9rem', background: 'var(--color-surface-card)' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>Phone Number *</label>
                        <input
                          type="tel"
                          value={phone}
                          required
                          onChange={(e) => setPhone(e.target.value)}
                          style={{ width: '100%', padding: '12px 14px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', fontSize: '0.9rem', background: 'var(--color-surface-card)' }}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>Email Address (Account ID)</label>
                        <input
                          type="email"
                          value={email}
                          disabled
                          style={{ width: '100%', padding: '12px 14px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', fontSize: '0.9rem', background: 'var(--color-surface-card)', opacity: 0.7, cursor: 'not-allowed' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>Date of Birth</label>
                        <input
                          type="date"
                          value={dob}
                          onChange={(e) => setDob(e.target.value)}
                          style={{ width: '100%', padding: '12px 14px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', fontSize: '0.9rem', background: 'var(--color-surface-card)' }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>Gender</label>
                      <div style={{ display: 'flex', gap: '12px' }}>
                        {['Male', 'Female', 'Non-Binary', 'Prefer not to say'].map((g) => (
                          <button
                            key={g}
                            type="button"
                            onClick={() => setGender(g)}
                            style={{
                              padding: '8px 16px',
                              borderRadius: 'var(--radius-md)',
                              border: gender === g ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                              background: gender === g ? 'var(--color-primary-light, rgba(255,90,38,0.1))' : 'var(--color-surface-card)',
                              color: gender === g ? 'var(--color-primary)' : 'var(--color-text-main)',
                              fontWeight: 700,
                              fontSize: '0.85rem',
                              cursor: 'pointer'
                            }}
                          >
                            {g}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
                      <button type="submit" className="btn btn-primary" style={{ padding: '12px 28px', fontWeight: 700 }}>
                        <i className="fa-solid fa-check" style={{ marginRight: '6px' }}></i> Save Profile Changes
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* TAB 2: Wallet & Payments */}
              {activeTab === 'wallet-payments' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  
                  {/* QuickBite Wallet Dashboard */}
                  <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '28px', boxShadow: 'var(--shadow-sm)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '22px' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--color-primary-light)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>
                            <i className="fa-solid fa-wallet"></i>
                          </span>
                          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, margin: 0 }}>QuickBite Digital Wallet</h2>
                        </div>
                        <p style={{ fontSize: '0.825rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                          Instant 1-click checkout with zero processing fees and instant refunds
                        </p>
                      </div>

                      <div style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, #ff834f 100%)', color: '#fff', padding: '14px 22px', borderRadius: 'var(--radius-md)', textAlign: 'right', minWidth: '180px', boxShadow: '0 4px 15px rgba(255, 90, 38, 0.3)' }}>
                        <div style={{ fontSize: '0.75rem', opacity: 0.9, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Current Balance</div>
                        <div style={{ fontSize: '1.8rem', fontWeight: 900 }}>₹{wallet?.balance || 0}</div>
                      </div>
                    </div>

                    {/* Add Money to Wallet Form */}
                    <form onSubmit={handleTopUpSubmit} style={{ background: 'var(--color-surface-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '20px', marginBottom: '24px' }}>
                      <h3 style={{ fontSize: '0.98rem', fontWeight: 800, marginBottom: '12px' }}>
                        <i className="fa-solid fa-circle-plus" style={{ color: 'var(--color-primary)', marginRight: '6px' }}></i> Add Money to Wallet
                      </h3>
                      
                      {/* Amount Quick Chips */}
                      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '14px' }}>
                        {['100', '250', '500', '1000', '2000'].map((chip) => (
                          <button
                            key={chip}
                            type="button"
                            onClick={() => setTopUpAmount(chip)}
                            style={{
                              padding: '8px 16px',
                              borderRadius: 'var(--radius-full)',
                              border: topUpAmount === chip ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                              background: topUpAmount === chip ? 'var(--color-primary-light, rgba(255,90,38,0.1))' : 'transparent',
                              color: topUpAmount === chip ? 'var(--color-primary)' : 'var(--color-text-main)',
                              fontWeight: 700,
                              fontSize: '0.85rem',
                              cursor: 'pointer'
                            }}
                          >
                            + ₹{chip}
                          </button>
                        ))}
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr auto', gap: '12px', alignItems: 'center' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.775rem', fontWeight: 700, marginBottom: '4px' }}>Enter Custom Amount (₹)</label>
                          <input
                            type="number"
                            min="50"
                            max="10000"
                            value={topUpAmount}
                            onChange={(e) => setTopUpAmount(e.target.value)}
                            style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', fontSize: '0.95rem', fontWeight: 700 }}
                          />
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '0.775rem', fontWeight: 700, marginBottom: '4px' }}>Payment Mode</label>
                          <select
                            value={topUpSource}
                            onChange={(e) => setTopUpSource(e.target.value)}
                            style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', fontSize: '0.88rem', background: 'var(--color-surface)' }}
                          >
                            <option value="UPI">Instant UPI (GPay/PhonePe)</option>
                            <option value="HDFC Debit Card">HDFC Millennia (•• 8821)</option>
                            <option value="Net Banking">Net Banking</option>
                          </select>
                        </div>

                        <div style={{ alignSelf: 'flex-end' }}>
                          <button
                            type="submit"
                            disabled={isProcessingTopUp}
                            className="btn btn-primary"
                            style={{ padding: '11px 20px', fontWeight: 800, whiteSpace: 'nowrap' }}
                          >
                            {isProcessingTopUp ? (
                              <span><i className="fa-solid fa-spinner fa-spin"></i> Processing...</span>
                            ) : (
                              <span><i className="fa-solid fa-bolt"></i> Top Up ₹{topUpAmount || '0'}</span>
                            )}
                          </button>
                        </div>
                      </div>
                    </form>

                    {/* Wallet Transactions History */}
                    <div>
                      <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '14px' }}>Recent Wallet Activity</h3>
                      {(!wallet?.transactions || wallet.transactions.length === 0) ? (
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>No wallet transactions yet.</p>
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          {wallet.transactions.slice(0, 5).map((t) => {
                            const isCredit = t.type === 'credit';
                            return (
                              <div
                                key={t.id}
                                style={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  padding: '12px 16px',
                                  background: 'var(--color-surface-card)',
                                  borderRadius: 'var(--radius-md)',
                                  border: '1px solid var(--color-border)'
                                }}
                              >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                  <div style={{
                                    width: '34px',
                                    height: '34px',
                                    borderRadius: '50%',
                                    background: isCredit ? 'var(--color-success-bg, rgba(16,185,129,0.15))' : 'var(--color-danger-bg, rgba(239,68,68,0.12))',
                                    color: isCredit ? 'var(--color-success)' : 'var(--color-danger)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '0.9rem'
                                  }}>
                                    <i className={isCredit ? 'fa-solid fa-arrow-down-left' : 'fa-solid fa-arrow-up-right'}></i>
                                  </div>
                                  <div>
                                    <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>{t.title}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                                      {new Date(t.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                  </div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                  <div style={{ fontWeight: 800, fontSize: '0.95rem', color: isCredit ? 'var(--color-success)' : 'var(--color-text-main)' }}>
                                    {isCredit ? '+' : '-'} ₹{t.amount}
                                  </div>
                                  <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>{t.status || 'Success'}</span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Saved Cards Management */}
                  <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '28px', boxShadow: 'var(--shadow-sm)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
                      <div>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>Saved Credit & Debit Cards</h2>
                        <p style={{ fontSize: '0.825rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                          Encrypted PCI-DSS compliant cards for fast checkout
                        </p>
                      </div>
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        onClick={() => setShowAddCard(!showAddCard)}
                        style={{ fontWeight: 700 }}
                      >
                        <i className={showAddCard ? 'fa-solid fa-xmark' : 'fa-solid fa-plus'}></i> {showAddCard ? 'Cancel' : 'Add New Card'}
                      </button>
                    </div>

                    {/* Add Card Form */}
                    {showAddCard && (
                      <form onSubmit={handleAddCardSubmit} style={{ background: 'var(--color-surface-card)', border: '1px dashed var(--color-primary)', borderRadius: 'var(--radius-md)', padding: '20px', marginBottom: '20px' }}>
                        <h3 style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: '14px' }}>Add New Payment Card</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '4px' }}>Cardholder Name *</label>
                            <input
                              type="text"
                              required
                              placeholder="Name as printed on card"
                              value={cardHolder}
                              onChange={(e) => setCardHolder(e.target.value)}
                              style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', fontSize: '0.88rem' }}
                            />
                          </div>

                          <div>
                            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '4px' }}>Card Number *</label>
                            <div style={{ position: 'relative' }}>
                              <input
                                type="text"
                                required
                                placeholder="1234 5678 9012 3456"
                                value={cardNumber}
                                onChange={(e) => handleCardNumberChange(e.target.value)}
                                style={{ width: '100%', padding: '10px 12px', paddingRight: '45px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', fontSize: '0.88rem', letterSpacing: '1px' }}
                              />
                              <div style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '1.2rem', color: 'var(--color-primary)' }}>
                                {cardBrand === 'visa' && <i className="fa-brands fa-cc-visa"></i>}
                                {cardBrand === 'mastercard' && <i className="fa-brands fa-cc-mastercard"></i>}
                                {cardBrand === 'amex' && <i className="fa-brands fa-cc-amex"></i>}
                                {cardBrand === 'rupay' && <span style={{ fontWeight: 900, fontSize: '0.75rem', background: '#0a3a78', color: '#fff', padding: '2px 4px', borderRadius: '3px' }}>RuPay</span>}
                              </div>
                            </div>
                          </div>

                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                            <div>
                              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '4px' }}>Valid Thru (MM/YY) *</label>
                              <input
                                type="text"
                                placeholder="MM/YY"
                                maxLength="5"
                                value={cardExpiry}
                                onChange={(e) => handleExpiryChange(e.target.value)}
                                style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', fontSize: '0.88rem' }}
                              />
                            </div>
                            <div>
                              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '4px' }}>CVV (3 or 4 digits) *</label>
                              <input
                                type="password"
                                maxLength="4"
                                placeholder="•••"
                                value={cardCvv}
                                onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                                style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', fontSize: '0.88rem' }}
                              />
                            </div>
                            <div>
                              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '4px' }}>Issuing Bank</label>
                              <input
                                type="text"
                                placeholder="e.g. HDFC Bank"
                                value={cardBank}
                                onChange={(e) => setCardBank(e.target.value)}
                                style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', fontSize: '0.88rem' }}
                              />
                            </div>
                          </div>

                          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem' }}>
                            <input
                              type="checkbox"
                              checked={isDefaultCard}
                              onChange={(e) => setIsDefaultCard(e.target.checked)}
                            />
                            <span>Set this card as primary payment method</span>
                          </label>

                          <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
                            <button type="submit" className="btn btn-primary btn-sm" style={{ fontWeight: 700 }}>
                              <i className="fa-solid fa-lock"></i> Save Card Securely
                            </button>
                            <button type="button" className="btn btn-secondary btn-sm" onClick={() => setShowAddCard(false)}>
                              Cancel
                            </button>
                          </div>
                        </div>
                      </form>
                    )}

                    {/* Cards Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
                      {savedCards.map((card) => (
                        <div
                          key={card.id}
                          style={{
                            border: card.isDefault ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                            borderRadius: 'var(--radius-md)',
                            padding: '18px',
                            background: 'var(--color-surface-card)',
                            boxShadow: card.isDefault ? '0 4px 14px rgba(255, 90, 38, 0.15)' : 'none',
                            position: 'relative',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                          }}
                        >
                          <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                              <span style={{ fontSize: '1.4rem', color: card.brand === 'visa' ? '#1a1f71' : '#eb001b' }}>
                                {card.brand === 'visa' ? <i className="fa-brands fa-cc-visa"></i> : <i className="fa-brands fa-cc-mastercard"></i>}
                              </span>
                              {card.isDefault ? (
                                <span style={{ fontSize: '0.72rem', fontWeight: 800, background: 'var(--color-primary)', color: '#fff', padding: '2px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>
                                  Default Card
                                </span>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => setDefaultCard(card.id)}
                                  style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}
                                >
                                  Make Default
                                </button>
                              )}
                            </div>

                            <div style={{ fontSize: '1.05rem', fontWeight: 800, letterSpacing: '1px', marginBottom: '8px' }}>
                              {card.number}
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                              <span>{card.holder}</span>
                              <span>Exp: {card.expiry}</span>
                            </div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-subtle)', marginTop: '4px' }}>
                              {card.bank || 'Bank Card'}
                            </div>
                          </div>

                          <div style={{ borderTop: '1px solid var(--color-border)', marginTop: '14px', paddingTop: '10px', display: 'flex', justifyContent: 'flex-end' }}>
                            <button
                              type="button"
                              onClick={() => removeCard(card.id)}
                              style={{ background: 'none', border: 'none', color: 'var(--color-danger)', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                            >
                              <i className="fa-regular fa-trash-can"></i> Remove Card
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Saved UPI IDs Management */}
                  <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '28px', boxShadow: 'var(--shadow-sm)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
                      <div>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>Saved UPI IDs / VPAs</h2>
                        <p style={{ fontSize: '0.825rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                          1-tap authorization with Google Pay, PhonePe, Paytm, BHIM
                        </p>
                      </div>
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        onClick={() => setShowAddUpi(!showAddUpi)}
                        style={{ fontWeight: 700 }}
                      >
                        <i className={showAddUpi ? 'fa-solid fa-xmark' : 'fa-solid fa-plus'}></i> {showAddUpi ? 'Cancel' : 'Add New UPI'}
                      </button>
                    </div>

                    {showAddUpi && (
                      <form onSubmit={handleAddUpiSubmit} style={{ background: 'var(--color-surface-card)', border: '1px dashed var(--color-primary)', borderRadius: 'var(--radius-md)', padding: '18px', marginBottom: '18px' }}>
                        <h3 style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: '12px' }}>Add UPI Virtual Payment Address</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr auto', gap: '12px', alignItems: 'flex-end' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '4px' }}>UPI ID (e.g. username@okhdfcbank)</label>
                            <input
                              type="text"
                              required
                              placeholder="mobile@upi or name@bank"
                              value={upiVpa}
                              onChange={(e) => setUpiVpa(e.target.value)}
                              style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', fontSize: '0.88rem' }}
                            />
                          </div>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '4px' }}>App Provider</label>
                            <select
                              value={upiApp}
                              onChange={(e) => setUpiApp(e.target.value)}
                              style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', fontSize: '0.88rem', background: 'var(--color-surface)' }}
                            >
                              <option value="Google Pay">Google Pay</option>
                              <option value="PhonePe">PhonePe</option>
                              <option value="Paytm">Paytm</option>
                              <option value="BHIM UPI">BHIM UPI</option>
                              <option value="Cred">Cred</option>
                            </select>
                          </div>
                          <button type="submit" className="btn btn-primary btn-sm" style={{ padding: '10px 18px', fontWeight: 700 }}>
                            <i className="fa-solid fa-check"></i> Save UPI ID
                          </button>
                        </div>
                      </form>
                    )}

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {savedUpi.map((u) => (
                        <div
                          key={u.id}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '14px 18px',
                            borderRadius: 'var(--radius-md)',
                            border: u.isDefault ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                            background: 'var(--color-surface-card)'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                            <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(59,130,246,0.12)', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>
                              <i className="fa-solid fa-qrcode"></i>
                            </div>
                            <div>
                              <div style={{ fontWeight: 800, fontSize: '0.92rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span>{u.vpa}</span>
                                {u.isDefault && (
                                  <span style={{ fontSize: '0.68rem', fontWeight: 800, background: 'var(--color-primary)', color: '#fff', padding: '2px 6px', borderRadius: '4px' }}>
                                    PRIMARY
                                  </span>
                                )}
                              </div>
                              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Linked via {u.appName}</div>
                            </div>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                            {!u.isDefault && (
                              <button
                                type="button"
                                onClick={() => setDefaultUpi(u.id)}
                                style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}
                              >
                                Set Primary
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => removeUpi(u.id)}
                              style={{ background: 'none', border: 'none', color: 'var(--color-danger)', cursor: 'pointer', padding: '6px' }}
                              title="Delete UPI VPA"
                            >
                              <i className="fa-regular fa-trash-can"></i>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* TAB 3: Saved Delivery Addresses */}
              {activeTab === 'addresses' && (
                <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '28px', boxShadow: 'var(--shadow-sm)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px', flexWrap: 'wrap', gap: '12px' }}>
                    <div>
                      <h2 style={{ fontSize: '1.35rem', fontWeight: 800, margin: 0 }}>Saved Delivery Addresses</h2>
                      <p style={{ fontSize: '0.825rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                        Manage drop-off destinations for rapid 1-click checkout
                      </p>
                    </div>
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      onClick={() => {
                        setEditingAddressId(null);
                        setAddrStreet('');
                        setAddrLandmark('');
                        setShowAddressForm(!showAddressForm);
                      }}
                      style={{ fontWeight: 700 }}
                    >
                      <i className={showAddressForm ? 'fa-solid fa-xmark' : 'fa-solid fa-plus'}></i> {showAddressForm ? 'Cancel' : 'Add Address'}
                    </button>
                  </div>

                  {/* Add / Edit Address Form */}
                  {showAddressForm && (
                    <form onSubmit={handleAddressSubmit} style={{ background: 'var(--color-surface-card)', border: '1px solid var(--color-primary)', borderRadius: 'var(--radius-md)', padding: '20px', marginBottom: '24px' }}>
                      <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '14px' }}>
                        {editingAddressId ? 'Update Delivery Address' : 'Add New Address'}
                      </h3>

                      <div style={{ display: 'flex', gap: '10px', marginBottom: '14px' }}>
                        {['Home', 'Work', 'Partner', 'Other'].map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setAddrType(t)}
                            style={{
                              padding: '8px 16px',
                              borderRadius: 'var(--radius-md)',
                              border: addrType === t ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                              background: addrType === t ? 'var(--color-primary-light, rgba(255,90,38,0.1))' : 'transparent',
                              color: addrType === t ? 'var(--color-primary)' : 'var(--color-text-main)',
                              fontWeight: 700,
                              fontSize: '0.85rem',
                              cursor: 'pointer'
                            }}
                          >
                            <i className={t === 'Home' ? 'fa-solid fa-house' : t === 'Work' ? 'fa-solid fa-briefcase' : 'fa-solid fa-location-dot'} style={{ marginRight: '6px' }}></i>
                            {t}
                          </button>
                        ))}
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '4px' }}>Complete Address (Flat / Door / Building / Street) *</label>
                          <textarea
                            rows="2"
                            required
                            placeholder="e.g. Flat 402, Sunshine Towers, Road No. 12, Banjara Hills"
                            value={addrStreet}
                            onChange={(e) => setAddrStreet(e.target.value)}
                            style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', fontSize: '0.88rem' }}
                          />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '4px' }}>Nearby Landmark</label>
                            <input
                              type="text"
                              placeholder="e.g. Near City Center Mall"
                              value={addrLandmark}
                              onChange={(e) => setAddrLandmark(e.target.value)}
                              style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', fontSize: '0.88rem' }}
                            />
                          </div>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '4px' }}>City *</label>
                            <input
                              type="text"
                              required
                              value={addrCity}
                              onChange={(e) => setAddrCity(e.target.value)}
                              style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', fontSize: '0.88rem' }}
                            />
                          </div>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '4px' }}>Pincode *</label>
                            <input
                              type="text"
                              required
                              value={addrPincode}
                              onChange={(e) => setAddrPincode(e.target.value)}
                              style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', fontSize: '0.88rem' }}
                            />
                          </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', alignItems: 'center' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '4px' }}>Recipient Contact Phone</label>
                            <input
                              type="tel"
                              value={addrPhone}
                              onChange={(e) => setAddrPhone(e.target.value)}
                              style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', fontSize: '0.88rem' }}
                            />
                          </div>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginTop: '18px', fontSize: '0.85rem' }}>
                            <input
                              type="checkbox"
                              checked={addrIsDefault}
                              onChange={(e) => setAddrIsDefault(e.target.checked)}
                            />
                            <span style={{ fontWeight: 600 }}>Set as Default Delivery Address</span>
                          </label>
                        </div>

                        <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                          <button type="submit" className="btn btn-primary btn-sm" style={{ fontWeight: 700 }}>
                            <i className="fa-solid fa-check"></i> {editingAddressId ? 'Update Address' : 'Save Address'}
                          </button>
                          <button type="button" className="btn btn-secondary btn-sm" onClick={() => setShowAddressForm(false)}>
                            Cancel
                          </button>
                        </div>
                      </div>
                    </form>
                  )}

                  {/* Addresses List */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {addresses.map((a) => (
                      <div
                        key={a.id}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          padding: '18px',
                          borderRadius: 'var(--radius-md)',
                          border: a.isDefault ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                          background: 'var(--color-surface-card)',
                          boxShadow: a.isDefault ? '0 2px 10px rgba(255, 90, 38, 0.1)' : 'none'
                        }}
                      >
                        <div style={{ flex: 1, paddingRight: '20px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                            <span style={{ fontSize: '0.75rem', fontWeight: 800, background: 'var(--color-primary-light, rgba(255,90,38,0.1))', color: 'var(--color-primary)', padding: '2px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>
                              <i className={a.type === 'Home' ? 'fa-solid fa-house' : a.type === 'Work' ? 'fa-solid fa-briefcase' : 'fa-solid fa-location-dot'} style={{ marginRight: '4px' }}></i>
                              {a.type}
                            </span>
                            {a.isDefault && (
                              <span style={{ fontSize: '0.7rem', fontWeight: 800, background: 'var(--color-success-bg, rgba(16,185,129,0.15))', color: 'var(--color-success)', padding: '2px 8px', borderRadius: '4px' }}>
                                DEFAULT ADDRESS
                              </span>
                            )}
                          </div>
                          <p style={{ margin: '6px 0 4px', fontSize: '0.92rem', fontWeight: 600, lineHeight: 1.45 }}>{a.address}</p>
                          <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                            {a.landmark && <span>Landmark: {a.landmark} • </span>}
                            <span>{a.city} {a.pincode ? `- ${a.pincode}` : ''}</span>
                            {a.phone && <span style={{ marginLeft: '10px' }}><i className="fa-solid fa-phone" style={{ fontSize: '0.7rem', marginRight: '4px' }}></i>{a.phone}</span>}
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          {!a.isDefault && (
                            <button
                              type="button"
                              onClick={() => setDefaultAddress(a.id)}
                              style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}
                            >
                              Make Default
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => startEditAddress(a)}
                            style={{ background: 'none', border: 'none', color: 'var(--color-text-main)', cursor: 'pointer', padding: '6px' }}
                            title="Edit Address"
                          >
                            <i className="fa-solid fa-pen-to-square"></i>
                          </button>
                          <button
                            type="button"
                            onClick={() => removeAddress(a.id)}
                            style={{ background: 'none', border: 'none', color: 'var(--color-danger)', cursor: 'pointer', padding: '6px' }}
                            title="Remove address"
                          >
                            <i className="fa-regular fa-trash-can"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: Food & Delivery Preferences */}
              {activeTab === 'preferences' && (
                <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '28px', boxShadow: 'var(--shadow-sm)' }}>
                  <h2 style={{ fontSize: '1.35rem', fontWeight: 800, margin: '0 0 4px' }}>Food & Delivery Preferences</h2>
                  <p style={{ fontSize: '0.825rem', color: 'var(--color-text-muted)', marginBottom: '22px' }}>
                    Personalize default order instructions, dietary filters, and notification alerts
                  </p>

                  <form onSubmit={handleSavePreferences} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                    
                    {/* Dietary Preference */}
                    <div>
                      <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 800, marginBottom: '8px' }}>
                        Dietary Preference
                      </label>
                      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        {[
                          { id: 'all', label: 'All Cuisines (No Restriction)', icon: 'fa-solid fa-utensils' },
                          { id: 'veg', label: 'Pure Veg Only', icon: 'fa-solid fa-leaf' },
                          { id: 'non-veg', label: 'Non-Veg Friendly', icon: 'fa-solid fa-drumstick-bite' },
                          { id: 'vegan', label: '100% Plant Vegan', icon: 'fa-solid fa-seedling' }
                        ].map((d) => (
                          <button
                            key={d.id}
                            type="button"
                            onClick={() => setDietary(d.id)}
                            style={{
                              padding: '10px 16px',
                              borderRadius: 'var(--radius-md)',
                              border: dietary === d.id ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                              background: dietary === d.id ? 'var(--color-primary-light, rgba(255,90,38,0.1))' : 'var(--color-surface-card)',
                              color: dietary === d.id ? 'var(--color-primary)' : 'var(--color-text-main)',
                              fontWeight: 700,
                              fontSize: '0.85rem',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px'
                            }}
                          >
                            <i className={d.icon}></i> {d.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Spice Level Preference */}
                    <div>
                      <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 800, marginBottom: '8px' }}>
                        Preferred Spice Level
                      </label>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        {[
                          { id: 'mild', label: 'Mild (Low Spice)', icon: '🌶️' },
                          { id: 'medium', label: 'Medium (Balanced)', icon: '🌶️🌶️' },
                          { id: 'spicy', label: 'Extra Spicy (Fire)', icon: '🌶️🌶️🌶️' }
                        ].map((s) => (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() => setSpiceLevel(s.id)}
                            style={{
                              flex: 1,
                              padding: '10px 14px',
                              borderRadius: 'var(--radius-md)',
                              border: spiceLevel === s.id ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                              background: spiceLevel === s.id ? 'var(--color-primary-light, rgba(255,90,38,0.1))' : 'var(--color-surface-card)',
                              color: spiceLevel === s.id ? 'var(--color-primary)' : 'var(--color-text-main)',
                              fontWeight: 700,
                              fontSize: '0.85rem',
                              cursor: 'pointer',
                              textAlign: 'center'
                            }}
                          >
                            <div>{s.icon}</div>
                            <div style={{ marginTop: '4px' }}>{s.label}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Default Delivery Instruction */}
                    <div>
                      <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 800, marginBottom: '8px' }}>
                        Default Delivery Instruction for Rider
                      </label>
                      <select
                        value={defaultDeliveryInstruction}
                        onChange={(e) => setDefaultDeliveryInstruction(e.target.value)}
                        style={{ width: '100%', padding: '12px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', fontSize: '0.9rem', background: 'var(--color-surface-card)' }}
                      >
                        <option value="Leave at door">Leave at door / Contactless delivery</option>
                        <option value="Do not ring bell">Do not ring bell / Baby is sleeping</option>
                        <option value="Leave with security">Leave with society security guard</option>
                        <option value="Call upon arrival">Call my phone when approaching gate</option>
                        <option value="Hand over directly">Hand over directly to me</option>
                      </select>
                    </div>

                    {/* Communication Preferences */}
                    <div>
                      <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 800, marginBottom: '12px' }}>
                        Communication & Order Notifications
                      </label>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 14px', background: 'var(--color-surface-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}>
                          <input type="checkbox" checked={notifyWhatsapp} onChange={(e) => setNotifyWhatsapp(e.target.checked)} />
                          <div>
                            <div style={{ fontWeight: 700, fontSize: '0.88rem' }}><i className="fa-brands fa-whatsapp" style={{ color: '#25D366', marginRight: '6px' }}></i> WhatsApp Order Updates</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Real-time live rider tracking links</div>
                          </div>
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 14px', background: 'var(--color-surface-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}>
                          <input type="checkbox" checked={notifySms} onChange={(e) => setNotifySms(e.target.checked)} />
                          <div>
                            <div style={{ fontWeight: 700, fontSize: '0.88rem' }}><i className="fa-solid fa-message" style={{ color: '#3b82f6', marginRight: '6px' }}></i> SMS Dispatch Alerts</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>OTP verification and arrival SMS</div>
                          </div>
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 14px', background: 'var(--color-surface-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}>
                          <input type="checkbox" checked={notifyOffers} onChange={(e) => setNotifyOffers(e.target.checked)} />
                          <div>
                            <div style={{ fontWeight: 700, fontSize: '0.88rem' }}><i className="fa-solid fa-tag" style={{ color: 'var(--color-primary)', marginRight: '6px' }}></i> Exclusive Discounts</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>50% OFF promo codes on weekends</div>
                          </div>
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 14px', background: 'var(--color-surface-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}>
                          <input type="checkbox" checked={notifyEmail} onChange={(e) => setNotifyEmail(e.target.checked)} />
                          <div>
                            <div style={{ fontWeight: 700, fontSize: '0.88rem' }}><i className="fa-regular fa-envelope" style={{ color: '#8b5cf6', marginRight: '6px' }}></i> Email Invoices</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Tax invoices sent to {email}</div>
                          </div>
                        </label>
                      </div>
                    </div>

                    <div>
                      <button type="submit" className="btn btn-primary" style={{ padding: '12px 28px', fontWeight: 700 }}>
                        <i className="fa-solid fa-check" style={{ marginRight: '6px' }}></i> Save All Preferences
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* TAB 5: Security & Logins */}
              {activeTab === 'security' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  
                  {/* Change Password */}
                  <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '28px', boxShadow: 'var(--shadow-sm)' }}>
                    <h2 style={{ fontSize: '1.35rem', fontWeight: 800, margin: '0 0 4px' }}>Account Security & Credentials</h2>
                    <p style={{ fontSize: '0.825rem', color: 'var(--color-text-muted)', marginBottom: '20px' }}>
                      Update your account access password and manage login authentication
                    </p>

                    <form onSubmit={handleChangePassword} style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '540px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 700, marginBottom: '6px' }}>Current Password</label>
                        <input
                          type={showPasswords ? 'text' : 'password'}
                          required
                          placeholder="••••••••"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          style={{ width: '100%', padding: '11px 14px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', fontSize: '0.9rem', background: 'var(--color-surface-card)' }}
                        />
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 700, marginBottom: '6px' }}>New Password</label>
                          <input
                            type={showPasswords ? 'text' : 'password'}
                            required
                            placeholder="Min 6 characters"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            style={{ width: '100%', padding: '11px 14px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', fontSize: '0.9rem', background: 'var(--color-surface-card)' }}
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 700, marginBottom: '6px' }}>Confirm New Password</label>
                          <input
                            type={showPasswords ? 'text' : 'password'}
                            required
                            placeholder="Repeat new password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            style={{ width: '100%', padding: '11px 14px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', fontSize: '0.9rem', background: 'var(--color-surface-card)' }}
                          />
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '0.825rem' }}>
                          <input type="checkbox" checked={showPasswords} onChange={(e) => setShowPasswords(e.target.checked)} />
                          <span>Show passwords</span>
                        </label>
                        <button type="submit" className="btn btn-primary btn-sm" style={{ fontWeight: 700, padding: '10px 22px' }}>
                          Update Password
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* Two-Factor Authentication & Devices */}
                  <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '28px', boxShadow: 'var(--shadow-sm)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                      <div>
                        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0 }}>Two-Factor Authentication (2FA)</h3>
                        <p style={{ fontSize: '0.825rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                          Add an additional layer of security on high-value orders and logins
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const nextVal = !twoFactorEnabled;
                          setTwoFactorEnabled(nextVal);
                          saveUserPreferences({ twoFactorEnabled: nextVal });
                          showToast(`Two-Factor Authentication ${nextVal ? 'Enabled' : 'Disabled'}`, nextVal ? 'success' : 'info');
                        }}
                        style={{
                          padding: '8px 18px',
                          borderRadius: 'var(--radius-full)',
                          border: 'none',
                          background: twoFactorEnabled ? 'var(--color-success)' : 'var(--color-border)',
                          color: '#fff',
                          fontWeight: 800,
                          fontSize: '0.825rem',
                          cursor: 'pointer'
                        }}
                      >
                        {twoFactorEnabled ? '2FA ACTIVE' : 'ENABLE 2FA'}
                      </button>
                    </div>

                    <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '20px' }}>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: '12px' }}>Active Login Sessions</h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'var(--color-surface-card)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <i className="fa-solid fa-laptop" style={{ fontSize: '1.3rem', color: 'var(--color-primary)' }}></i>
                            <div>
                              <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>Windows PC — Chrome Desktop (Current Session)</div>
                              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Hyderabad, India • Active right now</div>
                            </div>
                          </div>
                          <span style={{ fontSize: '0.72rem', fontWeight: 800, background: 'var(--color-success-bg, rgba(16,185,129,0.15))', color: 'var(--color-success)', padding: '2px 8px', borderRadius: '4px' }}>
                            ONLINE
                          </span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'var(--color-surface-card)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <i className="fa-solid fa-mobile-screen" style={{ fontSize: '1.3rem', color: 'var(--color-text-muted)' }}></i>
                            <div>
                              <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>Pixel 8 Pro — QuickBite Android App</div>
                              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Hyderabad, India • Last active 2 hours ago</div>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => showToast('Session revoked successfully', 'info')}
                            style={{ background: 'none', border: 'none', color: 'var(--color-danger)', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}
                          >
                            Revoke
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Danger Zone */}
                  <div style={{ background: 'var(--color-danger-bg, rgba(239,68,68,0.06))', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 'var(--radius-lg)', padding: '24px' }}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--color-danger)', margin: '0 0 6px' }}>
                      <i className="fa-solid fa-triangle-exclamation" style={{ marginRight: '6px' }}></i> Danger Zone
                    </h3>
                    <p style={{ fontSize: '0.825rem', color: 'var(--color-text-muted)', marginBottom: '14px' }}>
                      Reset local demo data and restore initial fresh application state.
                    </p>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={handleResetData}
                      style={{ color: 'var(--color-danger)', borderColor: 'rgba(239,68,68,0.4)', fontWeight: 700 }}
                    >
                      <i className="fa-solid fa-rotate-left"></i> Reset Demo Account Data
                    </button>
                  </div>

                </div>
              )}

              {/* TAB 6: Favorites */}
              {activeTab === 'favorites' && (
                <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '28px', boxShadow: 'var(--shadow-sm)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <div>
                      <h2 style={{ fontSize: '1.35rem', fontWeight: 800, margin: 0 }}>Favorite Restaurants</h2>
                      <p style={{ fontSize: '0.825rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                        Quick access to menus of places you love
                      </p>
                    </div>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-muted)' }}>
                      {favoriteRestaurants.length} Places Saved
                    </span>
                  </div>

                  {favoriteRestaurants.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '50px 20px', color: 'var(--color-text-muted)' }}>
                      <i className="fa-regular fa-heart" style={{ fontSize: '3rem', marginBottom: '14px', color: 'var(--color-text-subtle)' }}></i>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '6px' }}>No favorites saved yet</h3>
                      <p style={{ fontSize: '0.85rem' }}>Explore top kitchens and click the heart icon on any restaurant to save it here.</p>
                      <Link to="/customer/restaurants" className="btn btn-primary btn-sm" style={{ marginTop: '16px', fontWeight: 700 }}>
                        <i className="fa-solid fa-utensils"></i> Browse Restaurants
                      </Link>
                    </div>
                  ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      {favoriteRestaurants.map((r) => (
                        <div
                          key={r.id}
                          style={{
                            border: '1px solid var(--color-border)',
                            borderRadius: 'var(--radius-md)',
                            overflow: 'hidden',
                            background: 'var(--color-surface-card)',
                            display: 'flex',
                            flexDirection: 'column'
                          }}
                        >
                          <div style={{ position: 'relative' }}>
                            <img
                              src={r.image}
                              alt={r.name}
                              style={{ height: '130px', width: '100%', objectFit: 'cover' }}
                              onError={(e) => {
                                e.target.src = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80';
                              }}
                            />
                            {r.discount && (
                              <span style={{ position: 'absolute', bottom: '8px', left: '8px', background: 'rgba(0,0,0,0.75)', color: '#fff', fontSize: '0.72rem', fontWeight: 800, padding: '3px 8px', borderRadius: '4px' }}>
                                <i className="fa-solid fa-tag" style={{ color: 'var(--color-primary)', marginRight: '4px' }}></i> {r.discount}
                              </span>
                            )}
                          </div>
                          <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h4 style={{ fontSize: '1rem', fontWeight: 800, margin: 0 }}>{r.name}</h4>
                                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-warning)' }}>
                                  ★ {r.rating}
                                </span>
                              </div>
                              <p style={{ fontSize: '0.775rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                                {(r.cuisines || r.cuisine || []).join(', ')}
                              </p>
                              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-subtle)', marginTop: '4px' }}>
                                <i className="fa-solid fa-clock" style={{ marginRight: '4px' }}></i>{r.deliveryTime || '25-35 min'} • ₹{r.priceForTwo || 350} for two
                              </div>
                            </div>

                            <div style={{ display: 'flex', gap: '8px', marginTop: '14px' }}>
                              <Link to={`/customer/menu?id=${r.id}`} className="btn btn-primary btn-sm" style={{ flex: 1, textAlign: 'center', fontSize: '0.825rem', fontWeight: 700 }}>
                                View Menu
                              </Link>
                              <button
                                type="button"
                                className="btn btn-secondary btn-sm"
                                onClick={() => {
                                  toggleFavorite(r.id);
                                  showToast(`Removed ${r.name} from favorites`, 'info');
                                }}
                                title="Remove favorite"
                              >
                                <i className="fa-solid fa-heart" style={{ color: 'var(--color-danger)' }}></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
