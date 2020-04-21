module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
    contactId: {
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID,
      validate: {
        isUUID: 4
      }
    },
    firstName: {
      allowNull: false,
      comment: 'Contact first name',
      type: DataTypes.STRING(120),
      unique: false
    },
    lastName: {
      allowNull: false,
      comment: 'Contact last name',
      type: DataTypes.STRING(120),
      unique: false
    },
    phone1: {
      allowNull: false,
      comment: 'Contact primary phone',
      type: DataTypes.STRING(30),
      unique: false
    },
    phone2: {
      allowNull: true,
      comment: 'Contact secondary phone',
      type: DataTypes.STRING(30),
      unique: false
    },
    email: {
      allowNull: false,
      comment: 'Contact email address',
      type: DataTypes.STRING(255),
      unique: false
    }
  }, {
    comment: 'List of all contacts',
    tableName: 'contact'
  });
  Contact.associate = models => {
    Contact.belongsTo(models.Business, {
      foreignKey: 'businessId'
    });
  };
  return Contact;
};
