const ROOTS = {
  AUTH: "/auth",
  DASHBOARD: "/dashboard",
};

export const paths = {
  auth: {
    login: `/`,
  },

  dashboard: {
    root: ROOTS.DASHBOARD,

    catalogInventory: {
      root: `${ROOTS.DASHBOARD}/catalogInventory`,

      book: `${ROOTS.DASHBOARD}/catalogInventory/book`,

      branch: `${ROOTS.DASHBOARD}/catalogInventory/branch`,

      branchInventory: `${ROOTS.DASHBOARD}/catalogInventory/branchInventory`,

      inventoryAuditLog: `${ROOTS.DASHBOARD}/catalogInventory/inventoryAuditLog`,

      interBranchTransfer: `${ROOTS.DASHBOARD}/catalogInventory/interBranchTransfer`,

      purchaseOrder: `${ROOTS.DASHBOARD}/catalogInventory/purchaseOrder`,

      catalogInventoryShareToken: `${ROOTS.DASHBOARD}/catalogInventory/catalogInventoryShareToken`,
    },

    lending: {
      root: `${ROOTS.DASHBOARD}/lending`,

      loan: `${ROOTS.DASHBOARD}/lending/loan`,

      reservation: `${ROOTS.DASHBOARD}/lending/reservation`,

      loanEvent: `${ROOTS.DASHBOARD}/lending/loanEvent`,

      lendingShareToken: `${ROOTS.DASHBOARD}/lending/lendingShareToken`,
    },

    reviewEngagement: {
      root: `${ROOTS.DASHBOARD}/reviewEngagement`,

      review: `${ROOTS.DASHBOARD}/reviewEngagement/review`,

      recommendation: `${ROOTS.DASHBOARD}/reviewEngagement/recommendation`,

      engagementEvent: `${ROOTS.DASHBOARD}/reviewEngagement/engagementEvent`,

      reviewEngagementShareToken: `${ROOTS.DASHBOARD}/reviewEngagement/reviewEngagementShareToken`,
    },

    payment: {
      root: `${ROOTS.DASHBOARD}/payment`,

      fee: `${ROOTS.DASHBOARD}/payment/fee`,

      feePayment: `${ROOTS.DASHBOARD}/payment/feePayment`,

      feeEvent: `${ROOTS.DASHBOARD}/payment/feeEvent`,

      feePayment: `${ROOTS.DASHBOARD}/payment/feePayment`,

      paymentCustomer: `${ROOTS.DASHBOARD}/payment/paymentCustomer`,

      paymentMethod: `${ROOTS.DASHBOARD}/payment/paymentMethod`,

      paymentShareToken: `${ROOTS.DASHBOARD}/payment/paymentShareToken`,
    },

    analytics: {
      root: `${ROOTS.DASHBOARD}/analytics`,

      analyticSnapshot: `${ROOTS.DASHBOARD}/analytics/analyticSnapshot`,

      auditLog: `${ROOTS.DASHBOARD}/analytics/auditLog`,

      changeStreamEvent: `${ROOTS.DASHBOARD}/analytics/changeStreamEvent`,

      analyticsShareToken: `${ROOTS.DASHBOARD}/analytics/analyticsShareToken`,
    },

    adminOps: {
      root: `${ROOTS.DASHBOARD}/adminOps`,

      branchStaffAssignment: `${ROOTS.DASHBOARD}/adminOps/branchStaffAssignment`,

      issueEscalation: `${ROOTS.DASHBOARD}/adminOps/issueEscalation`,

      mongoAdminConfig: `${ROOTS.DASHBOARD}/adminOps/mongoAdminConfig`,

      externalNotificationConfig: `${ROOTS.DASHBOARD}/adminOps/externalNotificationConfig`,

      systemBackupAudit: `${ROOTS.DASHBOARD}/adminOps/systemBackupAudit`,

      branchPurchaseOrder: `${ROOTS.DASHBOARD}/adminOps/branchPurchaseOrder`,

      tregt: `${ROOTS.DASHBOARD}/adminOps/tregt`,

      adminOpsShareToken: `${ROOTS.DASHBOARD}/adminOps/adminOpsShareToken`,
    },

    auth: {
      root: `${ROOTS.DASHBOARD}/auth`,

      user: `${ROOTS.DASHBOARD}/auth/user`,

      userGroup: `${ROOTS.DASHBOARD}/auth/userGroup`,

      userGroupMember: `${ROOTS.DASHBOARD}/auth/userGroupMember`,

      authShareToken: `${ROOTS.DASHBOARD}/auth/authShareToken`,
    },
  },
};
