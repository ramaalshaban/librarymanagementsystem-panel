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
  title: `PaymentCustomer data - Payment module - ${CONFIG.appName}`,
};

export default function PaymentPaymentCustomerAppPage() {
  const { setField, state } = useDataObjectContext();

  useEffect(() => {
    setField("name", "PaymentCustomer");
    setField("selectedApi", null);
    setField("defaultListRouteName", "listpaymentCustomers");

    setField("createModal", null);

    setField("cruds", [
      {
        name: "GetCustomerByUserId",
        method: "GET",
        color: "primary",
        componentName: "PaymentGetCustomerByUserIdApiPage",
      },

      {
        name: "ListCustomers",
        method: "LIST",
        color: "primary",
        componentName: "PaymentListCustomersApiPage",
      },
    ]);
  }, [setField]);

  const columns = [
    { field: "userId", headerName: "userId", flex: 1 },

    { field: "customerId", headerName: "customerId", flex: 1 },

    { field: "platform", headerName: "platform", flex: 1 },
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
