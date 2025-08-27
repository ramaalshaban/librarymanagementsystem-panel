import { lazy, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

import { GridActionsCellItem } from "@mui/x-data-grid";

import { CONFIG } from "src/global-config";
import { usePaymentListFeeEvents } from "src/actions/payment";

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
  title: `FeeEvent data - Payment module - ${CONFIG.appName}`,
};

const PaymentUpdateFeeEventModal = lazy(
  () => import("src/components/modals/payment/feeevent/updatefeeevent-modal"),
);

const PaymentDeleteFeeEventModal = lazy(
  () => import("src/components/modals/payment/feeevent/deletefeeevent-modal"),
);

export default function PaymentFeeEventAppPage() {
  const [selectedFeeEvent, setSelectedFeeEvent] = useState(null);

  const openEditDialog = useBoolean();

  const openDeleteDialog = useBoolean();

  const { setField, state } = useDataObjectContext();

  const { searchResults: options, searchLoading: loading } =
    usePaymentListFeeEvents();

  const OnEditClickHandler = (row) => {
    setSelectedFeeEvent(row);
    openEditDialog.onTrue();
  };

  const OnDeleteClickHandler = (row) => {
    setSelectedFeeEvent(row);
    openDeleteDialog.onTrue();
  };

  useEffect(() => {
    setField("name", "FeeEvent");
    setField("selectedApi", null);
    setField("defaultListRouteName", "listfeeEvents");

    setField("createModal", "PaymentCreateFeeEventModal");

    setField("cruds", [
      {
        name: "GetFeeEvent",
        method: "GET",
        color: "primary",
        componentName: "PaymentGetFeeEventApiPage",
      },

      {
        name: "CreateFeeEvent",
        method: "CREATE",
        color: "success",
        componentName: "PaymentCreateFeeEventApiPage",
      },

      {
        name: "UpdateFeeEvent",
        method: "UPDATE",
        color: "info",
        componentName: "PaymentUpdateFeeEventApiPage",
      },

      {
        name: "DeleteFeeEvent",
        method: "DELETE",
        color: "error",
        componentName: "PaymentDeleteFeeEventApiPage",
      },

      {
        name: "ListFeeEvents",
        method: "LIST",
        color: "primary",
        componentName: "PaymentListFeeEventsApiPage",
      },
    ]);
  }, [setField]);

  const columns = [
    { field: "feeId", headerName: "feeId", flex: 1 },

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

      <PaymentUpdateFeeEventModal
        openDialog={openEditDialog}
        selectedFeeEvent={selectedFeeEvent}
      />

      <PaymentDeleteFeeEventModal
        openDialog={openDeleteDialog}
        selectedId={selectedFeeEvent?.id}
      />
    </>
  );
}
