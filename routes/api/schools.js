const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const schoolsController = require('../../controllers/schoolsController');

// GET all schools
router.get('/', auth('Band Director'), schoolsController.getAllSchools);

// GET a single school by ID
router.get('/:id', auth('Band Director'), schoolsController.getSchoolById);

// CREATE a new school
router.post('/', auth('Band Director'), schoolsController.createSchool);

// UPDATE a school
router.put('/:id', auth('Band Director'), schoolsController.updateSchool);

// DELETE a school
router.delete('/:id', auth('Band Director'), schoolsController.deleteSchool);

module.exports = router;
