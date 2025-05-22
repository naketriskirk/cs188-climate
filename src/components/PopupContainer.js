import React from 'react';
import './PopupContainer.css';
import RatingCircle from '../RatingCircle';


const PopupContainer = ({company_name, avg_rating, transparency, environment, social, governance}) => {

    return (
        <div className="containerStyle"> 
            <h1>{company_name}</h1>

            <div class="overall-score-container">
                <h2>Overall Score:</h2>
                <RatingCircle value={avg_rating} />
            </div>
            <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
                <div class="score-container">
                    <h2>Transparency</h2>
                    <RatingCircle value={transparency} />
                </div>
                <div class="score-container">
                    <h2>Environment</h2>
                    <RatingCircle value={environment} />
                </div>
                <div class="score-container">
                    <h2>Social</h2>
                    <RatingCircle value={social} />
                </div>
                <div class="score-container">
                    <h2>Governance</h2>
                    <RatingCircle value={governance} />
                </div>
            </div>
        </div>
    );
};

export default PopupContainer;