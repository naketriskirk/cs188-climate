import React, { useEffect, useState } from 'react';
import axios from 'axios';
import fetchCompanyNames from './CompanyNames';

const CompanyScore = () => {
  const [score, setScore] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanyScore = async () => {
        try {
            const companyNames = await fetchCompanyNames();
            console.log('Fetched company names:', companyNames);
            console.log('Is Array:', Array.isArray(companyNames));
            console.log('length: ', companyNames.length);
            if (!Array.isArray(companyNames) || companyNames.length == 0) {
              setError('Invalid company names format');
              return;
            }

        const companyname = companyNames[0].companyname;
        const options = {
          method: 'GET',
          url: 'https://gaialens-esg-scores.p.rapidapi.com/scores',
          params: {
            companyname: 'Apple Inc.'
          },
          headers: {
            'x-rapidapi-key': 'c891c10464mshb9caeab8511487dp10b501jsn2d14fb3b860b',
            'x-rapidapi-host': 'gaialens-esg-scores.p.rapidapi.com',
            'Content-Type': 'text'
          }
        };

        const response = await axios.request(options);
        console.log(`Data for ${companyname}:`, response.data);
        setScore({ company: companyname, score: response.data});

    } catch (err) {
        setError('Failed to fetch company scores');
        console.error(err);
      }
        
    };

    fetchCompanyScore();
  }, []);

 return (
    <div>
      <h2>ESG Scores</h2>

      {error && (
        <p style={{ color: 'red' }}>{error}</p>
      )}

      {!error && !score && (
        <p>Loading scores...</p>
      )}

      {!error && score && (
        <div style={{ marginBottom: '1rem' }}>
          <h4>{score.company}</h4>
          <pre>{JSON.stringify(score.score, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};
export default CompanyScore;