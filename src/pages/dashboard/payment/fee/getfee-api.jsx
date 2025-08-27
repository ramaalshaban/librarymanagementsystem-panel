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

import { usePaymentGetFee } from "src/actions/payment";

import { JsonResponse } from "../../../../components/json-response";
import { TableResponse } from "../../../../components/table-response";

export default function PaymentGetFeeApiPage() {
  const [view, setView] = useState("Table");

  const [inputFeeId, setInputFeeId] = useState("");
  const [submittedFeeId, setSubmittedFeeId] = useState(null);

  const { fee, feeLoading, feeError } = usePaymentGetFee(submittedFeeId);

  const handleGetFee = () => {
    setSubmittedFeeId(inputFeeId);
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
              label="feeId"
              value={inputFeeId}
              onChange={(e) => setInputFeeId(e.target.value)}
            />
          </Box>
          <Button
            variant="outlined"
            onClick={handleGetFee}
            disabled={!inputFeeId || feeLoading}
          >
            GET
          </Button>
        </Box>
      </Box>

      <Divider />

      {!feeLoading && (feeError || fee) && (
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
                color={feeError ? "error" : "success"}
                display="inline"
              >
                {feeError ? feeError.status : "200"}
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
              <TableResponse content={fee} error={feeError} />
            ) : (
              <JsonResponse content={fee || feeError} />
            )}
          </Box>
        </Box>
      )}
    </>
  );
}
