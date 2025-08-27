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

import analyticsAxios, {
  analyticsEndpoints,
} from "../../../../lib/analytics-axios.js";

const UPDATE_TABLE_HEAD = [
  { id: "propertyName", label: "Property Name", width: "30%" },
  { id: "propertyValue", label: "Property Value", width: "70%" },
];

const AnalyticsnapshotSchema = zod.object({
  snapshotType: zod.string().nullable(),

  scopeType: zod.string().nullable(),

  scopeId: zod.string().nullable(),

  timeRange: zod.string().nullable(),

  data: zod.string().nullable(),

  generatedBy: zod.string().nullable(),

  note: zod.string().nullable(),
});

export default function AnalyticsUpdateAnalyticSnapshotModal({
  openDialog,
  selectedAnalyticSnapshot,
}) {
  const [error, setError] = useState(null);

  const theme = useTheme();

  const requestParams = [
    {
      name: "snapshotType",
      value: selectedAnalyticSnapshot?.snapshotType ?? "",
      type: "String",
    },

    {
      name: "scopeType",
      value: selectedAnalyticSnapshot?.scopeType ?? "",
      type: "Enum",
    },

    {
      name: "scopeId",
      value: selectedAnalyticSnapshot?.scopeId ?? "",
      type: "String",
    },

    {
      name: "timeRange",
      value: selectedAnalyticSnapshot?.timeRange ?? "",
      type: "Object",
    },

    {
      name: "data",
      value: selectedAnalyticSnapshot?.data ?? "",
      type: "Object",
    },

    {
      name: "generatedBy",
      value: selectedAnalyticSnapshot?.generatedBy ?? "",
      type: "String",
    },

    { name: "note", value: selectedAnalyticSnapshot?.note ?? "", type: "Text" },
  ];

  const defaultValues = {
    snapshotType: selectedAnalyticSnapshot?.snapshotType ?? "",

    scopeType: selectedAnalyticSnapshot?.scopeType ?? "",

    scopeId: selectedAnalyticSnapshot?.scopeId ?? "",

    timeRange: selectedAnalyticSnapshot?.timeRange ?? "",

    data: selectedAnalyticSnapshot?.data ?? "",

    generatedBy: selectedAnalyticSnapshot?.generatedBy ?? "",

    note: selectedAnalyticSnapshot?.note ?? "",
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
      if (selectedAnalyticSnapshot?.id) {
        const response = await analyticsAxios.patch(
          analyticsEndpoints.analyticSnapshot.updateAnalyticSnapshot.replace(
            ":analyticSnapshotId",
            selectedAnalyticSnapshot?.id,
          ),
          data,
        );
        setError(null);
        reset();
        console.info("RESPONSE", response);
        await mutate([
          analyticsEndpoints.analyticSnapshot.listAnalyticSnapshots,
        ]);
        openDialog.onFalse();
      }
    } catch (ex) {
      console.error(ex);
      setError(ex);
    }
  });

  useEffect(() => {
    methods.reset({
      snapshotType: selectedAnalyticSnapshot?.snapshotType ?? "",

      scopeType: selectedAnalyticSnapshot?.scopeType ?? "",

      scopeId: selectedAnalyticSnapshot?.scopeId ?? "",

      timeRange: selectedAnalyticSnapshot?.timeRange ?? "",

      data: selectedAnalyticSnapshot?.data ?? "",

      generatedBy: selectedAnalyticSnapshot?.generatedBy ?? "",

      note: selectedAnalyticSnapshot?.note ?? "",
    });
  }, [selectedAnalyticSnapshot]);

  if (!selectedAnalyticSnapshot) return null;

  return (
    <Dialog open={openDialog.value} maxWidth="md">
      <DialogTitle>Update AnalyticSnapshot</DialogTitle>

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
