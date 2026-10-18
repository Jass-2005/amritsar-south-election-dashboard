import React, { useState, useMemo, useEffect } from 'react';
import './App.css';
import electionData from './data/amritsar_south_comparison_data.json';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import PartyHub from './components/PartyHub';
import BoothGrid from './components/BoothGrid';
import BoothModal from './components/BoothModal';
import CustomDropdown from './components/CustomDropdown';
import KPIBanner from './components/KPIBanner';
import AnalyticsView from './components/AnalyticsView';
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
  ClipboardList,
  Building2,
  Award
} from 'lucide-react';

export default function App() {
  const [theme, setTheme] = useState('light');
  const [activeTab, setActiveTab] = useState('DASHBOARD'); // 'DASHBOARD', 'ANALYTICS', 'PARTY_HUB', 'BOOTHS'
  const [selectedParty, setSelectedParty] = useState('ALL'); // 'ALL', 'AAP', 'INC', 'BJP', 'SAD'
  const [partyFilter, setPartyFilter] = useState('ALL'); 
  const [selectedYears, setSelectedYears] = useState([]); // e.g. [2017, 2019, 2024]
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
    if (tab === 'DASHBOARD' || tab === 'ANALYTICS') {
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
        booths_won_2017: summary?.booths_won_2017?.[pCode] || booths.filter(b => b.data_2017?.winner_party === pCode).length,
        booths_won_2019: summary?.booths_won_2019?.[pCode] || booths.filter(b => b.data_2019?.winner_party === pCode).length,
        booths_won_2022: summary?.booths_won_2022?.[pCode] || booths.filter(b => b.data_2022?.winner_party === pCode).length,
        booths_won_2024: summary?.booths_won_2024?.[pCode] || booths.filter(b => b.data_2024?.winner_party === pCode).length,
        won_this_year_count: booths.filter(b => b.data_2024?.winner_party === pCode).length,
        won_both_count: booths.filter(b => b.categories?.[pCode] === 'WON_BOTH').length,
        won_in_2_count: booths.filter(b => {
          let c = 0;
          if (b.data_2017?.winner_party === pCode) c++;
          if (b.data_2019?.winner_party === pCode) c++;
          if (b.data_2022?.winner_party === pCode) c++;
          if (b.data_2024?.winner_party === pCode) c++;
          return c === 2;
        }).length,
        won_in_3_count: booths.filter(b => {
          let c = 0;
          if (b.data_2017?.winner_party === pCode) c++;
          if (b.data_2019?.winner_party === pCode) c++;
          if (b.data_2022?.winner_party === pCode) c++;
          if (b.data_2024?.winner_party === pCode) c++;
          return c === 3;
        }).length,
        won_all_count: booths.filter(b => {
          let c = 0;
          if (b.data_2017?.winner_party === pCode) c++;
          if (b.data_2019?.winner_party === pCode) c++;
          if (b.data_2022?.winner_party === pCode) c++;
          if (b.data_2024?.winner_party === pCode) c++;
          const tot = b.data_2017 ? 4 : 2;
          return c === tot;
        }).length,
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
        (b.polling_station_en && b.polling_station_en.toLowerCase().includes(q)) ||
        (b.village_english && b.village_english.toLowerCase().includes(q)) ||
        (b.location_en && b.location_en.toLowerCase().includes(q)) ||
        (b.sections_en && b.sections_en.toLowerCase().includes(q)) ||
        (b.village_punjabi && b.village_punjabi.includes(q)) ||
        (b.polling_station_pa && b.polling_station_pa.includes(q))
      );
    }

    // 2. Filter logic based on mode
    if (selectedParty === 'ALL') {
      if (partyFilter === 'CORE_151') {
        result = result.filter(b => b.booth_no <= 151);
      } else if (partyFilter === 'AUXILIARY_18') {
        result = result.filter(b => b.booth_no > 151);
      } else if (partyFilter === 'INC_WINS' || partyFilter === 'INC_2024_WINS') {
        result = result.filter(b => b.data_2024?.winner_party === 'INC');
      } else if (partyFilter === 'AAP_WINS' || partyFilter === 'AAP_2024_WINS') {
        result = result.filter(b => b.data_2024?.winner_party === 'AAP');
      } else if (partyFilter === 'BJP_WINS' || partyFilter === 'BJP_2024_WINS') {
        result = result.filter(b => b.data_2024?.winner_party === 'BJP');
      } else if (partyFilter === 'SAD_WINS' || partyFilter === 'SAD_2024_WINS') {
        result = result.filter(b => b.data_2024?.winner_party === 'SAD');
      } else if (partyFilter === 'AAP_2022_WINS') {
        result = result.filter(b => b.data_2022?.winner_party === 'AAP');
      } else if (partyFilter === 'SAD_2022_WINS') {
        result = result.filter(b => b.data_2022?.winner_party === 'SAD');
      } else if (partyFilter === 'INC_2022_WINS') {
        result = result.filter(b => b.data_2022?.winner_party === 'INC');
      } else if (partyFilter === 'INC_2019_WINS') {
        result = result.filter(b => b.data_2019?.winner_party === 'INC');
      } else if (partyFilter === 'BJP_2019_WINS') {
        result = result.filter(b => b.data_2019?.winner_party === 'BJP');
      } else if (partyFilter === 'INC_2017_WINS') {
        result = result.filter(b => b.data_2017?.winner_party === 'INC');
      } else if (partyFilter === 'AAP_2017_WINS') {
        result = result.filter(b => b.data_2017?.winner_party === 'AAP');
      } else if (partyFilter === 'SAD_2017_WINS') {
        result = result.filter(b => b.data_2017?.winner_party === 'SAD');
      } else if (partyFilter === 'WON_THIS_YEAR') {
        result = result.filter(b => Boolean(b.data_2024?.winner_party));
      } else if (partyFilter === 'WON_IN_2') {
        result = result.filter(b => {
          const w24 = b.data_2024?.winner_party;
          if (!w24) return false;
          let count = 0;
          if (b.data_2017?.winner_party === w24) count++;
          if (b.data_2019?.winner_party === w24) count++;
          if (b.data_2022?.winner_party === w24) count++;
          if (b.data_2024?.winner_party === w24) count++;
          return count === 2;
        });
      } else if (partyFilter === 'WON_IN_3_PLUS') {
        result = result.filter(b => {
          const w24 = b.data_2024?.winner_party;
          if (!w24) return false;
          let count = 0;
          if (b.data_2017?.winner_party === w24) count++;
          if (b.data_2019?.winner_party === w24) count++;
          if (b.data_2022?.winner_party === w24) count++;
          if (b.data_2024?.winner_party === w24) count++;
          return count >= 3;
        });
      } else if (partyFilter === 'WON_ALL_ELECTIONS') {
        result = result.filter(b => {
          const w24 = b.data_2024?.winner_party;
          if (!w24) return false;
          const totalAvail = b.data_2017 ? 4 : 2;
          let count = 0;
          if (b.data_2017?.winner_party === w24) count++;
          if (b.data_2019?.winner_party === w24) count++;
          if (b.data_2022?.winner_party === w24) count++;
          if (b.data_2024?.winner_party === w24) count++;
          return count === totalAvail;
        });
      } else if (partyFilter === 'WON_2024_ONLY') {
        result = result.filter(b => {
          const w24 = b.data_2024?.winner_party;
          if (!w24) return false;
          return b.data_2022?.winner_party !== w24 && b.data_2019?.winner_party !== w24 && b.data_2017?.winner_party !== w24;
        });
      } else if (partyFilter === 'FLIPPED_ONLY') {
        result = result.filter(b => b.comparison.is_flip);
      } else if (partyFilter === 'RETAINED_ONLY') {
        result = result.filter(b => !b.comparison.is_flip);
      }
    } else {
      // Party-specific mode (AAP, INC, SAD, BJP)
      const pKey = selectedParty.toLowerCase();
      const p = selectedParty;
      if (partyFilter !== 'ALL') {
        result = result.filter(b => {
          const w17 = b.data_2017?.winner_party;
          const w19 = b.data_2019?.winner_party;
          const w22 = b.data_2022?.winner_party;
          const w24 = b.data_2024?.winner_party;
          const pct24 = b.data_2024[`${pKey}_pct`] || 0;

          let pWins = 0;
          if (w17 === p) pWins++;
          if (w19 === p) pWins++;
          if (w22 === p) pWins++;
          if (w24 === p) pWins++;

          if (partyFilter === 'WON_THIS_YEAR' || partyFilter === 'WON_24') {
            return w24 === p;
          }
          if (partyFilter === 'WON_22') {
            return w22 === p;
          }
          if (partyFilter === 'WON_19') {
            return w19 === p;
          }
          if (partyFilter === 'WON_17') {
            return w17 === p;
          }
          if (partyFilter === 'WON_BOTH') {
            return w22 === p && w24 === p;
          }
          if (partyFilter === 'WON_IN_2') {
            return pWins === 2;
          }
          if (partyFilter === 'WON_IN_3_PLUS') {
            return pWins >= 3;
          }
          if (partyFilter === 'WON_ALL_ELECTIONS') {
            const totalAvail = b.data_2017 ? 4 : 2;
            return pWins === totalAvail;
          }
          if (partyFilter === 'WON_2024_ONLY') {
            return w24 === p && w22 !== p && w19 !== p && w17 !== p;
          }
          if (partyFilter === 'GAINED') {
            return w22 !== p && w24 === p;
          }
          if (partyFilter === 'LOST_24') {
            return w22 === p && w24 !== p;
          }
          if (partyFilter === 'WEAK') {
            return pct24 < 20.0 && b.data_2024.total > 0;
          }
          if (partyFilter === 'LOST_BOTH') {
            return w22 !== p && w24 !== p;
          }
          return true;
        });
      }
    }

    // 3. Multi-Election Trajectory & Combination Filter (e.g. '17+'19+'24)
    if (selectedYears.length > 0) {
      if (selectedParty === 'ALL') {
        result = result.filter(b => {
          const winners = selectedYears.map(yr => (b[`data_${yr}`] || {}).winner_party).filter(Boolean);
          return winners.length === selectedYears.length && winners.every(w => w === winners[0]);
        });
      } else {
        result = result.filter(b => {
          return selectedYears.every(yr => (b[`data_${yr}`] || {}).winner_party === selectedParty);
        });
      }
    }

    // 4. Sorting
    result.sort((a, b) => {
      const pKey = selectedParty === 'ALL' ? 'inc' : selectedParty.toLowerCase();
      switch (sortBy) {
        case 'BOOTH_DESC':
          return b.booth_no - a.booth_no;
        case 'TURNOUT_DESC':
          return (b.data_2024?.total || 0) - (a.data_2024?.total || 0);
        case 'TURNOUT_22_DESC':
          return (b.data_2022?.total || 0) - (a.data_2022?.total || 0);
        case 'TURNOUT_19_DESC':
          return ((b.data_2019?.total || 0) - (a.data_2019?.total || 0));
        case 'TURNOUT_17_DESC':
          return ((b.data_2017?.total || 0) - (a.data_2017?.total || 0));
        case 'MARGIN_DESC':
          return (b.data_2024?.margin || 0) - (a.data_2024?.margin || 0);
        case 'SURVEY_SAMPLE_DESC':
          return (b.data_2026?.sample_size || 0) - (a.data_2026?.sample_size || 0);
        case 'BOOTH_ASC':
        default:
          return a.booth_no - b.booth_no;
      }
    });

    return result;
  }, [booths, selectedParty, partyFilter, searchQuery, sortBy, selectedYears]);

  // Sort options for CustomDropdown
  const sortOptions = useMemo(() => {
    return [
      { value: 'BOOTH_ASC', label: 'Booth No. (1 → 169)' },
      { value: 'BOOTH_DESC', label: 'Booth No. (169 → 1)' },
      { value: 'TURNOUT_DESC', label: 'Highest 2024 Turnout' },
      { value: 'TURNOUT_22_DESC', label: 'Highest 2022 Turnout' },
      { value: 'TURNOUT_19_DESC', label: 'Highest 2019 Turnout' },
      { value: 'TURNOUT_17_DESC', label: 'Highest 2017 Turnout' },
      { value: 'MARGIN_DESC', label: 'Highest 2024 Lead Margin' },
      { value: 'SURVEY_SAMPLE_DESC', label: 'Highest 2026 Survey Sample' },
    ];
  }, []);

  // Reset all filters
  const handleResetToCompleteList = () => {
    setSelectedParty('ALL');
    setPartyFilter('ALL');
    setSelectedYears([]);
    setSearchQuery('');
    setSortBy('BOOTH_ASC');
  };

  // 1-Click Telemetry Filter: Click from KPI Card to Party Hub & Booths
  const handleFilterByYearParty = (year, party) => {
    if (activeTab !== 'BOOTHS') {
      setActiveTab('BOOTHS');
    }

    const targetFilter = year === 2024 ? 'WON_24' : year === 2022 ? 'WON_22' : year === 2019 ? 'WON_19' : 'WON_17';

    // If already active, toggle off to complete view
    if (selectedParty === party && (partyFilter === targetFilter || (year === 2024 && partyFilter === 'WON_THIS_YEAR'))) {
      setSelectedParty('ALL');
      setPartyFilter('ALL');
      return;
    }

    setSelectedParty(party);
    setPartyFilter(targetFilter);

    // Smooth scroll down to party hub / table
    setTimeout(() => {
      const el = document.getElementById('party-analytics-hub') || document.getElementById('booth-performance-registry');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 60);
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

        {/* Dsidein Official PDF Watermark */}
        <div className="dsidein-print-watermark" aria-hidden="true">
          <img src="./dsidein_logo_transparent.png" alt="Dsidein" className="watermark-logo-img" />
          <div className="watermark-brand-name">DSIDEIN</div>
          <div className="watermark-sub-name">4-ELECTION HISTORICAL INTELLIGENCE & AUDIT</div>
          <div className="watermark-url">https://dsidein.com/amritsar-south-2017-2024</div>
        </div>

        {/* Print Master Report Header (Visible only on print) */}
        <div className="print-report-header">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: '15pt', fontWeight: 800, color: '#002b49' }}>
                19-AMRITSAR SOUTH ASSEMBLY SEGMENT (AMRITSAR PC)
              </div>
              <div style={{ fontSize: '10pt', color: '#475569', marginTop: '2px' }}>
                4-Election Master Comparative Intelligence: 2017 AE vs 2019 PE vs 2022 AE vs 2024 PE
              </div>
              <div style={{ fontSize: '8.5pt', color: '#64748b', marginTop: '4px' }}>
                Active Filter: {selectedParty === 'ALL' ? 'Complete Master List' : `${selectedParty} Segment`} | Total Booths: {filteredBooths.length} of 169
              </div>
            </div>
            <div style={{ textAlign: 'right', fontSize: '8.5pt', color: '#334155' }}>
              <span style={{ fontWeight: 800, color: '#002b49' }}>DSIDEIN COMMAND CENTER</span><br />
              <span>https://dsidein.com/amritsar-south-2017-2024</span>
            </div>
          </div>
        </div>

        {/* Scrollable Main Dashboard Area */}
        <main className="dsidein-main-body">
          {/* Page Title Bar */}
          <section className="dashboard-title-bar">
            <div className="title-text-group">
              <div className="constituency-tag">19-AMRITSAR SOUTH ASSEMBLY SEGMENT</div>
              <h1 className="main-title">4-Election Comparative Booth Intelligence</h1>
              <p className="main-subtitle">
                Comprehensive 10-Year Polling Telemetry: <strong>2017 Assembly</strong>, <strong>2019 Lok Sabha</strong>, <strong>2022 Assembly</strong>, and <strong>2024 Lok Sabha</strong> across all 169 Polling Stations
              </p>
            </div>

            <div className="title-action-buttons">
              <a 
                href="./Amritsar_South_2017_2019_2022_2024_Master_Comparison.xlsx" 
                download="Amritsar_South_2017_2019_2022_2024_Master_Comparison.xlsx"
                className="pill-action-btn green"
                style={{ background: '#059669', color: '#ffffff', borderColor: '#047857' }}
                title="Download 4-Election Master Comparison Excel (.xlsx)"
              >
                <span className="pill-btn-icon"><FileSpreadsheet size={14} /></span>
                <span className="pill-btn-label">4-Election Master Excel</span>
              </a>

              <a 
                href="./Amritsar_South_AC19_2022_vs_2024_Booth_List.pdf" 
                download="Amritsar_South_AC19_2022_vs_2024_Booth_List.pdf"
                className="pill-action-btn red"
                style={{ background: '#dc2626', color: '#ffffff', borderColor: '#b91c1c' }}
                title="Download Verified Booth List PDF"
              >
                <span className="pill-btn-icon"><Printer size={14} /></span>
                <span className="pill-btn-label">Booth List (PDF)</span>
              </a>

              <a 
                href="./Amritsar_South_Detailed_169_Boothwise_Masterplan.pdf" 
                download="Amritsar_South_Detailed_169_Boothwise_Masterplan.pdf"
                className="pill-action-btn purple"
                title="Download 169-Booth Master Plan (PDF)"
              >
                <span className="pill-btn-icon"><ClipboardList size={14} /></span>
                <span className="pill-btn-label">Master Plan (EN)</span>
              </a>

              <a 
                href="./Amritsar_South_Detailed_169_Boothwise_Masterplan_Punjabi.pdf" 
                download="Amritsar_South_Detailed_169_Boothwise_Masterplan_Punjabi.pdf"
                className="pill-action-btn amber"
                title="Download 169-Booth Master Plan in Punjabi (PDF)"
              >
                <span className="pill-btn-icon"><ClipboardList size={14} /></span>
                <span className="pill-btn-label">ਮਾਸਟਰ ਪਲਾਨ (PA)</span>
              </a>

              <button
                onClick={() => handleTabChange('ANALYTICS')}
                className="pill-action-btn blue"
                style={{ background: '#0284c7', color: '#ffffff', borderColor: '#0369a1' }}
                title="View Official ECI Verification & Booth Name vs Number Audit Report"
              >
                <span className="pill-btn-icon"><Building2 size={14} /></span>
                <span className="pill-btn-label">Verification & Continuity Audit</span>
              </button>

              <button 
                onClick={handlePrintMasterReport}
                className="pill-action-btn outline"
                title="Export View as PDF"
              >
                <span className="pill-btn-icon"><Printer size={14} /></span>
                <span className="pill-btn-label">Export PDF</span>
              </button>
            </div>
          </section>

          {/* 4-Election Historical KPI Highlights with 1-Click Telemetry */}
          <KPIBanner 
            summary={summary} 
            onFilterByYearParty={handleFilterByYearParty}
            selectedParty={selectedParty}
            activeFilter={partyFilter}
          />

          {/* Conditional View: Audit & Trends Tab vs Dashboard Tab */}
          {activeTab === 'ANALYTICS' && (
            <section style={{ marginBottom: '24px' }}>
              <AnalyticsView 
                booths={booths} 
                summary={summary} 
                onSelectBooth={(b) => setSelectedBooth(b)} 
              />
            </section>
          )}

          {/* Unified Registry Card */}
          <section id="booth-performance-registry" className="dsidein-registry-card">
            {/* Card Top Title Row */}
            <div className="registry-card-header">
              <div className="registry-title-group">
                <div className="registry-title-row">
                  <h2 className="registry-title">4-Election Booth Performance Registry</h2>
                  <span className="registry-booth-count">{filteredBooths.length} Booths</span>
                </div>
                <p className="registry-subtitle">
                  Historical vote tallies for 2017, 2019, 2022, 2024 and institutional continuity status across 19-Amritsar South
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
              booths={booths}
              selectedYears={selectedYears}
              setSelectedYears={setSelectedYears}
            />

            {/* Active Filter Notification Banner */}
            {(partyFilter !== 'ALL' || selectedParty !== 'ALL' || selectedYears.length > 0) && (
              <div className="active-filter-banner" style={{
                margin: '0 24px 12px 24px',
                padding: '8px 14px',
                background: 'var(--bg-surface-elevated, #f1f5f9)',
                border: '1px solid var(--border-medium, #cbd5e1)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.8125rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>Active Telemetry Filter:</span>
                  <span style={{
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: '4px',
                    background: selectedParty === 'INC' ? 'var(--color-inc-soft)' : selectedParty === 'AAP' ? 'var(--color-aap-soft)' : selectedParty === 'BJP' ? 'var(--color-bjp-soft)' : 'var(--border-subtle)',
                    color: selectedParty === 'INC' ? 'var(--color-inc)' : selectedParty === 'AAP' ? 'var(--color-aap)' : selectedParty === 'BJP' ? 'var(--color-bjp)' : 'var(--text-primary)'
                  }}>
                    {selectedYears.length > 0 ? (
                      <>
                        {selectedParty !== 'ALL' ? `${selectedParty} · ` : ''}Won in {selectedYears.map(y => "'" + y.toString().slice(-2)).join(' + ')} ({filteredBooths.length} Booths Matching)
                      </>
                    ) : (
                      <>
                        {selectedParty !== 'ALL' ? `${selectedParty} · ` : ''}{partyFilter.replace(/_/g, ' ')} ({filteredBooths.length} Booths)
                      </>
                    )}
                  </span>
                </div>
                <button
                  onClick={handleResetToCompleteList}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    padding: '2px 6px',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                  title="Clear active filter"
                >
                  <RotateCcw size={12} />
                  <span>Clear Filter</span>
                </button>
              </div>
            )}

            {/* Search & Sort Sub-Toolbar */}
            <div className="registry-toolbar">
              <div className="toolbar-search-wrap">
                <Search size={15} />
                <input
                  type="text"
                  className="toolbar-search-input"
                  placeholder="Search 169 booths by number, school, area (e.g. 1, Amrit School, ਕੋਟ ਖਾਲਸਾ)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Filter booths"
                />
              </div>

              <div className="toolbar-controls">
                <button
                  onClick={handlePrintMasterReport}
                  className="btn-toolbar-pdf"
                  title="Export Current Table View as PDF"
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
              selectedYears={selectedYears}
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
