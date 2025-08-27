import { lazy, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

import { GridActionsCellItem } from "@mui/x-data-grid";

import { CONFIG } from "src/global-config";
import { useAdminOpsListMongoAdminConfigs } from "src/actions/adminOps";

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
  title: `MongoAdminConfig data - AdminOps module - ${CONFIG.appName}`,
};

const AdminOpsUpdateMongoAdminConfigModal = lazy(
  () =>
    import(
      "src/components/modals/adminops/mongoadminconfig/updatemongoadminconfig-modal"
    ),
);

const AdminOpsDeleteMongoAdminConfigModal = lazy(
  () =>
    import(
      "src/components/modals/adminops/mongoadminconfig/deletemongoadminconfig-modal"
    ),
);

export default function AdminOpsMongoAdminConfigAppPage() {
  const [selectedMongoAdminConfig, setSelectedMongoAdminConfig] =
    useState(null);

  const openEditDialog = useBoolean();

  const openDeleteDialog = useBoolean();

  const { setField, state } = useDataObjectContext();

  const { searchResults: options, searchLoading: loading } =
    useAdminOpsListMongoAdminConfigs();

  const OnEditClickHandler = (row) => {
    setSelectedMongoAdminConfig(row);
    openEditDialog.onTrue();
  };

  const OnDeleteClickHandler = (row) => {
    setSelectedMongoAdminConfig(row);
    openDeleteDialog.onTrue();
  };

  useEffect(() => {
    setField("name", "MongoAdminConfig");
    setField("selectedApi", null);
    setField("defaultListRouteName", "listmongoAdminConfigs");

    setField("createModal", "AdminOpsCreateMongoAdminConfigModal");

    setField("cruds", [
      {
        name: "GetMongoAdminConfig",
        method: "GET",
        color: "primary",
        componentName: "AdminOpsGetMongoAdminConfigApiPage",
      },

      {
        name: "CreateMongoAdminConfig",
        method: "CREATE",
        color: "success",
        componentName: "AdminOpsCreateMongoAdminConfigApiPage",
      },

      {
        name: "UpdateMongoAdminConfig",
        method: "UPDATE",
        color: "info",
        componentName: "AdminOpsUpdateMongoAdminConfigApiPage",
      },

      {
        name: "DeleteMongoAdminConfig",
        method: "DELETE",
        color: "error",
        componentName: "AdminOpsDeleteMongoAdminConfigApiPage",
      },

      {
        name: "ListMongoAdminConfigs",
        method: "LIST",
        color: "primary",
        componentName: "AdminOpsListMongoAdminConfigsApiPage",
      },
    ]);
  }, [setField]);

  const columns = [
    { field: "configType", headerName: "configType", flex: 1 },

    { field: "targetObject", headerName: "targetObject", flex: 1 },

    { field: "configDetails", headerName: "configDetails", flex: 1 },

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

      <AdminOpsUpdateMongoAdminConfigModal
        openDialog={openEditDialog}
        selectedMongoAdminConfig={selectedMongoAdminConfig}
      />

      <AdminOpsDeleteMongoAdminConfigModal
        openDialog={openDeleteDialog}
        selectedId={selectedMongoAdminConfig?.id}
      />
    </>
  );
}
