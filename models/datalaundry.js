'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DataLaundry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DataLaundry.belongsTo(models.User, {foreignKey : 'user_id'})
      DataLaundry.belongsTo(models.JenisLaundry, {foreignKey : 'jenis_laundry_id'})

    }
  }
  DataLaundry.init({
    user_id: DataTypes.INTEGER,
    jenis_laundry_id: DataTypes.INTEGER,
    berat: DataTypes.INTEGER,
    tgl_pengantaran: DataTypes.DATE,
    tgl_pengambilan: DataTypes.DATE,
    total: DataTypes.INTEGER,
    status: DataTypes.STRING,
    keterangan: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'DataLaundry',
  });
  return DataLaundry;
};