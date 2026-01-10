const { Student, BandDirector, School } = require('../models');
const { Op } = require('sequelize');

// GET all students
exports.getAllStudents = async (req, res) => {
  try {
    const bandDirector = await BandDirector.findOne({ where: { UserId: req.user.id }, include: School });
    if (!bandDirector) {
      return res.status(404).json({ error: 'BandDirector not found for the current user' });
    }
    const schoolIds = bandDirector.Schools.map(school => school.id);
    const students = await Student.findAll({ where: { SchoolId: schoolIds } });
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET a single student by ID
exports.getStudentById = async (req, res) => {
  try {
    const bandDirector = await BandDirector.findOne({ where: { UserId: req.user.id }, include: School });
    if (!bandDirector) {
      return res.status(404).json({ error: 'BandDirector not found for the current user' });
    }
    const schoolIds = bandDirector.Schools.map(school => school.id);
    const student = await Student.findOne({ where: { id: req.params.id, SchoolId: schoolIds } });
    if (student) {
      res.json(student);
    } else {
      res.status(404).json({ error: 'Student not found or not in an authorized school' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CREATE a new student
exports.createStudent = async (req, res) => {
  try {
    const { SchoolId } = req.body;
    const bandDirector = await BandDirector.findOne({ where: { UserId: req.user.id }, include: School });

    if (!bandDirector) {
      return res.status(404).json({ error: 'BandDirector not found for the current user' });
    }

    const authorizedSchoolIds = bandDirector.Schools.map(school => school.id);
    if (!authorizedSchoolIds.includes(SchoolId)) {
      return res.status(403).json({ error: 'Forbidden: You are not authorized to create students for this school' });
    }

    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE a student
exports.updateStudent = async (req, res) => {
  try {
    const bandDirector = await BandDirector.findOne({ where: { UserId: req.user.id }, include: School });
    if (!bandDirector) {
      return res.status(404).json({ error: 'BandDirector not found for the current user' });
    }
    const schoolIds = bandDirector.Schools.map(school => school.id);

    const [updated] = await Student.update(req.body, {
      where: {
        id: req.params.id,
        SchoolId: {
          [Op.in]: schoolIds
        }
      }
    });

    if (updated) {
      const updatedStudent = await Student.findByPk(req.params.id);
      res.status(200).json(updatedStudent);
    } else {
      res.status(404).json({ error: 'Student not found or not in an authorized school' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE a student
exports.deleteStudent = async (req, res) => {
  try {
    const bandDirector = await BandDirector.findOne({ where: { UserId: req.user.id }, include: School });
    if (!bandDirector) {
      return res.status(404).json({ error: 'BandDirector not found for the current user' });
    }
    const schoolIds = bandDirector.Schools.map(school => school.id);

    const deleted = await Student.destroy({
        where: {
            id: req.params.id,
            SchoolId: {
                [Op.in]: schoolIds
            }
        }
    });

    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Student not found or not in an authorized school' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
