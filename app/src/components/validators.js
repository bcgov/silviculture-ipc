const validator = require('validator');

const Constants = require('./constants');

const validatorUtils = {
  isEmail: x => {
    return validatorUtils.isString(x) && !validator.isEmpty(x, { ignore_whitespace: true }) && validator.isEmail(x, { allow_display_name: true });
  },

  isInt: x => {
    if (isNaN(x)) {
      return false;
    }
    const num = parseFloat(x);
    // use modulus to determine if it is an int
    return num % 1 === 0;
  },

  isString: x => {
    return Object.prototype.toString.call(x) === '[object String]';
  },

  isNonEmptyString: x => {
    return validatorUtils.isString(x) && !validator.isEmpty(x, {ignore_whitespace: true});
  },

  isObject: x => {
    return Object.prototype.toString.call(x) === '[object Object]';
  },

  isBoolean: (x) => {
    if (Object.prototype.toString.call(x) === '[object Boolean]') {
      return validator.isBoolean(String(x));
    }
    return false;
  }
};

const models = {
  email: {
    comments: value => validatorUtils.isString(value),
    from: value => validatorUtils.isEmail(value),
    idir: value => validatorUtils.isString(value)
  },

  business: {
    name: value => {
      return validatorUtils.isNonEmptyString(value);
    }
  },

  contact: {
    firstName: value => {
      return validatorUtils.isNonEmptyString(value);
    },
    lastName: value => {
      return validatorUtils.isNonEmptyString(value);
    },
    phone1: value => {
      return validatorUtils.isNonEmptyString(value) && validator.isMobilePhone(value);
    },
    phone2: value => {
      if (value) {
        return validator.isMobilePhone(value);
      }
      return true;
    },
    email: value => {
      return validatorUtils.isEmail(value);
    },
  },

  ipcPlan: {
    booleanFields: [
      'guidelinesRead',
      'assessmentCompleted',
      'developedPlan',
      'protectionSignage',
      'workerContactPersonnel',
      'mhoContacted',
      'commonAreaDistancing',
      'selfIsolateUnderstood',
      'selfIsolateAccommodation',
      'laundryServices',
      'wasteManagementGloves',
      'wasteManagementSchedule',
      'wasteManagementBags',
      'handWashingStations',
      'handWashingSoapWater',
      'handWashingWaterless',
      'handWashingPaperTowels',
      'handWashingSignage',
      'distancingSleepingBarriers',
      'distancingFaceShields',
      'disinfectingSchedule',
      'educationSignage',
      'educationContactPersonnel',
      'trainingCovid19',
      'trainingEtiquette',
      'trainingLocations',
      'trainingFirstAid',
      'trainingReporting',
      'mealsDistancing',
      'mealsDishware',
      'mealsDishwashing',
      'infectionSeparation',
      'infectionSymptoms',
      'infectionHeathLinkBC',
      'infectionSanitization',
      'infectedFeeding',
      'infectedHousekeeping',
      'infectedWaste',
      'certifyAccurateInformation',
      'agreeToInspection'
    ],
    sleepingAreaType: value => validatorUtils.isInt(value) && validator.isInt(String(value), {min: Constants.SLEEPING_AREA_TYPE_SINGLE, max: Constants.SLEEPING_AREA_TYPE_SHARED, allow_leading_zeroes: false}),
    sharedSleepingPerRoom: value => validatorUtils.isInt(value) && validator.isInt(String(value), {min: 1, max: 10, allow_leading_zeroes: false}),
    sharedSleepingDistancing: value => validatorUtils.isBoolean(value),
  }
};

const validators = {
  email: (obj) => {
    const errors = [];
    if (!models.email.comments(obj['comments'])) {
      errors.push({ value: obj['comments'], message: 'Invalid value for `comments`.' });
    }
    if (!models.email.from(obj['from'])) {
      errors.push({ value: obj['from'], message: 'Invalid value for `from`.' });
    }
    if (!models.email.idir(obj['idir'])) {
      errors.push({ value: obj['idir'], message: 'Invalid value for `idir`.' });
    }
    return errors;

  },

  ipc: (obj) => {
    if (!validatorUtils.isObject(obj)) {
      return [{ value: 'schema', message: 'Invalid schema. Expect an object.' }];
    }
    if (!validatorUtils.isObject(obj['business'])) {
      return [{ value: 'schema', message: 'Invalid schema. `business` is not an object.' }];
    }
    if (!Array.isArray(obj['contacts'])) {
      return [{ value: 'schema', message: 'Invalid schema. `contacts` is not an array.' }];
    }
    if (!validatorUtils.isObject(obj['ipcPlan'])) {
      return [{ value: 'schema', message: 'Invalid schema. `ipcPlan` is not an object.' }];
    }

    const errors = [];
    if (!models.business.name(obj.business['name'])) {
      errors.push({ value: obj.business['name'], message: 'Invalid value for required field `business.name`.' });
    }

    obj['contacts'].forEach((value, index) => {
      if (!models.contact.firstName(value['firstName'])) {
        errors.push({ value: value['firstName'], message: `Invalid value for required field \`contacts[${index}].firstName\`.` });
      }
      if (!models.contact.lastName(value['lastName'])) {
        errors.push({ value: value['lastName'], message: `Invalid value for required field \`contacts[${index}].lastName\`.` });
      }
      if (!models.contact.phone1(value['phone1'])) {
        errors.push({ value: value['phone1'], message: `Invalid value for required field \`contacts[${index}].phone1\`.` });
      }
      if (!models.contact.email(value['email'])) {
        errors.push({ value: value['email'], message: `Invalid value for required field \`contacts[${index}].email\`.` });
      }
      if (!models.contact.phone2(value['phone2'])) {
        errors.push({ value: value['phone2'], message: `Invalid value for required field \`contacts[${index}].phone2\`.` });
      }
    });


    if (!models.ipcPlan.sleepingAreaType(obj.ipcPlan['sleepingAreaType'])) {
      errors.push({ value: obj.ipcPlan['sleepingAreaType'], message: 'Invalid value `ipcPlan.sleepingAreaType`.' });
    } else {
      if (obj.ipcPlan['sleepingAreaType'] === Constants.SLEEPING_AREA_TYPE_SHARED) {
        if (!models.ipcPlan.sharedSleepingPerRoom(obj.ipcPlan['sharedSleepingPerRoom'])) {
          errors.push({ value: obj.ipcPlan['sharedSleepingPerRoom'], message: 'Invalid value `ipcPlan.sharedSleepingPerRoom`.' });
        }
        if (!models.ipcPlan.sharedSleepingDistancing(obj.ipcPlan['sharedSleepingDistancing'])) {
          errors.push({ value: obj.ipcPlan['sharedSleepingDistancing'], message: 'Invalid value `ipcPlan.sharedSleepingDistancing`.' });
        }
      }
    }

    models.ipcPlan.booleanFields.forEach(value => {
      if (!validatorUtils.isBoolean(obj.ipcPlan[value])) {
        errors.push({ value: obj.ipcPlan[value], message: `Invalid value \`ipcPlan.${value}\`.  Boolean expected.` });
      }
    });

    return errors;
  }
};

module.exports = { models, validators, validatorUtils };
