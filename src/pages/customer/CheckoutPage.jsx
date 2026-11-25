import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuickBite } from '../../context/QuickBiteContext';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

const POPULAR_BANKS = [
  { id: 'hdfc', name: 'HDFC Bank', code: 'HDFC' },
  { id: 'icici', name: 'ICICI Bank', code: 'ICICI' },
  { id: 'sbi', name: 'State Bank of India', code: 'SBI' },
  { id: 'axis', name: 'Axis Bank', code: 'AXIS' },
  { id: 'kotak', name: 'Kotak Mahindra', code: 'KOTAK' },
  { id: 'pnb', name: 'Punjab National Bank', code: 'PNB' }
];

const OTHER_BANKS = [
  'Bank of Baroda',
  'Canara Bank',
  'Union Bank of India',
  'IDBI Bank',
  'IndusInd Bank',
  'Federal Bank',
  'Yes Bank',
  'RBL Bank'
];

export default function CheckoutPage() {
  const {
    cart,
    cartSummary,
    currentUser,
    promptCustomerLogin,
    clearCart,
    showToast,
    db,
    wallet,
    deductWallet,
    topUpWallet,
    savedCards,
    savedUpi,
    saveCard,
    saveUpi,
    addresses,
    saveAddress
  } = useQuickBite();

  const navigate = useNavigate();

  // Address selection state
  const defaultAddr = addresses.find((a) => a.isDefault) || addresses[0];
  const [selectedAddressId, setSelectedAddressId] = useState(defaultAddr?.id || 'addr-1');
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newAddrType, setNewAddrType] = useState('Home');
  const [newAddrStreet, setNewAddrStreet] = useState('');
  const [newAddrLandmark, setNewAddrLandmark] = useState('');
  const [newAddrCity, setNewAddrCity] = useState('Hyderabad');
  const [newAddrPincode, setNewAddrPincode] = useState('500034');
  const [newAddrPhone, setNewAddrPhone] = useState(currentUser?.phone || '+91 98765 43210');

  // Delivery Instructions
  const [leaveAtDoor, setLeaveAtDoor] = useState(false);
  const [dontRingBell, setDontRingBell] = useState(true);
  const [leaveWithGuard, setLeaveWithGuard] = useState(false);
  const [customNote, setCustomNote] = useState(() => sessionStorage.getItem('qb_delivery_instructions') || '');

  // Payment method selection: 'wallet' | 'upi' | 'card' | 'netbanking' | 'cod'
  const [paymentMethod, setPaymentMethod] = useState('wallet');

  // Wallet top-up modal inside checkout if balance is low
  const [isQuickToppingUp, setIsQuickToppingUp] = useState(false);

  // UPI State
  const defaultUpi = savedUpi.find((u) => u.isDefault)?.vpa || 'user@okhdfcbank';
  const [selectedUpiVpa, setSelectedUpiVpa] = useState(defaultUpi);
  const [customUpiInput, setCustomUpiInput] = useState('');
  const [upiVerified, setUpiVerified] = useState(true);
  const [selectedUpiApp, setSelectedUpiApp] = useState('Google Pay');

  // Cards State
  const defaultCard = savedCards.find((c) => c.isDefault) || savedCards[0];
  const [useSavedCard, setUseSavedCard] = useState(savedCards.length > 0);
  const [selectedCardId, setSelectedCardId] = useState(defaultCard?.id || '');
  const [savedCardCvv, setSavedCardCvv] = useState('');
  
  // New Card Inputs
  const [newCardNumber, setNewCardNumber] = useState('');
  const [newCardHolder, setNewCardHolder] = useState(currentUser?.name || 'Rahul Sharma');
  const [newCardExpiry, setNewCardExpiry] = useState('');
  const [newCardCvv, setNewCardCvv] = useState('');
  const [newCardBrand, setNewCardBrand] = useState('visa');
  const [saveNewCardCheck, setSaveNewCardCheck] = useState(true);

  // Net Banking State
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');

  // COD State
  const [codMode, setCodMode] = useState('cash'); // 'cash' | 'upi_on_delivery'

  // Submission & Processing Modal State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [processingStep, setProcessingStep] = useState(0); // 0: idle, 1: connecting, 2: verifying, 3: approved

  // Keep selected address updated if addresses change
  useEffect(() => {
    if (!addresses.some((a) => a.id === selectedAddressId) && addresses.length > 0) {
      setSelectedAddressId(addresses[0].id);
    }
  }, [addresses, selectedAddressId]);

  if (!cart.items || cart.items.length === 0) {
    return (
      <div className="customer-page-wrapper">
        <Navbar />
        <div className="container" style={{ minHeight: '60vh', textAlign: 'center', padding: '80px 20px' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--color-surface-card)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <i className="fa-solid fa-basket-shopping" style={{ fontSize: '2.5rem', color: 'var(--color-primary)' }}></i>
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>No Items in Your Cart</h2>
          <p style={{ color: 'var(--color-text-muted)', margin: '12px 0 24px', maxWidth: '400px', marginLeft: 'auto', marginRight: 'auto' }}>
            Your basket is currently empty. Please pick your favorite food items to proceed with checkout.
          </p>
          <Link to="/customer/restaurants" className="btn btn-primary" style={{ padding: '12px 28px', fontWeight: 700 }}>
            Browse Restaurants
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const grandTotal = cartSummary.grandTotal || cartSummary.total || 0;
  const walletBalance = wallet?.balance || 0;
  const isWalletSufficient = walletBalance >= grandTotal;

  // Selected address object
  const activeAddress = addresses.find((a) => a.id === selectedAddressId) || {
    id: 'addr-fallback',
    type: 'Home',
    address: 'Flat 402, Sunshine Towers, Rd No 12, Banjara Hills, Hyderabad',
    phone: currentUser?.phone || '+91 98765 43210'
  };

  // Card formatting handler
  const handleNewCardNumberChange = (val) => {
    const raw = val.replace(/\D/g, '').slice(0, 16);
    const formatted = raw.replace(/(\d{4})(?=\d)/g, '$1 ');
    setNewCardNumber(formatted);

    if (raw.startsWith('4')) setNewCardBrand('visa');
    else if (raw.startsWith('5') || raw.startsWith('2')) setNewCardBrand('mastercard');
    else if (raw.startsWith('6') || raw.startsWith('8')) setNewCardBrand('rupay');
    else if (raw.startsWith('3')) setNewCardBrand('amex');
  };

  const handleNewExpiryChange = (val) => {
    const raw = val.replace(/\D/g, '').slice(0, 4);
    if (raw.length >= 2) setNewCardExpiry(`${raw.slice(0, 2)}/${raw.slice(2)}`);
    else setNewCardExpiry(raw);
  };

  // Save New Address Inside Checkout
  const handleAddNewAddress = (e) => {
    e.preventDefault();
    if (!newAddrStreet.trim()) {
      showToast('Please enter complete street / building address', 'warning');
      return;
    }
    const saved = saveAddress({
      type: newAddrType,
      address: newAddrStreet.trim(),
      landmark: newAddrLandmark.trim(),
      city: newAddrCity.trim(),
      pincode: newAddrPincode.trim(),
      phone: newAddrPhone.trim(),
      isDefault: false
    });
    setSelectedAddressId(saved.id);
    setNewAddrStreet('');
    setNewAddrLandmark('');
    setShowAddAddress(false);
    showToast('New address added and selected for this order!', 'success');
  };

  // 1-Click Top Up from checkout
  const handleQuickTopUp = () => {
    const deficit = Math.max(100, Math.ceil(grandTotal - walletBalance));
    setIsQuickToppingUp(true);
    setTimeout(() => {
      topUpWallet(deficit, 'Instant UPI Checkout');
      setIsQuickToppingUp(false);
      showToast(`₹${deficit} added to wallet! Ready to place order.`, 'success');
    }, 800);
  };

  // Verify custom UPI
  const handleVerifyCustomUpi = () => {
    if (!customUpiInput.includes('@')) {
      showToast('Please enter a valid UPI VPA (e.g. name@bank)', 'error');
      setUpiVerified(false);
      return;
    }
    setSelectedUpiVpa(customUpiInput.trim());
    setUpiVerified(true);
    showToast(`UPI ID "${customUpiInput.trim()}" verified & active!`, 'success');
  };

  // Place Order Action Handler
  const handlePlaceOrder = () => {
    // 0. Enforce customer authentication: User must be signed in as customer
    if (!currentUser || currentUser.role !== 'customer') {
      promptCustomerLogin('/customer/checkout');
      return;
    }

    // Validate selected payment method
    if (paymentMethod === 'wallet') {
      if (!isWalletSufficient) {
        showToast('Insufficient wallet balance. Please top up or choose another payment method.', 'warning');
        return;
      }
    } else if (paymentMethod === 'upi') {
      const activeVpa = selectedUpiVpa || customUpiInput;
      if (!activeVpa || !activeVpa.includes('@')) {
        showToast('Please select or enter a valid UPI ID (e.g. user@okhdfcbank)', 'error');
        return;
      }
    } else if (paymentMethod === 'card') {
      if (useSavedCard) {
        if (!selectedCardId) {
          showToast('Please select a saved card to pay with', 'warning');
          return;
        }
        if (!savedCardCvv || savedCardCvv.length < 3) {
          showToast('Please enter the 3-digit CVV for the selected card', 'warning');
          return;
        }
      } else {
        const rawCard = newCardNumber.replace(/\s+/g, '');
        if (rawCard.length < 12) {
          showToast('Please enter a valid 16-digit card number', 'error');
          return;
        }
        if (!newCardExpiry || newCardExpiry.length < 5) {
          showToast('Please enter card expiry date (MM/YY)', 'error');
          return;
        }
        if (!newCardCvv || newCardCvv.length < 3) {
          showToast('Please enter a 3 or 4-digit CVV', 'error');
          return;
        }
      }
    } else if (paymentMethod === 'netbanking') {
      if (!selectedBank) {
        showToast('Please select your bank for Net Banking', 'warning');
        return;
      }
    }

    // Begin animated checkout process
    setIsSubmitting(true);
    setProcessingStep(1);

    setTimeout(() => {
      setProcessingStep(2);
    }, 700);

    setTimeout(() => {
      setProcessingStep(3);
    }, 1400);

    setTimeout(() => {
      try {
        const restId = cart.restaurantId || (cart.items[0] && cart.items[0].restaurantId) || 'rest-1';
        const allRests = db.getRestaurants();
        const matchedRest = allRests.find((r) => r.id === restId);
        const restaurantName = matchedRest ? matchedRest.name : 'QuickBite Partner';

        // Save card if requested
        if (paymentMethod === 'card' && !useSavedCard && saveNewCardCheck) {
          const rawNum = newCardNumber.replace(/\s+/g, '');
          saveCard({
            brand: newCardBrand,
            number: `•••• •••• •••• ${rawNum.slice(-4)}`,
            holder: newCardHolder,
            expiry: newCardExpiry,
            bank: 'Credit/Debit Card',
            isDefault: false
          });
        }

        const generatedTxnId = `TXN-QB-${Date.now().toString().slice(-6)}`;

        // Deduct from wallet if wallet payment
        if (paymentMethod === 'wallet') {
          deductWallet(grandTotal, generatedTxnId);
        }

        const methodLabels = {
          wallet: 'QuickBite Wallet',
          upi: `UPI (${selectedUpiApp || 'QR'})`,
          card: useSavedCard ? 'Saved Card' : 'Credit / Debit Card',
          netbanking: `Net Banking (${selectedBank})`,
          cod: codMode === 'cash' ? 'Cash on Delivery' : 'Pay via UPI on Delivery'
        };

        const instructionParts = [
          leaveAtDoor ? 'Leave at door / contactless' : null,
          dontRingBell ? 'Do not ring bell' : null,
          leaveWithGuard ? 'Leave with security guard' : null,
          customNote.trim() ? customNote.trim() : null
        ].filter(Boolean);

        const orderPayload = {
          customerId: currentUser?.id || 'usr-cust-1',
          customerName: currentUser?.name || 'Rahul Sharma',
          customerPhone: currentUser?.phone || '+91 98765 43210',
          customerEmail: currentUser?.email || 'customer@quickbite.com',
          restaurantId: restId,
          restaurantName: restaurantName,
          items: cart.items.map((i) => ({
            dishId: i.dishId,
            name: i.name,
            price: i.price,
            quantity: i.quantity,
            isVeg: i.isVeg,
            image: i.image
          })),
          deliveryAddress: `${activeAddress.address}${activeAddress.landmark ? `, Near ${activeAddress.landmark}` : ''}, ${activeAddress.city || 'Hyderabad'}`,
          paymentMethod: methodLabels[paymentMethod] || paymentMethod.toUpperCase(),
          paymentStatus: paymentMethod === 'cod' ? 'Pending' : 'Paid',
          transactionId: generatedTxnId,
          paidAt: paymentMethod === 'cod' ? null : new Date().toISOString(),
          grandTotal: grandTotal,
          instructions: instructionParts.join(' | ') || 'None',
          billSummary: {
            itemTotal: cartSummary.itemTotal || cartSummary.subtotal,
            deliveryFee: cartSummary.deliveryFee,
            packagingFee: cartSummary.packagingFee || 0,
            taxes: cartSummary.taxes,
            discount: cartSummary.discount,
            grandTotal: grandTotal
          }
        };

        const createdOrder = db.createOrder(orderPayload);
        clearCart();
        sessionStorage.removeItem('qb_delivery_instructions');
        showToast('Payment successful! Your order has been placed with the kitchen.', 'success', 3500);

        setTimeout(() => {
          navigate(`/customer/tracking?id=${createdOrder.id}`);
        }, 500);
      } catch (err) {
        console.error(err);
        showToast('Payment processing encountered an error. Please try again.', 'error');
        setIsSubmitting(false);
        setProcessingStep(0);
      }
    }, 2000);
  };

  return (
    <div className="customer-page-wrapper">
      <Navbar />

      <main className="section" style={{ minHeight: '80vh', paddingTop: '30px', paddingBottom: '70px' }}>
        <div className="container" style={{ maxWidth: '1140px' }}>
          
          <div style={{ marginBottom: '22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Link to="/customer/cart" className="btn btn-secondary btn-sm" style={{ borderRadius: 'var(--radius-full)' }}>
              <i className="fa-solid fa-arrow-left"></i> Back to Cart
            </Link>
            <div style={{ fontSize: '0.825rem', color: 'var(--color-text-muted)' }}>
              <i className="fa-solid fa-shield-halved" style={{ color: 'var(--color-success)', marginRight: '6px' }}></i>
              256-Bit SSL Encrypted & Verified Checkout
            </div>
          </div>

          {(!currentUser || currentUser.role !== 'customer') && (
            <div style={{
              background: 'linear-gradient(135deg, rgba(255, 90, 38, 0.12) 0%, rgba(255, 140, 90, 0.08) 100%)',
              border: '1.5px solid var(--color-primary)',
              borderRadius: 'var(--radius-lg)',
              padding: '18px 22px',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: 'var(--color-primary)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.15rem',
                  flexShrink: 0
                }}>
                  <i className="fa-solid fa-user-lock"></i>
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1.025rem', fontWeight: 800, color: 'var(--color-text-main)' }}>
                    Customer Account Required to Place Order
                  </h4>
                  <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                    Please log in as a customer (or use 1-Click Demo Customer) to complete checkout and track your delivery.
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => promptCustomerLogin('/customer/checkout')}
                style={{ padding: '9px 20px', fontWeight: 700, fontSize: '0.875rem' }}
              >
                <i className="fa-solid fa-arrow-right-to-bracket" style={{ marginRight: '6px' }}></i>
                Sign In as Customer
              </button>
            </div>
          )}

          <div className="checkout-page-grid">
            
            {/* Left Steps Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              {/* STEP 1: Delivery Address */}
              <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--color-primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                      1
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0 }}>Select Delivery Address</h3>
                      <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', margin: 0 }}>Where should we deliver your hot meal?</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => setShowAddAddress(!showAddAddress)}
                    style={{ fontWeight: 700 }}
                  >
                    <i className={showAddAddress ? 'fa-solid fa-xmark' : 'fa-solid fa-plus'}></i> {showAddAddress ? 'Cancel' : 'Add New'}
                  </button>
                </div>

                {/* Add New Address Form Modal/Tray */}
                {showAddAddress && (
                  <form onSubmit={handleAddNewAddress} style={{ background: 'var(--color-surface-card)', border: '1px dashed var(--color-primary)', borderRadius: 'var(--radius-md)', padding: '18px', marginBottom: '18px' }}>
                    <h4 style={{ fontSize: '0.92rem', fontWeight: 800, marginBottom: '12px' }}>Add New Delivery Destination</h4>
                    
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                      {['Home', 'Work', 'Partner', 'Other'].map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setNewAddrType(t)}
                          style={{
                            padding: '6px 14px',
                            borderRadius: 'var(--radius-md)',
                            border: newAddrType === t ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                            background: newAddrType === t ? 'var(--color-primary-light, rgba(255,90,38,0.1))' : 'transparent',
                            color: newAddrType === t ? 'var(--color-primary)' : 'var(--color-text-main)',
                            fontWeight: 700,
                            fontSize: '0.8rem',
                            cursor: 'pointer'
                          }}
                        >
                          {t}
                        </button>
                      ))}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <input
                        type="text"
                        required
                        placeholder="House / Flat No, Street, Building Name *"
                        value={newAddrStreet}
                        onChange={(e) => setNewAddrStreet(e.target.value)}
                        style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', fontSize: '0.88rem' }}
                      />
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                        <input
                          type="text"
                          placeholder="Landmark"
                          value={newAddrLandmark}
                          onChange={(e) => setNewAddrLandmark(e.target.value)}
                          style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', fontSize: '0.88rem' }}
                        />
                        <input
                          type="text"
                          placeholder="City"
                          value={newAddrCity}
                          onChange={(e) => setNewAddrCity(e.target.value)}
                          style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', fontSize: '0.88rem' }}
                        />
                        <input
                          type="text"
                          placeholder="Pincode"
                          value={newAddrPincode}
                          onChange={(e) => setNewAddrPincode(e.target.value)}
                          style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', fontSize: '0.88rem' }}
                        />
                      </div>
                      <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
                        <button type="submit" className="btn btn-primary btn-sm" style={{ fontWeight: 700 }}>
                          Save & Select Address
                        </button>
                        <button type="button" className="btn btn-secondary btn-sm" onClick={() => setShowAddAddress(false)}>
                          Cancel
                        </button>
                      </div>
                    </div>
                  </form>
                )}

                {/* List of Addresses */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {addresses.map((addr) => {
                    const isSelected = selectedAddressId === addr.id;
                    return (
                      <label
                        key={addr.id}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '12px',
                          padding: '16px',
                          borderRadius: 'var(--radius-md)',
                          border: isSelected ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                          background: isSelected ? 'var(--color-primary-light, rgba(255,90,38,0.06))' : 'var(--color-surface-card)',
                          cursor: 'pointer',
                          transition: 'all var(--transition-fast)'
                        }}
                      >
                        <input
                          type="radio"
                          name="delivery_address"
                          checked={isSelected}
                          onChange={() => setSelectedAddressId(addr.id)}
                          style={{ marginTop: '4px', accentColor: 'var(--color-primary)' }}
                        />
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                            <span style={{ fontWeight: 800, fontSize: '0.92rem' }}>
                              <i className={addr.type === 'Home' ? 'fa-solid fa-house' : addr.type === 'Work' ? 'fa-solid fa-briefcase' : 'fa-solid fa-location-dot'} style={{ color: 'var(--color-primary)', marginRight: '6px' }}></i>
                              {addr.type}
                            </span>
                            {addr.isDefault && (
                              <span style={{ fontSize: '0.68rem', fontWeight: 800, background: 'var(--color-success-bg, rgba(16,185,129,0.15))', color: 'var(--color-success)', padding: '2px 6px', borderRadius: '4px' }}>
                                DEFAULT
                              </span>
                            )}
                          </div>
                          <div style={{ fontSize: '0.88rem', color: 'var(--color-text-main)', lineHeight: 1.45 }}>
                            {addr.address}
                          </div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                            {addr.landmark && <span>Landmark: {addr.landmark} • </span>}
                            <span>{addr.city} {addr.pincode ? `- ${addr.pincode}` : ''}</span>
                            {addr.phone && <span style={{ marginLeft: '8px' }}>Phone: {addr.phone}</span>}
                          </div>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* STEP 2: Delivery Preferences & Rider Notes */}
              <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--color-primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                    2
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0 }}>Delivery Instructions</h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', margin: 0 }}>Help the delivery partner complete handoff smoothly</p>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '14px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', background: 'var(--color-surface-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontSize: '0.85rem' }}>
                    <input
                      type="checkbox"
                      checked={leaveAtDoor}
                      onChange={(e) => setLeaveAtDoor(e.target.checked)}
                    />
                    <span style={{ fontWeight: 600 }}>Leave at door</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', background: 'var(--color-surface-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontSize: '0.85rem' }}>
                    <input
                      type="checkbox"
                      checked={dontRingBell}
                      onChange={(e) => setDontRingBell(e.target.checked)}
                    />
                    <span style={{ fontWeight: 600 }}>Do not ring bell</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', background: 'var(--color-surface-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontSize: '0.85rem' }}>
                    <input
                      type="checkbox"
                      checked={leaveWithGuard}
                      onChange={(e) => setLeaveWithGuard(e.target.checked)}
                    />
                    <span style={{ fontWeight: 600 }}>Leave with guard</span>
                  </label>
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Add specific instructions for rider (e.g. Call before coming to 4th floor)"
                    value={customNote}
                    onChange={(e) => setCustomNote(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', background: 'var(--color-surface-card)' }}
                  />
                </div>
              </div>

              {/* STEP 3: Payment Options & Interactive Methods */}
              <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--color-primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                      3
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0 }}>Payment Method</h3>
                      <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', margin: 0 }}>Choose how you'd like to pay for your meal</p>
                    </div>
                  </div>
                </div>

                {/* Payment Option Selector Tabs */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px', marginBottom: '22px' }}>
                  {[
                    { id: 'wallet', label: 'QuickBite Wallet', icon: 'fa-solid fa-wallet', badge: `₹${walletBalance}` },
                    { id: 'upi', label: 'UPI / QR', icon: 'fa-solid fa-qrcode' },
                    { id: 'card', label: 'Credit / Debit Card', icon: 'fa-regular fa-credit-card' },
                    { id: 'netbanking', label: 'Net Banking', icon: 'fa-solid fa-building-columns' },
                    { id: 'cod', label: 'Cash on Delivery', icon: 'fa-solid fa-money-bill-1' }
                  ].map((tab) => {
                    const isTabActive = paymentMethod === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setPaymentMethod(tab.id)}
                        style={{
                          padding: '12px 8px',
                          borderRadius: 'var(--radius-md)',
                          border: isTabActive ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                          background: isTabActive ? 'var(--color-primary-light, rgba(255,90,38,0.1))' : 'var(--color-surface-card)',
                          color: isTabActive ? 'var(--color-primary)' : 'var(--color-text-main)',
                          fontWeight: 700,
                          fontSize: '0.82rem',
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '6px',
                          textAlign: 'center',
                          transition: 'all var(--transition-fast)'
                        }}
                      >
                        <i className={tab.icon} style={{ fontSize: '1.25rem' }}></i>
                        <span>{tab.label}</span>
                        {tab.badge && (
                          <span style={{ fontSize: '0.68rem', fontWeight: 800, background: isTabActive ? 'var(--color-primary)' : 'var(--color-border)', color: isTabActive ? '#fff' : 'var(--color-text-main)', padding: '1px 6px', borderRadius: '4px' }}>
                            {tab.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* METHOD 1: QuickBite Wallet */}
                {paymentMethod === 'wallet' && (
                  <div style={{ background: 'var(--color-surface-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '22px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', marginBottom: '18px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--color-primary-light)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>
                          <i className="fa-solid fa-wallet"></i>
                        </div>
                        <div>
                          <div style={{ fontWeight: 800, fontSize: '1.05rem' }}>QuickBite One-Click Wallet</div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Zero transaction fees • Instant bank refunds</div>
                        </div>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Available Wallet Balance</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 900, color: isWalletSufficient ? 'var(--color-success)' : 'var(--color-danger)' }}>
                          ₹{walletBalance}
                        </div>
                      </div>
                    </div>

                    {isWalletSufficient ? (
                      <div style={{ background: 'var(--color-success-bg, rgba(16,185,129,0.1))', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 'var(--radius-sm)', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem' }}>
                        <i className="fa-solid fa-circle-check" style={{ color: 'var(--color-success)', fontSize: '1.1rem' }}></i>
                        <div>
                          <strong>Ready to Pay!</strong> You have sufficient balance of ₹{walletBalance} to cover ₹{grandTotal}. Remaining balance will be ₹{walletBalance - grandTotal}.
                        </div>
                      </div>
                    ) : (
                      <div style={{ background: 'var(--color-warning-bg, rgba(245,158,11,0.1))', border: '1px solid rgba(245,158,11,0.3)', borderRadius: 'var(--radius-sm)', padding: '14px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', fontSize: '0.88rem' }}>
                          <i className="fa-solid fa-triangle-exclamation" style={{ color: 'var(--color-warning)', fontSize: '1.1rem' }}></i>
                          <span>
                            Wallet balance (₹{walletBalance}) is ₹{grandTotal - walletBalance} short of the total payable (₹{grandTotal}).
                          </span>
                        </div>
                        <button
                          type="button"
                          disabled={isQuickToppingUp}
                          onClick={handleQuickTopUp}
                          className="btn btn-primary btn-sm"
                          style={{ fontWeight: 700 }}
                        >
                          {isQuickToppingUp ? (
                            <span><i className="fa-solid fa-spinner fa-spin"></i> Adding ₹{Math.max(100, Math.ceil(grandTotal - walletBalance))}...</span>
                          ) : (
                            <span><i className="fa-solid fa-bolt"></i> 1-Click Top Up ₹{Math.max(100, Math.ceil(grandTotal - walletBalance))} & Pay</span>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* METHOD 2: UPI / QR */}
                {paymentMethod === 'upi' && (
                  <div style={{ background: 'var(--color-surface-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '22px' }}>
                    
                    {/* Saved UPI VPAs */}
                    {savedUpi.length > 0 && (
                      <div style={{ marginBottom: '18px' }}>
                        <div style={{ fontSize: '0.825rem', fontWeight: 700, marginBottom: '8px' }}>Saved UPI VPAs (1-Tap Selection)</div>
                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                          {savedUpi.map((u) => {
                            const isSelected = selectedUpiVpa === u.vpa;
                            return (
                              <button
                                key={u.id}
                                type="button"
                                onClick={() => {
                                  setSelectedUpiVpa(u.vpa);
                                  setUpiVerified(true);
                                }}
                                style={{
                                  padding: '8px 14px',
                                  borderRadius: 'var(--radius-md)',
                                  border: isSelected ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                                  background: isSelected ? 'var(--color-primary-light, rgba(255,90,38,0.1))' : 'var(--color-surface)',
                                  color: isSelected ? 'var(--color-primary)' : 'var(--color-text-main)',
                                  fontWeight: 700,
                                  fontSize: '0.85rem',
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '8px'
                                }}
                              >
                                <i className="fa-solid fa-circle-check" style={{ color: isSelected ? 'var(--color-primary)' : 'var(--color-text-subtle)' }}></i>
                                <span>{u.vpa}</span>
                                <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>({u.appName})</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Popular UPI Apps Bar */}
                    <div style={{ marginBottom: '18px' }}>
                      <div style={{ fontSize: '0.825rem', fontWeight: 700, marginBottom: '8px' }}>Or Pay via Preferred UPI App</div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px' }}>
                        {[
                          { id: 'Google Pay', label: 'GPay', icon: 'fa-brands fa-google' },
                          { id: 'PhonePe', label: 'PhonePe', icon: 'fa-solid fa-mobile-screen' },
                          { id: 'Paytm', label: 'Paytm', icon: 'fa-solid fa-wallet' },
                          { id: 'BHIM UPI', label: 'BHIM', icon: 'fa-solid fa-indian-rupee-sign' },
                          { id: 'Cred', label: 'Cred UPI', icon: 'fa-solid fa-shield' }
                        ].map((app) => (
                          <button
                            key={app.id}
                            type="button"
                            onClick={() => {
                              setSelectedUpiApp(app.id);
                              setSelectedUpiVpa(`user@ok${app.label.toLowerCase()}`);
                              setUpiVerified(true);
                              showToast(`Switched payment routing to ${app.id}`, 'info');
                            }}
                            style={{
                              padding: '10px 6px',
                              borderRadius: 'var(--radius-sm)',
                              border: selectedUpiApp === app.id ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                              background: selectedUpiApp === app.id ? 'var(--color-primary-light, rgba(255,90,38,0.1))' : 'var(--color-surface)',
                              color: selectedUpiApp === app.id ? 'var(--color-primary)' : 'var(--color-text-main)',
                              fontWeight: 700,
                              fontSize: '0.8rem',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '6px'
                            }}
                          >
                            <i className={app.icon}></i> {app.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* QR Code and Custom VPA Section */}
                    <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '20px', alignItems: 'center', borderTop: '1px solid var(--color-border)', paddingTop: '16px' }}>
                      <div
                        onClick={() => {
                          showToast('Simulating UPI QR scan confirmation...', 'info');
                          setSelectedUpiVpa('quickbite.merchant@hdfcbank');
                          setUpiVerified(true);
                        }}
                        style={{ width: '120px', height: '120px', background: '#fff', borderRadius: 'var(--radius-md)', padding: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--color-border)', cursor: 'pointer', textAlign: 'center' }}
                        title="Click to simulate QR code scan"
                      >
                        <i className="fa-solid fa-qrcode" style={{ fontSize: '3.8rem', color: '#111' }}></i>
                        <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#444', marginTop: '2px' }}>Tap to Scan</span>
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 700, marginBottom: '6px' }}>Enter Custom UPI ID / VPA</label>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <input
                            type="text"
                            placeholder="username@okhdfcbank or 9876543210@paytm"
                            value={customUpiInput || selectedUpiVpa}
                            onChange={(e) => {
                              setCustomUpiInput(e.target.value);
                              setSelectedUpiVpa(e.target.value);
                              setUpiVerified(false);
                            }}
                            style={{ flex: 1, padding: '10px 14px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', fontSize: '0.88rem' }}
                          />
                          <button
                            type="button"
                            onClick={handleVerifyCustomUpi}
                            className="btn btn-secondary btn-sm"
                            style={{ fontWeight: 700, whiteSpace: 'nowrap' }}
                          >
                            {upiVerified ? <span style={{ color: 'var(--color-success)' }}><i className="fa-solid fa-check"></i> Verified</span> : 'Verify ID'}
                          </button>
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '6px' }}>
                          Payment request of ₹{grandTotal} will be pushed to your active UPI app
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* METHOD 3: Credit / Debit Cards */}
                {paymentMethod === 'card' && (
                  <div style={{ background: 'var(--color-surface-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '22px' }}>
                    
                    {/* Toggle Saved Cards vs New Card */}
                    {savedCards.length > 0 && (
                      <div style={{ display: 'flex', gap: '10px', marginBottom: '18px' }}>
                        <button
                          type="button"
                          onClick={() => setUseSavedCard(true)}
                          style={{
                            padding: '8px 16px',
                            borderRadius: 'var(--radius-md)',
                            border: useSavedCard ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                            background: useSavedCard ? 'var(--color-primary-light, rgba(255,90,38,0.1))' : 'transparent',
                            color: useSavedCard ? 'var(--color-primary)' : 'var(--color-text-main)',
                            fontWeight: 700,
                            fontSize: '0.85rem',
                            cursor: 'pointer'
                          }}
                        >
                          <i className="fa-solid fa-credit-card" style={{ marginRight: '6px' }}></i> Saved Cards ({savedCards.length})
                        </button>
                        <button
                          type="button"
                          onClick={() => setUseSavedCard(false)}
                          style={{
                            padding: '8px 16px',
                            borderRadius: 'var(--radius-md)',
                            border: !useSavedCard ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                            background: !useSavedCard ? 'var(--color-primary-light, rgba(255,90,38,0.1))' : 'transparent',
                            color: !useSavedCard ? 'var(--color-primary)' : 'var(--color-text-main)',
                            fontWeight: 700,
                            fontSize: '0.85rem',
                            cursor: 'pointer'
                          }}
                        >
                          <i className="fa-solid fa-plus" style={{ marginRight: '6px' }}></i> Pay with a New Card
                        </button>
                      </div>
                    )}

                    {/* Saved Cards Selection */}
                    {useSavedCard && savedCards.length > 0 ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {savedCards.map((card) => {
                          const isCardSelected = selectedCardId === card.id;
                          return (
                            <label
                              key={card.id}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '14px 18px',
                                borderRadius: 'var(--radius-md)',
                                border: isCardSelected ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                                background: isCardSelected ? 'var(--color-primary-light, rgba(255,90,38,0.06))' : 'var(--color-surface)',
                                cursor: 'pointer'
                              }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                <input
                                  type="radio"
                                  name="saved_card_choice"
                                  checked={isCardSelected}
                                  onChange={() => setSelectedCardId(card.id)}
                                  style={{ accentColor: 'var(--color-primary)' }}
                                />
                                <span style={{ fontSize: '1.5rem', color: card.brand === 'visa' ? '#1a1f71' : '#eb001b' }}>
                                  {card.brand === 'visa' ? <i className="fa-brands fa-cc-visa"></i> : <i className="fa-brands fa-cc-mastercard"></i>}
                                </span>
                                <div>
                                  <div style={{ fontWeight: 800, fontSize: '0.92rem' }}>{card.number}</div>
                                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{card.holder} • Exp: {card.expiry} ({card.bank})</div>
                                </div>
                              </div>

                              {isCardSelected && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-text-muted)' }}>CVV:</label>
                                  <input
                                    type="password"
                                    maxLength="4"
                                    placeholder="•••"
                                    value={savedCardCvv}
                                    onChange={(e) => setSavedCardCvv(e.target.value.replace(/\D/g, ''))}
                                    style={{ width: '65px', padding: '6px 8px', textAlign: 'center', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', fontSize: '0.9rem', fontWeight: 800 }}
                                  />
                                </div>
                              )}
                            </label>
                          );
                        })}
                      </div>
                    ) : (
                      /* New Card Form */
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '4px' }}>Cardholder Name</label>
                          <input
                            type="text"
                            placeholder="Rahul Sharma"
                            value={newCardHolder}
                            onChange={(e) => setNewCardHolder(e.target.value)}
                            style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', fontSize: '0.88rem' }}
                          />
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '4px' }}>Card Number</label>
                          <div style={{ position: 'relative' }}>
                            <input
                              type="text"
                              placeholder="4532 8920 1140 8821"
                              value={newCardNumber}
                              onChange={(e) => handleNewCardNumberChange(e.target.value)}
                              style={{ width: '100%', padding: '10px 14px', paddingRight: '45px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', fontSize: '0.88rem', letterSpacing: '1px' }}
                            />
                            <div style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '1.2rem', color: 'var(--color-primary)' }}>
                              {newCardBrand === 'visa' && <i className="fa-brands fa-cc-visa"></i>}
                              {newCardBrand === 'mastercard' && <i className="fa-brands fa-cc-mastercard"></i>}
                              {newCardBrand === 'rupay' && <span style={{ fontWeight: 900, fontSize: '0.75rem', background: '#0a3a78', color: '#fff', padding: '2px 4px', borderRadius: '3px' }}>RuPay</span>}
                              {newCardBrand === 'amex' && <i className="fa-brands fa-cc-amex"></i>}
                            </div>
                          </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '4px' }}>Valid Thru (MM/YY)</label>
                            <input
                              type="text"
                              placeholder="08/29"
                              maxLength="5"
                              value={newCardExpiry}
                              onChange={(e) => handleNewExpiryChange(e.target.value)}
                              style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', fontSize: '0.88rem' }}
                            />
                          </div>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '4px' }}>CVV</label>
                            <input
                              type="password"
                              placeholder="•••"
                              maxLength="4"
                              value={newCardCvv}
                              onChange={(e) => setNewCardCvv(e.target.value.replace(/\D/g, ''))}
                              style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', fontSize: '0.88rem' }}
                            />
                          </div>
                        </div>

                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.825rem' }}>
                          <input
                            type="checkbox"
                            checked={saveNewCardCheck}
                            onChange={(e) => setSaveNewCardCheck(e.target.checked)}
                          />
                          <span>Save this card securely to your QuickBite account for faster checkouts</span>
                        </label>
                      </div>
                    )}
                  </div>
                )}

                {/* METHOD 4: Net Banking */}
                {paymentMethod === 'netbanking' && (
                  <div style={{ background: 'var(--color-surface-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '22px' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '12px' }}>Popular Banks</div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '18px' }}>
                      {POPULAR_BANKS.map((b) => {
                        const isBankActive = selectedBank === b.name;
                        return (
                          <button
                            key={b.id}
                            type="button"
                            onClick={() => setSelectedBank(b.name)}
                            style={{
                              padding: '12px 10px',
                              borderRadius: 'var(--radius-md)',
                              border: isBankActive ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                              background: isBankActive ? 'var(--color-primary-light, rgba(255,90,38,0.1))' : 'var(--color-surface)',
                              color: isBankActive ? 'var(--color-primary)' : 'var(--color-text-main)',
                              fontWeight: 700,
                              fontSize: '0.85rem',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '8px'
                            }}
                          >
                            <i className="fa-solid fa-building-columns" style={{ color: isBankActive ? 'var(--color-primary)' : 'var(--color-text-subtle)' }}></i>
                            <span>{b.name}</span>
                          </button>
                        );
                      })}
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '4px' }}>All Other Indian Banks</label>
                      <select
                        value={selectedBank}
                        onChange={(e) => setSelectedBank(e.target.value)}
                        style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', fontSize: '0.88rem', background: 'var(--color-surface)' }}
                      >
                        <option value="">-- Select from 50+ Banks --</option>
                        {OTHER_BANKS.map((ob) => (
                          <option key={ob} value={ob}>{ob}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                {/* METHOD 5: Cash / Pay on Delivery */}
                {paymentMethod === 'cod' && (
                  <div style={{ background: 'var(--color-surface-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '22px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                      <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--color-success-bg, rgba(16,185,129,0.15))', color: 'var(--color-success)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>
                        <i className="fa-solid fa-money-bill-wave"></i>
                      </div>
                      <div>
                        <div style={{ fontWeight: 800, fontSize: '1rem' }}>Pay on Delivery Options</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Zero advance payment required</div>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '14px', borderRadius: 'var(--radius-md)', border: codMode === 'cash' ? '2px solid var(--color-primary)' : '1px solid var(--color-border)', background: codMode === 'cash' ? 'var(--color-primary-light, rgba(255,90,38,0.06))' : 'var(--color-surface)', cursor: 'pointer' }}>
                        <input
                          type="radio"
                          name="cod_mode"
                          checked={codMode === 'cash'}
                          onChange={() => setCodMode('cash')}
                          style={{ marginTop: '2px', accentColor: 'var(--color-primary)' }}
                        />
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>Exact Cash</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Keep ₹{grandTotal} cash ready for the rider</div>
                        </div>
                      </label>

                      <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '14px', borderRadius: 'var(--radius-md)', border: codMode === 'upi_on_delivery' ? '2px solid var(--color-primary)' : '1px solid var(--color-border)', background: codMode === 'upi_on_delivery' ? 'var(--color-primary-light, rgba(255,90,38,0.06))' : 'var(--color-surface)', cursor: 'pointer' }}>
                        <input
                          type="radio"
                          name="cod_mode"
                          checked={codMode === 'upi_on_delivery'}
                          onChange={() => setCodMode('upi_on_delivery')}
                          style={{ marginTop: '2px', accentColor: 'var(--color-primary)' }}
                        />
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>Digital UPI at Doorstep</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Scan rider's phone QR upon arrival</div>
                        </div>
                      </label>
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* Right Summary Sidebar */}
            <div>
              <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '28px', boxShadow: 'var(--shadow-sm)', position: 'sticky', top: '100px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>Order Summary</h3>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-text-muted)' }}>
                    {cart.items.length} {cart.items.length === 1 ? 'Item' : 'Items'}
                  </span>
                </div>

                {/* Items Preview */}
                <div style={{ maxHeight: '180px', overflowY: 'auto', marginBottom: '16px', borderBottom: '1px solid var(--color-border)', paddingBottom: '12px' }}>
                  {cart.items.map((i) => (
                    <div key={i.dishId} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.88rem', marginBottom: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', maxWidth: '75%' }}>
                        <span className={`badge-diet ${i.isVeg ? 'veg' : 'non-veg'}`}></span>
                        <span style={{ fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {i.name}
                        </span>
                        <span style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>×{i.quantity}</span>
                      </div>
                      <strong>₹{i.price * i.quantity}</strong>
                    </div>
                  ))}
                </div>

                {/* Bill Amounts */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.875rem', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-muted)' }}>
                    <span>Item Subtotal</span>
                    <span>₹{cartSummary.itemTotal}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-muted)' }}>
                    <span>Delivery Partner Fee</span>
                    <span>{cartSummary.deliveryFee === 0 ? <strong style={{ color: 'var(--color-success)' }}>FREE</strong> : `₹${cartSummary.deliveryFee}`}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-muted)' }}>
                    <span>Packaging & Taxes (5% GST)</span>
                    <span>₹{(cartSummary.packagingFee || 0) + (cartSummary.taxes || 0)}</span>
                  </div>
                  {cartSummary.discount > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-success)', fontWeight: 700 }}>
                      <span>Coupon Discount</span>
                      <span>-₹{cartSummary.discount}</span>
                    </div>
                  )}

                  <div style={{ borderTop: '2px dashed var(--color-border)', paddingTop: '14px', marginTop: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: '1.05rem', fontWeight: 800 }}>Total Payable</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>Inclusive of all taxes & fees</div>
                    </div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--color-primary)' }}>
                      ₹{grandTotal}
                    </div>
                  </div>
                </div>

                {/* Selected Payment Tag */}
                <div style={{ background: 'var(--color-surface-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '8px 12px', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.78rem' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>Payment Mode:</span>
                  <span style={{ fontWeight: 800, color: 'var(--color-primary)', textTransform: 'capitalize' }}>
                    {paymentMethod === 'wallet' ? 'QuickBite Wallet' : paymentMethod === 'upi' ? `UPI (${selectedUpiApp})` : paymentMethod === 'card' ? 'Card Payment' : paymentMethod === 'netbanking' ? selectedBank : 'Cash on Delivery'}
                  </span>
                </div>

                {/* Place Order Button */}
                <button
                  type="button"
                  id="place-order-submit-btn"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                  onClick={handlePlaceOrder}
                  style={{ width: '100%', padding: '14px', fontSize: '1.05rem', fontWeight: 800, borderRadius: 'var(--radius-md)' }}
                >
                  {isSubmitting ? (
                    <span><i className="fa-solid fa-spinner fa-spin"></i> Securing Payment...</span>
                  ) : paymentMethod === 'wallet' ? (
                    <span><i className="fa-solid fa-bolt" style={{ marginRight: '6px' }}></i> Pay ₹{grandTotal} with Wallet</span>
                  ) : paymentMethod === 'cod' ? (
                    <span>Place Order (₹{grandTotal} COD) <i className="fa-solid fa-arrow-right" style={{ marginLeft: '6px' }}></i></span>
                  ) : (
                    <span>Pay ₹{grandTotal} & Place Order <i className="fa-solid fa-arrow-right" style={{ marginLeft: '6px' }}></i></span>
                  )}
                </button>

                <p style={{ textAlign: 'center', fontSize: '0.74rem', color: 'var(--color-text-subtle)', margin: '10px 0 0' }}>
                  Instant refund guarantee in case of kitchen cancellation
                </p>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Payment Processing Overlay Modal */}
      {isSubmitting && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.65)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999
        }}>
          <div style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            padding: '36px',
            maxWidth: '420px',
            width: '90%',
            textAlign: 'center',
            boxShadow: 'var(--shadow-xl)'
          }}>
            {processingStep < 3 ? (
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                border: '4px solid var(--color-primary-light)',
                borderTopColor: 'var(--color-primary)',
                animation: 'spin 1s infinite linear',
                margin: '0 auto 20px'
              }}></div>
            ) : (
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'var(--color-success)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                margin: '0 auto 20px'
              }}>
                <i className="fa-solid fa-check"></i>
              </div>
            )}

            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '8px' }}>
              {processingStep === 1 && 'Contacting Bank Gateway...'}
              {processingStep === 2 && 'Authorizing Payment...'}
              {processingStep === 3 && 'Payment Approved!'}
            </h3>

            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '14px' }}>
              {processingStep === 1 && 'Establishing 256-bit encrypted connection with banking network.'}
              {processingStep === 2 && `Validating payment authorization of ₹${grandTotal}.`}
              {processingStep === 3 && 'Confirmed! Forwarding order to restaurant kitchen...'}
            </p>

            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-subtle)' }}>
              Do not refresh or close this window
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
