import { lazy, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

import { GridActionsCellItem } from "@mui/x-data-grid";

import { CONFIG } from "src/global-config";
import { useReviewEngagementListRecommendations } from "src/actions/reviewEngagement";

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
  title: `Recommendation data - ReviewEngagement module - ${CONFIG.appName}`,
};

const ReviewEngagementUpdateRecommendationModal = lazy(
  () =>
    import(
      "src/components/modals/reviewengagement/recommendation/updaterecommendation-modal"
    ),
);

const ReviewEngagementDeleteRecommendationModal = lazy(
  () =>
    import(
      "src/components/modals/reviewengagement/recommendation/deleterecommendation-modal"
    ),
);

export default function ReviewEngagementRecommendationAppPage() {
  const [selectedRecommendation, setSelectedRecommendation] = useState(null);

  const openEditDialog = useBoolean();

  const openDeleteDialog = useBoolean();

  const { setField, state } = useDataObjectContext();

  const { searchResults: options, searchLoading: loading } =
    useReviewEngagementListRecommendations();

  const OnEditClickHandler = (row) => {
    setSelectedRecommendation(row);
    openEditDialog.onTrue();
  };

  const OnDeleteClickHandler = (row) => {
    setSelectedRecommendation(row);
    openDeleteDialog.onTrue();
  };

  useEffect(() => {
    setField("name", "Recommendation");
    setField("selectedApi", null);
    setField("defaultListRouteName", "listrecommendations");

    setField("createModal", "ReviewEngagementCreateRecommendationModal");

    setField("cruds", [
      {
        name: "GetRecommendation",
        method: "GET",
        color: "primary",
        componentName: "ReviewEngagementGetRecommendationApiPage",
      },

      {
        name: "CreateRecommendation",
        method: "CREATE",
        color: "success",
        componentName: "ReviewEngagementCreateRecommendationApiPage",
      },

      {
        name: "UpdateRecommendation",
        method: "UPDATE",
        color: "info",
        componentName: "ReviewEngagementUpdateRecommendationApiPage",
      },

      {
        name: "DeleteRecommendation",
        method: "DELETE",
        color: "error",
        componentName: "ReviewEngagementDeleteRecommendationApiPage",
      },

      {
        name: "ListRecommendations",
        method: "LIST",
        color: "primary",
        componentName: "ReviewEngagementListRecommendationsApiPage",
      },
    ]);
  }, [setField]);

  const columns = [
    { field: "userId", headerName: "userId", flex: 1 },

    { field: "bookIds", headerName: "bookIds", flex: 1 },

    { field: "generatedBy", headerName: "generatedBy", flex: 1 },

    { field: "contextInfo", headerName: "contextInfo", flex: 1 },
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

      <ReviewEngagementUpdateRecommendationModal
        openDialog={openEditDialog}
        selectedRecommendation={selectedRecommendation}
      />

      <ReviewEngagementDeleteRecommendationModal
        openDialog={openDeleteDialog}
        selectedId={selectedRecommendation?.id}
      />
    </>
  );
}
