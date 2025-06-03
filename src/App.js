import './App.css';
import CompanyScore from './components/CompanyScore';
import React from 'react';
import AnalysisPage from './components/Analysis';
/* global chrome */

function App() {
  const [pageTitle, setPageTitle] = React.useState('');
  const [currentPage, setCurrentPage] = React.useState('score'); 
  const [history, setHistory] = React.useState([]);
  const [analysisData, setAnalysisData] = React.useState(null);
  const [hasAutoAnalyzed, setHasAutoAnalyzed] = React.useState(false);

React.useEffect(() => {
  if (window.chrome && chrome.tabs) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0] && tabs[0].url) {
        const origin = new URL(tabs[0].url).origin;
        let website = origin.replace('https://', '').replace(/\.com$/, '');
        setPageTitle(website);
      }
    });
  }
}, []);

  const goBack = () => {
    const prevPage = history[history.length - 1];
    setCurrentPage(prevPage);
    setHistory(prev => prev.slice(0, -1));
  };


  return (
    <div className="App">
      {currentPage === 'score' && (
        <CompanyScore 
          setCurrentPage={setCurrentPage} 
          setHistory={setHistory} 
          setAnalysisData={setAnalysisData}
          hasAutoAnalyzed={hasAutoAnalyzed}
          setHasAutoAnalyzed={setHasAutoAnalyzed} 
        />
      )}

      {currentPage === 'analysis' && (
        <div>
          <AnalysisPage 
            data={analysisData}
            goBack={goBack} />
        </div>
      )}
    </div>
  );
}
export default App;