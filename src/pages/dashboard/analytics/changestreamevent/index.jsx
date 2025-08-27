import { lazy, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

import { GridActionsCellItem } from "@mui/x-data-grid";

import { CONFIG } from "src/global-config";
import { useAnalyticsListChangeStreamEvents } from "src/actions/analytics";

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
  title: `ChangeStreamEvent data - Analytics module - ${CONFIG.appName}`,
};

const AnalyticsDeleteChangeStreamEventModal = lazy(
  () =>
    import(
      "src/components/modals/analytics/changestreamevent/deletechangestreamevent-modal"
    ),
);

export default function AnalyticsChangeStreamEventAppPage() {
  const [selectedChangeStreamEvent, setSelectedChangeStreamEvent] =
    useState(null);

  const openDeleteDialog = useBoolean();

  const { setField, state } = useDataObjectContext();

  const { searchResults: options, searchLoading: loading } =
    useAnalyticsListChangeStreamEvents();

  const OnDeleteClickHandler = (row) => {
    setSelectedChangeStreamEvent(row);
    openDeleteDialog.onTrue();
  };

  useEffect(() => {
    setField("name", "ChangeStreamEvent");
    setField("selectedApi", null);
    setField("defaultListRouteName", "listchangeStreamEvents");

    setField("createModal", "AnalyticsCreateChangeStreamEventModal");

    setField("cruds", [
      {
        name: "GetChangeStreamEvent",
        method: "GET",
        color: "primary",
        componentName: "AnalyticsGetChangeStreamEventApiPage",
      },

      {
        name: "CreateChangeStreamEvent",
        method: "CREATE",
        color: "success",
        componentName: "AnalyticsCreateChangeStreamEventApiPage",
      },

      {
        name: "DeleteChangeStreamEvent",
        method: "DELETE",
        color: "error",
        componentName: "AnalyticsDeleteChangeStreamEventApiPage",
      },

      {
        name: "ListChangeStreamEvents",
        method: "LIST",
        color: "primary",
        componentName: "AnalyticsListChangeStreamEventsApiPage",
      },
    ]);
  }, [setField]);

  const columns = [
    { field: "streamName", headerName: "streamName", flex: 1 },

    { field: "payload", headerName: "payload", flex: 1 },

    { field: "sourceObject", headerName: "sourceObject", flex: 1 },
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

      <AnalyticsDeleteChangeStreamEventModal
        openDialog={openDeleteDialog}
        selectedId={selectedChangeStreamEvent?.id}
      />
    </>
  );
}
