import React from 'react';
import './Navbar.css';

// Simple navigation component with tabs for Add Note and View Notes
// Why this nav approach for simplicity: Using tabs provides clear visual indication of current view
// without needing complex routing for this small app
const Navbar = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">NoteKeeper</div>
      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'add' ? 'active' : ''}`}
          onClick={() => setActiveTab('add')}
        >
          Add Note
        </button>
        <button 
          className={`tab ${activeTab === 'view' ? 'active' : ''}`}
          onClick={() => setActiveTab('view')}
        >
          View Notes
        </button>
      </div>
    </nav>
  );
};

export default Navbar;