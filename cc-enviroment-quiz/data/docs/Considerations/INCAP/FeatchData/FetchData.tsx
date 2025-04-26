import React, { useEffect, useState } from 'react';

interface Data {
  // Define the structure of the data you expect from the API
  id: number;
  name: string;
  // Add other fields as necessary
}

const App: React.FC = () => {
  const [data, setData] = useState<Data[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/data'); // Adjust the endpoint as needed
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result: Data[] = await response.json();
      setData(result);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array means this runs once when the component mounts

  return (
    <div>
      <h1>Data Fetch Example</h1>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;