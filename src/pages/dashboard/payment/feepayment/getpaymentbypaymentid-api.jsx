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

import { usePaymentGetPaymentByPaymentId } from "src/actions/payment";

import { JsonResponse } from "../../../../components/json-response";
import { TableResponse } from "../../../../components/table-response";

export default function PaymentGetPaymentByPaymentIdApiPage() {
  const [view, setView] = useState("Table");

  const [inputFeePaymentId, setInputFeePaymentId] = useState("");
  const [submittedFeePaymentId, setSubmittedFeePaymentId] = useState(null);

  const {
    paymentbypaymentid,
    paymentbypaymentidLoading,
    paymentbypaymentidError,
  } = usePaymentGetPaymentByPaymentId(submittedFeePaymentId);

  const handleGetPaymentbypaymentid = () => {
    setSubmittedFeePaymentId(inputFeePaymentId);
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
              label="feePaymentId"
              value={inputFeePaymentId}
              onChange={(e) => setInputFeePaymentId(e.target.value)}
            />
          </Box>
          <Button
            variant="outlined"
            onClick={handleGetPaymentbypaymentid}
            disabled={!inputFeePaymentId || paymentbypaymentidLoading}
          >
            GET
          </Button>
        </Box>
      </Box>

      <Divider />

      {!paymentbypaymentidLoading &&
        (paymentbypaymentidError || paymentbypaymentid) && (
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
                  color={paymentbypaymentidError ? "error" : "success"}
                  display="inline"
                >
                  {paymentbypaymentidError
                    ? paymentbypaymentidError.status
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
                  content={paymentbypaymentid}
                  error={paymentbypaymentidError}
                />
              ) : (
                <JsonResponse
                  content={paymentbypaymentid || paymentbypaymentidError}
                />
              )}
            </Box>
          </Box>
        )}
    </>
  );
}
