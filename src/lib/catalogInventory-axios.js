import axios from "axios";

import { CONFIG } from "src/global-config";

const catalogInventoryAxiosInstance = axios.create({
  baseURL: CONFIG.catalogInventoryServiceUrl,
});

catalogInventoryAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong!",
    ),
);

export default catalogInventoryAxiosInstance;

export const fetcher = async (args) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];

    const res = await catalogInventoryAxiosInstance.get(url, { ...config });

    return res.data;
  } catch (error) {
    console.error("Failed to fetch:", error);
    throw error;
  }
};

export const catalogInventoryEndpoints = {
  book: {
    getBook: "/books/:bookId",
    createBook: "/books",
    updateBook: "/books/:bookId",
    deleteBook: "/books/:bookId",
    listBooks: "/books",
  },

  branch: {
    getBranch: "/branches/:branchId",
    createBranch: "/branches",
    updateBranch: "/branches/:branchId",
    deleteBranch: "/branches/:branchId",
    listBranches: "/branches",
  },

  branchInventory: {
    getBranchInventory: "/branchinventories/:branchInventoryId",
    createBranchInventory: "/branchinventories",
    updateBranchInventory: "/branchinventories/:branchInventoryId",
    deleteBranchInventory: "/branchinventories/:branchInventoryId",
    listBranchInventories: "/branchinventories",
  },

  inventoryAuditLog: {
    getInventoryAuditLog: "/inventoryauditlogs/:inventoryAuditLogId",
    createInventoryAuditLog: "/inventoryauditlogs",
    updateInventoryAuditLog: "/inventoryauditlogs/:inventoryAuditLogId",
    deleteInventoryAuditLog: "/inventoryauditlogs/:inventoryAuditLogId",
    listInventoryAuditLogs: "/inventoryauditlogs",
  },

  interBranchTransfer: {
    getInterBranchTransfer: "/interbranchtransfers/:interBranchTransferId",
    createInterBranchTransfer: "/interbranchtransfers",
    updateInterBranchTransfer: "/interbranchtransfers/:interBranchTransferId",
    deleteInterBranchTransfer: "/interbranchtransfers/:interBranchTransferId",
    listInterBranchTransfers: "/interbranchtransfers",
  },

  purchaseOrder: {
    getPurchaseOrder: "/purchaseorders/:purchaseOrderId",
    createPurchaseOrder: "/purchaseorders",
    updatePurchaseOrder: "/purchaseorders/:purchaseOrderId",
    deletePurchaseOrder: "/purchaseorders/:purchaseOrderId",
    listPurchaseOrders: "/purchaseorders",
  },

  catalogInventoryShareToken: {},
};
