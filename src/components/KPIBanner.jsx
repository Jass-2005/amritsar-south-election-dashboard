import React from 'react';
import { Award, Users, TrendingUp, CheckCircle2, History, Layers } from 'lucide-react';

export default function KPIBanner({ summary }) {
  const tot17 = summary?.total_votes_2017?.toLocaleString() || '93,183';
  const tot19 = summary?.total_votes_2019?.toLocaleString() || '77,085';
  const tot22 = summary?.total_votes_2022?.toLocaleString() || '105,885';
  const tot24 = summary?.total_votes_2024?.toLocaleString() || '82,725';

  const won17 = summary?.booths_won_2017 || { INC: 141, AAP: 9, SAD: 1 };
  const won19 = summary?.booths_won_2019 || { INC: 118, BJP: 33, AAP: 0 };
  const won22 = summary?.booths_won_2022 || { AAP: 145, SAD: 13, INC: 11 };
  const won24 = summary?.booths_won_2024 || { AAP: 84, BJP: 43, INC: 42, SAD: 0 };

  return (
    <section className="kpi-grid" aria-label="4-Election Historical Highlights and Summary Metrics">
      {/* 2017 Assembly Result */}
      <article className="kpi-card">
        <div className="kpi-header">
          <span className="kpi-label">2017 Vidhan Sabha</span>
          <span className="badge-pill-year">151 Booths</span>
        </div>
        <div className="kpi-value" style={{ color: 'var(--color-inc)' }}>
          INC (Bolaria)
        </div>
        <div className="kpi-sub">
          <span>Won by +22,658 lead (Turnout: {tot17})</span>
        </div>
        <div className="seats-pill-box">
          <span className="seat-tag seat-inc">INC: {won17.INC}</span>
          <span className="seat-tag seat-aap">AAP: {won17.AAP}</span>
          <span className="seat-tag seat-sad">SAD: {won17.SAD}</span>
        </div>
      </article>

      {/* 2019 Lok Sabha Result */}
      <article className="kpi-card">
        <div className="kpi-header">
          <span className="kpi-label">2019 Lok Sabha</span>
          <span className="badge-pill-year">151 Booths</span>
        </div>
        <div className="kpi-value" style={{ color: 'var(--color-inc)' }}>
          INC (Aujla)
        </div>
        <div className="kpi-sub">
          <span>Led by +10,395 over BJP (Turnout: {tot19})</span>
        </div>
        <div className="seats-pill-box">
          <span className="seat-tag seat-inc">INC: {won19.INC}</span>
          <span className="seat-tag seat-bjp">BJP: {won19.BJP}</span>
          <span className="seat-tag seat-aap">AAP: {won19.AAP || 0}</span>
        </div>
      </article>

      {/* 2022 Assembly Result */}
      <article className="kpi-card">
        <div className="kpi-header">
          <span className="kpi-label">2022 Vidhan Sabha</span>
          <span className="badge-pill-year" style={{ background: 'rgba(5, 150, 105, 0.15)', color: 'var(--color-gain)' }}>169 Booths</span>
        </div>
        <div className="kpi-value" style={{ color: 'var(--color-aap)' }}>
          AAP (Dr. Nijjar)
        </div>
        <div className="kpi-sub">
          <span>Won by +27,503 landslide (Turnout: {tot22})</span>
        </div>
        <div className="seats-pill-box">
          <span className="seat-tag seat-aap">AAP: {won22.AAP}</span>
          <span className="seat-tag seat-sad">SAD: {won22.SAD}</span>
          <span className="seat-tag seat-inc">INC: {won22.INC}</span>
        </div>
      </article>

      {/* 2024 Lok Sabha Result */}
      <article className="kpi-card">
        <div className="kpi-header">
          <span className="kpi-label">2024 Lok Sabha</span>
          <span className="badge-pill-year">169 Booths</span>
        </div>
        <div className="kpi-value" style={{ color: 'var(--color-aap)' }}>
          AAP (Dhaliwal)
        </div>
        <div className="kpi-sub">
          <span>Led by +6,649 over INC (Turnout: {tot24})</span>
        </div>
        <div className="seats-pill-box">
          <span className="seat-tag seat-aap">AAP: {won24.AAP}</span>
          <span className="seat-tag seat-bjp">BJP: {won24.BJP}</span>
          <span className="seat-tag seat-inc">INC: {won24.INC}</span>
        </div>
      </article>
    </section>
  );
}
