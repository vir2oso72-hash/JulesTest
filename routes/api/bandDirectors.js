const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const bandDirectorsController = require('../../controllers/bandDirectorsController');

// GET all band directors
router.get('/', auth('Band Director'), bandDirectorsController.getAllBandDirectors);

// GET a single band director by ID
router.get('/:id', auth('Band Director'), bandDirectorsController.getBandDirectorById);

// CREATE a new band director
router.post('/', auth('Band Director'), bandDirectorsController.createBandDirector);

// UPDATE a band director
router.put('/:id', auth('Band Director'), bandDirectorsController.updateBandDirector);

// DELETE a band director
router.delete('/:id', auth('Band Director'), bandDirectorsController.deleteBandDirector);

module.exports = router;
