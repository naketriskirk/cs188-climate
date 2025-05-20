import React, { useEffect, useState } from 'react';
import axios from 'axios';
import fetchCompanyNames from './CompanyNames';

const CompanyScore = () => {
  const [score, setScore] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanyScore = async () => {
        try {
            const companyNames = await fetchCompanyNames(); // dynamically fetched
            if (!Array.isArray(companyNames)) {
              setError('Invalid company names format');
              return;
            }

        const results = await Promise.all(
            companyNames.map(async ({ companyname }) => {
                const options = {
                    method: 'GET',
                    url: 'https://gaialens-esg-scores.p.rapidapi.com/scores',
                    params: {
                        companyname,
                    },
                    headers: {
                    'x-rapidapi-key': 'c891c10464mshb9caeab8511487dp10b501jsn2d14fb3b860b',
                    'x-rapidapi-host': 'gaialens-esg-scores.p.rapidapi.com',
                    'Content-Type': 'text'
                    }
                };
          
                try {
                    const response = await axios.request(options);
                    console.log(`Data for ${companyname}:`, response.data);
                    return { company: companyname, score: response.data};
                } catch (error) {
                    console.error(`Error for ${companyname}:`, error);
                    return { company: companyname, error: 'Failed to load score' };
                }
            })
        );

        setScore(results);
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
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {Array.isArray(score) && score.length === 0 ? (
        <p>Loading scores...</p>
      ) : Array.isArray(score) ? (
        score.map((item, idx) => (
          <div key={idx} style={{ marginBottom: '1rem' }}>
            <h4>{item.company}</h4>
            {item.error ? (
              <p style={{ color: 'red' }}>{item.error}</p>
            ) : (
              <pre>{JSON.stringify(item.score, null, 2)}</pre>
            )}
          </div>
        ))
      ) : (
        <p style={{ color: 'red' }}>Invalid score data format</p>
      )}
    </div>
  );
};
export default CompanyScore;