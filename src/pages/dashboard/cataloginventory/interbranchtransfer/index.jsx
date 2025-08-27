import { lazy, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

import { GridActionsCellItem } from "@mui/x-data-grid";

import { CONFIG } from "src/global-config";
import { useCatalogInventoryListInterBranchTransfers } from "src/actions/catalogInventory";

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
  title: `InterBranchTransfer data - CatalogInventory module - ${CONFIG.appName}`,
};

const CatalogInventoryUpdateInterBranchTransferModal = lazy(
  () =>
    import(
      "src/components/modals/cataloginventory/interbranchtransfer/updateinterbranchtransfer-modal"
    ),
);

const CatalogInventoryDeleteInterBranchTransferModal = lazy(
  () =>
    import(
      "src/components/modals/cataloginventory/interbranchtransfer/deleteinterbranchtransfer-modal"
    ),
);

export default function CatalogInventoryInterBranchTransferAppPage() {
  const [selectedInterBranchTransfer, setSelectedInterBranchTransfer] =
    useState(null);

  const openEditDialog = useBoolean();

  const openDeleteDialog = useBoolean();

  const { setField, state } = useDataObjectContext();

  const { searchResults: options, searchLoading: loading } =
    useCatalogInventoryListInterBranchTransfers();

  const OnEditClickHandler = (row) => {
    setSelectedInterBranchTransfer(row);
    openEditDialog.onTrue();
  };

  const OnDeleteClickHandler = (row) => {
    setSelectedInterBranchTransfer(row);
    openDeleteDialog.onTrue();
  };

  useEffect(() => {
    setField("name", "InterBranchTransfer");
    setField("selectedApi", null);
    setField("defaultListRouteName", "listinterBranchTransfers");

    setField("createModal", "CatalogInventoryCreateInterBranchTransferModal");

    setField("cruds", [
      {
        name: "GetInterBranchTransfer",
        method: "GET",
        color: "primary",
        componentName: "CatalogInventoryGetInterBranchTransferApiPage",
      },

      {
        name: "CreateInterBranchTransfer",
        method: "CREATE",
        color: "success",
        componentName: "CatalogInventoryCreateInterBranchTransferApiPage",
      },

      {
        name: "UpdateInterBranchTransfer",
        method: "UPDATE",
        color: "info",
        componentName: "CatalogInventoryUpdateInterBranchTransferApiPage",
      },

      {
        name: "DeleteInterBranchTransfer",
        method: "DELETE",
        color: "error",
        componentName: "CatalogInventoryDeleteInterBranchTransferApiPage",
      },

      {
        name: "ListInterBranchTransfers",
        method: "LIST",
        color: "primary",
        componentName: "CatalogInventoryListInterBranchTransfersApiPage",
      },
    ]);
  }, [setField]);

  const columns = [
    { field: "bookId", headerName: "bookId", flex: 1 },

    { field: "sourceBranchId", headerName: "sourceBranchId", flex: 1 },

    { field: "destBranchId", headerName: "destBranchId", flex: 1 },

    { field: "quantity", headerName: "quantity", flex: 1 },

    { field: "requestedByUserId", headerName: "requestedByUserId", flex: 1 },

    { field: "status", headerName: "status", flex: 1 },

    { field: "transferLog", headerName: "transferLog", flex: 1 },
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

      <CatalogInventoryUpdateInterBranchTransferModal
        openDialog={openEditDialog}
        selectedInterBranchTransfer={selectedInterBranchTransfer}
      />

      <CatalogInventoryDeleteInterBranchTransferModal
        openDialog={openDeleteDialog}
        selectedId={selectedInterBranchTransfer?.id}
      />
    </>
  );
}
