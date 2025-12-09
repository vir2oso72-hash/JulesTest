const { School, BandDirector } = require('../models');
const { Op } = require('sequelize');

// GET all schools
exports.getAllSchools = async (req, res) => {
  try {
    const bandDirector = await BandDirector.findOne({ where: { UserId: req.user.id }, include: School });
    if (!bandDirector) {
      return res.status(404).json({ error: 'BandDirector not found for the current user' });
    }
    res.json(bandDirector.Schools);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET a single school by ID
exports.getSchoolById = async (req, res) => {
  try {
    const bandDirector = await BandDirector.findOne({ where: { UserId: req.user.id }, include: School });
    if (!bandDirector) {
      return res.status(404).json({ error: 'BandDirector not found for the current user' });
    }
    const school = bandDirector.Schools.find(school => school.id == req.params.id);
    if (school) {
      res.json(school);
    } else {
      res.status(404).json({ error: 'School not found or not associated with this director' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CREATE a new school
exports.createSchool = async (req, res) => {
  try {
    const bandDirector = await BandDirector.findOne({ where: { UserId: req.user.id } });
    if (!bandDirector) {
      return res.status(404).json({ error: 'BandDirector profile does not exist for the current user. Cannot create school.' });
    }
    const school = await School.create(req.body);
    await bandDirector.addSchool(school);
    res.status(201).json(school);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE a school
exports.updateSchool = async (req, res) => {
  try {
    const bandDirector = await BandDirector.findOne({ where: { UserId: req.user.id }, include: School });
    if (!bandDirector) {
      return res.status(404).json({ error: 'BandDirector not found for the current user' });
    }
    const schoolIds = bandDirector.Schools.map(school => school.id);

    if (!schoolIds.includes(parseInt(req.params.id))) {
        return res.status(403).json({ error: 'Forbidden: You are not authorized to update this school' });
    }

    const [updated] = await School.update(req.body, {
        where: {
            id: req.params.id
        }
    });

    if (updated) {
      const updatedSchool = await School.findByPk(req.params.id);
      res.status(200).json(updatedSchool);
    } else {
      res.status(404).json({ error: 'School not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE a school
exports.deleteSchool = async (req, res) => {
  try {
    const bandDirector = await BandDirector.findOne({ where: { UserId: req.user.id }, include: School });
    if (!bandDirector) {
      return res.status(404).json({ error: 'BandDirector not found for the current user' });
    }
    const schoolIds = bandDirector.Schools.map(school => school.id);

    if (!schoolIds.includes(parseInt(req.params.id))) {
        return res.status(403).json({ error: 'Forbidden: You are not authorized to delete this school' });
    }

    const deleted = await School.destroy({
        where: {
            id: req.params.id
        }
    });

    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'School not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
