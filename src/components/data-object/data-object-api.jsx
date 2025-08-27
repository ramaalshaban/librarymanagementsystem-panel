import { lazy } from "react";

import { useDataObjectContext } from "../nav-section/data/context/index.js";

const CatalogInventoryGetBookApiPage = lazy(
  () => import("src/pages/dashboard/cataloginventory/book/getbook-api"),
);

const CatalogInventoryCreateBookApiPage = lazy(
  () => import("src/pages/dashboard/cataloginventory/book/createbook-api"),
);

const CatalogInventoryUpdateBookApiPage = lazy(
  () => import("src/pages/dashboard/cataloginventory/book/updatebook-api"),
);

const CatalogInventoryDeleteBookApiPage = lazy(
  () => import("src/pages/dashboard/cataloginventory/book/deletebook-api"),
);

const CatalogInventoryListBooksApiPage = lazy(
  () => import("src/pages/dashboard/cataloginventory/book/listbooks-api"),
);

const CatalogInventoryGetBranchApiPage = lazy(
  () => import("src/pages/dashboard/cataloginventory/branch/getbranch-api"),
);

const CatalogInventoryCreateBranchApiPage = lazy(
  () => import("src/pages/dashboard/cataloginventory/branch/createbranch-api"),
);

const CatalogInventoryUpdateBranchApiPage = lazy(
  () => import("src/pages/dashboard/cataloginventory/branch/updatebranch-api"),
);

const CatalogInventoryDeleteBranchApiPage = lazy(
  () => import("src/pages/dashboard/cataloginventory/branch/deletebranch-api"),
);

const CatalogInventoryListBranchesApiPage = lazy(
  () => import("src/pages/dashboard/cataloginventory/branch/listbranches-api"),
);

const CatalogInventoryGetBranchInventoryApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/cataloginventory/branchinventory/getbranchinventory-api"
    ),
);

const CatalogInventoryCreateBranchInventoryApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/cataloginventory/branchinventory/createbranchinventory-api"
    ),
);

const CatalogInventoryUpdateBranchInventoryApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/cataloginventory/branchinventory/updatebranchinventory-api"
    ),
);

const CatalogInventoryDeleteBranchInventoryApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/cataloginventory/branchinventory/deletebranchinventory-api"
    ),
);

const CatalogInventoryListBranchInventoriesApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/cataloginventory/branchinventory/listbranchinventories-api"
    ),
);

const CatalogInventoryGetInventoryAuditLogApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/cataloginventory/inventoryauditlog/getinventoryauditlog-api"
    ),
);

const CatalogInventoryCreateInventoryAuditLogApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/cataloginventory/inventoryauditlog/createinventoryauditlog-api"
    ),
);

const CatalogInventoryUpdateInventoryAuditLogApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/cataloginventory/inventoryauditlog/updateinventoryauditlog-api"
    ),
);

const CatalogInventoryDeleteInventoryAuditLogApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/cataloginventory/inventoryauditlog/deleteinventoryauditlog-api"
    ),
);

const CatalogInventoryListInventoryAuditLogsApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/cataloginventory/inventoryauditlog/listinventoryauditlogs-api"
    ),
);

const CatalogInventoryGetInterBranchTransferApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/cataloginventory/interbranchtransfer/getinterbranchtransfer-api"
    ),
);

const CatalogInventoryCreateInterBranchTransferApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/cataloginventory/interbranchtransfer/createinterbranchtransfer-api"
    ),
);

const CatalogInventoryUpdateInterBranchTransferApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/cataloginventory/interbranchtransfer/updateinterbranchtransfer-api"
    ),
);

const CatalogInventoryDeleteInterBranchTransferApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/cataloginventory/interbranchtransfer/deleteinterbranchtransfer-api"
    ),
);

const CatalogInventoryListInterBranchTransfersApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/cataloginventory/interbranchtransfer/listinterbranchtransfers-api"
    ),
);

const CatalogInventoryGetPurchaseOrderApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/cataloginventory/purchaseorder/getpurchaseorder-api"
    ),
);

const CatalogInventoryCreatePurchaseOrderApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/cataloginventory/purchaseorder/createpurchaseorder-api"
    ),
);

const CatalogInventoryUpdatePurchaseOrderApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/cataloginventory/purchaseorder/updatepurchaseorder-api"
    ),
);

const CatalogInventoryDeletePurchaseOrderApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/cataloginventory/purchaseorder/deletepurchaseorder-api"
    ),
);

const CatalogInventoryListPurchaseOrdersApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/cataloginventory/purchaseorder/listpurchaseorders-api"
    ),
);

const LendingGetLoanApiPage = lazy(
  () => import("src/pages/dashboard/lending/loan/getloan-api"),
);

const LendingCreateLoanApiPage = lazy(
  () => import("src/pages/dashboard/lending/loan/createloan-api"),
);

const LendingUpdateLoanApiPage = lazy(
  () => import("src/pages/dashboard/lending/loan/updateloan-api"),
);

const LendingDeleteLoanApiPage = lazy(
  () => import("src/pages/dashboard/lending/loan/deleteloan-api"),
);

const LendingListLoansApiPage = lazy(
  () => import("src/pages/dashboard/lending/loan/listloans-api"),
);

const LendingGetReservationApiPage = lazy(
  () => import("src/pages/dashboard/lending/reservation/getreservation-api"),
);

const LendingCreateReservationApiPage = lazy(
  () => import("src/pages/dashboard/lending/reservation/createreservation-api"),
);

const LendingUpdateReservationApiPage = lazy(
  () => import("src/pages/dashboard/lending/reservation/updatereservation-api"),
);

const LendingDeleteReservationApiPage = lazy(
  () => import("src/pages/dashboard/lending/reservation/deletereservation-api"),
);

const LendingListReservationsApiPage = lazy(
  () => import("src/pages/dashboard/lending/reservation/listreservations-api"),
);

const LendingGetLoanEventApiPage = lazy(
  () => import("src/pages/dashboard/lending/loanevent/getloanevent-api"),
);

const LendingCreateLoanEventApiPage = lazy(
  () => import("src/pages/dashboard/lending/loanevent/createloanevent-api"),
);

const LendingUpdateLoanEventApiPage = lazy(
  () => import("src/pages/dashboard/lending/loanevent/updateloanevent-api"),
);

const LendingDeleteLoanEventApiPage = lazy(
  () => import("src/pages/dashboard/lending/loanevent/deleteloanevent-api"),
);

const LendingListLoanEventsApiPage = lazy(
  () => import("src/pages/dashboard/lending/loanevent/listloanevents-api"),
);

const ReviewEngagementGetReviewApiPage = lazy(
  () => import("src/pages/dashboard/reviewengagement/review/getreview-api"),
);

const ReviewEngagementCreateReviewApiPage = lazy(
  () => import("src/pages/dashboard/reviewengagement/review/createreview-api"),
);

const ReviewEngagementUpdateReviewApiPage = lazy(
  () => import("src/pages/dashboard/reviewengagement/review/updatereview-api"),
);

const ReviewEngagementDeleteReviewApiPage = lazy(
  () => import("src/pages/dashboard/reviewengagement/review/deletereview-api"),
);

const ReviewEngagementListReviewsApiPage = lazy(
  () => import("src/pages/dashboard/reviewengagement/review/listreviews-api"),
);

const ReviewEngagementGetRecommendationApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/reviewengagement/recommendation/getrecommendation-api"
    ),
);

const ReviewEngagementCreateRecommendationApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/reviewengagement/recommendation/createrecommendation-api"
    ),
);

const ReviewEngagementUpdateRecommendationApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/reviewengagement/recommendation/updaterecommendation-api"
    ),
);

const ReviewEngagementDeleteRecommendationApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/reviewengagement/recommendation/deleterecommendation-api"
    ),
);

const ReviewEngagementListRecommendationsApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/reviewengagement/recommendation/listrecommendations-api"
    ),
);

const ReviewEngagementGetEngagementEventApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/reviewengagement/engagementevent/getengagementevent-api"
    ),
);

const ReviewEngagementCreateEngagementEventApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/reviewengagement/engagementevent/createengagementevent-api"
    ),
);

const ReviewEngagementUpdateEngagementEventApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/reviewengagement/engagementevent/updateengagementevent-api"
    ),
);

const ReviewEngagementDeleteEngagementEventApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/reviewengagement/engagementevent/deleteengagementevent-api"
    ),
);

const ReviewEngagementListEngagementEventsApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/reviewengagement/engagementevent/listengagementevents-api"
    ),
);

const PaymentGetFeeApiPage = lazy(
  () => import("src/pages/dashboard/payment/fee/getfee-api"),
);

const PaymentCreateFeeApiPage = lazy(
  () => import("src/pages/dashboard/payment/fee/createfee-api"),
);

const PaymentUpdateFeeApiPage = lazy(
  () => import("src/pages/dashboard/payment/fee/updatefee-api"),
);

const PaymentDeleteFeeApiPage = lazy(
  () => import("src/pages/dashboard/payment/fee/deletefee-api"),
);

const PaymentListFeesApiPage = lazy(
  () => import("src/pages/dashboard/payment/fee/listfees-api"),
);

const PaymentCheckoutstartFeeApiPage = lazy(
  () => import("src/pages/dashboard/payment/fee/checkoutstartfee-api"),
);

const PaymentCheckoutcompleteFeeApiPage = lazy(
  () => import("src/pages/dashboard/payment/fee/checkoutcompletefee-api"),
);

const PaymentCheckoutrefreshFeeApiPage = lazy(
  () => import("src/pages/dashboard/payment/fee/checkoutrefreshfee-api"),
);

const PaymentGetFeePaymentApiPage = lazy(
  () => import("src/pages/dashboard/payment/feepayment/getfeepayment-api"),
);

const PaymentCreateFeePaymentApiPage = lazy(
  () => import("src/pages/dashboard/payment/feepayment/createfeepayment-api"),
);

const PaymentUpdateFeePaymentApiPage = lazy(
  () => import("src/pages/dashboard/payment/feepayment/updatefeepayment-api"),
);

const PaymentDeleteFeePaymentApiPage = lazy(
  () => import("src/pages/dashboard/payment/feepayment/deletefeepayment-api"),
);

const PaymentListFeePaymentsApiPage = lazy(
  () => import("src/pages/dashboard/payment/feepayment/listfeepayments-api"),
);

const PaymentGetFeeEventApiPage = lazy(
  () => import("src/pages/dashboard/payment/feeevent/getfeeevent-api"),
);

const PaymentCreateFeeEventApiPage = lazy(
  () => import("src/pages/dashboard/payment/feeevent/createfeeevent-api"),
);

const PaymentUpdateFeeEventApiPage = lazy(
  () => import("src/pages/dashboard/payment/feeevent/updatefeeevent-api"),
);

const PaymentDeleteFeeEventApiPage = lazy(
  () => import("src/pages/dashboard/payment/feeevent/deletefeeevent-api"),
);

const PaymentListFeeEventsApiPage = lazy(
  () => import("src/pages/dashboard/payment/feeevent/listfeeevents-api"),
);

const PaymentGetPaymentApiPage = lazy(
  () => import("src/pages/dashboard/payment/feepayment/getpayment-api"),
);

const PaymentGetPaymentByOrderIdApiPage = lazy(
  () =>
    import("src/pages/dashboard/payment/feepayment/getpaymentbyorderid-api"),
);

const PaymentGetPaymentByPaymentIdApiPage = lazy(
  () =>
    import("src/pages/dashboard/payment/feepayment/getpaymentbypaymentid-api"),
);

const PaymentCreatePaymentApiPage = lazy(
  () => import("src/pages/dashboard/payment/feepayment/createpayment-api"),
);

const PaymentUpdatePaymentApiPage = lazy(
  () => import("src/pages/dashboard/payment/feepayment/updatepayment-api"),
);

const PaymentListPaymentsApiPage = lazy(
  () => import("src/pages/dashboard/payment/feepayment/listpayments-api"),
);

const PaymentDeletePaymentApiPage = lazy(
  () => import("src/pages/dashboard/payment/feepayment/deletepayment-api"),
);

const PaymentGetCustomerByUserIdApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/payment/paymentcustomer/getcustomerbyuserid-api"
    ),
);

const PaymentListCustomersApiPage = lazy(
  () => import("src/pages/dashboard/payment/paymentcustomer/listcustomers-api"),
);

const PaymentListethodsApiPage = lazy(
  () => import("src/pages/dashboard/payment/paymentmethod/listethods-api"),
);

const AnalyticsGetAnalyticSnapshotApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/analytics/analyticsnapshot/getanalyticsnapshot-api"
    ),
);

const AnalyticsCreateAnalyticSnapshotApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/analytics/analyticsnapshot/createanalyticsnapshot-api"
    ),
);

const AnalyticsUpdateAnalyticSnapshotApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/analytics/analyticsnapshot/updateanalyticsnapshot-api"
    ),
);

const AnalyticsDeleteAnalyticSnapshotApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/analytics/analyticsnapshot/deleteanalyticsnapshot-api"
    ),
);

const AnalyticsListAnalyticSnapshotsApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/analytics/analyticsnapshot/listanalyticsnapshots-api"
    ),
);

const AnalyticsGetAuditLogApiPage = lazy(
  () => import("src/pages/dashboard/analytics/auditlog/getauditlog-api"),
);

const AnalyticsCreateAuditLogApiPage = lazy(
  () => import("src/pages/dashboard/analytics/auditlog/createauditlog-api"),
);

const AnalyticsUpdateAuditLogApiPage = lazy(
  () => import("src/pages/dashboard/analytics/auditlog/updateauditlog-api"),
);

const AnalyticsDeleteAuditLogApiPage = lazy(
  () => import("src/pages/dashboard/analytics/auditlog/deleteauditlog-api"),
);

const AnalyticsListAuditLogsApiPage = lazy(
  () => import("src/pages/dashboard/analytics/auditlog/listauditlogs-api"),
);

const AnalyticsGetChangeStreamEventApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/analytics/changestreamevent/getchangestreamevent-api"
    ),
);

const AnalyticsCreateChangeStreamEventApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/analytics/changestreamevent/createchangestreamevent-api"
    ),
);

const AnalyticsDeleteChangeStreamEventApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/analytics/changestreamevent/deletechangestreamevent-api"
    ),
);

const AnalyticsListChangeStreamEventsApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/analytics/changestreamevent/listchangestreamevents-api"
    ),
);

const AdminOpsGetBranchStaffAssignmentApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/adminops/branchstaffassignment/getbranchstaffassignment-api"
    ),
);

const AdminOpsCreateBranchStaffAssignmentApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/adminops/branchstaffassignment/createbranchstaffassignment-api"
    ),
);

const AdminOpsUpdateBranchStaffAssignmentApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/adminops/branchstaffassignment/updatebranchstaffassignment-api"
    ),
);

const AdminOpsDeleteBranchStaffAssignmentApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/adminops/branchstaffassignment/deletebranchstaffassignment-api"
    ),
);

const AdminOpsListBranchStaffAssignmentsApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/adminops/branchstaffassignment/listbranchstaffassignments-api"
    ),
);

const AdminOpsGetIssueEscalationApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/adminops/issueescalation/getissueescalation-api"
    ),
);

const AdminOpsCreateIssueEscalationApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/adminops/issueescalation/createissueescalation-api"
    ),
);

const AdminOpsUpdateIssueEscalationApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/adminops/issueescalation/updateissueescalation-api"
    ),
);

const AdminOpsDeleteIssueEscalationApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/adminops/issueescalation/deleteissueescalation-api"
    ),
);

const AdminOpsListIssueEscalationsApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/adminops/issueescalation/listissueescalations-api"
    ),
);

const AdminOpsGetMongoAdminConfigApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/adminops/mongoadminconfig/getmongoadminconfig-api"
    ),
);

const AdminOpsCreateMongoAdminConfigApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/adminops/mongoadminconfig/createmongoadminconfig-api"
    ),
);

const AdminOpsUpdateMongoAdminConfigApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/adminops/mongoadminconfig/updatemongoadminconfig-api"
    ),
);

const AdminOpsDeleteMongoAdminConfigApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/adminops/mongoadminconfig/deletemongoadminconfig-api"
    ),
);

const AdminOpsListMongoAdminConfigsApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/adminops/mongoadminconfig/listmongoadminconfigs-api"
    ),
);

const AdminOpsGetExternalNotificationConfigApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/adminops/externalnotificationconfig/getexternalnotificationconfig-api"
    ),
);

const AdminOpsCreateExternalNotificationConfigApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/adminops/externalnotificationconfig/createexternalnotificationconfig-api"
    ),
);

const AdminOpsUpdateExternalNotificationConfigApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/adminops/externalnotificationconfig/updateexternalnotificationconfig-api"
    ),
);

const AdminOpsDeleteExternalNotificationConfigApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/adminops/externalnotificationconfig/deleteexternalnotificationconfig-api"
    ),
);

const AdminOpsListExternalNotificationConfigsApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/adminops/externalnotificationconfig/listexternalnotificationconfigs-api"
    ),
);

const AdminOpsGetSystemBackupAuditApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/adminops/systembackupaudit/getsystembackupaudit-api"
    ),
);

const AdminOpsCreateSystemBackupAuditApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/adminops/systembackupaudit/createsystembackupaudit-api"
    ),
);

const AdminOpsUpdateSystemBackupAuditApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/adminops/systembackupaudit/updatesystembackupaudit-api"
    ),
);

const AdminOpsDeleteSystemBackupAuditApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/adminops/systembackupaudit/deletesystembackupaudit-api"
    ),
);

const AdminOpsListSystemBackupAuditsApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/adminops/systembackupaudit/listsystembackupaudits-api"
    ),
);

const AdminOpsGetBranchPurchaseOrderApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/adminops/branchpurchaseorder/getbranchpurchaseorder-api"
    ),
);

const AdminOpsCreateBranchPurchaseOrderApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/adminops/branchpurchaseorder/createbranchpurchaseorder-api"
    ),
);

const AdminOpsUpdateBranchPurchaseOrderApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/adminops/branchpurchaseorder/updatebranchpurchaseorder-api"
    ),
);

const AdminOpsDeleteBranchPurchaseOrderApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/adminops/branchpurchaseorder/deletebranchpurchaseorder-api"
    ),
);

const AdminOpsListBranchPurchaseOrdersApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/adminops/branchpurchaseorder/listbranchpurchaseorders-api"
    ),
);

const AuthRegisterUserApiPage = lazy(
  () => import("src/pages/dashboard/auth/user/registeruser-api"),
);

const AuthUpdateUserApiPage = lazy(
  () => import("src/pages/dashboard/auth/user/updateuser-api"),
);

const AuthDeleteUserApiPage = lazy(
  () => import("src/pages/dashboard/auth/user/deleteuser-api"),
);

const AuthUpdateUserRoleApiPage = lazy(
  () => import("src/pages/dashboard/auth/user/updateuserrole-api"),
);

const AuthUpdatePasswordApiPage = lazy(
  () => import("src/pages/dashboard/auth/user/updatepassword-api"),
);

const AuthGetUserApiPage = lazy(
  () => import("src/pages/dashboard/auth/user/getuser-api"),
);

const AuthGetBriefUserApiPage = lazy(
  () => import("src/pages/dashboard/auth/user/getbriefuser-api"),
);

const AuthListUsersApiPage = lazy(
  () => import("src/pages/dashboard/auth/user/listusers-api"),
);

const AuthCreateGroupApiPage = lazy(
  () => import("src/pages/dashboard/auth/usergroup/creategroup-api"),
);

const AuthUpdateGroupApiPage = lazy(
  () => import("src/pages/dashboard/auth/usergroup/updategroup-api"),
);

const AuthGetGroupApiPage = lazy(
  () => import("src/pages/dashboard/auth/usergroup/getgroup-api"),
);

const AuthListGroupsApiPage = lazy(
  () => import("src/pages/dashboard/auth/usergroup/listgroups-api"),
);

const AuthCreateGroupMemberApiPage = lazy(
  () =>
    import("src/pages/dashboard/auth/usergroupmember/creategroupmember-api"),
);

const AuthDeleteGroupMemberApiPage = lazy(
  () =>
    import("src/pages/dashboard/auth/usergroupmember/deletegroupmember-api"),
);

const AuthGetGroupMemberApiPage = lazy(
  () => import("src/pages/dashboard/auth/usergroupmember/getgroupmember-api"),
);

const AuthListGroupMembersApiPage = lazy(
  () => import("src/pages/dashboard/auth/usergroupmember/listgroupmembers-api"),
);

const APIComponents = {
  CatalogInventoryGetBookApiPage: <CatalogInventoryGetBookApiPage />,

  CatalogInventoryCreateBookApiPage: <CatalogInventoryCreateBookApiPage />,

  CatalogInventoryUpdateBookApiPage: <CatalogInventoryUpdateBookApiPage />,

  CatalogInventoryDeleteBookApiPage: <CatalogInventoryDeleteBookApiPage />,

  CatalogInventoryListBooksApiPage: <CatalogInventoryListBooksApiPage />,

  CatalogInventoryGetBranchApiPage: <CatalogInventoryGetBranchApiPage />,

  CatalogInventoryCreateBranchApiPage: <CatalogInventoryCreateBranchApiPage />,

  CatalogInventoryUpdateBranchApiPage: <CatalogInventoryUpdateBranchApiPage />,

  CatalogInventoryDeleteBranchApiPage: <CatalogInventoryDeleteBranchApiPage />,

  CatalogInventoryListBranchesApiPage: <CatalogInventoryListBranchesApiPage />,

  CatalogInventoryGetBranchInventoryApiPage: (
    <CatalogInventoryGetBranchInventoryApiPage />
  ),

  CatalogInventoryCreateBranchInventoryApiPage: (
    <CatalogInventoryCreateBranchInventoryApiPage />
  ),

  CatalogInventoryUpdateBranchInventoryApiPage: (
    <CatalogInventoryUpdateBranchInventoryApiPage />
  ),

  CatalogInventoryDeleteBranchInventoryApiPage: (
    <CatalogInventoryDeleteBranchInventoryApiPage />
  ),

  CatalogInventoryListBranchInventoriesApiPage: (
    <CatalogInventoryListBranchInventoriesApiPage />
  ),

  CatalogInventoryGetInventoryAuditLogApiPage: (
    <CatalogInventoryGetInventoryAuditLogApiPage />
  ),

  CatalogInventoryCreateInventoryAuditLogApiPage: (
    <CatalogInventoryCreateInventoryAuditLogApiPage />
  ),

  CatalogInventoryUpdateInventoryAuditLogApiPage: (
    <CatalogInventoryUpdateInventoryAuditLogApiPage />
  ),

  CatalogInventoryDeleteInventoryAuditLogApiPage: (
    <CatalogInventoryDeleteInventoryAuditLogApiPage />
  ),

  CatalogInventoryListInventoryAuditLogsApiPage: (
    <CatalogInventoryListInventoryAuditLogsApiPage />
  ),

  CatalogInventoryGetInterBranchTransferApiPage: (
    <CatalogInventoryGetInterBranchTransferApiPage />
  ),

  CatalogInventoryCreateInterBranchTransferApiPage: (
    <CatalogInventoryCreateInterBranchTransferApiPage />
  ),

  CatalogInventoryUpdateInterBranchTransferApiPage: (
    <CatalogInventoryUpdateInterBranchTransferApiPage />
  ),

  CatalogInventoryDeleteInterBranchTransferApiPage: (
    <CatalogInventoryDeleteInterBranchTransferApiPage />
  ),

  CatalogInventoryListInterBranchTransfersApiPage: (
    <CatalogInventoryListInterBranchTransfersApiPage />
  ),

  CatalogInventoryGetPurchaseOrderApiPage: (
    <CatalogInventoryGetPurchaseOrderApiPage />
  ),

  CatalogInventoryCreatePurchaseOrderApiPage: (
    <CatalogInventoryCreatePurchaseOrderApiPage />
  ),

  CatalogInventoryUpdatePurchaseOrderApiPage: (
    <CatalogInventoryUpdatePurchaseOrderApiPage />
  ),

  CatalogInventoryDeletePurchaseOrderApiPage: (
    <CatalogInventoryDeletePurchaseOrderApiPage />
  ),

  CatalogInventoryListPurchaseOrdersApiPage: (
    <CatalogInventoryListPurchaseOrdersApiPage />
  ),

  LendingGetLoanApiPage: <LendingGetLoanApiPage />,

  LendingCreateLoanApiPage: <LendingCreateLoanApiPage />,

  LendingUpdateLoanApiPage: <LendingUpdateLoanApiPage />,

  LendingDeleteLoanApiPage: <LendingDeleteLoanApiPage />,

  LendingListLoansApiPage: <LendingListLoansApiPage />,

  LendingGetReservationApiPage: <LendingGetReservationApiPage />,

  LendingCreateReservationApiPage: <LendingCreateReservationApiPage />,

  LendingUpdateReservationApiPage: <LendingUpdateReservationApiPage />,

  LendingDeleteReservationApiPage: <LendingDeleteReservationApiPage />,

  LendingListReservationsApiPage: <LendingListReservationsApiPage />,

  LendingGetLoanEventApiPage: <LendingGetLoanEventApiPage />,

  LendingCreateLoanEventApiPage: <LendingCreateLoanEventApiPage />,

  LendingUpdateLoanEventApiPage: <LendingUpdateLoanEventApiPage />,

  LendingDeleteLoanEventApiPage: <LendingDeleteLoanEventApiPage />,

  LendingListLoanEventsApiPage: <LendingListLoanEventsApiPage />,

  ReviewEngagementGetReviewApiPage: <ReviewEngagementGetReviewApiPage />,

  ReviewEngagementCreateReviewApiPage: <ReviewEngagementCreateReviewApiPage />,

  ReviewEngagementUpdateReviewApiPage: <ReviewEngagementUpdateReviewApiPage />,

  ReviewEngagementDeleteReviewApiPage: <ReviewEngagementDeleteReviewApiPage />,

  ReviewEngagementListReviewsApiPage: <ReviewEngagementListReviewsApiPage />,

  ReviewEngagementGetRecommendationApiPage: (
    <ReviewEngagementGetRecommendationApiPage />
  ),

  ReviewEngagementCreateRecommendationApiPage: (
    <ReviewEngagementCreateRecommendationApiPage />
  ),

  ReviewEngagementUpdateRecommendationApiPage: (
    <ReviewEngagementUpdateRecommendationApiPage />
  ),

  ReviewEngagementDeleteRecommendationApiPage: (
    <ReviewEngagementDeleteRecommendationApiPage />
  ),

  ReviewEngagementListRecommendationsApiPage: (
    <ReviewEngagementListRecommendationsApiPage />
  ),

  ReviewEngagementGetEngagementEventApiPage: (
    <ReviewEngagementGetEngagementEventApiPage />
  ),

  ReviewEngagementCreateEngagementEventApiPage: (
    <ReviewEngagementCreateEngagementEventApiPage />
  ),

  ReviewEngagementUpdateEngagementEventApiPage: (
    <ReviewEngagementUpdateEngagementEventApiPage />
  ),

  ReviewEngagementDeleteEngagementEventApiPage: (
    <ReviewEngagementDeleteEngagementEventApiPage />
  ),

  ReviewEngagementListEngagementEventsApiPage: (
    <ReviewEngagementListEngagementEventsApiPage />
  ),

  PaymentGetFeeApiPage: <PaymentGetFeeApiPage />,

  PaymentCreateFeeApiPage: <PaymentCreateFeeApiPage />,

  PaymentUpdateFeeApiPage: <PaymentUpdateFeeApiPage />,

  PaymentDeleteFeeApiPage: <PaymentDeleteFeeApiPage />,

  PaymentListFeesApiPage: <PaymentListFeesApiPage />,

  PaymentCheckoutstartFeeApiPage: <PaymentCheckoutstartFeeApiPage />,

  PaymentCheckoutcompleteFeeApiPage: <PaymentCheckoutcompleteFeeApiPage />,

  PaymentCheckoutrefreshFeeApiPage: <PaymentCheckoutrefreshFeeApiPage />,

  PaymentGetFeePaymentApiPage: <PaymentGetFeePaymentApiPage />,

  PaymentCreateFeePaymentApiPage: <PaymentCreateFeePaymentApiPage />,

  PaymentUpdateFeePaymentApiPage: <PaymentUpdateFeePaymentApiPage />,

  PaymentDeleteFeePaymentApiPage: <PaymentDeleteFeePaymentApiPage />,

  PaymentListFeePaymentsApiPage: <PaymentListFeePaymentsApiPage />,

  PaymentGetFeeEventApiPage: <PaymentGetFeeEventApiPage />,

  PaymentCreateFeeEventApiPage: <PaymentCreateFeeEventApiPage />,

  PaymentUpdateFeeEventApiPage: <PaymentUpdateFeeEventApiPage />,

  PaymentDeleteFeeEventApiPage: <PaymentDeleteFeeEventApiPage />,

  PaymentListFeeEventsApiPage: <PaymentListFeeEventsApiPage />,

  PaymentGetPaymentApiPage: <PaymentGetPaymentApiPage />,

  PaymentGetPaymentByOrderIdApiPage: <PaymentGetPaymentByOrderIdApiPage />,

  PaymentGetPaymentByPaymentIdApiPage: <PaymentGetPaymentByPaymentIdApiPage />,

  PaymentCreatePaymentApiPage: <PaymentCreatePaymentApiPage />,

  PaymentUpdatePaymentApiPage: <PaymentUpdatePaymentApiPage />,

  PaymentListPaymentsApiPage: <PaymentListPaymentsApiPage />,

  PaymentDeletePaymentApiPage: <PaymentDeletePaymentApiPage />,

  PaymentGetCustomerByUserIdApiPage: <PaymentGetCustomerByUserIdApiPage />,

  PaymentListCustomersApiPage: <PaymentListCustomersApiPage />,

  PaymentListethodsApiPage: <PaymentListethodsApiPage />,

  AnalyticsGetAnalyticSnapshotApiPage: <AnalyticsGetAnalyticSnapshotApiPage />,

  AnalyticsCreateAnalyticSnapshotApiPage: (
    <AnalyticsCreateAnalyticSnapshotApiPage />
  ),

  AnalyticsUpdateAnalyticSnapshotApiPage: (
    <AnalyticsUpdateAnalyticSnapshotApiPage />
  ),

  AnalyticsDeleteAnalyticSnapshotApiPage: (
    <AnalyticsDeleteAnalyticSnapshotApiPage />
  ),

  AnalyticsListAnalyticSnapshotsApiPage: (
    <AnalyticsListAnalyticSnapshotsApiPage />
  ),

  AnalyticsGetAuditLogApiPage: <AnalyticsGetAuditLogApiPage />,

  AnalyticsCreateAuditLogApiPage: <AnalyticsCreateAuditLogApiPage />,

  AnalyticsUpdateAuditLogApiPage: <AnalyticsUpdateAuditLogApiPage />,

  AnalyticsDeleteAuditLogApiPage: <AnalyticsDeleteAuditLogApiPage />,

  AnalyticsListAuditLogsApiPage: <AnalyticsListAuditLogsApiPage />,

  AnalyticsGetChangeStreamEventApiPage: (
    <AnalyticsGetChangeStreamEventApiPage />
  ),

  AnalyticsCreateChangeStreamEventApiPage: (
    <AnalyticsCreateChangeStreamEventApiPage />
  ),

  AnalyticsDeleteChangeStreamEventApiPage: (
    <AnalyticsDeleteChangeStreamEventApiPage />
  ),

  AnalyticsListChangeStreamEventsApiPage: (
    <AnalyticsListChangeStreamEventsApiPage />
  ),

  AdminOpsGetBranchStaffAssignmentApiPage: (
    <AdminOpsGetBranchStaffAssignmentApiPage />
  ),

  AdminOpsCreateBranchStaffAssignmentApiPage: (
    <AdminOpsCreateBranchStaffAssignmentApiPage />
  ),

  AdminOpsUpdateBranchStaffAssignmentApiPage: (
    <AdminOpsUpdateBranchStaffAssignmentApiPage />
  ),

  AdminOpsDeleteBranchStaffAssignmentApiPage: (
    <AdminOpsDeleteBranchStaffAssignmentApiPage />
  ),

  AdminOpsListBranchStaffAssignmentsApiPage: (
    <AdminOpsListBranchStaffAssignmentsApiPage />
  ),

  AdminOpsGetIssueEscalationApiPage: <AdminOpsGetIssueEscalationApiPage />,

  AdminOpsCreateIssueEscalationApiPage: (
    <AdminOpsCreateIssueEscalationApiPage />
  ),

  AdminOpsUpdateIssueEscalationApiPage: (
    <AdminOpsUpdateIssueEscalationApiPage />
  ),

  AdminOpsDeleteIssueEscalationApiPage: (
    <AdminOpsDeleteIssueEscalationApiPage />
  ),

  AdminOpsListIssueEscalationsApiPage: <AdminOpsListIssueEscalationsApiPage />,

  AdminOpsGetMongoAdminConfigApiPage: <AdminOpsGetMongoAdminConfigApiPage />,

  AdminOpsCreateMongoAdminConfigApiPage: (
    <AdminOpsCreateMongoAdminConfigApiPage />
  ),

  AdminOpsUpdateMongoAdminConfigApiPage: (
    <AdminOpsUpdateMongoAdminConfigApiPage />
  ),

  AdminOpsDeleteMongoAdminConfigApiPage: (
    <AdminOpsDeleteMongoAdminConfigApiPage />
  ),

  AdminOpsListMongoAdminConfigsApiPage: (
    <AdminOpsListMongoAdminConfigsApiPage />
  ),

  AdminOpsGetExternalNotificationConfigApiPage: (
    <AdminOpsGetExternalNotificationConfigApiPage />
  ),

  AdminOpsCreateExternalNotificationConfigApiPage: (
    <AdminOpsCreateExternalNotificationConfigApiPage />
  ),

  AdminOpsUpdateExternalNotificationConfigApiPage: (
    <AdminOpsUpdateExternalNotificationConfigApiPage />
  ),

  AdminOpsDeleteExternalNotificationConfigApiPage: (
    <AdminOpsDeleteExternalNotificationConfigApiPage />
  ),

  AdminOpsListExternalNotificationConfigsApiPage: (
    <AdminOpsListExternalNotificationConfigsApiPage />
  ),

  AdminOpsGetSystemBackupAuditApiPage: <AdminOpsGetSystemBackupAuditApiPage />,

  AdminOpsCreateSystemBackupAuditApiPage: (
    <AdminOpsCreateSystemBackupAuditApiPage />
  ),

  AdminOpsUpdateSystemBackupAuditApiPage: (
    <AdminOpsUpdateSystemBackupAuditApiPage />
  ),

  AdminOpsDeleteSystemBackupAuditApiPage: (
    <AdminOpsDeleteSystemBackupAuditApiPage />
  ),

  AdminOpsListSystemBackupAuditsApiPage: (
    <AdminOpsListSystemBackupAuditsApiPage />
  ),

  AdminOpsGetBranchPurchaseOrderApiPage: (
    <AdminOpsGetBranchPurchaseOrderApiPage />
  ),

  AdminOpsCreateBranchPurchaseOrderApiPage: (
    <AdminOpsCreateBranchPurchaseOrderApiPage />
  ),

  AdminOpsUpdateBranchPurchaseOrderApiPage: (
    <AdminOpsUpdateBranchPurchaseOrderApiPage />
  ),

  AdminOpsDeleteBranchPurchaseOrderApiPage: (
    <AdminOpsDeleteBranchPurchaseOrderApiPage />
  ),

  AdminOpsListBranchPurchaseOrdersApiPage: (
    <AdminOpsListBranchPurchaseOrdersApiPage />
  ),

  AuthRegisterUserApiPage: <AuthRegisterUserApiPage />,

  AuthUpdateUserApiPage: <AuthUpdateUserApiPage />,

  AuthDeleteUserApiPage: <AuthDeleteUserApiPage />,

  AuthUpdateUserRoleApiPage: <AuthUpdateUserRoleApiPage />,

  AuthUpdatePasswordApiPage: <AuthUpdatePasswordApiPage />,

  AuthGetUserApiPage: <AuthGetUserApiPage />,

  AuthGetBriefUserApiPage: <AuthGetBriefUserApiPage />,

  AuthListUsersApiPage: <AuthListUsersApiPage />,

  AuthCreateGroupApiPage: <AuthCreateGroupApiPage />,

  AuthUpdateGroupApiPage: <AuthUpdateGroupApiPage />,

  AuthGetGroupApiPage: <AuthGetGroupApiPage />,

  AuthListGroupsApiPage: <AuthListGroupsApiPage />,

  AuthCreateGroupMemberApiPage: <AuthCreateGroupMemberApiPage />,

  AuthDeleteGroupMemberApiPage: <AuthDeleteGroupMemberApiPage />,

  AuthGetGroupMemberApiPage: <AuthGetGroupMemberApiPage />,

  AuthListGroupMembersApiPage: <AuthListGroupMembersApiPage />,
};
export function DataObjectApi() {
  const { state } = useDataObjectContext();

  if (!state.selectedApi) return <h2>{state.name} API</h2>;

  return <>{state.selectedApi && APIComponents[state.selectedApi]}</>;
}
