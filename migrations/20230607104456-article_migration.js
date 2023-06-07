'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'articles',
      'userId',
       {
        type: Sequelize.NUMBER,
        allowNull: false,
       }
    )
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'articles',
      'userId',
       {
        type: Sequelize.NUMBER,
        allowNull: false,
       }
    )
  }
};
