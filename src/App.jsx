import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Common Layout Overlays
import ToastContainer from './components/common/ToastContainer';
import ConfirmModal from './components/common/ConfirmModal';
import CustomerLoginModal from './components/common/CustomerLoginModal';
import FacultySimulationBar from './components/common/FacultySimulationBar';
import DemoRoleBar from './components/layout/DemoRoleBar';
import CartDrawer from './components/layout/CartDrawer';

// General & Auth Pages
import RootRoute from './components/common/RootRoute';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Customer Module Pages
import RestaurantsPage from './pages/customer/RestaurantsPage';
import MenuPage from './pages/customer/MenuPage';
import CartPage from './pages/customer/CartPage';
import CheckoutPage from './pages/customer/CheckoutPage';
import CustomerOrdersPage from './pages/customer/OrdersPage';
import TrackingPage from './pages/customer/TrackingPage';
import ProfilePage from './pages/customer/ProfilePage';

// Restaurant Module Pages
import RestaurantDashboard from './pages/restaurant/DashboardPage';
import RestaurantOrders from './pages/restaurant/OrdersPage';
import RestaurantMenu from './pages/restaurant/MenuPage';
import RestaurantAnalytics from './pages/restaurant/AnalyticsPage';

// Delivery Module Pages
import DeliveryDashboard from './pages/delivery/DashboardPage';
import DeliveriesPage from './pages/delivery/DeliveriesPage';

// Admin Module Pages
import AdminDashboard from './pages/admin/DashboardPage';
import AdminCustomers from './pages/admin/CustomersPage';
import AdminRestaurants from './pages/admin/RestaurantsPage';
import AdminOrders from './pages/admin/OrdersPage';
import AdminDelivery from './pages/admin/DeliveryPage';
import AdminAnalytics from './pages/admin/AnalyticsPage';

export default function App() {
  return (
    <>
      {/* 1-Click Multi-Role Switcher Demo Bar at the top */}
      <DemoRoleBar />

      {/* Global Slide-Over Cart Drawer */}
      <CartDrawer />

      {/* Global Notification Toast Container */}
      <ToastContainer />

      {/* Global Interactive Confirmation & Alert Modal */}
      <ConfirmModal />

      {/* Global Customer Login Gate Modal for Ordering */}
      <CustomerLoginModal />

      {/* Guided 4-Step Faculty Simulation Flow Controller */}
      <FacultySimulationBar />

      {/* Application Routing Map */}
      <Routes>
        {/* Landing & Authentication */}
        <Route path="/" element={<RootRoute />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Customer Module Routes */}
        <Route path="/customer/restaurants" element={<RestaurantsPage />} />
        <Route path="/customer/menu" element={<MenuPage />} />
        <Route path="/customer/cart" element={<CartPage />} />
        <Route path="/customer/checkout" element={<CheckoutPage />} />
        <Route path="/customer/orders" element={<CustomerOrdersPage />} />
        <Route path="/customer/tracking" element={<TrackingPage />} />
        <Route path="/customer/profile" element={<ProfilePage />} />

        {/* Restaurant Partner Module Routes */}
        <Route path="/restaurant/dashboard" element={<RestaurantDashboard />} />
        <Route path="/restaurant/orders" element={<RestaurantOrders />} />
        <Route path="/restaurant/menu" element={<RestaurantMenu />} />
        <Route path="/restaurant/analytics" element={<RestaurantAnalytics />} />

        {/* Delivery Fleet Partner Routes */}
        <Route path="/delivery/dashboard" element={<DeliveryDashboard />} />
        <Route path="/delivery/deliveries" element={<DeliveriesPage />} />

        {/* Admin Super Console Routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/customers" element={<AdminCustomers />} />
        <Route path="/admin/restaurants" element={<AdminRestaurants />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/delivery" element={<AdminDelivery />} />
        <Route path="/admin/analytics" element={<AdminAnalytics />} />

        {/* Catch-all fallback redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
