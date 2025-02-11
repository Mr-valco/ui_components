import React, { useState } from "react";
import { Card, CardContent, FormGroup, FormControlLabel, Checkbox, Button, Typography } from "@mui/material";
import { MaterialReactTable } from "material-react-table";

const checkBoxFields = ["Name", "Location", "Device Type", "IP"];

const ReportBuilder = () => {
  const [selectedFields, setSelectedFields] = useState({
    Pulse: {},
    "Logic Monitor": {},
    "Forward Network": {},
  });

  const [tableData, setTableData] = useState([]);
  const [columns, setColumns] = useState([]);

  const handleCheckboxChange = (category, field) => {
    setSelectedFields((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: !prev[category][field],
      },
    }));
  };

  const handleGenerateTable = () => {
    const selectedColumns = new Set();
    Object.values(selectedFields).forEach((fields) => {
      Object.keys(fields).forEach((field) => {
        if (fields[field]) {
          selectedColumns.add(field);
        }
      });
    });

    const columnDefs = Array.from(selectedColumns).map((col) => ({
      accessorKey: col.toLowerCase().replace(/\s+/g, "_"),
      header: col,
    }));

    setColumns(columnDefs);

    // Sample Data
    setTableData([
      { name: "Device 1", location: "New York", device_type: "Router", ip: "192.168.1.1" },
      { name: "Device 2", location: "Los Angeles", device_type: "Switch", ip: "192.168.1.2" },
    ]);
  };

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", gap: 20, justifyContent: "center" }}>
        {["Pulse", "Logic Monitor", "Forward Network"].map((category) => (
          <Card key={category} style={{ width: 250 }}>
            <CardContent>
              <Typography variant="h6">{category}</Typography>
              <FormGroup>
                {checkBoxFields.map((field) => (
                  <FormControlLabel
                    key={field}
                    control={
                      <Checkbox
                        checked={selectedFields[category][field] || false}
                        onChange={() => handleCheckboxChange(category, field)}
                      />
                    }
                    label={field}
                  />
                ))}
              </FormGroup>
            </CardContent>
          </Card>
        ))}
      </div>

      <div style={{ marginTop: 20, textAlign: "center" }}>
        <Button variant="contained" color="primary" onClick={handleGenerateTable}>
          Generate
        </Button>
      </div>

      {columns.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <MaterialReactTable columns={columns} data={tableData} />
        </div>
      )}
    </div>
  );
};

export default ReportBuilder;
