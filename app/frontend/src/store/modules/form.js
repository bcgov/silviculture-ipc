import ipcService from '../../services/ipcService';

export default {
  namespaced: true,
  state: {
    submitting: false,
    step: 1,
    submissionDetails: null,
    submissionError: '',

    // Form schema
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
    }
  },
  getters: {
    step: state => state.step,
    submitting: state => state.submitting,
    submissionDetails: state => state.submissionDetails,
    submissionError: state => state.submissionError,

    // Form objects
    contacts: state => state.contacts[0],
    business: state => state.business,
    ipcPlan: state => state.ipcPlan,
  },
  mutations: {
    setSubmitting(state, isSubmitting) {
      state.submitting = isSubmitting;
    },
    setStep: (state, step) => {
      window.scrollTo(0, 0);
      state.step = step;
    },
    setSubmissionDetails(state, responseData) {
      state.submissionDetails = responseData;
    },
    setSubmissionError(state, errorMessage) {
      state.submissionError = errorMessage;
    },

    // Form updates
    updateBusiness: (state, obj) => {
      Object.assign(state.business, obj);
    },
    updateContacts: (state, obj) => {
      Object.assign(state.contacts[0], obj);
    },
    updateIpcPlan: (state, obj) => {
      Object.assign(state.ipcPlan, obj);
    },
  },
  actions: {
    async submitForm({ commit, state }) {
      commit('setSubmitting', true);
      commit('setSubmissionError', '');
      try {
        const body = {
          business: state.business,
          contact: state.contact,
          ipcPlan: state.ipcPlan
        };
        await new Promise(r => setTimeout(r, 2000));
        const response = await ipcService.sendIPCContent(body);
        if (!response.data) {
          throw new Error('No response data from API while submitting form');
        }
        commit('setSubmissionDetails', response.data);
      } catch (error) {
        console.error(`Error submitting form: ${error}`); // eslint-disable-line no-console
        commit('setSubmissionError', 'An error occurred while attempting to submit the form. Please try again, orcontact ?????? if you have any questions');
      } finally {
        commit('setSubmitting', false);
      }
    }
  }
};
