import React from 'react';
import { Search, X, Filter, SlidersHorizontal } from 'lucide-react';

export const SearchBar = ({ 
  searchTerm, 
  setSearchTerm, 
  selectedSeverity, 
  setSelectedSeverity,
  selectedRegion,
  setSelectedRegion,
  regions,
  onResetFilters
}) => {
  const severities = ['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'];

  return (
    <div className="search-bar-container">
      {/* Search Input Box */}
      <div className="search-input-wrapper">
        <Search className="search-icon" size={18} />
        <input
          type="text"
          placeholder="Search wildfire by name, location, country..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        {searchTerm && (
          <button 
            className="clear-search-btn" 
            onClick={() => setSearchTerm('')}
            title="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Filter Control Row */}
      <div className="filter-controls-row">
        {/* Severity Filter Chips */}
        <div className="severity-chips-group">
          {severities.map((sev) => (
            <button
              key={sev}
              className={`sev-chip chip-${sev.toLowerCase()} ${selectedSeverity === sev ? 'active' : ''}`}
              onClick={() => setSelectedSeverity(sev)}
            >
              {sev}
            </button>
          ))}
        </div>

        {/* Region Dropdown Select */}
        <div className="select-dropdown-wrapper">
          <SlidersHorizontal size={14} className="dropdown-icon" />
          <select 
            value={selectedRegion} 
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="region-select"
          >
            <option value="ALL">All Regions</option>
            {regions.map((reg) => (
              <option key={reg} value={reg}>{reg}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Reset Filter indicator */}
      {(searchTerm || selectedSeverity !== 'ALL' || selectedRegion !== 'ALL') && (
        <div className="active-filter-indicator">
          <span>Active Filters Applied</span>
          <button className="reset-link-btn" onClick={onResetFilters}>
            Reset All
          </button>
        </div>
      )}
    </div>
  );
};
