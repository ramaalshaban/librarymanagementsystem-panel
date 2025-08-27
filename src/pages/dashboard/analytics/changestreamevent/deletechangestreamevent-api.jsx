import { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

import { JsonResponse } from "../../../../components/json-response/index.js";
import { TableResponse } from "../../../../components/table-response/index.js";
import analyticsAxios, {
  analyticsEndpoints,
} from "../../../../lib/analytics-axios.js";

export default function AnalyticsDeleteChangeStreamEventApiPage() {
  const [view, setView] = useState("Table");
  const [deletedChangestreamevent, setDeletedChangestreamevent] =
    useState(null);
  const [changestreameventLoading, setChangestreameventLoading] =
    useState(false);

  const [error, setError] = useState(null);

  const [inputChangeStreamEventId, setInputChangeStreamEventId] = useState("");

  const handleDeleteChangestreamevent = async () => {
    try {
      setChangestreameventLoading(true);
      const response = await analyticsAxios.delete(
        analyticsEndpoints.changestreamevent.deleteChangeStreamEvent.replace(
          ":changeStreamEventId",
          inputChangeStreamEventId,
        ),
      );
      setError(null);
      setDeletedChangestreamevent(null);
      console.info("RESPONSE", response);
      setDeletedChangestreamevent(response.data.changestreamevent);
      setChangestreameventLoading(false);

      setInputChangeStreamEventId("");
    } catch (ex) {
      console.error(ex);
      setError(ex);
      setChangestreameventLoading(false);
    }
  };

  return (
    <Box>
      <Box marginY="2rem">
        <Box marginBottom="2rem">
          <Typography variant="h4" marginBottom="1.5rem">
            DELETE
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
              color="error"
              onClick={handleDeleteChangestreamevent}
              disabled={!inputChangeStreamEventId || changestreameventLoading}
            >
              DELETE
            </Button>
          </Box>
        </Box>
      </Box>
      <Divider />

      {!changestreameventLoading && (error || deletedChangestreamevent) && (
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
                color={error ? "error" : "success"}
                display="inline"
              >
                {error ? error.status : "200"}
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
              <TableResponse content={deletedChangestreamevent} error={error} />
            ) : (
              <JsonResponse content={deletedChangestreamevent || error} />
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
}
