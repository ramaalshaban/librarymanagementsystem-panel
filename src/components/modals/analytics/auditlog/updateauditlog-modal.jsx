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

const AuditlogSchema = zod.object({
  actorUserId: zod.string().nullable(),

  actionType: zod.string().nullable(),

  targetObjectType: zod.string().nullable(),

  targetObjectId: zod.string().nullable(),

  context: zod.string().nullable(),

  note: zod.string().nullable(),
});

export default function AnalyticsUpdateAuditLogModal({
  openDialog,
  selectedAuditLog,
}) {
  const [error, setError] = useState(null);

  const theme = useTheme();

  const requestParams = [
    {
      name: "actorUserId",
      value: selectedAuditLog?.actorUserId ?? "",
      type: "ID",
    },

    {
      name: "actionType",
      value: selectedAuditLog?.actionType ?? "",
      type: "String",
    },

    {
      name: "targetObjectType",
      value: selectedAuditLog?.targetObjectType ?? "",
      type: "String",
    },

    {
      name: "targetObjectId",
      value: selectedAuditLog?.targetObjectId ?? "",
      type: "String",
    },

    { name: "context", value: selectedAuditLog?.context ?? "", type: "Object" },

    { name: "note", value: selectedAuditLog?.note ?? "", type: "Text" },
  ];

  const defaultValues = {
    actorUserId: selectedAuditLog?.actorUserId ?? "",

    actionType: selectedAuditLog?.actionType ?? "",

    targetObjectType: selectedAuditLog?.targetObjectType ?? "",

    targetObjectId: selectedAuditLog?.targetObjectId ?? "",

    context: selectedAuditLog?.context ?? "",

    note: selectedAuditLog?.note ?? "",
  };

  const methods = useForm({
    resolver: zodResolver(AuditlogSchema),
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
      if (selectedAuditLog?.id) {
        const response = await analyticsAxios.patch(
          analyticsEndpoints.auditLog.updateAuditLog.replace(
            ":auditLogId",
            selectedAuditLog?.id,
          ),
          data,
        );
        setError(null);
        reset();
        console.info("RESPONSE", response);
        await mutate([analyticsEndpoints.auditLog.listAuditLogs]);
        openDialog.onFalse();
      }
    } catch (ex) {
      console.error(ex);
      setError(ex);
    }
  });

  useEffect(() => {
    methods.reset({
      actorUserId: selectedAuditLog?.actorUserId ?? "",

      actionType: selectedAuditLog?.actionType ?? "",

      targetObjectType: selectedAuditLog?.targetObjectType ?? "",

      targetObjectId: selectedAuditLog?.targetObjectId ?? "",

      context: selectedAuditLog?.context ?? "",

      note: selectedAuditLog?.note ?? "",
    });
  }, [selectedAuditLog]);

  if (!selectedAuditLog) return null;

  return (
    <Dialog open={openDialog.value} maxWidth="md">
      <DialogTitle>Update AuditLog</DialogTitle>

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
                : "An error occurred while creating the auditLog."}
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
