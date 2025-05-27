import React from 'react';
import './PopupContainer.css';
import RatingCircle from '../RatingCircle';


const PopupContainer = ({data}) => {

    return (
        <div className="containerStyle"> 
            <h1>{data.name}</h1>

            <div class="overall-score-container">
                <h2>Overall Score:</h2>
                <RatingCircle value={data.overallRating.score_out_of_100} />
            </div>
            <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
                <div class="score-container">
                    <h2>Environment</h2>
                    <RatingCircle value={data.environment.score_out_of_100} />
                </div>
                <div class="score-container">
                    <h2>Labour</h2>
                    <RatingCircle value={data.labour.score_out_of_100} />
                </div>
                <div class="score-container">
                    <h2>Animal</h2>
                    <RatingCircle value={data.animal.score_out_of_100} />
                </div>
            </div>
        </div>
    );
};

export default PopupContainer;