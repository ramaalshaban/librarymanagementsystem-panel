import {
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { TableHeadCustom } from "../../../table/index.js";
import { Iconify } from "../../../iconify/index.js";
import { useTheme } from "@mui/material/styles";

import { Form, Field } from "../../../hook-form";
import * as zod from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "@mui/lab/LoadingButton";
import { mutate } from "swr";

import lendingAxios, {
  lendingEndpoints,
} from "../../../../lib/lending-axios.js";

const ADD_TABLE_HEAD = [
  { id: "propertyName", label: "Property Name", width: "30%" },
  { id: "propertyValue", label: "Property Value", width: "70%" },
];

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

export default function LendingCreateReservationModal({ openDialog }) {
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

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await lendingAxios.post(
        lendingEndpoints.reservation.createReservation,
        data,
      );
      setError(null);
      reset();
      console.info("RESPONSE", response);
      await mutate([lendingEndpoints.reservation.listReservations]);
      openDialog.onFalse();
    } catch (ex) {
      console.error(ex);
      setError(ex);
    }
  });

  return (
    <Dialog open={openDialog.value} maxWidth="md">
      <DialogTitle>Create Reservation</DialogTitle>

      <Form methods={methods} onSubmit={onSubmit}>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 600 }}>
              <TableHeadCustom headCells={ADD_TABLE_HEAD} />

              <TableBody>
                {requestParams.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell
                      sx={{ backgroundColor: theme.palette.grey[100] }}
                    >
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
          {error && (
            <DialogContentText color="error">
              {error.message
                ? error.message
                : "An error occurred while creating the reservation."}
            </DialogContentText>
          )}
        </DialogContent>

        <DialogActions className="gap-2">
          <Link
            component="button"
            type="button"
            underline="always"
            onClick={openDialog.onFalse}
          >
            Cancel
          </Link>
          <LoadingButton
            type="submit"
            variant="contained"
            size="large"
            loading={isSubmitting}
            startIcon={<Iconify icon="material-symbols:save-outline" />}
          >
            Save
          </LoadingButton>
        </DialogActions>
      </Form>
    </Dialog>
  );
}
