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

const BranchpurchaseorderSchema = zod.object({
  items: zod.string().nullable(),

  status: zod.string().min(1, { message: "status is required" }),

  approvedByUserId: zod.string().nullable(),

  approvalDate: zod.string().nullable(),

  note: zod.string().nullable(),
});

export default function AdminOpsUpdateBranchPurchaseOrderModal({
  openDialog,
  selectedBranchPurchaseOrder,
}) {
  const [error, setError] = useState(null);

  const theme = useTheme();

  const requestParams = [
    {
      name: "items",
      value: selectedBranchPurchaseOrder?.items ?? "",
      type: "Object",
    },

    {
      name: "status",
      value: selectedBranchPurchaseOrder?.status ?? "",
      type: "Enum",
    },

    {
      name: "approvedByUserId",
      value: selectedBranchPurchaseOrder?.approvedByUserId ?? "",
      type: "ID",
    },

    {
      name: "approvalDate",
      value: selectedBranchPurchaseOrder?.approvalDate ?? "",
      type: "Date",
    },

    {
      name: "note",
      value: selectedBranchPurchaseOrder?.note ?? "",
      type: "Text",
    },
  ];

  const defaultValues = {
    items: selectedBranchPurchaseOrder?.items ?? "",

    status: selectedBranchPurchaseOrder?.status ?? "",

    approvedByUserId: selectedBranchPurchaseOrder?.approvedByUserId ?? "",

    approvalDate: selectedBranchPurchaseOrder?.approvalDate ?? "",

    note: selectedBranchPurchaseOrder?.note ?? "",
  };

  const methods = useForm({
    resolver: zodResolver(BranchpurchaseorderSchema),
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
      if (selectedBranchPurchaseOrder?.id) {
        const response = await adminOpsAxios.patch(
          adminOpsEndpoints.branchPurchaseOrder.updateBranchPurchaseOrder.replace(
            ":branchPurchaseOrderId",
            selectedBranchPurchaseOrder?.id,
          ),
          data,
        );
        setError(null);
        reset();
        console.info("RESPONSE", response);
        await mutate([
          adminOpsEndpoints.branchPurchaseOrder.listBranchPurchaseOrders,
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
      items: selectedBranchPurchaseOrder?.items ?? "",

      status: selectedBranchPurchaseOrder?.status ?? "",

      approvedByUserId: selectedBranchPurchaseOrder?.approvedByUserId ?? "",

      approvalDate: selectedBranchPurchaseOrder?.approvalDate ?? "",

      note: selectedBranchPurchaseOrder?.note ?? "",
    });
  }, [selectedBranchPurchaseOrder]);

  if (!selectedBranchPurchaseOrder) return null;

  return (
    <Dialog open={openDialog.value} maxWidth="md">
      <DialogTitle>Update BranchPurchaseOrder</DialogTitle>

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
                : "An error occurred while creating the branchPurchaseOrder."}
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
