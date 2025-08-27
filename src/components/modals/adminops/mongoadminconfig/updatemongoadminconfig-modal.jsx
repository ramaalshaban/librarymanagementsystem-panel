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

const MongoadminconfigSchema = zod.object({
  configType: zod.string().min(1, { message: "configType is required" }),

  targetObject: zod.string().nullable(),

  configDetails: zod.string().nullable(),

  status: zod.string().min(1, { message: "status is required" }),
});

export default function AdminOpsUpdateMongoAdminConfigModal({
  openDialog,
  selectedMongoAdminConfig,
}) {
  const [error, setError] = useState(null);

  const theme = useTheme();

  const requestParams = [
    {
      name: "configType",
      value: selectedMongoAdminConfig?.configType ?? "",
      type: "Enum",
    },

    {
      name: "targetObject",
      value: selectedMongoAdminConfig?.targetObject ?? "",
      type: "String",
    },

    {
      name: "configDetails",
      value: selectedMongoAdminConfig?.configDetails ?? "",
      type: "Object",
    },

    {
      name: "status",
      value: selectedMongoAdminConfig?.status ?? "",
      type: "Enum",
    },
  ];

  const defaultValues = {
    configType: selectedMongoAdminConfig?.configType ?? "",

    targetObject: selectedMongoAdminConfig?.targetObject ?? "",

    configDetails: selectedMongoAdminConfig?.configDetails ?? "",

    status: selectedMongoAdminConfig?.status ?? "",
  };

  const methods = useForm({
    resolver: zodResolver(MongoadminconfigSchema),
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
      if (selectedMongoAdminConfig?.id) {
        const response = await adminOpsAxios.patch(
          adminOpsEndpoints.mongoAdminConfig.updateMongoAdminConfig.replace(
            ":mongoAdminConfigId",
            selectedMongoAdminConfig?.id,
          ),
          data,
        );
        setError(null);
        reset();
        console.info("RESPONSE", response);
        await mutate([
          adminOpsEndpoints.mongoAdminConfig.listMongoAdminConfigs,
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
      configType: selectedMongoAdminConfig?.configType ?? "",

      targetObject: selectedMongoAdminConfig?.targetObject ?? "",

      configDetails: selectedMongoAdminConfig?.configDetails ?? "",

      status: selectedMongoAdminConfig?.status ?? "",
    });
  }, [selectedMongoAdminConfig]);

  if (!selectedMongoAdminConfig) return null;

  return (
    <Dialog open={openDialog.value} maxWidth="md">
      <DialogTitle>Update MongoAdminConfig</DialogTitle>

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
                : "An error occurred while creating the mongoAdminConfig."}
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
