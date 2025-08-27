import { lazy, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

import { GridActionsCellItem } from "@mui/x-data-grid";

import { CONFIG } from "src/global-config";
import { useLendingListReservations } from "src/actions/lending";

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
  title: `Reservation data - Lending module - ${CONFIG.appName}`,
};

const LendingUpdateReservationModal = lazy(
  () =>
    import("src/components/modals/lending/reservation/updatereservation-modal"),
);

const LendingDeleteReservationModal = lazy(
  () =>
    import("src/components/modals/lending/reservation/deletereservation-modal"),
);

export default function LendingReservationAppPage() {
  const [selectedReservation, setSelectedReservation] = useState(null);

  const openEditDialog = useBoolean();

  const openDeleteDialog = useBoolean();

  const { setField, state } = useDataObjectContext();

  const { searchResults: options, searchLoading: loading } =
    useLendingListReservations();

  const OnEditClickHandler = (row) => {
    setSelectedReservation(row);
    openEditDialog.onTrue();
  };

  const OnDeleteClickHandler = (row) => {
    setSelectedReservation(row);
    openDeleteDialog.onTrue();
  };

  useEffect(() => {
    setField("name", "Reservation");
    setField("selectedApi", null);
    setField("defaultListRouteName", "listreservations");

    setField("createModal", "LendingCreateReservationModal");

    setField("cruds", [
      {
        name: "GetReservation",
        method: "GET",
        color: "primary",
        componentName: "LendingGetReservationApiPage",
      },

      {
        name: "CreateReservation",
        method: "CREATE",
        color: "success",
        componentName: "LendingCreateReservationApiPage",
      },

      {
        name: "UpdateReservation",
        method: "UPDATE",
        color: "info",
        componentName: "LendingUpdateReservationApiPage",
      },

      {
        name: "DeleteReservation",
        method: "DELETE",
        color: "error",
        componentName: "LendingDeleteReservationApiPage",
      },

      {
        name: "ListReservations",
        method: "LIST",
        color: "primary",
        componentName: "LendingListReservationsApiPage",
      },
    ]);
  }, [setField]);

  const columns = [
    { field: "userId", headerName: "userId", flex: 1 },

    { field: "bookId", headerName: "bookId", flex: 1 },

    { field: "branchId", headerName: "branchId", flex: 1 },

    { field: "status", headerName: "status", flex: 1 },

    { field: "requestedAt", headerName: "requestedAt", flex: 1 },

    { field: "queuePosition", headerName: "queuePosition", flex: 1 },

    {
      field: "activationNotifiedAt",
      headerName: "activationNotifiedAt",
      flex: 1,
    },

    { field: "fulfilledAt", headerName: "fulfilledAt", flex: 1 },
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

      <LendingUpdateReservationModal
        openDialog={openEditDialog}
        selectedReservation={selectedReservation}
      />

      <LendingDeleteReservationModal
        openDialog={openDeleteDialog}
        selectedId={selectedReservation?.id}
      />
    </>
  );
}
