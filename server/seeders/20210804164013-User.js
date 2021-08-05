'use strict';
const { hashPassword } = require('../helpers/bcrypt')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Users',
      [
        {
          username: 'HR',
          email: 'adminhr@mail.com',
          password: hashPassword("adminhr"),
          roles: "hr",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          username: 'Fitri',
          email: 'fitri@mail.com',
          password: hashPassword("fitri"),
          roles: "vendor",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          username: 'Hanafi',
          email: 'hanafi@mail.com',
          password: hashPassword("hanafi"),
          roles: "vendor",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          username: 'Nike',
          email: 'nike@mail.com',
          password: hashPassword("nike"),
          roles: "vendor",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
