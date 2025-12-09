const { Instrument } = require('../models');

// GET all instruments
exports.getAllInstruments = async (req, res) => {
  try {
    const instruments = await Instrument.findAll();
    res.json(instruments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET a single instrument by ID
exports.getInstrumentById = async (req, res) => {
  try {
    const instrument = await Instrument.findByPk(req.params.id);
    if (instrument) {
      res.json(instrument);
    } else {
      res.status(404).json({ error: 'Instrument not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CREATE a new instrument
exports.createInstrument = async (req, res) => {
  try {
    const instrument = await Instrument.create(req.body);
    res.status(201).json(instrument);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE an instrument
exports.updateInstrument = async (req, res) => {
  try {
    const [updated] = await Instrument.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedInstrument = await Instrument.findByPk(req.params.id);
      res.status(200).json(updatedInstrument);
    } else {
      res.status(404).json({ error: 'Instrument not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE an instrument
exports.deleteInstrument = async (req, res) => {
  try {
    const deleted = await Instrument.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Instrument not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
