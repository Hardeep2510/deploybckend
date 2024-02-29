// server.js
// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(cors());
// app.use(bodyParser.json());

// const items = [];

// app.post('/addItem', (req, res) => {
//     const itemName = req.body.itemName;
//     if (itemName) {
//         items.push(itemName);
//         res.status(201).json({ message: 'Item added successfully' });
//     } else {
//         res.status(400).json({ message: 'Item name is required' });
//     }
// });

// app.get('/getItems', (req, res) => {
//     res.json({ items });
// });

// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });


server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Add your Wi-Fi network's IP address to the whitelist
const allowedIP = '192.168.1.108'; // Replace with your Wi-Fi network's IP address

app.use(cors());
app.use(bodyParser.json());

const items = [];

app.use((req, res, next) => {
    // Check if the request comes from the allowed IP address
    const clientIP = req.connection.remoteAddress;
    if (clientIP === allowedIP) {
        next(); // Continue processing the request
    } else {
        res.status(403).json({ message: 'Forbidden. Access allowed only from the specified Wi-Fi network.' });
    }
});

app.post('/addItem', (req, res) => {
    const itemName = req.body.itemName;
    console.log('Received item name:', itemName);

    if (itemName) {
        items.push(itemName);
        console.log('Items array after adding:', items);
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
