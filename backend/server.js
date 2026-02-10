const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes (Importing)
const authRoutes = require('./routes/auth');
const carRoutes = require('./routes/cars');
    
// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);
// Base route
app.get('/', (req, res) => {
    res.send('Car Buying System API is running...');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
