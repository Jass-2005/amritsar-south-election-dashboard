import React from 'react';
import { Search, SlidersHorizontal, ArrowUpDown, Building2 } from 'lucide-react';

export default function FilterBar({
  searchQuery,
  setSearchQuery,
  activeFilter,
  setActiveFilter,
  winner17Filter,
  setWinner17Filter,
  winner19Filter,
  setWinner19Filter,
  winner22Filter,
  setWinner22Filter,
  winner24Filter,
  setWinner24Filter,
  sortBy,
  setSortBy,
  totalCount
}) {
  const quickFilters = [
    { id: 'ALL', label: `All Booths (${totalCount})` },
    { id: 'CORE_151', label: 'Historic Core (1-151)' },
    { id: 'AUXILIARY_18', label: 'Auxiliary ’22 (152-169)' },
    { id: 'FLIPPED_ONLY', label: 'Flipped Booths (2022→2024)' },
    { id: 'RETAINED_ONLY', label: 'Retained Booths (2022→2024)' },
  ];

  return (
    <nav className="toolbar-container" aria-label="Booth Search and Filter Toolbar">
      {/* Top Search & Dropdowns Row */}
      <div className="toolbar-row">
        <div className="search-input-wrap">
          <Search size={16} />
          <input
            type="text"
            className="search-input"
            placeholder="Search booth number, school, area (e.g. 1, Amrit School, ਅੰਮ੍ਰਿਤ ਸਕੂਲ)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filter-selects">
          {/* 2017 Winner Filter */}
          <select
            className="filter-select"
            value={winner17Filter || 'ALL'}
            onChange={(e) => setWinner17Filter && setWinner17Filter(e.target.value)}
            aria-label="Filter by 2017 Winner"
          >
            <option value="ALL">2017 Winner: All</option>
            <option value="INC">2017: INC Won (141)</option>
            <option value="AAP">2017: AAP Won (9)</option>
            <option value="SAD">2017: SAD Won (1)</option>
          </select>

          {/* 2019 Winner Filter */}
          <select
            className="filter-select"
            value={winner19Filter || 'ALL'}
            onChange={(e) => setWinner19Filter && setWinner19Filter(e.target.value)}
            aria-label="Filter by 2019 Winner"
          >
            <option value="ALL">2019 Winner: All</option>
            <option value="INC">2019: INC Won (118)</option>
            <option value="BJP">2019: BJP Won (33)</option>
          </select>

          {/* 2022 Winner Filter */}
          <select
            className="filter-select"
            value={winner22Filter || 'ALL'}
            onChange={(e) => setWinner22Filter && setWinner22Filter(e.target.value)}
            aria-label="Filter by 2022 Winner"
          >
            <option value="ALL">2022 Winner: All</option>
            <option value="AAP">2022: AAP Won (145)</option>
            <option value="SAD">2022: SAD Won (13)</option>
            <option value="INC">2022: INC Won (11)</option>
          </select>

          {/* 2024 Winner Filter */}
          <select
            className="filter-select"
            value={winner24Filter || 'ALL'}
            onChange={(e) => setWinner24Filter && setWinner24Filter(e.target.value)}
            aria-label="Filter by 2024 Winner"
          >
            <option value="ALL">2024 Winner: All</option>
            <option value="AAP">2024: AAP Won (84)</option>
            <option value="BJP">2024: BJP Won (43)</option>
            <option value="INC">2024: INC Won (42)</option>
          </select>

          {/* Sort By Dropdown */}
          <select
            className="filter-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            aria-label="Sort Booths"
          >
            <option value="BOOTH_ASC">Sort: Booth (1 → 169)</option>
            <option value="BOOTH_DESC">Sort: Booth (169 → 1)</option>
            <option value="MARGIN_24_DESC">Highest 2024 Lead Margin</option>
            <option value="TURNOUT_24_DESC">Highest 2024 Turnout</option>
            <option value="TURNOUT_22_DESC">Highest 2022 Turnout</option>
            <option value="TURNOUT_19_DESC">Highest 2019 Turnout</option>
            <option value="TURNOUT_17_DESC">Highest 2017 Turnout</option>
            <option value="BJP_GAIN_DESC">Highest BJP 2024 Inroads</option>
            <option value="AAP_22_DESC">Highest AAP 2022 Votes</option>
            <option value="INC_17_DESC">Highest INC 2017 Votes</option>
          </select>
        </div>
      </div>

      {/* Quick Filter Pills */}
      <div className="filter-pills-row" role="tablist" aria-label="Status Quick Filters">
        {quickFilters.map((f) => (
          <button
            key={f.id}
            role="tab"
            aria-selected={activeFilter === f.id}
            className={`filter-pill ${activeFilter === f.id ? 'active' : ''}`}
            onClick={() => setActiveFilter(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
