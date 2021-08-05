'use strict';

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

     await queryInterface.bulkInsert('Events',
     [
      {
        id: 1,
        name: "Vaccine For Senior Citizen",
        date1: "2021-09-19T00:00:00.000Z",
        date2: "2021-09-21T00:00:00.000Z",
        date3: "2021-09-29T00:00:00.000Z",
        location: "Jakarta",
        eventStatus: "Pending",
        createdAt: "2021-08-05T07:50:31.681Z",
        updatedAt: "2021-08-05T07:50:31.681Z"
    },
    {
        id: 2,
        name: "Vaccine For Genaral Citizen",
        date1: "2021-09-20T00:00:00.000Z",
        date2: "2021-09-22T00:00:00.000Z",
        date3: "2021-09-28T00:00:00.000Z",
        location: "Jakarta",
        eventStatus: "Pending",
        createdAt: "2021-08-05T08:01:13.234Z",
        updatedAt: "2021-08-05T08:01:13.234Z"
    },
    {
        id: 3,
        name: "Smoothy day",
        date1: "2021-09-26T00:00:00.000Z",
        date2: "2021-09-27T00:00:00.000Z",
        date3: "2021-09-30T00:00:00.000Z",
        location: "Jakarta",
        eventStatus: "Approve",
        createdAt: "2021-08-05T08:08:56.253Z",
        updatedAt: "2021-08-05T08:16:24.614Z"
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
     await queryInterface.bulkDelete('Events', null, {});
  }
};
