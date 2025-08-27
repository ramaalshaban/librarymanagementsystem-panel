import { lazy, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

import { GridActionsCellItem } from "@mui/x-data-grid";

import { CONFIG } from "src/global-config";
import { useCatalogInventoryListBooks } from "src/actions/catalogInventory";

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
  title: `Book data - CatalogInventory module - ${CONFIG.appName}`,
};

const CatalogInventoryUpdateBookModal = lazy(
  () => import("src/components/modals/cataloginventory/book/updatebook-modal"),
);

const CatalogInventoryDeleteBookModal = lazy(
  () => import("src/components/modals/cataloginventory/book/deletebook-modal"),
);

export default function CatalogInventoryBookAppPage() {
  const [selectedBook, setSelectedBook] = useState(null);

  const openEditDialog = useBoolean();

  const openDeleteDialog = useBoolean();

  const { setField, state } = useDataObjectContext();

  const { searchResults: options, searchLoading: loading } =
    useCatalogInventoryListBooks();

  const OnEditClickHandler = (row) => {
    setSelectedBook(row);
    openEditDialog.onTrue();
  };

  const OnDeleteClickHandler = (row) => {
    setSelectedBook(row);
    openDeleteDialog.onTrue();
  };

  useEffect(() => {
    setField("name", "Book");
    setField("selectedApi", null);
    setField("defaultListRouteName", "listbooks");

    setField("createModal", "CatalogInventoryCreateBookModal");

    setField("cruds", [
      {
        name: "GetBook",
        method: "GET",
        color: "primary",
        componentName: "CatalogInventoryGetBookApiPage",
      },

      {
        name: "CreateBook",
        method: "CREATE",
        color: "success",
        componentName: "CatalogInventoryCreateBookApiPage",
      },

      {
        name: "UpdateBook",
        method: "UPDATE",
        color: "info",
        componentName: "CatalogInventoryUpdateBookApiPage",
      },

      {
        name: "DeleteBook",
        method: "DELETE",
        color: "error",
        componentName: "CatalogInventoryDeleteBookApiPage",
      },

      {
        name: "ListBooks",
        method: "LIST",
        color: "primary",
        componentName: "CatalogInventoryListBooksApiPage",
      },
    ]);
  }, [setField]);

  const columns = [
    { field: "title", headerName: "title", flex: 1 },

    { field: "authors", headerName: "authors", flex: 1 },

    { field: "isbn", headerName: "isbn", flex: 1 },

    { field: "synopsis", headerName: "synopsis", flex: 1 },

    { field: "genres", headerName: "genres", flex: 1 },

    { field: "publicationDate", headerName: "publicationDate", flex: 1 },

    { field: "language", headerName: "language", flex: 1 },

    { field: "publisher", headerName: "publisher", flex: 1 },

    { field: "coverImageUrl", headerName: "coverImageUrl", flex: 1 },
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

      <CatalogInventoryUpdateBookModal
        openDialog={openEditDialog}
        selectedBook={selectedBook}
      />

      <CatalogInventoryDeleteBookModal
        openDialog={openDeleteDialog}
        selectedId={selectedBook?.id}
      />
    </>
  );
}
