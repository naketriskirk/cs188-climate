import './Analysis.css';
import planetIcon from '../assets/planet_icon.svg';
import peopleIcon from '../assets/people_icon.svg';
import animalsIcon from '../assets/animals_icon.svg';
import dropdownIcon from '../assets/dropdown_icon.svg';
import { useState, useEffect } from 'react';
/* global chrome */

const extractSummaries = (htmlString) => {
    const planetStart = htmlString.indexOf("Our “Planet” rating");
    const peopleStart = htmlString.indexOf("Workers’ rights are central");
    const animalsStart = htmlString.indexOf("Brands’ animal welfare policies");
    const overallStart = htmlString.indexOf("Based on all publicly available information");

    const planetSummary = planetStart !== -1 && peopleStart !== -1
        ? htmlString.substring(planetStart, peopleStart)
        : '';
    const peopleSummary = peopleStart !== -1 && animalsStart !== -1
        ? htmlString.substring(peopleStart, animalsStart)
        : '';
    const animalsSummary = animalsStart !== -1 && overallStart !== -1
        ? htmlString.substring(animalsStart, overallStart)
        : '';

    return [planetSummary, peopleSummary, animalsSummary];
};

const AnalysisPage = ({data, goBack}) => {
    let scoreClass = '';
    if (data.overallRating.score_out_of_100 < 20) scoreClass = 'score-low';
    else if (data.overallRating.score_out_of_100 < 40) scoreClass = 'score-medium-low';
    else if (data.overallRating.score_out_of_100 < 60) scoreClass = 'score-medium';
    else if (data.overallRating.score_out_of_100 < 80) scoreClass = 'score-medium-high';
    else scoreClass = 'score-high';

    const summaries = extractSummaries(data.summary);
    const [expanded, setExpanded] = useState([false, false, false]);

    const toggleSummary = (index) => {
        setExpanded((prev) => prev.map((val, i) => (i === index ? !val : val)));
    };

    useEffect(() => {
        if (chrome && chrome.storage && data.overallRating.score_out_of_100 != null) {
        chrome.storage.local.set({ companyScore: data.overallRating.score_out_of_100 }, () => {
            console.log('Company score saved to storage:', data.overallRating.score_out_of_100);
        });
        }
    }, [data.overallRating.score_out_of_100]);

    const lessThan = "<";
    return (
        <div className="analysis-content"> 
            <button className="back-button-overlay" onClick={goBack}>{lessThan}</button>

            <div className={`overall-score-container ${scoreClass}`}>
                <div className="header">{ data.name }</div>
                <div className="overall-score">{ data.overallRating.score_out_of_100 }</div>
                <div className="source">Source: <a className="url" href={`https://directory.goodonyou.eco/brand/${encodeURIComponent(data.name.toLowerCase())}`} target="_blank" rel="noopener noreferrer">Good On You</a></div>
            </div>

            <div className="subscore-container">
                {[0, 1, 2].map((index) => (
                    <div className="section" key={index}>
                        <div className="score-container">
                            <div className="label-container">
                                <img
                                    className="icon"
                                    src={index === 0 ? planetIcon : index === 1 ? peopleIcon : animalsIcon}
                                    alt={index === 0 ? "Planet Icon" : index === 1 ? "People Icon" : "Animals Icon"}
                                />
                                <div className="label">{index === 0 ? 'Planet' : index === 1 ? 'People' : 'Animals'}</div>
                            </div>
                            <div className="score-value">{index === 0 ? data.environment.score_out_of_100 : index === 1 ? data.labour.score_out_of_100 : data.animal.score_out_of_100}</div>
                        </div>

                        <div className="read-more-container" onClick={() => toggleSummary(index)} style={{ cursor: 'pointer' }}>
                            <div className="read-more-row">
                                <div className="read-more-label">{expanded[index] ? 'Show Less' : 'Read More'}</div>
                                <img
                                    className="read-more-icon"
                                    src={dropdownIcon}
                                    alt="Dropdown Icon"
                                    style={{ transform: expanded[index] ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
                                />
                            </div>
                        </div>

                        {expanded[index] && (
                            <div className="summary" dangerouslySetInnerHTML={{ __html: summaries[index] }} />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AnalysisPage;