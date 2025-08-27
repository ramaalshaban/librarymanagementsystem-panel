import useSWR from "swr";
import { useMemo } from "react";

import { fetcher, paymentEndpoints } from "src/lib/payment-axios";

// ----------------------------------------------------------------------

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  revalidateOnMount: true,
};

// ----------------------------------------------------------------------

export function usePaymentGetFee(feeId) {
  let url = feeId ? [paymentEndpoints.fee.getFee] : "";

  url = url && url.map((u) => u.replace(":feeId", feeId));

  const { data, isLoading, error, isValidating } = useSWR(
    url,
    fetcher,
    swrOptions,
  );

  const memoizedValue = useMemo(
    () => ({
      fee: data?.fee,
      feeLoading: isLoading,
      feeError: error,
      feeValidating: isValidating,
    }),
    [data?.product, error, isLoading, isValidating],
  );

  return memoizedValue;
}

export function usePaymentListFees() {
  const url = [paymentEndpoints.fee.listFees];

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, {
    ...swrOptions,
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      searchResults: data?.fees || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty: !isLoading && !isValidating && !data?.fees?.length,
    }),
    [data?.fees, error, isLoading, isValidating],
  );

  return memoizedValue;
}

export function usePaymentGetFeePayment(feePaymentId) {
  let url = feePaymentId ? [paymentEndpoints.feePayment.getFeePayment] : "";

  url = url && url.map((u) => u.replace(":feePaymentId", feePaymentId));

  const { data, isLoading, error, isValidating } = useSWR(
    url,
    fetcher,
    swrOptions,
  );

  const memoizedValue = useMemo(
    () => ({
      feepayment: data?.feePayment,
      feepaymentLoading: isLoading,
      feepaymentError: error,
      feepaymentValidating: isValidating,
    }),
    [data?.product, error, isLoading, isValidating],
  );

  return memoizedValue;
}

export function usePaymentListFeePayments() {
  const url = [paymentEndpoints.feePayment.listFeePayments];

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, {
    ...swrOptions,
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      searchResults: data?.feepayments || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty: !isLoading && !isValidating && !data?.feepayments?.length,
    }),
    [data?.feepayments, error, isLoading, isValidating],
  );

  return memoizedValue;
}

export function usePaymentGetFeeEvent(feeEventId) {
  let url = feeEventId ? [paymentEndpoints.feeEvent.getFeeEvent] : "";

  url = url && url.map((u) => u.replace(":feeEventId", feeEventId));

  const { data, isLoading, error, isValidating } = useSWR(
    url,
    fetcher,
    swrOptions,
  );

  const memoizedValue = useMemo(
    () => ({
      feeevent: data?.feeEvent,
      feeeventLoading: isLoading,
      feeeventError: error,
      feeeventValidating: isValidating,
    }),
    [data?.product, error, isLoading, isValidating],
  );

  return memoizedValue;
}

export function usePaymentListFeeEvents() {
  const url = [paymentEndpoints.feeEvent.listFeeEvents];

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, {
    ...swrOptions,
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      searchResults: data?.feeevents || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty: !isLoading && !isValidating && !data?.feeevents?.length,
    }),
    [data?.feeevents, error, isLoading, isValidating],
  );

  return memoizedValue;
}

export function usePaymentGetPayment(feePaymentId) {
  let url = feePaymentId ? [paymentEndpoints.feePayment.getPayment] : "";

  url = url && url.map((u) => u.replace(":feePaymentId", feePaymentId));

  const { data, isLoading, error, isValidating } = useSWR(
    url,
    fetcher,
    swrOptions,
  );

  const memoizedValue = useMemo(
    () => ({
      payment: data?.feePayment,
      paymentLoading: isLoading,
      paymentError: error,
      paymentValidating: isValidating,
    }),
    [data?.product, error, isLoading, isValidating],
  );

  return memoizedValue;
}

export function usePaymentGetPaymentByOrderId(feePaymentId) {
  let url = feePaymentId
    ? [paymentEndpoints.feePayment.getPaymentByOrderId]
    : "";

  url = url && url.map((u) => u.replace(":feePaymentId", feePaymentId));

  const { data, isLoading, error, isValidating } = useSWR(
    url,
    fetcher,
    swrOptions,
  );

  const memoizedValue = useMemo(
    () => ({
      paymentbyorderid: data?.feePayment,
      paymentbyorderidLoading: isLoading,
      paymentbyorderidError: error,
      paymentbyorderidValidating: isValidating,
    }),
    [data?.product, error, isLoading, isValidating],
  );

  return memoizedValue;
}

export function usePaymentGetPaymentByPaymentId(feePaymentId) {
  let url = feePaymentId
    ? [paymentEndpoints.feePayment.getPaymentByPaymentId]
    : "";

  url = url && url.map((u) => u.replace(":feePaymentId", feePaymentId));

  const { data, isLoading, error, isValidating } = useSWR(
    url,
    fetcher,
    swrOptions,
  );

  const memoizedValue = useMemo(
    () => ({
      paymentbypaymentid: data?.feePayment,
      paymentbypaymentidLoading: isLoading,
      paymentbypaymentidError: error,
      paymentbypaymentidValidating: isValidating,
    }),
    [data?.product, error, isLoading, isValidating],
  );

  return memoizedValue;
}

export function usePaymentListPayments() {
  const url = [paymentEndpoints.feePayment.listPayments];

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, {
    ...swrOptions,
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      searchResults: data?.feepayments || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty: !isLoading && !isValidating && !data?.feepayments?.length,
    }),
    [data?.feepayments, error, isLoading, isValidating],
  );

  return memoizedValue;
}

export function usePaymentGetCustomerByUserId(userId) {
  let url = userId
    ? [paymentEndpoints.paymentCustomer.getCustomerByUserId]
    : "";

  url = url && url.map((u) => u.replace(":userId", userId));

  const { data, isLoading, error, isValidating } = useSWR(
    url,
    fetcher,
    swrOptions,
  );

  const memoizedValue = useMemo(
    () => ({
      customerbyuserid: data?.paymentCustomer,
      customerbyuseridLoading: isLoading,
      customerbyuseridError: error,
      customerbyuseridValidating: isValidating,
    }),
    [data?.product, error, isLoading, isValidating],
  );

  return memoizedValue;
}

export function usePaymentListCustomers() {
  const url = [paymentEndpoints.paymentCustomer.listCustomers];

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, {
    ...swrOptions,
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      searchResults: data?.paymentcustomers || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty:
        !isLoading && !isValidating && !data?.paymentcustomers?.length,
    }),
    [data?.paymentcustomers, error, isLoading, isValidating],
  );

  return memoizedValue;
}

export function usePaymentListethods() {
  const url = [paymentEndpoints.paymentMethod.listethods];

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, {
    ...swrOptions,
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      searchResults: data?.paymentmethods || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty: !isLoading && !isValidating && !data?.paymentmethods?.length,
    }),
    [data?.paymentmethods, error, isLoading, isValidating],
  );

  return memoizedValue;
}
