import * as React from 'react';
import {
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from '@mui/material';

function createData(id, title, dueDate, priority, assignedTo) {
  return { id, title, dueDate, priority, assignedTo };
}

const rows = [
  createData(1, 'Follow up with client', '2024-08-20', 'High', 'John Doe'),
  createData(2, 'Prepare presentation', '2024-08-22', 'Medium', 'Jane Smith'),
  createData(3, 'Send invoices', '2024-08-25', 'Low', 'Sam Wilson'),
];

export default function TasksPage() {
  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" gutterBottom>
          Tasks
        </Typography>
        <Button variant="contained">Add Task</Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Assigned To</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell>{row.dueDate}</TableCell>
                <TableCell>{row.priority}</TableCell>
                <TableCell>{row.assignedTo}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
