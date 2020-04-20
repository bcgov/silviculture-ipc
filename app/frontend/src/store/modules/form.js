export default {
  namespaced: true,
  state: {
    acronym: '',
    appName: '',
    appDescription: '',
    clientStatus: {
      dev: false,
      test: false,
      prod: false
    },
    step: 1
  },
  getters: {
    acronym: state => state.acronym,
    clientStatus: state => state.clientStatus,
    step: state => state.step
  },
  mutations: {
    setAcronym: (state, acronym) => {
      state.acronym = acronym;
    },
    setAppName: (state, appName) => {
      state.appName = appName;
    },
    setAppDescription: (state, appDescription) => {
      state.appDescription = appDescription;
    },
    setClientStatus: (state, statusObj) => {
      state.clientStatus = statusObj;
    },
    decrementStep: (state) => {
      state.step--;
    },
    incrementStep: (state) => {
      state.step++;
    }
  },
  actions: {
  }
};
