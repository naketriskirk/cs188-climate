import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PopupContainer from './PopupContainer';
import fetchCompanyNames from './CompanyNames';
import './CompanyScore.css';

const CompanyScore = () => {
  const [companyNames, setCompanyNames] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [inputBrand, setInputBrand] = useState('');
  const [brandData, setBrandData] = useState([]);
  const [score, setScore] = useState(null);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const filtered = companyNames.filter((company) =>
      company.companyname.toLowerCase().includes(inputBrand.toLowerCase())
    );
    setFilteredCompanies(filtered);
  }, [inputBrand, companyNames]);

  const handleAnalyze = async () => {
    if (!inputBrand) {
      setError('Please enter a brand name.');
      return;
    }

    const formattedBrand = inputBrand.trim().toLowerCase();

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
      console.log("Brand Data:", responseData.data);
      setShowPopup(true);
    } catch (err) {
      setError('Failed to fetch company scores');
      console.error(err);
    }
  };

  if (showPopup && brandData) {
    return <PopupContainer data={brandData} />;
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
      <button onClick={handleAnalyze} class="analyze-button">
        Analyze
      </button>
    </div>
  );
};

export default CompanyScore;