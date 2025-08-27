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

import catalogInventoryAxios, {
  catalogInventoryEndpoints,
} from "../../../../lib/catalogInventory-axios.js";

const UPDATE_TABLE_HEAD = [
  { id: "propertyName", label: "Property Name", width: "30%" },
  { id: "propertyValue", label: "Property Value", width: "70%" },
];

const InventoryauditlogSchema = zod.object({
  auditType: zod.string().nullable(),

  detailNote: zod.string().nullable(),

  adjustmentValue: zod.number().nullable(),
});

export default function CatalogInventoryUpdateInventoryAuditLogModal({
  openDialog,
  selectedInventoryAuditLog,
}) {
  const [error, setError] = useState(null);

  const theme = useTheme();

  const requestParams = [
    {
      name: "auditType",
      value: selectedInventoryAuditLog?.auditType ?? "",
      type: "Enum",
    },

    {
      name: "detailNote",
      value: selectedInventoryAuditLog?.detailNote ?? "",
      type: "Text",
    },

    {
      name: "adjustmentValue",
      value: selectedInventoryAuditLog?.adjustmentValue ?? "",
      type: "Integer",
    },
  ];

  const defaultValues = {
    auditType: selectedInventoryAuditLog?.auditType ?? "",

    detailNote: selectedInventoryAuditLog?.detailNote ?? "",

    adjustmentValue: selectedInventoryAuditLog?.adjustmentValue ?? "",
  };

  const methods = useForm({
    resolver: zodResolver(InventoryauditlogSchema),
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
      if (selectedInventoryAuditLog?.id) {
        const response = await catalogInventoryAxios.patch(
          catalogInventoryEndpoints.inventoryAuditLog.updateInventoryAuditLog.replace(
            ":inventoryAuditLogId",
            selectedInventoryAuditLog?.id,
          ),
          data,
        );
        setError(null);
        reset();
        console.info("RESPONSE", response);
        await mutate([
          catalogInventoryEndpoints.inventoryAuditLog.listInventoryAuditLogs,
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
      auditType: selectedInventoryAuditLog?.auditType ?? "",

      detailNote: selectedInventoryAuditLog?.detailNote ?? "",

      adjustmentValue: selectedInventoryAuditLog?.adjustmentValue ?? "",
    });
  }, [selectedInventoryAuditLog]);

  if (!selectedInventoryAuditLog) return null;

  return (
    <Dialog open={openDialog.value} maxWidth="md">
      <DialogTitle>Update InventoryAuditLog</DialogTitle>

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
                : "An error occurred while creating the inventoryAuditLog."}
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
