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

import adminOpsAxios, {
  adminOpsEndpoints,
} from "../../../../lib/adminOps-axios.js";

const UPDATE_TABLE_HEAD = [
  { id: "propertyName", label: "Property Name", width: "30%" },
  { id: "propertyValue", label: "Property Value", width: "70%" },
];

const ExternalnotificationconfigSchema = zod.object({
  providerType: zod.string().min(1, { message: "providerType is required" }),

  name: zod.string().nullable(),

  settings: zod.string().nullable(),

  status: zod.string().min(1, { message: "status is required" }),
});

export default function AdminOpsUpdateExternalNotificationConfigModal({
  openDialog,
  selectedExternalNotificationConfig,
}) {
  const [error, setError] = useState(null);

  const theme = useTheme();

  const requestParams = [
    {
      name: "providerType",
      value: selectedExternalNotificationConfig?.providerType ?? "",
      type: "Enum",
    },

    {
      name: "name",
      value: selectedExternalNotificationConfig?.name ?? "",
      type: "String",
    },

    {
      name: "settings",
      value: selectedExternalNotificationConfig?.settings ?? "",
      type: "Object",
    },

    {
      name: "status",
      value: selectedExternalNotificationConfig?.status ?? "",
      type: "Enum",
    },
  ];

  const defaultValues = {
    providerType: selectedExternalNotificationConfig?.providerType ?? "",

    name: selectedExternalNotificationConfig?.name ?? "",

    settings: selectedExternalNotificationConfig?.settings ?? "",

    status: selectedExternalNotificationConfig?.status ?? "",
  };

  const methods = useForm({
    resolver: zodResolver(ExternalnotificationconfigSchema),
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
      if (selectedExternalNotificationConfig?.id) {
        const response = await adminOpsAxios.patch(
          adminOpsEndpoints.externalNotificationConfig.updateExternalNotificationConfig.replace(
            ":externalNotificationConfigId",
            selectedExternalNotificationConfig?.id,
          ),
          data,
        );
        setError(null);
        reset();
        console.info("RESPONSE", response);
        await mutate([
          adminOpsEndpoints.externalNotificationConfig
            .listExternalNotificationConfigs,
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
      providerType: selectedExternalNotificationConfig?.providerType ?? "",

      name: selectedExternalNotificationConfig?.name ?? "",

      settings: selectedExternalNotificationConfig?.settings ?? "",

      status: selectedExternalNotificationConfig?.status ?? "",
    });
  }, [selectedExternalNotificationConfig]);

  if (!selectedExternalNotificationConfig) return null;

  return (
    <Dialog open={openDialog.value} maxWidth="md">
      <DialogTitle>Update ExternalNotificationConfig</DialogTitle>

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
                : "An error occurred while creating the externalNotificationConfig."}
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
