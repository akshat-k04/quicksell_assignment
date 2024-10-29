import React from 'react';

export default function Tile({ ticket, users }) {
    // Find the user associated with the ticket
    const user = users.find(user => user.id === ticket.userId);

    // Extract first and last initials
    const userInitials = user.name
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

    const iconColor = generateColor(user.name); // Get the color based on the user's name

    // Function to check if the SVG icon exists
    const getStatusIcon = (status) => {
        const iconPath = `${process.env.PUBLIC_URL}/icons_FEtask/${status}.svg`;
        // If you are not using an image loader, you may just return the path.
        // In case the icon does not exist, return a default ring icon.
        return <img src={iconPath} alt={status} style={styles.iconRing} onError={(e) => { e.target.onerror = null; e.target.src = `${process.env.PUBLIC_URL}/icons_FEtask/default.svg`; }} />;
    };

    return (
        <div style={styles.tile}>
            {/* Header with class name and custom icon */}
            <div style={styles.header}>
                <span style={styles.className}>{ticket.id}</span>
                <div style={{ ...styles.icon, backgroundColor: iconColor }}>
                    {userInitials}
                </div>
            </div>

            {/* Title with status icon */}
            <div style={styles.title} title={ticket.title}>
                {getStatusIcon(ticket.status)} {/* Render status icon or ring */}
                {ticket.title.slice(0, 35)} {(ticket.title.length <= 35) ? "" : "..."}
            </div>

            <div style={styles.categoryRow}>
                {/* Render tags as small tiles */}
                <div style={styles.tagsContainer}>
                    {/* Conditionally render the high-priority icon based on ticket priority */}
                    {ticket.priority >= 4 && (
                        <span style={{
                            height: "27px",
                            width: "27px",
                            marginRight: "10px",
                            display: 'flex',
                            alignItems: 'center', // Vertically center the icon
                            justifyContent: 'center', // Horizontally center the icon
                            border: '2px solid lightgrey', // Add light grey border
                            borderRadius: "5px",
                            paddingLeft:"4px",
                            boxSizing: 'border-box' // Ensures padding is included in total height/width
                        }}>
                            {getStatusIcon("v_high_grey")}
                        </span>
                    )}


                    {/* Render tags */}
                    {ticket.tag.map((tag, index) => (
                        <div key={index} style={styles.tagTile}>
                            <span style={{ ...styles.icon, backgroundColor: "lightgrey", height: "10px", width: "10px" }} />
                            <span style={styles.tagText}>{tag}</span>
                        </div>
                    ))}
                </div>
            </div>


        </div>
    );
}

const styles = {
    tile: {
        borderRadius: '8px',
        border: '1px solid lightgrey',
        padding: '16px',
        width: '100%',
        boxSizing: 'border-box',
        marginBottom: '16px',
        backgroundColor: 'white',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Add shadow
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '8px',
    },
    className: {
        color: 'grey',
    },
    icon: {
        width: '30px', // Set desired width
        height: '30px', // Set desired height
        borderRadius: '50%', // Circular shape
        color: 'white', // Text color
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1em',
        fontWeight: 'bold',
    },
    iconRing: {
        width: '17px',
        height: '17px',
        borderRadius: '50%', // Circular shape
        // border: '2px solid lightgrey', // Light grey border
        display: 'inline-block', // To align next to text
        marginRight: '5px', // Spacing between icon and title
        verticalAlign: 'middle', // Aligns with the text
    },
    title: {
        color: 'black',
        fontSize: '1em',
        fontWeight: 'bold',
        marginBottom: '8px',
        textOverflow: 'ellipsis',
        display: 'flex',
        alignItems: 'center', // Center align items vertically
    },
    categoryRow: {
        display: 'flex',
        alignItems: 'center',
    },
    tagsContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        marginLeft: '4px',
    },
    tagTile: {
        display: 'flex', // Use flex to arrange items in a row
        alignItems: 'center', // Center items vertically
        backgroundColor: '#FFFFFF',
        borderRadius: '4px',
        border: '1px solid #eeeeee',
        padding: '4px 8px',
        fontSize: '0.9em',
        color: 'grey',
        margin: '0 4px 4px 0', // Add margin for spacing
    },
    tagText: {
        marginLeft: '4px', // Add some space between the icon and text
    },
};
