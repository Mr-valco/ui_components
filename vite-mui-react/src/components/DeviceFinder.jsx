import React, { useState } from "react";
import { TextField, Button, Container, Typography, CircularProgress } from "@mui/material";
import { MaterialReactTable } from "material-react-table";

// Validation regex for IP and MAC address
const ipRegex = /^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}$/;
const macRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;

const DeviceFinder = () => {
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle input change
  const handleChange = (event) => {
    setInput(event.target.value);
    setError(""); // Clear error when user types
  };

  // Handle form submission
  const handleFind = async () => {
    if (!ipRegex.test(input) && !macRegex.test(input)) {
      setError("Enter a valid IP or MAC address");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/find-device?query=${input}`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch data");
      }

      setData(result.devices || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Define table columns
  const columns = [
    { accessorKey: "id", header: "Device ID" },
    { accessorKey: "ip", header: "IP Address" },
    { accessorKey: "mac", header: "MAC Address" },
    { accessorKey: "hostname", header: "Hostname" },
    { accessorKey: "location", header: "Location" },
  ];

  return (
    <Container maxWidth="sm" style={{ marginTop: "20px" }}>
      <Typography variant="h5" gutterBottom>
        Find Device Details
      </Typography>
      
      <TextField
        label="IP / MAC Address"
        variant="outlined"
        fullWidth
        value={input}
        onChange={handleChange}
        error={!!error}
        helperText={error}
        style={{ marginBottom: "10px" }}
      />
      
      <Button
        variant="contained"
        color="primary"
        onClick={handleFind}
        disabled={loading}
        fullWidth
      >
        {loading ? <CircularProgress size={24} /> : "Find"}
      </Button>

      {data.length > 0 && (
        <MaterialReactTable columns={columns} data={data} />
      )}
    </Container>
  );
};

export default DeviceFinder;

/* API Response Format
{
  "devices": [
    {
      "id": "12345",
      "ip": "192.168.1.10",
      "mac": "AA:BB:CC:DD:EE:FF",
      "hostname": "Device-1",
      "location": "Server Room"
    }
  ]
}

*/