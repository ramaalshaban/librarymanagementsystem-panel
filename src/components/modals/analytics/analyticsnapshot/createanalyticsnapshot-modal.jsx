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

import analyticsAxios, {
  analyticsEndpoints,
} from "../../../../lib/analytics-axios.js";

const ADD_TABLE_HEAD = [
  { id: "propertyName", label: "Property Name", width: "30%" },
  { id: "propertyValue", label: "Property Value", width: "70%" },
];

const requestParams = [
  { name: "snapshotType", value: "", type: "String" },

  { name: "scopeType", value: "", type: "Enum" },

  { name: "scopeId", value: "", type: "String" },

  { name: "timeRange", value: "", type: "Object" },

  { name: "data", value: "", type: "Object" },

  { name: "generatedBy", value: "", type: "String" },

  { name: "note", value: "", type: "Text" },
];

const AnalyticsnapshotSchema = zod.object({
  snapshotType: zod.string().min(1, { message: "snapshotType is required" }),

  scopeType: zod.string().min(1, { message: "scopeType is required" }),

  scopeId: zod.string().nullable(),

  timeRange: zod.string().min(1, { message: "timeRange is required" }),

  data: zod.string().min(1, { message: "data is required" }),

  generatedBy: zod.string().nullable(),

  note: zod.string().nullable(),
});

export default function AnalyticsCreateAnalyticSnapshotModal({ openDialog }) {
  const [error, setError] = useState(null);

  const theme = useTheme();

  const defaultValues = {
    snapshotType: "",

    scopeType: "",

    scopeId: "",

    timeRange: "",

    data: "",

    generatedBy: "",

    note: "",
  };

  const methods = useForm({
    resolver: zodResolver(AnalyticsnapshotSchema),
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
      const response = await analyticsAxios.post(
        analyticsEndpoints.analyticSnapshot.createAnalyticSnapshot,
        data,
      );
      setError(null);
      reset();
      console.info("RESPONSE", response);
      await mutate([analyticsEndpoints.analyticSnapshot.listAnalyticSnapshots]);
      openDialog.onFalse();
    } catch (ex) {
      console.error(ex);
      setError(ex);
    }
  });

  return (
    <Dialog open={openDialog.value} maxWidth="md">
      <DialogTitle>Create AnalyticSnapshot</DialogTitle>

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
                : "An error occurred while creating the analyticSnapshot."}
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
