import React from 'react';
import Tile from './Tile';
import './List.css';
import HeadTile from './HeadTile';

export default function List({ tickets, users, groupBy }) {
    // Function to get the name of the user based on the userId in the ticket
    const get_name = (ticket) => {
        // Find the user corresponding to the ticket's userId
        const user = users.find(user => user.id === ticket.userId);
        return user ? user.name : 'Unknown User'; // Return the user's name or a default if not found
    };

    // Get the group name from the first ticket using the groupBy key
    const groupName = tickets.length > 0 ? (groupBy !== "user" ? tickets[0][groupBy] : get_name(tickets[0])) : '';

    return (
        <div className="list_container">
            {/* Pass the group name to HeadTile */}
            <HeadTile group_name={groupName} count={tickets.length} />
            {tickets.map(ticket => (
                <Tile key={ticket.id} ticket={ticket} users={users} />
            ))}
        </div>
    );
}
