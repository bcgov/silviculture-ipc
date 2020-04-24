module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    locationId: {
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID,
      validate: {
        isUUID: 4
      }
    },
    startDate: {
      allowNull: false,
      type: DataTypes.DATE
    },
    endDate: {
      allowNull: false,
      type: DataTypes.DATE
    },
    addressLine1: {
      allowNull: false,
      comment: 'Address line 1',
      type: DataTypes.STRING(255),
      unique: false
    },
    addressLine2: {
      allowNull: true,
      comment: 'Address line 2',
      type: DataTypes.STRING(255),
      unique: false
    },
    city: {
      allowNull: false,
      comment: 'City name',
      type: DataTypes.STRING(255),
      unique: false
    },
    province: {
      allowNull: false,
      comment: 'Province',
      type: DataTypes.STRING(30),
      unique: false
    },
    postalCode: {
      allowNull: false,
      comment: 'Postal code',
      type: DataTypes.STRING(30),
      unique: false
    },
    accTents: {
      allowNull: false,
      comment: 'Tent Accommodations',
      type: DataTypes.BOOLEAN,
      unique: false
    },
    tentDetails: {
      allowNull: true,
      comment: 'Tent Details',
      type: DataTypes.STRING(255),
      unique: false
    },
    accMotel: {
      allowNull: false,
      comment: 'Motel Accommodations',
      type: DataTypes.BOOLEAN,
      unique: false
    },
    motelName: {
      allowNull: true,
      comment: 'Motel name',
      type: DataTypes.STRING(255),
      unique: false
    },
    motelAddressLine1: {
      allowNull: true,
      comment: 'Address line 1',
      type: DataTypes.STRING(255),
      unique: false
    },
    motelAddressLine2: {
      allowNull: true,
      comment: 'Address line 2',
      type: DataTypes.STRING(255),
      unique: false
    },
    motelCity: {
      allowNull: true,
      comment: 'City name',
      type: DataTypes.STRING(255),
      unique: false
    },
    motelProvince: {
      allowNull: true,
      comment: 'Province',
      type: DataTypes.STRING(30),
      unique: false
    },
    motelPostalCode: {
      allowNull: true,
      comment: 'Postal code',
      type: DataTypes.STRING(30),
      unique: false
    },
    accWorkersHome: {
      allowNull: true,
      comment: 'Worker/Home Accommodations',
      type: DataTypes.BOOLEAN,
      unique: false
    }
  },
  {
    comment: 'List of all locations',
    tableName: 'location'
  });
  Location.associate = models => {
    Location.belongsTo(models.IPCPlan, {
      foreignKey: 'ipcPlanId'
    });
  };
  return Location;
};