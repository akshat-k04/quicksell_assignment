import React, { useContext } from 'react';
import List from './List';
import { GlobalContext } from '../GlobalContext';
import './All_list.css';

export default function All_list({ data }) {
    const { groupBy, orderBy } = useContext(GlobalContext);

    // Group tickets based on the groupBy key
    const groupedTickets = data.tickets.reduce((acc, ticket) => {
        let key;
        if (groupBy === 'user') {
            key = ticket.userId; // Group by userId
        } else if (groupBy === 'priority') {
            key = ticket.priority; // Group by priority
        } else if (groupBy === 'status') {
            key = ticket.status; // Group by status
        }

        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(ticket);
        return acc;
    }, {});

    // Sort tickets within each group based on the orderBy value
    Object.keys(groupedTickets).forEach(groupKey => {
        groupedTickets[groupKey].sort((a, b) => {
            let valueA, valueB;
            if (orderBy === 'user') {
                valueA = a.userId;
                valueB = b.userId;
            } else if (orderBy === 'title') {
                valueA = a.title.toLowerCase(); // Use lowercase for case-insensitive comparison
                valueB = b.title.toLowerCase();
            } else if (orderBy === 'priority') {
                valueB = a.priority;
                valueA = b.priority;
            }

            // Compare values for sorting
            if (valueA < valueB) return -1;
            if (valueA > valueB) return 1;
            return 0; // Equal values
        });
    });

    return (
        <div className="all_list_container">
            {/* Render the grouped lists */}
            {Object.keys(groupedTickets).map(groupKey => (
                <List
                    key={groupKey}
                    tickets={groupedTickets[groupKey]}
                    groupKey={groupKey}
                    groupBy={groupBy}
                    users={data.users}
                />
            ))}
        </div>
    );
}
