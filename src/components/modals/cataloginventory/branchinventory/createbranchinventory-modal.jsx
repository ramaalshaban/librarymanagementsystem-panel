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

import catalogInventoryAxios, {
  catalogInventoryEndpoints,
} from "../../../../lib/catalogInventory-axios.js";

const ADD_TABLE_HEAD = [
  { id: "propertyName", label: "Property Name", width: "30%" },
  { id: "propertyValue", label: "Property Value", width: "70%" },
];

const requestParams = [
  { name: "bookId", value: "", type: "ID" },

  { name: "branchId", value: "", type: "ID" },

  { name: "totalCopies", value: "", type: "Integer" },

  { name: "availableCopies", value: "", type: "Integer" },

  { name: "localShelfLocation", value: "", type: "String" },

  { name: "conditionNotes", value: "", type: "Text" },
];

const BranchinventorySchema = zod.object({
  bookId: zod.string().min(1, { message: "bookId is required" }),

  branchId: zod.string().min(1, { message: "branchId is required" }),

  totalCopies: zod.number().min(1, { message: "totalCopies is required" }),

  availableCopies: zod
    .number()
    .min(1, { message: "availableCopies is required" }),

  localShelfLocation: zod.string().nullable(),

  conditionNotes: zod.string().nullable(),
});

export default function CatalogInventoryCreateBranchInventoryModal({
  openDialog,
}) {
  const [error, setError] = useState(null);

  const theme = useTheme();

  const defaultValues = {
    bookId: "",

    branchId: "",

    totalCopies: "",

    availableCopies: "",

    localShelfLocation: "",

    conditionNotes: "",
  };

  const methods = useForm({
    resolver: zodResolver(BranchinventorySchema),
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
      const response = await catalogInventoryAxios.post(
        catalogInventoryEndpoints.branchInventory.createBranchInventory,
        data,
      );
      setError(null);
      reset();
      console.info("RESPONSE", response);
      await mutate([
        catalogInventoryEndpoints.branchInventory.listBranchInventories,
      ]);
      openDialog.onFalse();
    } catch (ex) {
      console.error(ex);
      setError(ex);
    }
  });

  return (
    <Dialog open={openDialog.value} maxWidth="md">
      <DialogTitle>Create BranchInventory</DialogTitle>

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
                : "An error occurred while creating the branchInventory."}
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
