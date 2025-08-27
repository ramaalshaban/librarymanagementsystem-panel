import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Link,
} from "@mui/material";
import { useState } from "react";
import catalogInventoryAxios, {
  catalogInventoryEndpoints,
} from "../../../../lib/catalogInventory-axios.js";
import LoadingButton from "@mui/lab/LoadingButton";
import { mutate } from "swr";

export default function CatalogInventoryDeleteBranchInventoryModal({
  openDialog,
  selectedId,
}) {
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const response = await catalogInventoryAxios.delete(
        catalogInventoryEndpoints.branchInventory.deleteBranchInventory.replace(
          ":branchInventoryId",
          selectedId,
        ),
      );
      setError(null);
      console.info("RESPONSE", response);
      setIsDeleting(false);
      await mutate([
        catalogInventoryEndpoints.branchInventory.listBranchInventories,
      ]);
      openDialog.onFalse();
    } catch (ex) {
      console.error(ex);
      setError(ex);
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={openDialog.value} maxWidth="md">
      <DialogTitle>Delete BranchInventory</DialogTitle>
      <DialogContent>
        do you want to delete the branchInventory with id: {selectedId}
      </DialogContent>
      <DialogActions className="gap-2">
        <Link
          component="button"
          type="button"
          underline="always"
          onClick={openDialog.onFalse}
        >
          No
        </Link>
        <LoadingButton
          type="button"
          onClick={handleDelete}
          variant="contained"
          size="large"
          loading={isDeleting}
          color="error"
        >
          Yes
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
