const path = require('path');
const cdogsService = require('./cdogsService');
const dataService = require('../services/dataService');
const transformService = require('../services/transformService');

const templateJson = require('../assets/forestry-ipc-template-b.json');

module.exports = {
  generate: async ipcPlanId => {
    const docx = path.join(__dirname, '..', 'assets', 'forestry-ipc-template-l.docx');

    let templateId = await cdogsService.getHash(docx);
    const templateResult = await cdogsService.getTemplate(templateId);
    if (templateResult.status !== 200) {
      const uploadResult = await cdogsService.uploadTemplate(docx);
      templateId = uploadResult.data;
    }

    // ok, have the template... get the data and create the document...
    const ipcPlan = await dataService.getIPCPlan(ipcPlanId);
    const ipcPlanData = transformService.modelToAPI.ipcPlanToPost(ipcPlan);

    const body = { ...templateJson };

    const operationTypes = {
      BRUSHING: 'Brushing',
      CONE_PICKING: 'Cone Picking',
      ENGINEERING: 'Engineering',
      LAYOUT: 'Layout/Timber Cruising',
      LOGGING: 'Logging',
      PRUNING: 'Pruning',
      RESEARCH: 'Research',
      SILVICULTURE: 'Silviculture',
      SPACING: 'Spacing',
      SURVEYING: 'Surveying',
      VEGETATION_MANAGEMENT: 'Vegetation Management',
      WILDFIRE_CAMPS: 'Wildfire Camps',
      OTHER: 'Other'
    };
    // quick fix: update operationType with display name
    body.data = { ...ipcPlanData, ipcPlan : {operationType: operationTypes[ipcPlanData.ipcPlan.operationType] } };

    return await cdogsService.templateRender(templateId, body);
  }
};
