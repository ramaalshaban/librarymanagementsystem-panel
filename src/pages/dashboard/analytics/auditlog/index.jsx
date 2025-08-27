import { lazy, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

import { GridActionsCellItem } from "@mui/x-data-grid";

import { CONFIG } from "src/global-config";
import { useAnalyticsListAuditLogs } from "src/actions/analytics";

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
  title: `AuditLog data - Analytics module - ${CONFIG.appName}`,
};

const AnalyticsUpdateAuditLogModal = lazy(
  () => import("src/components/modals/analytics/auditlog/updateauditlog-modal"),
);

const AnalyticsDeleteAuditLogModal = lazy(
  () => import("src/components/modals/analytics/auditlog/deleteauditlog-modal"),
);

export default function AnalyticsAuditLogAppPage() {
  const [selectedAuditLog, setSelectedAuditLog] = useState(null);

  const openEditDialog = useBoolean();

  const openDeleteDialog = useBoolean();

  const { setField, state } = useDataObjectContext();

  const { searchResults: options, searchLoading: loading } =
    useAnalyticsListAuditLogs();

  const OnEditClickHandler = (row) => {
    setSelectedAuditLog(row);
    openEditDialog.onTrue();
  };

  const OnDeleteClickHandler = (row) => {
    setSelectedAuditLog(row);
    openDeleteDialog.onTrue();
  };

  useEffect(() => {
    setField("name", "AuditLog");
    setField("selectedApi", null);
    setField("defaultListRouteName", "listauditLogs");

    setField("createModal", "AnalyticsCreateAuditLogModal");

    setField("cruds", [
      {
        name: "GetAuditLog",
        method: "GET",
        color: "primary",
        componentName: "AnalyticsGetAuditLogApiPage",
      },

      {
        name: "CreateAuditLog",
        method: "CREATE",
        color: "success",
        componentName: "AnalyticsCreateAuditLogApiPage",
      },

      {
        name: "UpdateAuditLog",
        method: "UPDATE",
        color: "info",
        componentName: "AnalyticsUpdateAuditLogApiPage",
      },

      {
        name: "DeleteAuditLog",
        method: "DELETE",
        color: "error",
        componentName: "AnalyticsDeleteAuditLogApiPage",
      },

      {
        name: "ListAuditLogs",
        method: "LIST",
        color: "primary",
        componentName: "AnalyticsListAuditLogsApiPage",
      },
    ]);
  }, [setField]);

  const columns = [
    { field: "actorUserId", headerName: "actorUserId", flex: 1 },

    { field: "actionType", headerName: "actionType", flex: 1 },

    { field: "targetObjectType", headerName: "targetObjectType", flex: 1 },

    { field: "targetObjectId", headerName: "targetObjectId", flex: 1 },

    { field: "context", headerName: "context", flex: 1 },

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

      <AnalyticsUpdateAuditLogModal
        openDialog={openEditDialog}
        selectedAuditLog={selectedAuditLog}
      />

      <AnalyticsDeleteAuditLogModal
        openDialog={openDeleteDialog}
        selectedId={selectedAuditLog?.id}
      />
    </>
  );
}
