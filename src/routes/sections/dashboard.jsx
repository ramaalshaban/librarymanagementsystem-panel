import { Outlet } from "react-router";
import { lazy, Suspense } from "react";

import { CONFIG } from "src/global-config";
import { DashboardLayout, DataObjectLayout } from "src/layouts/dashboard";

import { LoadingScreen } from "src/components/loading-screen";

import { AuthGuard } from "src/auth/guard";

import { usePathname } from "../hooks";

const IndexPage = lazy(() => import("src/pages/dashboard"));

const CatalogInventoryBookAppPage = lazy(
  () => import("src/pages/dashboard/cataloginventory/book"),
);

const CatalogInventoryBranchAppPage = lazy(
  () => import("src/pages/dashboard/cataloginventory/branch"),
);

const CatalogInventoryBranchInventoryAppPage = lazy(
  () => import("src/pages/dashboard/cataloginventory/branchinventory"),
);

const CatalogInventoryInventoryAuditLogAppPage = lazy(
  () => import("src/pages/dashboard/cataloginventory/inventoryauditlog"),
);

const CatalogInventoryInterBranchTransferAppPage = lazy(
  () => import("src/pages/dashboard/cataloginventory/interbranchtransfer"),
);

const CatalogInventoryPurchaseOrderAppPage = lazy(
  () => import("src/pages/dashboard/cataloginventory/purchaseorder"),
);

const CatalogInventoryCatalogInventoryShareTokenAppPage = lazy(
  () =>
    import("src/pages/dashboard/cataloginventory/cataloginventorysharetoken"),
);

const LendingLoanAppPage = lazy(
  () => import("src/pages/dashboard/lending/loan"),
);

const LendingReservationAppPage = lazy(
  () => import("src/pages/dashboard/lending/reservation"),
);

const LendingLoanEventAppPage = lazy(
  () => import("src/pages/dashboard/lending/loanevent"),
);

const LendingLendingShareTokenAppPage = lazy(
  () => import("src/pages/dashboard/lending/lendingsharetoken"),
);

const ReviewEngagementReviewAppPage = lazy(
  () => import("src/pages/dashboard/reviewengagement/review"),
);

const ReviewEngagementRecommendationAppPage = lazy(
  () => import("src/pages/dashboard/reviewengagement/recommendation"),
);

const ReviewEngagementEngagementEventAppPage = lazy(
  () => import("src/pages/dashboard/reviewengagement/engagementevent"),
);

const ReviewEngagementReviewEngagementShareTokenAppPage = lazy(
  () =>
    import("src/pages/dashboard/reviewengagement/reviewengagementsharetoken"),
);

const PaymentFeeAppPage = lazy(() => import("src/pages/dashboard/payment/fee"));

const PaymentFeePaymentAppPage = lazy(
  () => import("src/pages/dashboard/payment/feepayment"),
);

const PaymentFeeEventAppPage = lazy(
  () => import("src/pages/dashboard/payment/feeevent"),
);

const PaymentFeePaymentAppPage = lazy(
  () => import("src/pages/dashboard/payment/feepayment"),
);

const PaymentPaymentCustomerAppPage = lazy(
  () => import("src/pages/dashboard/payment/paymentcustomer"),
);

const PaymentPaymentMethodAppPage = lazy(
  () => import("src/pages/dashboard/payment/paymentmethod"),
);

const PaymentPaymentShareTokenAppPage = lazy(
  () => import("src/pages/dashboard/payment/paymentsharetoken"),
);

const AnalyticsAnalyticSnapshotAppPage = lazy(
  () => import("src/pages/dashboard/analytics/analyticsnapshot"),
);

const AnalyticsAuditLogAppPage = lazy(
  () => import("src/pages/dashboard/analytics/auditlog"),
);

const AnalyticsChangeStreamEventAppPage = lazy(
  () => import("src/pages/dashboard/analytics/changestreamevent"),
);

const AnalyticsAnalyticsShareTokenAppPage = lazy(
  () => import("src/pages/dashboard/analytics/analyticssharetoken"),
);

const AdminOpsBranchStaffAssignmentAppPage = lazy(
  () => import("src/pages/dashboard/adminops/branchstaffassignment"),
);

const AdminOpsIssueEscalationAppPage = lazy(
  () => import("src/pages/dashboard/adminops/issueescalation"),
);

const AdminOpsMongoAdminConfigAppPage = lazy(
  () => import("src/pages/dashboard/adminops/mongoadminconfig"),
);

const AdminOpsExternalNotificationConfigAppPage = lazy(
  () => import("src/pages/dashboard/adminops/externalnotificationconfig"),
);

const AdminOpsSystemBackupAuditAppPage = lazy(
  () => import("src/pages/dashboard/adminops/systembackupaudit"),
);

const AdminOpsBranchPurchaseOrderAppPage = lazy(
  () => import("src/pages/dashboard/adminops/branchpurchaseorder"),
);

const AdminOpsTregtAppPage = lazy(
  () => import("src/pages/dashboard/adminops/tregt"),
);

const AdminOpsAdminOpsShareTokenAppPage = lazy(
  () => import("src/pages/dashboard/adminops/adminopssharetoken"),
);

const AuthUserAppPage = lazy(() => import("src/pages/dashboard/auth/user"));

const AuthUserGroupAppPage = lazy(
  () => import("src/pages/dashboard/auth/usergroup"),
);

const AuthUserGroupMemberAppPage = lazy(
  () => import("src/pages/dashboard/auth/usergroupmember"),
);

const AuthAuthShareTokenAppPage = lazy(
  () => import("src/pages/dashboard/auth/authsharetoken"),
);

function SuspenseOutlet() {
  const pathname = usePathname();
  return (
    <Suspense key={pathname} fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  );
}

const dashboardLayout = () => (
  <DashboardLayout>
    <SuspenseOutlet />
  </DashboardLayout>
);

export const dashboardRoutes = [
  {
    path: "dashboard",
    element: CONFIG.auth.skip ? (
      dashboardLayout()
    ) : (
      <AuthGuard>{dashboardLayout()}</AuthGuard>
    ),
    children: [
      { index: true, element: <IndexPage /> },

      {
        path: "catalogInventory",
        element: <DataObjectLayout />,
        children: [
          {
            index: true,
            element: <CatalogInventoryBookAppPage />,
          },

          {
            path: "book",
            element: <CatalogInventoryBookAppPage />,
          },

          {
            path: "branch",
            element: <CatalogInventoryBranchAppPage />,
          },

          {
            path: "branchInventory",
            element: <CatalogInventoryBranchInventoryAppPage />,
          },

          {
            path: "inventoryAuditLog",
            element: <CatalogInventoryInventoryAuditLogAppPage />,
          },

          {
            path: "interBranchTransfer",
            element: <CatalogInventoryInterBranchTransferAppPage />,
          },

          {
            path: "purchaseOrder",
            element: <CatalogInventoryPurchaseOrderAppPage />,
          },

          {
            path: "catalogInventoryShareToken",
            element: <CatalogInventoryCatalogInventoryShareTokenAppPage />,
          },
        ],
      },

      {
        path: "lending",
        element: <DataObjectLayout />,
        children: [
          {
            index: true,
            element: <LendingLoanAppPage />,
          },

          {
            path: "loan",
            element: <LendingLoanAppPage />,
          },

          {
            path: "reservation",
            element: <LendingReservationAppPage />,
          },

          {
            path: "loanEvent",
            element: <LendingLoanEventAppPage />,
          },

          {
            path: "lendingShareToken",
            element: <LendingLendingShareTokenAppPage />,
          },
        ],
      },

      {
        path: "reviewEngagement",
        element: <DataObjectLayout />,
        children: [
          {
            index: true,
            element: <ReviewEngagementReviewAppPage />,
          },

          {
            path: "review",
            element: <ReviewEngagementReviewAppPage />,
          },

          {
            path: "recommendation",
            element: <ReviewEngagementRecommendationAppPage />,
          },

          {
            path: "engagementEvent",
            element: <ReviewEngagementEngagementEventAppPage />,
          },

          {
            path: "reviewEngagementShareToken",
            element: <ReviewEngagementReviewEngagementShareTokenAppPage />,
          },
        ],
      },

      {
        path: "payment",
        element: <DataObjectLayout />,
        children: [
          {
            index: true,
            element: <PaymentFeeAppPage />,
          },

          {
            path: "fee",
            element: <PaymentFeeAppPage />,
          },

          {
            path: "feePayment",
            element: <PaymentFeePaymentAppPage />,
          },

          {
            path: "feeEvent",
            element: <PaymentFeeEventAppPage />,
          },

          {
            path: "feePayment",
            element: <PaymentFeePaymentAppPage />,
          },

          {
            path: "paymentCustomer",
            element: <PaymentPaymentCustomerAppPage />,
          },

          {
            path: "paymentMethod",
            element: <PaymentPaymentMethodAppPage />,
          },

          {
            path: "paymentShareToken",
            element: <PaymentPaymentShareTokenAppPage />,
          },
        ],
      },

      {
        path: "analytics",
        element: <DataObjectLayout />,
        children: [
          {
            index: true,
            element: <AnalyticsAnalyticSnapshotAppPage />,
          },

          {
            path: "analyticSnapshot",
            element: <AnalyticsAnalyticSnapshotAppPage />,
          },

          {
            path: "auditLog",
            element: <AnalyticsAuditLogAppPage />,
          },

          {
            path: "changeStreamEvent",
            element: <AnalyticsChangeStreamEventAppPage />,
          },

          {
            path: "analyticsShareToken",
            element: <AnalyticsAnalyticsShareTokenAppPage />,
          },
        ],
      },

      {
        path: "adminOps",
        element: <DataObjectLayout />,
        children: [
          {
            index: true,
            element: <AdminOpsBranchStaffAssignmentAppPage />,
          },

          {
            path: "branchStaffAssignment",
            element: <AdminOpsBranchStaffAssignmentAppPage />,
          },

          {
            path: "issueEscalation",
            element: <AdminOpsIssueEscalationAppPage />,
          },

          {
            path: "mongoAdminConfig",
            element: <AdminOpsMongoAdminConfigAppPage />,
          },

          {
            path: "externalNotificationConfig",
            element: <AdminOpsExternalNotificationConfigAppPage />,
          },

          {
            path: "systemBackupAudit",
            element: <AdminOpsSystemBackupAuditAppPage />,
          },

          {
            path: "branchPurchaseOrder",
            element: <AdminOpsBranchPurchaseOrderAppPage />,
          },

          {
            path: "tregt",
            element: <AdminOpsTregtAppPage />,
          },

          {
            path: "adminOpsShareToken",
            element: <AdminOpsAdminOpsShareTokenAppPage />,
          },
        ],
      },

      {
        path: "auth",
        element: <DataObjectLayout />,
        children: [
          {
            index: true,
            element: <AuthUserAppPage />,
          },

          {
            path: "user",
            element: <AuthUserAppPage />,
          },

          {
            path: "userGroup",
            element: <AuthUserGroupAppPage />,
          },

          {
            path: "userGroupMember",
            element: <AuthUserGroupMemberAppPage />,
          },

          {
            path: "authShareToken",
            element: <AuthAuthShareTokenAppPage />,
          },
        ],
      },
    ],
  },
];
