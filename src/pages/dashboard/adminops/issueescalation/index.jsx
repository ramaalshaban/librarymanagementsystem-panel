import { lazy, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

import { GridActionsCellItem } from "@mui/x-data-grid";

import { CONFIG } from "src/global-config";
import { useAdminOpsListIssueEscalations } from "src/actions/adminOps";

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
  title: `IssueEscalation data - AdminOps module - ${CONFIG.appName}`,
};

const AdminOpsUpdateIssueEscalationModal = lazy(
  () =>
    import(
      "src/components/modals/adminops/issueescalation/updateissueescalation-modal"
    ),
);

const AdminOpsDeleteIssueEscalationModal = lazy(
  () =>
    import(
      "src/components/modals/adminops/issueescalation/deleteissueescalation-modal"
    ),
);

export default function AdminOpsIssueEscalationAppPage() {
  const [selectedIssueEscalation, setSelectedIssueEscalation] = useState(null);

  const openEditDialog = useBoolean();

  const openDeleteDialog = useBoolean();

  const { setField, state } = useDataObjectContext();

  const { searchResults: options, searchLoading: loading } =
    useAdminOpsListIssueEscalations();

  const OnEditClickHandler = (row) => {
    setSelectedIssueEscalation(row);
    openEditDialog.onTrue();
  };

  const OnDeleteClickHandler = (row) => {
    setSelectedIssueEscalation(row);
    openDeleteDialog.onTrue();
  };

  useEffect(() => {
    setField("name", "IssueEscalation");
    setField("selectedApi", null);
    setField("defaultListRouteName", "listissueEscalations");

    setField("createModal", "AdminOpsCreateIssueEscalationModal");

    setField("cruds", [
      {
        name: "GetIssueEscalation",
        method: "GET",
        color: "primary",
        componentName: "AdminOpsGetIssueEscalationApiPage",
      },

      {
        name: "CreateIssueEscalation",
        method: "CREATE",
        color: "success",
        componentName: "AdminOpsCreateIssueEscalationApiPage",
      },

      {
        name: "UpdateIssueEscalation",
        method: "UPDATE",
        color: "info",
        componentName: "AdminOpsUpdateIssueEscalationApiPage",
      },

      {
        name: "DeleteIssueEscalation",
        method: "DELETE",
        color: "error",
        componentName: "AdminOpsDeleteIssueEscalationApiPage",
      },

      {
        name: "ListIssueEscalations",
        method: "LIST",
        color: "primary",
        componentName: "AdminOpsListIssueEscalationsApiPage",
      },
    ]);
  }, [setField]);

  const columns = [
    { field: "branchId", headerName: "branchId", flex: 1 },

    { field: "raisedByUserId", headerName: "raisedByUserId", flex: 1 },

    { field: "assignedToUserId", headerName: "assignedToUserId", flex: 1 },

    { field: "status", headerName: "status", flex: 1 },

    { field: "escalationType", headerName: "escalationType", flex: 1 },

    { field: "description", headerName: "description", flex: 1 },

    { field: "log", headerName: "log", flex: 1 },
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

      <AdminOpsUpdateIssueEscalationModal
        openDialog={openEditDialog}
        selectedIssueEscalation={selectedIssueEscalation}
      />

      <AdminOpsDeleteIssueEscalationModal
        openDialog={openDeleteDialog}
        selectedId={selectedIssueEscalation?.id}
      />
    </>
  );
}
