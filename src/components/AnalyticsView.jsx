import React from 'react';
import { TrendingUp, AlertTriangle, CheckCircle, ShieldAlert, ArrowRight } from 'lucide-react';

export default function AnalyticsView({ booths, summary }) {
  // Key calculations
  const topBjpBooths = [...booths]
    .sort((a, b) => (b.data_2024.bjp || 0) - (a.data_2024.bjp || 0))
    .slice(0, 5);

  const topTurnoutDrops = [...booths]
    .sort((a, b) => (a.comparison.turnout_diff || 0) - (b.comparison.turnout_diff || 0))
    .slice(0, 5);

  const closest2024Booths = [...booths]
    .filter(b => b.data_2024.total > 0)
    .sort((a, b) => (a.data_2024.margin || 999) - (b.data_2024.margin || 999))
    .slice(0, 5);

  return (
    <div className="insights-grid">
      {/* Card 1: Party Vote Share Shift */}
      <div className="insight-card">
        <h3>1. Vote Share Dynamics (2022 vs 2024)</h3>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
          Comparing the popular vote percentages in 19-Amritsar South:
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* AAP */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', marginBottom: '4px' }}>
              <span style={{ fontWeight: 600, color: 'var(--color-aap)' }}>AAP (Aam Aadmi Party)</span>
              <span>50.24% (2022 Nijjar) → <strong>34.37% (2024 Dhaliwal)</strong> (-15.87% Swing)</span>
            </div>
            <div className="vote-bar-track">
              <div className="vote-bar-fill" style={{ width: '34.37%', background: 'var(--color-aap)' }} />
            </div>
          </div>

          {/* INC */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', marginBottom: '4px' }}>
              <span style={{ fontWeight: 600, color: 'var(--color-inc)' }}>INC (Congress)</span>
              <span>21.20% (2022 Bolaria) → <strong>26.33% (2024 Aujla)</strong> (+5.13% Swing)</span>
            </div>
            <div className="vote-bar-track">
              <div className="vote-bar-fill" style={{ width: '26.33%', background: 'var(--color-inc)' }} />
            </div>
          </div>

          {/* BJP */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', marginBottom: '4px' }}>
              <span style={{ fontWeight: 600, color: 'var(--color-bjp)' }}>BJP (Bharatiya Janata Party)</span>
              <span>1.51% (2022 PLC) → <strong>19.12% (2024 Sandhu)</strong> (+17.61% Swing)</span>
            </div>
            <div className="vote-bar-track">
              <div className="vote-bar-fill" style={{ width: '19.12%', background: 'var(--color-bjp)' }} />
            </div>
          </div>

          {/* SAD */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', marginBottom: '4px' }}>
              <span style={{ fontWeight: 600, color: 'var(--color-sad)' }}>SAD (Shiromani Akali Dal)</span>
              <span>24.01% (2022 Gill) → <strong>13.21% (2024 Joshi)</strong> (-10.80% Drop)</span>
            </div>
            <div className="vote-bar-track">
              <div className="vote-bar-fill" style={{ width: '13.21%', background: 'var(--color-sad)' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Card 2: The BJP Urban Phenomenon */}
      <div className="insight-card">
        <h3>2. BJP Emergence: 35 Booth Wins</h3>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
          BJP surged to 35 booth wins in 2024 (up from 0 in 2022), creating substantial inroads in urban wards:
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {topBjpBooths.map((b) => (
            <div 
              key={b.booth_no} 
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-surface-elevated)', padding: '8px 10px', borderRadius: 'var(--radius-sm)', fontSize: '0.8125rem' }}
            >
              <div>
                <strong>#{b.booth_no}</strong> {b.village_english}
              </div>
              <span style={{ fontWeight: 700, color: 'var(--color-bjp)' }}>
                {b.data_2024.bjp} votes ({b.data_2024.bjp_pct}%)
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Card 3: Razor-Thin 2024 Contests */}
      <div className="insight-card">
        <h3>3. Closest 2024 Booth Contests</h3>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
          Booths decided by single-digit margins in 2024:
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {closest2024Booths.map((b) => (
            <div 
              key={b.booth_no} 
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-surface-elevated)', padding: '8px 10px', borderRadius: 'var(--radius-sm)', fontSize: '0.8125rem' }}
            >
              <div>
                <strong>#{b.booth_no}</strong> {b.village_english}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span className={`badge-winner ${b.data_2024.winner_party}`}>
                  {b.data_2024.winner_party}
                </span>
                <span style={{ fontWeight: 700 }}>+{b.data_2024.margin} vote</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Card 4: Turnout Contraction */}
      <div className="insight-card">
        <h3>4. Sharpest Turnout Drops</h3>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
          Total valid votes counted contracted from 102,760 to 82,725 (-19.50%). Booths with maximum contraction:
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {topTurnoutDrops.map((b) => (
            <div 
              key={b.booth_no} 
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-surface-elevated)', padding: '8px 10px', borderRadius: 'var(--radius-sm)', fontSize: '0.8125rem' }}
            >
              <div>
                <strong>#{b.booth_no}</strong> {b.village_english}
              </div>
              <span style={{ fontWeight: 700, color: 'var(--color-loss)' }}>
                {b.comparison.turnout_diff} votes ({b.comparison.turnout_pct}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
