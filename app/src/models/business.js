module.exports = (sequelize, DataTypes) => {
  const Business = sequelize.define('Business', {
    businessId: {
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID,
      validate: {
        isUUID: 4
      }
    },
    name: {
      allowNull: false,
      comment: 'The business name',
      type: DataTypes.STRING(255),
      unique: false
    }
  }, {
    comment: 'List of all businesses',
    tableName: 'business'
  });
  Business.associate = models => {
    Business.hasMany(models.Contact, {
      foreignKey: 'businessId'
    });
  };
  return Business;
};
