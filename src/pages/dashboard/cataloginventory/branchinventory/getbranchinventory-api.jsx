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

import { useCatalogInventoryGetBranchInventory } from "src/actions/catalogInventory";

import { JsonResponse } from "../../../../components/json-response";
import { TableResponse } from "../../../../components/table-response";

export default function CatalogInventoryGetBranchInventoryApiPage() {
  const [view, setView] = useState("Table");

  const [inputBranchInventoryId, setInputBranchInventoryId] = useState("");
  const [submittedBranchInventoryId, setSubmittedBranchInventoryId] =
    useState(null);

  const { branchinventory, branchinventoryLoading, branchinventoryError } =
    useCatalogInventoryGetBranchInventory(submittedBranchInventoryId);

  const handleGetBranchinventory = () => {
    setSubmittedBranchInventoryId(inputBranchInventoryId);
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
              label="branchInventoryId"
              value={inputBranchInventoryId}
              onChange={(e) => setInputBranchInventoryId(e.target.value)}
            />
          </Box>
          <Button
            variant="outlined"
            onClick={handleGetBranchinventory}
            disabled={!inputBranchInventoryId || branchinventoryLoading}
          >
            GET
          </Button>
        </Box>
      </Box>

      <Divider />

      {!branchinventoryLoading && (branchinventoryError || branchinventory) && (
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
                color={branchinventoryError ? "error" : "success"}
                display="inline"
              >
                {branchinventoryError ? branchinventoryError.status : "200"}
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
                content={branchinventory}
                error={branchinventoryError}
              />
            ) : (
              <JsonResponse content={branchinventory || branchinventoryError} />
            )}
          </Box>
        </Box>
      )}
    </>
  );
}
