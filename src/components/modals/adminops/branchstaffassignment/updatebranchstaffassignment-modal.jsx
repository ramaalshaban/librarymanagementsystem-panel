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

const BranchstaffassignmentSchema = zod.object({
  branchId: zod.string().nullable(),

  userId: zod.string().nullable(),

  role: zod.string().min(1, { message: "role is required" }),
});

export default function AdminOpsUpdateBranchStaffAssignmentModal({
  openDialog,
  selectedBranchStaffAssignment,
}) {
  const [error, setError] = useState(null);

  const theme = useTheme();

  const requestParams = [
    {
      name: "branchId",
      value: selectedBranchStaffAssignment?.branchId ?? "",
      type: "ID",
    },

    {
      name: "userId",
      value: selectedBranchStaffAssignment?.userId ?? "",
      type: "ID",
    },

    {
      name: "role",
      value: selectedBranchStaffAssignment?.role ?? "",
      type: "Enum",
    },
  ];

  const defaultValues = {
    branchId: selectedBranchStaffAssignment?.branchId ?? "",

    userId: selectedBranchStaffAssignment?.userId ?? "",

    role: selectedBranchStaffAssignment?.role ?? "",
  };

  const methods = useForm({
    resolver: zodResolver(BranchstaffassignmentSchema),
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
      if (selectedBranchStaffAssignment?.id) {
        const response = await adminOpsAxios.patch(
          adminOpsEndpoints.branchStaffAssignment.updateBranchStaffAssignment.replace(
            ":branchStaffAssignmentId",
            selectedBranchStaffAssignment?.id,
          ),
          data,
        );
        setError(null);
        reset();
        console.info("RESPONSE", response);
        await mutate([
          adminOpsEndpoints.branchStaffAssignment.listBranchStaffAssignments,
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
      branchId: selectedBranchStaffAssignment?.branchId ?? "",

      userId: selectedBranchStaffAssignment?.userId ?? "",

      role: selectedBranchStaffAssignment?.role ?? "",
    });
  }, [selectedBranchStaffAssignment]);

  if (!selectedBranchStaffAssignment) return null;

  return (
    <Dialog open={openDialog.value} maxWidth="md">
      <DialogTitle>Update BranchStaffAssignment</DialogTitle>

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
                : "An error occurred while creating the branchStaffAssignment."}
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
