import { useEffect, useState } from 'react'
import axios from 'axios';
import './App.css'

function App() {

  const [data, setData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get('http://localhost:3000/')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        setError(error.message);
      });
  }, []);

  return (
    <>
      <h1>Hello who?</h1>
      <p>Test call to API:</p>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </>
  )
}

export default App
