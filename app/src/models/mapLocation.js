module.exports = (sequelize, DataTypes) => {
  const MapLocation = sequelize.define('MapLocation', {
    mapLocationId: {
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID,
      validate: {
        isUUID: 4
      }
    },
    latitude: {
      allowNull: false,
      comment: 'Latitude coordinate of mapped location',
      type: DataTypes.STRING(255)
    },
    longitude: {
      allowNull: false,
      comment: 'Longitude coordinate of mapped location',
      type: DataTypes.STRING(255)
    },
    createdBy: {
      allowNull: false,
      type: DataTypes.STRING(255),
      unique: false
    },
    updatedBy: {
      allowNull: false,
      type: DataTypes.STRING(255),
      unique: false
    }
  },
    {
      comment: 'List of all map locations',
      tableName: 'map_location'
    });
  MapLocation.associate = models => {
    MapLocation.belongsTo(models.Location, {
      foreignKey: 'locationId'
    });
  };
  return MapLocation;
};
