import React, { useEffect, useState } from "react";
import axios from "../../../../api/axios";
import { Box, Card, CardContent, CardHeader } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const URL = "./notifications/getNotifications";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(URL);

        const data = response?.data?.data || [];

        if (data.length) {
          const dynamicCols = generateColumns(data[0]);
          setColumns(dynamicCols);
          setNotifications(data);
        } else {
          setColumns([]);
          setNotifications([]);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  // Dynamically generate columns with custom rendering for 'status'
  const generateColumns  = (rowSample) => {
  if (!rowSample.hasOwnProperty('message')) return [];

  return [
    {
      field: 'message',
      headerName: 'Message',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    }
  ];
};

  return (
    <Box sx={{ mt: 5, px: 2 }}>
      <Card elevation={3}>
        <CardHeader
          title="Notifications"
          sx={{
            backgroundColor: "#f5f5f5",
            borderBottom: "1px solid #ddd",
            fontWeight: "bold",
          }}
        />
        <CardContent>
          <DataGrid
            rows={notifications}
            columns={columns}
            pageSize={10}
            autoHeight
            loading={loading}
            getRowId={(row) =>
              row.id || row._id || row.message || Math.random()
            }
            sx={{
              "& .MuiDataGrid-columnHeaders": {
                fontWeight: "bold",
                fontSize: "1rem",
                color: "black",
                justifyContent: "center",
              },
              "& .MuiDataGrid-columnHeaderTitle": {
                fontWeight: "bold",
                textAlign: "center",
                width: "100%",
              },
            }}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default NotificationsPage;
