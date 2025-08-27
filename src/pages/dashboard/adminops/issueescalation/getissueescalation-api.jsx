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

import { useAdminOpsGetIssueEscalation } from "src/actions/adminOps";

import { JsonResponse } from "../../../../components/json-response";
import { TableResponse } from "../../../../components/table-response";

export default function AdminOpsGetIssueEscalationApiPage() {
  const [view, setView] = useState("Table");

  const [inputIssueEscalationId, setInputIssueEscalationId] = useState("");
  const [submittedIssueEscalationId, setSubmittedIssueEscalationId] =
    useState(null);

  const { issueescalation, issueescalationLoading, issueescalationError } =
    useAdminOpsGetIssueEscalation(submittedIssueEscalationId);

  const handleGetIssueescalation = () => {
    setSubmittedIssueEscalationId(inputIssueEscalationId);
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
              label="issueEscalationId"
              value={inputIssueEscalationId}
              onChange={(e) => setInputIssueEscalationId(e.target.value)}
            />
          </Box>
          <Button
            variant="outlined"
            onClick={handleGetIssueescalation}
            disabled={!inputIssueEscalationId || issueescalationLoading}
          >
            GET
          </Button>
        </Box>
      </Box>

      <Divider />

      {!issueescalationLoading && (issueescalationError || issueescalation) && (
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
                color={issueescalationError ? "error" : "success"}
                display="inline"
              >
                {issueescalationError ? issueescalationError.status : "200"}
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
                content={issueescalation}
                error={issueescalationError}
              />
            ) : (
              <JsonResponse content={issueescalation || issueescalationError} />
            )}
          </Box>
        </Box>
      )}
    </>
  );
}
