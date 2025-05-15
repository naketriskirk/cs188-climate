import React from 'react';
import './PopupContainer.css';
import RatingCircle from './RatingCircle';


const PopupContainer = ({website_name, avg_rating}) => {

    return (
        <div className="containerStyle">
            <h1> {website_name} </h1>
            <RatingCircle value={avg_rating} />
            <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
                <div>
                    <h2>Planet</h2>
                    <RatingCircle value={1} />
                </div>
                <div>
                    <h2>People</h2>
                    <RatingCircle value={2} />
                </div>
                <div>
                    <h2>Animals</h2>
                    <RatingCircle value={3} />
                </div>
            </div>
        </div>
    );
};

export default PopupContainer;