import { lazy, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

import { GridActionsCellItem } from "@mui/x-data-grid";

import { CONFIG } from "src/global-config";
import { useLendingListLoanEvents } from "src/actions/lending";

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
  title: `LoanEvent data - Lending module - ${CONFIG.appName}`,
};

const LendingUpdateLoanEventModal = lazy(
  () => import("src/components/modals/lending/loanevent/updateloanevent-modal"),
);

const LendingDeleteLoanEventModal = lazy(
  () => import("src/components/modals/lending/loanevent/deleteloanevent-modal"),
);

export default function LendingLoanEventAppPage() {
  const [selectedLoanEvent, setSelectedLoanEvent] = useState(null);

  const openEditDialog = useBoolean();

  const openDeleteDialog = useBoolean();

  const { setField, state } = useDataObjectContext();

  const { searchResults: options, searchLoading: loading } =
    useLendingListLoanEvents();

  const OnEditClickHandler = (row) => {
    setSelectedLoanEvent(row);
    openEditDialog.onTrue();
  };

  const OnDeleteClickHandler = (row) => {
    setSelectedLoanEvent(row);
    openDeleteDialog.onTrue();
  };

  useEffect(() => {
    setField("name", "LoanEvent");
    setField("selectedApi", null);
    setField("defaultListRouteName", "listloanEvents");

    setField("createModal", "LendingCreateLoanEventModal");

    setField("cruds", [
      {
        name: "GetLoanEvent",
        method: "GET",
        color: "primary",
        componentName: "LendingGetLoanEventApiPage",
      },

      {
        name: "CreateLoanEvent",
        method: "CREATE",
        color: "success",
        componentName: "LendingCreateLoanEventApiPage",
      },

      {
        name: "UpdateLoanEvent",
        method: "UPDATE",
        color: "info",
        componentName: "LendingUpdateLoanEventApiPage",
      },

      {
        name: "DeleteLoanEvent",
        method: "DELETE",
        color: "error",
        componentName: "LendingDeleteLoanEventApiPage",
      },

      {
        name: "ListLoanEvents",
        method: "LIST",
        color: "primary",
        componentName: "LendingListLoanEventsApiPage",
      },
    ]);
  }, [setField]);

  const columns = [
    { field: "loanId", headerName: "loanId", flex: 1 },

    { field: "eventType", headerName: "eventType", flex: 1 },

    { field: "eventDate", headerName: "eventDate", flex: 1 },

    { field: "actorUserId", headerName: "actorUserId", flex: 1 },

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

      <LendingUpdateLoanEventModal
        openDialog={openEditDialog}
        selectedLoanEvent={selectedLoanEvent}
      />

      <LendingDeleteLoanEventModal
        openDialog={openDeleteDialog}
        selectedId={selectedLoanEvent?.id}
      />
    </>
  );
}
