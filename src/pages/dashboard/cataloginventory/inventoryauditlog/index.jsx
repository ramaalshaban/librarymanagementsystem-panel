import { lazy, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

import { GridActionsCellItem } from "@mui/x-data-grid";

import { CONFIG } from "src/global-config";
import { useCatalogInventoryListInventoryAuditLogs } from "src/actions/catalogInventory";

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
  title: `InventoryAuditLog data - CatalogInventory module - ${CONFIG.appName}`,
};

const CatalogInventoryUpdateInventoryAuditLogModal = lazy(
  () =>
    import(
      "src/components/modals/cataloginventory/inventoryauditlog/updateinventoryauditlog-modal"
    ),
);

const CatalogInventoryDeleteInventoryAuditLogModal = lazy(
  () =>
    import(
      "src/components/modals/cataloginventory/inventoryauditlog/deleteinventoryauditlog-modal"
    ),
);

export default function CatalogInventoryInventoryAuditLogAppPage() {
  const [selectedInventoryAuditLog, setSelectedInventoryAuditLog] =
    useState(null);

  const openEditDialog = useBoolean();

  const openDeleteDialog = useBoolean();

  const { setField, state } = useDataObjectContext();

  const { searchResults: options, searchLoading: loading } =
    useCatalogInventoryListInventoryAuditLogs();

  const OnEditClickHandler = (row) => {
    setSelectedInventoryAuditLog(row);
    openEditDialog.onTrue();
  };

  const OnDeleteClickHandler = (row) => {
    setSelectedInventoryAuditLog(row);
    openDeleteDialog.onTrue();
  };

  useEffect(() => {
    setField("name", "InventoryAuditLog");
    setField("selectedApi", null);
    setField("defaultListRouteName", "listinventoryAuditLogs");

    setField("createModal", "CatalogInventoryCreateInventoryAuditLogModal");

    setField("cruds", [
      {
        name: "GetInventoryAuditLog",
        method: "GET",
        color: "primary",
        componentName: "CatalogInventoryGetInventoryAuditLogApiPage",
      },

      {
        name: "CreateInventoryAuditLog",
        method: "CREATE",
        color: "success",
        componentName: "CatalogInventoryCreateInventoryAuditLogApiPage",
      },

      {
        name: "UpdateInventoryAuditLog",
        method: "UPDATE",
        color: "info",
        componentName: "CatalogInventoryUpdateInventoryAuditLogApiPage",
      },

      {
        name: "DeleteInventoryAuditLog",
        method: "DELETE",
        color: "error",
        componentName: "CatalogInventoryDeleteInventoryAuditLogApiPage",
      },

      {
        name: "ListInventoryAuditLogs",
        method: "LIST",
        color: "primary",
        componentName: "CatalogInventoryListInventoryAuditLogsApiPage",
      },
    ]);
  }, [setField]);

  const columns = [
    { field: "branchId", headerName: "branchId", flex: 1 },

    { field: "branchInventoryId", headerName: "branchInventoryId", flex: 1 },

    { field: "auditType", headerName: "auditType", flex: 1 },

    { field: "detailNote", headerName: "detailNote", flex: 1 },

    { field: "adjustmentValue", headerName: "adjustmentValue", flex: 1 },

    { field: "recordedByUserId", headerName: "recordedByUserId", flex: 1 },
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

      <CatalogInventoryUpdateInventoryAuditLogModal
        openDialog={openEditDialog}
        selectedInventoryAuditLog={selectedInventoryAuditLog}
      />

      <CatalogInventoryDeleteInventoryAuditLogModal
        openDialog={openDeleteDialog}
        selectedId={selectedInventoryAuditLog?.id}
      />
    </>
  );
}
