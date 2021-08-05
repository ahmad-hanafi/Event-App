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
    await queryInterface.bulkInsert('ConfirmEvents',
      [
        {
          id: 2,
          confirmDate: "2021-09-21T00:00:00.000Z",
          isApprove: false,
          remark: "Team already has schedule",
          userID: 2,
          eventID: 1,
          createdAt: "2021-08-05T14:58:51.428Z",
          updatedAt: "2021-08-05T15:00:05.981Z",
        },
        {
          id: 1,
          confirmDate: "2021-09-20T00:00:00.000Z",
          isApprove: true,
          remark: "",
          userID: 2,
          eventID: 2,
          createdAt: "2021-08-05T14:57:17.186Z",
          updatedAt: "2021-08-05T14:57:17.186Z",
        },
        {
          id: 5,
          confirmDate: "2021-09-22T00:00:00.000Z",
          isApprove: true,
          remark: "",
          userID: 3,
          eventID: 2,
          createdAt: "2021-08-05T15:56:03.402Z",
          updatedAt: "2021-08-05T15:56:03.402Z",
        },
        {
          id: 4,
          confirmDate: "2021-09-27T00:00:00.000Z",
          isApprove: true,
          remark: "",
          userID: 3,
          eventID: 4,
          createdAt: "2021-08-05T15:05:01.205Z",
          updatedAt: "2021-08-05T15:05:01.205Z",
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
     await queryInterface.bulkDelete('ConfirmEvents', null, {});
  }
};
