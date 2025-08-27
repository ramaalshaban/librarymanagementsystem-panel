import { useState } from "react";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import {
  Button,
  TextField,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

import { useCatalogInventoryGetBook } from "src/actions/catalogInventory";

import { JsonResponse } from "../../../../components/json-response";
import { TableResponse } from "../../../../components/table-response";

export default function CatalogInventoryGetBookApiPage() {
  const [view, setView] = useState("Table");

  const [inputBookId, setInputBookId] = useState("");
  const [submittedBookId, setSubmittedBookId] = useState(null);

  const { book, bookLoading, bookError } =
    useCatalogInventoryGetBook(submittedBookId);

  const handleGetBook = () => {
    setSubmittedBookId(inputBookId);
  };

  return (
    <>
      <Box marginY="2rem">
        <Typography variant="h4" marginBottom="1.5rem">
          GET
        </Typography>

        <Box component="div" gap="1rem" display="flex" key="0">
          <Box minWidth="35%">
            <TextField
              size="small"
              variant="outlined"
              fullWidth
              label="bookId"
              value={inputBookId}
              onChange={(e) => setInputBookId(e.target.value)}
            />
          </Box>
          <Button
            variant="outlined"
            onClick={handleGetBook}
            disabled={!inputBookId || bookLoading}
          >
            GET
          </Button>
        </Box>
      </Box>

      <Divider />

      {!bookLoading && (bookError || book) && (
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
                color={bookError ? "error" : "success"}
                display="inline"
              >
                {bookError ? bookError.status : "200"}
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
              <TableResponse content={book} error={bookError} />
            ) : (
              <JsonResponse content={book || bookError} />
            )}
          </Box>
        </Box>
      )}
    </>
  );
}
