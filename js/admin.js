/**
 * QUICKBITE - Admin Module Shared Controller & Helper Library
 * Powers: dashboard.html, customers.html, restaurants.html, orders.html, delivery.html, analytics.html
 */

const AdminUI = {
  init() {
    this.ensureAdminSession();
    this.initTheme();
    this.initMobileSidebar();
    this.updateSidebarBadges();
    this.setupGlobalListeners();
  },

  // Ensure active user is admin or set demo admin
  ensureAdminSession() {
    const user = QuickBiteDB.getCurrentUser();
    if (!user || user.role !== 'admin') {
      const users = QuickBiteDB.getUsers();
      const admin = users.find(u => u.role === 'admin') || {
        id: "usr-admin-1",
        email: "admin@quickbite.com",
        role: "admin",
        name: "Anita Desai (Administrator)",
        phone: "+91 99999 88888",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
      };
      QuickBiteDB.setCurrentUser(admin);
    }
  },

  // Theme management
  initTheme() {
    const saved = QuickBiteDB.getTheme();
    document.documentElement.setAttribute('data-theme', saved);
    this.updateThemeIcon(saved);

    const btn = document.getElementById('theme-toggle-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        const next = QuickBiteDB.toggleTheme();
        this.updateThemeIcon(next);
        QuickBiteDB.showToast(`Switched to ${next === 'dark' ? 'Dark' : 'Light'} Mode`, 'info', 1800);
      });
    }
  },

  updateThemeIcon(theme) {
    const icon = document.getElementById('theme-icon');
    if (icon) {
      icon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    }
  },

  // Mobile sidebar drawer
  initMobileSidebar() {
    const toggleBtn = document.getElementById('mobile-sidebar-toggle');
    const sidebar = document.querySelector('.dash-sidebar');
    let overlay = document.querySelector('.dash-sidebar-overlay');

    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'dash-sidebar-overlay';
      document.body.appendChild(overlay);
    }

    if (toggleBtn && sidebar) {
      toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('mobile-open');
        overlay.classList.toggle('active');
      });

      overlay.addEventListener('click', () => {
        sidebar.classList.remove('mobile-open');
        overlay.classList.remove('active');
      });
    }
  },

  // Sidebar badge counts updated from real LocalStorage data
  updateSidebarBadges() {
    const stats = QuickBiteDB.getAdminStats();
    const ordersBadge = document.getElementById('side-orders-badge');
    const restBadge = document.getElementById('side-restaurants-badge');
    const pendingBadge = document.getElementById('side-pending-badge');
    const customersBadge = document.getElementById('side-customers-badge');
    const fleetBadge = document.getElementById('side-fleet-badge');

    if (ordersBadge) ordersBadge.textContent = stats.totalOrders;
    if (restBadge) restBadge.textContent = stats.totalRestaurants;
    if (pendingBadge) {
      pendingBadge.textContent = stats.pendingRestaurants;
      pendingBadge.style.display = stats.pendingRestaurants > 0 ? 'inline-block' : 'none';
    }
    if (customersBadge) customersBadge.textContent = stats.totalCustomers;
    if (fleetBadge) fleetBadge.textContent = stats.totalDrivers;
  },

  // Global listeners for cross-tab and cross-module updates
  setupGlobalListeners() {
    const refreshBadges = () => this.updateSidebarBadges();
    window.addEventListener('quickbite:orders-updated', refreshBadges);
    window.addEventListener('quickbite:restaurants-updated', refreshBadges);
    window.addEventListener('quickbite:users-updated', refreshBadges);
  },

  // Modal helpers
  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  },

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  },

  // Reset database with prompt
  resetDatabase() {
    if (confirm("Reset QuickBite shared LocalStorage database to original fresh demo state?\nThis will repopulate all customers, restaurants, drivers, and orders.")) {
      localStorage.clear();
      QuickBiteDB.init();
      QuickBiteDB.showToast("Database successfully re-seeded with demo records!", "success");
      setTimeout(() => location.reload(), 700);
    }
  },

  // CSV Export helper
  exportToCSV(filename, rows) {
    if (!rows || !rows.length) {
      QuickBiteDB.showToast("No data available to export", "warning");
      return;
    }
    const separator = ',';
    const keys = Object.keys(rows[0]);
    const csvContent =
      keys.join(separator) +
      '\n' +
      rows.map(row => {
        return keys.map(k => {
          let cell = row[k] === null || row[k] === undefined ? '' : row[k];
          cell = cell instanceof Date ? cell.toLocaleString() : cell.toString().replace(/"/g, '""');
          if (cell.search(/("|,|\n)/g) >= 0) cell = `"${cell}"`;
          return cell;
        }).join(separator);
      }).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    QuickBiteDB.showToast(`Exported ${filename} successfully!`, "success");
  }
};

document.addEventListener('DOMContentLoaded', () => {
  AdminUI.init();
});
