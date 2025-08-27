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

import { useReviewEngagementGetEngagementEvent } from "src/actions/reviewEngagement";

import { JsonResponse } from "../../../../components/json-response";
import { TableResponse } from "../../../../components/table-response";

export default function ReviewEngagementGetEngagementEventApiPage() {
  const [view, setView] = useState("Table");

  const [inputEngagementEventId, setInputEngagementEventId] = useState("");
  const [submittedEngagementEventId, setSubmittedEngagementEventId] =
    useState(null);

  const { engagementevent, engagementeventLoading, engagementeventError } =
    useReviewEngagementGetEngagementEvent(submittedEngagementEventId);

  const handleGetEngagementevent = () => {
    setSubmittedEngagementEventId(inputEngagementEventId);
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
              label="engagementEventId"
              value={inputEngagementEventId}
              onChange={(e) => setInputEngagementEventId(e.target.value)}
            />
          </Box>
          <Button
            variant="outlined"
            onClick={handleGetEngagementevent}
            disabled={!inputEngagementEventId || engagementeventLoading}
          >
            GET
          </Button>
        </Box>
      </Box>

      <Divider />

      {!engagementeventLoading && (engagementeventError || engagementevent) && (
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
                color={engagementeventError ? "error" : "success"}
                display="inline"
              >
                {engagementeventError ? engagementeventError.status : "200"}
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
              <TableResponse
                content={engagementevent}
                error={engagementeventError}
              />
            ) : (
              <JsonResponse content={engagementevent || engagementeventError} />
            )}
          </Box>
        </Box>
      )}
    </>
  );
}
