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

import { useCatalogInventoryGetBranch } from "src/actions/catalogInventory";

import { JsonResponse } from "../../../../components/json-response";
import { TableResponse } from "../../../../components/table-response";

export default function CatalogInventoryGetBranchApiPage() {
  const [view, setView] = useState("Table");

  const [inputBranchId, setInputBranchId] = useState("");
  const [submittedBranchId, setSubmittedBranchId] = useState(null);

  const { branch, branchLoading, branchError } =
    useCatalogInventoryGetBranch(submittedBranchId);

  const handleGetBranch = () => {
    setSubmittedBranchId(inputBranchId);
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
              label="branchId"
              value={inputBranchId}
              onChange={(e) => setInputBranchId(e.target.value)}
            />
          </Box>
          <Button
            variant="outlined"
            onClick={handleGetBranch}
            disabled={!inputBranchId || branchLoading}
          >
            GET
          </Button>
        </Box>
      </Box>

      <Divider />

      {!branchLoading && (branchError || branch) && (
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
                color={branchError ? "error" : "success"}
                display="inline"
              >
                {branchError ? branchError.status : "200"}
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
              <TableResponse content={branch} error={branchError} />
            ) : (
              <JsonResponse content={branch || branchError} />
            )}
          </Box>
        </Box>
      )}
    </>
  );
}
