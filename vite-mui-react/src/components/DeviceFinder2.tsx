import React, { useState } from "react";
import { TextField, Button, Container, Typography, CircularProgress } from "@mui/material";
import { MaterialReactTable } from "material-react-table";
import { CIDR } from "cidr.ts"; // Import CIDR library
import { useQuery } from "@tanstack/react-query"; // Import useQuery

// Custom function for MAC address validation (since cidr.ts doesn't handle MAC addresses)
const isValidMAC = (mac: string): boolean => {
  const macRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
  return macRegex.test(mac);
};

// Replace fetch with your custom API function
const findDevice = async (input: string) => {
  // This is where you'd use your API service, e.g., axios or your backend
  // For demonstration purposes, it's mocked as an API call returning dummy data.
  // Here we mock the data response:
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (input === "192.168.1.0/24" || isValidMAC(input)) {
        resolve([
          {
            id: 1,
            ip: "192.168.1.0",
            mac: "00:14:22:01:23:45",
            hostname: "Device A",
            location: "Room 101",
          },
          {
            id: 2,
            ip: "192.168.1.1",
            mac: "00:14:22:01:23:46",
            hostname: "Device B",
            location: "Room 102",
          },
        ]);
      } else {
        reject("No devices found.");
      }
    }, 2000); // Mock delay
  });
};

const DeviceFinder = () => {
  const [input, setInput] = useState<string>("");
  const [error, setError] = useState<string>("");

  // Handle input change
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
    setError(""); // Clear error when user types
  };

  // Using useQuery to fetch device data
  const { data, isLoading, isError, error: queryError } = useQuery(
    ['find-device', input],
    () => findDevice(input),
    {
      enabled: !!input && (CIDR.isCIDR(input) || isValidMAC(input)), // Only fetch if input is valid
      refetchOnWindowFocus: false, // Disable refetch on window focus (optional)
      retry: false, // Optionally, disable retries on failure
    }
  );

  // Handle form submission
  const handleFind = () => {
    if (!CIDR.isCIDR(input) && !isValidMAC(input)) {
      setError("Enter a valid IP (CIDR) or MAC address");
      return;
    }

    setError("");  // Clear any existing error message
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
        disabled={isLoading || !input}
        fullWidth
      >
        {isLoading ? <CircularProgress size={24} /> : "Find"}
      </Button>

      {isError && (
        <Typography color="error" style={{ marginTop: "10px" }}>
          {queryError instanceof Error ? queryError.message : "An error occurred"}
        </Typography>
      )}

      {data && data.length > 0 && (
        <MaterialReactTable columns={columns} data={data} />
      )}
    </Container>
  );
};

export default DeviceFinder;
