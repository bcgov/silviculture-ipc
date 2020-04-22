const transformService = {

  confirmationId: ipcPlan => ipcPlan ? ipcPlan.ipcPlanId.split('-')[0].toUpperCase() : undefined,

  ipcResult: (business, contacts, ipcPlan) => {
    return {
      confirmationId: transformService.confirmationId(ipcPlan),
      business: business,
      contacts: contacts,
      ipcPlan: ipcPlan
    };
  },

  transformBusiness: obj =>{
    if (!obj) {
      return undefined;
    }
    const biz = {...obj.dataValues};

    const contacts = biz.Contacts.map(c => {
      return {...c.dataValues};
    });
    delete biz.Contacts;

    const ipcPlan = {...biz.IPCPlan.dataValues};
    delete biz.IPCPlan;

    return transformService.ipcResult(biz, contacts, ipcPlan);
  },

  transformIPCPlan: obj => {
    if (!obj) {
      return undefined;
    }
    const ipcPlan = {...obj.dataValues};

    const biz = {...ipcPlan.Business.dataValues};

    const contacts = biz.Contacts.map(c => {
      return {...c.dataValues};
    });
    delete biz.Contacts;
    delete ipcPlan.Business;

    return transformService.ipcResult(biz, contacts, ipcPlan);
  },

  transformIPCPlanMeta: obj => {
    if (!obj) {
      return undefined;
    }
    const ipcPlan = {...obj.dataValues};

    const biz = {...ipcPlan.Business.dataValues};
    delete ipcPlan.Business;

    return transformService.ipcResult(biz, undefined, ipcPlan);
  },

  transformIPCPlans: obj => {
    if (!obj) {
      return [];
    }
    if (!Array.isArray(obj)) {
      return [transformService.transformIPCPlan(obj)];
    } else {
      return obj.map(o => transformService.transformIPCPlan(o));
    }
  },

  transformIPCPlansMeta: obj => {
    if (!obj) {
      return [];
    }
    if (!Array.isArray(obj)) {
      return [transformService.transformIPCPlanMeta(obj)];
    } else {
      return obj.map(o => transformService.transformIPCPlanMeta(o));
    }
  }

};

module.exports = transformService;
