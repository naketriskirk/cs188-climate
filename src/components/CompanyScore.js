import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AnalysisPage from './Analysis';
import './CompanyScore.css';

const CompanyScore = () => {
  const [inputBrand, setInputBrand] = useState('');
  const [brandData, setBrandData] = useState([]);
  // Removed unused score state
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  // Removed unused pageTitle state

  useEffect(() => {
    if (typeof window !== 'undefined' && window.chrome && window.chrome.tabs) {
      window.chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0] && tabs[0].url) {
          const origin = new URL(tabs[0].url).origin;
          let website = origin.replace('https://', '').replace('www.', '').replace(/\.com$/, '');
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
    setBrandData([]);
    // setScore(null);

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
      setBrandData(responseData.data);

      if (localStorage.getItem("overallScore") === null) {
        // key does not exist yet, first entry
        localStorage.setItem("overallScore", "0");
      }

      const strScore = localStorage.getItem("overallScore");
      let numScore = Number(strScore);
      let numWebsiteScore = Number(responseData.data.overallRating.score_out_of_100);
      let accumScore = (numScore + numWebsiteScore) / 2;
      localStorage.setItem('overallScore', JSON.stringify(accumScore));

      setShowPopup(true);
    } catch (err) {
      setShowPopup(false);
      console.error("Error fetching brand data:", err);
    }
  };

  if (showPopup && brandData) {
    return <AnalysisPage data={brandData} />;
  }

  return (
    <div class="content">
      <div class="title">ESG Scores</div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div class="company-container">
        <input
          type="text"
          placeholder="Enter a brand name"
          value={inputBrand}
          onChange={(e) => setInputBrand(e.target.value)}
          className="search-bar"
        />
      </div>
      <button onClick={() => handleAnalyze(inputBrand)} class="analyze-button">
        Analyze
      </button>
    </div>
  );
};

export default CompanyScore;