// App.js
import React, { useState, useEffect } from 'react';
import { GlobalProvider } from './GlobalContext';
import All_list from './components/All_list';
import DropdownTile from './components/DropdownTile';
import './App.css'
function App() {
  const [loading, setLoading] = useState(true);
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment'); // Replace with your API endpoint
        if (response.ok) {
          const data = await response.json();
          setApiData(data);
        }
      } catch (error) {
        console.error('Failed to fetch API data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <GlobalProvider>
        <div className='display_section'>
          <DropdownTile />
        </div>
        <div className='all_list_section'>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <All_list data={apiData} /> // Pass fetched data to All_list
          )}
        </div>
      </GlobalProvider>
    </div>
  );
}

export default App;
