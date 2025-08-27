import { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

import { JsonResponse } from "../../../../components/json-response/index.js";
import { TableResponse } from "../../../../components/table-response/index.js";
import paymentAxios, {
  paymentEndpoints,
} from "../../../../lib/payment-axios.js";

export default function PaymentDeleteFeeApiPage() {
  const [view, setView] = useState("Table");
  const [deletedFee, setDeletedFee] = useState(null);
  const [feeLoading, setFeeLoading] = useState(false);

  const [error, setError] = useState(null);

  const [inputFeeId, setInputFeeId] = useState("");

  const handleDeleteFee = async () => {
    try {
      setFeeLoading(true);
      const response = await paymentAxios.delete(
        paymentEndpoints.fee.deleteFee.replace(":feeId", inputFeeId),
      );
      setError(null);
      setDeletedFee(null);
      console.info("RESPONSE", response);
      setDeletedFee(response.data.fee);
      setFeeLoading(false);

      setInputFeeId("");
    } catch (ex) {
      console.error(ex);
      setError(ex);
      setFeeLoading(false);
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
                label="feeId"
                value={inputFeeId}
                onChange={(e) => setInputFeeId(e.target.value)}
              />
            </Box>
            <Button
              variant="outlined"
              color="error"
              onClick={handleDeleteFee}
              disabled={!inputFeeId || feeLoading}
            >
              DELETE
            </Button>
          </Box>
        </Box>
      </Box>
      <Divider />

      {!feeLoading && (error || deletedFee) && (
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
              <TableResponse content={deletedFee} error={error} />
            ) : (
              <JsonResponse content={deletedFee || error} />
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
}
