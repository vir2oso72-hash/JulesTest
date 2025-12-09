'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BandDirector extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      BandDirector.belongsToMany(models.School, { through: 'SchoolBandDirectors' });
      BandDirector.belongsTo(models.User);
    }
  }
  BandDirector.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    officePhoneNumber: DataTypes.STRING,
    mobilePhoneNumber: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'BandDirector',
  });
  return BandDirector;
};
