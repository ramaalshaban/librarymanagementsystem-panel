import { lazy, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

import { GridActionsCellItem } from "@mui/x-data-grid";

import { CONFIG } from "src/global-config";
import { useCatalogInventoryListBranchInventories } from "src/actions/catalogInventory";

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
  title: `BranchInventory data - CatalogInventory module - ${CONFIG.appName}`,
};

const CatalogInventoryUpdateBranchInventoryModal = lazy(
  () =>
    import(
      "src/components/modals/cataloginventory/branchinventory/updatebranchinventory-modal"
    ),
);

const CatalogInventoryDeleteBranchInventoryModal = lazy(
  () =>
    import(
      "src/components/modals/cataloginventory/branchinventory/deletebranchinventory-modal"
    ),
);

export default function CatalogInventoryBranchInventoryAppPage() {
  const [selectedBranchInventory, setSelectedBranchInventory] = useState(null);

  const openEditDialog = useBoolean();

  const openDeleteDialog = useBoolean();

  const { setField, state } = useDataObjectContext();

  const { searchResults: options, searchLoading: loading } =
    useCatalogInventoryListBranchInventories();

  const OnEditClickHandler = (row) => {
    setSelectedBranchInventory(row);
    openEditDialog.onTrue();
  };

  const OnDeleteClickHandler = (row) => {
    setSelectedBranchInventory(row);
    openDeleteDialog.onTrue();
  };

  useEffect(() => {
    setField("name", "BranchInventory");
    setField("selectedApi", null);
    setField("defaultListRouteName", "listbranchInventories");

    setField("createModal", "CatalogInventoryCreateBranchInventoryModal");

    setField("cruds", [
      {
        name: "GetBranchInventory",
        method: "GET",
        color: "primary",
        componentName: "CatalogInventoryGetBranchInventoryApiPage",
      },

      {
        name: "CreateBranchInventory",
        method: "CREATE",
        color: "success",
        componentName: "CatalogInventoryCreateBranchInventoryApiPage",
      },

      {
        name: "UpdateBranchInventory",
        method: "UPDATE",
        color: "info",
        componentName: "CatalogInventoryUpdateBranchInventoryApiPage",
      },

      {
        name: "DeleteBranchInventory",
        method: "DELETE",
        color: "error",
        componentName: "CatalogInventoryDeleteBranchInventoryApiPage",
      },

      {
        name: "ListBranchInventories",
        method: "LIST",
        color: "primary",
        componentName: "CatalogInventoryListBranchInventoriesApiPage",
      },
    ]);
  }, [setField]);

  const columns = [
    { field: "bookId", headerName: "bookId", flex: 1 },

    { field: "branchId", headerName: "branchId", flex: 1 },

    { field: "totalCopies", headerName: "totalCopies", flex: 1 },

    { field: "availableCopies", headerName: "availableCopies", flex: 1 },

    { field: "localShelfLocation", headerName: "localShelfLocation", flex: 1 },

    { field: "conditionNotes", headerName: "conditionNotes", flex: 1 },
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

      <CatalogInventoryUpdateBranchInventoryModal
        openDialog={openEditDialog}
        selectedBranchInventory={selectedBranchInventory}
      />

      <CatalogInventoryDeleteBranchInventoryModal
        openDialog={openDeleteDialog}
        selectedId={selectedBranchInventory?.id}
      />
    </>
  );
}
