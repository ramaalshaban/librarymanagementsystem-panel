import { useState, lazy } from "react";
import { useBoolean } from "minimal-shared/hooks";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import {
  DataGrid,
  gridClasses,
  GridToolbarExport,
  GridToolbarContainer,
  GridToolbarQuickFilter,
  GridToolbarFilterButton,
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";

import { EmptyContent } from "src/components/empty-content";

import { Iconify } from "../iconify/index.js";
import { useDataObjectContext } from "../nav-section/data/context/index.js";

const CatalogInventoryCreateBookModal = lazy(
  () => import("src/components/modals/cataloginventory/book/createbook-modal"),
);

const CatalogInventoryCreateBranchModal = lazy(
  () =>
    import("src/components/modals/cataloginventory/branch/createbranch-modal"),
);

const CatalogInventoryCreateBranchInventoryModal = lazy(
  () =>
    import(
      "src/components/modals/cataloginventory/branchinventory/createbranchinventory-modal"
    ),
);

const CatalogInventoryCreateInventoryAuditLogModal = lazy(
  () =>
    import(
      "src/components/modals/cataloginventory/inventoryauditlog/createinventoryauditlog-modal"
    ),
);

const CatalogInventoryCreateInterBranchTransferModal = lazy(
  () =>
    import(
      "src/components/modals/cataloginventory/interbranchtransfer/createinterbranchtransfer-modal"
    ),
);

const CatalogInventoryCreatePurchaseOrderModal = lazy(
  () =>
    import(
      "src/components/modals/cataloginventory/purchaseorder/createpurchaseorder-modal"
    ),
);

const LendingCreateLoanModal = lazy(
  () => import("src/components/modals/lending/loan/createloan-modal"),
);

const LendingCreateReservationModal = lazy(
  () =>
    import("src/components/modals/lending/reservation/createreservation-modal"),
);

const LendingCreateLoanEventModal = lazy(
  () => import("src/components/modals/lending/loanevent/createloanevent-modal"),
);

const ReviewEngagementCreateReviewModal = lazy(
  () =>
    import("src/components/modals/reviewengagement/review/createreview-modal"),
);

const ReviewEngagementCreateRecommendationModal = lazy(
  () =>
    import(
      "src/components/modals/reviewengagement/recommendation/createrecommendation-modal"
    ),
);

const ReviewEngagementCreateEngagementEventModal = lazy(
  () =>
    import(
      "src/components/modals/reviewengagement/engagementevent/createengagementevent-modal"
    ),
);

const PaymentCreateFeeModal = lazy(
  () => import("src/components/modals/payment/fee/createfee-modal"),
);

const PaymentCreateFeePaymentModal = lazy(
  () =>
    import("src/components/modals/payment/feepayment/createfeepayment-modal"),
);

const PaymentCreateFeeEventModal = lazy(
  () => import("src/components/modals/payment/feeevent/createfeeevent-modal"),
);

const AnalyticsCreateAnalyticSnapshotModal = lazy(
  () =>
    import(
      "src/components/modals/analytics/analyticsnapshot/createanalyticsnapshot-modal"
    ),
);

const AnalyticsCreateAuditLogModal = lazy(
  () => import("src/components/modals/analytics/auditlog/createauditlog-modal"),
);

const AnalyticsCreateChangeStreamEventModal = lazy(
  () =>
    import(
      "src/components/modals/analytics/changestreamevent/createchangestreamevent-modal"
    ),
);

const AdminOpsCreateBranchStaffAssignmentModal = lazy(
  () =>
    import(
      "src/components/modals/adminops/branchstaffassignment/createbranchstaffassignment-modal"
    ),
);

const AdminOpsCreateIssueEscalationModal = lazy(
  () =>
    import(
      "src/components/modals/adminops/issueescalation/createissueescalation-modal"
    ),
);

const AdminOpsCreateMongoAdminConfigModal = lazy(
  () =>
    import(
      "src/components/modals/adminops/mongoadminconfig/createmongoadminconfig-modal"
    ),
);

const AdminOpsCreateExternalNotificationConfigModal = lazy(
  () =>
    import(
      "src/components/modals/adminops/externalnotificationconfig/createexternalnotificationconfig-modal"
    ),
);

const AdminOpsCreateSystemBackupAuditModal = lazy(
  () =>
    import(
      "src/components/modals/adminops/systembackupaudit/createsystembackupaudit-modal"
    ),
);

const AdminOpsCreateBranchPurchaseOrderModal = lazy(
  () =>
    import(
      "src/components/modals/adminops/branchpurchaseorder/createbranchpurchaseorder-modal"
    ),
);

const CreateModals = {
  CatalogInventoryCreateBookModal,

  CatalogInventoryCreateBranchModal,

  CatalogInventoryCreateBranchInventoryModal,

  CatalogInventoryCreateInventoryAuditLogModal,

  CatalogInventoryCreateInterBranchTransferModal,

  CatalogInventoryCreatePurchaseOrderModal,

  LendingCreateLoanModal,

  LendingCreateReservationModal,

  LendingCreateLoanEventModal,

  ReviewEngagementCreateReviewModal,

  ReviewEngagementCreateRecommendationModal,

  ReviewEngagementCreateEngagementEventModal,

  PaymentCreateFeeModal,

  PaymentCreateFeePaymentModal,

  PaymentCreateFeeEventModal,

  AnalyticsCreateAnalyticSnapshotModal,

  AnalyticsCreateAuditLogModal,

  AnalyticsCreateChangeStreamEventModal,

  AdminOpsCreateBranchStaffAssignmentModal,

  AdminOpsCreateIssueEscalationModal,

  AdminOpsCreateMongoAdminConfigModal,

  AdminOpsCreateExternalNotificationConfigModal,

  AdminOpsCreateSystemBackupAuditModal,

  AdminOpsCreateBranchPurchaseOrderModal,
};

export function DataObjectList({ columns, rows }) {
  const [filterButtonEl, setFilterButtonEl] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const { state } = useDataObjectContext();
  const openAddDialog = useBoolean();

  const getTogglableColumns = () => columns.map((column) => column.field);

  const CreateModal = CreateModals[state.createModal];
  return (
    <>
      <h2>{state.name} List</h2>

      <Divider />

      <DataGrid
        checkboxSelection
        disableRowSelectionOnClick
        columns={columns}
        rows={rows == null ? [] : rows}
        onRowSelectionModelChange={(newSelectionModel) => {
          setSelectedRows(newSelectionModel);
        }}
        initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
        pageSizeOptions={[5, 10, 20, 50, { value: -1, label: "All" }]}
        slots={{
          toolbar: CustomToolbar,
          noRowsOverlay: () => <EmptyContent />,
          noResultsOverlay: () => <EmptyContent title="No results found" />,
        }}
        slotProps={{
          panel: { anchorEl: filterButtonEl },
          toolbar: {
            setFilterButtonEl,
            showQuickFilter: true,
            dataObject: state.name,
            onAddClickHandler: openAddDialog.onTrue,
            createModal: CreateModal,
          },
          columnsManagement: { getTogglableColumns },
        }}
        sx={{
          [`& .${gridClasses.cell}`]: {
            alignItems: "center",
            display: "inline-flex",
          },
        }}
      />

      {CreateModal && <CreateModal openDialog={openAddDialog} />}
    </>
  );
}

function CustomToolbar({
  setFilterButtonEl,
  dataObject,
  onAddClickHandler,
  createModal,
}) {
  return (
    <GridToolbarContainer>
      <GridToolbarQuickFilter />
      <Box sx={{ flexGrow: 1 }} />
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton ref={setFilterButtonEl} />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
      {createModal && (
        <Button
          onClick={onAddClickHandler}
          startIcon={<Iconify icon="material-symbols:add" />}
        >
          Add {dataObject}
        </Button>
      )}
      {/* TODO: implement delete multi selected */}
      {/* <Button color="error" startIcon={<Iconify icon="icomoon-free:bin" />}>
                Delete
            </Button> */}
    </GridToolbarContainer>
  );
}
