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

import { useAnalyticsGetChangeStreamEvent } from "src/actions/analytics";

import { JsonResponse } from "../../../../components/json-response";
import { TableResponse } from "../../../../components/table-response";

export default function AnalyticsGetChangeStreamEventApiPage() {
  const [view, setView] = useState("Table");

  const [inputChangeStreamEventId, setInputChangeStreamEventId] = useState("");
  const [submittedChangeStreamEventId, setSubmittedChangeStreamEventId] =
    useState(null);

  const {
    changestreamevent,
    changestreameventLoading,
    changestreameventError,
  } = useAnalyticsGetChangeStreamEvent(submittedChangeStreamEventId);

  const handleGetChangestreamevent = () => {
    setSubmittedChangeStreamEventId(inputChangeStreamEventId);
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
              label="changeStreamEventId"
              value={inputChangeStreamEventId}
              onChange={(e) => setInputChangeStreamEventId(e.target.value)}
            />
          </Box>
          <Button
            variant="outlined"
            onClick={handleGetChangestreamevent}
            disabled={!inputChangeStreamEventId || changestreameventLoading}
          >
            GET
          </Button>
        </Box>
      </Box>

      <Divider />

      {!changestreameventLoading &&
        (changestreameventError || changestreamevent) && (
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
                  color={changestreameventError ? "error" : "success"}
                  display="inline"
                >
                  {changestreameventError
                    ? changestreameventError.status
                    : "200"}
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
                  content={changestreamevent}
                  error={changestreameventError}
                />
              ) : (
                <JsonResponse
                  content={changestreamevent || changestreameventError}
                />
              )}
            </Box>
          </Box>
        )}
    </>
  );
}
