import logo from './logo.svg';
import './App.css';
import PopupContainer from './PopupContainer';
import React from 'react';
/* global chrome */



function App() {
  const [pageTitle, setPageTitle] = React.useState('');

React.useEffect(() => {
  // Get the active tab's URL using the Chrome extension API, getting only website name
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
    <PopupContainer website_name={pageTitle} />
    </div>
  );
}
export default App;