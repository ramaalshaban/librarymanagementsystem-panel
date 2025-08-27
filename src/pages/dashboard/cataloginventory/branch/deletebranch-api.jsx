import { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

import { JsonResponse } from "../../../../components/json-response/index.js";
import { TableResponse } from "../../../../components/table-response/index.js";
import catalogInventoryAxios, {
  catalogInventoryEndpoints,
} from "../../../../lib/catalogInventory-axios.js";

export default function CatalogInventoryDeleteBranchApiPage() {
  const [view, setView] = useState("Table");
  const [deletedBranch, setDeletedBranch] = useState(null);
  const [branchLoading, setBranchLoading] = useState(false);

  const [error, setError] = useState(null);

  const [inputBranchId, setInputBranchId] = useState("");

  const handleDeleteBranch = async () => {
    try {
      setBranchLoading(true);
      const response = await catalogInventoryAxios.delete(
        catalogInventoryEndpoints.branch.deleteBranch.replace(
          ":branchId",
          inputBranchId,
        ),
      );
      setError(null);
      setDeletedBranch(null);
      console.info("RESPONSE", response);
      setDeletedBranch(response.data.branch);
      setBranchLoading(false);

      setInputBranchId("");
    } catch (ex) {
      console.error(ex);
      setError(ex);
      setBranchLoading(false);
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
                label="branchId"
                value={inputBranchId}
                onChange={(e) => setInputBranchId(e.target.value)}
              />
            </Box>
            <Button
              variant="outlined"
              color="error"
              onClick={handleDeleteBranch}
              disabled={!inputBranchId || branchLoading}
            >
              DELETE
            </Button>
          </Box>
        </Box>
      </Box>
      <Divider />

      {!branchLoading && (error || deletedBranch) && (
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
              <TableResponse content={deletedBranch} error={error} />
            ) : (
              <JsonResponse content={deletedBranch || error} />
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
}
