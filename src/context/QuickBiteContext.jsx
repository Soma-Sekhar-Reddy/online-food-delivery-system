import React, { createContext, useContext, useState, useEffect } from 'react';
import QuickBiteDB from '../services/storage.js';

const QuickBiteContext = createContext(null);

export function QuickBiteProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => QuickBiteDB.getCurrentUser());
  const [theme, setTheme] = useState(() => {
    const t = QuickBiteDB.getTheme();
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', t);
      document.documentElement.style.colorScheme = t;
      if (t === 'dark') {
        document.documentElement.style.backgroundColor = '#090D16';
      } else {
        document.documentElement.style.backgroundColor = '#F8FAFC';
      }
    }
    return t;
  });
  const [cart, setCart] = useState(() => QuickBiteDB.getCart());
  const [orders, setOrders] = useState(() => QuickBiteDB.getOrders());
  const [restaurants, setRestaurants] = useState(() => QuickBiteDB.getRestaurants());
  const [favorites, setFavorites] = useState(() => QuickBiteDB.getFavorites());
  const [wallet, setWallet] = useState(() => QuickBiteDB.getWallet());
  const [savedCards, setSavedCards] = useState(() => QuickBiteDB.getSavedCards());
  const [savedUpi, setSavedUpi] = useState(() => QuickBiteDB.getSavedUpi());
  const [addresses, setAddresses] = useState(() => QuickBiteDB.getAddresses());
  const [deliveryCity, setDeliveryCityState] = useState(() => QuickBiteDB.getDeliveryCity());
  const deliveryCities = QuickBiteDB.getDeliveryCities();

  const changeDeliveryCity = (cityOrId) => {
    const updated = QuickBiteDB.setDeliveryCity(cityOrId);
    setDeliveryCityState(updated);
    showToast(`Delivery location set to: ${updated.name}`, 'info', 3000);
    return updated;
  };
  const [userPreferences, setUserPreferences] = useState(() => QuickBiteDB.getUserPreferences());
  const [activeManagedRestId, setActiveManagedRestId] = useState(() => {
    const user = QuickBiteDB.getCurrentUser();
    return user?.restaurantId || 'rest-1';
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFacultyModalOpen, setIsFacultyModalOpen] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [confirmModalState, setConfirmModalState] = useState(null);
  const [isCustomerLoginModalOpen, setIsCustomerLoginModalOpen] = useState(false);
  const [loginRedirectUrl, setLoginRedirectUrl] = useState('/customer/checkout');

  const promptCustomerLogin = (redirectUrl = '/customer/checkout') => {
    setLoginRedirectUrl(redirectUrl);
    setIsCustomerLoginModalOpen(true);
  };
  const [signupStatus, setSignupStatus] = useState(() => QuickBiteDB.getSignupWindowStatus());

  const openFacultyModal = () => setIsFacultyModalOpen(true);
  const closeFacultyModal = () => setIsFacultyModalOpen(false);

  // Global listener for opening faculty modal from any component or static script
  useEffect(() => {
    const onOpenFaculty = () => setIsFacultyModalOpen(true);
    const onCityUpdated = (e) => setDeliveryCityState(e.detail || QuickBiteDB.getDeliveryCity());
    window.addEventListener('quickbite:open-faculty-modal', onOpenFaculty);
    window.addEventListener('quickbite:delivery-city-updated', onCityUpdated);
    return () => {
      window.removeEventListener('quickbite:open-faculty-modal', onOpenFaculty);
      window.removeEventListener('quickbite:delivery-city-updated', onCityUpdated);
    };
  }, []);

  // Intercept native window.alert to route gracefully through modern toast notifications
  useEffect(() => {
    const originalAlert = window.alert;
    window.alert = (msg) => {
      showToast(String(msg), 'info', 4000);
    };
    return () => {
      window.alert = originalAlert;
    };
  }, []);

  const showConfirmModal = ({
    title = 'Please Confirm',
    message = 'Are you sure you want to proceed?',
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    type = 'warning'
  } = {}) => {
    return new Promise((resolve) => {
      setConfirmModalState({
        isOpen: true,
        title,
        message,
        confirmText,
        cancelText,
        type,
        onConfirm: () => resolve(true),
        onCancel: () => resolve(false)
      });
    });
  };

  const closeConfirmModal = () => {
    setConfirmModalState((prev) => (prev ? { ...prev, isOpen: false } : null));
  };

  // Sync document theme attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.colorScheme = theme;
    if (theme === 'dark') {
      document.documentElement.style.backgroundColor = '#090D16';
    } else {
      document.documentElement.style.backgroundColor = '#F8FAFC';
    }
  }, [theme]);

  // Listen to custom cross-tab & storage events
  useEffect(() => {
    const onAuth = (e) => setCurrentUser(e.detail || QuickBiteDB.getCurrentUser());
    const onCart = (e) => setCart(e.detail || QuickBiteDB.getCart());
    const onOrders = (e) => setOrders(e.detail || QuickBiteDB.getOrders());
    const onRests = () => setRestaurants(QuickBiteDB.getRestaurants());
    const onFavs = (e) => setFavorites(e.detail || QuickBiteDB.getFavorites());
    const onWallet = (e) => setWallet(e.detail || QuickBiteDB.getWallet());
    const onCards = (e) => setSavedCards(e.detail || QuickBiteDB.getSavedCards());
    const onUpi = (e) => setSavedUpi(e.detail || QuickBiteDB.getSavedUpi());
    const onAddresses = (e) => setAddresses(e.detail || QuickBiteDB.getAddresses());
    const onPrefs = (e) => setUserPreferences(e.detail || QuickBiteDB.getUserPreferences());
    const onWindowStatus = () => setSignupStatus(QuickBiteDB.getSignupWindowStatus());

    window.addEventListener('quickbite:auth-changed', onAuth);
    window.addEventListener('quickbite:cart-updated', onCart);
    window.addEventListener('quickbite:orders-updated', onOrders);
    window.addEventListener('quickbite:restaurants-updated', onRests);
    window.addEventListener('quickbite:favorites-updated', onFavs);
    window.addEventListener('quickbite:wallet-updated', onWallet);
    window.addEventListener('quickbite:cards-updated', onCards);
    window.addEventListener('quickbite:upi-updated', onUpi);
    window.addEventListener('quickbite:addresses-updated', onAddresses);
    window.addEventListener('quickbite:preferences-updated', onPrefs);
    window.addEventListener('quickbite:signup-window-updated', onWindowStatus);

    const statusInterval = setInterval(onWindowStatus, 15000);

    return () => {
      window.removeEventListener('quickbite:auth-changed', onAuth);
      window.removeEventListener('quickbite:cart-updated', onCart);
      window.removeEventListener('quickbite:orders-updated', onOrders);
      window.removeEventListener('quickbite:restaurants-updated', onRests);
      window.removeEventListener('quickbite:favorites-updated', onFavs);
      window.removeEventListener('quickbite:wallet-updated', onWallet);
      window.removeEventListener('quickbite:cards-updated', onCards);
      window.removeEventListener('quickbite:upi-updated', onUpi);
      window.removeEventListener('quickbite:addresses-updated', onAddresses);
      window.removeEventListener('quickbite:preferences-updated', onPrefs);
      window.removeEventListener('quickbite:signup-window-updated', onWindowStatus);
      clearInterval(statusInterval);
    };
  }, []);

  const toggleTheme = () => {
    if (typeof document !== 'undefined' && document.body) {
      document.body.classList.add('theme-transitioning');
      setTimeout(() => {
        document.body.classList.remove('theme-transitioning');
      }, 350);
    }
    const next = theme === 'dark' ? 'light' : 'dark';
    QuickBiteDB.setTheme(next);
    setTheme(next);
    showToast(`Switched to ${next === 'dark' ? 'Dark' : 'Light'} Mode`, 'info', 1800);
    return next;
  };

  const showToast = (message, type = 'info', duration = 3200) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const login = (email, pass) => {
    const user = QuickBiteDB.login(email, pass);
    if (user) {
      setCurrentUser(user);
      if (user.restaurantId) setActiveManagedRestId(user.restaurantId);
    }
    return user;
  };

  const logout = () => {
    QuickBiteDB.logout();
    setCurrentUser(null);
  };

  const switchRole = (role) => {
    const users = QuickBiteDB.getUsers();
    let target = users.find((u) => u.role === role);
    if (!target) {
      target = { id: `usr-${role}-demo`, role, name: `Demo ${role.toUpperCase()}`, email: `${role}@quickbite.com` };
    }
    QuickBiteDB.setCurrentUser(target);
    setCurrentUser(target);
    if (target.restaurantId) setActiveManagedRestId(target.restaurantId);
    showToast(`Switched active session to: ${target.name} (${role.toUpperCase()})`, 'success');
    return target;
  };

  const addToCart = async (dishId, quantity = 1) => {
    const dish = QuickBiteDB.getDishById(dishId);
    if (!dish) return false;

    const currentCart = QuickBiteDB.getCart();
    if (currentCart.items && currentCart.items.length > 0) {
      const currentRestId = currentCart.items[0].restaurantId;
      if (currentRestId && currentRestId !== dish.restaurantId) {
        const confirmed = await showConfirmModal({
          title: 'Replace Items in Basket?',
          message: 'Your cart already contains dishes from another restaurant.\nWould you like to reset your basket to add dishes from this restaurant?',
          confirmText: 'Reset & Add Item',
          cancelText: 'Keep Existing Basket',
          type: 'warning'
        });
        if (!confirmed) return false;
        QuickBiteDB.clearCart();
      }
    }

    const success = QuickBiteDB.addToCart(dishId, quantity, true);
    if (success) {
      setCart(QuickBiteDB.getCart());
      if (!currentUser || currentUser.role !== 'customer') {
        showToast(`Added ${dish.name} to cart! (Sign in as customer to order food)`, 'info', 3600);
      }
    }
    return success;
  };

  const updateCartQuantity = (dishId, qty) => {
    QuickBiteDB.updateCartQuantity(dishId, qty);
    setCart(QuickBiteDB.getCart());
  };

  const clearCart = () => {
    QuickBiteDB.clearCart();
    setCart(QuickBiteDB.getCart());
  };

  const applyCoupon = (code) => {
    const success = QuickBiteDB.applyCoupon(code);
    if (success) setCart(QuickBiteDB.getCart());
    return success;
  };

  const removeCoupon = () => {
    QuickBiteDB.removeCoupon();
    setCart(QuickBiteDB.getCart());
  };

  const toggleFavorite = (restId) => {
    const res = QuickBiteDB.toggleFavorite(restId);
    setFavorites(QuickBiteDB.getFavorites());
    return res;
  };

  const topUpWallet = (amount, source = 'UPI') => {
    const res = QuickBiteDB.addWalletMoney(amount, source);
    if (res) setWallet(QuickBiteDB.getWallet());
    return res;
  };

  const deductWallet = (amount, orderId) => {
    const res = QuickBiteDB.deductWalletMoney(amount, orderId);
    if (res) setWallet(QuickBiteDB.getWallet());
    return res;
  };

  const saveCard = (cardData) => {
    const res = QuickBiteDB.saveCard(cardData);
    if (res) setSavedCards(QuickBiteDB.getSavedCards());
    return res;
  };

  const removeCard = (cardId) => {
    const res = QuickBiteDB.removeCard(cardId);
    setSavedCards(QuickBiteDB.getSavedCards());
    return res;
  };

  const setDefaultCard = (cardId) => {
    const res = QuickBiteDB.setDefaultCard(cardId);
    setSavedCards(QuickBiteDB.getSavedCards());
    return res;
  };

  const saveUpi = (vpa, appName) => {
    const res = QuickBiteDB.saveUpi(vpa, appName);
    if (res) setSavedUpi(QuickBiteDB.getSavedUpi());
    return res;
  };

  const removeUpi = (upiId) => {
    const res = QuickBiteDB.removeUpi(upiId);
    setSavedUpi(QuickBiteDB.getSavedUpi());
    return res;
  };

  const setDefaultUpi = (upiId) => {
    const res = QuickBiteDB.setDefaultUpi(upiId);
    setSavedUpi(QuickBiteDB.getSavedUpi());
    return res;
  };

  const saveAddress = (addressData) => {
    const res = QuickBiteDB.saveAddress(addressData);
    setAddresses(QuickBiteDB.getAddresses());
    return res;
  };

  const removeAddress = (addressId) => {
    const res = QuickBiteDB.removeAddress(addressId);
    setAddresses(QuickBiteDB.getAddresses());
    return res;
  };

  const setDefaultAddress = (addressId) => {
    const res = QuickBiteDB.setDefaultAddress(addressId);
    setAddresses(QuickBiteDB.getAddresses());
    return res;
  };

  const saveUserPreferences = (newPrefs) => {
    const res = QuickBiteDB.saveUserPreferences(newPrefs);
    setUserPreferences(QuickBiteDB.getUserPreferences());
    return res;
  };

  const changePassword = (currentPass, newPass) => {
    return QuickBiteDB.changePassword(currentPass, newPass);
  };

  const cartSummary = QuickBiteDB.getCartSummary();

  const value = {
    currentUser,
    setCurrentUser,
    theme,
    toggleTheme,
    cart,
    cartSummary,
    orders,
    restaurants,
    favorites,
    wallet,
    savedCards,
    savedUpi,
    addresses,
    deliveryCity,
    setDeliveryCity: changeDeliveryCity,
    changeDeliveryCity,
    deliveryCities,
    userPreferences,
    topUpWallet,
    deductWallet,
    saveCard,
    removeCard,
    setDefaultCard,
    saveUpi,
    removeUpi,
    setDefaultUpi,
    saveAddress,
    removeAddress,
    setDefaultAddress,
    saveUserPreferences,
    changePassword,
    activeManagedRestId,
    setActiveManagedRestId,
    isCartOpen,
    setIsCartOpen,
    isFacultyModalOpen,
    setIsFacultyModalOpen,
    openFacultyModal,
    closeFacultyModal,
    toasts,
    showToast,
    removeToast,
    confirmModalState,
    showConfirmModal,
    closeConfirmModal,
    isCustomerLoginModalOpen,
    setIsCustomerLoginModalOpen,
    loginRedirectUrl,
    setLoginRedirectUrl,
    promptCustomerLogin,
    login,
    logout,
    switchRole,
    addToCart,
    updateCartQuantity,
    clearCart,
    applyCoupon,
    removeCoupon,
    toggleFavorite,
    signupStatus,
    resetSignupWindow: (mins) => QuickBiteDB.resetSignupWindow(mins),
    expireSignupWindow: () => QuickBiteDB.expireSignupWindow(),
    setForcedLogout: (flag) => QuickBiteDB.setForcedLogout(flag),
    db: QuickBiteDB
  };

  return (
    <QuickBiteContext.Provider value={value}>
      {children}
    </QuickBiteContext.Provider>
  );
}

export function useQuickBite() {
  const ctx = useContext(QuickBiteContext);
  if (!ctx) throw new Error('useQuickBite must be used within QuickBiteProvider');
  return ctx;
}
