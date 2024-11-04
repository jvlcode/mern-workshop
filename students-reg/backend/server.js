// Filename: server.js

const express = require('express');
const app = express();
const PORT = 8000;

// Define the route to get students
app.get('/api/students', (req, res) => {
    const students = [
        { name: "Logesh", email: "logesh@example.com", age: 20 },
        { name: "Alice", email: "alice@example.com", age: 22 },
        { name: "Bob", email: "bob@example.com", age: 21 }
    ];
    return res.json(students); // Send the response as JSON
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
