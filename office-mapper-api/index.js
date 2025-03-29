import express from 'express';
import cors from 'cors';
import * as db from './db.js';

const app = express()
const port = 3000

app.use(cors()); // Enables CORS for all routes

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/maps', (req, res) => {
  const newMap = {
    name: req.query.name || 'Untitled Map',
    description: req.query.description || 'No description provided'
  };

  db.createMap(newMap.name, newMap.description) // Insert the new map into the database
    .then(() => {
      console.log('Creating new map:', newMap);
      res.status(201).json(newMap);
      console.log('Map created successfully.');    
    })
    .catch(err => {
      console.error('Error creating map:', err);
      return res.status(500).json({ message: 'Error creating map.' });
    });

})

app.get('/maps', (req, res) => {
  db.getAllMaps() // Fetch all maps from the database
    .then(maps => {
      if (maps.length === 0) {
        console.log('No maps found.');
        return res.status(404).json({ message: 'No maps found.' });
      }
      console.log('Maps retrieved successfully:', maps);
      res.status(200).json(maps); 
    })
    .catch(err => {
      console.error('Error retrieving maps:', err);
      return res.status(500).json({ message: 'Error retrieving maps.' });
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

