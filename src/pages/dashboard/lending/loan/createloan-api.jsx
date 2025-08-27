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

  { name: "branchInventoryId", value: "", type: "ID" },

  { name: "status", value: "", type: "Enum" },

  { name: "checkedOutAt", value: "", type: "Date" },

  { name: "dueDate", value: "", type: "Date" },

  { name: "returnedAt", value: "", type: "Date" },

  { name: "renewalCount", value: "", type: "Integer" },

  { name: "renewalHistory", value: "", type: "Object" },

  { name: "lastRenewedAt", value: "", type: "Date" },

  { name: "checkedOutBy", value: "", type: "ID" },
];

const LoanSchema = zod.object({
  userId: zod.string().min(1, { message: "userId is required" }),

  bookId: zod.string().min(1, { message: "bookId is required" }),

  branchId: zod.string().min(1, { message: "branchId is required" }),

  branchInventoryId: zod
    .string()
    .min(1, { message: "branchInventoryId is required" }),

  status: zod.string().min(1, { message: "status is required" }),

  checkedOutAt: zod.string().min(1, { message: "checkedOutAt is required" }),

  dueDate: zod.string().min(1, { message: "dueDate is required" }),

  returnedAt: zod.string().nullable(),

  renewalCount: zod.number().min(1, { message: "renewalCount is required" }),

  renewalHistory: zod.string().nullable(),

  lastRenewedAt: zod.string().nullable(),

  checkedOutBy: zod.string().min(1, { message: "checkedOutBy is required" }),
});

export default function LendingCreateLoanApiPage() {
  const [view, setView] = useState("Table");
  const [createdLoan, setCreatedLoan] = useState(null);
  const [error, setError] = useState(null);

  const theme = useTheme();

  const defaultValues = {
    userId: "",

    bookId: "",

    branchId: "",

    branchInventoryId: "",

    status: "",

    checkedOutAt: "",

    dueDate: "",

    returnedAt: "",

    renewalCount: "",

    renewalHistory: "",

    lastRenewedAt: "",

    checkedOutBy: "",
  };

  const methods = useForm({
    resolver: zodResolver(LoanSchema),
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
        lendingEndpoints.loan.createLoan,
        data,
      );
      setError(null);
      setCreatedLoan(null);
      reset();
      console.info("RESPONSE", response);
      setCreatedLoan(response.data.loan);
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
      {(createdLoan || error) && (
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
              <TableResponse content={createdLoan} error={error} />
            ) : (
              <JsonResponse content={createdLoan || error} />
            )}
          </Box>
        </Box>
      )}
    </Form>
  );
}
