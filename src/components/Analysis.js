import './Analysis.css';
import planetIcon from '../assets/planet_icon.svg';
import peopleIcon from '../assets/people_icon.svg';
import animalsIcon from '../assets/animals_icon.svg';
import dropdownIcon from '../assets/dropdown_icon.svg';
import { useState } from 'react';


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

const AnalysisPage = ({data}) => {
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

    return (
        <div class="analysis-content"> 
            <div class={`overall-score-container ${scoreClass}`}>
                <div class="header">{ data.name }</div>
                <div class="overall-score">{ data.overallRating.score_out_of_100 }</div>
                <div class="source">Source: <a class="url" href={`https://directory.goodonyou.eco/brand/${encodeURIComponent(data.name.toLowerCase())}`} target="_blank" rel="noopener noreferrer">Good On You</a></div>
            </div>

            <div class="subscore-container">
                {[0, 1, 2].map((index) => (
                    <div class="section" key={index}>
                        <div class="score-container">
                            <div class="label-container">
                                <img
                                    class="icon"
                                    src={index === 0 ? planetIcon : index === 1 ? peopleIcon : animalsIcon}
                                    alt={index === 0 ? "Planet Icon" : index === 1 ? "People Icon" : "Animals Icon"}
                                />
                                <div class="label">{index === 0 ? 'Planet' : index === 1 ? 'People' : 'Animals'}</div>
                            </div>
                            <div class="score-value">{index === 0 ? data.environment.score_out_of_100 : index === 1 ? data.labour.score_out_of_100 : data.animal.score_out_of_100}</div>
                        </div>

                        <div class="read-more-container" onClick={() => toggleSummary(index)} style={{ cursor: 'pointer' }}>
                            <div class="read-more-row">
                                <div class="read-more-label">{expanded[index] ? 'Show Less' : 'Read More'}</div>
                                <img
                                    class="read-more-icon"
                                    src={dropdownIcon}
                                    alt="Dropdown Icon"
                                    style={{ transform: expanded[index] ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
                                />
                            </div>
                        </div>

                        {expanded[index] && (
                            <div class="summary" dangerouslySetInnerHTML={{ __html: summaries[index] }} />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AnalysisPage;