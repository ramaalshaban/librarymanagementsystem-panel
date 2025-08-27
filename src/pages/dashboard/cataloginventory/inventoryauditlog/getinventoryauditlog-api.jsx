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

import { useCatalogInventoryGetInventoryAuditLog } from "src/actions/catalogInventory";

import { JsonResponse } from "../../../../components/json-response";
import { TableResponse } from "../../../../components/table-response";

export default function CatalogInventoryGetInventoryAuditLogApiPage() {
  const [view, setView] = useState("Table");

  const [inputInventoryAuditLogId, setInputInventoryAuditLogId] = useState("");
  const [submittedInventoryAuditLogId, setSubmittedInventoryAuditLogId] =
    useState(null);

  const {
    inventoryauditlog,
    inventoryauditlogLoading,
    inventoryauditlogError,
  } = useCatalogInventoryGetInventoryAuditLog(submittedInventoryAuditLogId);

  const handleGetInventoryauditlog = () => {
    setSubmittedInventoryAuditLogId(inputInventoryAuditLogId);
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
              label="inventoryAuditLogId"
              value={inputInventoryAuditLogId}
              onChange={(e) => setInputInventoryAuditLogId(e.target.value)}
            />
          </Box>
          <Button
            variant="outlined"
            onClick={handleGetInventoryauditlog}
            disabled={!inputInventoryAuditLogId || inventoryauditlogLoading}
          >
            GET
          </Button>
        </Box>
      </Box>

      <Divider />

      {!inventoryauditlogLoading &&
        (inventoryauditlogError || inventoryauditlog) && (
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
                  color={inventoryauditlogError ? "error" : "success"}
                  display="inline"
                >
                  {inventoryauditlogError
                    ? inventoryauditlogError.status
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
                  content={inventoryauditlog}
                  error={inventoryauditlogError}
                />
              ) : (
                <JsonResponse
                  content={inventoryauditlog || inventoryauditlogError}
                />
              )}
            </Box>
          </Box>
        )}
    </>
  );
}
