import React from 'react';
import { LayoutDashboard, MapPin, Users, FileSpreadsheet, ExternalLink, X, ClipboardList } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, isOpen, onClose }) {
  const handleNavClick = (tab) => {
    setActiveTab(tab);
    if (onClose) onClose();
  };

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {isOpen && (
        <div 
          className="mobile-sidebar-backdrop no-print" 
          onClick={onClose} 
          aria-label="Close Mobile Navigation" 
        />
      )}

      <aside className={`dsidein-sidebar no-print ${isOpen ? 'mobile-open' : ''}`}>
        {/* Top Logo & Close button on mobile */}
        <div className="sidebar-logo-wrap">
          <a 
            href="https://dsidein.com/amritsar-south-2022-2024" 
            title="Dsidein Command Center — https://dsidein.com/amritsar-south-2022-2024"
            className="sidebar-brand-link"
          >
            <img 
              src="./dsidein_logo_transparent.png" 
              alt="Dsidein Logo" 
              className="sidebar-dsidein-logo" 
            />
          </a>

          {isOpen && (
            <button 
              className="sidebar-mobile-close hide-desktop" 
              onClick={onClose}
              aria-label="Close navigation"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Navigation Icons */}
        <nav className="sidebar-nav">
          <button 
            className={`sidebar-nav-btn ${activeTab === 'DASHBOARD' ? 'active' : ''}`}
            onClick={() => handleNavClick('DASHBOARD')}
            title="Analytics Dashboard"
          >
            <div className="active-rail-indicator" />
            <LayoutDashboard size={20} />
            <span className="sidebar-label hide-desktop">Dashboard</span>
          </button>

          <button 
            className={`sidebar-nav-btn ${activeTab === 'PARTY_HUB' ? 'active' : ''}`}
            onClick={() => handleNavClick('PARTY_HUB')}
            title="Party Intelligence Hub"
          >
            <Users size={20} />
            <span className="sidebar-label hide-desktop">Party Hub</span>
          </button>

          <button 
            className={`sidebar-nav-btn ${activeTab === 'BOOTHS' ? 'active' : ''}`}
            onClick={() => handleNavClick('BOOTHS')}
            title="169 Booths Explorer"
          >
            <MapPin size={20} />
            <span className="sidebar-label hide-desktop">169 Booths</span>
          </button>

          <a 
            href="./Amritsar_South_Master_Booth_Analysis_AAP_INC.xlsx" 
            download="Amritsar_South_Master_Booth_Analysis_AAP_INC.xlsx"
            className="sidebar-nav-btn"
            title="Master Excel Spreadsheet (.xlsx)"
            onClick={() => { if (onClose) onClose(); }}
          >
            <FileSpreadsheet size={20} />
            <span className="sidebar-label hide-desktop">Master Excel</span>
          </a>

          <a 
            href="./Amritsar_South_Party_Analysis_Executive_Report_2022_2024.docx" 
            download="Amritsar_South_Party_Analysis_Executive_Report_2022_2024.docx"
            className="sidebar-nav-btn"
            title="Download Strategic Executive Report (.docx)"
            onClick={() => { if (onClose) onClose(); }}
          >
            <ClipboardList size={20} />
            <span className="sidebar-label hide-desktop">Executive Report (Word)</span>
          </a>

          <a 
            href="https://dsidein.com" 
            target="_blank" 
            rel="noreferrer"
            className="sidebar-nav-btn"
            title="Dsidein Platform — dsidein.com"
            onClick={() => { if (onClose) onClose(); }}
          >
            <ExternalLink size={18} />
            <span className="sidebar-label hide-desktop">Dsidein.com</span>
          </a>
        </nav>

        {/* Bottom Profile Avatar */}
        <div className="sidebar-bottom">
          <div className="sidebar-avatar" title="Dsidein Command Center">
            <img 
              src="./dsidein_logo_transparent.png" 
              alt="Dsidein User" 
              style={{ width: '22px', height: '22px', objectFit: 'contain' }} 
            />
          </div>
        </div>
      </aside>
    </>
  );
}

