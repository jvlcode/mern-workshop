const express = require('express');
const Student = require('../models/Student');

const router = express.Router();

// Register a student
router.post('/', async (req, res) => {
  const { name, email, age } = req.body;
  try {
    const newStudent = new Student({ name, email, age });
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
