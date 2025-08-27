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

export default function CatalogInventoryDeleteInventoryAuditLogApiPage() {
  const [view, setView] = useState("Table");
  const [deletedInventoryauditlog, setDeletedInventoryauditlog] =
    useState(null);
  const [inventoryauditlogLoading, setInventoryauditlogLoading] =
    useState(false);

  const [error, setError] = useState(null);

  const [inputInventoryAuditLogId, setInputInventoryAuditLogId] = useState("");

  const handleDeleteInventoryauditlog = async () => {
    try {
      setInventoryauditlogLoading(true);
      const response = await catalogInventoryAxios.delete(
        catalogInventoryEndpoints.inventoryauditlog.deleteInventoryAuditLog.replace(
          ":inventoryAuditLogId",
          inputInventoryAuditLogId,
        ),
      );
      setError(null);
      setDeletedInventoryauditlog(null);
      console.info("RESPONSE", response);
      setDeletedInventoryauditlog(response.data.inventoryauditlog);
      setInventoryauditlogLoading(false);

      setInputInventoryAuditLogId("");
    } catch (ex) {
      console.error(ex);
      setError(ex);
      setInventoryauditlogLoading(false);
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
                label="inventoryAuditLogId"
                value={inputInventoryAuditLogId}
                onChange={(e) => setInputInventoryAuditLogId(e.target.value)}
              />
            </Box>
            <Button
              variant="outlined"
              color="error"
              onClick={handleDeleteInventoryauditlog}
              disabled={!inputInventoryAuditLogId || inventoryauditlogLoading}
            >
              DELETE
            </Button>
          </Box>
        </Box>
      </Box>
      <Divider />

      {!inventoryauditlogLoading && (error || deletedInventoryauditlog) && (
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
              <TableResponse content={deletedInventoryauditlog} error={error} />
            ) : (
              <JsonResponse content={deletedInventoryauditlog || error} />
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
}
