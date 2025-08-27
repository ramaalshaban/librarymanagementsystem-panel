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

import { useCatalogInventoryGetPurchaseOrder } from "src/actions/catalogInventory";

import { JsonResponse } from "../../../../components/json-response";
import { TableResponse } from "../../../../components/table-response";

export default function CatalogInventoryGetPurchaseOrderApiPage() {
  const [view, setView] = useState("Table");

  const [inputPurchaseOrderId, setInputPurchaseOrderId] = useState("");
  const [submittedPurchaseOrderId, setSubmittedPurchaseOrderId] =
    useState(null);

  const { purchaseorder, purchaseorderLoading, purchaseorderError } =
    useCatalogInventoryGetPurchaseOrder(submittedPurchaseOrderId);

  const handleGetPurchaseorder = () => {
    setSubmittedPurchaseOrderId(inputPurchaseOrderId);
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
              label="purchaseOrderId"
              value={inputPurchaseOrderId}
              onChange={(e) => setInputPurchaseOrderId(e.target.value)}
            />
          </Box>
          <Button
            variant="outlined"
            onClick={handleGetPurchaseorder}
            disabled={!inputPurchaseOrderId || purchaseorderLoading}
          >
            GET
          </Button>
        </Box>
      </Box>

      <Divider />

      {!purchaseorderLoading && (purchaseorderError || purchaseorder) && (
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
                color={purchaseorderError ? "error" : "success"}
                display="inline"
              >
                {purchaseorderError ? purchaseorderError.status : "200"}
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
                content={purchaseorder}
                error={purchaseorderError}
              />
            ) : (
              <JsonResponse content={purchaseorder || purchaseorderError} />
            )}
          </Box>
        </Box>
      )}
    </>
  );
}
