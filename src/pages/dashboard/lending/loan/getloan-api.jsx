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

import { useLendingGetLoan } from "src/actions/lending";

import { JsonResponse } from "../../../../components/json-response";
import { TableResponse } from "../../../../components/table-response";

export default function LendingGetLoanApiPage() {
  const [view, setView] = useState("Table");

  const [inputLoanId, setInputLoanId] = useState("");
  const [submittedLoanId, setSubmittedLoanId] = useState(null);

  const { loan, loanLoading, loanError } = useLendingGetLoan(submittedLoanId);

  const handleGetLoan = () => {
    setSubmittedLoanId(inputLoanId);
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
              label="loanId"
              value={inputLoanId}
              onChange={(e) => setInputLoanId(e.target.value)}
            />
          </Box>
          <Button
            variant="outlined"
            onClick={handleGetLoan}
            disabled={!inputLoanId || loanLoading}
          >
            GET
          </Button>
        </Box>
      </Box>

      <Divider />

      {!loanLoading && (loanError || loan) && (
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
                color={loanError ? "error" : "success"}
                display="inline"
              >
                {loanError ? loanError.status : "200"}
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
              <TableResponse content={loan} error={loanError} />
            ) : (
              <JsonResponse content={loan || loanError} />
            )}
          </Box>
        </Box>
      )}
    </>
  );
}
