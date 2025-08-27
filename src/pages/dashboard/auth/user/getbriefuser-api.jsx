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

import { useAuthGetBriefUser } from "src/actions/auth";

import { JsonResponse } from "../../../../components/json-response";
import { TableResponse } from "../../../../components/table-response";

export default function AuthGetBriefUserApiPage() {
  const [view, setView] = useState("Table");

  const [inputUserId, setInputUserId] = useState("");
  const [submittedUserId, setSubmittedUserId] = useState(null);

  const { briefuser, briefuserLoading, briefuserError } =
    useAuthGetBriefUser(submittedUserId);

  const handleGetBriefuser = () => {
    setSubmittedUserId(inputUserId);
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
              label="userId"
              value={inputUserId}
              onChange={(e) => setInputUserId(e.target.value)}
            />
          </Box>
          <Button
            variant="outlined"
            onClick={handleGetBriefuser}
            disabled={!inputUserId || briefuserLoading}
          >
            GET
          </Button>
        </Box>
      </Box>

      <Divider />

      {!briefuserLoading && (briefuserError || briefuser) && (
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
                color={briefuserError ? "error" : "success"}
                display="inline"
              >
                {briefuserError ? briefuserError.status : "200"}
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
              <TableResponse content={briefuser} error={briefuserError} />
            ) : (
              <JsonResponse content={briefuser || briefuserError} />
            )}
          </Box>
        </Box>
      )}
    </>
  );
}
