import axios from "axios";

import { CONFIG } from "src/global-config";

const lendingAxiosInstance = axios.create({
  baseURL: CONFIG.lendingServiceUrl,
});

lendingAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong!",
    ),
);

export default lendingAxiosInstance;

export const fetcher = async (args) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];

    const res = await lendingAxiosInstance.get(url, { ...config });

    return res.data;
  } catch (error) {
    console.error("Failed to fetch:", error);
    throw error;
  }
};

export const lendingEndpoints = {
  loan: {
    getLoan: "/loans/:loanId",
    createLoan: "/loans",
    updateLoan: "/loans/:loanId",
    deleteLoan: "/loans/:loanId",
    listLoans: "/loans",
  },

  reservation: {
    getReservation: "/reservations/:reservationId",
    createReservation: "/reservations",
    updateReservation: "/reservations/:reservationId",
    deleteReservation: "/reservations/:reservationId",
    listReservations: "/reservations",
  },

  loanEvent: {
    getLoanEvent: "/loanevents/:loanEventId",
    createLoanEvent: "/loanevents",
    updateLoanEvent: "/loanevents/:loanEventId",
    deleteLoanEvent: "/loanevents/:loanEventId",
    listLoanEvents: "/loanevents",
  },

  lendingShareToken: {},
};
