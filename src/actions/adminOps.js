import useSWR from "swr";
import { useMemo } from "react";

import { fetcher, adminOpsEndpoints } from "src/lib/adminOps-axios";

// ----------------------------------------------------------------------

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  revalidateOnMount: true,
};

// ----------------------------------------------------------------------

export function useAdminOpsGetBranchStaffAssignment(branchStaffAssignmentId) {
  let url = branchStaffAssignmentId
    ? [adminOpsEndpoints.branchStaffAssignment.getBranchStaffAssignment]
    : "";

  url =
    url &&
    url.map((u) =>
      u.replace(":branchStaffAssignmentId", branchStaffAssignmentId),
    );

  const { data, isLoading, error, isValidating } = useSWR(
    url,
    fetcher,
    swrOptions,
  );

  const memoizedValue = useMemo(
    () => ({
      branchstaffassignment: data?.branchStaffAssignment,
      branchstaffassignmentLoading: isLoading,
      branchstaffassignmentError: error,
      branchstaffassignmentValidating: isValidating,
    }),
    [data?.product, error, isLoading, isValidating],
  );

  return memoizedValue;
}

export function useAdminOpsListBranchStaffAssignments() {
  const url = [
    adminOpsEndpoints.branchStaffAssignment.listBranchStaffAssignments,
  ];

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, {
    ...swrOptions,
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      searchResults: data?.branchstaffassignments || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty:
        !isLoading && !isValidating && !data?.branchstaffassignments?.length,
    }),
    [data?.branchstaffassignments, error, isLoading, isValidating],
  );

  return memoizedValue;
}

export function useAdminOpsGetIssueEscalation(issueEscalationId) {
  let url = issueEscalationId
    ? [adminOpsEndpoints.issueEscalation.getIssueEscalation]
    : "";

  url =
    url && url.map((u) => u.replace(":issueEscalationId", issueEscalationId));

  const { data, isLoading, error, isValidating } = useSWR(
    url,
    fetcher,
    swrOptions,
  );

  const memoizedValue = useMemo(
    () => ({
      issueescalation: data?.issueEscalation,
      issueescalationLoading: isLoading,
      issueescalationError: error,
      issueescalationValidating: isValidating,
    }),
    [data?.product, error, isLoading, isValidating],
  );

  return memoizedValue;
}

export function useAdminOpsListIssueEscalations() {
  const url = [adminOpsEndpoints.issueEscalation.listIssueEscalations];

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, {
    ...swrOptions,
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      searchResults: data?.issueescalations || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty:
        !isLoading && !isValidating && !data?.issueescalations?.length,
    }),
    [data?.issueescalations, error, isLoading, isValidating],
  );

  return memoizedValue;
}

export function useAdminOpsGetMongoAdminConfig(mongoAdminConfigId) {
  let url = mongoAdminConfigId
    ? [adminOpsEndpoints.mongoAdminConfig.getMongoAdminConfig]
    : "";

  url =
    url && url.map((u) => u.replace(":mongoAdminConfigId", mongoAdminConfigId));

  const { data, isLoading, error, isValidating } = useSWR(
    url,
    fetcher,
    swrOptions,
  );

  const memoizedValue = useMemo(
    () => ({
      mongoadminconfig: data?.mongoAdminConfig,
      mongoadminconfigLoading: isLoading,
      mongoadminconfigError: error,
      mongoadminconfigValidating: isValidating,
    }),
    [data?.product, error, isLoading, isValidating],
  );

  return memoizedValue;
}

export function useAdminOpsListMongoAdminConfigs() {
  const url = [adminOpsEndpoints.mongoAdminConfig.listMongoAdminConfigs];

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, {
    ...swrOptions,
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      searchResults: data?.mongoadminconfigs || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty:
        !isLoading && !isValidating && !data?.mongoadminconfigs?.length,
    }),
    [data?.mongoadminconfigs, error, isLoading, isValidating],
  );

  return memoizedValue;
}

export function useAdminOpsGetExternalNotificationConfig(
  externalNotificationConfigId,
) {
  let url = externalNotificationConfigId
    ? [
        adminOpsEndpoints.externalNotificationConfig
          .getExternalNotificationConfig,
      ]
    : "";

  url =
    url &&
    url.map((u) =>
      u.replace(":externalNotificationConfigId", externalNotificationConfigId),
    );

  const { data, isLoading, error, isValidating } = useSWR(
    url,
    fetcher,
    swrOptions,
  );

  const memoizedValue = useMemo(
    () => ({
      externalnotificationconfig: data?.externalNotificationConfig,
      externalnotificationconfigLoading: isLoading,
      externalnotificationconfigError: error,
      externalnotificationconfigValidating: isValidating,
    }),
    [data?.product, error, isLoading, isValidating],
  );

  return memoizedValue;
}

export function useAdminOpsListExternalNotificationConfigs() {
  const url = [
    adminOpsEndpoints.externalNotificationConfig
      .listExternalNotificationConfigs,
  ];

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, {
    ...swrOptions,
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      searchResults: data?.externalnotificationconfigs || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty:
        !isLoading &&
        !isValidating &&
        !data?.externalnotificationconfigs?.length,
    }),
    [data?.externalnotificationconfigs, error, isLoading, isValidating],
  );

  return memoizedValue;
}

export function useAdminOpsGetSystemBackupAudit(systemBackupAuditId) {
  let url = systemBackupAuditId
    ? [adminOpsEndpoints.systemBackupAudit.getSystemBackupAudit]
    : "";

  url =
    url &&
    url.map((u) => u.replace(":systemBackupAuditId", systemBackupAuditId));

  const { data, isLoading, error, isValidating } = useSWR(
    url,
    fetcher,
    swrOptions,
  );

  const memoizedValue = useMemo(
    () => ({
      systembackupaudit: data?.systemBackupAudit,
      systembackupauditLoading: isLoading,
      systembackupauditError: error,
      systembackupauditValidating: isValidating,
    }),
    [data?.product, error, isLoading, isValidating],
  );

  return memoizedValue;
}

export function useAdminOpsListSystemBackupAudits() {
  const url = [adminOpsEndpoints.systemBackupAudit.listSystemBackupAudits];

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, {
    ...swrOptions,
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      searchResults: data?.systembackupaudits || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty:
        !isLoading && !isValidating && !data?.systembackupaudits?.length,
    }),
    [data?.systembackupaudits, error, isLoading, isValidating],
  );

  return memoizedValue;
}

export function useAdminOpsGetBranchPurchaseOrder(branchPurchaseOrderId) {
  let url = branchPurchaseOrderId
    ? [adminOpsEndpoints.branchPurchaseOrder.getBranchPurchaseOrder]
    : "";

  url =
    url &&
    url.map((u) => u.replace(":branchPurchaseOrderId", branchPurchaseOrderId));

  const { data, isLoading, error, isValidating } = useSWR(
    url,
    fetcher,
    swrOptions,
  );

  const memoizedValue = useMemo(
    () => ({
      branchpurchaseorder: data?.branchPurchaseOrder,
      branchpurchaseorderLoading: isLoading,
      branchpurchaseorderError: error,
      branchpurchaseorderValidating: isValidating,
    }),
    [data?.product, error, isLoading, isValidating],
  );

  return memoizedValue;
}

export function useAdminOpsListBranchPurchaseOrders() {
  const url = [adminOpsEndpoints.branchPurchaseOrder.listBranchPurchaseOrders];

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, {
    ...swrOptions,
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      searchResults: data?.branchpurchaseorders || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty:
        !isLoading && !isValidating && !data?.branchpurchaseorders?.length,
    }),
    [data?.branchpurchaseorders, error, isLoading, isValidating],
  );

  return memoizedValue;
}
