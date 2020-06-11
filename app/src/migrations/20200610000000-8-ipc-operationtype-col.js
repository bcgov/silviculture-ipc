module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          'ipc_plan',
          'operationType',
          {
            allowNull: true,
            comment: 'Forestry Operation Type for this plan',
            type: Sequelize.STRING(30),
            unique: false,
            defaultValue: 'SILVICULTURE'
          },
          { transaction: t })
      ]);
    });
  },

  down: async (queryInterface) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn(
          'ipc_plan',
          'operationType',
          { transaction: t })
      ]);
    });
  }
};
