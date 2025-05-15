import React from 'react';
import './PopupContainer.css';
import RatingCircle from './RatingCircle';


const PopupContainer = ({website_name, avg_rating}) => {

    return (
        <div className="containerStyle">
            {website_name}
            <RatingCircle value={avg_rating} />
        </div>
    );
};

export default PopupContainer;