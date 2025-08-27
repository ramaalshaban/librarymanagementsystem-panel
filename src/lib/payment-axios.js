import axios from "axios";

import { CONFIG } from "src/global-config";

const paymentAxiosInstance = axios.create({
  baseURL: CONFIG.paymentServiceUrl,
});

paymentAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong!",
    ),
);

export default paymentAxiosInstance;

export const fetcher = async (args) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];

    const res = await paymentAxiosInstance.get(url, { ...config });

    return res.data;
  } catch (error) {
    console.error("Failed to fetch:", error);
    throw error;
  }
};

export const paymentEndpoints = {
  fee: {
    getFee: "/fees/:feeId",
    createFee: "/fees",
    updateFee: "/fees/:feeId",
    deleteFee: "/fees/:feeId",
    listFees: "/fees",
    checkoutstartFee: "/startcheckout/fee/:feeId",
    checkoutcompleteFee: "/completecheckout/fee/:feeId",
    checkoutrefreshFee: "/refreshcheckout/fee/:feeId",
  },

  feePayment: {
    getFeePayment: "/feepayments/:feePaymentId",
    createFeePayment: "/feepayments",
    updateFeePayment: "/feepayments/:feePaymentId",
    deleteFeePayment: "/feepayments/:feePaymentId",
    listFeePayments: "/feepayments",
  },

  feeEvent: {
    getFeeEvent: "/feeevents/:feeEventId",
    createFeeEvent: "/feeevents",
    updateFeeEvent: "/feeevents/:feeEventId",
    deleteFeeEvent: "/feeevents/:feeEventId",
    listFeeEvents: "/feeevents",
  },

  feePayment: {
    getPayment: "/payment/:feePaymentId",
    getPaymentByOrderId: "/paymentbyorderid/:feePaymentId",
    getPaymentByPaymentId: "/paymentbypaymentid/:feePaymentId",
    createPayment: "/payment",
    updatePayment: "/payment/:feePaymentId",
    listPayments: "/payments",
    deletePayment: "/payment/:feePaymentId",
  },

  paymentCustomer: {
    getCustomerByUserId: "/paymentcustomers/:userId",
    listCustomers: "/customers",
  },

  paymentMethod: {
    listethods: "/listethods",
  },

  paymentShareToken: {},
};
