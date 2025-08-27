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

const BranchSchema = zod.object({
  name: zod.string().nullable(),

  address: zod.string().nullable(),

  geoLocation: zod.string().nullable(),

  contactEmail: zod.string().nullable(),
});

export default function CatalogInventoryUpdateBranchModal({
  openDialog,
  selectedBranch,
}) {
  const [error, setError] = useState(null);

  const theme = useTheme();

  const requestParams = [
    { name: "name", value: selectedBranch?.name ?? "", type: "String" },

    { name: "address", value: selectedBranch?.address ?? "", type: "Object" },

    {
      name: "geoLocation",
      value: selectedBranch?.geoLocation ?? "",
      type: "Object",
    },

    {
      name: "contactEmail",
      value: selectedBranch?.contactEmail ?? "",
      type: "String",
    },
  ];

  const defaultValues = {
    name: selectedBranch?.name ?? "",

    address: selectedBranch?.address ?? "",

    geoLocation: selectedBranch?.geoLocation ?? "",

    contactEmail: selectedBranch?.contactEmail ?? "",
  };

  const methods = useForm({
    resolver: zodResolver(BranchSchema),
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
      if (selectedBranch?.id) {
        const response = await catalogInventoryAxios.patch(
          catalogInventoryEndpoints.branch.updateBranch.replace(
            ":branchId",
            selectedBranch?.id,
          ),
          data,
        );
        setError(null);
        reset();
        console.info("RESPONSE", response);
        await mutate([catalogInventoryEndpoints.branch.listBranches]);
        openDialog.onFalse();
      }
    } catch (ex) {
      console.error(ex);
      setError(ex);
    }
  });

  useEffect(() => {
    methods.reset({
      name: selectedBranch?.name ?? "",

      address: selectedBranch?.address ?? "",

      geoLocation: selectedBranch?.geoLocation ?? "",

      contactEmail: selectedBranch?.contactEmail ?? "",
    });
  }, [selectedBranch]);

  if (!selectedBranch) return null;

  return (
    <Dialog open={openDialog.value} maxWidth="md">
      <DialogTitle>Update Branch</DialogTitle>

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
                : "An error occurred while creating the branch."}
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
