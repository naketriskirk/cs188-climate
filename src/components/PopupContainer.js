import React from 'react';
import './PopupContainer.css';
import RatingCircle from '../RatingCircle';


const PopupContainer = ({data}) => {
    let scoreClass = '';
    if (data.overallRating.score_out_of_100 < 20) scoreClass = 'score-low';
    else if (data.overallRating.score_out_of_100 < 40) scoreClass = 'score-medium-low';
    else if (data.overallRating.score_out_of_100 < 60) scoreClass = 'score-medium';
    else if (data.overallRating.score_out_of_100 < 80) scoreClass = 'score-medium-high';
    else scoreClass = 'score-high';

    return (

        <div className="containerStyle"> 
            <div className={`overall-score-container ${scoreClass}`}>
                <h1 className = "header">{data.name}</h1>
                <h2 style={{ fontSize: '34px' }}> {data.overallRating.score_out_of_100}</h2>
            </div>
            <div className = "subscore-container">
                <div class="score-container" >
                    <h2 className= "subheader">Environment</h2>
                    <h2 className="score-value"> {data.environment.score_out_of_100}</h2>

                </div>
                <h2 className = "subheader">Read More</h2>

                <div class="score-container">
                    <h2 className= "subheader">Labor</h2>
                    <h2 className="score-value"> {data.labour.score_out_of_100}</h2>
                </div>
                <h2 className = "subheader">Read More</h2>

                <div class="score-container">
                    <h2 className= "subheader">Animals</h2>
                    <h2 className="score-value"> {data.animal.score_out_of_100}</h2>
                </div>
                <h2 className = "subheader">Read More</h2>
            </div>
        </div>
    );
};

export default PopupContainer;