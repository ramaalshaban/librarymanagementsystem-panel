import axios from "axios";

import { CONFIG } from "src/global-config";

const analyticsAxiosInstance = axios.create({
  baseURL: CONFIG.analyticsServiceUrl,
});

analyticsAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong!",
    ),
);

export default analyticsAxiosInstance;

export const fetcher = async (args) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];

    const res = await analyticsAxiosInstance.get(url, { ...config });

    return res.data;
  } catch (error) {
    console.error("Failed to fetch:", error);
    throw error;
  }
};

export const analyticsEndpoints = {
  analyticSnapshot: {
    getAnalyticSnapshot: "/analyticsnapshots/:analyticSnapshotId",
    createAnalyticSnapshot: "/analyticsnapshots",
    updateAnalyticSnapshot: "/analyticsnapshots/:analyticSnapshotId",
    deleteAnalyticSnapshot: "/analyticsnapshots/:analyticSnapshotId",
    listAnalyticSnapshots: "/analyticsnapshots",
  },

  auditLog: {
    getAuditLog: "/auditlogs/:auditLogId",
    createAuditLog: "/auditlogs",
    updateAuditLog: "/auditlogs/:auditLogId",
    deleteAuditLog: "/auditlogs/:auditLogId",
    listAuditLogs: "/auditlogs",
  },

  changeStreamEvent: {
    getChangeStreamEvent: "/changestreamevents/:changeStreamEventId",
    createChangeStreamEvent: "/changestreamevents",
    deleteChangeStreamEvent: "/changestreamevents/:changeStreamEventId",
    listChangeStreamEvents: "/changestreamevents",
  },

  analyticsShareToken: {},
};
