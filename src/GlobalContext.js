// GlobalContext.js
import React, { createContext, useState, useEffect } from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [groupBy, setGroupBy] = useState(localStorage.getItem('groupBy') || 'user');
    const [orderBy, setOrderBy] = useState(localStorage.getItem('orderBy') || 'priority');
    const [apiData, setApiData] = useState(null);

    useEffect(() => {
        localStorage.setItem('groupBy', groupBy);
    }, [groupBy]);

    useEffect(() => {
        localStorage.setItem('orderBy', orderBy);
    }, [orderBy]);

    return (
        <GlobalContext.Provider value={{ groupBy, setGroupBy, orderBy, setOrderBy, apiData, setApiData }}>
            {children}
        </GlobalContext.Provider>
    );
};
