import React, { useState } from 'react';
import './EntryPoint.css';
import { FiX, FiSearch } from "react-icons/fi";

export const NotFoundSearch = () => {
  const [search, setSearch] = useState('');

  return (
    <div className="entry-point-container">
      <div className="corner-dot-wrapper">
        <FiX color = "#A1A1A1" size = {16}/>
      </div>
      <div className="content-column">
        <div className="label">Sustainability Rating:</div>
        <div className="not-found">NOT FOUND</div>
        <div className="search-bar">
          <div className="search-icon-wrapper">
            <div className="search-icon-shadow" />
            <FiSearch color = "#A1A1A1" size = {20} />
          </div>
          <input
            className="search-input"
            type="text"
            placeholder="Search for a brand"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export const RatingButton = () => (
  <div className="entry-point-container">
    <div className="corner-dot-wrapper">
      <FiX color = "#A1A1A1" size = {16}/>
    </div>
    <div className="variant2-content">
      <div className="label">Sustainability Rating:</div>
      <div className="score-badge">
        <div className="score-text">X</div>
      </div>
    </div>
  </div>
);