// backend/database.js

const sqlite3 = require('sqlite3').verbose();
const DBSOURCE = process.env.DBSOURCE || "users.db";

// Connect to (and create if it doesn't exist) the SQLite database file
const db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message);
      throw err;
    } else {
        console.log('Connected to the SQLite database.');
        // SQL statement to create the 'users' table
        const sql = `
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE,
                phone TEXT,
                company TEXT,
                street TEXT,
                city TEXT,
                zipcode TEXT,
                lat TEXT,
                lng TEXT
            )`;
            
        // Run the SQL statement
        db.run(sql, (err) => {
            if (err) {
                // Table already created or an error occurred
                console.error("Error creating table:", err.message);
            } else {
                console.log('Users table created or already exists.');
            }
        });
    }
});

// Export the database connection for use in other files
module.exports = db;