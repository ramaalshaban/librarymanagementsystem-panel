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

import { usePaymentGetFeeEvent } from "src/actions/payment";

import { JsonResponse } from "../../../../components/json-response";
import { TableResponse } from "../../../../components/table-response";

export default function PaymentGetFeeEventApiPage() {
  const [view, setView] = useState("Table");

  const [inputFeeEventId, setInputFeeEventId] = useState("");
  const [submittedFeeEventId, setSubmittedFeeEventId] = useState(null);

  const { feeevent, feeeventLoading, feeeventError } =
    usePaymentGetFeeEvent(submittedFeeEventId);

  const handleGetFeeevent = () => {
    setSubmittedFeeEventId(inputFeeEventId);
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
              label="feeEventId"
              value={inputFeeEventId}
              onChange={(e) => setInputFeeEventId(e.target.value)}
            />
          </Box>
          <Button
            variant="outlined"
            onClick={handleGetFeeevent}
            disabled={!inputFeeEventId || feeeventLoading}
          >
            GET
          </Button>
        </Box>
      </Box>

      <Divider />

      {!feeeventLoading && (feeeventError || feeevent) && (
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
                color={feeeventError ? "error" : "success"}
                display="inline"
              >
                {feeeventError ? feeeventError.status : "200"}
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
              <TableResponse content={feeevent} error={feeeventError} />
            ) : (
              <JsonResponse content={feeevent || feeeventError} />
            )}
          </Box>
        </Box>
      )}
    </>
  );
}
