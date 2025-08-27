import useSWR from "swr";
import { useMemo } from "react";

import {
  fetcher,
  catalogInventoryEndpoints,
} from "src/lib/catalogInventory-axios";

// ----------------------------------------------------------------------

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  revalidateOnMount: true,
};

// ----------------------------------------------------------------------

export function useCatalogInventoryGetBook(bookId) {
  let url = bookId ? [catalogInventoryEndpoints.book.getBook] : "";

  url = url && url.map((u) => u.replace(":bookId", bookId));

  const { data, isLoading, error, isValidating } = useSWR(
    url,
    fetcher,
    swrOptions,
  );

  const memoizedValue = useMemo(
    () => ({
      book: data?.book,
      bookLoading: isLoading,
      bookError: error,
      bookValidating: isValidating,
    }),
    [data?.product, error, isLoading, isValidating],
  );

  return memoizedValue;
}

export function useCatalogInventoryListBooks() {
  const url = [catalogInventoryEndpoints.book.listBooks];

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, {
    ...swrOptions,
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      searchResults: data?.books || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty: !isLoading && !isValidating && !data?.books?.length,
    }),
    [data?.books, error, isLoading, isValidating],
  );

  return memoizedValue;
}

export function useCatalogInventoryGetBranch(branchId) {
  let url = branchId ? [catalogInventoryEndpoints.branch.getBranch] : "";

  url = url && url.map((u) => u.replace(":branchId", branchId));

  const { data, isLoading, error, isValidating } = useSWR(
    url,
    fetcher,
    swrOptions,
  );

  const memoizedValue = useMemo(
    () => ({
      branch: data?.branch,
      branchLoading: isLoading,
      branchError: error,
      branchValidating: isValidating,
    }),
    [data?.product, error, isLoading, isValidating],
  );

  return memoizedValue;
}

export function useCatalogInventoryListBranches() {
  const url = [catalogInventoryEndpoints.branch.listBranches];

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, {
    ...swrOptions,
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      searchResults: data?.branches || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty: !isLoading && !isValidating && !data?.branches?.length,
    }),
    [data?.branches, error, isLoading, isValidating],
  );

  return memoizedValue;
}

export function useCatalogInventoryGetBranchInventory(branchInventoryId) {
  let url = branchInventoryId
    ? [catalogInventoryEndpoints.branchInventory.getBranchInventory]
    : "";

  url =
    url && url.map((u) => u.replace(":branchInventoryId", branchInventoryId));

  const { data, isLoading, error, isValidating } = useSWR(
    url,
    fetcher,
    swrOptions,
  );

  const memoizedValue = useMemo(
    () => ({
      branchinventory: data?.branchInventory,
      branchinventoryLoading: isLoading,
      branchinventoryError: error,
      branchinventoryValidating: isValidating,
    }),
    [data?.product, error, isLoading, isValidating],
  );

  return memoizedValue;
}

export function useCatalogInventoryListBranchInventories() {
  const url = [catalogInventoryEndpoints.branchInventory.listBranchInventories];

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, {
    ...swrOptions,
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      searchResults: data?.branchinventories || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty:
        !isLoading && !isValidating && !data?.branchinventories?.length,
    }),
    [data?.branchinventories, error, isLoading, isValidating],
  );

  return memoizedValue;
}

export function useCatalogInventoryGetInventoryAuditLog(inventoryAuditLogId) {
  let url = inventoryAuditLogId
    ? [catalogInventoryEndpoints.inventoryAuditLog.getInventoryAuditLog]
    : "";

  url =
    url &&
    url.map((u) => u.replace(":inventoryAuditLogId", inventoryAuditLogId));

  const { data, isLoading, error, isValidating } = useSWR(
    url,
    fetcher,
    swrOptions,
  );

  const memoizedValue = useMemo(
    () => ({
      inventoryauditlog: data?.inventoryAuditLog,
      inventoryauditlogLoading: isLoading,
      inventoryauditlogError: error,
      inventoryauditlogValidating: isValidating,
    }),
    [data?.product, error, isLoading, isValidating],
  );

  return memoizedValue;
}

export function useCatalogInventoryListInventoryAuditLogs() {
  const url = [
    catalogInventoryEndpoints.inventoryAuditLog.listInventoryAuditLogs,
  ];

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, {
    ...swrOptions,
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      searchResults: data?.inventoryauditlogs || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty:
        !isLoading && !isValidating && !data?.inventoryauditlogs?.length,
    }),
    [data?.inventoryauditlogs, error, isLoading, isValidating],
  );

  return memoizedValue;
}

export function useCatalogInventoryGetInterBranchTransfer(
  interBranchTransferId,
) {
  let url = interBranchTransferId
    ? [catalogInventoryEndpoints.interBranchTransfer.getInterBranchTransfer]
    : "";

  url =
    url &&
    url.map((u) => u.replace(":interBranchTransferId", interBranchTransferId));

  const { data, isLoading, error, isValidating } = useSWR(
    url,
    fetcher,
    swrOptions,
  );

  const memoizedValue = useMemo(
    () => ({
      interbranchtransfer: data?.interBranchTransfer,
      interbranchtransferLoading: isLoading,
      interbranchtransferError: error,
      interbranchtransferValidating: isValidating,
    }),
    [data?.product, error, isLoading, isValidating],
  );

  return memoizedValue;
}

export function useCatalogInventoryListInterBranchTransfers() {
  const url = [
    catalogInventoryEndpoints.interBranchTransfer.listInterBranchTransfers,
  ];

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, {
    ...swrOptions,
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      searchResults: data?.interbranchtransfers || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty:
        !isLoading && !isValidating && !data?.interbranchtransfers?.length,
    }),
    [data?.interbranchtransfers, error, isLoading, isValidating],
  );

  return memoizedValue;
}

export function useCatalogInventoryGetPurchaseOrder(purchaseOrderId) {
  let url = purchaseOrderId
    ? [catalogInventoryEndpoints.purchaseOrder.getPurchaseOrder]
    : "";

  url = url && url.map((u) => u.replace(":purchaseOrderId", purchaseOrderId));

  const { data, isLoading, error, isValidating } = useSWR(
    url,
    fetcher,
    swrOptions,
  );

  const memoizedValue = useMemo(
    () => ({
      purchaseorder: data?.purchaseOrder,
      purchaseorderLoading: isLoading,
      purchaseorderError: error,
      purchaseorderValidating: isValidating,
    }),
    [data?.product, error, isLoading, isValidating],
  );

  return memoizedValue;
}

export function useCatalogInventoryListPurchaseOrders() {
  const url = [catalogInventoryEndpoints.purchaseOrder.listPurchaseOrders];

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, {
    ...swrOptions,
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      searchResults: data?.purchaseorders || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty: !isLoading && !isValidating && !data?.purchaseorders?.length,
    }),
    [data?.purchaseorders, error, isLoading, isValidating],
  );

  return memoizedValue;
}
