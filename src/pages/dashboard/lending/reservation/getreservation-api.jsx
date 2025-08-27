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

import { useLendingGetReservation } from "src/actions/lending";

import { JsonResponse } from "../../../../components/json-response";
import { TableResponse } from "../../../../components/table-response";

export default function LendingGetReservationApiPage() {
  const [view, setView] = useState("Table");

  const [inputReservationId, setInputReservationId] = useState("");
  const [submittedReservationId, setSubmittedReservationId] = useState(null);

  const { reservation, reservationLoading, reservationError } =
    useLendingGetReservation(submittedReservationId);

  const handleGetReservation = () => {
    setSubmittedReservationId(inputReservationId);
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
              label="reservationId"
              value={inputReservationId}
              onChange={(e) => setInputReservationId(e.target.value)}
            />
          </Box>
          <Button
            variant="outlined"
            onClick={handleGetReservation}
            disabled={!inputReservationId || reservationLoading}
          >
            GET
          </Button>
        </Box>
      </Box>

      <Divider />

      {!reservationLoading && (reservationError || reservation) && (
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
                color={reservationError ? "error" : "success"}
                display="inline"
              >
                {reservationError ? reservationError.status : "200"}
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
              <TableResponse content={reservation} error={reservationError} />
            ) : (
              <JsonResponse content={reservation || reservationError} />
            )}
          </Box>
        </Box>
      )}
    </>
  );
}
