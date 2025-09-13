const express = require('express');
const router = express.Router();
const db = require('../database.js'); 

// --- API Endpoints ---

// GET /api/users: Get All Users
router.get("/", (req, res) => {
    const sql = "SELECT * FROM users";
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ "error": err.message });
        }
        res.status(200).json({ data: rows });
    });
});

// GET /api/users/:id: Get a Single User by ID
router.get("/:id", (req, res) => {
    const sql = "SELECT * FROM users WHERE id = ?";
    db.get(sql, [req.params.id], (err, row) => {
        if (err) {
            return res.status(500).json({ "error": err.message });
        }
        if (!row) {
            // If no user is found, return 404 Not Found
            return res.status(404).json({ "error": "User not found" });
        }
        res.status(200).json({ data: row });
    });
});

// POST /api/users: Create a New User
router.post("/", (req, res) => {
    const { name, email, phone, company, street, city, zipcode, lat, lng } = req.body;
    // Basic validation
    if (!name || !email) {
        return res.status(400).json({ "error": "Name and email are required fields." });
    }

    const sql = `INSERT INTO users (name, email, phone, company, street, city, zipcode, lat, lng) VALUES (?,?,?,?,?,?,?,?,?)`;
    const params = [name, email, phone, company, street, city, zipcode, lat, lng];

    db.run(sql, params, function(err) {
        if (err) {
            return res.status(400).json({ "error": err.message }); // e.g., UNIQUE constraint failed for email
        }
        // Return 201 Created and the ID of the new user
        res.status(201).json({ id: this.lastID });
    });
});

// PUT /api/users/:id: Update an Existing User
router.put("/:id", (req, res) => {
    const { name, email, phone, company, street, city, zipcode, lat, lng } = req.body;
    const sql = `UPDATE users SET
                 name = ?, email = ?, phone = ?, company = ?,
                 street = ?, city = ?, zipcode = ?, lat = ?, lng = ?
                 WHERE id = ?`;
    const params = [name, email, phone, company, street, city, zipcode, lat, lng, req.params.id];

    db.run(sql, params, function(err) {
        if (err) {
            return res.status(400).json({ "error": err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ "error": "User not found" });
        }
        res.status(200).json({ message: "User updated successfully", changes: this.changes });
    });
});

// DELETE /api/users/:id: Delete a User
router.delete("/:id", (req, res) => {
    const sql = 'DELETE FROM users WHERE id = ?';
    db.run(sql, req.params.id, function(err) {
        if (err) {
            return res.status(500).json({ "error": err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ "error": "User not found" });
        }
        res.status(200).json({ "message": "User deleted successfully" });
    });
});


// Export the router so it can be used in server.js
module.exports = router;