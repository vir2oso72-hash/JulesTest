const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const studentsController = require('../../controllers/studentsController');

// GET all students
router.get('/', auth('Band Director'), studentsController.getAllStudents);

// GET a single student by ID
router.get('/:id', auth('Band Director'), studentsController.getStudentById);

// CREATE a new student
router.post('/', auth('Band Director'), studentsController.createStudent);

// UPDATE a student
router.put('/:id', auth('Band Director'), studentsController.updateStudent);

// DELETE a student
router.delete('/:id', auth('Band Director'), studentsController.deleteStudent);

module.exports = router;
