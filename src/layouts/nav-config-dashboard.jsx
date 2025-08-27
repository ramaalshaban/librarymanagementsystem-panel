import { paths } from "src/routes/paths";

import { CONFIG } from "src/global-config";

import { SvgColor } from "src/components/svg-color";

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`${CONFIG.assetsDir}/assets/icons/navbar/${name}.svg`} />
);

const ICONS = {
  folder: icon("ic-folder"),
  dashboard: icon("ic-dashboard"),
};

// ----------------------------------------------------------------------

export const navData = [
  {
    items: [
      {
        title: "Admin Panel",
        path: paths.dashboard.root,
        icon: ICONS.dashboard,
      },
    ],
  },
  {
    subheader: "Modules",
    items: [
      {
        title: "CatalogInventory Module",
        path: paths.dashboard.catalogInventory.root,
        icon: ICONS.folder,

        children: [
          {
            title: "Book Data",
            path: paths.dashboard.catalogInventory.book,
          },

          {
            title: "Branch Data",
            path: paths.dashboard.catalogInventory.branch,
          },

          {
            title: "BranchInventory Data",
            path: paths.dashboard.catalogInventory.branchInventory,
          },

          {
            title: "InventoryAuditLog Data",
            path: paths.dashboard.catalogInventory.inventoryAuditLog,
          },

          {
            title: "InterBranchTransfer Data",
            path: paths.dashboard.catalogInventory.interBranchTransfer,
          },

          {
            title: "PurchaseOrder Data",
            path: paths.dashboard.catalogInventory.purchaseOrder,
          },

          {
            title: "CatalogInventoryShareToken Data",
            path: paths.dashboard.catalogInventory.catalogInventoryShareToken,
          },
        ],
      },

      {
        title: "Lending Module",
        path: paths.dashboard.lending.root,
        icon: ICONS.folder,

        children: [
          {
            title: "Loan Data",
            path: paths.dashboard.lending.loan,
          },

          {
            title: "Reservation Data",
            path: paths.dashboard.lending.reservation,
          },

          {
            title: "LoanEvent Data",
            path: paths.dashboard.lending.loanEvent,
          },

          {
            title: "LendingShareToken Data",
            path: paths.dashboard.lending.lendingShareToken,
          },
        ],
      },

      {
        title: "ReviewEngagement Module",
        path: paths.dashboard.reviewEngagement.root,
        icon: ICONS.folder,

        children: [
          {
            title: "Review Data",
            path: paths.dashboard.reviewEngagement.review,
          },

          {
            title: "Recommendation Data",
            path: paths.dashboard.reviewEngagement.recommendation,
          },

          {
            title: "EngagementEvent Data",
            path: paths.dashboard.reviewEngagement.engagementEvent,
          },

          {
            title: "ReviewEngagementShareToken Data",
            path: paths.dashboard.reviewEngagement.reviewEngagementShareToken,
          },
        ],
      },

      {
        title: "Payment Module",
        path: paths.dashboard.payment.root,
        icon: ICONS.folder,

        children: [
          {
            title: "Fee Data",
            path: paths.dashboard.payment.fee,
          },

          {
            title: "FeePayment Data",
            path: paths.dashboard.payment.feePayment,
          },

          {
            title: "FeeEvent Data",
            path: paths.dashboard.payment.feeEvent,
          },

          {
            title: "FeePayment Data",
            path: paths.dashboard.payment.feePayment,
          },

          {
            title: "PaymentCustomer Data",
            path: paths.dashboard.payment.paymentCustomer,
          },

          {
            title: "PaymentMethod Data",
            path: paths.dashboard.payment.paymentMethod,
          },

          {
            title: "PaymentShareToken Data",
            path: paths.dashboard.payment.paymentShareToken,
          },
        ],
      },

      {
        title: "Analytics Module",
        path: paths.dashboard.analytics.root,
        icon: ICONS.folder,

        children: [
          {
            title: "AnalyticSnapshot Data",
            path: paths.dashboard.analytics.analyticSnapshot,
          },

          {
            title: "AuditLog Data",
            path: paths.dashboard.analytics.auditLog,
          },

          {
            title: "ChangeStreamEvent Data",
            path: paths.dashboard.analytics.changeStreamEvent,
          },

          {
            title: "AnalyticsShareToken Data",
            path: paths.dashboard.analytics.analyticsShareToken,
          },
        ],
      },

      {
        title: "AdminOps Module",
        path: paths.dashboard.adminOps.root,
        icon: ICONS.folder,

        children: [
          {
            title: "BranchStaffAssignment Data",
            path: paths.dashboard.adminOps.branchStaffAssignment,
          },

          {
            title: "IssueEscalation Data",
            path: paths.dashboard.adminOps.issueEscalation,
          },

          {
            title: "MongoAdminConfig Data",
            path: paths.dashboard.adminOps.mongoAdminConfig,
          },

          {
            title: "ExternalNotificationConfig Data",
            path: paths.dashboard.adminOps.externalNotificationConfig,
          },

          {
            title: "SystemBackupAudit Data",
            path: paths.dashboard.adminOps.systemBackupAudit,
          },

          {
            title: "BranchPurchaseOrder Data",
            path: paths.dashboard.adminOps.branchPurchaseOrder,
          },

          {
            title: "Tregt Data",
            path: paths.dashboard.adminOps.tregt,
          },

          {
            title: "AdminOpsShareToken Data",
            path: paths.dashboard.adminOps.adminOpsShareToken,
          },
        ],
      },

      {
        title: "Auth Module",
        path: paths.dashboard.auth.root,
        icon: ICONS.folder,

        children: [
          {
            title: "User Data",
            path: paths.dashboard.auth.user,
          },

          {
            title: "UserGroup Data",
            path: paths.dashboard.auth.userGroup,
          },

          {
            title: "UserGroupMember Data",
            path: paths.dashboard.auth.userGroupMember,
          },

          {
            title: "AuthShareToken Data",
            path: paths.dashboard.auth.authShareToken,
          },
        ],
      },
    ],
  },
];
