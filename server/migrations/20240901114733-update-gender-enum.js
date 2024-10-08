'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Users', 'gender', {
      type: Sequelize.ENUM('male', 'female', 'prefer not to say'),
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Users', 'gender', {
      type: Sequelize.ENUM('male', 'female'),
      allowNull: true,
    });
  }
};
