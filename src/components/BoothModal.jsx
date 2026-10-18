import React, { useState } from 'react';
import { X, Printer, Target, Download, FileText, CheckCircle2, AlertCircle, Building2, MapPin, Layers } from 'lucide-react';

export default function BoothModal({ booth, onClose }) {
  const [mpLang, setMpLang] = useState('PA');
  const [activeTab, setActiveTab] = useState('ALL_YEARS'); // 'ALL_YEARS', 'ELECTION_CARDS', 'AUDIT'
  if (!booth) return null;

  const d17 = booth.data_2017 || {};
  const d19 = booth.data_2019 || {};
  const d22 = booth.data_2022 || {};
  const d24 = booth.data_2024 || {};
  const d26 = booth.data_2026 || {};
  const comp = booth.comparison || {};

  // Safe percentage helper
  const getWidth = (votes, total) => {
    if (!total || total === 0 || !votes) return '0%';
    return `${Math.min(100, Math.round((votes / total) * 100))}%`;
  };

  const handlePrintBooth = (e) => {
    e.stopPropagation();
    document.body.classList.add('printing-single-booth');
    window.print();
    setTimeout(() => {
      document.body.classList.remove('printing-single-booth');
    }, 1000);
  };

  const isCore = booth.booth_no <= 151;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content modal-content-wide" onClick={(e) => e.stopPropagation()}>
        {/* Dsidein Official PDF Watermark (Active on print) */}
        <div className="dsidein-print-watermark" aria-hidden="true">
          <img src="./dsidein_logo_transparent.png" alt="Dsidein" className="watermark-logo-img" />
          <div className="watermark-brand-name">DSIDEIN</div>
          <div className="watermark-sub-name">19-AMRITSAR SOUTH 4-ELECTION INTELLIGENCE</div>
          <div className="watermark-url">https://dsidein.com/amritsar-south-2017-2024</div>
        </div>

        {/* Printable Official Banner */}
        <div className="print-dossier-banner">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div className="print-dossier-title">19-AMRITSAR SOUTH ASSEMBLY SEGMENT — 4-ELECTION MASTER BOOTH DOSSIER</div>
              <div className="print-dossier-sub">
                2017 Vidhan Sabha vs 2019 Lok Sabha vs 2022 Vidhan Sabha vs 2024 Lok Sabha vs 2026 Survey
              </div>
            </div>
            <div style={{ textAlign: 'right', fontSize: '8.5pt', color: '#334155' }}>
              <span style={{ fontWeight: 800, color: '#002b49' }}>DSIDEIN COMMAND CENTER</span><br />
              <span>https://dsidein.com/amritsar-south-2017-2024</span>
            </div>
          </div>
        </div>

        {/* Modal Header */}
        <div className="modal-header">
          <div>
            <div className="modal-badges-row" style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' }}>
              <span className="brand-badge">Booth #{booth.booth_no}</span>
              <span className={`continuity-badge ${isCore ? 'core' : 'auxiliary'}`}>
                {isCore ? 'Historical Core Booth (1-151)' : 'Auxiliary Booth (New in 2022)'}
              </span>
              <span className="trajectory-badge">
                {booth.trajectory_4_elections || booth.status_label}
              </span>
            </div>
            <h2 className="modal-village-title">{booth.polling_station_en || booth.village_english || booth.village_en}</h2>
            <p className="modal-village-sub punjabi-text">
              {booth.polling_station_pa || booth.village_punjabi || booth.village_pa}
            </p>
            {booth.location_en && (
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <MapPin size={13} /> {booth.location_en} {booth.location_pa && `· ${booth.location_pa}`}
              </p>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button 
              className="btn-print-modal no-print" 
              onClick={handlePrintBooth}
              title="Export / Print this Booth Dossier as PDF"
            >
              <Printer size={15} />
              <span>Export PDF</span>
            </button>
            <button className="modal-close no-print" onClick={onClose} aria-label="Close Modal">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* =========================================================
            BOOTH NAME & CONTINUITY CORRECTNESS AUDIT BOX
        ========================================================= */}
        <div className="booth-audit-box" style={{
          background: isCore ? 'rgba(34, 197, 94, 0.05)' : 'rgba(234, 179, 8, 0.07)',
          border: `1px solid ${isCore ? 'rgba(34, 197, 94, 0.25)' : 'rgba(234, 179, 8, 0.3)'}`,
          borderRadius: 'var(--radius-md)',
          padding: '14px 16px',
          marginBottom: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Building2 size={18} style={{ color: isCore ? 'var(--color-gain)' : '#ca8a04' }} />
              <h4 style={{ margin: 0, fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Booth Name & Number Continuity Audit (2017 – 2024)
              </h4>
            </div>
            <span style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: '4px',
              background: isCore ? 'rgba(34, 197, 94, 0.15)' : 'rgba(234, 179, 8, 0.15)',
              color: isCore ? '#166534' : '#854d0e'
            }}>
              {isCore ? '✓ Same Institutional Campus' : 'ℹ Auxiliary Station Created in 2022'}
            </span>
          </div>

          <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: '0 0 10px 0' }}>
            {isCore ? (
              <>
                <strong>Audit Finding:</strong> In 2017 and 2019, Amritsar South had <strong>151 total polling stations</strong>. Booth #{booth.booth_no} was stationed at <strong>{booth.polling_station_en || 'this school campus'}</strong> in 2017, 2019, 2022, and 2024 with <strong>100% continuous institutional identity</strong> with respect to the booth number.
              </>
            ) : (
              <>
                <strong>Audit Finding:</strong> In 2017 and 2019, Amritsar South had only 151 polling stations. Booth #{booth.booth_no} is an <strong>Auxiliary Polling Station created by ECI in 2022</strong> to split high-density voting rooms and reduce congestion. Between 2022 and 2024, it has been <strong>100% identical</strong>.
              </>
            )}
          </p>

          {/* 4-Election Status Table Row */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '8px',
            fontSize: '0.75rem',
            background: 'var(--bg-surface)',
            padding: '10px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-subtle)'
          }}>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>2017 Assembly:</span>
              <div style={{ fontWeight: 700, color: d17.exists ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                {d17.exists ? `Booth #${booth.booth_no} (Active)` : 'Not Created (Max 151)'}
              </div>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>2019 Lok Sabha:</span>
              <div style={{ fontWeight: 700, color: d19.exists ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                {d19.exists ? `Booth #${booth.booth_no} (Active)` : 'Not Created (Max 151)'}
              </div>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>2022 Assembly:</span>
              <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                Booth #{booth.booth_no} ({isCore ? 'Retained' : 'New Auxiliary'})
              </div>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>2024 Lok Sabha:</span>
              <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                Booth #{booth.booth_no} (100% Match)
              </div>
            </div>
          </div>

          {booth.sections_en && (
            <div style={{ marginTop: '8px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              <strong>Covered Sections / Mohallas:</strong> {booth.sections_en}
            </div>
          )}
        </div>

        {/* 4-Election Side-by-side Comparative Cards */}
        <div className="compare-grid-4">
          {/* COLUMN 1: 2017 Assembly */}
          <div className="year-card">
            <div className="year-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>1. 2017 Assembly</span>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Vidhan Sabha</span>
            </div>
            {d17.exists ? (
              <>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span className={`badge-winner ${d17.winner_party}`}>
                    {d17.winner_party} Won
                  </span>
                  <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                    +{d17.margin} lead
                  </span>
                </div>

                {/* INC Bar */}
                <div className="vote-bar-wrap">
                  <div className="vote-bar-label">
                    <span>INC (Bolaria)</span>
                    <span><strong>{d17.inc}</strong> ({d17.inc_pct}%)</span>
                  </div>
                  <div className="vote-bar-track">
                    <div className="vote-bar-fill" style={{ width: getWidth(d17.inc, d17.total), background: 'var(--color-inc)' }} />
                  </div>
                </div>

                {/* AAP Bar */}
                <div className="vote-bar-wrap">
                  <div className="vote-bar-label">
                    <span>AAP (Dr. Nijjar)</span>
                    <span><strong>{d17.aap}</strong> ({d17.aap_pct}%)</span>
                  </div>
                  <div className="vote-bar-track">
                    <div className="vote-bar-fill" style={{ width: getWidth(d17.aap, d17.total), background: 'var(--color-aap)' }} />
                  </div>
                </div>

                {/* SAD Bar */}
                <div className="vote-bar-wrap">
                  <div className="vote-bar-label">
                    <span>SAD (Tikka)</span>
                    <span><strong>{d17.sad}</strong> ({d17.sad_pct}%)</span>
                  </div>
                  <div className="vote-bar-track">
                    <div className="vote-bar-fill" style={{ width: getWidth(d17.sad, d17.total), background: 'var(--color-sad)' }} />
                  </div>
                </div>

                {/* Other/NOTA */}
                <div className="vote-bar-wrap">
                  <div className="vote-bar-label">
                    <span>Others + NOTA</span>
                    <span><strong>{d17.others + d17.nota}</strong></span>
                  </div>
                  <div className="vote-bar-track">
                    <div className="vote-bar-fill" style={{ width: getWidth(d17.others + d17.nota, d17.total), background: '#94a3b8' }} />
                  </div>
                </div>

                {/* Total 2017 */}
                <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '6px', marginTop: 'auto', fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between' }}>
                  <span>Total Polled:</span>
                  <strong style={{ color: 'var(--text-primary)' }}>{d17.total}</strong>
                </div>
              </>
            ) : (
              <div style={{ padding: '24px 8px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                <p style={{ fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px' }}>Auxiliary Booth</p>
                <p>Not in 2017 roster (Amritsar South had 151 booths in 2017).</p>
              </div>
            )}
          </div>

          {/* COLUMN 2: 2019 Lok Sabha */}
          <div className="year-card">
            <div className="year-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>2. 2019 Lok Sabha</span>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Parliamentary</span>
            </div>
            {d19.exists ? (
              <>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span className={`badge-winner ${d19.winner_party}`}>
                    {d19.winner_party} Won
                  </span>
                  <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                    +{d19.margin} lead
                  </span>
                </div>

                {/* INC Bar */}
                <div className="vote-bar-wrap">
                  <div className="vote-bar-label">
                    <span>INC (Aujla)</span>
                    <span><strong>{d19.inc}</strong> ({d19.inc_pct}%)</span>
                  </div>
                  <div className="vote-bar-track">
                    <div className="vote-bar-fill" style={{ width: getWidth(d19.inc, d19.total), background: 'var(--color-inc)' }} />
                  </div>
                </div>

                {/* BJP Bar */}
                <div className="vote-bar-wrap">
                  <div className="vote-bar-label">
                    <span>BJP (Hardeep Puri)</span>
                    <span><strong>{d19.bjp}</strong> ({d19.bjp_pct}%)</span>
                  </div>
                  <div className="vote-bar-track">
                    <div className="vote-bar-fill" style={{ width: getWidth(d19.bjp, d19.total), background: 'var(--color-bjp)' }} />
                  </div>
                </div>

                {/* AAP Bar */}
                <div className="vote-bar-wrap">
                  <div className="vote-bar-label">
                    <span>AAP (Dhaliwal)</span>
                    <span><strong>{d19.aap}</strong> ({d19.aap_pct}%)</span>
                  </div>
                  <div className="vote-bar-track">
                    <div className="vote-bar-fill" style={{ width: getWidth(d19.aap, d19.total), background: 'var(--color-aap)' }} />
                  </div>
                </div>

                {/* Other/NOTA */}
                <div className="vote-bar-wrap">
                  <div className="vote-bar-label">
                    <span>Others + NOTA</span>
                    <span><strong>{d19.others + d19.nota}</strong></span>
                  </div>
                  <div className="vote-bar-track">
                    <div className="vote-bar-fill" style={{ width: getWidth(d19.others + d19.nota, d19.total), background: '#94a3b8' }} />
                  </div>
                </div>

                {/* Total 2019 */}
                <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '6px', marginTop: 'auto', fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between' }}>
                  <span>Total Polled:</span>
                  <strong style={{ color: 'var(--text-primary)' }}>{d19.total}</strong>
                </div>
              </>
            ) : (
              <div style={{ padding: '24px 8px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                <p style={{ fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px' }}>Auxiliary Booth</p>
                <p>Not in 2019 roster (Amritsar South had 151 booths in 2019).</p>
              </div>
            )}
          </div>

          {/* COLUMN 3: 2022 Assembly */}
          <div className="year-card">
            <div className="year-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>3. 2022 Assembly</span>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Vidhan Sabha</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span className={`badge-winner ${d22.winner_party}`}>
                {d22.winner_party} Won
              </span>
              <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                +{d22.margin} lead
              </span>
            </div>

            {/* AAP Bar */}
            <div className="vote-bar-wrap">
              <div className="vote-bar-label">
                <span>AAP (Dr. Nijjar)</span>
                <span><strong>{d22.aap}</strong> ({d22.aap_pct}%)</span>
              </div>
              <div className="vote-bar-track">
                <div className="vote-bar-fill" style={{ width: getWidth(d22.aap, d22.total), background: 'var(--color-aap)' }} />
              </div>
            </div>

            {/* SAD Bar */}
            <div className="vote-bar-wrap">
              <div className="vote-bar-label">
                <span>SAD (Gill)</span>
                <span><strong>{d22.sad}</strong> ({d22.sad_pct}%)</span>
              </div>
              <div className="vote-bar-track">
                <div className="vote-bar-fill" style={{ width: getWidth(d22.sad, d22.total), background: 'var(--color-sad)' }} />
              </div>
            </div>

            {/* INC Bar */}
            <div className="vote-bar-wrap">
              <div className="vote-bar-label">
                <span>INC (Bolaria)</span>
                <span><strong>{d22.inc}</strong> ({d22.inc_pct}%)</span>
              </div>
              <div className="vote-bar-track">
                <div className="vote-bar-fill" style={{ width: getWidth(d22.inc, d22.total), background: 'var(--color-inc)' }} />
              </div>
            </div>

            {/* PLC/BJP Bar */}
            <div className="vote-bar-wrap">
              <div className="vote-bar-label">
                <span>PLC/BJP (Thekedar)</span>
                <span><strong>{d22.bjp || d22.plc || 0}</strong> ({d22.plc_pct || d22.bjp_pct || 0}%)</span>
              </div>
              <div className="vote-bar-track">
                <div className="vote-bar-fill" style={{ width: getWidth(d22.bjp || d22.plc, d22.total), background: 'var(--color-bjp)' }} />
              </div>
            </div>

            {/* Total 2022 */}
            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '6px', marginTop: 'auto', fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between' }}>
              <span>Total Polled:</span>
              <strong style={{ color: 'var(--text-primary)' }}>{d22.total}</strong>
            </div>
          </div>

          {/* COLUMN 4: 2024 Lok Sabha */}
          <div className="year-card">
            <div className="year-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>4. 2024 Lok Sabha</span>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Parliamentary</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span className={`badge-winner ${d24.winner_party}`}>
                {d24.winner_party} Won
              </span>
              <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                +{d24.margin} lead
              </span>
            </div>

            {/* AAP Bar */}
            <div className="vote-bar-wrap">
              <div className="vote-bar-label">
                <span>AAP (Dhaliwal)</span>
                <span><strong>{d24.aap}</strong> ({d24.aap_pct}%)</span>
              </div>
              <div className="vote-bar-track">
                <div className="vote-bar-fill" style={{ width: getWidth(d24.aap, d24.total), background: 'var(--color-aap)' }} />
              </div>
            </div>

            {/* INC Bar */}
            <div className="vote-bar-wrap">
              <div className="vote-bar-label">
                <span>INC (Aujla)</span>
                <span><strong>{d24.inc}</strong> ({d24.inc_pct}%)</span>
              </div>
              <div className="vote-bar-track">
                <div className="vote-bar-fill" style={{ width: getWidth(d24.inc, d24.total), background: 'var(--color-inc)' }} />
              </div>
            </div>

            {/* BJP Bar */}
            <div className="vote-bar-wrap">
              <div className="vote-bar-label">
                <span>BJP (Sandhu)</span>
                <span><strong>{d24.bjp}</strong> ({d24.bjp_pct}%)</span>
              </div>
              <div className="vote-bar-track">
                <div className="vote-bar-fill" style={{ width: getWidth(d24.bjp, d24.total), background: 'var(--color-bjp)' }} />
              </div>
            </div>

            {/* SAD Bar */}
            <div className="vote-bar-wrap">
              <div className="vote-bar-label">
                <span>SAD (Joshi)</span>
                <span><strong>{d24.sad}</strong> ({d24.sad_pct}%)</span>
              </div>
              <div className="vote-bar-track">
                <div className="vote-bar-fill" style={{ width: getWidth(d24.sad, d24.total), background: 'var(--color-sad)' }} />
              </div>
            </div>

            {/* Total 2024 */}
            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '6px', marginTop: 'auto', fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between' }}>
              <span>Total Polled:</span>
              <strong style={{ color: 'var(--text-primary)' }}>{d24.total}</strong>
            </div>
          </div>
        </div>

        {/* 2026 Ground Survey Snapshot Card */}
        {d26.sample_size > 0 && (
          <div className="survey-snapshot-card" style={{
            background: 'var(--bg-surface-elevated)',
            borderRadius: 'var(--radius-md)',
            padding: '12px 16px',
            border: '1px solid rgba(5, 150, 105, 0.3)',
            marginBottom: '16px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontWeight: 700, fontSize: '0.8125rem', color: 'var(--color-gain)' }}>
                ★ 2026 Ground Field Survey (Recalibrated Sample: {d26.sample_size} Voters)
              </span>
              <span className={`badge-winner ${d26.leading_party}`} style={{ fontSize: '0.75rem' }}>
                {d26.leading_party} Leading (+{d26.margin || 0} votes)
              </span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '8px', fontSize: '0.78rem' }}>
              <div>INC (Bolaria): <strong>{d26.inc}</strong> ({d26.inc_decided_pct}% dec.)</div>
              <div>AAP (Nijjar): <strong>{d26.aap}</strong> ({d26.aap_decided_pct}% dec.)</div>
              <div>BJP: <strong>{d26.bjp}</strong> ({d26.bjp_decided_pct}% dec.)</div>
              <div>SAD: <strong>{d26.sad}</strong> ({d26.sad_decided_pct}% dec.)</div>
              <div>Undecided/Other: <strong>{d26.other}</strong> ({d26.other_pct}%)</div>
            </div>
          </div>
        )}

        {/* =========================================================
            BOOTH-SPECIFIC DETAILED MASTER PLAN & FIELD STRATEGY
        ========================================================= */}
        {booth.masterplan && (
          <div className="modal-masterplan-box">
            {/* Masterplan Header with Bilingual Toggle & Category Badge */}
            <div className="masterplan-header">
              <div className="masterplan-title-wrap">
                <div className="masterplan-icon-badge">
                  <Target size={16} />
                </div>
                <div>
                  <h3 className="masterplan-title">
                    {mpLang === 'PA' ? '169 ਬੂਥ ਵਿਸਥਾਰਤ ਮਾਸਟਰ ਪਲਾਨ (Field Operations)' : '169-Booth Strategic Master Plan'}
                  </h3>
                  <p className="masterplan-sub">
                    {mpLang === 'PA' ? 'ਮੈਦਾਨੀ ਕਾਰਵਾਈਆਂ ਅਤੇ ਪਬਲਿਕ ਇਸ਼ੂ ਪਲਾਨ' : 'Field Ground Directive & 90-Day Action Roadmap'}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div className="mp-lang-switch no-print" role="group" aria-label="Masterplan language">
                  <button
                    className={`mp-lang-btn ${mpLang === 'PA' ? 'active' : ''}`}
                    onClick={() => setMpLang('PA')}
                    type="button"
                  >
                    ਪੰਜਾਬੀ
                  </button>
                  <button
                    className={`mp-lang-btn ${mpLang === 'EN' ? 'active' : ''}`}
                    onClick={() => setMpLang('EN')}
                    type="button"
                  >
                    English
                  </button>
                </div>

                <span className="masterplan-cat-badge">
                  {booth.masterplan.category_type || 'Field Operations'}
                </span>
              </div>
            </div>

            {/* Field Status Diagnosis */}
            <div className="masterplan-status-card">
              <div className="mp-card-label">
                <span>{mpLang === 'PA' ? 'ਮੈਦਾਨੀ ਸਥਿਤੀ ਅਤੇ ਵਿਸ਼ਲੇਸ਼ਣ' : 'Field Diagnosis & Ground Reality'}</span>
              </div>
              <p className={`mp-status-text ${mpLang === 'PA' ? 'punjabi-font' : ''}`}>
                {mpLang === 'PA'
                  ? (booth.masterplan.detailed_situation_pa || booth.masterplan.detailed_status_pa || booth.masterplan.action_pa || booth.masterplan.zone_pa)
                  : (booth.masterplan.detailed_situation_en || booth.masterplan.detailed_status || booth.masterplan.action_en || booth.masterplan.zone_en)}
              </p>
            </div>

            {/* Action Roadmap */}
            {booth.masterplan.action_steps && (
              <div className="masterplan-actions-card">
                <div className="mp-card-label">
                  <span>{mpLang === 'PA' ? '90-ਦਿਨਾ ਕਾਰਵਾਈ ਯੋਜਨਾ (ਕਦਮ ਦਰ ਕਦਮ)' : '90-Day Tactical Ground Steps'}</span>
                </div>
                <div className="mp-steps-list">
                  {((mpLang === 'PA' && booth.masterplan.action_steps_pa)
                    ? booth.masterplan.action_steps_pa
                    : (booth.masterplan.action_steps_en || booth.masterplan.action_steps)
                  )?.map((step, idx) => (
                    <div key={idx} className="mp-step-item">
                      <span className="mp-step-num">{idx + 1}</span>
                      <span className={`mp-step-text ${mpLang === 'PA' ? 'punjabi-font' : ''}`}>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
