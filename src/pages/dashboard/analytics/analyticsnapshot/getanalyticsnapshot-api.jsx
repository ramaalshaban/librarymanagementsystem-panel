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

import { useAnalyticsGetAnalyticSnapshot } from "src/actions/analytics";

import { JsonResponse } from "../../../../components/json-response";
import { TableResponse } from "../../../../components/table-response";

export default function AnalyticsGetAnalyticSnapshotApiPage() {
  const [view, setView] = useState("Table");

  const [inputAnalyticSnapshotId, setInputAnalyticSnapshotId] = useState("");
  const [submittedAnalyticSnapshotId, setSubmittedAnalyticSnapshotId] =
    useState(null);

  const { analyticsnapshot, analyticsnapshotLoading, analyticsnapshotError } =
    useAnalyticsGetAnalyticSnapshot(submittedAnalyticSnapshotId);

  const handleGetAnalyticsnapshot = () => {
    setSubmittedAnalyticSnapshotId(inputAnalyticSnapshotId);
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
              label="analyticSnapshotId"
              value={inputAnalyticSnapshotId}
              onChange={(e) => setInputAnalyticSnapshotId(e.target.value)}
            />
          </Box>
          <Button
            variant="outlined"
            onClick={handleGetAnalyticsnapshot}
            disabled={!inputAnalyticSnapshotId || analyticsnapshotLoading}
          >
            GET
          </Button>
        </Box>
      </Box>

      <Divider />

      {!analyticsnapshotLoading &&
        (analyticsnapshotError || analyticsnapshot) && (
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
                  color={analyticsnapshotError ? "error" : "success"}
                  display="inline"
                >
                  {analyticsnapshotError ? analyticsnapshotError.status : "200"}
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
                  content={analyticsnapshot}
                  error={analyticsnapshotError}
                />
              ) : (
                <JsonResponse
                  content={analyticsnapshot || analyticsnapshotError}
                />
              )}
            </Box>
          </Box>
        )}
    </>
  );
}
