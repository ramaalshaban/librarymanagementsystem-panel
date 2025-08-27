import { lazy, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

import { GridActionsCellItem } from "@mui/x-data-grid";

import { CONFIG } from "src/global-config";
import { useAdminOpsListExternalNotificationConfigs } from "src/actions/adminOps";

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
  title: `ExternalNotificationConfig data - AdminOps module - ${CONFIG.appName}`,
};

const AdminOpsUpdateExternalNotificationConfigModal = lazy(
  () =>
    import(
      "src/components/modals/adminops/externalnotificationconfig/updateexternalnotificationconfig-modal"
    ),
);

const AdminOpsDeleteExternalNotificationConfigModal = lazy(
  () =>
    import(
      "src/components/modals/adminops/externalnotificationconfig/deleteexternalnotificationconfig-modal"
    ),
);

export default function AdminOpsExternalNotificationConfigAppPage() {
  const [
    selectedExternalNotificationConfig,
    setSelectedExternalNotificationConfig,
  ] = useState(null);

  const openEditDialog = useBoolean();

  const openDeleteDialog = useBoolean();

  const { setField, state } = useDataObjectContext();

  const { searchResults: options, searchLoading: loading } =
    useAdminOpsListExternalNotificationConfigs();

  const OnEditClickHandler = (row) => {
    setSelectedExternalNotificationConfig(row);
    openEditDialog.onTrue();
  };

  const OnDeleteClickHandler = (row) => {
    setSelectedExternalNotificationConfig(row);
    openDeleteDialog.onTrue();
  };

  useEffect(() => {
    setField("name", "ExternalNotificationConfig");
    setField("selectedApi", null);
    setField("defaultListRouteName", "listexternalNotificationConfigs");

    setField("createModal", "AdminOpsCreateExternalNotificationConfigModal");

    setField("cruds", [
      {
        name: "GetExternalNotificationConfig",
        method: "GET",
        color: "primary",
        componentName: "AdminOpsGetExternalNotificationConfigApiPage",
      },

      {
        name: "CreateExternalNotificationConfig",
        method: "CREATE",
        color: "success",
        componentName: "AdminOpsCreateExternalNotificationConfigApiPage",
      },

      {
        name: "UpdateExternalNotificationConfig",
        method: "UPDATE",
        color: "info",
        componentName: "AdminOpsUpdateExternalNotificationConfigApiPage",
      },

      {
        name: "DeleteExternalNotificationConfig",
        method: "DELETE",
        color: "error",
        componentName: "AdminOpsDeleteExternalNotificationConfigApiPage",
      },

      {
        name: "ListExternalNotificationConfigs",
        method: "LIST",
        color: "primary",
        componentName: "AdminOpsListExternalNotificationConfigsApiPage",
      },
    ]);
  }, [setField]);

  const columns = [
    { field: "providerType", headerName: "providerType", flex: 1 },

    { field: "name", headerName: "name", flex: 1 },

    { field: "settings", headerName: "settings", flex: 1 },

    { field: "status", headerName: "status", flex: 1 },
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

      <AdminOpsUpdateExternalNotificationConfigModal
        openDialog={openEditDialog}
        selectedExternalNotificationConfig={selectedExternalNotificationConfig}
      />

      <AdminOpsDeleteExternalNotificationConfigModal
        openDialog={openDeleteDialog}
        selectedId={selectedExternalNotificationConfig?.id}
      />
    </>
  );
}
