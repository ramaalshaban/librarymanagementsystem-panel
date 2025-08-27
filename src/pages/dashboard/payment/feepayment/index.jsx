import { lazy, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

import { GridActionsCellItem } from "@mui/x-data-grid";

import { CONFIG } from "src/global-config";

import { Iconify } from "src/components/iconify";

import { DashboardContent } from "../../../../layouts/dashboard/index.js";
import { useDataObjectContext } from "../../../../components/nav-section/data/context";
import {
  DataObjectApi,
  DataObjectListNotProvided,
} from "../../../../components/data-object/index.js";
import { useBoolean } from "minimal-shared/hooks";

// ----------------------------------------------------------------------
// TODO: Add the feature to tell the user what crud route need to be created to use add,update and delete

const metadata = {
  title: `FeePayment data - Payment module - ${CONFIG.appName}`,
};

export default function PaymentFeePaymentAppPage() {
  const { setField, state } = useDataObjectContext();

  useEffect(() => {
    setField("name", "FeePayment");
    setField("selectedApi", null);
    setField("defaultListRouteName", "listfeePayments");

    setField("createModal", null);

    setField("cruds", [
      {
        name: "GetPayment",
        method: "GET",
        color: "primary",
        componentName: "PaymentGetPaymentApiPage",
      },

      {
        name: "GetPaymentByOrderId",
        method: "GET",
        color: "primary",
        componentName: "PaymentGetPaymentByOrderIdApiPage",
      },

      {
        name: "GetPaymentByPaymentId",
        method: "GET",
        color: "primary",
        componentName: "PaymentGetPaymentByPaymentIdApiPage",
      },

      {
        name: "CreatePayment",
        method: "CREATE",
        color: "success",
        componentName: "PaymentCreatePaymentApiPage",
      },

      {
        name: "UpdatePayment",
        method: "UPDATE",
        color: "info",
        componentName: "PaymentUpdatePaymentApiPage",
      },

      {
        name: "ListPayments",
        method: "LIST",
        color: "primary",
        componentName: "PaymentListPaymentsApiPage",
      },

      {
        name: "DeletePayment",
        method: "DELETE",
        color: "error",
        componentName: "PaymentDeletePaymentApiPage",
      },
    ]);
  }, [setField]);

  const columns = [
    { field: "ownerId", headerName: "ownerId", flex: 1 },

    { field: "orderId", headerName: "orderId", flex: 1 },

    { field: "paymentId", headerName: "paymentId", flex: 1 },

    { field: "paymentStatus", headerName: "paymentStatus", flex: 1 },

    { field: "statusLiteral", headerName: "statusLiteral", flex: 1 },

    { field: "redirectUrl", headerName: "redirectUrl", flex: 1 },
    {
      type: "actions",
      field: "actions",
      headerName: "Actions",
      width: 80,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      getActions: (params) => [],
    },
  ];

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <DashboardContent maxWidth="xl">
        {state.display === "List" ? (
          <DataObjectListNotProvided />
        ) : (
          <DataObjectApi />
        )}
      </DashboardContent>
    </>
  );
}
e", headerName: "paymentDate", flex: 1 },

    {
      field: "stripePaymentIntentId",
      headerName: "stripePaymentIntentId",
      flex: 1,
    },

    { field: "handledByUserId", headerName: "handledByUserId", flex: 1 },

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

      <PaymentUpdateFeePaymentModal
        openDialog={openEditDialog}
        selectedFeePayment={selectedFeePayment}
      />

      <PaymentDeleteFeePaymentModal
        openDialog={openDeleteDialog}
        selectedId={selectedFeePayment?.id}
      />
    </>
  );
}
