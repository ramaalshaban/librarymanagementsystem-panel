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

import { useAdminOpsGetBranchPurchaseOrder } from "src/actions/adminOps";

import { JsonResponse } from "../../../../components/json-response";
import { TableResponse } from "../../../../components/table-response";

export default function AdminOpsGetBranchPurchaseOrderApiPage() {
  const [view, setView] = useState("Table");

  const [inputBranchPurchaseOrderId, setInputBranchPurchaseOrderId] =
    useState("");
  const [submittedBranchPurchaseOrderId, setSubmittedBranchPurchaseOrderId] =
    useState(null);

  const {
    branchpurchaseorder,
    branchpurchaseorderLoading,
    branchpurchaseorderError,
  } = useAdminOpsGetBranchPurchaseOrder(submittedBranchPurchaseOrderId);

  const handleGetBranchpurchaseorder = () => {
    setSubmittedBranchPurchaseOrderId(inputBranchPurchaseOrderId);
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
              label="branchPurchaseOrderId"
              value={inputBranchPurchaseOrderId}
              onChange={(e) => setInputBranchPurchaseOrderId(e.target.value)}
            />
          </Box>
          <Button
            variant="outlined"
            onClick={handleGetBranchpurchaseorder}
            disabled={!inputBranchPurchaseOrderId || branchpurchaseorderLoading}
          >
            GET
          </Button>
        </Box>
      </Box>

      <Divider />

      {!branchpurchaseorderLoading &&
        (branchpurchaseorderError || branchpurchaseorder) && (
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
                  color={branchpurchaseorderError ? "error" : "success"}
                  display="inline"
                >
                  {branchpurchaseorderError
                    ? branchpurchaseorderError.status
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
                  content={branchpurchaseorder}
                  error={branchpurchaseorderError}
                />
              ) : (
                <JsonResponse
                  content={branchpurchaseorder || branchpurchaseorderError}
                />
              )}
            </Box>
          </Box>
        )}
    </>
  );
}
