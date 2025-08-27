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

import paymentAxios, {
  paymentEndpoints,
} from "../../../../lib/payment-axios.js";

const ADD_TABLE_HEAD = [
  { id: "propertyName", label: "Property Name", width: "30%" },
  { id: "propertyValue", label: "Property Value", width: "70%" },
];

const requestParams = [
  { name: "userId", value: "", type: "ID" },

  { name: "loanId", value: "", type: "ID" },

  { name: "amount", value: "", type: "Double" },

  { name: "currency", value: "", type: "String" },

  { name: "status", value: "", type: "Enum" },

  { name: "statusUpdateDate", value: "", type: "Date" },

  { name: "reason", value: "", type: "String" },

  { name: "note", value: "", type: "Text" },
];

const FeeSchema = zod.object({
  userId: zod.string().min(1, { message: "userId is required" }),

  loanId: zod.string().nullable(),

  amount: zod.number().min(1, { message: "amount is required" }),

  currency: zod.string().min(1, { message: "currency is required" }),

  status: zod.string().min(1, { message: "status is required" }),

  statusUpdateDate: zod
    .string()
    .min(1, { message: "statusUpdateDate is required" }),

  reason: zod.string().nullable(),

  note: zod.string().nullable(),
});

export default function PaymentCreateFeeModal({ openDialog }) {
  const [error, setError] = useState(null);

  const theme = useTheme();

  const defaultValues = {
    userId: "",

    loanId: "",

    amount: "",

    currency: "",

    status: "",

    statusUpdateDate: "",

    reason: "",

    note: "",
  };

  const methods = useForm({
    resolver: zodResolver(FeeSchema),
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
      const response = await paymentAxios.post(
        paymentEndpoints.fee.createFee,
        data,
      );
      setError(null);
      reset();
      console.info("RESPONSE", response);
      await mutate([paymentEndpoints.fee.listFees]);
      openDialog.onFalse();
    } catch (ex) {
      console.error(ex);
      setError(ex);
    }
  });

  return (
    <Dialog open={openDialog.value} maxWidth="md">
      <DialogTitle>Create Fee</DialogTitle>

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
                : "An error occurred while creating the fee."}
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
