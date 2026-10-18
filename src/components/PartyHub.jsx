import React from 'react';
import { 
  Layers, 
  ShieldCheck, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  ShieldAlert, 
  Award, 
  Filter, 
  Flame, 
  ArrowRight,
  Building2
} from 'lucide-react';

export default function PartyHub({ 
  selectedParty, 
  setSelectedParty, 
  partyFilter, 
  setPartyFilter,
  partyStats,
  summary
}) {
  const currentStats = partyStats[selectedParty] || partyStats.AAP;
  const totalBooths = summary?.total_booths || 169;
  const aapWins = summary?.booths_won_2024?.AAP || 84;
  const bjpWins = summary?.booths_won_2024?.BJP || 43;
  const incWins = summary?.booths_won_2024?.INC || 42;
  const sadWins = summary?.booths_won_2024?.SAD || 0;
  const m26 = summary?.metrics_2026_survey || {};

  // Retained & Flipped counts
  const retainedCount = 82;
  const flippedCount = 87;

  // 4-Election lineage metadata
  const lineage = {
    AAP: {
      c17: 'Dr. Inderbir Singh Nijjar',
      v17: summary?.party_votes_2017?.AAP || 24842,
      s17: '26.7%',
      c19: 'Kuldip Singh Dhaliwal',
      v19: summary?.party_votes_2019?.AAP || 2544,
      s19: '3.3%',
      c22: 'Dr. Inderbir Singh Nijjar',
      v22: summary?.party_votes_2022?.AAP || 53053,
      s22: '50.1%',
      c24: 'Kuldeep Singh Dhaliwal',
      v24: summary?.party_votes_2024?.AAP || 28431,
      s24: '34.4%'
    },
    INC: {
      c17: 'Inderbir Singh Bolaria',
      v17: summary?.party_votes_2017?.INC || 47517,
      s17: '51.0%',
      c19: 'Gurjeet Singh Aujla',
      v19: summary?.party_votes_2019?.INC || 40489,
      s19: '52.5%',
      c22: 'Inderbir Singh Bolaria',
      v22: summary?.party_votes_2022?.INC || 22467,
      s22: '21.2%',
      c24: 'Gurjeet Singh Aujla',
      v24: summary?.party_votes_2024?.INC || 21782,
      s24: '26.3%'
    },
    BJP: {
      c17: 'SAD-BJP Alliance',
      v17: 'Alliance',
      s17: '—',
      c19: 'Hardeep Singh Puri',
      v19: summary?.party_votes_2019?.BJP || 30094,
      s19: '39.0%',
      c22: 'Harjinder Thekedar (PLC/BJP)',
      v22: 1566,
      s22: '1.5%',
      c24: 'Taranjit Singh Sandhu',
      v24: summary?.party_votes_2024?.BJP || 15819,
      s24: '19.1%'
    },
    SAD: {
      c17: 'Gurpartap Singh Tikka',
      v17: summary?.party_votes_2017?.SAD || 16569,
      s17: '17.8%',
      c19: 'SAD-BJP Alliance',
      v19: 'Alliance',
      s19: '—',
      c22: 'Talbir Singh Gill',
      v22: summary?.party_votes_2022?.SAD || 25550,
      s22: '24.1%',
      c24: 'Anil Joshi',
      v24: summary?.party_votes_2024?.SAD || 10932,
      s24: '13.2%'
    }
  };

  const currLineage = lineage[selectedParty] || lineage.AAP;

  return (
    <div id="party-analytics-hub" className="registry-sub-controls" aria-label="Party Analytics and Filters">
      {/* 1. Main Segment Switcher Tabs */}
      <div className="party-pills-row">
        <div className="party-pill-tabs">
          {/* Complete List Button */}
          <button
            className={`party-tab-pill ${selectedParty === 'ALL' ? 'active all' : ''}`}
            onClick={() => { setSelectedParty('ALL'); setPartyFilter('ALL'); }}
            title={`View complete constituency list of all ${totalBooths} booths`}
          >
            <Layers size={14} />
            <span className="party-tab-text">All Booths</span>
            <span className="tab-pill-count">{totalBooths}</span>
          </button>

          {/* AAP Analytics Button */}
          <button
            className={`party-tab-pill ${selectedParty === 'AAP' ? 'active aap' : ''}`}
            onClick={() => { setSelectedParty('AAP'); setPartyFilter('ALL'); }}
            title="Aam Aadmi Party 4-Election Analytics"
          >
            <span className="party-color-indicator aap-indicator"></span>
            <span className="party-tab-text">AAP Analytics</span>
            <span className="tab-pill-count aap-badge">{aapWins} Wins</span>
          </button>

          {/* INC Analytics Button */}
          <button
            className={`party-tab-pill ${selectedParty === 'INC' ? 'active inc' : ''}`}
            onClick={() => { setSelectedParty('INC'); setPartyFilter('ALL'); }}
            title="Congress (INC) 4-Election Analytics"
          >
            <span className="party-color-indicator inc-indicator"></span>
            <span className="party-tab-text">INC Analytics</span>
            <span className="tab-pill-count inc-badge">{incWins} Wins</span>
          </button>

          {/* BJP Analytics Button */}
          <button
            className={`party-tab-pill ${selectedParty === 'BJP' ? 'active bjp' : ''}`}
            onClick={() => { setSelectedParty('BJP'); setPartyFilter('ALL'); }}
            title="Bharatiya Janata Party 4-Election Analytics"
          >
            <span className="party-color-indicator bjp-indicator"></span>
            <span className="party-tab-text">BJP Analytics</span>
            <span className="tab-pill-count bjp-badge">{bjpWins} Wins</span>
          </button>

          {/* SAD Analytics Button */}
          <button
            className={`party-tab-pill ${selectedParty === 'SAD' ? 'active sad' : ''}`}
            onClick={() => { setSelectedParty('SAD'); setPartyFilter('ALL'); }}
            title="Shiromani Akali Dal 4-Election Analytics"
          >
            <span className="party-color-indicator sad-indicator"></span>
            <span className="party-tab-text">SAD Analytics</span>
            <span className="tab-pill-count sad-badge">{sadWins} Wins</span>
          </button>
        </div>

        {/* Compact Vitals Badge Strip */}
        <div className="compact-vitals-line" title="Aggregated Constituency & Party Vitals">
          {selectedParty === 'ALL' ? (
            <>
              <div className="vital-item">
                <span className="vital-lbl">Core (1-151)</span>
                <span className="vital-val">151 Booths</span>
                <span className="vital-sub">100% Retained</span>
              </div>
              <span className="vital-divider" aria-hidden="true" />
              <div className="vital-item">
                <span className="vital-lbl">Aux (152-169)</span>
                <span className="vital-val">+18 Booths</span>
                <span className="vital-sub">Created ’22</span>
              </div>
              <span className="vital-divider hide-mobile" aria-hidden="true" />
              <div className="vital-item hide-mobile">
                <span className="vital-lbl">’24 Turnout</span>
                <span className="vital-val">82,725</span>
                <span className="vital-sub">AAP +6.6k Lead</span>
              </div>
            </>
          ) : (
            <>
              <div className="vital-item">
                <span className="vital-lbl">’17 Votes</span>
                <span className="vital-val">{currLineage.v17.toLocaleString()}</span>
                <span className="vital-sub">({currLineage.s17})</span>
              </div>
              <span className="vital-divider" aria-hidden="true" />
              <div className="vital-item">
                <span className="vital-lbl">’19 Votes</span>
                <span className="vital-val">{currLineage.v19.toLocaleString()}</span>
                <span className="vital-sub">({currLineage.s19})</span>
              </div>
              <span className="vital-divider" aria-hidden="true" />
              <div className="vital-item">
                <span className="vital-lbl">’22 Votes</span>
                <span className="vital-val">{currLineage.v22.toLocaleString()}</span>
                <span className="vital-sub">({currLineage.s22})</span>
              </div>
              <span className="vital-divider hide-mobile" aria-hidden="true" />
              <div className="vital-item hide-mobile">
                <span className="vital-lbl">’24 Votes</span>
                <span className="vital-val">{currLineage.v24.toLocaleString()}</span>
                <span className="vital-sub">({currLineage.s24})</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* 4-Election Candidate Lineage Bar when a Party is Selected */}
      {selectedParty !== 'ALL' && (
        <div className="party-candidate-bar" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 16px',
          background: 'var(--bg-surface-elevated, #f8fafc)',
          borderRadius: '8px',
          margin: '8px 0',
          border: '1px solid var(--border-subtle, #e2e8f0)',
          fontSize: '0.8rem',
          flexWrap: 'wrap',
          gap: '8px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
              {selectedParty} 10-Year Candidate History:
            </span>
            <span>
              <strong>’17:</strong> {currLineage.c17} ({currLineage.v17.toLocaleString()})
            </span>
            <ArrowRight size={12} style={{ color: 'var(--text-muted)' }} />
            <span>
              <strong>’19:</strong> {currLineage.c19} ({currLineage.v19.toLocaleString()})
            </span>
            <ArrowRight size={12} style={{ color: 'var(--text-muted)' }} />
            <span>
              <strong>’22:</strong> {currLineage.c22} ({currLineage.v22.toLocaleString()})
            </span>
            <ArrowRight size={12} style={{ color: 'var(--text-muted)' }} />
            <span>
              <strong>’24:</strong> {currLineage.c24} ({currLineage.v24.toLocaleString()})
            </span>
          </div>
        </div>
      )}

      {/* 2. Category Filter Pills */}
      <div className={`category-filter-pills ${selectedParty.toLowerCase()}-mode`}>
        <div className="filter-pill-header">
          <Filter size={12} className="filter-header-icon" />
          <span className="filter-group-label">FILTER:</span>
        </div>

        {selectedParty === 'ALL' ? (
          <div className="cat-pill-group">
            <button
              className={`cat-pill-btn ${partyFilter === 'ALL' ? 'active default-active' : ''}`}
              onClick={() => setPartyFilter('ALL')}
            >
              <span>All 169 Booths</span>
            </button>
            <button
              className={`cat-pill-btn highlight-filter ${partyFilter === 'WON_THIS_YEAR' ? 'active' : ''}`}
              onClick={() => setPartyFilter(partyFilter === 'WON_THIS_YEAR' ? 'ALL' : 'WON_THIS_YEAR')}
              title="All 169 booths with a decisive winner recorded in 2024"
            >
              <Award size={13} />
              <span>Won in This Year (’24)</span>
              <span className="cat-pill-num">{totalBooths}</span>
            </button>
            <button
              className={`cat-pill-btn highlight-filter ${partyFilter === 'WON_ALL_ELECTIONS' ? 'active' : ''}`}
              onClick={() => setPartyFilter(partyFilter === 'WON_ALL_ELECTIONS' ? 'ALL' : 'WON_ALL_ELECTIONS')}
              title="Booths where the 2024 winner won all elections (Clean Sweep)"
            >
              <Award size={13} />
              <span>All Elections Won</span>
              <span className="cat-pill-num">6</span>
            </button>
            <button
              className={`cat-pill-btn highlight-filter ${partyFilter === 'WON_IN_2' ? 'active' : ''}`}
              onClick={() => setPartyFilter(partyFilter === 'WON_IN_2' ? 'ALL' : 'WON_IN_2')}
              title="Booths won in exactly 2 elections by the 2024 winner"
            >
              <ShieldCheck size={13} />
              <span>Won in Two (2 Elections)</span>
              <span className="cat-pill-num">111</span>
            </button>
            <button
              className={`cat-pill-btn highlight-filter ${partyFilter === 'WON_IN_3_PLUS' ? 'active' : ''}`}
              onClick={() => setPartyFilter(partyFilter === 'WON_IN_3_PLUS' ? 'ALL' : 'WON_IN_3_PLUS')}
              title="Booths won in 3 or more elections by the 2024 winner"
            >
              <TrendingUp size={13} />
              <span>Won 3+ Elections</span>
              <span className="cat-pill-num">28</span>
            </button>
            <button
              className={`cat-pill-btn ${partyFilter === 'RETAINED_ONLY' ? 'active' : ''}`}
              onClick={() => setPartyFilter(partyFilter === 'RETAINED_ONLY' ? 'ALL' : 'RETAINED_ONLY')}
              title="Booths where 2022 winner was retained in 2024"
            >
              <ShieldCheck size={13} />
              <span>Retained Both ’22 & ’24</span>
              <span className="cat-pill-num">{retainedCount}</span>
            </button>
            <button
              className={`cat-pill-btn ${partyFilter === 'FLIPPED_ONLY' ? 'active' : ''}`}
              onClick={() => setPartyFilter(partyFilter === 'FLIPPED_ONLY' ? 'ALL' : 'FLIPPED_ONLY')}
              title="Booths that flipped winner between 2022 and 2024"
            >
              <TrendingDown size={13} />
              <span>Flipped in ’24</span>
              <span className="cat-pill-num">{flippedCount}</span>
            </button>
            <button
              className={`cat-pill-btn ${partyFilter === 'CORE_151' ? 'active' : ''}`}
              onClick={() => setPartyFilter(partyFilter === 'CORE_151' ? 'ALL' : 'CORE_151')}
              title="Historical Core Booths 1-151 (100% continuous from 2017 to 2024)"
            >
              <Building2 size={13} />
              <span>Core Booths (1-151)</span>
              <span className="cat-pill-num">151</span>
            </button>
            <button
              className={`cat-pill-btn ${partyFilter === 'AUXILIARY_18' ? 'active' : ''}`}
              onClick={() => setPartyFilter(partyFilter === 'AUXILIARY_18' ? 'ALL' : 'AUXILIARY_18')}
              title="Auxiliary Booths 152-169 created in 2022 rationalization"
            >
              <span>Auxiliary (152-169)</span>
              <span className="cat-pill-num">18</span>
            </button>
            <button
              className={`cat-pill-btn aap-filter ${partyFilter === 'AAP_WINS' ? 'active aap-active' : ''}`}
              onClick={() => setPartyFilter(partyFilter === 'AAP_WINS' ? 'ALL' : 'AAP_WINS')}
            >
              <Award size={13} className="pill-icon aap-text" />
              <span>’24 AAP Lead</span>
              <span className="cat-pill-num">{aapWins}</span>
            </button>
            <button
              className={`cat-pill-btn bjp-filter ${partyFilter === 'BJP_WINS' ? 'active bjp-active' : ''}`}
              onClick={() => setPartyFilter(partyFilter === 'BJP_WINS' ? 'ALL' : 'BJP_WINS')}
            >
              <Award size={13} className="pill-icon bjp-text" />
              <span>’24 BJP Lead</span>
              <span className="cat-pill-num">{bjpWins}</span>
            </button>
            <button
              className={`cat-pill-btn inc-filter ${partyFilter === 'INC_WINS' ? 'active inc-active' : ''}`}
              onClick={() => setPartyFilter(partyFilter === 'INC_WINS' ? 'ALL' : 'INC_WINS')}
            >
              <Award size={13} className="pill-icon inc-text" />
              <span>’24 INC Lead</span>
              <span className="cat-pill-num">{incWins}</span>
            </button>
            <button
              className={`cat-pill-btn aap-filter ${partyFilter === 'AAP_2022_WINS' ? 'active aap-active' : ''}`}
              onClick={() => setPartyFilter(partyFilter === 'AAP_2022_WINS' ? 'ALL' : 'AAP_2022_WINS')}
              title="Booths Won by AAP in 2022 Vidhan Sabha (145 Booths)"
            >
              <span>’22 AAP Wins</span>
              <span className="cat-pill-num">145</span>
            </button>
            <button
              className={`cat-pill-btn sad-filter ${partyFilter === 'SAD_2022_WINS' ? 'active sad-active' : ''}`}
              onClick={() => setPartyFilter(partyFilter === 'SAD_2022_WINS' ? 'ALL' : 'SAD_2022_WINS')}
              title="Booths Won by SAD in 2022 Vidhan Sabha (13 Booths)"
            >
              <span>’22 SAD Wins</span>
              <span className="cat-pill-num">13</span>
            </button>
            <button
              className={`cat-pill-btn inc-filter ${partyFilter === 'INC_2022_WINS' ? 'active inc-active' : ''}`}
              onClick={() => setPartyFilter(partyFilter === 'INC_2022_WINS' ? 'ALL' : 'INC_2022_WINS')}
              title="Booths Won by INC in 2022 Vidhan Sabha (11 Booths)"
            >
              <span>’22 INC Wins</span>
              <span className="cat-pill-num">11</span>
            </button>
            <button
              className={`cat-pill-btn inc-filter ${partyFilter === 'INC_2019_WINS' ? 'active inc-active' : ''}`}
              onClick={() => setPartyFilter(partyFilter === 'INC_2019_WINS' ? 'ALL' : 'INC_2019_WINS')}
              title="Booths Won by INC in 2019 Lok Sabha (118 Booths)"
            >
              <span>’19 INC Lead</span>
              <span className="cat-pill-num">118</span>
            </button>
            <button
              className={`cat-pill-btn bjp-filter ${partyFilter === 'BJP_2019_WINS' ? 'active bjp-active' : ''}`}
              onClick={() => setPartyFilter(partyFilter === 'BJP_2019_WINS' ? 'ALL' : 'BJP_2019_WINS')}
              title="Booths Won by BJP in 2019 Lok Sabha (33 Booths)"
            >
              <span>’19 BJP Lead</span>
              <span className="cat-pill-num">33</span>
            </button>
            <button
              className={`cat-pill-btn inc-filter ${partyFilter === 'INC_2017_WINS' ? 'active inc-active' : ''}`}
              onClick={() => setPartyFilter(partyFilter === 'INC_2017_WINS' ? 'ALL' : 'INC_2017_WINS')}
              title="Booths Won by INC in 2017 Vidhan Sabha (141 Booths)"
            >
              <span>’17 INC Wins</span>
              <span className="cat-pill-num">141</span>
            </button>
            <button
              className={`cat-pill-btn aap-filter ${partyFilter === 'AAP_2017_WINS' ? 'active aap-active' : ''}`}
              onClick={() => setPartyFilter(partyFilter === 'AAP_2017_WINS' ? 'ALL' : 'AAP_2017_WINS')}
              title="Booths Won by AAP in 2017 Vidhan Sabha (9 Booths)"
            >
              <span>’17 AAP Wins</span>
              <span className="cat-pill-num">9</span>
            </button>
            <button
              className={`cat-pill-btn sad-filter ${partyFilter === 'SAD_2017_WINS' ? 'active sad-active' : ''}`}
              onClick={() => setPartyFilter(partyFilter === 'SAD_2017_WINS' ? 'ALL' : 'SAD_2017_WINS')}
              title="Booths Won by SAD in 2017 Vidhan Sabha (1 Booth)"
            >
              <span>’17 SAD Wins</span>
              <span className="cat-pill-num">1</span>
            </button>
          </div>
        ) : (
          <div className="cat-pill-group">
            <button
              className={`cat-pill-btn ${partyFilter === 'ALL' ? 'active' : ''}`}
              onClick={() => setPartyFilter('ALL')}
            >
              <span>All 169 Booths</span>
            </button>
            {(currentStats.booths_won_2024 > 0 || currentStats.won_this_year_count > 0) && (
              <button
                className={`cat-pill-btn ${partyFilter === 'WON_THIS_YEAR' || partyFilter === 'WON_24' ? 'active' : ''}`}
                onClick={() => setPartyFilter(partyFilter === 'WON_THIS_YEAR' || partyFilter === 'WON_24' ? 'ALL' : 'WON_24')}
                title={`Booths won by ${selectedParty} in 2024 Lok Sabha`}
              >
                <Award size={13} />
                <span>Won in This Year (’24)</span>
                <span className="cat-pill-num">{currentStats.won_this_year_count || currentStats.booths_won_2024}</span>
              </button>
            )}
            {currentStats.booths_won_2022 > 0 && (
              <button
                className={`cat-pill-btn ${partyFilter === 'WON_22' ? 'active' : ''}`}
                onClick={() => setPartyFilter(partyFilter === 'WON_22' ? 'ALL' : 'WON_22')}
                title={`Booths won by ${selectedParty} in 2022 Vidhan Sabha`}
              >
                <span>’22 Wins</span>
                <span className="cat-pill-num">{currentStats.booths_won_2022}</span>
              </button>
            )}
            {currentStats.booths_won_2019 > 0 && (
              <button
                className={`cat-pill-btn ${partyFilter === 'WON_19' ? 'active' : ''}`}
                onClick={() => setPartyFilter(partyFilter === 'WON_19' ? 'ALL' : 'WON_19')}
                title={`Booths won by ${selectedParty} in 2019 Lok Sabha`}
              >
                <span>’19 Wins</span>
                <span className="cat-pill-num">{currentStats.booths_won_2019}</span>
              </button>
            )}
            {currentStats.booths_won_2017 > 0 && (
              <button
                className={`cat-pill-btn ${partyFilter === 'WON_17' ? 'active' : ''}`}
                onClick={() => setPartyFilter(partyFilter === 'WON_17' ? 'ALL' : 'WON_17')}
                title={`Booths won by ${selectedParty} in 2017 Vidhan Sabha`}
              >
                <span>’17 Wins</span>
                <span className="cat-pill-num">{currentStats.booths_won_2017}</span>
              </button>
            )}
            <button
              className={`cat-pill-btn ${partyFilter === 'WON_BOTH' ? 'active' : ''}`}
              onClick={() => setPartyFilter(partyFilter === 'WON_BOTH' ? 'ALL' : 'WON_BOTH')}
              title={`Booths won by ${selectedParty} in both 2022 and 2024`}
            >
              <ShieldCheck size={13} />
              <span>Won Both ’22 & ’24</span>
              <span className="cat-pill-num">{currentStats.won_both_count}</span>
            </button>
            <button
              className={`cat-pill-btn ${partyFilter === 'WON_IN_2' ? 'active' : ''}`}
              onClick={() => setPartyFilter(partyFilter === 'WON_IN_2' ? 'ALL' : 'WON_IN_2')}
              title={`Booths won by ${selectedParty} in exactly 2 elections`}
            >
              <ShieldCheck size={13} />
              <span>Won in Two (2 Elections)</span>
              <span className="cat-pill-num">{currentStats.won_in_2_count || 0}</span>
            </button>
            {currentStats.won_in_3_count > 0 && (
              <button
                className={`cat-pill-btn ${partyFilter === 'WON_IN_3_PLUS' ? 'active' : ''}`}
                onClick={() => setPartyFilter(partyFilter === 'WON_IN_3_PLUS' ? 'ALL' : 'WON_IN_3_PLUS')}
                title={`Booths won by ${selectedParty} in 3 or more elections`}
              >
                <TrendingUp size={13} />
                <span>Won 3+ Elections</span>
                <span className="cat-pill-num">{currentStats.won_in_3_count}</span>
              </button>
            )}
            {currentStats.won_all_count > 0 && (
              <button
                className={`cat-pill-btn ${partyFilter === 'WON_ALL_ELECTIONS' ? 'active' : ''}`}
                onClick={() => setPartyFilter(partyFilter === 'WON_ALL_ELECTIONS' ? 'ALL' : 'WON_ALL_ELECTIONS')}
                title={`Booths won by ${selectedParty} in all 4 elections (Clean Sweep)`}
              >
                <Award size={13} />
                <span>All Elections Won</span>
                <span className="cat-pill-num">{currentStats.won_all_count}</span>
              </button>
            )}
            <button
              className={`cat-pill-btn ${partyFilter === 'GAINED' ? 'active' : ''}`}
              onClick={() => setPartyFilter(partyFilter === 'GAINED' ? 'ALL' : 'GAINED')}
            >
              <TrendingUp size={13} />
              <span>Gained in ’24</span>
              <span className="cat-pill-num">{currentStats.gained_count}</span>
            </button>
            <button
              className={`cat-pill-btn ${partyFilter === 'LOST_24' ? 'active' : ''}`}
              onClick={() => setPartyFilter(partyFilter === 'LOST_24' ? 'ALL' : 'LOST_24')}
            >
              <TrendingDown size={13} />
              <span>Lost in ’24</span>
              <span className="cat-pill-num">{currentStats.lost_24_count}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
