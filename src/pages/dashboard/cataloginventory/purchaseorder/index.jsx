import { lazy, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

import { GridActionsCellItem } from "@mui/x-data-grid";

import { CONFIG } from "src/global-config";
import { useCatalogInventoryListPurchaseOrders } from "src/actions/catalogInventory";

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
  title: `PurchaseOrder data - CatalogInventory module - ${CONFIG.appName}`,
};

const CatalogInventoryUpdatePurchaseOrderModal = lazy(
  () =>
    import(
      "src/components/modals/cataloginventory/purchaseorder/updatepurchaseorder-modal"
    ),
);

const CatalogInventoryDeletePurchaseOrderModal = lazy(
  () =>
    import(
      "src/components/modals/cataloginventory/purchaseorder/deletepurchaseorder-modal"
    ),
);

export default function CatalogInventoryPurchaseOrderAppPage() {
  const [selectedPurchaseOrder, setSelectedPurchaseOrder] = useState(null);

  const openEditDialog = useBoolean();

  const openDeleteDialog = useBoolean();

  const { setField, state } = useDataObjectContext();

  const { searchResults: options, searchLoading: loading } =
    useCatalogInventoryListPurchaseOrders();

  const OnEditClickHandler = (row) => {
    setSelectedPurchaseOrder(row);
    openEditDialog.onTrue();
  };

  const OnDeleteClickHandler = (row) => {
    setSelectedPurchaseOrder(row);
    openDeleteDialog.onTrue();
  };

  useEffect(() => {
    setField("name", "PurchaseOrder");
    setField("selectedApi", null);
    setField("defaultListRouteName", "listpurchaseOrders");

    setField("createModal", "CatalogInventoryCreatePurchaseOrderModal");

    setField("cruds", [
      {
        name: "GetPurchaseOrder",
        method: "GET",
        color: "primary",
        componentName: "CatalogInventoryGetPurchaseOrderApiPage",
      },

      {
        name: "CreatePurchaseOrder",
        method: "CREATE",
        color: "success",
        componentName: "CatalogInventoryCreatePurchaseOrderApiPage",
      },

      {
        name: "UpdatePurchaseOrder",
        method: "UPDATE",
        color: "info",
        componentName: "CatalogInventoryUpdatePurchaseOrderApiPage",
      },

      {
        name: "DeletePurchaseOrder",
        method: "DELETE",
        color: "error",
        componentName: "CatalogInventoryDeletePurchaseOrderApiPage",
      },

      {
        name: "ListPurchaseOrders",
        method: "LIST",
        color: "primary",
        componentName: "CatalogInventoryListPurchaseOrdersApiPage",
      },
    ]);
  }, [setField]);

  const columns = [
    { field: "branchId", headerName: "branchId", flex: 1 },

    { field: "requestedByUserId", headerName: "requestedByUserId", flex: 1 },

    { field: "itemRequests", headerName: "itemRequests", flex: 1 },

    { field: "status", headerName: "status", flex: 1 },

    { field: "approvalNotes", headerName: "approvalNotes", flex: 1 },
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

      <CatalogInventoryUpdatePurchaseOrderModal
        openDialog={openEditDialog}
        selectedPurchaseOrder={selectedPurchaseOrder}
      />

      <CatalogInventoryDeletePurchaseOrderModal
        openDialog={openDeleteDialog}
        selectedId={selectedPurchaseOrder?.id}
      />
    </>
  );
}
