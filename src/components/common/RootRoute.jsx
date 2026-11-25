import React from 'react';
import { Navigate } from 'react-router-dom';
import { useQuickBite } from '../../context/QuickBiteContext.jsx';
import LandingPage from '../../pages/LandingPage.jsx';

/**
 * RootRoute Guard Component
 * 
 * Requirement:
 * When opening http://localhost:3000/ (root path '/'), ensure it starts from signup
 * for the introductory 1-hour time period.
 * 
 * Exception:
 * "if the user forcedly logout leave it"
 * If the user explicitly logged out (isForcedLogout is true), do NOT redirect them back to signup;
 * leave them on the landing page in guest mode.
 * 
 * If a user is already authenticated (currentUser), allow normal landing page access.
 * If the 1-hour period has elapsed, allow normal landing page access.
 */
export default function RootRoute() {
  const { currentUser, signupStatus, db } = useQuickBite();

  // 1. If user is already authenticated (already registered or signed in), show landing page
  if (currentUser) {
    return <LandingPage />;
  }

  // 2. Check if user intentionally/forcedly logged out
  const isForcedLogout = db.isForcedLogout
    ? db.isForcedLogout()
    : (typeof localStorage !== 'undefined' && localStorage.getItem('quickbite_forced_logout') === 'true');

  if (isForcedLogout) {
    // "make this page is default when we logout" -> navigate directly to login page
    return <Navigate to="/login" replace />;
  }

  // 3. Check if the 1-hour signup window is active
  const isSignupActive = signupStatus?.isActive ?? (db.isSignupWindowActive ? db.isSignupWindowActive() : true);

  if (isSignupActive) {
    // Start from signup as requested for the 1-hour period
    return <Navigate to="/signup" replace />;
  }

  // 4. Default / expired window: show normal landing page
  return <LandingPage />;
}
