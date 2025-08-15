import * as React from 'react';
import {
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Grid,
  Box,
} from '@mui/material';

const notes = [
  { id: 1, title: 'Meeting with Acme Inc.', content: 'Discussed the new project requirements and timeline.' },
  { id: 2, title: 'Follow up with Stark Industries', content: 'Need to send the proposal by EOD Friday.' },
  { id: 3, title: 'Brainstorming session', content: 'New ideas for the Q4 marketing campaign.' },
];

export default function NotesPage() {
  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" gutterBottom>
          Notes
        </Typography>
        <Button variant="contained">Add Note</Button>
      </Box>
      <Grid container spacing={3}>
        {notes.map((note) => (
          <Grid item xs={12} sm={6} md={4} key={note.id}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  {note.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {note.content}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
