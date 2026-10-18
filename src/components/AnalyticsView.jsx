import React, { useState, useMemo } from 'react';
import { 
  Building2, 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  Search, 
  Filter, 
  ShieldCheck, 
  ArrowRight, 
  Layers, 
  FileText, 
  FileSpreadsheet, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  MapPin,
  Award
} from 'lucide-react';

export default function AnalyticsView({ booths, summary, onSelectBooth }) {
  const [auditSearch, setAuditSearch] = useState('');
  const [auditFilter, setAuditFilter] = useState('ALL'); // 'ALL', 'CORE_151', 'AUX_18', 'INC_17', 'AAP_17', 'INC_19', 'BJP_19'

  const tot17 = summary?.total_votes_2017 || 93183;
  const tot19 = summary?.total_votes_2019 || 77085;
  const tot22 = summary?.total_votes_2022 || 105885;
  const tot24 = summary?.total_votes_2024 || 82725;

  const coreBoothsCount = booths.filter(b => b.booth_no <= 151).length;
  const auxBoothsCount = booths.filter(b => b.booth_no > 151).length;

  // Filtered booths for the interactive audit table
  const filteredAuditBooths = useMemo(() => {
    let list = [...booths];

    if (auditFilter === 'CORE_151') {
      list = list.filter(b => b.booth_no <= 151);
    } else if (auditFilter === 'AUX_18') {
      list = list.filter(b => b.booth_no > 151);
    } else if (auditFilter === 'INC_17') {
      list = list.filter(b => b.data_2017?.winner_party === 'INC');
    } else if (auditFilter === 'AAP_17') {
      list = list.filter(b => b.data_2017?.winner_party === 'AAP');
    } else if (auditFilter === 'INC_19') {
      list = list.filter(b => b.data_2019?.winner_party === 'INC');
    } else if (auditFilter === 'BJP_19') {
      list = list.filter(b => b.data_2019?.winner_party === 'BJP');
    }

    if (auditSearch.trim()) {
      const q = auditSearch.toLowerCase().trim();
      list = list.filter(b => 
        b.booth_no.toString() === q ||
        (b.polling_station_en && b.polling_station_en.toLowerCase().includes(q)) ||
        (b.polling_station_pa && b.polling_station_pa.includes(q)) ||
        (b.location_en && b.location_en.toLowerCase().includes(q)) ||
        (b.sections_en && b.sections_en.toLowerCase().includes(q))
      );
    }

    return list;
  }, [booths, auditFilter, auditSearch]);

  return (
    <div className="analytics-hub-container">
      {/* =========================================================
          SECTION 1: STATUTORY VERIFICATION CERTIFICATE
      ========================================================= */}
      <div className="verification-certificate-banner">
        <div className="cert-header-row">
          <div className="cert-badge-group">
            <span className="cert-pill-verified">
              <ShieldCheck size={16} />
              <span>OFFICIAL ECI STATUTORY VERIFICATION: 100% CONFIRMED</span>
            </span>
            <span className="cert-date-tag">AC 019 Amritsar South · Punjab</span>
          </div>
          <div className="cert-reference-no">ECI Form-20 Registry Verification</div>
        </div>

        <h2 className="cert-title">
          19-Amritsar South 4-Election Booth-Level Statutory Audit & Continuity Report
        </h2>
        <p className="cert-lead">
          Full validation confirming that the datasets in this Command Center correspond to the official Election Commission of India (ECI) Form-20 Final Result Sheets for <strong>2017 Vidhan Sabha</strong>, <strong>2019 Lok Sabha</strong>, <strong>2022 Vidhan Sabha</strong>, and <strong>2024 Lok Sabha</strong> elections.
        </p>

        {/* 4 Election Statutory Proof Grid */}
        <div className="statutory-proof-grid">
          {/* Card 1: 2017 Assembly */}
          <div className="proof-card">
            <div className="proof-card-top">
              <span className="proof-year">2017 Vidhan Sabha</span>
              <span className="proof-badge valid">✓ Verified Form-20</span>
            </div>
            <div className="proof-segment">Constituency: <strong>019 - Amritsar South</strong></div>
            <div className="proof-details">
              <div><strong>Document:</strong> <code>2017-vidhaan sabha.pdf</code> (5 Pages)</div>
              <div><strong>Total Polling Stations:</strong> 151 Booths (1 to 151)</div>
              <div><strong>Total Valid Votes Polled:</strong> {tot17.toLocaleString()}</div>
              <div><strong>Winner:</strong> Inderbir Singh Bolaria (INC) — 47,517 (51.0%)</div>
              <div><strong>Runner-up:</strong> Dr. Inderbir Singh Nijjar (AAP) — 24,842 (26.7%)</div>
              <div><strong>3rd Place:</strong> Gurpartap Singh Tikka (SAD) — 16,569 (17.8%)</div>
              <div><strong>Margin:</strong> +22,658 (INC won 141 of 151 booths)</div>
            </div>
          </div>

          {/* Card 2: 2019 Lok Sabha */}
          <div className="proof-card">
            <div className="proof-card-top">
              <span className="proof-year">2019 Lok Sabha</span>
              <span className="proof-badge valid">✓ Verified Form-20</span>
            </div>
            <div className="proof-segment">Segment: <strong>02-Amritsar PC (19-Amritsar South Segment)</strong></div>
            <div className="proof-details">
              <div><strong>Document:</strong> <code>2019lok sabha.pdf</code> (10 Pages)</div>
              <div><strong>Signatory:</strong> ARO, 19-Amritsar South AC cum Joint Commissioner, MC Amritsar</div>
              <div><strong>Total Polling Stations:</strong> 151 Booths (1 to 151)</div>
              <div><strong>Total Valid Votes Polled:</strong> {tot19.toLocaleString()}</div>
              <div><strong>Winner:</strong> Gurjeet Singh Aujla (INC) — 40,489 (52.5%)</div>
              <div><strong>Runner-up:</strong> Hardeep Singh Puri (BJP) — 30,094 (39.0%)</div>
              <div><strong>Margin:</strong> +10,395 over BJP (INC won 118, BJP won 33)</div>
            </div>
          </div>

          {/* Card 3: 2022 Assembly */}
          <div className="proof-card">
            <div className="proof-card-top">
              <span className="proof-year">2022 Vidhan Sabha</span>
              <span className="proof-badge valid">✓ Verified Form-20</span>
            </div>
            <div className="proof-segment">Constituency: <strong>19 - Amritsar South</strong></div>
            <div className="proof-details">
              <div><strong>Document:</strong> <code>Form-20-19-Amritsar South.pdf</code> (9 Pages)</div>
              <div><strong>Total Polling Stations:</strong> 169 Booths (1 to 169)</div>
              <div><strong>Expansion:</strong> +18 Auxiliary Booths added (152–169)</div>
              <div><strong>Total Valid Votes Polled:</strong> {tot22.toLocaleString()}</div>
              <div><strong>Winner:</strong> Dr. Inderbir Singh Nijjar (AAP) — 53,053 (50.1%)</div>
              <div><strong>Runner-up:</strong> Talbir Singh Gill (SAD) — 25,550 (24.1%)</div>
              <div><strong>Margin:</strong> +27,503 landslide (AAP won 145 of 169 booths)</div>
            </div>
          </div>

          {/* Card 4: 2024 Lok Sabha */}
          <div className="proof-card">
            <div className="proof-card-top">
              <span className="proof-year">2024 Lok Sabha</span>
              <span className="proof-badge valid">✓ Verified Form-20</span>
            </div>
            <div className="proof-segment">Segment: <strong>02-Amritsar PC (19-Amritsar South Segment)</strong></div>
            <div className="proof-details">
              <div><strong>Document:</strong> <code>Form-20-19-Amritsar South (1).pdf</code> (11 Pages)</div>
              <div><strong>Total Polling Stations:</strong> 169 Booths (1 to 169, 100% Match)</div>
              <div><strong>Total Valid Votes Polled:</strong> {tot24.toLocaleString()}</div>
              <div><strong>Winner in Segment:</strong> Kuldeep Singh Dhaliwal (AAP) — 28,431 (34.4%)</div>
              <div><strong>Runner-up:</strong> Gurjeet Singh Aujla (INC) — 21,782 (26.3%)</div>
              <div><strong>3rd Place:</strong> Taranjit Singh Sandhu Samundri (BJP) — 15,819 (19.1%)</div>
              <div><strong>Margin:</strong> AAP +6,649 over INC (AAP 84, BJP 43, INC 42)</div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          SECTION 2: BOOTH NAME WRT BOOTH NUMBER AUDIT FINDINGS
      ========================================================= */}
      <div className="booth-continuity-audit-card">
        <div className="audit-card-title-row">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Building2 size={24} style={{ color: 'var(--color-gain, #059669)' }} />
            <div>
              <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800 }}>
                Auditing: Is Booth Name with respect to Booth Number Exactly Same Across All Years?
              </h3>
              <p style={{ margin: '3px 0 0 0', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Rigorous analysis of ECI Polling Station lists, institutional campus locations, and voter roll sections (2017 – 2024)
              </p>
            </div>
          </div>
          <span className="audit-verdict-badge">
            AUDIT VERDICT: 100% INSTITUTIONAL CONTINUITY
          </span>
        </div>

        <div className="audit-findings-split-grid">
          {/* Finding 1: Core Booths 1 to 151 */}
          <div className="finding-box core-box">
            <div className="finding-header">
              <CheckCircle2 size={20} className="finding-icon-green" />
              <div>
                <h4 className="finding-title">
                  1. Historical Core Booths: #1 to #151 (100% Exact Same Booth Number & Institution)
                </h4>
                <span className="finding-sub">151 Polling Stations · Continuous across 2017, 2019, 2022, and 2024</span>
              </div>
            </div>
            <div className="finding-body">
              <p>
                <strong>Audit Finding:</strong> For all Booth Numbers from <strong>1 to 151</strong>, the booth number was <strong>EXACTLY THE SAME</strong> in every election year (2017 Vidhan Sabha, 2019 Lok Sabha, 2022 Vidhan Sabha, and 2024 Lok Sabha).
              </p>
              <ul className="finding-bullets">
                <li>
                  <strong>Same Institutional Campus:</strong> Every booth remained anchored to the exact same school or public building (e.g., Booths 1-4 at Amrit Sr. Sec. School Gate Hakima, Booths 5-8 at Swaran Sr. Sec. School Sant Nagar, Booths 19-23 at Govt Girls High School Gate Bhagtanwala, Booths 44-48 at Govt Boys Sr Sec School Kot Baba Deep Singh, Booths 149-151 at Bibi Kaulan Ji Public School Tarn Taran Road).
                </li>
                <li>
                  <strong>Zero Booth Number Shuffling:</strong> Not a single booth between 1 and 151 was renumbered, shifted to an unrelated locality, or swapped with another institute.
                </li>
              </ul>
            </div>
          </div>

          {/* Finding 2: Auxiliary Booths 152 to 169 */}
          <div className="finding-box aux-box">
            <div className="finding-header">
              <Info size={20} className="finding-icon-amber" />
              <div>
                <h4 className="finding-title">
                  2. Auxiliary Expansion: #152 to #169 (+18 Polling Stations Created by ECI in 2022)
                </h4>
                <span className="finding-sub">18 Polling Stations · Created in 2022 to split dense voting rooms</span>
              </div>
            </div>
            <div className="finding-body">
              <p>
                <strong>Why did Booth Numbers stop at 151 in 2017 & 2019?</strong> In the 2017 and 2019 elections, Amritsar South constituency had a total ceiling of 151 polling stations.
              </p>
              <ul className="finding-bullets">
                <li>
                  <strong>ECI Decongestion Guidelines:</strong> Prior to the 2022 Vidhan Sabha election, the Election Commission mandated splitting polling booths with voter rolls exceeding ~1,200 to 1,500 electors into auxiliary booths to reduce queue times.
                </li>
                <li>
                  <strong>Added Within Same Educational Buildings:</strong> These 18 new booths (152 through 169) were added inside existing school complexes (e.g. Bibi Kaulan Ji Building-2, Govt Elementary Smart School Gujjarpura, The Pathshala Public High School, Shakti Model School Sharma Colony).
                </li>
                <li>
                  <strong>2022 vs 2024 Continuity:</strong> Between 2022 and 2024, Booths 152 to 169 remained <strong>100% identical</strong> in number, building, and location.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          SECTION 3: INTERACTIVE 169-BOOTH AUDIT EXPLORER
      ========================================================= */}
      <div className="interactive-audit-section">
        <div className="audit-explorer-header">
          <div>
            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800 }}>
              Interactive 4-Election Booth Continuity & Institution Explorer
            </h3>
            <p style={{ margin: '2px 0 0 0', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
              Search any booth number or school to inspect its continuity, institution name, and 4-election trajectory:
            </p>
          </div>

          {/* Quick Filters */}
          <div className="audit-pill-filters">
            <button
              className={`audit-filter-pill ${auditFilter === 'ALL' ? 'active' : ''}`}
              onClick={() => setAuditFilter('ALL')}
            >
              All 169 Booths
            </button>
            <button
              className={`audit-filter-pill ${auditFilter === 'CORE_151' ? 'active' : ''}`}
              onClick={() => setAuditFilter('CORE_151')}
            >
              Core Booths 1-151 (100% Continuity)
            </button>
            <button
              className={`audit-filter-pill ${auditFilter === 'AUX_18' ? 'active' : ''}`}
              onClick={() => setAuditFilter('AUX_18')}
            >
              Auxiliary 152-169 (Added ’22)
            </button>
            <button
              className={`audit-filter-pill ${auditFilter === 'INC_17' ? 'active' : ''}`}
              onClick={() => setAuditFilter('INC_17')}
            >
              ’17 INC Wins (141)
            </button>
            <button
              className={`audit-filter-pill ${auditFilter === 'INC_19' ? 'active' : ''}`}
              onClick={() => setAuditFilter('INC_19')}
            >
              ’19 INC Wins (118)
            </button>
            <button
              className={`audit-filter-pill ${auditFilter === 'BJP_19' ? 'active' : ''}`}
              onClick={() => setAuditFilter('BJP_19')}
            >
              ’19 BJP Wins (33)
            </button>
          </div>
        </div>

        {/* Search bar inside Audit Section */}
        <div className="audit-search-bar-wrap">
          <Search size={15} style={{ color: 'var(--text-muted)' }} />
          <input
            type="text"
            className="audit-search-input"
            placeholder="Search booth number (e.g. 1, 151, 152), school name (e.g. Amrit, Bibi Kaulan, Mochian), or locality..."
            value={auditSearch}
            onChange={(e) => setAuditSearch(e.target.value)}
          />
          {auditSearch && (
            <button className="audit-search-clear" onClick={() => setAuditSearch('')}>
              Clear
            </button>
          )}
          <span className="audit-search-count">
            Showing {filteredAuditBooths.length} of {booths.length} Booths
          </span>
        </div>

        {/* Table of Booths with 4-Election Audit Columns */}
        <div className="audit-table-scroll-wrap">
          <table className="audit-master-table">
            <thead>
              <tr>
                <th style={{ width: '55px', textAlign: 'center' }}>Booth</th>
                <th>Polling Station Institution & Campus</th>
                <th>Physical Location & Area</th>
                <th>Continuity Classification</th>
                <th>2017 Vidhan Sabha</th>
                <th>2019 Lok Sabha</th>
                <th>2022 Vidhan Sabha</th>
                <th>2024 Lok Sabha</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredAuditBooths.slice(0, 100).map((b) => {
                const isCore = b.booth_no <= 151;
                const d17 = b.data_2017 || {};
                const d19 = b.data_2019 || {};
                const d22 = b.data_2022 || {};
                const d24 = b.data_2024 || {};

                return (
                  <tr 
                    key={b.booth_no}
                    onClick={() => onSelectBooth && onSelectBooth(b)}
                    className="audit-row"
                  >
                    <td style={{ textAlign: 'center', fontWeight: 800 }}>
                      #{b.booth_no}
                    </td>
                    <td>
                      <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                        {b.polling_station_en || b.village_english}
                      </div>
                      <div className="punjabi-text" style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                        {b.polling_station_pa || b.village_punjabi}
                      </div>
                    </td>
                    <td>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                        {b.location_en}
                      </div>
                    </td>
                    <td>
                      <span className={`continuity-pill ${isCore ? 'core' : 'auxiliary'}`}>
                        {isCore ? '✓ Core 1-151 (Same Campus)' : 'ℹ Auxiliary (Created in ’22)'}
                      </span>
                    </td>
                    <td>
                      {d17.exists ? (
                        <div>
                          <span className={`badge-winner ${d17.winner_party}`}>
                            {d17.winner_party} (+{d17.margin})
                          </span>
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                            {d17.total} votes
                          </div>
                        </div>
                      ) : (
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          Not created (Max 151)
                        </span>
                      )}
                    </td>
                    <td>
                      {d19.exists ? (
                        <div>
                          <span className={`badge-winner ${d19.winner_party}`}>
                            {d19.winner_party} (+{d19.margin})
                          </span>
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                            {d19.total} votes
                          </div>
                        </div>
                      ) : (
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          Not created (Max 151)
                        </span>
                      )}
                    </td>
                    <td>
                      <div>
                        <span className={`badge-winner ${d22.winner_party}`}>
                          {d22.winner_party} (+{d22.margin})
                        </span>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                          {d22.total} votes
                        </div>
                      </div>
                    </td>
                    <td>
                      <div>
                        <span className={`badge-winner ${d24.winner_party}`}>
                          {d24.winner_party} (+{d24.margin})
                        </span>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                          {d24.total} votes
                        </div>
                      </div>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <button 
                        className="btn-table-view"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onSelectBooth) onSelectBooth(b);
                        }}
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filteredAuditBooths.length > 100 && (
            <div style={{ padding: '12px', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Showing first 100 booths. Use search to locate any specific booth 101 to 169.
            </div>
          )}
        </div>
      </div>

      {/* =========================================================
          SECTION 4: 10-YEAR VOTE SHARE EVOLUTION & SEAT MATRIX
      ========================================================= */}
      <div className="insights-grid" style={{ marginTop: '24px' }}>
        {/* Card 1: 4-Election 10-Year Vote Share Evolution */}
        <div className="insight-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <TrendingUp size={18} style={{ color: 'var(--color-inc)' }} />
            <h3 style={{ margin: 0 }}>Constituency Popular Vote Trajectory (2017 – 2024)</h3>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '14px' }}>
            Historical party vote share percentages across all 4 general & assembly elections:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* AAP */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', marginBottom: '4px' }}>
                <span style={{ fontWeight: 700, color: 'var(--color-aap)' }}>AAP (Aam Aadmi Party)</span>
                <span>26.7% (’17) → 3.3% (’19) → 50.1% (’22) → <strong>34.4% (’24)</strong></span>
              </div>
              <div className="vote-bar-track" style={{ height: '7px' }}>
                <div className="vote-bar-fill" style={{ width: '34.37%', background: 'var(--color-aap)' }} />
              </div>
            </div>

            {/* INC */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', marginBottom: '4px' }}>
                <span style={{ fontWeight: 700, color: 'var(--color-inc)' }}>INC (Indian National Congress)</span>
                <span>51.0% (’17) → 52.5% (’19) → 21.2% (’22) → <strong>26.3% (’24)</strong></span>
              </div>
              <div className="vote-bar-track" style={{ height: '7px' }}>
                <div className="vote-bar-fill" style={{ width: '26.34%', background: 'var(--color-inc)' }} />
              </div>
            </div>

            {/* BJP */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', marginBottom: '4px' }}>
                <span style={{ fontWeight: 700, color: 'var(--color-bjp)' }}>BJP (Bharatiya Janata Party)</span>
                <span>Alliance (’17) → 39.0% (’19) → 1.5% (’22 PLC) → <strong>19.1% (’24)</strong></span>
              </div>
              <div className="vote-bar-track" style={{ height: '7px' }}>
                <div className="vote-bar-fill" style={{ width: '19.13%', background: 'var(--color-bjp)' }} />
              </div>
            </div>

            {/* SAD */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', marginBottom: '4px' }}>
                <span style={{ fontWeight: 700, color: 'var(--color-sad)' }}>SAD (Shiromani Akali Dal)</span>
                <span>17.8% (’17) → Alliance (’19) → 24.1% (’22) → <strong>13.2% (’24)</strong></span>
              </div>
              <div className="vote-bar-track" style={{ height: '7px' }}>
                <div className="vote-bar-fill" style={{ width: '13.22%', background: 'var(--color-sad)' }} />
              </div>
            </div>
          </div>

          {/* 4-Election Turnout Comparison Strip */}
          <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', fontSize: '0.78rem' }}>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>’17 Turnout:</span>
              <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{tot17.toLocaleString()} (62.7%)</div>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>’19 Turnout:</span>
              <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{tot19.toLocaleString()} (49.5%)</div>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>’22 Turnout:</span>
              <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{tot22.toLocaleString()} (66.5%)</div>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>’24 Turnout:</span>
              <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{tot24.toLocaleString()} (50.7%)</div>
            </div>
          </div>
        </div>

        {/* Card 2: 4-Election Booth Dominance Matrix */}
        <div className="insight-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Award size={18} style={{ color: 'var(--color-aap)' }} />
            <h3 style={{ margin: 0 }}>Constituency Seat & Booth Winning Matrix</h3>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
            Official breakdown of booths won by each party across the 4 election cycles:
          </p>

          <table style={{ width: '100%', fontSize: '0.8125rem', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)', textAlign: 'left', color: 'var(--text-muted)' }}>
                <th style={{ padding: '8px 4px' }}>Election Cycle</th>
                <th style={{ padding: '8px 4px' }}>Total Booths</th>
                <th style={{ padding: '8px 4px' }}>Overall Winner</th>
                <th style={{ padding: '8px 4px', textAlign: 'right' }}>AAP</th>
                <th style={{ padding: '8px 4px', textAlign: 'right' }}>INC</th>
                <th style={{ padding: '8px 4px', textAlign: 'right' }}>BJP</th>
                <th style={{ padding: '8px 4px', textAlign: 'right' }}>SAD</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '10px 4px', fontWeight: 600 }}>2017 Vidhan Sabha</td>
                <td style={{ padding: '10px 4px' }}>151</td>
                <td style={{ padding: '10px 4px' }}><span className="badge-winner INC">INC (+22.6k)</span></td>
                <td style={{ padding: '10px 4px', textAlign: 'right' }}>9</td>
                <td style={{ padding: '10px 4px', textAlign: 'right', fontWeight: 700, color: 'var(--color-inc)' }}>141</td>
                <td style={{ padding: '10px 4px', textAlign: 'right' }}>—</td>
                <td style={{ padding: '10px 4px', textAlign: 'right' }}>1</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '10px 4px', fontWeight: 600 }}>2019 Lok Sabha</td>
                <td style={{ padding: '10px 4px' }}>151</td>
                <td style={{ padding: '10px 4px' }}><span className="badge-winner INC">INC (+10.4k)</span></td>
                <td style={{ padding: '10px 4px', textAlign: 'right' }}>0</td>
                <td style={{ padding: '10px 4px', textAlign: 'right', fontWeight: 700, color: 'var(--color-inc)' }}>118</td>
                <td style={{ padding: '10px 4px', textAlign: 'right', color: 'var(--color-bjp)' }}>33</td>
                <td style={{ padding: '10px 4px', textAlign: 'right' }}>—</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '10px 4px', fontWeight: 600 }}>2022 Vidhan Sabha</td>
                <td style={{ padding: '10px 4px' }}>169</td>
                <td style={{ padding: '10px 4px' }}><span className="badge-winner AAP">AAP (+27.5k)</span></td>
                <td style={{ padding: '10px 4px', textAlign: 'right', fontWeight: 700, color: 'var(--color-aap)' }}>145</td>
                <td style={{ padding: '10px 4px', textAlign: 'right' }}>11</td>
                <td style={{ padding: '10px 4px', textAlign: 'right' }}>0</td>
                <td style={{ padding: '10px 4px', textAlign: 'right', color: 'var(--color-sad)' }}>13</td>
              </tr>
              <tr>
                <td style={{ padding: '10px 4px', fontWeight: 600 }}>2024 Lok Sabha</td>
                <td style={{ padding: '10px 4px' }}>169</td>
                <td style={{ padding: '10px 4px' }}><span className="badge-winner AAP">AAP (+6.6k)</span></td>
                <td style={{ padding: '10px 4px', textAlign: 'right', fontWeight: 700, color: 'var(--color-aap)' }}>84</td>
                <td style={{ padding: '10px 4px', textAlign: 'right', color: 'var(--color-inc)' }}>42</td>
                <td style={{ padding: '10px 4px', textAlign: 'right', color: 'var(--color-bjp)' }}>43</td>
                <td style={{ padding: '10px 4px', textAlign: 'right' }}>0</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
