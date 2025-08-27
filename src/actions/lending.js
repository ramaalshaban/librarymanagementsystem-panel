import useSWR from "swr";
import { useMemo } from "react";

import { fetcher, lendingEndpoints } from "src/lib/lending-axios";

// ----------------------------------------------------------------------

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  revalidateOnMount: true,
};

// ----------------------------------------------------------------------

export function useLendingGetLoan(loanId) {
  let url = loanId ? [lendingEndpoints.loan.getLoan] : "";

  url = url && url.map((u) => u.replace(":loanId", loanId));

  const { data, isLoading, error, isValidating } = useSWR(
    url,
    fetcher,
    swrOptions,
  );

  const memoizedValue = useMemo(
    () => ({
      loan: data?.loan,
      loanLoading: isLoading,
      loanError: error,
      loanValidating: isValidating,
    }),
    [data?.product, error, isLoading, isValidating],
  );

  return memoizedValue;
}

export function useLendingListLoans() {
  const url = [lendingEndpoints.loan.listLoans];

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, {
    ...swrOptions,
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      searchResults: data?.loans || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty: !isLoading && !isValidating && !data?.loans?.length,
    }),
    [data?.loans, error, isLoading, isValidating],
  );

  return memoizedValue;
}

export function useLendingGetReservation(reservationId) {
  let url = reservationId ? [lendingEndpoints.reservation.getReservation] : "";

  url = url && url.map((u) => u.replace(":reservationId", reservationId));

  const { data, isLoading, error, isValidating } = useSWR(
    url,
    fetcher,
    swrOptions,
  );

  const memoizedValue = useMemo(
    () => ({
      reservation: data?.reservation,
      reservationLoading: isLoading,
      reservationError: error,
      reservationValidating: isValidating,
    }),
    [data?.product, error, isLoading, isValidating],
  );

  return memoizedValue;
}

export function useLendingListReservations() {
  const url = [lendingEndpoints.reservation.listReservations];

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, {
    ...swrOptions,
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      searchResults: data?.reservations || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty: !isLoading && !isValidating && !data?.reservations?.length,
    }),
    [data?.reservations, error, isLoading, isValidating],
  );

  return memoizedValue;
}

export function useLendingGetLoanEvent(loanEventId) {
  let url = loanEventId ? [lendingEndpoints.loanEvent.getLoanEvent] : "";

  url = url && url.map((u) => u.replace(":loanEventId", loanEventId));

  const { data, isLoading, error, isValidating } = useSWR(
    url,
    fetcher,
    swrOptions,
  );

  const memoizedValue = useMemo(
    () => ({
      loanevent: data?.loanEvent,
      loaneventLoading: isLoading,
      loaneventError: error,
      loaneventValidating: isValidating,
    }),
    [data?.product, error, isLoading, isValidating],
  );

  return memoizedValue;
}

export function useLendingListLoanEvents() {
  const url = [lendingEndpoints.loanEvent.listLoanEvents];

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, {
    ...swrOptions,
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      searchResults: data?.loanevents || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty: !isLoading && !isValidating && !data?.loanevents?.length,
    }),
    [data?.loanevents, error, isLoading, isValidating],
  );

  return memoizedValue;
}
