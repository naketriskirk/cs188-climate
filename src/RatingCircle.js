import React from 'react';

const getColor = (value) => {
    if (value >= 80) return '#4caf50';      // Green
    if (value >= 50) return '#ffeb3b';      // Yellow
    if (value >= 0)  return '#f44336';      // Red
    return '#ccc';                          // Default gray
};

const RatingCircle = ({ value }) => {
    const bgColor = getColor(value);

    const style = {
        width: 60,
        height: 60,
        borderRadius: '50%',
        background: bgColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 24,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        userSelect: 'none'
    };

    return (
        <div style={style}>
            {value}
        </div>
    );
};

export default RatingCircle;