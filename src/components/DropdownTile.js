import React, { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../GlobalContext'; // Import the GlobalContext
import './DropdownTile.css';

const DropdownTile = () => {
    const { setGroupBy, setOrderBy, groupBy, orderBy } = useContext(GlobalContext); // Get context values
    const [isOpen, setIsOpen] = useState(false);

    // Load saved values from local storage on component mount
    useEffect(() => {
        const savedGroupBy = localStorage.getItem('groupBy') || "user";
        const savedOrderBy = localStorage.getItem('orderBy') || "priority";

        setGroupBy(savedGroupBy); // Set context value
        setOrderBy(savedOrderBy); // Set context value
    }, [setGroupBy, setOrderBy]);

    // Toggle the dropdown visibility
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    // Handle "Group by" selection change
    const handleGroupByChange = (e) => {
        const selectedGroupBy = e.target.value;
        setGroupBy(selectedGroupBy); // Set context value
        localStorage.setItem('groupBy', selectedGroupBy); // Save to local storage
    };

    // Handle "Order by" selection change
    const handleOrderByChange = (e) => {
        const selectedOrderBy = e.target.value;
        setOrderBy(selectedOrderBy); // Set context value
        localStorage.setItem('orderBy', selectedOrderBy); // Save to local storage
    };

    return (
        <div className="dropdown_container">
            <div className="tile" onClick={toggleDropdown}>
                <img src={`${process.env.PUBLIC_URL}/icons_FEtask/Display.svg`} alt="Display Icon" className="display_icon" />
                <span className="tile_text">Display</span>
                <img src={`${process.env.PUBLIC_URL}/icons_FEtask/down.svg`} alt="Down Arrow Icon" className="arrow_icon" />
            </div>
            {isOpen && (
                <div className="dropdown_box">
                    <div className="dropdown_row">
                        <span className="label">Group by</span>
                        <select
                            className="inner_dropdown"
                            value={groupBy}  // Set the value to the context value
                            onChange={handleGroupByChange}
                        >
                            <option value="user">user</option>
                            <option value="priority">priority</option>
                            <option value="status">status</option>
                        </select>
                    </div>
                    <div className="dropdown_row">
                        <span className="label">Order by</span>
                        <select
                            className="inner_dropdown"
                            value={orderBy} // Set the value to the context value
                            onChange={handleOrderByChange}
                        >
                            <option value="user">user</option>
                            <option value="title">title</option>
                            <option value="priority">priority</option>
                        </select>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DropdownTile;
