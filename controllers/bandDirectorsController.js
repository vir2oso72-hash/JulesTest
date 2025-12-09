const { BandDirector } = require('../models');

// GET all band directors
exports.getAllBandDirectors = async (req, res) => {
  try {
    const bandDirectors = await BandDirector.findAll();
    res.json(bandDirectors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET a single band director by ID
exports.getBandDirectorById = async (req, res) => {
  try {
    const bandDirector = await BandDirector.findByPk(req.params.id);
    if (bandDirector) {
      res.json(bandDirector);
    } else {
      res.status(404).json({ error: 'BandDirector not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CREATE a new band director
exports.createBandDirector = async (req, res) => {
  try {
    const bandDirector = await BandDirector.create(req.body);
    res.status(201).json(bandDirector);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE a band director
exports.updateBandDirector = async (req, res) => {
  try {
    const [updated] = await BandDirector.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedBandDirector = await BandDirector.findByPk(req.params.id);
      res.status(200).json(updatedBandDirector);
    } else {
      res.status(404).json({ error: 'BandDirector not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE a band director
exports.deleteBandDirector = async (req, res) => {
  try {
    const deleted = await BandDirector.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'BandDirector not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
