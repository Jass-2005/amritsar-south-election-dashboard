import React, { useState, useMemo, useEffect } from 'react';
import './App.css';
import electionData from './data/amritsar_south_comparison_data.json';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import PartyHub from './components/PartyHub';
import BoothGrid from './components/BoothGrid';
import BoothModal from './components/BoothModal';
import CustomDropdown from './components/CustomDropdown';
import { 
  Search, 
  RotateCcw, 
  Printer, 
  MapPin, 
  Users, 
  FileSpreadsheet, 
  Compass, 
  Layers, 
  Activity, 
  CheckCircle2, 
  BarChart3,
  ExternalLink,
  ShieldAlert,
  Database,
  ClipboardList
} from 'lucide-react';

export default function App() {
  const [theme, setTheme] = useState('light'); // Default to light theme matching Dsidein screenshot
  const [activeTab, setActiveTab] = useState('DASHBOARD');
  const [selectedParty, setSelectedParty] = useState('ALL'); // 'ALL', 'AAP', 'INC', 'BJP', 'SAD'
  const [partyFilter, setPartyFilter] = useState('ALL'); 
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('BOOTH_ASC');
  const [selectedBooth, setSelectedBooth] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Apply theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    if (tab === 'DASHBOARD') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (tab === 'PARTY_HUB') {
      const el = document.querySelector('.dsidein-registry-card');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (tab === 'BOOTHS') {
      const el = document.querySelector('.booth-container');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const { summary, booths } = electionData;

  // Dynamic stats calculation for all parties directly from verified data
  const partyStats = useMemo(() => {
    const sortedAap = [...booths].sort((a, b) => (b.data_2024.aap || 0) - (a.data_2024.aap || 0));
    const sortedInc = [...booths].sort((a, b) => (b.data_2024.inc || 0) - (a.data_2024.inc || 0));
    const sortedSad = [...booths].sort((a, b) => (b.data_2024.sad || 0) - (a.data_2024.sad || 0));
    const sortedBjp = [...booths].sort((a, b) => (b.data_2024.bjp || 0) - (a.data_2024.bjp || 0));

    const calcParty = (pCode, cand22, cand24, sortedList) => {
      const pKey = pCode.toLowerCase();
      const v22 = summary?.party_votes_2022?.[pCode] || 0;
      const s22 = summary?.party_shares_2022?.[pCode] || 0.0;
      const v24 = summary?.party_votes_2024?.[pCode] || 0;
      const s24 = summary?.party_shares_2024?.[pCode] || 0.0;
      const diff = v24 - v22;
      const swing = Number((s24 - s22).toFixed(2));

      return {
        code: pCode,
        candidate_2022: cand22,
        candidate_2024: cand24,
        votes_2022: v22,
        share_2022: s22,
        votes_2024: v24,
        share_2024: s24,
        vote_diff: diff,
        swing: swing,
        booths_won_2022: summary?.booths_won_2022?.[pCode] || 0,
        booths_won_2024: summary?.booths_won_2024?.[pCode] || 0,
        won_both_count: booths.filter(b => b.categories?.[pCode] === 'WON_BOTH').length,
        gained_count: booths.filter(b => b.categories?.[pCode] === 'GAINED').length,
        lost_24_count: booths.filter(b => b.categories?.[pCode] === 'LOST_24').length,
        weak_count: booths.filter(b => b.categories?.[pCode] === 'WEAK').length,
        lost_both_count: booths.filter(b => b.categories?.[pCode] === 'LOST_BOTH').length,
        top_booth: {
          no: sortedList[0]?.booth_no || 0,
          name: sortedList[0]?.village_english || sortedList[0]?.village_en || '',
          votes: sortedList[0]?.data_2024[pKey] || 0
        }
      };
    };

    return {
      AAP: calcParty('AAP', 'Dr. Inderbir Singh Nijjar', 'Kuldeep Singh Dhaliwal', sortedAap),
      INC: calcParty('INC', 'Inderbir Singh Bolaria', 'Gurjeet Singh Aujla', sortedInc),
      SAD: calcParty('SAD', 'Talbir Singh Gill', 'Anil Joshi', sortedSad),
      BJP: calcParty('BJP', 'Harjinder Thekedar (PLC)', 'Taranjit Singh Sandhu Samundri', sortedBjp)
    };
  }, [booths, summary]);

  // Filtering & Sorting
  const filteredBooths = useMemo(() => {
    let result = [...booths];

    // 1. Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(b => 
        b.booth_no.toString() === q ||
        b.village_english.toLowerCase().includes(q) ||
        b.village_punjabi.includes(q) ||
        b.exact_name_punjabi.includes(q)
      );
    }

    // 2. Filter logic based on mode
    if (selectedParty === 'ALL') {
      if (partyFilter === 'INC_WINS') {
        result = result.filter(b => b.data_2024.winner_party === 'INC');
      } else if (partyFilter === 'AAP_WINS') {
        result = result.filter(b => b.data_2024.winner_party === 'AAP');
      } else if (partyFilter === 'BJP_WINS') {
        result = result.filter(b => b.data_2024.winner_party === 'BJP');
      } else if (partyFilter === 'SAD_WINS') {
        result = result.filter(b => b.data_2024.winner_party === 'SAD');
      } else if (partyFilter === 'FLIPPED_ONLY') {
        result = result.filter(b => b.comparison.is_flip);
      } else if (partyFilter === 'RETAINED_ONLY') {
        result = result.filter(b => !b.comparison.is_flip);
      }
    } else {
      // Party-specific mode (AAP, INC, SAD, BJP)
      const pKey = selectedParty.toLowerCase();
      if (partyFilter !== 'ALL') {
        result = result.filter(b => {
          const w22 = b.data_2022.winner_party;
          const w24 = b.data_2024.winner_party;
          const pct24 = b.data_2024[`${pKey}_pct`] || 0;

          if (partyFilter === 'WON_BOTH') {
            return w22 === selectedParty && w24 === selectedParty;
          }
          if (partyFilter === 'GAINED') {
            return w22 !== selectedParty && w24 === selectedParty;
          }
          if (partyFilter === 'LOST_24') {
            return w22 === selectedParty && w24 !== selectedParty;
          }
          if (partyFilter === 'WEAK') {
            return pct24 < 20.0 && b.data_2024.total > 0;
          }
          if (partyFilter === 'LOST_BOTH') {
            return w22 !== selectedParty && w24 !== selectedParty;
          }
          return true;
        });
      }
    }

    // 3. Sorting
    result.sort((a, b) => {
      const pKey = selectedParty === 'ALL' ? 'inc' : selectedParty.toLowerCase();
      switch (sortBy) {
        case 'BOOTH_DESC':
          return b.booth_no - a.booth_no;
        case 'VOTES_DESC':
          return b.data_2024[pKey] - a.data_2024[pKey];
        case 'VOTES_ASC':
          return a.data_2024[pKey] - b.data_2024[pKey];
        case 'TURNOUT_DESC':
          return b.data_2024.total - a.data_2024.total;
        case 'MARGIN_DESC':
          return b.data_2024.margin - a.data_2024.margin;
        case 'BOOTH_ASC':
        default:
          return a.booth_no - b.booth_no;
      }
    });

    return result;
  }, [booths, selectedParty, partyFilter, searchQuery, sortBy]);

  // Sort options for CustomDropdown
  const sortOptions = useMemo(() => {
    const opts = [
      { value: 'BOOTH_ASC', label: 'Booth No. (1 → 223)' },
      { value: 'BOOTH_DESC', label: 'Booth No. (223 → 1)' },
      { value: 'TURNOUT_DESC', label: 'Highest 2024 Turnout' },
      { value: 'MARGIN_DESC', label: 'Highest 2024 Margin' },
    ];
    if (selectedParty !== 'ALL') {
      opts.push(
        { value: 'VOTES_DESC', label: `Highest ${selectedParty} Votes` },
        { value: 'VOTES_ASC', label: `Lowest ${selectedParty} Votes` }
      );
    }
    return opts;
  }, [selectedParty]);

  // Reset all filters
  const handleResetToCompleteList = () => {
    setSelectedParty('ALL');
    setPartyFilter('ALL');
    setSearchQuery('');
    setSortBy('BOOTH_ASC');
  };

  // Export Single Booth to PDF
  const handleExportBoothPdf = (booth) => {
    setSelectedBooth(booth);
    setTimeout(() => {
      document.body.classList.add('printing-single-booth');
      window.print();
      setTimeout(() => {
        document.body.classList.remove('printing-single-booth');
      }, 1000);
    }, 150);
  };

  // Export Filtered View / Master List to PDF
  const handlePrintMasterReport = () => {
    document.body.classList.remove('printing-single-booth');
    window.print();
  };

  return (
    <div className="dsidein-app-root">
      {/* 1. Left Slim Navigation Rail / Mobile Drawer */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={handleTabChange} 
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* 2. Main Content Frame */}
      <div className="dsidein-content-frame">
        {/* Top Navigation Bar */}
        <Header 
          theme={theme} 
          toggleTheme={toggleTheme} 
          onMenuClick={() => setMobileMenuOpen(prev => !prev)} 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Dsidein Official PDF Watermark (Active on all PDF exports & printing) */}
        <div className="dsidein-print-watermark" aria-hidden="true">
          <img src="./dsidein_logo_transparent.png" alt="Dsidein" className="watermark-logo-img" />
          <div className="watermark-brand-name">DSIDEIN</div>
          <div className="watermark-sub-name">FIELD INTELLIGENCE & TELEMETRY</div>
          <div className="watermark-url">https://dsidein.com/amritsar-south-2022-2024</div>
        </div>

        {/* Print Master Report Header (Visible only on print) */}
        <div className="print-report-header">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: '15pt', fontWeight: 800, color: '#002b49' }}>
                19-AMRITSAR SOUTH ASSEMBLY SEGMENT (AMRITSAR PC)
              </div>
              <div style={{ fontSize: '10pt', color: '#475569', marginTop: '2px' }}>
                Comparative Booth Intelligence: 2022 Assembly vs 2024 Lok Sabha Polling
              </div>
              <div style={{ fontSize: '8.5pt', color: '#64748b', marginTop: '4px' }}>
                Active Filter: {selectedParty === 'ALL' ? 'Complete Master List' : `${selectedParty} Segment`} | Total Booths: {filteredBooths.length} of 169
              </div>
            </div>
            <div style={{ textAlign: 'right', fontSize: '8.5pt', color: '#334155' }}>
              <span style={{ fontWeight: 800, color: '#002b49' }}>DSIDEIN COMMAND CENTER</span><br />
              <span>https://dsidein.com/amritsar-south-2022-2024</span>
            </div>
          </div>
        </div>

        {/* Scrollable Main Dashboard Area */}
        <main className="dsidein-main-body">
          {/* Refined Minimal Page Title Bar (Replacing bulky hero banner) */}
          <section className="dashboard-title-bar">
            <div className="title-text-group">
              <div className="constituency-tag">19-AMRITSAR SOUTH ASSEMBLY SEGMENT</div>
              <h1 className="main-title">Comparative Booth Intelligence</h1>
              <p className="main-subtitle">
                2022 Vidhan Sabha vs 2024 Lok Sabha Polling Telemetry across all 169 Polling Stations (Amritsar PC)
              </p>
            </div>

            <div className="title-action-buttons">
              <a 
                href="./Amritsar_South_Master_Booth_Analysis_AAP_INC.xlsx" 
                download="Amritsar_South_Master_Booth_Analysis_AAP_INC.xlsx"
                className="pill-action-btn green"
                title="Download Master Analysis Spreadsheet (Excel .xlsx with AAP/INC/BJP/SAD Sheets)"
              >
                <span className="pill-btn-icon"><FileSpreadsheet size={14} /></span>
                <span className="pill-btn-label">Master Excel</span>
              </a>

              <a 
                href="./Amritsar_South_Detailed_169_Boothwise_Masterplan.pdf" 
                download="Amritsar_South_Detailed_169_Boothwise_Masterplan.pdf"
                className="pill-action-btn purple"
                title="Download Complete 169-Booth Master Plan in English (PDF with Watermark)"
              >
                <span className="pill-btn-icon"><ClipboardList size={14} /></span>
                <span className="pill-btn-label">Master Plan (English PDF)</span>
              </a>

              <a 
                href="./Amritsar_South_Detailed_169_Boothwise_Masterplan_Punjabi.pdf" 
                download="Amritsar_South_Detailed_169_Boothwise_Masterplan_Punjabi.pdf"
                className="pill-action-btn amber"
                title="Download 169 Boothwise Detailed Field Operations Plan in Punjabi (PDF with Watermark)"
              >
                <span className="pill-btn-icon"><ClipboardList size={14} /></span>
                <span className="pill-btn-label">169 ਬੂਥ ਮਾਸਟਰ ਪਲਾਨ (ਪੰਜਾਬੀ PDF)</span>
              </a>

              <button 
                onClick={handlePrintMasterReport}
                className="pill-action-btn outline"
                title="Export Current View as PDF with Dsidein Watermark"
              >
                <span className="pill-btn-icon"><Printer size={14} /></span>
                <span className="pill-btn-label">Export PDF</span>
              </button>
            </div>
          </section>

          {/* Dsidein 4 Minimal KPI Metric Cards */}
          <section className="dsidein-kpi-grid">
            {/* KPI 1: Live Telemetry */}
            <div className="dsidein-kpi-card">
              <div className="kpi-top-row">
                <div className="kpi-icon-pill icon-blue">
                  <Compass size={18} />
                </div>
              </div>
              <div className="kpi-label">POLLING STATIONS</div>
              <div className="kpi-value text-blue">169 Booths</div>
              <div className="kpi-sub-pill text-blue">
                ● 100% Monitored & Verified
              </div>
            </div>

            {/* KPI 2: Total Turnout */}
            <div className="dsidein-kpi-card">
              <div className="kpi-top-row">
                <div className="kpi-icon-pill icon-orange">
                  <Activity size={18} />
                </div>
              </div>
              <div className="kpi-label">2024 VALID VOTES</div>
              <div className="kpi-value">82,725</div>
              <div className="kpi-sub-pill text-orange">
                ● 100% Form-20 EVM Match
              </div>
            </div>

            {/* KPI 3: AAP - Leader */}
            <div className="dsidein-kpi-card aap-kpi">
              <div className="kpi-top-row">
                <div className="kpi-icon-pill icon-blue">
                  <CheckCircle2 size={18} />
                </div>
              </div>
              <div className="kpi-label">AAP (KULDEEP DHALIWAL)</div>
              <div className="kpi-value text-blue">28,431</div>
              <div className="kpi-sub-pill text-blue">
                ● 102 Wins (34.4% Share | +6,649 Lead)
              </div>
            </div>

            {/* KPI 4: BJP - Urban Surge */}
            <div className="dsidein-kpi-card bjp-kpi">
              <div className="kpi-top-row">
                <div className="kpi-icon-pill icon-orange">
                  <BarChart3 size={18} />
                </div>
              </div>
              <div className="kpi-label">BJP (TARANJIT SANDHU)</div>
              <div className="kpi-value text-orange">15,819</div>
              <div className="kpi-sub-pill text-orange">
                ● 35 Wins (19.1% Share | +17.6% Swing)
              </div>
            </div>
          </section>

          {/* Unified Registry Card (Styled after 'Team Progress Today' in Dsidein) */}
          <section className="dsidein-registry-card">
            {/* Card Top Title Row */}
            <div className="registry-card-header">
              <div className="registry-title-group">
                <div className="registry-title-row">
                  <h2 className="registry-title">Booth Performance Registry</h2>
                  <span className="registry-booth-count">{filteredBooths.length} Booths</span>
                </div>
                <p className="registry-subtitle">
                  Detailed booth-by-booth vote tally, turnout, winners, and margin shifts across 19-Amritsar South
                </p>
              </div>

              <div className="registry-header-actions">
                <button 
                  className="btn-registry-reset"
                  onClick={handleResetToCompleteList}
                  title="Reset all filters to complete view"
                >
                  <RotateCcw size={14} />
                  <span>Reset All</span>
                </button>
              </div>
            </div>

            {/* Party Selector & Category Filter Pills */}
            <PartyHub 
              selectedParty={selectedParty}
              setSelectedParty={setSelectedParty}
              partyFilter={partyFilter}
              setPartyFilter={setPartyFilter}
              partyStats={partyStats}
              summary={summary}
            />

            {/* Search & Sort Sub-Toolbar */}
            <div className="registry-toolbar">
              <div className="toolbar-search-wrap">
                <Search size={15} />
                <input
                  type="text"
                  className="toolbar-search-input"
                  placeholder={
                    selectedParty === 'ALL'
                      ? 'Search all 169 booths by number or locality (e.g. 104, Kot Khalsa, ਕੋਟ ਖਾਲਸਾ)...'
                      : `Search ${selectedParty} performance by booth no. or locality (e.g. 53, Kot Khalsa)...`
                  }
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Filter booths"
                />
              </div>

              <div className="toolbar-controls">
                <button
                  onClick={handlePrintMasterReport}
                  className="btn-toolbar-pdf"
                  title="Export Current Table View as PDF with Dsidein Watermark"
                >
                  <Printer size={14} />
                  <span>Export PDF</span>
                </button>

                <CustomDropdown
                  value={sortBy}
                  onChange={setSortBy}
                  options={sortOptions}
                  label="Sort order"
                />
              </div>
            </div>

            {/* Booth Table / Grid */}
            <BoothGrid 
              booths={filteredBooths}
              selectedParty={selectedParty}
              partyFilter={partyFilter}
              onSelectBooth={(b) => setSelectedBooth(b)}
              onExportBoothPdf={handleExportBoothPdf}
            />
          </section>
        </main>
      </div>

      {/* Booth Inspector Modal */}
      {selectedBooth && (
        <BoothModal 
          booth={selectedBooth}
          onClose={() => setSelectedBooth(null)}
        />
      )}
    </div>
  );
}
