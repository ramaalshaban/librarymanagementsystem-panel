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

import { useLendingGetLoanEvent } from "src/actions/lending";

import { JsonResponse } from "../../../../components/json-response";
import { TableResponse } from "../../../../components/table-response";

export default function LendingGetLoanEventApiPage() {
  const [view, setView] = useState("Table");

  const [inputLoanEventId, setInputLoanEventId] = useState("");
  const [submittedLoanEventId, setSubmittedLoanEventId] = useState(null);

  const { loanevent, loaneventLoading, loaneventError } =
    useLendingGetLoanEvent(submittedLoanEventId);

  const handleGetLoanevent = () => {
    setSubmittedLoanEventId(inputLoanEventId);
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
              label="loanEventId"
              value={inputLoanEventId}
              onChange={(e) => setInputLoanEventId(e.target.value)}
            />
          </Box>
          <Button
            variant="outlined"
            onClick={handleGetLoanevent}
            disabled={!inputLoanEventId || loaneventLoading}
          >
            GET
          </Button>
        </Box>
      </Box>

      <Divider />

      {!loaneventLoading && (loaneventError || loanevent) && (
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
                color={loaneventError ? "error" : "success"}
                display="inline"
              >
                {loaneventError ? loaneventError.status : "200"}
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
              <TableResponse content={loanevent} error={loaneventError} />
            ) : (
              <JsonResponse content={loanevent || loaneventError} />
            )}
          </Box>
        </Box>
      )}
    </>
  );
}
