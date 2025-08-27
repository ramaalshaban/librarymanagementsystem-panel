import { useState } from "react";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import {
  Button,
  TextField,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

import { useReviewEngagementGetReview } from "src/actions/reviewEngagement";

import { JsonResponse } from "../../../../components/json-response";
import { TableResponse } from "../../../../components/table-response";

export default function ReviewEngagementGetReviewApiPage() {
  const [view, setView] = useState("Table");

  const [inputReviewId, setInputReviewId] = useState("");
  const [submittedReviewId, setSubmittedReviewId] = useState(null);

  const { review, reviewLoading, reviewError } =
    useReviewEngagementGetReview(submittedReviewId);

  const handleGetReview = () => {
    setSubmittedReviewId(inputReviewId);
  };

  return (
    <>
      <Box marginY="2rem">
        <Typography variant="h4" marginBottom="1.5rem">
          GET
        </Typography>

        <Box component="div" gap="1rem" display="flex" key="0">
          <Box minWidth="35%">
            <TextField
              size="small"
              variant="outlined"
              fullWidth
              label="reviewId"
              value={inputReviewId}
              onChange={(e) => setInputReviewId(e.target.value)}
            />
          </Box>
          <Button
            variant="outlined"
            onClick={handleGetReview}
            disabled={!inputReviewId || reviewLoading}
          >
            GET
          </Button>
        </Box>
      </Box>

      <Divider />

      {!reviewLoading && (reviewError || review) && (
        <Box paddingTop="2rem">
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="subtitle1">
              STATUS:{" "}
              <Typography
                component="span"
                variant="subtitle1"
                color={reviewError ? "error" : "success"}
                display="inline"
              >
                {reviewError ? reviewError.status : "200"}
              </Typography>
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
              <ToggleButtonGroup
                color="standard"
                value={view}
                exclusive
                onChange={(_, val) => val && setView(val)}
              >
                <ToggleButton value="Table" sx={{ paddingX: "2rem" }}>
                  Table
                </ToggleButton>
                <ToggleButton value="JSON" sx={{ paddingX: "2rem" }}>
                  JSON
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </Box>
          <Box>
            {view === "Table" ? (
              <TableResponse content={review} error={reviewError} />
            ) : (
              <JsonResponse content={review || reviewError} />
            )}
          </Box>
        </Box>
      )}
    </>
  );
}
