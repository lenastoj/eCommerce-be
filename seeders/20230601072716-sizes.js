'use strict';
const faker = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const sizes = [];

    for (let i = 36; i < 51; i++) {
      sizes.push({
        sizeShoe: i,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkDelete('sizes', null, {});
    await queryInterface.bulkInsert('sizes', sizes);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('sizes', null, {});
  },
};
