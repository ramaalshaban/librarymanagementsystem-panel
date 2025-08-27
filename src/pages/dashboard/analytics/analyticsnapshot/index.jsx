import { lazy, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

import { GridActionsCellItem } from "@mui/x-data-grid";

import { CONFIG } from "src/global-config";
import { useAnalyticsListAnalyticSnapshots } from "src/actions/analytics";

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
  title: `AnalyticSnapshot data - Analytics module - ${CONFIG.appName}`,
};

const AnalyticsUpdateAnalyticSnapshotModal = lazy(
  () =>
    import(
      "src/components/modals/analytics/analyticsnapshot/updateanalyticsnapshot-modal"
    ),
);

const AnalyticsDeleteAnalyticSnapshotModal = lazy(
  () =>
    import(
      "src/components/modals/analytics/analyticsnapshot/deleteanalyticsnapshot-modal"
    ),
);

export default function AnalyticsAnalyticSnapshotAppPage() {
  const [selectedAnalyticSnapshot, setSelectedAnalyticSnapshot] =
    useState(null);

  const openEditDialog = useBoolean();

  const openDeleteDialog = useBoolean();

  const { setField, state } = useDataObjectContext();

  const { searchResults: options, searchLoading: loading } =
    useAnalyticsListAnalyticSnapshots();

  const OnEditClickHandler = (row) => {
    setSelectedAnalyticSnapshot(row);
    openEditDialog.onTrue();
  };

  const OnDeleteClickHandler = (row) => {
    setSelectedAnalyticSnapshot(row);
    openDeleteDialog.onTrue();
  };

  useEffect(() => {
    setField("name", "AnalyticSnapshot");
    setField("selectedApi", null);
    setField("defaultListRouteName", "listanalyticSnapshots");

    setField("createModal", "AnalyticsCreateAnalyticSnapshotModal");

    setField("cruds", [
      {
        name: "GetAnalyticSnapshot",
        method: "GET",
        color: "primary",
        componentName: "AnalyticsGetAnalyticSnapshotApiPage",
      },

      {
        name: "CreateAnalyticSnapshot",
        method: "CREATE",
        color: "success",
        componentName: "AnalyticsCreateAnalyticSnapshotApiPage",
      },

      {
        name: "UpdateAnalyticSnapshot",
        method: "UPDATE",
        color: "info",
        componentName: "AnalyticsUpdateAnalyticSnapshotApiPage",
      },

      {
        name: "DeleteAnalyticSnapshot",
        method: "DELETE",
        color: "error",
        componentName: "AnalyticsDeleteAnalyticSnapshotApiPage",
      },

      {
        name: "ListAnalyticSnapshots",
        method: "LIST",
        color: "primary",
        componentName: "AnalyticsListAnalyticSnapshotsApiPage",
      },
    ]);
  }, [setField]);

  const columns = [
    { field: "snapshotType", headerName: "snapshotType", flex: 1 },

    { field: "scopeType", headerName: "scopeType", flex: 1 },

    { field: "scopeId", headerName: "scopeId", flex: 1 },

    { field: "timeRange", headerName: "timeRange", flex: 1 },

    { field: "data", headerName: "data", flex: 1 },

    { field: "generatedBy", headerName: "generatedBy", flex: 1 },

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

      <AnalyticsUpdateAnalyticSnapshotModal
        openDialog={openEditDialog}
        selectedAnalyticSnapshot={selectedAnalyticSnapshot}
      />

      <AnalyticsDeleteAnalyticSnapshotModal
        openDialog={openDeleteDialog}
        selectedId={selectedAnalyticSnapshot?.id}
      />
    </>
  );
}
