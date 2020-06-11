export const ApiRoutes = Object.freeze({
  EMAIL: '/email',
  IPC: '/ipc'
});

export const SilvipcRoles = Object.freeze({
  DEVELOPER: 'developer',
  INSPECTOR: 'inspector'
});

export const Statuses = Object.freeze({
  SUBMITTED: 'Submitted',
  ASSIGNED: 'Assigned',
  SCHEDULED: 'Scheduled',
  FOLLOWUP: 'Follow-up',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled'
});

export const OperationTypes = Object.freeze([
  { type: 'BRUSHING', display: 'Brushing', enabled: true },
  { type: 'CONE_PICKING', display: 'Cone Picking', enabled: true },
  { type: 'ENGINEERING', display: 'Engineering', enabled: true },
  { type: 'LAYOUT', display: 'Layout/Timber Cruising', enabled: true },
  { type: 'LOGGING', display: 'Logging', enabled: true },
  { type: 'PRUNING', display: 'Pruning', enabled: true },
  { type: 'RESEARCH', display: 'Research', enabled: true },
  { type: 'SILVICULTURE', display: 'Silviculture', enabled: true },
  { type: 'SPACING', display: 'Spacing', enabled: true },
  { type: 'SURVEYING', display: 'Surveying', enabled: true },
  { type: 'VEGETATION_MANAGEMENT', display: 'Vegetation Management', enabled: true },
  { type: 'WILDFIRE_CAMPS', display: 'Wildfire Camps', enabled: true },
  { type: 'OTHER', display: 'Other', enabled: true }
]);
