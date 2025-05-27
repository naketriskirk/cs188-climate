import React from 'react';
import './PopupContainer.css';
import RatingCircle from '../RatingCircle';


const PopupContainer = ({company_name, avg_rating, transparency, environment, social, governance}) => {

    return (
        <div className="containerStyle"> 

            <div class="overall-score-container">
                <h1>{data.name}</h1>
                <h2 className='header'>Overall Score:</h2>
                <RatingCircle value={data.overallRating.score_out_of_100}/>
            </div>
            <div className="subscore-container">
                <div class="score-container">
                    <h2 className='subheader'>Environment</h2>
                    <RatingCircle value={data.environment.score_out_of_100} />
                </div>
                <div class="score-container">
                    <h2 className='subheader'>Labour</h2>
                    <RatingCircle value={data.labour.score_out_of_100} />
                </div>
                <div class="score-container">
                    <h2 className='subheader'>Animal</h2>
                    <RatingCircle value={data.animal.score_out_of_100} />
                </div>
            </div>
        </div>
    );
};

export default PopupContainer;