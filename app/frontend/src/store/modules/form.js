export default {
  namespaced: true,
  state: {
    business: {
      name: ''
    },
    contacts: [{
      primary: true,
      firstName: '',
      lastName: '',
      phone1: '',
      phone2: '',
      email: ''
    }],
    ipcPlan: {
      sleepingAreaType: 1,
      sharedSleepingPerRoom: 1,
      sharedSleepingDistancing: false,

      guidelinesRead: false,
      assessmentCompleted: false,
      developedPlan: false,
      protectionSignage: false,
      workerContactPersonnel: false,
      mhoContacted: false,
      commonAreaDistancing: false,
      selfIsolateUnderstood: false,
      selfIsolateAccommodation: false,
      laundryServices: false,
      wasteManagementGloves: false,
      wasteManagementSchedule: false,
      wasteManagementBags: false,
      handWashingStations: false,
      handWashingSoapWater: false,
      handWashingWaterless: false,
      handWashingPaperTowels: false,
      handWashingSignage: false,
      distancingSleepingBarriers: false,
      distancingFaceShields: false,
      disinfectingSchedule: false,
      educationSignage: false,
      educationContactPersonnel: false,
      trainingCovid19: false,
      trainingEtiquette: false,
      trainingLocations: false,
      trainingFirstAid: false,
      trainingReporting: false,
      mealsDistancing: false,
      mealsDishware: false,
      mealsDishwashing: false,
      infectionSeparation: false,
      infectionSymptoms: false,
      infectionHeathLinkBC: false,
      infectionSanitization: false,
      infectedFeeding: false,
      infectedHousekeeping: false,
      infectedWaste: false,
      certifyAccurateInformation: false,
      agreeToInspection: false
    },
    step: 1
  },
  getters: {
    contacts: state => state.contacts[0],
    business: state => state.business,
    ipcPlan: state => state.ipcPlan,
    step: state => state.step
  },
  mutations: {
    updateBusiness: (state, obj) => {
      Object.assign(state.business, obj);
    },
    updateContacts: (state, obj) => {
      Object.assign(state.contacts[0], obj);
    },
    updateIpcPlan: (state, obj) => {
      Object.assign(state.ipcPlan, obj);
    },
    setStep: (state, step) => {
      window.scrollTo(0, 0);
      state.step = step;
    }
  },
  actions: {
  }
};
