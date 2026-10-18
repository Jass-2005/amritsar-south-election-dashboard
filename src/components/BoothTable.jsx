import React from 'react';
import { ChevronRight, Printer } from 'lucide-react';

export default function BoothTable({ booths, onSelectBooth }) {
  if (booths.length === 0) {
    return (
      <div className="table-wrap" style={{ padding: '48px', textAlign: 'center', color: 'var(--text-secondary)' }}>
        <p style={{ fontSize: '1.1rem', fontWeight: 600 }}>No booths found matching your filters.</p>
        <p style={{ fontSize: '0.875rem', marginTop: '8px' }}>Try adjusting your search terms or filter selections.</p>
      </div>
    );
  }

  return (
    <div className="table-wrap">
      <table className="booth-table">
        <thead>
          <tr>
            <th style={{ width: '60px', textAlign: 'center' }}>Booth</th>
            <th>Polling Station / Location</th>
            <th>Continuity</th>
            <th>2017 Assembly</th>
            <th>2019 Lok Sabha</th>
            <th>2022 Assembly</th>
            <th>2024 Lok Sabha</th>
            <th>4-Election Trajectory</th>
            <th style={{ width: '40px' }}></th>
          </tr>
        </thead>
        <tbody>
          {booths.map((b) => {
            const isCore = b.booth_no <= 151;
            const d17 = b.data_2017 || {};
            const d19 = b.data_2019 || {};
            const d22 = b.data_2022 || {};
            const d24 = b.data_2024 || {};

            const w17 = d17.exists ? d17.winner_party : '—';
            const w19 = d19.exists ? d19.winner_party : '—';
            const w22 = d22.winner_party || '—';
            const w24 = d24.winner_party || '—';

            return (
              <tr 
                key={b.booth_no} 
                onClick={() => onSelectBooth(b)} 
                title={`Click to inspect 4-Election Dossier for Booth #${b.booth_no}`}
              >
                {/* Booth No */}
                <td style={{ textAlign: 'center', fontWeight: 700, color: 'var(--text-secondary)' }}>
                  #{b.booth_no}
                </td>

                {/* Village / Polling Station */}
                <td>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                    {b.polling_station_en || b.village_english}
                  </div>
                  <div className="punjabi-text" style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    {b.polling_station_pa || b.village_punjabi}
                  </div>
                </td>

                {/* Continuity */}
                <td>
                  <span className={`continuity-pill ${isCore ? 'core' : 'auxiliary'}`}>
                    {isCore ? 'Core 1-151' : 'Auxiliary ’22'}
                  </span>
                </td>

                {/* 2017 Result */}
                <td>
                  {d17.exists ? (
                    <div>
                      <span className={`badge-winner ${w17}`}>{w17}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '6px' }}>
                        +{d17.margin}
                      </span>
                    </div>
                  ) : (
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>—</span>
                  )}
                </td>

                {/* 2019 Result */}
                <td>
                  {d19.exists ? (
                    <div>
                      <span className={`badge-winner ${w19}`}>{w19}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '6px' }}>
                        +{d19.margin}
                      </span>
                    </div>
                  ) : (
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>—</span>
                  )}
                </td>

                {/* 2022 Result */}
                <td>
                  <div>
                    <span className={`badge-winner ${w22}`}>{w22}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '6px' }}>
                      +{d22.margin}
                    </span>
                  </div>
                </td>

                {/* 2024 Result */}
                <td>
                  <div>
                    <span className={`badge-winner ${w24}`}>{w24}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '6px' }}>
                      +{d24.margin}
                    </span>
                  </div>
                </td>

                {/* Trajectory */}
                <td>
                  <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                    {b.trajectory_4_elections}
                  </span>
                </td>

                <td style={{ textAlign: 'center' }}>
                  <ChevronRight size={16} style={{ color: 'var(--text-muted)' }} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
