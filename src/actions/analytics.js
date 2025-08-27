import useSWR from "swr";
import { useMemo } from "react";

import { fetcher, analyticsEndpoints } from "src/lib/analytics-axios";

// ----------------------------------------------------------------------

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  revalidateOnMount: true,
};

// ----------------------------------------------------------------------

export function useAnalyticsGetAnalyticSnapshot(analyticSnapshotId) {
  let url = analyticSnapshotId
    ? [analyticsEndpoints.analyticSnapshot.getAnalyticSnapshot]
    : "";

  url =
    url && url.map((u) => u.replace(":analyticSnapshotId", analyticSnapshotId));

  const { data, isLoading, error, isValidating } = useSWR(
    url,
    fetcher,
    swrOptions,
  );

  const memoizedValue = useMemo(
    () => ({
      analyticsnapshot: data?.analyticSnapshot,
      analyticsnapshotLoading: isLoading,
      analyticsnapshotError: error,
      analyticsnapshotValidating: isValidating,
    }),
    [data?.product, error, isLoading, isValidating],
  );

  return memoizedValue;
}

export function useAnalyticsListAnalyticSnapshots() {
  const url = [analyticsEndpoints.analyticSnapshot.listAnalyticSnapshots];

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, {
    ...swrOptions,
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      searchResults: data?.analyticsnapshots || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty:
        !isLoading && !isValidating && !data?.analyticsnapshots?.length,
    }),
    [data?.analyticsnapshots, error, isLoading, isValidating],
  );

  return memoizedValue;
}

export function useAnalyticsGetAuditLog(auditLogId) {
  let url = auditLogId ? [analyticsEndpoints.auditLog.getAuditLog] : "";

  url = url && url.map((u) => u.replace(":auditLogId", auditLogId));

  const { data, isLoading, error, isValidating } = useSWR(
    url,
    fetcher,
    swrOptions,
  );

  const memoizedValue = useMemo(
    () => ({
      auditlog: data?.auditLog,
      auditlogLoading: isLoading,
      auditlogError: error,
      auditlogValidating: isValidating,
    }),
    [data?.product, error, isLoading, isValidating],
  );

  return memoizedValue;
}

export function useAnalyticsListAuditLogs() {
  const url = [analyticsEndpoints.auditLog.listAuditLogs];

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, {
    ...swrOptions,
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      searchResults: data?.auditlogs || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty: !isLoading && !isValidating && !data?.auditlogs?.length,
    }),
    [data?.auditlogs, error, isLoading, isValidating],
  );

  return memoizedValue;
}

export function useAnalyticsGetChangeStreamEvent(changeStreamEventId) {
  let url = changeStreamEventId
    ? [analyticsEndpoints.changeStreamEvent.getChangeStreamEvent]
    : "";

  url =
    url &&
    url.map((u) => u.replace(":changeStreamEventId", changeStreamEventId));

  const { data, isLoading, error, isValidating } = useSWR(
    url,
    fetcher,
    swrOptions,
  );

  const memoizedValue = useMemo(
    () => ({
      changestreamevent: data?.changeStreamEvent,
      changestreameventLoading: isLoading,
      changestreameventError: error,
      changestreameventValidating: isValidating,
    }),
    [data?.product, error, isLoading, isValidating],
  );

  return memoizedValue;
}

export function useAnalyticsListChangeStreamEvents() {
  const url = [analyticsEndpoints.changeStreamEvent.listChangeStreamEvents];

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, {
    ...swrOptions,
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      searchResults: data?.changestreamevents || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty:
        !isLoading && !isValidating && !data?.changestreamevents?.length,
    }),
    [data?.changestreamevents, error, isLoading, isValidating],
  );

  return memoizedValue;
}
