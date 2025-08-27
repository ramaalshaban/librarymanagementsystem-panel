import { lazy, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

import { GridActionsCellItem } from "@mui/x-data-grid";

import { CONFIG } from "src/global-config";
import { useAdminOpsListSystemBackupAudits } from "src/actions/adminOps";

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
  title: `SystemBackupAudit data - AdminOps module - ${CONFIG.appName}`,
};

const AdminOpsUpdateSystemBackupAuditModal = lazy(
  () =>
    import(
      "src/components/modals/adminops/systembackupaudit/updatesystembackupaudit-modal"
    ),
);

const AdminOpsDeleteSystemBackupAuditModal = lazy(
  () =>
    import(
      "src/components/modals/adminops/systembackupaudit/deletesystembackupaudit-modal"
    ),
);

export default function AdminOpsSystemBackupAuditAppPage() {
  const [selectedSystemBackupAudit, setSelectedSystemBackupAudit] =
    useState(null);

  const openEditDialog = useBoolean();

  const openDeleteDialog = useBoolean();

  const { setField, state } = useDataObjectContext();

  const { searchResults: options, searchLoading: loading } =
    useAdminOpsListSystemBackupAudits();

  const OnEditClickHandler = (row) => {
    setSelectedSystemBackupAudit(row);
    openEditDialog.onTrue();
  };

  const OnDeleteClickHandler = (row) => {
    setSelectedSystemBackupAudit(row);
    openDeleteDialog.onTrue();
  };

  useEffect(() => {
    setField("name", "SystemBackupAudit");
    setField("selectedApi", null);
    setField("defaultListRouteName", "listsystemBackupAudits");

    setField("createModal", "AdminOpsCreateSystemBackupAuditModal");

    setField("cruds", [
      {
        name: "GetSystemBackupAudit",
        method: "GET",
        color: "primary",
        componentName: "AdminOpsGetSystemBackupAuditApiPage",
      },

      {
        name: "CreateSystemBackupAudit",
        method: "CREATE",
        color: "success",
        componentName: "AdminOpsCreateSystemBackupAuditApiPage",
      },

      {
        name: "UpdateSystemBackupAudit",
        method: "UPDATE",
        color: "info",
        componentName: "AdminOpsUpdateSystemBackupAuditApiPage",
      },

      {
        name: "DeleteSystemBackupAudit",
        method: "DELETE",
        color: "error",
        componentName: "AdminOpsDeleteSystemBackupAuditApiPage",
      },

      {
        name: "ListSystemBackupAudits",
        method: "LIST",
        color: "primary",
        componentName: "AdminOpsListSystemBackupAuditsApiPage",
      },
    ]);
  }, [setField]);

  const columns = [
    { field: "type", headerName: "type", flex: 1 },

    { field: "config", headerName: "config", flex: 1 },

    { field: "initiatedByUserId", headerName: "initiatedByUserId", flex: 1 },

    { field: "status", headerName: "status", flex: 1 },

    { field: "resultDetails", headerName: "resultDetails", flex: 1 },
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

      <AdminOpsUpdateSystemBackupAuditModal
        openDialog={openEditDialog}
        selectedSystemBackupAudit={selectedSystemBackupAudit}
      />

      <AdminOpsDeleteSystemBackupAuditModal
        openDialog={openDeleteDialog}
        selectedId={selectedSystemBackupAudit?.id}
      />
    </>
  );
}
