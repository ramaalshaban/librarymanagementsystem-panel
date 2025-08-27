import Box from "@mui/material/Box";
import {
  Chip,
  Paper,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Typography,
  TableContainer,
} from "@mui/material";

import { useAnalyticsListChangeStreamEvents } from "src/actions/analytics";

export default function AnalyticsListChangeStreamEventsApiPage() {
  const { searchResults: options, searchLoading: loading } =
    useAnalyticsListChangeStreamEvents();

  return (
    <>
      <Box marginY="2rem">
        <Box display="flex" flexDirection="row" gap={3} marginBottom="0">
          <Typography variant="h4">ChangeStreamEvents</Typography>
          <Chip
            variant="contained"
            label="List"
            sx={{
              backgroundColor: "black",
              color: "white",
              borderRadius: "5px",
            }}
          />
        </Box>
      </Box>

      {!loading && options && options.length > 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {Object.keys(options[0]).map((key) => (
                  <TableCell key={key}>
                    <Typography variant="body1" fontWeight="bold">
                      {key}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {options.map((row, index) => (
                <TableRow key={index}>
                  {Object.keys(row).map((key) => (
                    <TableCell key={key}>
                      <span style={{ whiteSpace: "noWrap" }}>{row[key]}</span>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}
