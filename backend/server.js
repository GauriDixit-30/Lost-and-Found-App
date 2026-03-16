const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory data storage
let items = [];

// FR1: Add Item
app.post('/items', (req, res) => {
  const { itemId, name, foundBy, date, landmark, location } = req.body;

  // Basic validation
  if (!itemId || !name || !foundBy || !date || !landmark || !location) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const newItem = {
    itemId,
    name,
    foundBy,
    date,
    landmark,
    location
  };

  items.push(newItem);

  res.status(201).json({ message: 'Item added successfully' });
});

// FR2: Get All Items
app.get('/items', (req, res) => {
  res.status(200).json(items);
});

// FR3: Search Item by Name
app.get('/items/:name', (req, res) => {
  const searchName = req.params.name.toLowerCase();
  
  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchName)
  );

  res.status(200).json(filteredItems);
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
