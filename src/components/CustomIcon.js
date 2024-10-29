// CustomIcon.js
import React from 'react';

const CustomIcon = ({ name }) => {
    // Split the name to get the first letter of the first and last name
    const nameParts = name.split(' ');
    const initials = nameParts.length > 1
        ? nameParts[0][0] + nameParts[1][0]
        : nameParts[0][0]; // Handle single name case

    return (
        <div style={styles.icon}>
            {initials.toUpperCase()}
        </div>
    );
};

const styles = {
    icon: {
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        backgroundColor: '#007bff', // Customize color
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: '1em',
    },
};

export default CustomIcon;
