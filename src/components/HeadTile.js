import React from 'react';
import "./HeadTile.css";

const groupNameMapping = {
    "0": "no priority",
    "1": "low",
    "2": "medium",
    "3": "high",
    "4": "urgent",
    "Backlog": "Backlog",
    "Cancelled": "Cancelled",
    "Done": "Done",
    "In progress": "In progress",
    "Todo": "Todo"
};

export default function HeadTile({ group_name, count }) {
    // Check if the group_name exists in the mapping
    const displayName = groupNameMapping[group_name] || group_name;

    // Extract first and last initials if the group name is not in the mapping
    const userInitials = (groupNameMapping[group_name])?"": group_name
        .split(' ')
        .map(name => name.charAt(0).toUpperCase())
        .join('');

    // Generate a color based on the user's name
    const generateColor = (name) => {
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash); // Hashing function
        }
        const color = `#${((hash >> 24) & 0xFF).toString(16).padStart(2, '0')}${((hash >> 16) & 0xFF).toString(16).padStart(2, '0')}${((hash >> 8) & 0xFF).toString(16).padStart(2, '0')}`; // Generate hex color
        return color;
    };

    const iconColor = generateColor(group_name); // Get the color based on the user's name

    return (
        <div className="head_tile">
            <div className="head_tile_left">
                {/* Replace icon span with SVG based on displayName */}
                {groupNameMapping[group_name] ? (
                    <img src={`${process.env.PUBLIC_URL}/icons_FEtask/${displayName}.svg`} alt={displayName} className="icon" />
                ) : (
                    <div style={{ ...styles.icon, backgroundColor: iconColor }}>
                        {userInitials}
                    </div>
                )}
                <span className="name">{displayName}</span>
                <span className="number">#{count}</span> {/* Modify as needed */}
            </div>
            <div className="head_tile_right">
                <img src={`${process.env.PUBLIC_URL}/icons_FEtask/add.svg`} alt="Display Icon" className="display_icon" />
                <img src={`${process.env.PUBLIC_URL}/icons_FEtask/3 dot menu.svg`} alt="Display Icon" className="display_icon" />
            </div>
        </div>
    );
}

// Add your styles here if needed
const styles = {
    icon: {
        width: '30px', // Example width
        height: '30px', // Example height
        borderRadius: '50%', // Example style for initials
        color: 'white', // Text color
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1em',
        fontWeight: 'bold',
        marginRight:"5px"
    }
};
