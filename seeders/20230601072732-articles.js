'use strict';
const faker = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const articles = [];

    for (let i = 0; i < 35; i++) {
      articles.push({
        name: faker.faker.commerce.productName(),
        description:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        imageUrl:
          'https://www.brooksrunning.com/dw/image/v2/BGPF_PRD/on/demandware.static/-/Sites-brooks-master-catalog/default/dw9e60f86d/original/120377/120377-426-l-hyperion-max-womens-fastest-running-shoe.png?sw=1388&sh=868&sm=cut',
        price: faker.faker.finance.amount(19.99, 100),
        inStock: faker.faker.datatype.boolean(),
        gender: faker.faker.helpers.arrayElement(['man', 'woman']),
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkDelete('articles', null, {});

    await queryInterface.bulkInsert('articles', articles);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('articles', null, {});
  },
};