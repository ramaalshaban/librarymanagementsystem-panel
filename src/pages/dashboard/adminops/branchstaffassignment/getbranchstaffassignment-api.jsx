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

import { useAdminOpsGetBranchStaffAssignment } from "src/actions/adminOps";

import { JsonResponse } from "../../../../components/json-response";
import { TableResponse } from "../../../../components/table-response";

export default function AdminOpsGetBranchStaffAssignmentApiPage() {
  const [view, setView] = useState("Table");

  const [inputBranchStaffAssignmentId, setInputBranchStaffAssignmentId] =
    useState("");
  const [
    submittedBranchStaffAssignmentId,
    setSubmittedBranchStaffAssignmentId,
  ] = useState(null);

  const {
    branchstaffassignment,
    branchstaffassignmentLoading,
    branchstaffassignmentError,
  } = useAdminOpsGetBranchStaffAssignment(submittedBranchStaffAssignmentId);

  const handleGetBranchstaffassignment = () => {
    setSubmittedBranchStaffAssignmentId(inputBranchStaffAssignmentId);
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
              label="branchStaffAssignmentId"
              value={inputBranchStaffAssignmentId}
              onChange={(e) => setInputBranchStaffAssignmentId(e.target.value)}
            />
          </Box>
          <Button
            variant="outlined"
            onClick={handleGetBranchstaffassignment}
            disabled={
              !inputBranchStaffAssignmentId || branchstaffassignmentLoading
            }
          >
            GET
          </Button>
        </Box>
      </Box>

      <Divider />

      {!branchstaffassignmentLoading &&
        (branchstaffassignmentError || branchstaffassignment) && (
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
                  color={branchstaffassignmentError ? "error" : "success"}
                  display="inline"
                >
                  {branchstaffassignmentError
                    ? branchstaffassignmentError.status
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
                  content={branchstaffassignment}
                  error={branchstaffassignmentError}
                />
              ) : (
                <JsonResponse
                  content={branchstaffassignment || branchstaffassignmentError}
                />
              )}
            </Box>
          </Box>
        )}
    </>
  );
}
