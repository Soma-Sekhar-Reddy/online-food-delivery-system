# QuickBite - Hyper-Local Food Delivery Platform

A full-stack food delivery Single Page Application (SPA) built with **React 18**, **Vite**, **React Router v6**, and a **LocalStorage-driven state engine**. QuickBite features hyper-local multi-city delivery (Hyderabad, Bangalore, Mumbai, Delhi NCR/Gurugram, Pune, Chennai), dynamic distance calculations, 4 specialized role-based post-login dashboards, and complete client-side persistence.

---

## 1. React Project - VS Code

### How to Open & Run in VS Code:
1. Open **VS Code**.
2. Go to **File -> Open Folder...** and select this project directory (`Front/`).
3. Open the integrated terminal in VS Code (`Ctrl + \`` or `Cmd + \``).
4. Install dependencies (if not already installed):
   ```bash
   npm install
   ```
5. Start the local development server:
   ```bash
   npm run dev
   ```
6. Open your browser at the displayed local URL (typically **`http://localhost:5173`**).
7. To build the production bundle:
   ```bash
   npm run build
   ```
   The optimized production bundle is generated in the **`dist/`** directory.

### Project Architecture & Folder Structure:
```
Front/
├── .vscode/               # VS Code workspace settings & recommended extensions
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── common/        # CitySelectorModal, ConfirmModal, ToastContainer, etc.
│   │   └── layout/        # Navbar, Footer, CartDrawer, DemoRoleBar
│   ├── context/           # QuickBiteContext.jsx (global app state & event hub)
│   ├── pages/             # Route pages grouped by user role
│   │   ├── admin/         # Admin Console (Dashboard, Orders, Restaurants, Analytics)
│   │   ├── customer/      # Customer Portal (Restaurants, Menu, Cart, Checkout, Orders, Tracking, Profile)
│   │   ├── delivery/      # Fleet Partner (HUD Dashboard, Active Deliveries & Routes)
│   │   ├── restaurant/    # Kitchen Partner (Kitchen Dashboard, Orders, Dish Catalog, Analytics)
│   │   ├── LandingPage.jsx# Public landing page with city-filtered discovery
│   │   ├── LoginPage.jsx  # Multi-persona interactive login with autofill
│   │   └── RegisterPage.jsx# Role-based user registration
│   ├── services/
│   │   └── storage.js     # QuickBiteStorageManager (LocalStorage database engine)
│   ├── App.jsx            # Central React Router route definitions
│   └── main.jsx           # React DOM root entry point
├── vercel.json            # Vercel SPA deployment configuration with rewrite rules
├── package.json           # Dependencies and scripts (Vite, React 18, React Router v6)
└── vite.config.js         # Vite build configuration
```

---

## 2. Browser Login & Signup with Local Storage

### A. How Authentication Works with Local Storage
All authentication, users directory, and session states are managed client-side in the browser's `localStorage` via `src/services/storage.js`:
- **`quickbite_users`**: Array of registered user accounts. Seeded with 4 default demo accounts and updated dynamically when a new user registers on `/signup`.
- **`quickbite_current_user`**: Contains the JSON object of the currently logged-in user. Automatically restored on page refresh or browser restart.
- **`quickbite:auth-changed`**: Cross-component reactive event ensuring the entire UI (Navbar, Drawer, Role Bar) updates without needing manual page reloads.

### B. Pre-Configured Demo Accounts (1-Click Autofill on Login Page):
| Role | Email | Password | Assigned Dashboard |
| :--- | :--- | :--- | :--- |
| **Customer** | `customer@quickbite.com` | `password123` | Customer Portal (`/customer/restaurants`) |
| **Restaurant Partner** | `owner1@quickbite.com` | `password123` | Kitchen Dashboard (`/restaurant/dashboard`) |
| **Delivery Rider** | `driver@quickbite.com` | `password123` | Fleet Dashboard (`/delivery/dashboard`) |
| **Admin Superuser** | `admin@quickbite.com` | `admin123` | Admin Super-Console (`/admin/dashboard`) |

### C. Where to Inspect Local Storage in Your Browser:
1. Open the app in **Google Chrome**, **Microsoft Edge**, or **Brave**.
2. Press **`F12`** (or right-click anywhere and click **Inspect**) to open **DevTools**.
3. Navigate to the **Application** tab (in Firefox: **Storage** tab).
4. In the left sidebar, expand **Storage -> Local Storage -> `http://localhost:5173`**.
5. Key values you will see:
   - `quickbite_users`: View the list of all registered users (including any newly signed-up accounts).
   - `quickbite_current_user`: View the active session user object.
   - `quickbite_orders`: All live and completed orders.
   - `quickbite_delivery_city`: Currently active delivery city & locality.

---

## 3. Post-Login Dashboards

Depending on the role of the user logging in (or via the **DemoRoleBar** at the very top of the screen), QuickBite routes directly to a dedicated dashboard:

### 1. Customer Portal & Dashboard
- **Discovery & Restaurants (`/customer/restaurants`)**: Explore restaurants filtered by your chosen delivery city with unique verified distances and addresses.
- **My Orders Dashboard (`/customer/orders`)**: View active live orders, order tracking timelines, past orders, and 1-click reordering.
- **Customer Profile & Addresses (`/customer/profile`)**: Manage delivery addresses, phone number, and QuickBite wallet.

### 2. Restaurant Kitchen Dashboard (`/restaurant/dashboard`)
- **Key Metrics**: Today's orders count, daily revenue, active kitchen orders, and average ticket size.
- **Kitchen Order Pipeline (`/restaurant/orders`)**: Live order status transitions (`New Order` -> `Accepted` -> `Preparing Food` -> `Ready for Pickup`).
- **Dish & Menu Management (`/restaurant/menu`)**: Add/edit dishes, update pricing, and toggle in-stock availability.
- **Kitchen Analytics (`/restaurant/analytics`)**: Revenue graphs, hourly order volume, and top-selling dishes.

### 3. Delivery Rider Dashboard (`/delivery/dashboard`)
- **Fleet HUD**: Online/offline toggle, today's completed deliveries, cash collected, and delivery ratings.
- **Active Deliveries (`/delivery/deliveries`)**: Live interactive route map, pickup restaurant address, customer destination address, and status update actions (`Order Picked Up`, `Out for Delivery`, `Delivered`).

### 4. Admin Super-Console (`/admin/dashboard`)
- **Platform Overview**: Gross Merchandise Value (GMV), total active orders across all cities, active fleet riders, and platform commission.
- **Management Portals**:
  - `/admin/orders`: Live global order feed.
  - `/admin/restaurants`: Restaurant partner approval & verification.
  - `/admin/delivery`: Active delivery rider assignments.
  - `/admin/customers`: Customer database management.
  - `/admin/analytics`: Platform growth, revenue, and order velocity charts.

---

## 4. GitHub Pages & Vercel Deployment

### A. Deploy to GitHub / GitLab (Git Setup)
If this workspace is not already a Git repository, initialize it and link it to an empty GitHub repository:

```bash
# 1. Check git status
git status

# 2. Stage and commit files
git add .
git commit -m "Initial commit: QuickBite React App with Multi-Role Dashboards & LocalStorage Auth"

# 3. Create a new empty repository on github.com (e.g. 'quickbite-react')

# 4. Link your local repo to GitHub (replace with your repo URL):
git remote add origin https://github.com/YOUR_USERNAME/quickbite-react.git

# 5. Rename default branch to main and push:
git branch -M main
git push -u origin main
```

### B. Deploy to GitHub Pages
The GitHub Actions workflow builds the app and deploys it to GitHub Pages on every push to `main`. It configures the Vite asset base path for the repository and preserves React Router routes on refresh.

1. Push this project to a GitHub repository using the Git setup steps above.
2. Before the first deployment, open **Settings -> Pages** and set the source to **GitHub Actions**. The workflow cannot change this repository setting itself.
3. Push to `main` or run **Actions -> Deploy to GitHub Pages -> Run workflow**.
4. Find the published URL in the workflow run or under **Settings -> Pages**.

### C. Deploy to Vercel (1-Click & Zero-Config)
The project includes a ready-to-use **`vercel.json`** configured with SPA rewrite rules to ensure client-side routing works on all routes (`/customer/restaurants`, `/restaurant/dashboard`, etc.) without 404 errors.

#### Option 1: Via Vercel Web Dashboard (Recommended)
1. Go to **[vercel.com](https://vercel.com)** and sign in with your GitHub account.
2. Click **"Add New..." -> "Project"**.
3. Import your **`quickbite-react`** GitHub repository.
4. Vercel will automatically detect **Vite**:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **"Deploy"**.
6. Within ~30 seconds, Vercel will provide your live URL (e.g., `https://quickbite-react.vercel.app`).

#### Option 2: Via Vercel CLI (Direct from Terminal)
1. In your terminal, run:
   ```bash
   npx vercel
   ```
2. Follow the interactive prompts (Accept defaults).
3. For production deployment:
   ```bash
   npx vercel --prod
   ```
4. Click the output URL to view the live app in your browser!
