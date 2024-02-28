// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const items = [];

app.post('/addItem', (req, res) => {
    const itemName = req.body.itemName;
    if (itemName) {
        items.push(itemName);
        res.status(201).json({ message: 'Item added successfully' });
    } else {
        res.status(400).json({ message: 'Item name is required' });
    }
});

app.get('/getItems', (req, res) => {
    res.json({ items });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
