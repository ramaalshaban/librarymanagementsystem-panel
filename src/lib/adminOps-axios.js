import axios from "axios";

import { CONFIG } from "src/global-config";

const adminOpsAxiosInstance = axios.create({
  baseURL: CONFIG.adminOpsServiceUrl,
});

adminOpsAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong!",
    ),
);

export default adminOpsAxiosInstance;

export const fetcher = async (args) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];

    const res = await adminOpsAxiosInstance.get(url, { ...config });

    return res.data;
  } catch (error) {
    console.error("Failed to fetch:", error);
    throw error;
  }
};

export const adminOpsEndpoints = {
  branchStaffAssignment: {
    getBranchStaffAssignment:
      "/branchstaffassignments/:branchStaffAssignmentId",
    createBranchStaffAssignment: "/branchstaffassignments",
    updateBranchStaffAssignment:
      "/branchstaffassignments/:branchStaffAssignmentId",
    deleteBranchStaffAssignment:
      "/branchstaffassignments/:branchStaffAssignmentId",
    listBranchStaffAssignments: "/branchstaffassignments",
  },

  issueEscalation: {
    getIssueEscalation: "/issueescalations/:issueEscalationId",
    createIssueEscalation: "/issueescalations",
    updateIssueEscalation: "/issueescalations/:issueEscalationId",
    deleteIssueEscalation: "/issueescalations/:issueEscalationId",
    listIssueEscalations: "/issueescalations",
  },

  mongoAdminConfig: {
    getMongoAdminConfig: "/mongoadminconfigs/:mongoAdminConfigId",
    createMongoAdminConfig: "/mongoadminconfigs",
    updateMongoAdminConfig: "/mongoadminconfigs/:mongoAdminConfigId",
    deleteMongoAdminConfig: "/mongoadminconfigs/:mongoAdminConfigId",
    listMongoAdminConfigs: "/mongoadminconfigs",
  },

  externalNotificationConfig: {
    getExternalNotificationConfig:
      "/externalnotificationconfigs/:externalNotificationConfigId",
    createExternalNotificationConfig: "/externalnotificationconfigs",
    updateExternalNotificationConfig:
      "/externalnotificationconfigs/:externalNotificationConfigId",
    deleteExternalNotificationConfig:
      "/externalnotificationconfigs/:externalNotificationConfigId",
    listExternalNotificationConfigs: "/externalnotificationconfigs",
  },

  systemBackupAudit: {
    getSystemBackupAudit: "/systembackupaudits/:systemBackupAuditId",
    createSystemBackupAudit: "/systembackupaudits",
    updateSystemBackupAudit: "/systembackupaudits/:systemBackupAuditId",
    deleteSystemBackupAudit: "/systembackupaudits/:systemBackupAuditId",
    listSystemBackupAudits: "/systembackupaudits",
  },

  branchPurchaseOrder: {
    getBranchPurchaseOrder: "/branchpurchaseorders/:branchPurchaseOrderId",
    createBranchPurchaseOrder: "/branchpurchaseorders",
    updateBranchPurchaseOrder: "/branchpurchaseorders/:branchPurchaseOrderId",
    deleteBranchPurchaseOrder: "/branchpurchaseorders/:branchPurchaseOrderId",
    listBranchPurchaseOrders: "/branchpurchaseorders",
  },

  tregt: {},

  adminOpsShareToken: {},
};
