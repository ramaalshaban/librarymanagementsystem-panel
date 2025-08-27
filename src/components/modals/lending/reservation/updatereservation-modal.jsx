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
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "@mui/lab/LoadingButton";
import { mutate } from "swr";

import lendingAxios, {
  lendingEndpoints,
} from "../../../../lib/lending-axios.js";

const UPDATE_TABLE_HEAD = [
  { id: "propertyName", label: "Property Name", width: "30%" },
  { id: "propertyValue", label: "Property Value", width: "70%" },
];

const ReservationSchema = zod.object({
  status: zod.string().nullable(),

  queuePosition: zod.number().nullable(),

  activationNotifiedAt: zod.string().nullable(),

  fulfilledAt: zod.string().nullable(),
});

export default function LendingUpdateReservationModal({
  openDialog,
  selectedReservation,
}) {
  const [error, setError] = useState(null);

  const theme = useTheme();

  const requestParams = [
    { name: "status", value: selectedReservation?.status ?? "", type: "Enum" },

    {
      name: "queuePosition",
      value: selectedReservation?.queuePosition ?? "",
      type: "Integer",
    },

    {
      name: "activationNotifiedAt",
      value: selectedReservation?.activationNotifiedAt ?? "",
      type: "Date",
    },

    {
      name: "fulfilledAt",
      value: selectedReservation?.fulfilledAt ?? "",
      type: "Date",
    },
  ];

  const defaultValues = {
    status: selectedReservation?.status ?? "",

    queuePosition: selectedReservation?.queuePosition ?? "",

    activationNotifiedAt: selectedReservation?.activationNotifiedAt ?? "",

    fulfilledAt: selectedReservation?.fulfilledAt ?? "",
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
      if (selectedReservation?.id) {
        const response = await lendingAxios.patch(
          lendingEndpoints.reservation.updateReservation.replace(
            ":reservationId",
            selectedReservation?.id,
          ),
          data,
        );
        setError(null);
        reset();
        console.info("RESPONSE", response);
        await mutate([lendingEndpoints.reservation.listReservations]);
        openDialog.onFalse();
      }
    } catch (ex) {
      console.error(ex);
      setError(ex);
    }
  });

  useEffect(() => {
    methods.reset({
      status: selectedReservation?.status ?? "",

      queuePosition: selectedReservation?.queuePosition ?? "",

      activationNotifiedAt: selectedReservation?.activationNotifiedAt ?? "",

      fulfilledAt: selectedReservation?.fulfilledAt ?? "",
    });
  }, [selectedReservation]);

  if (!selectedReservation) return null;

  return (
    <Dialog open={openDialog.value} maxWidth="md">
      <DialogTitle>Update Reservation</DialogTitle>

      <Form methods={methods} onSubmit={onSubmit}>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 600 }}>
              <TableHeadCustom headCells={UPDATE_TABLE_HEAD} />

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
