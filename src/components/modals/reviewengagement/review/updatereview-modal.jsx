import {
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { TableHeadCustom } from "../../../table/index.js";
import { Iconify } from "../../../iconify/index.js";
import { useTheme } from "@mui/material/styles";

import { Form, Field } from "../../../hook-form";
import * as zod from "zod";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "@mui/lab/LoadingButton";
import { mutate } from "swr";

import reviewEngagementAxios, {
  reviewEngagementEndpoints,
} from "../../../../lib/reviewEngagement-axios.js";

const UPDATE_TABLE_HEAD = [
  { id: "propertyName", label: "Property Name", width: "30%" },
  { id: "propertyValue", label: "Property Value", width: "70%" },
];

const ReviewSchema = zod.object({
  rating: zod.number().nullable(),

  reviewText: zod.string().nullable(),

  status: zod.string().min(1, { message: "status is required" }),

  moderatedByUserId: zod.string().nullable(),
});

export default function ReviewEngagementUpdateReviewModal({
  openDialog,
  selectedReview,
}) {
  const [error, setError] = useState(null);

  const theme = useTheme();

  const requestParams = [
    { name: "rating", value: selectedReview?.rating ?? "", type: "Short" },

    {
      name: "reviewText",
      value: selectedReview?.reviewText ?? "",
      type: "Text",
    },

    { name: "status", value: selectedReview?.status ?? "", type: "Enum" },

    {
      name: "moderatedByUserId",
      value: selectedReview?.moderatedByUserId ?? "",
      type: "ID",
    },
  ];

  const defaultValues = {
    rating: selectedReview?.rating ?? "",

    reviewText: selectedReview?.reviewText ?? "",

    status: selectedReview?.status ?? "",

    moderatedByUserId: selectedReview?.moderatedByUserId ?? "",
  };

  const methods = useForm({
    resolver: zodResolver(ReviewSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (selectedReview?.id) {
        const response = await reviewEngagementAxios.patch(
          reviewEngagementEndpoints.review.updateReview.replace(
            ":reviewId",
            selectedReview?.id,
          ),
          data,
        );
        setError(null);
        reset();
        console.info("RESPONSE", response);
        await mutate([reviewEngagementEndpoints.review.listReviews]);
        openDialog.onFalse();
      }
    } catch (ex) {
      console.error(ex);
      setError(ex);
    }
  });

  useEffect(() => {
    methods.reset({
      rating: selectedReview?.rating ?? "",

      reviewText: selectedReview?.reviewText ?? "",

      status: selectedReview?.status ?? "",

      moderatedByUserId: selectedReview?.moderatedByUserId ?? "",
    });
  }, [selectedReview]);

  if (!selectedReview) return null;

  return (
    <Dialog open={openDialog.value} maxWidth="md">
      <DialogTitle>Update Review</DialogTitle>

      <Form methods={methods} onSubmit={onSubmit}>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 600 }}>
              <TableHeadCustom headCells={UPDATE_TABLE_HEAD} />

              <TableBody>
                {requestParams.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell
                      sx={{ backgroundColor: theme.palette.grey[100] }}
                    >
                      <Chip variant="soft" label={row.name} />
                    </TableCell>
                    <TableCell>
                      {row.type === "Boolean" ? (
                        <Field.Checkbox name={row.name} />
                      ) : (
                        <Field.Text name={row.name} />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {error && (
            <DialogContentText color="error">
              {error.message
                ? error.message
                : "An error occurred while creating the review."}
            </DialogContentText>
          )}
        </DialogContent>

        <DialogActions className="gap-2">
          <Link
            component="button"
            type="button"
            underline="always"
            onClick={openDialog.onFalse}
          >
            Cancel
          </Link>
          <LoadingButton
            type="submit"
            variant="contained"
            size="large"
            loading={isSubmitting}
            startIcon={<Iconify icon="material-symbols:save-outline" />}
          >
            Save
          </LoadingButton>
        </DialogActions>
      </Form>
    </Dialog>
  );
}
