// Filename: server.js

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 8000;

// Middleware to parse JSON bodies
app.use(express.json()); // Allows Express to parse JSON requests

// MongoDB connection string
const mongoURI = 'mongodb://localhost:27017/students-reg'; // Update with your MongoDB URI

// Connect to MongoDB
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define a Student model
const studentSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number
});

const Student = mongoose.model('Student', studentSchema);

// Define the route to get students
app.get('/api/students',  async(req, res) => {
    try {
        const students = await Student.find(); // Fetch all students from the database
        return res.json(students); // Send the response as JSON
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
});

app.post('/api/students', async (req, res) => {
    const { name, email, age } = req.body; // Destructure the request body

    try {
        const newStudent = new Student({ name, email, age }); // Create a new student instance
        await newStudent.save(); // Save the student to the database
        return res.status(201).json(newStudent); // Respond with the created student
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
   
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});