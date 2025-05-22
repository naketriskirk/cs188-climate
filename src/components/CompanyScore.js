import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PopupContainer from './PopupContainer';
import fetchCompanyNames from './CompanyNames';
import './CompanyScore.css';

const CompanyScore = () => {
  const [companyNames, setCompanyNames] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [score, setScore] = useState(null);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const names = await fetchCompanyNames();
        setCompanyNames(names);
        setFilteredCompanies(names);
      } catch (err) {
        setError('Failed to fetch company names');
        console.error(err);
      }
    };

    fetchCompanies();
  }, []);

  useEffect(() => {
    const filtered = companyNames.filter((company) =>
      company.companyname.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCompanies(filtered);
  }, [searchTerm, companyNames]);

  const handleCompanyClick = (companyName) => {
    setSelectedCompany(companyName);
  };

  const handleAnalyze = async () => {
    if (!selectedCompany) {
      setError('Please select a company');
      return;
    }

    setError(null);
    setScore(null);

    try {
      const options = {
        method: 'GET',
        url: 'https://gaialens-esg-scores.p.rapidapi.com/scores',
        params: { companyname: selectedCompany },
        headers: {
          'x-rapidapi-key': 'c891c10464mshb9caeab8511487dp10b501jsn2d14fb3b860b',
          'x-rapidapi-host': 'gaialens-esg-scores.p.rapidapi.com',
          'Content-Type': 'text',
        },
      };

      const response = await axios.request(options);
      const result = response.data[0];
      console.log(result);
      setScore({
        avg_rating: Math.round(result["Overall Score"]),
        transparency: Math.round(result["Overall Transparency Score"]),
        environment: Math.round(result["Environmental Pillar Score"]),
        social: Math.round(result["Social Pillar Score"]),
        governance: Math.round(result["Governance Pillar Score"]),
        company_name: result.companyname,
      });
      setShowPopup(true);
    } catch (err) {
      setError('Failed to fetch company scores');
      console.error(err);
    }
  };

  if (showPopup && score) {
    return <PopupContainer {...score} />;
  }

  return (
    <div class="content">
      <div class="title">ESG Scores</div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div class="company-container">
        <input
          type="text"
          placeholder="Search companies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />

        <div className="company-list">
          {filteredCompanies.map((company, index) => (
            <div
              key={index}
              className={`company-item ${selectedCompany === company.companyname ? 'selected' : ''}`}
              onClick={() => handleCompanyClick(company.companyname)}
            >
              {company.companyname}
              {selectedCompany === company.companyname && <span className="checkmark">✔</span>}
            </div>
          ))}
        </div>
      </div>
      <button onClick={handleAnalyze} class="analyze-button">
        Analyze
      </button>
    </div>
  );
};

export default CompanyScore;