import React from 'react';
import { Award, Users, TrendingUp, CheckCircle2, History, Layers } from 'lucide-react';

export default function KPIBanner({ summary, onFilterByYearParty, selectedParty, activeFilter }) {
  const tot17 = summary?.total_votes_2017?.toLocaleString() || '93,183';
  const tot19 = summary?.total_votes_2019?.toLocaleString() || '77,085';
  const tot22 = summary?.total_votes_2022?.toLocaleString() || '105,885';
  const tot24 = summary?.total_votes_2024?.toLocaleString() || '82,725';

  const won17 = summary?.booths_won_2017 || { INC: 141, AAP: 9, SAD: 1 };
  const won19 = summary?.booths_won_2019 || { INC: 118, BJP: 33, AAP: 0 };
  const won22 = summary?.booths_won_2022 || { AAP: 145, SAD: 13, INC: 11 };
  const won24 = summary?.booths_won_2024 || { AAP: 84, BJP: 43, INC: 42, SAD: 0 };

  const handleTagClick = (year, party) => {
    if (onFilterByYearParty) {
      onFilterByYearParty(year, party);
    }
  };

  const isTagActive = (year, party) => {
    if (selectedParty === party) {
      if (year === 2024 && (activeFilter === 'WON_24' || activeFilter === 'WON_THIS_YEAR')) return true;
      if (year === 2022 && activeFilter === 'WON_22') return true;
      if (year === 2019 && activeFilter === 'WON_19') return true;
      if (year === 2017 && activeFilter === 'WON_17') return true;
    }
    if (selectedParty === 'ALL') {
      if (year === 2024 && (activeFilter === `${party}_WINS` || activeFilter === `${party}_2024_WINS`)) return true;
      return activeFilter === `${party}_${year}_WINS`;
    }
    return false;
  };

  return (
    <section className="kpi-grid" aria-label="4-Election Historical Highlights and Summary Metrics">
      {/* 2017 Assembly Result */}
      <article className="kpi-card">
        <div className="kpi-header">
          <span className="kpi-label">2017 Vidhan Sabha</span>
          <span className="badge-pill-year">151 Booths</span>
        </div>
        <div 
          className="kpi-value clickable-winner" 
          style={{ color: 'var(--color-inc)', cursor: 'pointer' }}
          onClick={() => handleTagClick(2017, 'INC')}
          title="Click to view all 141 booths won by INC in 2017"
        >
          INC (Bolaria)
        </div>
        <div className="kpi-sub">
          <span>Won by +22,658 lead (Turnout: {tot17})</span>
        </div>
        <div className="seats-pill-box" aria-label="2017 Booth tally - Click to filter">
          <button
            type="button"
            className={`seat-tag seat-inc clickable ${isTagActive(2017, 'INC') ? 'active-tag' : ''}`}
            onClick={() => handleTagClick(2017, 'INC')}
            title="Filter booths below: 141 won by INC in 2017"
          >
            INC: {won17.INC}
          </button>
          <button
            type="button"
            className={`seat-tag seat-aap clickable ${isTagActive(2017, 'AAP') ? 'active-tag' : ''}`}
            onClick={() => handleTagClick(2017, 'AAP')}
            title="Filter booths below: 9 won by AAP in 2017"
          >
            AAP: {won17.AAP}
          </button>
          <button
            type="button"
            className={`seat-tag seat-sad clickable ${isTagActive(2017, 'SAD') ? 'active-tag' : ''}`}
            onClick={() => handleTagClick(2017, 'SAD')}
            title="Filter booths below: 1 won by SAD in 2017"
          >
            SAD: {won17.SAD}
          </button>
        </div>
      </article>

      {/* 2019 Lok Sabha Result */}
      <article className="kpi-card">
        <div className="kpi-header">
          <span className="kpi-label">2019 Lok Sabha</span>
          <span className="badge-pill-year">151 Booths</span>
        </div>
        <div 
          className="kpi-value clickable-winner" 
          style={{ color: 'var(--color-inc)', cursor: 'pointer' }}
          onClick={() => handleTagClick(2019, 'INC')}
          title="Click to view all 118 booths won by INC in 2019"
        >
          INC (Aujla)
        </div>
        <div className="kpi-sub">
          <span>Led by +10,395 over BJP (Turnout: {tot19})</span>
        </div>
        <div className="seats-pill-box" aria-label="2019 Booth tally - Click to filter">
          <button
            type="button"
            className={`seat-tag seat-inc clickable ${isTagActive(2019, 'INC') ? 'active-tag' : ''}`}
            onClick={() => handleTagClick(2019, 'INC')}
            title="Filter booths below: 118 won by INC in 2019"
          >
            INC: {won19.INC}
          </button>
          <button
            type="button"
            className={`seat-tag seat-bjp clickable ${isTagActive(2019, 'BJP') ? 'active-tag' : ''}`}
            onClick={() => handleTagClick(2019, 'BJP')}
            title="Filter booths below: 33 won by BJP in 2019"
          >
            BJP: {won19.BJP}
          </button>
          {won19.AAP > 0 && (
            <button
              type="button"
              className={`seat-tag seat-aap clickable ${isTagActive(2019, 'AAP') ? 'active-tag' : ''}`}
              onClick={() => handleTagClick(2019, 'AAP')}
              title="Filter booths below: AAP in 2019"
            >
              AAP: {won19.AAP}
            </button>
          )}
        </div>
      </article>

      {/* 2022 Assembly Result */}
      <article className="kpi-card">
        <div className="kpi-header">
          <span className="kpi-label">2022 Vidhan Sabha</span>
          <span className="badge-pill-year" style={{ background: 'rgba(5, 150, 105, 0.15)', color: 'var(--color-gain)' }}>169 Booths</span>
        </div>
        <div 
          className="kpi-value clickable-winner" 
          style={{ color: 'var(--color-aap)', cursor: 'pointer' }}
          onClick={() => handleTagClick(2022, 'AAP')}
          title="Click to view all 145 booths won by AAP in 2022"
        >
          AAP (Dr. Nijjar)
        </div>
        <div className="kpi-sub">
          <span>Won by +27,503 landslide (Turnout: {tot22})</span>
        </div>
        <div className="seats-pill-box" aria-label="2022 Booth tally - Click to filter">
          <button
            type="button"
            className={`seat-tag seat-aap clickable ${isTagActive(2022, 'AAP') ? 'active-tag' : ''}`}
            onClick={() => handleTagClick(2022, 'AAP')}
            title="Filter booths below: 145 won by AAP in 2022"
          >
            AAP: {won22.AAP}
          </button>
          <button
            type="button"
            className={`seat-tag seat-sad clickable ${isTagActive(2022, 'SAD') ? 'active-tag' : ''}`}
            onClick={() => handleTagClick(2022, 'SAD')}
            title="Filter booths below: 13 won by SAD in 2022"
          >
            SAD: {won22.SAD}
          </button>
          <button
            type="button"
            className={`seat-tag seat-inc clickable ${isTagActive(2022, 'INC') ? 'active-tag' : ''}`}
            onClick={() => handleTagClick(2022, 'INC')}
            title="Filter booths below: 11 won by INC in 2022"
          >
            INC: {won22.INC}
          </button>
        </div>
      </article>

      {/* 2024 Lok Sabha Result */}
      <article className="kpi-card">
        <div className="kpi-header">
          <span className="kpi-label">2024 Lok Sabha</span>
          <span className="badge-pill-year">169 Booths</span>
        </div>
        <div 
          className="kpi-value clickable-winner" 
          style={{ color: 'var(--color-aap)', cursor: 'pointer' }}
          onClick={() => handleTagClick(2024, 'AAP')}
          title="Click to view all 84 booths won by AAP in 2024"
        >
          AAP (Dhaliwal)
        </div>
        <div className="kpi-sub">
          <span>Led by +6,649 over INC (Turnout: {tot24})</span>
        </div>
        <div className="seats-pill-box" aria-label="2024 Booth tally - Click to filter">
          <button
            type="button"
            className={`seat-tag seat-aap clickable ${isTagActive(2024, 'AAP') ? 'active-tag' : ''}`}
            onClick={() => handleTagClick(2024, 'AAP')}
            title="Filter booths below: 84 won by AAP in 2024"
          >
            AAP: {won24.AAP}
          </button>
          <button
            type="button"
            className={`seat-tag seat-bjp clickable ${isTagActive(2024, 'BJP') ? 'active-tag' : ''}`}
            onClick={() => handleTagClick(2024, 'BJP')}
            title="Filter booths below: 43 won by BJP in 2024"
          >
            BJP: {won24.BJP}
          </button>
          <button
            type="button"
            className={`seat-tag seat-inc clickable ${isTagActive(2024, 'INC') ? 'active-tag' : ''}`}
            onClick={() => handleTagClick(2024, 'INC')}
            title="Filter booths below: 42 won by INC in 2024"
          >
            INC: {won24.INC}
          </button>
        </div>
      </article>
    </section>
  );
}
