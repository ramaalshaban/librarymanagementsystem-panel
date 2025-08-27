import { lazy, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

import { GridActionsCellItem } from "@mui/x-data-grid";

import { CONFIG } from "src/global-config";
import { useReviewEngagementListEngagementEvents } from "src/actions/reviewEngagement";

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
  title: `EngagementEvent data - ReviewEngagement module - ${CONFIG.appName}`,
};

const ReviewEngagementUpdateEngagementEventModal = lazy(
  () =>
    import(
      "src/components/modals/reviewengagement/engagementevent/updateengagementevent-modal"
    ),
);

const ReviewEngagementDeleteEngagementEventModal = lazy(
  () =>
    import(
      "src/components/modals/reviewengagement/engagementevent/deleteengagementevent-modal"
    ),
);

export default function ReviewEngagementEngagementEventAppPage() {
  const [selectedEngagementEvent, setSelectedEngagementEvent] = useState(null);

  const openEditDialog = useBoolean();

  const openDeleteDialog = useBoolean();

  const { setField, state } = useDataObjectContext();

  const { searchResults: options, searchLoading: loading } =
    useReviewEngagementListEngagementEvents();

  const OnEditClickHandler = (row) => {
    setSelectedEngagementEvent(row);
    openEditDialog.onTrue();
  };

  const OnDeleteClickHandler = (row) => {
    setSelectedEngagementEvent(row);
    openDeleteDialog.onTrue();
  };

  useEffect(() => {
    setField("name", "EngagementEvent");
    setField("selectedApi", null);
    setField("defaultListRouteName", "listengagementEvents");

    setField("createModal", "ReviewEngagementCreateEngagementEventModal");

    setField("cruds", [
      {
        name: "GetEngagementEvent",
        method: "GET",
        color: "primary",
        componentName: "ReviewEngagementGetEngagementEventApiPage",
      },

      {
        name: "CreateEngagementEvent",
        method: "CREATE",
        color: "success",
        componentName: "ReviewEngagementCreateEngagementEventApiPage",
      },

      {
        name: "UpdateEngagementEvent",
        method: "UPDATE",
        color: "info",
        componentName: "ReviewEngagementUpdateEngagementEventApiPage",
      },

      {
        name: "DeleteEngagementEvent",
        method: "DELETE",
        color: "error",
        componentName: "ReviewEngagementDeleteEngagementEventApiPage",
      },

      {
        name: "ListEngagementEvents",
        method: "LIST",
        color: "primary",
        componentName: "ReviewEngagementListEngagementEventsApiPage",
      },
    ]);
  }, [setField]);

  const columns = [
    { field: "userId", headerName: "userId", flex: 1 },

    { field: "eventType", headerName: "eventType", flex: 1 },

    { field: "eventTime", headerName: "eventTime", flex: 1 },

    { field: "details", headerName: "details", flex: 1 },

    { field: "bookId", headerName: "bookId", flex: 1 },
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

      <ReviewEngagementUpdateEngagementEventModal
        openDialog={openEditDialog}
        selectedEngagementEvent={selectedEngagementEvent}
      />

      <ReviewEngagementDeleteEngagementEventModal
        openDialog={openDeleteDialog}
        selectedId={selectedEngagementEvent?.id}
      />
    </>
  );
}
