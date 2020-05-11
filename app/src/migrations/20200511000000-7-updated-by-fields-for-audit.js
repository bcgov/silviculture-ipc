module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          'business',
          'updatedBy',
          {
            allowNull: true,
            comment: 'User updating the record',
            type: Sequelize.STRING(255),
            unique: false
          },
          { transaction: t }),
        queryInterface.addColumn(
          'contact',
          'updatedBy',
          {
            allowNull: true,
            comment: 'User updating the record',
            type: Sequelize.STRING(255),
            unique: false
          },
          { transaction: t }),
        queryInterface.addColumn(
          'location',
          'updatedBy',
          {
            allowNull: true,
            comment: 'User updating the record',
            type: Sequelize.STRING(255),
            unique: false
          },
          { transaction: t })
      ]);
    });
  },

  down: queryInterface => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn(
          'business',
          'updatedBy',
          { transaction: t }),
        queryInterface.removeColumn(
          'contact',
          'updatedBy',
          { transaction: t }),
        queryInterface.removeColumn(
          'location',
          'updatedBy',
          { transaction: t }),
      ]);
    });
  }
};
