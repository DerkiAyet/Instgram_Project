'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
      // Drop the existing column if necessary
      await queryInterface.removeColumn('Users', 'userId');

      // Add the column back with correct properties
      await queryInterface.addColumn('Users', 'userId', {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
      });
  },

  down: async (queryInterface, Sequelize) => {
      // Revert the changes if needed (for the down migration)
      await queryInterface.removeColumn('Users', 'userId');

      await queryInterface.addColumn('Users', 'userId', {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true // Ensure correct configuration here if needed
      });
  }
};