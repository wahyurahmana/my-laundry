'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('JenisLaundries', [{
      nama: 'Pakaian Biasa',
      harga: 6000,
      createdAt : new Date(),
      updatedAt : new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('JenisLaundries', null, {});
  }
};
