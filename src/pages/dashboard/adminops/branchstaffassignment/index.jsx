import { lazy, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

import { GridActionsCellItem } from "@mui/x-data-grid";

import { CONFIG } from "src/global-config";
import { useAdminOpsListBranchStaffAssignments } from "src/actions/adminOps";

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
  title: `BranchStaffAssignment data - AdminOps module - ${CONFIG.appName}`,
};

const AdminOpsUpdateBranchStaffAssignmentModal = lazy(
  () =>
    import(
      "src/components/modals/adminops/branchstaffassignment/updatebranchstaffassignment-modal"
    ),
);

const AdminOpsDeleteBranchStaffAssignmentModal = lazy(
  () =>
    import(
      "src/components/modals/adminops/branchstaffassignment/deletebranchstaffassignment-modal"
    ),
);

export default function AdminOpsBranchStaffAssignmentAppPage() {
  const [selectedBranchStaffAssignment, setSelectedBranchStaffAssignment] =
    useState(null);

  const openEditDialog = useBoolean();

  const openDeleteDialog = useBoolean();

  const { setField, state } = useDataObjectContext();

  const { searchResults: options, searchLoading: loading } =
    useAdminOpsListBranchStaffAssignments();

  const OnEditClickHandler = (row) => {
    setSelectedBranchStaffAssignment(row);
    openEditDialog.onTrue();
  };

  const OnDeleteClickHandler = (row) => {
    setSelectedBranchStaffAssignment(row);
    openDeleteDialog.onTrue();
  };

  useEffect(() => {
    setField("name", "BranchStaffAssignment");
    setField("selectedApi", null);
    setField("defaultListRouteName", "listbranchStaffAssignments");

    setField("createModal", "AdminOpsCreateBranchStaffAssignmentModal");

    setField("cruds", [
      {
        name: "GetBranchStaffAssignment",
        method: "GET",
        color: "primary",
        componentName: "AdminOpsGetBranchStaffAssignmentApiPage",
      },

      {
        name: "CreateBranchStaffAssignment",
        method: "CREATE",
        color: "success",
        componentName: "AdminOpsCreateBranchStaffAssignmentApiPage",
      },

      {
        name: "UpdateBranchStaffAssignment",
        method: "UPDATE",
        color: "info",
        componentName: "AdminOpsUpdateBranchStaffAssignmentApiPage",
      },

      {
        name: "DeleteBranchStaffAssignment",
        method: "DELETE",
        color: "error",
        componentName: "AdminOpsDeleteBranchStaffAssignmentApiPage",
      },

      {
        name: "ListBranchStaffAssignments",
        method: "LIST",
        color: "primary",
        componentName: "AdminOpsListBranchStaffAssignmentsApiPage",
      },
    ]);
  }, [setField]);

  const columns = [
    { field: "branchId", headerName: "branchId", flex: 1 },

    { field: "userId", headerName: "userId", flex: 1 },

    { field: "role", headerName: "role", flex: 1 },

    { field: "assignedByUserId", headerName: "assignedByUserId", flex: 1 },
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

      <AdminOpsUpdateBranchStaffAssignmentModal
        openDialog={openEditDialog}
        selectedBranchStaffAssignment={selectedBranchStaffAssignment}
      />

      <AdminOpsDeleteBranchStaffAssignmentModal
        openDialog={openDeleteDialog}
        selectedId={selectedBranchStaffAssignment?.id}
      />
    </>
  );
}
