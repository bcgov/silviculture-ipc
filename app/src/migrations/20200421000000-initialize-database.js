module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.createTable('business', {
          businessId: {
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            type: Sequelize.UUID
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
          },
          deletedAt: {
            allowNull: true,
            type: Sequelize.DATE
          },
          name: {
            allowNull: false,
            comment: 'The business name',
            type: Sequelize.STRING(255),
            unique: false
          }
        }, {
          comment: 'List of all businesses',
          transaction: t
        }),
        queryInterface.createTable('contact', {
          contactId: {
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            type: Sequelize.UUID
          },
          businessId: {
            allowNull: false,
            comment: 'Associated Business id',
            type: Sequelize.UUID,
            references: {
              model: 'business',
              key: 'businessId'
            }
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
          },
          deletedAt: {
            allowNull: true,
            type: Sequelize.DATE
          },
          firstName: {
            allowNull: false,
            comment: 'Contact first name',
            type: Sequelize.STRING(120),
            unique: false
          },
          lastName: {
            allowNull: false,
            comment: 'Contact last name',
            type: Sequelize.STRING(120),
            unique: false
          },
          phone1: {
            allowNull: false,
            comment: 'Contact primary phone',
            type: Sequelize.STRING(30),
            unique: false
          },
          phone2: {
            allowNull: true,
            comment: 'Contact secondary phone',
            type: Sequelize.STRING(30),
            unique: false
          },
          email: {
            allowNull: false,
            comment: 'Contact email address',
            type: Sequelize.STRING(255),
            unique: false
          }
        }, {
          comment: 'List of all contacts',
          transaction: t
        }),
        queryInterface.createTable('ipc_plan', {
          ipcPlanId: {
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            type: Sequelize.UUID,
            validate: {
              isUUID: 4
            }
          },
          businessId: {
            allowNull: false,
            comment: 'Associated Business id',
            type: Sequelize.UUID,
            references: {
              model: 'business',
              key: 'businessId'
            }
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
          },
          deletedAt: {
            allowNull: true,
            type: Sequelize.DATE
          },
          guidelinesRead: {
            allowNull: false,
            comment: '',
            type: Sequelize.BOOLEAN,
            unique: false
          },
          assessmentCompleted: {
            allowNull: false,
            comment: '',
            type: Sequelize.BOOLEAN,
            unique: false
          },
          developedPlan: {
            allowNull: false,
            comment: '',
            type: Sequelize.BOOLEAN,
            unique: false
          },
          protectionSignage: {
            allowNull: false,
            comment: '',
            type: Sequelize.BOOLEAN,
            unique: false
          },
          workerContactPersonnel: {
            allowNull: false,
            comment: '',
            type: Sequelize.BOOLEAN,
            unique: false
          },
          mhoContacted: {
            allowNull: false,
            comment: '',
            type: Sequelize.BOOLEAN,
            unique: false
          },
          commonAreaDistancing: {
            allowNull: false,
            comment: '',
            type: Sequelize.BOOLEAN,
            unique: false
          },
          sleepingAreaType: {
            allowNull: false,
            comment: 'Sleeping Area Type',
            type: Sequelize.INTEGER,
            unique: false
          },
          sharedSleepingPerRoom: {
            allowNull: false,
            comment: 'Workers sleeping per room',
            type: Sequelize.INTEGER,
            unique: false
          },
          sharedSleepingDistancing: {
            allowNull: false,
            comment: '',
            type: Sequelize.BOOLEAN,
            unique: false
          },
          selfIsolateUnderstood: {
            allowNull: false,
            comment: '',
            type: Sequelize.BOOLEAN,
            unique: false
          },
          selfIsolateAccommodation: {
            allowNull: false,
            comment: '',
            type: Sequelize.BOOLEAN,
            unique: false
          },
          laundryServices: {
            allowNull: false,
            comment: '',
            type: Sequelize.BOOLEAN,
            unique: false
          },
          wasteManagementGloves: {
            allowNull: false,
            comment: '',
            type: Sequelize.BOOLEAN,
            unique: false
          },
          wasteManagementSchedule: {
            allowNull: false,
            comment: '',
            type: Sequelize.BOOLEAN,
            unique: false
          },
          wasteManagementBags: {
            allowNull: false,
            comment: '',
            type: Sequelize.BOOLEAN,
            unique: false
          },
          handWashingStations: {
            allowNull: false,
            comment: '',
            type: Sequelize.BOOLEAN,
            unique: false
          },
          handWashingSoapWater: {
            allowNull: false,
            comment: '',
            type: Sequelize.BOOLEAN,
            unique: false
          },
          handWashingWaterless: {
            allowNull: false,
            comment: '',
            type: Sequelize.BOOLEAN,
            unique: false
          },
          handWashingPaperTowels: {
            allowNull: false,
            comment: '',
            type: Sequelize.BOOLEAN,
            unique: false
          },
          handWashingSignage: {
            allowNull: false,
            comment: '',
            type: Sequelize.BOOLEAN,
            unique: false
          },
          distancingSleepingBarriers: {
            allowNull: false,
            comment: '',
            type: Sequelize.BOOLEAN,
            unique: false
          },
          distancingFaceShields: {
            allowNull: false,
            comment: '',
            type: Sequelize.BOOLEAN,
            unique: false
          },
          disinfectingSchedule: {
            allowNull: false,
            comment: '',
            type: Sequelize.BOOLEAN,
            unique: false
          },
          educationSignage: {
            allowNull: false,
            comment: '',
            type: Sequelize.BOOLEAN,
            unique: false
          },
          educationContactPersonnel: {
            allowNull: false,
            comment: '',
            type: Sequelize.BOOLEAN,
            unique: false
          },
          trainingCovid19: {
            allowNull: false,
            comment: '',
            type: Sequelize.BOOLEAN,
            unique: false
          },
          trainingEtiquette: {
            allowNull: false,
            comment: '',
            type: Sequelize.BOOLEAN,
            unique: false
          },
          trainingLocations: {
            allowNull: false,
            comment: '',
            type: Sequelize.BOOLEAN,
            unique: false
          },
          trainingFirstAid: {
            allowNull: false,
            comment: '',
            type: Sequelize.BOOLEAN,
            unique: false
          },
          trainingReporting: {
            allowNull: false,
            comment: '',
            type: Sequelize.BOOLEAN,
            unique: false
          },
          mealsDistancing: {
            allowNull: false,
            comment: '',
            type: Sequelize.BOOLEAN,
            unique: false
          },
          mealsDishware: {
            allowNull: false,
            comment: '',
            type: Sequelize.BOOLEAN,
            unique: false
          },
          mealsDishwashing: {
            allowNull: false,
            comment: '',
            type: Sequelize.BOOLEAN,
            unique: false
          },
          infectionSeparation: {
            allowNull: false,
            comment: '',
            type: Sequelize.BOOLEAN,
            unique: false
          },
          infectionSymptoms: {
            allowNull: false,
            comment: '',
            type: Sequelize.BOOLEAN,
            unique: false
          },
          infectionHeathLinkBC: {
            allowNull: false,
            comment: '',
            type: Sequelize.BOOLEAN,
            unique: false
          },
          infectionSanitization: {
            allowNull: false,
            comment: '',
            type: Sequelize.BOOLEAN,
            unique: false
          },
          infectedFeeding: {
            allowNull: false,
            comment: '',
            type: Sequelize.BOOLEAN,
            unique: false
          },
          infectedHousekeeping: {
            allowNull: false,
            comment: '',
            type: Sequelize.BOOLEAN,
            unique: false
          },
          infectedWaste: {
            allowNull: false,
            comment: '',
            type: Sequelize.BOOLEAN,
            unique: false
          },
          certifyAccurateInformation: {
            allowNull: false,
            comment: '',
            type: Sequelize.BOOLEAN,
            unique: false
          },
          agreeToInspection: {
            allowNull: false,
            comment: '',
            type: Sequelize.BOOLEAN,
            unique: false
          }
        }, {
          comment: 'List of all IPC plan answers',
          transaction: t
        })
      ]);
    });
  },

  down: queryInterface => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.dropTable('ipc_plan', {
          transaction: t
        }),
        queryInterface.dropTable('contact', {
          transaction: t
        }),
        queryInterface.dropTable('business', {
          transaction: t
        })
      ]);
    });
  }
};
