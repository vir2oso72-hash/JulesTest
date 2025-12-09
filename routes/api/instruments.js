const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const instrumentsController = require('../../controllers/instrumentsController');

// GET all instruments
router.get('/', auth('Band Director'), instrumentsController.getAllInstruments);

// GET a single instrument by ID
router.get('/:id', auth('Band Director'), instrumentsController.getInstrumentById);

// CREATE a new instrument
router.post('/', auth('Band Director'), instrumentsController.createInstrument);

// UPDATE an instrument
router.put('/:id', auth('Band Director'), instrumentsController.updateInstrument);

// DELETE an instrument
router.delete('/:id', auth('Band Director'), instrumentsController.deleteInstrument);

module.exports = router;
