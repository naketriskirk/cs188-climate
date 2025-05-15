import React from 'react';
import './PopupContainer.css';


const PopupContainer = ({website_name}) => {

    return (
        <div className="containerStyle">
            {website_name}
        </div>
    );
};

export default PopupContainer;