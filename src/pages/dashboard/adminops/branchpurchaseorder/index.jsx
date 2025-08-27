import { lazy, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

import { GridActionsCellItem } from "@mui/x-data-grid";

import { CONFIG } from "src/global-config";
import { useAdminOpsListBranchPurchaseOrders } from "src/actions/adminOps";

import { Iconify } from "src/components/iconify";

import { DashboardContent } from "../../../../layouts/dashboard/index.js";
import { useDataObjectContext } from "../../../../components/nav-section/data/context";
import {
  DataObjectApi,
  DataObjectList,
} from "../../../../components/data-object/index.js";
import { useBoolean } from "minimal-shared/hooks";

// ----------------------------------------------------------------------
// TODO: Add the feature to tell the user what crud route need to be created to use add,update and delete

const metadata = {
  title: `BranchPurchaseOrder data - AdminOps module - ${CONFIG.appName}`,
};

const AdminOpsUpdateBranchPurchaseOrderModal = lazy(
  () =>
    import(
      "src/components/modals/adminops/branchpurchaseorder/updatebranchpurchaseorder-modal"
    ),
);

const AdminOpsDeleteBranchPurchaseOrderModal = lazy(
  () =>
    import(
      "src/components/modals/adminops/branchpurchaseorder/deletebranchpurchaseorder-modal"
    ),
);

export default function AdminOpsBranchPurchaseOrderAppPage() {
  const [selectedBranchPurchaseOrder, setSelectedBranchPurchaseOrder] =
    useState(null);

  const openEditDialog = useBoolean();

  const openDeleteDialog = useBoolean();

  const { setField, state } = useDataObjectContext();

  const { searchResults: options, searchLoading: loading } =
    useAdminOpsListBranchPurchaseOrders();

  const OnEditClickHandler = (row) => {
    setSelectedBranchPurchaseOrder(row);
    openEditDialog.onTrue();
  };

  const OnDeleteClickHandler = (row) => {
    setSelectedBranchPurchaseOrder(row);
    openDeleteDialog.onTrue();
  };

  useEffect(() => {
    setField("name", "BranchPurchaseOrder");
    setField("selectedApi", null);
    setField("defaultListRouteName", "listbranchPurchaseOrders");

    setField("createModal", "AdminOpsCreateBranchPurchaseOrderModal");

    setField("cruds", [
      {
        name: "GetBranchPurchaseOrder",
        method: "GET",
        color: "primary",
        componentName: "AdminOpsGetBranchPurchaseOrderApiPage",
      },

      {
        name: "CreateBranchPurchaseOrder",
        method: "CREATE",
        color: "success",
        componentName: "AdminOpsCreateBranchPurchaseOrderApiPage",
      },

      {
        name: "UpdateBranchPurchaseOrder",
        method: "UPDATE",
        color: "info",
        componentName: "AdminOpsUpdateBranchPurchaseOrderApiPage",
      },

      {
        name: "DeleteBranchPurchaseOrder",
        method: "DELETE",
        color: "error",
        componentName: "AdminOpsDeleteBranchPurchaseOrderApiPage",
      },

      {
        name: "ListBranchPurchaseOrders",
        method: "LIST",
        color: "primary",
        componentName: "AdminOpsListBranchPurchaseOrdersApiPage",
      },
    ]);
  }, [setField]);

  const columns = [
    { field: "branchId", headerName: "branchId", flex: 1 },

    { field: "requestedByUserId", headerName: "requestedByUserId", flex: 1 },

    { field: "items", headerName: "items", flex: 1 },

    { field: "status", headerName: "status", flex: 1 },

    { field: "approvedByUserId", headerName: "approvedByUserId", flex: 1 },

    { field: "approvalDate", headerName: "approvalDate", flex: 1 },

    { field: "note", headerName: "note", flex: 1 },
    {
      type: "actions",
      field: "actions",
      headerName: "Actions",
      width: 80,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      getActions: (params) => [
        <GridActionsCellItem
          showInMenu
          icon={<Iconify icon="solar:pen-bold" />}
          label="Update"
          onClick={() => OnEditClickHandler(params.row)}
        />,

        <GridActionsCellItem
          showInMenu
          icon={<Iconify icon="solar:trash-bin-trash-bold" />}
          label="Delete"
          onClick={() => OnDeleteClickHandler(params.row)}
          sx={{ color: "error.main" }}
        />,
      ],
    },
  ];

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <DashboardContent maxWidth="xl">
        {state.display === "List" ? (
          <DataObjectList columns={columns} rows={options} />
        ) : (
          <DataObjectApi />
        )}
      </DashboardContent>

      <AdminOpsUpdateBranchPurchaseOrderModal
        openDialog={openEditDialog}
        selectedBranchPurchaseOrder={selectedBranchPurchaseOrder}
      />

      <AdminOpsDeleteBranchPurchaseOrderModal
        openDialog={openDeleteDialog}
        selectedId={selectedBranchPurchaseOrder?.id}
      />
    </>
  );
}
