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

import { usePaymentGetCustomerByUserId } from "src/actions/payment";

import { JsonResponse } from "../../../../components/json-response";
import { TableResponse } from "../../../../components/table-response";

export default function PaymentGetCustomerByUserIdApiPage() {
  const [view, setView] = useState("Table");

  const [inputUserId, setInputUserId] = useState("");
  const [submittedUserId, setSubmittedUserId] = useState(null);

  const { customerbyuserid, customerbyuseridLoading, customerbyuseridError } =
    usePaymentGetCustomerByUserId(submittedUserId);

  const handleGetCustomerbyuserid = () => {
    setSubmittedUserId(inputUserId);
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
              label="userId"
              value={inputUserId}
              onChange={(e) => setInputUserId(e.target.value)}
            />
          </Box>
          <Button
            variant="outlined"
            onClick={handleGetCustomerbyuserid}
            disabled={!inputUserId || customerbyuseridLoading}
          >
            GET
          </Button>
        </Box>
      </Box>

      <Divider />

      {!customerbyuseridLoading &&
        (customerbyuseridError || customerbyuserid) && (
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
                  color={customerbyuseridError ? "error" : "success"}
                  display="inline"
                >
                  {customerbyuseridError ? customerbyuseridError.status : "200"}
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
                  content={customerbyuserid}
                  error={customerbyuseridError}
                />
              ) : (
                <JsonResponse
                  content={customerbyuserid || customerbyuseridError}
                />
              )}
            </Box>
          </Box>
        )}
    </>
  );
}
