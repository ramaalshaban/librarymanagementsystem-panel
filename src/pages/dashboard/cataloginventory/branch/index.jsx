import { lazy, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

import { GridActionsCellItem } from "@mui/x-data-grid";

import { CONFIG } from "src/global-config";
import { useCatalogInventoryListBranches } from "src/actions/catalogInventory";

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
  title: `Branch data - CatalogInventory module - ${CONFIG.appName}`,
};

const CatalogInventoryUpdateBranchModal = lazy(
  () =>
    import("src/components/modals/cataloginventory/branch/updatebranch-modal"),
);

const CatalogInventoryDeleteBranchModal = lazy(
  () =>
    import("src/components/modals/cataloginventory/branch/deletebranch-modal"),
);

export default function CatalogInventoryBranchAppPage() {
  const [selectedBranch, setSelectedBranch] = useState(null);

  const openEditDialog = useBoolean();

  const openDeleteDialog = useBoolean();

  const { setField, state } = useDataObjectContext();

  const { searchResults: options, searchLoading: loading } =
    useCatalogInventoryListBranches();

  const OnEditClickHandler = (row) => {
    setSelectedBranch(row);
    openEditDialog.onTrue();
  };

  const OnDeleteClickHandler = (row) => {
    setSelectedBranch(row);
    openDeleteDialog.onTrue();
  };

  useEffect(() => {
    setField("name", "Branch");
    setField("selectedApi", null);
    setField("defaultListRouteName", "listbranches");

    setField("createModal", "CatalogInventoryCreateBranchModal");

    setField("cruds", [
      {
        name: "GetBranch",
        method: "GET",
        color: "primary",
        componentName: "CatalogInventoryGetBranchApiPage",
      },

      {
        name: "CreateBranch",
        method: "CREATE",
        color: "success",
        componentName: "CatalogInventoryCreateBranchApiPage",
      },

      {
        name: "UpdateBranch",
        method: "UPDATE",
        color: "info",
        componentName: "CatalogInventoryUpdateBranchApiPage",
      },

      {
        name: "DeleteBranch",
        method: "DELETE",
        color: "error",
        componentName: "CatalogInventoryDeleteBranchApiPage",
      },

      {
        name: "ListBranches",
        method: "LIST",
        color: "primary",
        componentName: "CatalogInventoryListBranchesApiPage",
      },
    ]);
  }, [setField]);

  const columns = [
    { field: "name", headerName: "name", flex: 1 },

    { field: "address", headerName: "address", flex: 1 },

    { field: "geoLocation", headerName: "geoLocation", flex: 1 },

    { field: "contactEmail", headerName: "contactEmail", flex: 1 },
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

      <CatalogInventoryUpdateBranchModal
        openDialog={openEditDialog}
        selectedBranch={selectedBranch}
      />

      <CatalogInventoryDeleteBranchModal
        openDialog={openDeleteDialog}
        selectedId={selectedBranch?.id}
      />
    </>
  );
}
