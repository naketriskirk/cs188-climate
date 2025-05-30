import './App.css';
import CompanyScore from './components/CompanyScore';
import React from 'react';
import AnalysisPage from './components/Analysis';
/* global chrome */



function App() {
  const [pageTitle, setPageTitle] = React.useState('');

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


  return (
    <div className="App">
    <CompanyScore />
    </div>
  );
}
export default App;