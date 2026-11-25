import React, { useState, useMemo } from 'react';
import RestaurantLayout from '../../components/layout/RestaurantLayout';
import { useQuickBite } from '../../context/QuickBiteContext';

export default function RestaurantMenu() {
  const { restaurants, activeManagedRestId, db, showToast, showConfirmModal } = useQuickBite();

  const activeRest = restaurants.find((r) => r.id === activeManagedRestId) || restaurants[0] || {};
  const [dishes, setDishes] = useState(() => db.getDishesByRestaurant(activeRest.id));
  const [selectedCat, setSelectedCat] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDish, setEditingDish] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Main Course',
    price: '',
    description: '',
    image: '',
    isVeg: true,
    isBestseller: false,
    isAvailable: true
  });

  const refreshDishes = () => {
    setDishes(db.getDishesByRestaurant(activeRest.id));
  };

  const categories = useMemo(() => {
    const set = new Set();
    dishes.forEach((d) => {
      if (d.category) set.add(d.category);
    });
    return ['All', ...Array.from(set)];
  }, [dishes]);

  const filteredDishes = useMemo(() => {
    return dishes.filter((d) => {
      if (selectedCat !== 'All' && d.category !== selectedCat) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return d.name.toLowerCase().includes(q) || (d.description || '').toLowerCase().includes(q);
      }
      return true;
    });
  }, [dishes, selectedCat, searchQuery]);

  const handleOpenAdd = () => {
    setEditingDish(null);
    setFormData({
      name: '',
      category: 'Main Course',
      price: '',
      description: '',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80',
      isVeg: true,
      isBestseller: false,
      isAvailable: true
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (dish) => {
    setEditingDish(dish);
    setFormData({
      name: dish.name,
      category: dish.category || 'Main Course',
      price: dish.price,
      description: dish.description || '',
      image: dish.image || '',
      isVeg: Boolean(dish.isVeg),
      isBestseller: Boolean(dish.isBestseller),
      isAvailable: dish.isAvailable !== false
    });
    setIsModalOpen(true);
  };

  const handleSaveDish = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) {
      showToast('Please provide dish name and price', 'error');
      return;
    }

    if (editingDish) {
      // Update
      db.updateDish(editingDish.id, {
        ...formData,
        price: Number(formData.price)
      });
      showToast(`Updated dish: ${formData.name}`, 'success');
    } else {
      // Add
      db.addDish({
        restaurantId: activeRest.id,
        ...formData,
        price: Number(formData.price)
      });
      showToast(`Added new dish: ${formData.name}`, 'success');
    }

    setIsModalOpen(false);
    refreshDishes();
  };

  const handleDeleteDish = async (dishId, dishName) => {
    const confirmed = await showConfirmModal({
      title: 'Delete Menu Dish?',
      message: `Are you sure you want to remove "${dishName}" from your active restaurant menu?`,
      confirmText: 'Delete Dish',
      cancelText: 'Cancel',
      type: 'danger'
    });
    if (confirmed) {
      db.deleteDish(dishId);
      showToast(`Deleted ${dishName}`, 'info');
      refreshDishes();
    }
  };

  const handleToggleAvailable = (dish) => {
    const next = !dish.isAvailable;
    db.updateDish(dish.id, { isAvailable: next });
    showToast(`${dish.name} marked as ${next ? 'Available' : 'Sold Out'}`, 'info');
    refreshDishes();
  };

  return (
    <RestaurantLayout title="Menu Catalog" subtitle={`Manage food dishes, pricing, and availability for ${activeRest.name}`}>
      {/* Action Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', gap: '8px', background: 'var(--color-surface)', padding: '6px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', flexWrap: 'wrap' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCat(cat)}
              style={{
                padding: '8px 14px',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                background: selectedCat === cat ? 'var(--color-primary)' : 'transparent',
                color: selectedCat === cat ? '#fff' : 'var(--color-text-main)',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div className="c-search-box" style={{ width: '220px' }}>
            <i className="fa-solid fa-magnifying-glass" style={{ color: 'var(--color-primary)' }}></i>
            <input
              type="text"
              placeholder="Search dish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <button
            type="button"
            className="btn btn-primary"
            onClick={handleOpenAdd}
            style={{ fontWeight: 700, whiteSpace: 'nowrap' }}
          >
            <i className="fa-solid fa-plus"></i> Add New Dish
          </button>
        </div>
      </div>

      {/* Dishes Cards Grid */}
      {filteredDishes.length === 0 ? (
        <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '60px 20px', textAlign: 'center' }}>
          <i className="fa-solid fa-utensils" style={{ fontSize: '3rem', color: 'var(--color-text-muted)', marginBottom: '14px' }}></i>
          <h3>No dishes found</h3>
          <p style={{ color: 'var(--color-text-muted)', marginTop: '4px' }}>Add a new dish to this restaurant's food menu.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
          {filteredDishes.map((d) => (
            <div
              key={d.id}
              style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                opacity: d.isAvailable === false ? 0.6 : 1
              }}
            >
              <div style={{ position: 'relative', height: '170px' }}>
                <img
                  src={d.image}
                  alt={d.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80';
                  }}
                />
                <span
                  className={`badge-diet ${d.isVeg ? 'veg' : 'non-veg'}`}
                  style={{ position: 'absolute', top: '12px', left: '12px', background: '#fff', borderRadius: '4px', padding: '2px' }}
                ></span>
                {d.isBestseller && (
                  <span style={{ position: 'absolute', top: '12px', right: '12px', background: 'var(--color-warning)', color: '#000', fontSize: '0.7rem', fontWeight: 800, padding: '3px 8px', borderRadius: '4px' }}>
                    ★ BESTSELLER
                  </span>
                )}
                {d.isAvailable === false && (
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '1rem', textTransform: 'uppercase' }}>
                    SOLD OUT
                  </div>
                )}
              </div>

              <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 800 }}>{d.name}</h3>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-primary)' }}>₹{d.price}</div>
                  </div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
                    {d.category || 'Main Course'}
                  </span>
                  <p style={{ fontSize: '0.825rem', color: 'var(--color-text-muted)', marginTop: '6px', lineHeight: 1.4 }}>
                    {d.description}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '16px', borderTop: '1px solid var(--color-border)', paddingTop: '12px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 700 }}>
                    <input
                      type="checkbox"
                      checked={d.isAvailable !== false}
                      onChange={() => handleToggleAvailable(d)}
                    />
                    <span>{d.isAvailable !== false ? 'In Stock' : 'Sold Out'}</span>
                  </label>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => handleOpenEdit(d)}
                      title="Edit dish"
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleDeleteDish(d.id, d.name)}
                      title="Delete dish"
                    >
                      <i className="fa-regular fa-trash-can"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Dish Modal */}
      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', padding: '28px', maxWidth: '520px', width: '100%', maxHeight: '90vh', overflowY: 'auto', boxShadow: 'var(--shadow-lg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>
                {editingDish ? 'Edit Dish Details' : 'Add New Dish to Menu'}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                style={{ background: 'none', border: 'none', fontSize: '1.3rem', cursor: 'pointer', color: 'var(--color-text-muted)' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveDish} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>Dish Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Hyderabadi Special Dum Biryani"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', fontSize: '0.9rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', fontSize: '0.9rem' }}
                  >
                    <option value="Biryani">Biryani</option>
                    <option value="Main Course">Main Course</option>
                    <option value="Starters">Starters</option>
                    <option value="Breads">Breads</option>
                    <option value="Desserts">Desserts</option>
                    <option value="Beverages">Beverages</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>Price (₹) *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    placeholder="350"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', fontSize: '0.9rem' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>Description</label>
                <textarea
                  rows="3"
                  placeholder="Fresh ingredients, tender spices and aromatic flavor..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', fontSize: '0.875rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>Image URL</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', fontSize: '0.9rem' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 700 }}>
                  <input
                    type="checkbox"
                    checked={formData.isVeg}
                    onChange={(e) => setFormData({ ...formData, isVeg: e.target.checked })}
                  />
                  <span>Vegetarian</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 700 }}>
                  <input
                    type="checkbox"
                    checked={formData.isBestseller}
                    onChange={(e) => setFormData({ ...formData, isBestseller: e.target.checked })}
                  />
                  <span>Mark as Bestseller</span>
                </label>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  style={{ flex: 1 }}
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ flex: 1 }}
                >
                  {editingDish ? 'Save Changes' : 'Create Dish'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </RestaurantLayout>
  );
}
