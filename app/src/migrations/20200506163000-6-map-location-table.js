module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.createTable('map_location', {
          mapLocationId: {
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            type: Sequelize.UUID
          },
          locationId: {
            allowNull: false,
            comment: 'Associated location id',
            type: Sequelize.UUID,
            references: {
              model: 'location',
              key: 'locationId'
            }
          },
          latitude: {
            allowNull: false,
            comment: 'Latitude coordinate of mapped location',
            type: Sequelize.STRING(255)
          },
          longitude: {
            allowNull: false,
            comment: 'Longitude coordinate of mapped location',
            type: Sequelize.STRING(255)
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE
          },
          createdBy: {
            allowNull: false,
            type: Sequelize.STRING(255)
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
          },
          updatedBy: {
            allowNull: false,
            type: Sequelize.STRING(255)
          },
          deletedBy: {
            allowNull: false,
            type: Sequelize.STRING(255)
          }
        }, {
          comment: 'List of map location records',
          transaction: t
        })
      ]);
    });
  },

  down: queryInterface => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.dropTable('map_location', {
          transaction: t
        })
      ]);
    });
  }
};
