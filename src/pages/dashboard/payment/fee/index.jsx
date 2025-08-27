import { lazy, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

import { GridActionsCellItem } from "@mui/x-data-grid";

import { CONFIG } from "src/global-config";
import { usePaymentListFees } from "src/actions/payment";

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

const metadata = { title: `Fee data - Payment module - ${CONFIG.appName}` };

const PaymentUpdateFeeModal = lazy(
  () => import("src/components/modals/payment/fee/updatefee-modal"),
);

const PaymentDeleteFeeModal = lazy(
  () => import("src/components/modals/payment/fee/deletefee-modal"),
);

export default function PaymentFeeAppPage() {
  const [selectedFee, setSelectedFee] = useState(null);

  const openEditDialog = useBoolean();

  const openDeleteDialog = useBoolean();

  const { setField, state } = useDataObjectContext();

  const { searchResults: options, searchLoading: loading } =
    usePaymentListFees();

  const OnEditClickHandler = (row) => {
    setSelectedFee(row);
    openEditDialog.onTrue();
  };

  const OnDeleteClickHandler = (row) => {
    setSelectedFee(row);
    openDeleteDialog.onTrue();
  };

  useEffect(() => {
    setField("name", "Fee");
    setField("selectedApi", null);
    setField("defaultListRouteName", "listfees");

    setField("createModal", "PaymentCreateFeeModal");

    setField("cruds", [
      {
        name: "GetFee",
        method: "GET",
        color: "primary",
        componentName: "PaymentGetFeeApiPage",
      },

      {
        name: "CreateFee",
        method: "CREATE",
        color: "success",
        componentName: "PaymentCreateFeeApiPage",
      },

      {
        name: "UpdateFee",
        method: "UPDATE",
        color: "info",
        componentName: "PaymentUpdateFeeApiPage",
      },

      {
        name: "DeleteFee",
        method: "DELETE",
        color: "error",
        componentName: "PaymentDeleteFeeApiPage",
      },

      {
        name: "ListFees",
        method: "LIST",
        color: "primary",
        componentName: "PaymentListFeesApiPage",
      },

      {
        name: "CheckoutstartFee",
        method: "UPDATE",
        color: "info",
        componentName: "PaymentCheckoutstartFeeApiPage",
      },

      {
        name: "CheckoutcompleteFee",
        method: "UPDATE",
        color: "info",
        componentName: "PaymentCheckoutcompleteFeeApiPage",
      },

      {
        name: "CheckoutrefreshFee",
        method: "UPDATE",
        color: "info",
        componentName: "PaymentCheckoutrefreshFeeApiPage",
      },
    ]);
  }, [setField]);

  const columns = [
    { field: "userId", headerName: "userId", flex: 1 },

    { field: "loanId", headerName: "loanId", flex: 1 },

    { field: "amount", headerName: "amount", flex: 1 },

    { field: "currency", headerName: "currency", flex: 1 },

    { field: "status", headerName: "status", flex: 1 },

    { field: "statusUpdateDate", headerName: "statusUpdateDate", flex: 1 },

    { field: "reason", headerName: "reason", flex: 1 },

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

      <PaymentUpdateFeeModal
        openDialog={openEditDialog}
        selectedFee={selectedFee}
      />

      <PaymentDeleteFeeModal
        openDialog={openDeleteDialog}
        selectedId={selectedFee?.id}
      />
    </>
  );
}
