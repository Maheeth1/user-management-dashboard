const express = require('express');
const cors = require('cors');
const db = require('./database.js'); 
const userRoutes = require('./routes/users.js');
const app = express();
const PORT = process.env.PORT || 8080 
require('dotenv').config();

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- API Routes ---
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.json({ "message": "Ok, the server is running!" });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});