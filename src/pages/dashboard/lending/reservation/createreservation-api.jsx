import * as zod from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Divider from "@mui/material/Divider";
import { useTheme } from "@mui/material/styles";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Box,
  Chip,
  Link,
  Table,
  Paper,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  ToggleButton,
  TableContainer,
  ToggleButtonGroup,
} from "@mui/material";

import { Form, Field } from "../../../../components/hook-form";
import { JsonResponse } from "../../../../components/json-response";
import { TableResponse } from "../../../../components/table-response";
import lendingAxios, {
  lendingEndpoints,
} from "../../../../lib/lending-axios.js";

const requestParams = [
  { name: "userId", value: "", type: "ID" },

  { name: "bookId", value: "", type: "ID" },

  { name: "branchId", value: "", type: "ID" },

  { name: "status", value: "", type: "Enum" },

  { name: "requestedAt", value: "", type: "Date" },

  { name: "queuePosition", value: "", type: "Integer" },

  { name: "activationNotifiedAt", value: "", type: "Date" },

  { name: "fulfilledAt", value: "", type: "Date" },
];

const ReservationSchema = zod.object({
  userId: zod.string().min(1, { message: "userId is required" }),

  bookId: zod.string().min(1, { message: "bookId is required" }),

  branchId: zod.string().min(1, { message: "branchId is required" }),

  status: zod.string().min(1, { message: "status is required" }),

  requestedAt: zod.string().min(1, { message: "requestedAt is required" }),

  queuePosition: zod.number().nullable(),

  activationNotifiedAt: zod.string().nullable(),

  fulfilledAt: zod.string().nullable(),
});

export default function LendingCreateReservationApiPage() {
  const [view, setView] = useState("Table");
  const [createdReservation, setCreatedReservation] = useState(null);
  const [error, setError] = useState(null);

  const theme = useTheme();

  const defaultValues = {
    userId: "",

    bookId: "",

    branchId: "",

    status: "",

    requestedAt: "",

    queuePosition: "",

    activationNotifiedAt: "",

    fulfilledAt: "",
  };

  const methods = useForm({
    resolver: zodResolver(ReservationSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await lendingAxios.post(
        lendingEndpoints.reservation.createReservation,
        data,
      );
      setError(null);
      setCreatedReservation(null);
      reset();
      console.info("RESPONSE", response);
      setCreatedReservation(response.data.reservation);
    } catch (ex) {
      console.error(ex);
      setError(ex);
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Box marginY="2rem">
        <Typography variant="h4" marginBottom="1.5rem">
          CREATE
        </Typography>

        <TableContainer component={Paper} sx={{ mb: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell width="30%">
                  <Typography variant="body1" fontWeight="bold">
                    Property Name
                  </Typography>
                </TableCell>
                <TableCell width="70%">
                  <Typography variant="body1" fontWeight="bold">
                    Property Value
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requestParams.map((row) => (
                <TableRow key={row.name}>
                  <TableCell sx={{ backgroundColor: theme.palette.grey[100] }}>
                    <Chip variant="soft" label={row.name} />
                  </TableCell>
                  <TableCell>
                    {row.type === "Boolean" ? (
                      <Field.Checkbox name={row.name} />
                    ) : (
                      <Field.Text name={row.name} />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box display="flex" justifyContent="flex-end" gap={2}>
          <Link component="button" underline="always" onClick={() => reset()}>
            Cancel
          </Link>
          <LoadingButton
            type="submit"
            variant="contained"
            size="large"
            loading={isSubmitting}
          >
            Save
          </LoadingButton>
        </Box>
      </Box>
      <Divider />
      {(createdReservation || error) && (
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
                {error ? (error.status ?? "500") : "201"}
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
              <TableResponse content={createdReservation} error={error} />
            ) : (
              <JsonResponse content={createdReservation || error} />
            )}
          </Box>
        </Box>
      )}
    </Form>
  );
}
