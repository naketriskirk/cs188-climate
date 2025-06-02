import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CompanyScore.css';

const CompanyScore = ({ setCurrentPage, setHistory, setAnalysisData, hasAutoAnalyzed, setHasAutoAnalyzed }) => {
  const [inputBrand, setInputBrand] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (
      !hasAutoAnalyzed &&
      typeof window !== 'undefined' &&
      window.chrome &&
      window.chrome.tabs
    ) {
      window.chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0] && tabs[0].url) {
          const origin = new URL(tabs[0].url).origin;
          let website = origin.replace('https://', '').replace('www.', '').replace(/\.com$/, '');
          setHasAutoAnalyzed(true);
          handleAnalyze(website);
        }
      });
    }
  }, []);

  const handleAnalyze = async (brandName) => {
    if (!brandName) {
      setError('Please enter a brand name.');
      return;
    }

    const formattedBrand = brandName.trim().toLowerCase();

    setError(null);

    try {
      const response = {
        method: 'GET',
        url: `https://api.brandlist.goodonyou.eco/v3/brands-listing/${formattedBrand}`,
        headers: {
          'X-API-Key': 'SP-2XUGi8G5WY2LdSK',
          'Content-Type': 'application/json',
        },
      };

      const responseData = await axios.request(response);
      setAnalysisData(responseData.data);

      if (localStorage.getItem("overallScore") === null) {
        localStorage.setItem("overallScore", "0");
      }

      const strScore = localStorage.getItem("overallScore");
      const numScore = Number(strScore);
      const numWebsiteScore = Number(responseData.data.overallRating.score_out_of_100);
      const accumScore = (numScore + numWebsiteScore) / 2;
      localStorage.setItem('overallScore', JSON.stringify(accumScore));

      setHistory(prev => [...prev, 'score']);
      setCurrentPage('analysis');
    } catch (err) {
      console.error("Error fetching brand data:", err);
      setError("Could not find data for that brand.");
    }
  };

  return (
    <div className="content">
      <div className="title">ESG Scores</div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="company-container">
        <input
          type="text"
          placeholder="Enter a brand name"
          value={inputBrand}
          onChange={(e) => setInputBrand(e.target.value)}
          className="search-bar"
        />
      </div>

      <button onClick={() => handleAnalyze(inputBrand)} className="analyze-button">
        Analyze
      </button>
    </div>
  );
};

export default CompanyScore;
