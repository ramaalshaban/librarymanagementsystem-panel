import { lazy, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

import { GridActionsCellItem } from "@mui/x-data-grid";

import { CONFIG } from "src/global-config";
import { useLendingListLoans } from "src/actions/lending";

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

const metadata = { title: `Loan data - Lending module - ${CONFIG.appName}` };

const LendingUpdateLoanModal = lazy(
  () => import("src/components/modals/lending/loan/updateloan-modal"),
);

const LendingDeleteLoanModal = lazy(
  () => import("src/components/modals/lending/loan/deleteloan-modal"),
);

export default function LendingLoanAppPage() {
  const [selectedLoan, setSelectedLoan] = useState(null);

  const openEditDialog = useBoolean();

  const openDeleteDialog = useBoolean();

  const { setField, state } = useDataObjectContext();

  const { searchResults: options, searchLoading: loading } =
    useLendingListLoans();

  const OnEditClickHandler = (row) => {
    setSelectedLoan(row);
    openEditDialog.onTrue();
  };

  const OnDeleteClickHandler = (row) => {
    setSelectedLoan(row);
    openDeleteDialog.onTrue();
  };

  useEffect(() => {
    setField("name", "Loan");
    setField("selectedApi", null);
    setField("defaultListRouteName", "listloans");

    setField("createModal", "LendingCreateLoanModal");

    setField("cruds", [
      {
        name: "GetLoan",
        method: "GET",
        color: "primary",
        componentName: "LendingGetLoanApiPage",
      },

      {
        name: "CreateLoan",
        method: "CREATE",
        color: "success",
        componentName: "LendingCreateLoanApiPage",
      },

      {
        name: "UpdateLoan",
        method: "UPDATE",
        color: "info",
        componentName: "LendingUpdateLoanApiPage",
      },

      {
        name: "DeleteLoan",
        method: "DELETE",
        color: "error",
        componentName: "LendingDeleteLoanApiPage",
      },

      {
        name: "ListLoans",
        method: "LIST",
        color: "primary",
        componentName: "LendingListLoansApiPage",
      },
    ]);
  }, [setField]);

  const columns = [
    { field: "userId", headerName: "userId", flex: 1 },

    { field: "bookId", headerName: "bookId", flex: 1 },

    { field: "branchId", headerName: "branchId", flex: 1 },

    { field: "branchInventoryId", headerName: "branchInventoryId", flex: 1 },

    { field: "status", headerName: "status", flex: 1 },

    { field: "checkedOutAt", headerName: "checkedOutAt", flex: 1 },

    { field: "dueDate", headerName: "dueDate", flex: 1 },

    { field: "returnedAt", headerName: "returnedAt", flex: 1 },

    { field: "renewalCount", headerName: "renewalCount", flex: 1 },

    { field: "renewalHistory", headerName: "renewalHistory", flex: 1 },

    { field: "lastRenewedAt", headerName: "lastRenewedAt", flex: 1 },

    { field: "checkedOutBy", headerName: "checkedOutBy", flex: 1 },
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

      <LendingUpdateLoanModal
        openDialog={openEditDialog}
        selectedLoan={selectedLoan}
      />

      <LendingDeleteLoanModal
        openDialog={openDeleteDialog}
        selectedId={selectedLoan?.id}
      />
    </>
  );
}
