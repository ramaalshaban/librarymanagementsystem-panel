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
  title: `CatalogInventoryShareToken data - CatalogInventory module - ${CONFIG.appName}`,
};

export default function CatalogInventoryCatalogInventoryShareTokenAppPage() {
  const { setField, state } = useDataObjectContext();

  useEffect(() => {
    setField("name", "CatalogInventoryShareToken");
    setField("selectedApi", null);
    setField("defaultListRouteName", "listcatalogInventoryShareTokens");

    setField("createModal", null);

    setField("cruds", []);
  }, [setField]);

  const columns = [
    { field: "configName", headerName: "configName", flex: 1 },

    { field: "objectName", headerName: "objectName", flex: 1 },

    { field: "objectId", headerName: "objectId", flex: 1 },

    { field: "ownerId", headerName: "ownerId", flex: 1 },

    { field: "peopleOption", headerName: "peopleOption", flex: 1 },

    { field: "tokenPermissions", headerName: "tokenPermissions", flex: 1 },

    { field: "allowedEmails", headerName: "allowedEmails", flex: 1 },

    { field: "expireDate", headerName: "expireDate", flex: 1 },
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
