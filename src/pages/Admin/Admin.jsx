import React, { useState, useEffect } from 'react';
import { getScheduleData } from '../../components/ScheduleSection/ScheduleSection';
import './Admin.css';

const MOCK_STATS = [
  { label: 'Total Sales', value: 'EGP 42,500', icon: '💰', trend: '+12.5%' },
  { label: 'New Members', value: '128', icon: '🏊', trend: '+8.2%' },
  { label: 'Active Orders', value: '14', icon: '🛒', trend: 'In Progress' },
  { label: 'Page Views', value: '2.4k', icon: '📈', trend: '+15.3%' },
];

const INITIAL_PRODUCTS = [
  { id: 1, name: 'GSA Pro Goggles', price: 250, cat: 'Accessories', stock: 15 },
  { id: 2, name: 'Elite Swim Cap', price: 150, cat: 'Accessories', stock: 42 },
  { id: 3, name: 'Racing Jammer', price: 450, cat: 'Swimwear', stock: 8 },
];

const Chart = () => (
  <div className="chart-mockup">
    <div className="chart-bar" style={{ height: '40%', '--delay': '0.1s' }}><span className="bar-label">Mon</span></div>
    <div className="chart-bar" style={{ height: '70%', '--delay': '0.2s' }}><span className="bar-label">Tue</span></div>
    <div className="chart-bar" style={{ height: '60%', '--delay': '0.3s' }}><span className="bar-label">Wed</span></div>
    <div className="chart-bar" style={{ height: '90%', '--delay': '0.4s' }}><span className="bar-label">Thu</span></div>
    <div className="chart-bar" style={{ height: '50%', '--delay': '0.5s' }}><span className="bar-label">Fri</span></div>
  </div>
);

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminPassword, setAdminPassword] = useState('admin123');
  const [adminEmail, setAdminEmail] = useState('goldenswimmingacademy@gmail.com');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [schedule, setSchedule] = useState([]);
  const [loginError, setLoginError] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', cat: 'Accessories', stock: '', image: '' });
  const [imagePreview, setImagePreview] = useState(null);

  // Honored Members State
  const [honoredMembers, setHonoredMembers] = useState([
    { id: 1, name: 'Yassin Mohamed', title: 'Athlete of the Month', year: 'March 2024', image: '/yassin.png' },
    { id: 2, name: 'Laila Hassan', title: 'National Gold medalist', year: '2023 Season', image: '/laila.png' },
  ]);
  const [showHonoredModal, setShowHonoredModal] = useState(false);
  const [newHonored, setNewHonored] = useState({ name: '', title: '', year: new Date().getFullYear().toString(), image: '' });

  // Settings state
  const [passForm, setPassForm] = useState({ current: '', next: '', confirm: '' });
  const [passStatus, setPassStatus] = useState({ msg: '', type: '' });

  // Contact Info state
  const DEFAULT_CONTACT = {
    location: '6th October, Bashayer',
    whatsapp: '+20 120 333 3204',
    whatsappNumber: '201203333204',
    hours: 'Mon – Fri: 4 PM – 9 PM',
  };
  const loadContact = () => {
    try {
      const stored = localStorage.getItem('gsa_contact_info');
      return stored ? { ...DEFAULT_CONTACT, ...JSON.parse(stored) } : { ...DEFAULT_CONTACT };
    } catch { return { ...DEFAULT_CONTACT }; }
  };
  const [contactForm, setContactForm] = useState(loadContact);
  const [contactStatus, setContactStatus] = useState({ msg: '', type: '' });

  const handleSaveContact = (e) => {
    e.preventDefault();
    localStorage.setItem('gsa_contact_info', JSON.stringify(contactForm));
    window.dispatchEvent(new Event('contact-updated'));
    setContactStatus({ msg: 'Contact info updated successfully! ✅', type: 'success' });
    setTimeout(() => setContactStatus({ msg: '', type: '' }), 3000);
  };

  useEffect(() => {
    setSchedule(getScheduleData());
  }, []);

  const handleSaveSchedule = () => {
    localStorage.setItem('gsa_schedule', JSON.stringify(schedule));
    window.dispatchEvent(new Event('schedule-updated'));
    alert('Schedule saved successfully!');
  };

  const handleScheduleChange = (index, field, value) => {
    const updated = [...schedule];
    updated[index][field] = value;
    setSchedule(updated);
  };

  const handleAddProgramRow = () => {
    setSchedule([...schedule, { day: 'New Day', time: '0:00 - 0:00', level: 'Level Name', icon: '❓' }]);
  };

  const handleDeleteProgramRow = (index) => {
    const updated = schedule.filter((_, i) => i !== index);
    setSchedule(updated);
  };

  const handleImageChange = (e, target) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        if (target === 'product') setNewProduct({ ...newProduct, image: reader.result });
        if (target === 'honored') setNewHonored({ ...newHonored, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddHonored = (e) => {
    e.preventDefault();
    const id = honoredMembers.length + 1;
    setHonoredMembers([...honoredMembers, { ...newHonored, id }]);
    setShowHonoredModal(false);
    setNewHonored({ name: '', title: '', year: new Date().getFullYear().toString(), image: '' });
    setImagePreview(null);
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    const id = products.length + 1;
    setProducts([...products, { ...newProduct, id: id, price: Number(newProduct.price), stock: Number(newProduct.stock) }]);
    setShowAddModal(false);
    setNewProduct({ name: '', price: '', cat: 'Accessories', stock: '', image: '' });
    setImagePreview(null);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    if (email === adminEmail && password === adminPassword) {
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Incorrect email or password. Please try again.');
    }
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (passForm.current !== adminPassword) {
      setPassStatus({ msg: 'Current password is incorrect!', type: 'error' });
      return;
    }
    if (passForm.next !== passForm.confirm) {
      setPassStatus({ msg: 'New passwords do not match!', type: 'error' });
      return;
    }
    if (passForm.next.length < 4) {
      setPassStatus({ msg: 'Password must be at least 4 characters.', type: 'error' });
      return;
    }

    setAdminPassword(passForm.next);
    setPassStatus({ msg: 'Password updated successfully! 🔐', type: 'success' });
    setPassForm({ current: '', next: '', confirm: '' });
    setTimeout(() => setPassStatus({ msg: '', type: '' }), 3000);
  };

  if (!isLoggedIn) {
    return (
      <div className="admin-login-page">
        <div className="login-card glass-panel">
          <div className="login-header">
            <img src="/logo.png" alt="GSA Logo" className="login-logo" />
            <h2>Admin Portal</h2>
            <p>Enter your email and password to access the dashboard</p>
          </div>
          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <input 
                type="email" 
                placeholder="Email Address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
                required
              />
            </div>
            <div className="form-group">
              <input 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {loginError && <p className="error-text">{loginError}</p>}
            <button type="submit" className="btn-primary login-btn">Unlock Dashboard</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <img src="/logo.png" alt="GSA" className="sidebar-logo" />
          <span className="badge-admin">Admin</span>
        </div>
        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            📊 Dashboard
          </button>
          <button 
             className={`nav-item ${activeTab === 'products' ? 'active' : ''}`}
             onClick={() => setActiveTab('products')}
          >
            🛒 Products
          </button>
          <button 
             className={`nav-item ${activeTab === 'performance' ? 'active' : ''}`}
             onClick={() => setActiveTab('performance')}
          >
            🏆 Performance
          </button>
          <button 
             className={`nav-item ${activeTab === 'schedule' ? 'active' : ''}`}
             onClick={() => setActiveTab('schedule')}
          >
            📅 Programs
          </button>
          <button 
             className={`nav-item ${activeTab === 'contact-info' ? 'active' : ''}`}
             onClick={() => setActiveTab('contact-info')}
          >
            📞 Contact Info
          </button>
          <button 
             className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
             onClick={() => setActiveTab('settings')}
          >
            ⚙️ Settings
          </button>
        </nav>
        <button className="btn-logout" onClick={() => setIsLoggedIn(false)}>Log Out</button>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <header className="admin-header">
          <h1>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
          <div className="admin-user">
            <span className="dot online" /> Welcome, Coach
          </div>
        </header>

        <div className="admin-content">
          {activeTab === 'dashboard' && (
            <div className="dashboard-view">
              <div className="stats-grid">
                {[
                  { label: 'Total Sales', value: 'EGP 42,500', icon: '💰', trend: '+12.5%' },
                  { label: 'Products', value: products.length, icon: '🛒', trend: 'In Stock' },
                  { label: 'Honored Athletes', value: honoredMembers.length, icon: '🏆', trend: 'Hall of Fame' },
                  { label: 'Members', value: '128', icon: '🏊', trend: '+8.2%' },
                ].map((stat, i) => (
                  <div key={i} className="stat-card glass-panel">
                    <div className="stat-icon">{stat.icon}</div>
                    <div className="stat-info">
                      <p className="stat-label">{stat.label}</p>
                      <h3 className="stat-val">{stat.value}</h3>
                      <span className="stat-trend">{stat.trend}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="dashboard-charts-row">
                <div className="chart-container glass-panel">
                  <h3>Revenue Trend</h3>
                  <Chart />
                </div>
                <div className="recent-activity glass-panel">
                  <h3>Recent Orders</h3>
                  <div className="activity-list">
                    <div className="activity-item">
                      <span>👤 Ahmed M.</span>
                      <span>🛒 2x Pro Goggles</span>
                      <span className="status pending">Pending</span>
                    </div>
                    <div className="activity-item">
                      <span>👤 Sara K.</span>
                      <span>🛒 Elite Cap</span>
                      <span className="status completed">Completed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="products-view animate-fade">
              <div className="view-header">
                <h3>Manage Academy Shop</h3>
                <button className="btn-add" onClick={() => setShowAddModal(true)}>+ New Product</button>
              </div>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Img</th>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(p => (
                    <tr key={p.id}>
                      <td>
                        <div className="table-img-wrap">
                          {p.image ? <img src={p.image} alt={p.name} /> : <span>🖼️</span>}
                        </div>
                      </td>
                      <td><strong>{p.name}</strong></td>
                      <td>{p.cat}</td>
                      <td>EGP {p.price}</td>
                      <td>{p.stock}</td>
                      <td>
                        <button className="btn-edit" title="Edit">✏️</button>
                        <button 
                          className="btn-del" 
                          onClick={() => setProducts(products.filter(item => item.id !== p.id))}
                          title="Delete"
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'performance' && (
            <div className="performance-view animate-fade">
              <div className="view-header">
                <h3>Gallery Management</h3>
                <button className="btn-add gold-btn" onClick={() => setShowHonoredModal(true)}>+ Honor Athlete</button>
              </div>
              
              <div className="honored-list-grid">
                {honoredMembers.map(member => (
                  <div key={member.id} className="honored-admin-card glass-panel">
                    <div className="honored-admin-img">
                      {member.image ? <img src={member.image} alt={member.name} /> : <span>🏆</span>}
                    </div>
                    <div className="honored-admin-info">
                      <h4>{member.name}</h4>
                      <p>{member.title}</p>
                      <small>{member.year}</small>
                    </div>
                    <button 
                      className="btn-del" 
                      onClick={() => setHonoredMembers(honoredMembers.filter(m => m.id !== member.id))}
                    >🗑️</button>
                  </div>
                ))}
              </div>
              
              {honoredMembers.length === 0 && (
                <div className="empty-state">No athletes honored yet.</div>
              )}
            </div>
          )}

          {activeTab === 'schedule' && (
            <div className="schedule-admin-view animate-fade">
              <div className="view-header">
                <h3>Manage Training Programs</h3>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button className="btn-add" onClick={handleSaveSchedule}>💾 Save Changes</button>
                  <button className="btn-add gold-btn" onClick={handleAddProgramRow} style={{ background: '#ff6b00' }}>+ Add Day</button>
                </div>
              </div>
              
              <div className="schedule-editor">
                {schedule.map((item, i) => (
                  <div key={i} className="schedule-edit-row glass-panel" style={{ display: 'flex', gap: '1rem', padding: '1rem', marginBottom: '1rem', alignItems: 'center' }}>
                    <div className="form-group" style={{ margin: 0, width: '60px' }}>
                      <input type="text" value={item.icon} onChange={(e) => handleScheduleChange(i, 'icon', e.target.value)} title="Icon" />
                    </div>
                    <div className="form-group" style={{ margin: 0, flex: 1 }}>
                      <input type="text" value={item.day} onChange={(e) => handleScheduleChange(i, 'day', e.target.value)} placeholder="Day" />
                    </div>
                    <div className="form-group" style={{ margin: 0, flex: 1.5 }}>
                      <input type="text" value={item.time} onChange={(e) => handleScheduleChange(i, 'time', e.target.value)} placeholder="Time" />
                    </div>
                    <div className="form-group" style={{ margin: 0, flex: 1.5 }}>
                      <input type="text" value={item.level} onChange={(e) => handleScheduleChange(i, 'level', e.target.value)} placeholder="Level/Focus" />
                    </div>
                    <button 
                      className="btn-del" 
                      onClick={() => handleDeleteProgramRow(i)}
                      style={{ padding: '0.5rem', background: 'rgba(255, 68, 68, 0.1)', color: '#ff4444', border: '1px solid rgba(255,68,68,0.2)', borderRadius: '4px' }}
                      title="Delete Entry"
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'contact-info' && (
            <div className="settings-view animate-fade">
              <div className="settings-container glass-panel">
                <div className="settings-header">
                  <h3>📞 Contact Info</h3>
                  <p>Update your academy’s public contact details</p>
                </div>
                <form onSubmit={handleSaveContact} className="password-change-form">
                  <div className="form-group">
                    <label>📍 Location</label>
                    <input
                      type="text"
                      value={contactForm.location}
                      onChange={e => setContactForm({ ...contactForm, location: e.target.value })}
                      placeholder="e.g. 6th October, Bashayer"
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>📱 WhatsApp Display Text</label>
                      <input
                        type="text"
                        value={contactForm.whatsapp}
                        onChange={e => setContactForm({ ...contactForm, whatsapp: e.target.value })}
                        placeholder="+20 120 333 3204"
                      />
                    </div>
                    <div className="form-group">
                      <label>🔢 WhatsApp Number (no +)</label>
                      <input
                        type="text"
                        value={contactForm.whatsappNumber}
                        onChange={e => setContactForm({ ...contactForm, whatsappNumber: e.target.value })}
                        placeholder="201203333204"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>🕐 Working Hours</label>
                    <input
                      type="text"
                      value={contactForm.hours}
                      onChange={e => setContactForm({ ...contactForm, hours: e.target.value })}
                      placeholder="Mon – Fri: 4 PM – 9 PM"
                    />
                  </div>
                  {contactStatus.msg && (
                    <div className={`status-msg ${contactStatus.type}`}>
                      {contactStatus.msg}
                    </div>
                  )}
                  <button type="submit" className="btn-primary update-pass-btn">
                    Save Contact Info 💾
                  </button>
                </form>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="settings-view animate-fade">
              <div className="settings-container glass-panel">
                <div className="settings-header">
                  <h3>⚙️ Academy Settings</h3>
                  <p>Secure your administrative access</p>
                </div>
                
                <form onSubmit={handlePasswordChange} className="password-change-form">
                  <h4>Change Admin Password</h4>
                  <div className="form-group">
                    <label>Current Password</label>
                    <input 
                      type="password" 
                      required 
                      value={passForm.current}
                      onChange={e => setPassForm({...passForm, current: e.target.value})}
                      placeholder="Enter current password"
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>New Password</label>
                      <input 
                        type="password" 
                        required 
                        value={passForm.next}
                        onChange={e => setPassForm({...passForm, next: e.target.value})}
                        placeholder="Min 4 chars"
                      />
                    </div>
                    <div className="form-group">
                      <label>Confirm New Password</label>
                      <input 
                        type="password" 
                        required 
                        value={passForm.confirm}
                        onChange={e => setPassForm({...passForm, confirm: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  {passStatus.msg && (
                    <div className={`status-msg ${passStatus.type}`}>
                      {passStatus.msg}
                    </div>
                  )}

                  <button type="submit" className="btn-primary update-pass-btn">
                    Update Password 🔒
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content admin-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add New Product</h3>
              <button className="btn-close" onClick={() => setShowAddModal(false)}>✕</button>
            </div>
            <form onSubmit={handleAddProduct} className="admin-form">
              <div className="form-group image-upload-group">
                <label>Product Image</label>
                <div className="image-picker-container">
                  <div className="image-preview-box">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" />
                    ) : (
                      <div className="preview-placeholder">
                        <span>📸</span>
                        <p>No Image Selected</p>
                      </div>
                    )}
                  </div>
                  <div className="image-input-wrap">
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={(e) => handleImageChange(e, 'product')}
                      id="image-upload-input"
                      hidden
                    />
                    <label htmlFor="image-upload-input" className="btn-upload-trigger">
                      Choose Source File
                    </label>
                    <p className="upload-hint">JPG, PNG or SVG (Max 1MB)</p>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label>Product Name</label>
                <input 
                  type="text" 
                  required 
                  value={newProduct.name} 
                  onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                  placeholder="e.g. Pro Goggles"
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Price (EGP)</label>
                  <input 
                    type="number" 
                    required 
                    value={newProduct.price} 
                    onChange={e => setNewProduct({...newProduct, price: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Stock</label>
                  <input 
                    type="number" 
                    required 
                    value={newProduct.stock} 
                    onChange={e => setNewProduct({...newProduct, stock: e.target.value})}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Category</label>
                <select 
                  value={newProduct.cat} 
                  onChange={e => setNewProduct({...newProduct, cat: e.target.value})}
                >
                  <option value="Accessories">Accessories</option>
                  <option value="Swimwear">Swimwear</option>
                  <option value="Gear">Gear</option>
                </select>
              </div>
              <button type="submit" className="btn-primary submit-btn">Create Product</button>
            </form>
          </div>
        </div>
      )}

      {/* Add Honored Member Modal */}
      {showHonoredModal && (
        <div className="modal-overlay" onClick={() => setShowHonoredModal(false)}>
          <div className="modal-content admin-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Honor New Athlete</h3>
              <button className="btn-close" onClick={() => setShowHonoredModal(false)}>✕</button>
            </div>
            <form onSubmit={handleAddHonored} className="admin-form">
              <div className="form-group image-upload-group">
                <label>Athlete Photo</label>
                <div className="image-picker-container">
                  <div className="image-preview-box">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" />
                    ) : (
                      <div className="preview-placeholder">
                        <span>🏆</span>
                        <p>No Photo Selected</p>
                      </div>
                    )}
                  </div>
                  <div className="image-input-wrap">
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={(e) => handleImageChange(e, 'honored')}
                      id="honored-upload-input"
                      hidden
                    />
                    <label htmlFor="honored-upload-input" className="btn-upload-trigger">
                      Upload Portrait
                    </label>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label>Athlete Name</label>
                <input 
                  type="text" 
                  required 
                  value={newHonored.name} 
                  onChange={e => setNewHonored({...newHonored, name: e.target.value})}
                  placeholder="Full Name"
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Title / Achievement</label>
                  <input 
                    type="text" 
                    required 
                    value={newHonored.title} 
                    onChange={e => setNewHonored({...newHonored, title: e.target.value})}
                    placeholder="e.g. Athlete of the Month"
                  />
                </div>
                <div className="form-group">
                  <label>Year / Session</label>
                  <input 
                    type="text" 
                    required 
                    value={newHonored.year} 
                    onChange={e => setNewHonored({...newHonored, year: e.target.value})}
                  />
                </div>
              </div>
              <button type="submit" className="btn-primary submit-btn gold-btn">Confirm Honor 🏆</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
