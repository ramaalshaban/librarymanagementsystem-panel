import * as zod from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Divider from "@mui/material/Divider";
import { useTheme } from "@mui/material/styles";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Box,
  Chip,
  Link,
  Table,
  Paper,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  ToggleButton,
  TableContainer,
  ToggleButtonGroup,
} from "@mui/material";

import { Form, Field } from "../../../../components/hook-form";
import { JsonResponse } from "../../../../components/json-response";
import { TableResponse } from "../../../../components/table-response";
import catalogInventoryAxios, {
  catalogInventoryEndpoints,
} from "../../../../lib/catalogInventory-axios.js";

const requestParams = [
  { name: "title", value: "", type: "String" },

  { name: "authors", value: "", type: "String" },

  { name: "isbn", value: "", type: "String" },

  { name: "synopsis", value: "", type: "Text" },

  { name: "genres", value: "", type: "String" },

  { name: "publicationDate", value: "", type: "Date" },

  { name: "language", value: "", type: "String" },

  { name: "publisher", value: "", type: "String" },

  { name: "coverImageUrl", value: "", type: "String" },
];

const BookSchema = zod.object({
  title: zod.string().min(1, { message: "title is required" }),

  authors: zod.string().min(1, { message: "authors is required" }),

  isbn: zod.string().nullable(),

  synopsis: zod.string().nullable(),

  genres: zod.string().nullable(),

  publicationDate: zod.string().nullable(),

  language: zod.string().nullable(),

  publisher: zod.string().nullable(),

  coverImageUrl: zod.string().nullable(),
});

export default function CatalogInventoryCreateBookApiPage() {
  const [view, setView] = useState("Table");
  const [createdBook, setCreatedBook] = useState(null);
  const [error, setError] = useState(null);

  const theme = useTheme();

  const defaultValues = {
    title: "",

    authors: "",

    isbn: "",

    synopsis: "",

    genres: "",

    publicationDate: "",

    language: "",

    publisher: "",

    coverImageUrl: "",
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

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await catalogInventoryAxios.post(
        catalogInventoryEndpoints.book.createBook,
        data,
      );
      setError(null);
      setCreatedBook(null);
      reset();
      console.info("RESPONSE", response);
      setCreatedBook(response.data.book);
    } catch (ex) {
      console.error(ex);
      setError(ex);
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Box marginY="2rem">
        <Typography variant="h4" marginBottom="1.5rem">
          CREATE
        </Typography>

        <TableContainer component={Paper} sx={{ mb: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell width="30%">
                  <Typography variant="body1" fontWeight="bold">
                    Property Name
                  </Typography>
                </TableCell>
                <TableCell width="70%">
                  <Typography variant="body1" fontWeight="bold">
                    Property Value
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requestParams.map((row) => (
                <TableRow key={row.name}>
                  <TableCell sx={{ backgroundColor: theme.palette.grey[100] }}>
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
        <Box display="flex" justifyContent="flex-end" gap={2}>
          <Link component="button" underline="always" onClick={() => reset()}>
            Cancel
          </Link>
          <LoadingButton
            type="submit"
            variant="contained"
            size="large"
            loading={isSubmitting}
          >
            Save
          </LoadingButton>
        </Box>
      </Box>
      <Divider />
      {(createdBook || error) && (
        <Box paddingTop="2rem">
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="subtitle1">
              STATUS:{" "}
              <Typography
                component="span"
                variant="subtitle1"
                color={error ? "error" : "success"}
                display="inline"
              >
                {error ? (error.status ?? "500") : "201"}
              </Typography>
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
              <ToggleButtonGroup
                color="standard"
                value={view}
                exclusive
                onChange={(_, val) => val && setView(val)}
              >
                <ToggleButton value="Table" sx={{ paddingX: "2rem" }}>
                  Table
                </ToggleButton>
                <ToggleButton value="JSON" sx={{ paddingX: "2rem" }}>
                  JSON
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </Box>
          <Box>
            {view === "Table" ? (
              <TableResponse content={createdBook} error={error} />
            ) : (
              <JsonResponse content={createdBook || error} />
            )}
          </Box>
        </Box>
      )}
    </Form>
  );
}
