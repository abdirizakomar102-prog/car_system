const db = require('../config/db');

exports.getAllCars = async (req, res) => {
    try {
        const [cars] = await db.query('SELECT * FROM cars');
        res.json(cars);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching cars', error: err.message });
    }
};

exports.getCarById = async (req, res) => {
    try {
        const [cars] = await db.query('SELECT * FROM cars WHERE id = ?', [req.params.id]);
        if (cars.length === 0) return res.status(404).json({ message: 'Car not found' });
        res.json(cars[0]);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching car', error: err.message });
    }
};

exports.addCar = async (req, res) => {
    try {
        console.log('Adding car with data:', req.body);
        const { brand, model, year, price, description, image } = req.body;

        const [result] = await db.query(
            'INSERT INTO cars (brand, model, year, price, description, image) VALUES (?, ?, ?, ?, ?, ?)',
            [brand, model, year, price, description, image]
        );

        res.status(201).json({ message: 'Car added successfully', carId: result.insertId });
    } catch (err) {
        res.status(500).json({ message: 'Error adding car', error: err.message });
    }
};

exports.updateCar = async (req, res) => {
    try {
        const { brand, model, year, price, description, image } = req.body;

        let query = 'UPDATE cars SET brand = ?, model = ?, year = ?, price = ?, description = ?, image = ? WHERE id = ?';
        let params = [brand, model, year, price, description, image, req.params.id];

        await db.query(query, params);
        res.json({ message: 'Car updated successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error updating car', error: err.message });
    }
};

exports.deleteCar = async (req, res) => {
    try {
        await db.query('DELETE FROM cars WHERE id = ?', [req.params.id]);
        res.json({ message: 'Car deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting car', error: err.message });
    }
};
