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

import { useAdminOpsGetSystemBackupAudit } from "src/actions/adminOps";

import { JsonResponse } from "../../../../components/json-response";
import { TableResponse } from "../../../../components/table-response";

export default function AdminOpsGetSystemBackupAuditApiPage() {
  const [view, setView] = useState("Table");

  const [inputSystemBackupAuditId, setInputSystemBackupAuditId] = useState("");
  const [submittedSystemBackupAuditId, setSubmittedSystemBackupAuditId] =
    useState(null);

  const {
    systembackupaudit,
    systembackupauditLoading,
    systembackupauditError,
  } = useAdminOpsGetSystemBackupAudit(submittedSystemBackupAuditId);

  const handleGetSystembackupaudit = () => {
    setSubmittedSystemBackupAuditId(inputSystemBackupAuditId);
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
              label="systemBackupAuditId"
              value={inputSystemBackupAuditId}
              onChange={(e) => setInputSystemBackupAuditId(e.target.value)}
            />
          </Box>
          <Button
            variant="outlined"
            onClick={handleGetSystembackupaudit}
            disabled={!inputSystemBackupAuditId || systembackupauditLoading}
          >
            GET
          </Button>
        </Box>
      </Box>

      <Divider />

      {!systembackupauditLoading &&
        (systembackupauditError || systembackupaudit) && (
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
                  color={systembackupauditError ? "error" : "success"}
                  display="inline"
                >
                  {systembackupauditError
                    ? systembackupauditError.status
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
                  content={systembackupaudit}
                  error={systembackupauditError}
                />
              ) : (
                <JsonResponse
                  content={systembackupaudit || systembackupauditError}
                />
              )}
            </Box>
          </Box>
        )}
    </>
  );
}
