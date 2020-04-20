const validator = require('validator');

const SLEEPING_AREA_TYPE_SINGLE = 1;
const SLEEPING_AREA_TYPE_SHARED = 2;

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

  isCheckbox: (x) => {
    if (Object.prototype.toString.call(x) === '[object Boolean]') {
      return validator.isBoolean(String(x));
    }
    return false;
  }
};

const models = {
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
    guidelinesRead: value => validatorUtils.isCheckbox(value),
    assessmentCompleted: value => validatorUtils.isCheckbox(value),
    developedPlan: value => validatorUtils.isCheckbox(value),
    protectionSignage: value => validatorUtils.isCheckbox(value),
    workerContactPersonnel: value => validatorUtils.isCheckbox(value),
    mhoContacted: value => validatorUtils.isCheckbox(value),
    commonAreaDistancing: value => validatorUtils.isCheckbox(value),
    sleepingAreaType: value => validatorUtils.isInt(value) && validator.isInt(String(value), {min: SLEEPING_AREA_TYPE_SINGLE, max: SLEEPING_AREA_TYPE_SHARED, allow_leading_zeroes: false}),
    sharedSleepingPerRoom: value => validatorUtils.isInt(value) && validator.isInt(String(value), {min: 1, max: 10, allow_leading_zeroes: false}),
    sharedSleepingDistancing: value => validatorUtils.isCheckbox(value),
    selfIsolateUnderstood: value => validatorUtils.isCheckbox(value),
    selfIsolateAccommodation: value => validatorUtils.isCheckbox(value),
    laundryServices: value => validatorUtils.isCheckbox(value),
    wasteManagementGloves: value => validatorUtils.isCheckbox(value),
    wasteManagementSchedule: value => validatorUtils.isCheckbox(value),
    wasteManagementBags: value => validatorUtils.isCheckbox(value),
    handWashingStations: value => validatorUtils.isCheckbox(value),
    handWashingSoapWater: value => validatorUtils.isCheckbox(value),
    handWashingWaterless: value => validatorUtils.isCheckbox(value),
    handWashingPaperTowels: value => validatorUtils.isCheckbox(value),
    handWashingSignage: value => validatorUtils.isCheckbox(value),
    distancingSleepingBarriers: value => validatorUtils.isCheckbox(value),
    distancingFaceShields: value => validatorUtils.isCheckbox(value),
    disinfectingSchedule: value => validatorUtils.isCheckbox(value),
    educationSignage: value => validatorUtils.isCheckbox(value),
    educationContactPersonnel: value => validatorUtils.isCheckbox(value),
    trainingCovid19: value => validatorUtils.isCheckbox(value),
    trainingEtiquette: value => validatorUtils.isCheckbox(value),
    trainingLocations: value => validatorUtils.isCheckbox(value),
    trainingFirstAid: value => validatorUtils.isCheckbox(value),
    trainingReporting: value => validatorUtils.isCheckbox(value),
    mealsDistancing: value => validatorUtils.isCheckbox(value),
    mealsDishware: value => validatorUtils.isCheckbox(value),
    mealsDishwashing: value => validatorUtils.isCheckbox(value),
    infectionSeparation: value => validatorUtils.isCheckbox(value),
    infectionSymptoms: value => validatorUtils.isCheckbox(value),
    infectionHeathLinkBC: value => validatorUtils.isCheckbox(value),
    infectionSanitization: value => validatorUtils.isCheckbox(value),
    infectedFeeding: value => validatorUtils.isCheckbox(value),
    infectedHousekeeping: value => validatorUtils.isCheckbox(value),
    infectedWaste: value => validatorUtils.isCheckbox(value),
    certifyAccurateInformation:  value => validatorUtils.isCheckbox(value),
    agreeToInspection: value => validatorUtils.isCheckbox(value)
  }
};

const validators = {
  ipc: (obj) => {
    if (!validatorUtils.isObject(obj)) {
      return [{ value: 'form', message: 'Format of submission is invalid. Expect an object.' }];
    }
    if (!validatorUtils.isObject(obj['business'])) {
      return [{ value: 'form', message: 'Format of submission is invalid. `business` is not an object.' }];
    }
    if (!validatorUtils.isObject(obj['contact'])) {
      return [{ value: 'form', message: 'Format of submission is invalid. `contact` is not an object.' }];
    }
    if (!validatorUtils.isObject(obj['ipcPlan'])) {
      return [{ value: 'form', message: 'Format of submission is invalid. `ipcPlan` is not an object.' }];
    }

    const errors = [];
    if (!models.business.name(obj.business['name'])) {
      errors.push({ value: obj.business['name'], message: 'Invalid value for required field `Business Name`.' });
    }

    if (!models.contact.firstName(obj.contact['firstName'])) {
      errors.push({ value: obj.contact['firstName'], message: 'Invalid value for required field `Contact First Name`.' });
    }
    if (!models.contact.lastName(obj.contact['lastName'])) {
      errors.push({ value: obj.contact['lastName'], message: 'Invalid value for required field `Contact Last Name`.' });
    }
    if (!models.contact.phone1(obj.contact['phone1'])) {
      errors.push({ value: obj.contact['phone1'], message: 'Invalid value for required field `Contact Phone 1`. ' });
    }
    if (!models.contact.email(obj.contact['email'])) {
      errors.push({ value: obj.contact['email'], message: 'Invalid value for required field `Contact Email`. ' });
    }
    if (!models.contact.phone2(obj.contact['phone2'])) {
      errors.push({ value: obj.contact['phone2'], message: 'Invalid value `Contact Phone 2 `.' });
    }


    if (!models.ipcPlan.sleepingAreaType(obj.ipcPlan['sleepingAreaType'])) {
      errors.push({ value: obj.ipcPlan['sleepingAreaType'], message: 'Invalid value `Sleeping Area Type`.' });
    } else {
      if (obj.ipcPlan['sleepingAreaType'] === SLEEPING_AREA_TYPE_SHARED) {
        // if not SLEEPING_AREA_TYPE_SHARED, then we will use defaults, so do not test.
        if (!models.ipcPlan.sharedSleepingPerRoom(obj.ipcPlan['sharedSleepingPerRoom'])) {
          errors.push({ value: obj.ipcPlan['sharedSleepingPerRoom'], message: 'Invalid value `Shared sleeping per room`.' });
        }
        if (!models.ipcPlan.sharedSleepingDistancing(obj.ipcPlan['sharedSleepingDistancing'])) {
          errors.push({ value: obj.ipcPlan['sharedSleepingDistancing'], message: 'Invalid value `Shared sleeping distance`.' });
        }
      }
    }
    let invalidCheckbox = false;
    if (!models.ipcPlan.guidelinesRead(obj.ipcPlan['guidelinesRead'])) {
      invalidCheckbox = true;
    }
    if (!models.ipcPlan.assessmentCompleted(obj.ipcPlan['assessmentCompleted'])) {
      invalidCheckbox = true;
    }
    if (!models.ipcPlan.developedPlan(obj.ipcPlan['developedPlan'])) {
      invalidCheckbox = true;
    }
    if (!models.ipcPlan.protectionSignage(obj.ipcPlan['protectionSignage'])) {
      invalidCheckbox = true;
    }
    if (!models.ipcPlan.workerContactPersonnel(obj.ipcPlan['workerContactPersonnel'])) {
      invalidCheckbox = true;
    }
    if (!models.ipcPlan.mhoContacted(obj.ipcPlan['mhoContacted'])) {
      invalidCheckbox = true;
    }
    if (!models.ipcPlan.commonAreaDistancing(obj.ipcPlan['commonAreaDistancing'])) {
      invalidCheckbox = true;
    }
    if (!models.ipcPlan.selfIsolateUnderstood(obj.ipcPlan['selfIsolateUnderstood'])) {
      invalidCheckbox = true;
    }
    if (!models.ipcPlan.selfIsolateAccommodation(obj.ipcPlan['selfIsolateAccommodation'])) {
      invalidCheckbox = true;
    }
    if (!models.ipcPlan.laundryServices(obj.ipcPlan['laundryServices'])) {
      invalidCheckbox = true;
    }
    if (!models.ipcPlan.wasteManagementGloves(obj.ipcPlan['wasteManagementGloves'])) {
      invalidCheckbox = true;
    }
    if (!models.ipcPlan.wasteManagementSchedule(obj.ipcPlan['wasteManagementSchedule'])) {
      invalidCheckbox = true;
    }
    if (!models.ipcPlan.wasteManagementBags(obj.ipcPlan['wasteManagementBags'])) {
      invalidCheckbox = true;
    }
    if (!models.ipcPlan.handWashingStations(obj.ipcPlan['handWashingStations'])) {
      invalidCheckbox = true;
    }
    if (!models.ipcPlan.handWashingSoapWater(obj.ipcPlan['handWashingSoapWater'])) {
      invalidCheckbox = true;
    }
    if (!models.ipcPlan.handWashingWaterless(obj.ipcPlan['handWashingWaterless'])) {
      invalidCheckbox = true;
    }
    if (!models.ipcPlan.handWashingPaperTowels(obj.ipcPlan['handWashingPaperTowels'])) {
      invalidCheckbox = true;
    }
    if (!models.ipcPlan.handWashingSignage(obj.ipcPlan['handWashingSignage'])) {
      invalidCheckbox = true;
    }
    if (!models.ipcPlan.distancingSleepingBarriers(obj.ipcPlan['distancingSleepingBarriers'])) {
      invalidCheckbox = true;
    }
    if (!models.ipcPlan.distancingFaceShields(obj.ipcPlan['distancingFaceShields'])) {
      invalidCheckbox = true;
    }
    if (!models.ipcPlan.disinfectingSchedule(obj.ipcPlan['disinfectingSchedule'])) {
      invalidCheckbox = true;
    }
    if (!models.ipcPlan.educationSignage(obj.ipcPlan['educationSignage'])) {
      invalidCheckbox = true;
    }
    if (!models.ipcPlan.educationContactPersonnel(obj.ipcPlan['educationContactPersonnel'])) {
      invalidCheckbox = true;
    }
    if (!models.ipcPlan.trainingCovid19(obj.ipcPlan['trainingCovid19'])) {
      invalidCheckbox = true;
    }
    if (!models.ipcPlan.trainingEtiquette(obj.ipcPlan['trainingEtiquette'])) {
      invalidCheckbox = true;
    }
    if (!models.ipcPlan.trainingLocations(obj.ipcPlan['trainingLocations'])) {
      invalidCheckbox = true;
    }
    if (!models.ipcPlan.trainingFirstAid(obj.ipcPlan['trainingFirstAid'])) {
      invalidCheckbox = true;
    }
    if (!models.ipcPlan.trainingReporting(obj.ipcPlan['trainingReporting'])) {
      invalidCheckbox = true;
    }
    if (!models.ipcPlan.mealsDistancing(obj.ipcPlan['mealsDistancing'])) {
      invalidCheckbox = true;
    }
    if (!models.ipcPlan.mealsDishware(obj.ipcPlan['mealsDishware'])) {
      invalidCheckbox = true;
    }
    if (!models.ipcPlan.mealsDishwashing(obj.ipcPlan['mealsDishwashing'])) {
      invalidCheckbox = true;
    }
    if (!models.ipcPlan.infectionSeparation(obj.ipcPlan['infectionSeparation'])) {
      invalidCheckbox = true;
    }
    if (!models.ipcPlan.infectionSymptoms(obj.ipcPlan['infectionSymptoms'])) {
      invalidCheckbox = true;
    }
    if (!models.ipcPlan.infectionHeathLinkBC(obj.ipcPlan['infectionHeathLinkBC'])) {
      invalidCheckbox = true;
    }
    if (!models.ipcPlan.infectionSanitization(obj.ipcPlan['infectionSanitization'])) {
      invalidCheckbox = true;
    }
    if (!models.ipcPlan.infectedFeeding(obj.ipcPlan['infectedFeeding'])) {
      invalidCheckbox = true;
    }
    if (!models.ipcPlan.infectedHousekeeping(obj.ipcPlan['infectedHousekeeping'])) {
      invalidCheckbox = true;
    }
    if (!models.ipcPlan.infectedWaste(obj.ipcPlan['infectedWaste'])) {
      invalidCheckbox = true;
    }
    if (!models.ipcPlan.certifyAccurateInformation(obj.ipcPlan['certifyAccurateInformation'])) {
      invalidCheckbox = true;
    }
    if (!models.ipcPlan.agreeToInspection(obj.ipcPlan['agreeToInspection'])) {
      invalidCheckbox = true;
    }

    if (invalidCheckbox) {
      errors.push({
        message: 'Invalid value for checkbox, expect boolean (true/false).'
      });
    }
    return errors;
  }
};

module.exports = { models, validators, validatorUtils };
