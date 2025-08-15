import * as React from 'react';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const summaryData = [
  { title: 'Clients', value: '1,234' },
  { title: 'Leads', value: '567' },
  { title: 'Tasks Due', value: '89' },
  { title: 'Notes', value: '1,012' },
];

const chartData = [
  { name: 'Jan', leads: 400, clients: 240 },
  { name: 'Feb', leads: 300, clients: 139 },
  { name: 'Mar', leads: 200, clients: 980 },
  { name: 'Apr', leads: 278, clients: 390 },
  { name: 'May', leads: 189, clients: 480 },
  { name: 'Jun', leads: 239, clients: 380 },
  { name: 'Jul', leads: 349, clients: 430 },
];

export default function DashboardPage() {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Dashboard Overview
      </Typography>
      <Grid container spacing={3}>
        {summaryData.map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item.title}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  {item.title}
                </Typography>
                <Typography variant="h5">
                  {item.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Leads vs Clients
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="leads" fill="#8884d8" />
                  <Bar dataKey="clients" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
