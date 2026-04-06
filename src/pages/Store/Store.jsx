import React, { useState } from 'react';
import './Store.css';

const PRODUCTS = [
  { id: 1, name: 'GSA Pro Goggles', price: 250, category: 'Accessories', emoji: '🥽', desc: 'Anti-fog UV protection racing goggles' },
  { id: 2, name: 'Elite Swim Cap', price: 150, category: 'Accessories', emoji: '🏊', desc: 'Silicone hydrodynamic cap for speed' },
  { id: 3, name: 'Academy Racing Jammer', price: 450, category: 'Swimwear', emoji: '🩱', desc: 'Compression fit for competitive racing' },
  { id: 4, name: 'Academy One-Piece', price: 500, category: 'Swimwear', emoji: '👙', desc: 'Professional training one-piece suit' },
  { id: 5, name: 'Microfiber Dry Towel', price: 200, category: 'Gear', emoji: '🏖️', desc: 'Quick-dry ultra-absorbent microfiber' },
  { id: 6, name: 'Pro Kickboard', price: 180, category: 'Gear', emoji: '🏄', desc: 'Lightweight EVA foam training board' },
  { id: 7, name: 'Pull Buoy Float', price: 160, category: 'Gear', emoji: '🫧', desc: 'Figure-8 pull buoy for upper body training' },
  { id: 8, name: 'Swim Fins', price: 320, category: 'Accessories', emoji: '🐟', desc: 'Short blade fins for kick power training' },
];

const CATEGORIES = ['All', 'Swimwear', 'Accessories', 'Gear'];

const Store = () => {
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [addedId, setAddedId] = useState(null);
  const [formData, setFormData] = useState({ name: '', phone: '', location: '' });
  const [orderSent, setOrderSent] = useState(false);

  const filteredProducts = activeCategory === 'All'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeCategory);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  const updateQty = (id, delta) => {
    setCart(prev =>
      prev.map(i => i.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i)
          .filter(i => i.qty > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const totalItems = cart.reduce((s, i) => s + i.qty, 0);
  const totalPrice = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const submitOrder = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    let msg = `🏊‍♂️ *طلب جديد - Golden Swimming Academy*\n\n`;
    msg += `👤 *بيانات العميل:*\n`;
    msg += `• الاسم: ${formData.name}\n`;
    msg += `• الموبايل: ${formData.phone}\n`;
    msg += `• العنوان: ${formData.location}\n\n`;
    msg += `🛒 *المنتجات:*\n`;
    cart.forEach((item, idx) => {
      msg += `${idx + 1}. ${item.name} × ${item.qty} = EGP ${(item.price * item.qty).toFixed(0)}\n`;
    });
    msg += `\n💰 *الإجمالي: EGP ${totalPrice.toFixed(0)}*`;

    const whatsappNumber = '201203333204';
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');

    setOrderSent(true);
    setTimeout(() => {
      setCart([]);
      setCheckoutOpen(false);
      setCartOpen(false);
      setFormData({ name: '', phone: '', location: '' });
      setOrderSent(false);
    }, 2000);
  };

  return (
    <div className="store-page">
      {/* Header */}
      <div className="store-header">
        <div className="container">
          <p className="store-eyebrow">Official Merchandise</p>
          <h1 className="store-title">ACADEMY <span className="highlight">STORE</span></h1>
          <p className="store-subtitle">Gear up with official Golden Swimming Academy equipment</p>

          {/* Category Filter */}
          <div className="category-filters">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`cat-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container store-container">
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <span className="product-emoji">{product.emoji}</span>
                <span className="product-category-tag">{product.category}</span>
              </div>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-desc">{product.desc}</p>
                <div className="product-footer">
                  <span className="product-price">EGP {product.price}</span>
                  <button
                    className={`btn-add-to-cart ${addedId === product.id ? 'added' : ''}`}
                    onClick={() => addToCart(product)}
                  >
                    {addedId === product.id ? '✓ Added!' : '+ Add'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Cart Button */}
      <button className="floating-cart" onClick={() => setCartOpen(true)}>
        🛒
        {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
      </button>

      {/* Cart Side Panel */}
      {cartOpen && (
        <div className="cart-overlay" onClick={() => setCartOpen(false)}>
          <div className="cart-panel" onClick={e => e.stopPropagation()}>
            <div className="cart-panel-header">
              <h2>🛒 Your Cart</h2>
              <button className="btn-close" onClick={() => setCartOpen(false)}>✕</button>
            </div>

            {cart.length === 0 ? (
              <div className="cart-empty">
                <span>🛒</span>
                <p>Your cart is empty</p>
                <small>Add products from the store</small>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map(item => (
                    <div key={item.id} className="cart-item">
                      <span className="cart-item-emoji">{item.emoji}</span>
                      <div className="cart-item-info">
                        <p className="cart-item-name">{item.name}</p>
                        <p className="cart-item-price">EGP {item.price}</p>
                      </div>
                      <div className="qty-control">
                        <button onClick={() => updateQty(item.id, -1)}>−</button>
                        <span>{item.qty}</span>
                        <button onClick={() => updateQty(item.id, +1)}>+</button>
                      </div>
                      <button className="btn-remove" onClick={() => removeFromCart(item.id)}>✕</button>
                    </div>
                  ))}
                </div>

                <div className="cart-footer">
                  <div className="cart-total">
                    <span>Total</span>
                    <strong>EGP {totalPrice.toFixed(0)}</strong>
                  </div>
                  <button
                    className="btn-checkout"
                    onClick={() => { setCartOpen(false); setCheckoutOpen(true); }}
                  >
                    Proceed to Order 🚀
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {checkoutOpen && (
        <div className="modal-overlay" onClick={() => setCheckoutOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            {orderSent ? (
              <div className="order-success">
                <span>✅</span>
                <h2>Order Sent!</h2>
                <p>WhatsApp is opening with your order details...</p>
              </div>
            ) : (
              <>
                <div className="modal-header">
                  <h2>Complete Your Order</h2>
                  <button className="btn-close" onClick={() => setCheckoutOpen(false)}>✕</button>
                </div>

                {/* Order Summary */}
                <div className="order-summary">
                  {cart.map(item => (
                    <div key={item.id} className="summary-item">
                      <span>{item.emoji} {item.name} × {item.qty}</span>
                      <span>EGP {(item.price * item.qty).toFixed(0)}</span>
                    </div>
                  ))}
                  <div className="summary-total">
                    <strong>Total</strong>
                    <strong>EGP {totalPrice.toFixed(0)}</strong>
                  </div>
                </div>

                {/* Form */}
                <form className="checkout-form" onSubmit={submitOrder}>
                  <h3>Your Details</h3>

                  <div className="form-group">
                    <label>👤 Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g. Ahmed Mohamed"
                    />
                  </div>

                  <div className="form-group">
                    <label>📱 Mobile Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g. 01203333204"
                    />
                  </div>

                  <div className="form-group">
                    <label>📍 Delivery Location</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g. 6th October, Bashayer"
                    />
                  </div>

                  <button type="submit" className="btn-whatsapp">
                    <span>💬</span> Send Order via WhatsApp
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Store;
