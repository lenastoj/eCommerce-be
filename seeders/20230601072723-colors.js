'use strict';
const faker = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const colors = [];
    const colorPalette = ['red', 'black', 'white'];

    for (let i = 0; i < colorPalette.length; i++) {
      colors.push({
        name: colorPalette[i],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkDelete('colors', null, {});

    await queryInterface.bulkInsert('colors', colors);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('colors', null, {});
  },
};
