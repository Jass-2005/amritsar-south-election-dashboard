import React, { useState } from 'react';
import { LayoutGrid, List, ArrowUpRight, ArrowDownRight, Minus, ChevronRight, Printer, CheckCircle2, Info } from 'lucide-react';

export default function BoothGrid({ 
  booths, 
  selectedParty, 
  onSelectBooth, 
  onExportBoothPdf, 
  partyFilter,
  selectedYears = []
}) {
  const [viewMode, setViewMode] = useState('LIST'); // 'LIST' or 'GRID'

  const isAllMode = selectedParty === 'ALL';
  const pKey = selectedParty.toLowerCase(); // 'aap', 'inc', 'bjp', 'sad'

  if (booths.length === 0) {
    return (
      <div className="empty-state">
        <p style={{ fontSize: '1rem', fontWeight: 600 }}>No booths match the selected criteria.</p>
        <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '4px' }}>
          Try clearing the search query or category filter.
        </p>
      </div>
    );
  }

  return (
    <div className="booth-container">
      {/* List Header Bar */}
      <div className="booth-list-header">
        <div className="list-title-wrap">
          <span className="list-count-badge">{booths.length} Booths</span>
          <span className="list-filter-label">
            {selectedYears.length > 0 ? (
              <span style={{ fontWeight: 700, color: 'var(--accent-primary, #2563eb)' }}>
                {selectedParty !== 'ALL' ? `${selectedParty} · ` : ''}Won in {selectedYears.map(y => "'" + y.toString().slice(-2)).join(' + ')} ({booths.length} Booths Matching)
              </span>
            ) : isAllMode ? (
              partyFilter === 'ALL' ? 'Complete 4-Election Master List (All 169 Booths)' :
              partyFilter === 'CORE_151' ? 'Historical Core Booths 1-151 (100% Retained from 2017 to 2024)' :
              partyFilter === 'AUXILIARY_18' ? 'Auxiliary Booths 152-169 (Added in 2022 Delimitation/Rationalization)' :
              partyFilter === 'AAP_WINS' ? 'Booths Won by AAP in 2024 (84 Booths)' :
              partyFilter === 'BJP_WINS' ? 'Booths Won by BJP in 2024 (43 Booths)' :
              partyFilter === 'INC_WINS' ? 'Booths Won by INC in 2024 (42 Booths)' :
              partyFilter === 'INC_2017_WINS' ? 'Booths Won by INC in 2017 (141 Booths)' :
              partyFilter === 'AAP_2017_WINS' ? 'Booths Won by AAP in 2017 (9 Booths)' :
              partyFilter === 'INC_2019_WINS' ? 'Booths Won by INC in 2019 (118 Booths)' :
              partyFilter === 'BJP_2019_WINS' ? 'Booths Won by BJP in 2019 (33 Booths)' :
              partyFilter === 'FLIPPED_ONLY' ? 'Flipped Booths (2022 vs 2024)' :
              partyFilter === 'RETAINED_ONLY' ? 'Retained Booths (2022 vs 2024)' : 'Booths'
            ) : (
              partyFilter === 'ALL' ? `All 169 Booths for ${selectedParty}` :
              partyFilter === 'WON_BOTH' ? `${selectedParty} Strongholds (Won Both 2022 & 2024)` :
              partyFilter === 'GAINED' ? `${selectedParty} Gains (Won in 2024, Lost in 2022)` :
              partyFilter === 'LOST_24' ? `${selectedParty} Losses (Won in 2022, Lost in 2024)` :
              partyFilter === 'WEAK' ? `Weak Booths for ${selectedParty} (< 20% Vote Share)` :
              partyFilter === 'LOST_BOTH' ? `Booths Lost Both Times by ${selectedParty}` : 'Booths'
            )}
          </span>
        </div>

        <div className="view-toggle-btns">
          <button 
            className={`toggle-btn ${viewMode === 'LIST' ? 'active' : ''}`}
            onClick={() => setViewMode('LIST')}
            title="List View"
            aria-label="List View"
          >
            <List size={16} />
            <span>List</span>
          </button>
          <button 
            className={`toggle-btn ${viewMode === 'GRID' ? 'active' : ''}`}
            onClick={() => setViewMode('GRID')}
            title="Grid Cards View"
            aria-label="Grid Cards View"
          >
            <LayoutGrid size={16} />
            <span>Grid</span>
          </button>
        </div>
      </div>

      {/* =========================================================
          VIEW MODE 1: 4-ELECTION LIST TABLE
      ========================================================= */}
      {viewMode === 'LIST' && (
        <div className="clean-table-wrap">
          <table className="clean-table">
            <thead>
              {isAllMode ? (
                /* Complete List Headers with 4 Elections */
                <tr>
                  <th style={{ width: '55px', textAlign: 'center' }}>No.</th>
                  <th>Polling Station / Location</th>
                  <th>Continuity</th>
                  <th>'17 Win</th>
                  <th>'19 Win</th>
                  <th>'22 Win</th>
                  <th>'24 Win</th>
                  <th>'26 Survey</th>
                  <th>4-Election Trajectory</th>
                  <th style={{ textAlign: 'right' }}>'24 Turnout</th>
                  <th style={{ width: '84px', textAlign: 'center' }}>Action</th>
                </tr>
              ) : (
                /* Party-Specific Headers */
                <tr>
                  <th style={{ width: '55px', textAlign: 'center' }}>No.</th>
                  <th>Polling Station / Location</th>
                  <th style={{ textAlign: 'right' }}>'17 ({selectedParty})</th>
                  <th style={{ textAlign: 'right' }}>'19 ({selectedParty})</th>
                  <th style={{ textAlign: 'right' }}>'22 ({selectedParty})</th>
                  <th style={{ textAlign: 'right' }}>'24 ({selectedParty})</th>
                  <th>'22 Win</th>
                  <th>'24 Win</th>
                  <th>'26 Survey</th>
                  <th>Status</th>
                  <th style={{ width: '84px', textAlign: 'center' }}>Action</th>
                </tr>
              )}
            </thead>
            <tbody>
              {booths.map((b) => {
                const isCore = b.booth_no <= 151;
                const d17 = b.data_2017 || {};
                const d19 = b.data_2019 || {};
                const d22 = b.data_2022 || {};
                const d24 = b.data_2024 || {};
                const d26 = b.data_2026 || {};

                const w17 = d17.exists ? d17.winner_party : '—';
                const w19 = d19.exists ? d19.winner_party : '—';
                const w22 = d22.winner_party || '—';
                const w24 = d24.winner_party || '—';

                if (isAllMode) {
                  return (
                    <tr 
                      key={b.booth_no}
                      onClick={() => onSelectBooth(b)}
                      title={`Click to inspect 4-Election Dossier for Booth #${b.booth_no}`}
                    >
                      <td style={{ textAlign: 'center' }}>
                        <span className="booth-avatar-badge">{b.booth_no}</span>
                      </td>

                      <td>
                        <div className="village-en">{b.polling_station_en || b.village_english}</div>
                        <div className="village-pa punjabi-font">{b.polling_station_pa || b.village_punjabi}</div>
                      </td>

                      <td>
                        <span className={`continuity-pill ${isCore ? 'core' : 'auxiliary'}`}>
                          {isCore ? 'Core 1-151' : 'Auxiliary ’22'}
                        </span>
                      </td>

                      <td className={selectedYears.includes(2017) ? 'matched-year-cell' : ''}>
                        {d17.exists ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <span className={`mini-winner ${w17} ${selectedYears.includes(2017) ? 'winner-glow' : ''}`}>{w17}</span>
                            <span className="pct-sub">+{d17.margin}</span>
                          </div>
                        ) : (
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>—</span>
                        )}
                      </td>

                      <td className={selectedYears.includes(2019) ? 'matched-year-cell' : ''}>
                        {d19.exists ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <span className={`mini-winner ${w19} ${selectedYears.includes(2019) ? 'winner-glow' : ''}`}>{w19}</span>
                            <span className="pct-sub">+{d19.margin}</span>
                          </div>
                        ) : (
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>—</span>
                        )}
                      </td>

                      <td className={selectedYears.includes(2022) ? 'matched-year-cell' : ''}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <span className={`mini-winner ${w22} ${selectedYears.includes(2022) ? 'winner-glow' : ''}`}>{w22}</span>
                          <span className="pct-sub">+{d22.margin}</span>
                        </div>
                      </td>

                      <td className={selectedYears.includes(2024) ? 'matched-year-cell' : ''}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <span className={`mini-winner ${w24} ${selectedYears.includes(2024) ? 'winner-glow' : ''}`}>{w24}</span>
                          <span className="pct-sub">+{d24.margin}</span>
                        </div>
                      </td>

                      <td>
                        {d26.sample_size > 0 ? (
                          <span className={`mini-winner ${d26.leading_party}`}>
                            {d26.leading_party}
                          </span>
                        ) : (
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>—</span>
                        )}
                      </td>

                      <td>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                          <span className="trajectory-table-text" style={{ fontSize: '0.75rem' }}>
                            {b.trajectory_4_elections}
                          </span>
                          {selectedYears.length >= 2 && (
                            <span className="trajectory-match-badge">
                              ✓ Won {selectedYears.map(y => "'" + y.toString().slice(-2)).join('+')}
                            </span>
                          )}
                        </div>
                      </td>

                      <td style={{ textAlign: 'right', fontWeight: 600 }}>
                        {d24.total?.toLocaleString() || '—'}
                      </td>

                      <td style={{ textAlign: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                          <button
                            className="btn-table-pdf"
                            title={`Export Booth #${b.booth_no} as PDF`}
                            onClick={(e) => {
                              e.stopPropagation();
                              onExportBoothPdf(b);
                            }}
                          >
                            <Printer size={12} />
                            <span>PDF</span>
                          </button>
                          <button
                            className="btn-table-view"
                            title={`Inspect Booth #${b.booth_no}`}
                            onClick={() => onSelectBooth(b)}
                          >
                            <span>View</span>
                            <ChevronRight size={12} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                }

                // Party-Specific Row
                const v17 = d17.exists ? (d17[pKey] || 0) : '—';
                const v19 = d19.exists ? (d19[pKey] || 0) : '—';
                const v22 = d22[pKey] || 0;
                const v24 = d24[pKey] || 0;

                let catLabel = 'Lost Both';
                let catClass = 'neutral';
                if (w22 === selectedParty && w24 === selectedParty) {
                  catLabel = 'Won Both';
                  catClass = 'won';
                } else if (w22 !== selectedParty && w24 === selectedParty) {
                  catLabel = 'Gained in ’24';
                  catClass = 'gained';
                } else if (w22 === selectedParty && w24 !== selectedParty) {
                  catLabel = `Lost to ${w24}`;
                  catClass = 'lost';
                }

                return (
                  <tr 
                    key={b.booth_no}
                    onClick={() => onSelectBooth(b)}
                    title={`Click to inspect Booth #${b.booth_no}`}
                  >
                    <td style={{ textAlign: 'center' }}>
                      <span className="booth-avatar-badge">{b.booth_no}</span>
                    </td>

                    <td>
                      <div className="village-en">{b.polling_station_en || b.village_english}</div>
                      <div className="village-pa punjabi-font">{b.polling_station_pa || b.village_punjabi}</div>
                    </td>

                    <td style={{ textAlign: 'right' }}>
                      <strong>{v17}</strong>
                    </td>

                    <td style={{ textAlign: 'right' }}>
                      <strong>{v19}</strong>
                    </td>

                    <td style={{ textAlign: 'right' }}>
                      <strong>{v22}</strong>
                      <span className="pct-sub">({d22[`${pKey}_pct`]}%)</span>
                    </td>

                    <td style={{ textAlign: 'right' }}>
                      <strong>{v24}</strong>
                      <span className="pct-sub">({d24[`${pKey}_pct`]}%)</span>
                    </td>

                    <td>
                      <span className={`mini-winner ${w22}`}>{w22}</span>
                    </td>

                    <td>
                      <span className={`mini-winner ${w24}`}>{w24}</span>
                    </td>

                    <td>
                      <span className={`mini-winner ${d26.leading_party || 'PENDING'}`}>
                        {d26.leading_party || 'Pending'}
                      </span>
                    </td>

                    <td>
                      <span className={`cat-pill ${catClass}`}>{catLabel}</span>
                    </td>

                    <td style={{ textAlign: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                        <button
                          className="btn-table-pdf"
                          title={`Export Booth #${b.booth_no} as PDF`}
                          onClick={(e) => {
                            e.stopPropagation();
                            onExportBoothPdf(b);
                          }}
                        >
                          <Printer size={12} />
                          <span>PDF</span>
                        </button>
                        <button
                          className="btn-table-view"
                          title={`Inspect Booth #${b.booth_no}`}
                          onClick={() => onSelectBooth(b)}
                        >
                          <span>View</span>
                          <ChevronRight size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* =========================================================
          VIEW MODE 2: 4-ELECTION GRID CARDS
      ========================================================= */}
      {viewMode === 'GRID' && (
        <div className="grid-cards-layout">
          {booths.map((b) => {
            const isCore = b.booth_no <= 151;
            const d17 = b.data_2017 || {};
            const d19 = b.data_2019 || {};
            const d22 = b.data_2022 || {};
            const d24 = b.data_2024 || {};
            const d26 = b.data_2026 || {};

            const w17 = d17.exists ? d17.winner_party : '—';
            const w19 = d19.exists ? d19.winner_party : '—';
            const w22 = d22.winner_party || '—';
            const w24 = d24.winner_party || '—';

            return (
              <div 
                key={b.booth_no} 
                className="booth-card"
                onClick={() => onSelectBooth(b)}
              >
                <div className="card-top-row">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                    <span className="card-booth-badge">#{b.booth_no}</span>
                    <span className={`continuity-pill ${isCore ? 'core' : 'auxiliary'}`}>
                      {isCore ? 'Core 1-151' : 'Auxiliary ’22'}
                    </span>
                    {selectedYears.length >= 2 && (
                      <span className="trajectory-match-badge">
                        ✓ Won in {selectedYears.map(y => "'" + y.toString().slice(-2)).join('+')}
                      </span>
                    )}
                  </div>
                  <span className="trajectory-pill-mini">
                    {b.trajectory_4_elections}
                  </span>
                </div>

                <div className="card-village-name">{b.polling_station_en || b.village_english}</div>
                <div className="card-village-punjabi punjabi-font">{b.polling_station_pa || b.village_punjabi}</div>

                <div className="card-stats-box" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px', fontSize: '0.72rem' }}>
                  <div className={`card-stat-col ${selectedYears.includes(2017) ? 'matched-col' : ''}`}>
                    <span className="card-stat-label">’17 Win</span>
                    <span className={`mini-winner ${w17} ${selectedYears.includes(2017) ? 'winner-glow' : ''}`} style={{ marginTop: '2px' }}>
                      {w17} {d17.margin ? `(+${d17.margin})` : ''}
                    </span>
                    <span className="pct-sub" style={{ margin: '2px 0 0 0' }}>{d17.total || '—'} v</span>
                  </div>

                  <div className={`card-stat-col ${selectedYears.includes(2019) ? 'matched-col' : ''}`}>
                    <span className="card-stat-label">’19 Win</span>
                    <span className={`mini-winner ${w19} ${selectedYears.includes(2019) ? 'winner-glow' : ''}`} style={{ marginTop: '2px' }}>
                      {w19} {d19.margin ? `(+${d19.margin})` : ''}
                    </span>
                    <span className="pct-sub" style={{ margin: '2px 0 0 0' }}>{d19.total || '—'} v</span>
                  </div>

                  <div className={`card-stat-col ${selectedYears.includes(2022) ? 'matched-col' : ''}`}>
                    <span className="card-stat-label">’22 Win</span>
                    <span className={`mini-winner ${w22} ${selectedYears.includes(2022) ? 'winner-glow' : ''}`} style={{ marginTop: '2px' }}>
                      {w22} (+{d22.margin})
                    </span>
                    <span className="pct-sub" style={{ margin: '2px 0 0 0' }}>{d22.total} v</span>
                  </div>

                  <div className={`card-stat-col ${selectedYears.includes(2024) ? 'matched-col' : ''}`}>
                    <span className="card-stat-label">’24 Win</span>
                    <span className={`mini-winner ${w24} ${selectedYears.includes(2024) ? 'winner-glow' : ''}`} style={{ marginTop: '2px' }}>
                      {w24} (+{d24.margin})
                    </span>
                    <span className="pct-sub" style={{ margin: '2px 0 0 0' }}>{d24.total} v</span>
                  </div>
                </div>

                <div className="card-footer-row">
                  <div>
                    <span className="footer-label">Location: </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      {b.location_en?.split(',')[0]}
                    </span>
                  </div>
                  <button
                    className="btn-card-pdf"
                    title={`Export Booth #${b.booth_no} as PDF`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onExportBoothPdf(b);
                    }}
                  >
                    <Printer size={12} />
                    <span>PDF</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
