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

const BookSchema = zod.object({
  title: zod.string().nullable(),

  authors: zod.string().nullable(),

  isbn: zod.string().nullable(),

  synopsis: zod.string().nullable(),

  genres: zod.string().nullable(),

  publicationDate: zod.string().nullable(),

  language: zod.string().nullable(),

  publisher: zod.string().nullable(),

  coverImageUrl: zod.string().nullable(),
});

export default function CatalogInventoryUpdateBookModal({
  openDialog,
  selectedBook,
}) {
  const [error, setError] = useState(null);

  const theme = useTheme();

  const requestParams = [
    { name: "title", value: selectedBook?.title ?? "", type: "String" },

    { name: "authors", value: selectedBook?.authors ?? "", type: "String" },

    { name: "isbn", value: selectedBook?.isbn ?? "", type: "String" },

    { name: "synopsis", value: selectedBook?.synopsis ?? "", type: "Text" },

    { name: "genres", value: selectedBook?.genres ?? "", type: "String" },

    {
      name: "publicationDate",
      value: selectedBook?.publicationDate ?? "",
      type: "Date",
    },

    { name: "language", value: selectedBook?.language ?? "", type: "String" },

    { name: "publisher", value: selectedBook?.publisher ?? "", type: "String" },

    {
      name: "coverImageUrl",
      value: selectedBook?.coverImageUrl ?? "",
      type: "String",
    },
  ];

  const defaultValues = {
    title: selectedBook?.title ?? "",

    authors: selectedBook?.authors ?? "",

    isbn: selectedBook?.isbn ?? "",

    synopsis: selectedBook?.synopsis ?? "",

    genres: selectedBook?.genres ?? "",

    publicationDate: selectedBook?.publicationDate ?? "",

    language: selectedBook?.language ?? "",

    publisher: selectedBook?.publisher ?? "",

    coverImageUrl: selectedBook?.coverImageUrl ?? "",
  };

  const methods = useForm({
    resolver: zodResolver(BookSchema),
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
      if (selectedBook?.id) {
        const response = await catalogInventoryAxios.patch(
          catalogInventoryEndpoints.book.updateBook.replace(
            ":bookId",
            selectedBook?.id,
          ),
          data,
        );
        setError(null);
        reset();
        console.info("RESPONSE", response);
        await mutate([catalogInventoryEndpoints.book.listBooks]);
        openDialog.onFalse();
      }
    } catch (ex) {
      console.error(ex);
      setError(ex);
    }
  });

  useEffect(() => {
    methods.reset({
      title: selectedBook?.title ?? "",

      authors: selectedBook?.authors ?? "",

      isbn: selectedBook?.isbn ?? "",

      synopsis: selectedBook?.synopsis ?? "",

      genres: selectedBook?.genres ?? "",

      publicationDate: selectedBook?.publicationDate ?? "",

      language: selectedBook?.language ?? "",

      publisher: selectedBook?.publisher ?? "",

      coverImageUrl: selectedBook?.coverImageUrl ?? "",
    });
  }, [selectedBook]);

  if (!selectedBook) return null;

  return (
    <Dialog open={openDialog.value} maxWidth="md">
      <DialogTitle>Update Book</DialogTitle>

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
                : "An error occurred while creating the book."}
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
