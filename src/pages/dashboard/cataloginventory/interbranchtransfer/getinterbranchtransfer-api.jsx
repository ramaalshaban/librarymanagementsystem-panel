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

import { useCatalogInventoryGetInterBranchTransfer } from "src/actions/catalogInventory";

import { JsonResponse } from "../../../../components/json-response";
import { TableResponse } from "../../../../components/table-response";

export default function CatalogInventoryGetInterBranchTransferApiPage() {
  const [view, setView] = useState("Table");

  const [inputInterBranchTransferId, setInputInterBranchTransferId] =
    useState("");
  const [submittedInterBranchTransferId, setSubmittedInterBranchTransferId] =
    useState(null);

  const {
    interbranchtransfer,
    interbranchtransferLoading,
    interbranchtransferError,
  } = useCatalogInventoryGetInterBranchTransfer(submittedInterBranchTransferId);

  const handleGetInterbranchtransfer = () => {
    setSubmittedInterBranchTransferId(inputInterBranchTransferId);
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
              label="interBranchTransferId"
              value={inputInterBranchTransferId}
              onChange={(e) => setInputInterBranchTransferId(e.target.value)}
            />
          </Box>
          <Button
            variant="outlined"
            onClick={handleGetInterbranchtransfer}
            disabled={!inputInterBranchTransferId || interbranchtransferLoading}
          >
            GET
          </Button>
        </Box>
      </Box>

      <Divider />

      {!interbranchtransferLoading &&
        (interbranchtransferError || interbranchtransfer) && (
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
                  color={interbranchtransferError ? "error" : "success"}
                  display="inline"
                >
                  {interbranchtransferError
                    ? interbranchtransferError.status
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
                  content={interbranchtransfer}
                  error={interbranchtransferError}
                />
              ) : (
                <JsonResponse
                  content={interbranchtransfer || interbranchtransferError}
                />
              )}
            </Box>
          </Box>
        )}
    </>
  );
}
