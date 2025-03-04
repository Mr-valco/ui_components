import React, { useState, useEffect } from "react";
import { Card, CardContent, FormControlLabel, Checkbox, Button, TextField, Grid2, Container, Box } from "@mui/material";
import { MaterialReactTable} from "material-react-table";
//import axios from "axios";

const dataSources = ["Service-Now", "Logic Monitor", "Forward Network", "DNSGrid", "NetMRI"];

const mockData = {
  "Service-Now": [
    { sys_id: "001", name: "Router-1", location: "NYC", ip_address: "192.168.1.1", model_id: "ISR4451", serial_number: "SN12345", vendor: "Cisco" },
    { sys_id: "002", name: "Switch-1", location: "LA", ip_address: "192.168.1.2", model_id: "Catalyst9300", serial_number: "SN67890", vendor: "Cisco" }
  ],
  "Logic Monitor": [
    { id: "LM001", name: "Router-1", ip: "192.168.1.1", category: "Router", serial: "SN12345", manufacturer: "Cisco" },
    { id: "LM002", name: "Firewall-1", ip: "192.168.2.1", category: "Firewall", serial: "SN11111", manufacturer: "Palo Alto" }
  ],
  "Forward Network": [
    { uuid: "FN001", device_name: "Switch-1", ip_addr: "192.168.1.2", type: "Switch", serial_no: "SN67890", brand: "Cisco" },
    { uuid: "FN002", device_name: "Firewall-1", ip_addr: "192.168.2.1", type: "Firewall", serial_no: "SN11111", brand: "Palo Alto" }
  ],
  "DNSGrid": [
    { asset_id: "DG001", hostname: "Router-1", ip: "192.168.1.1", device_type: "Router", sn: "SN12345", vendor: "Cisco" },
    { asset_id: "DG002", hostname: "Switch-1", ip: "192.168.1.2", device_type: "Switch", sn: "SN67890", vendor: "Cisco" }
  ],
  "NetMRI": [
    { device_id: "NM001", device_name: "Router-1", ip_address: "192.168.1.1", category: "Router", serial: "SN12345", manufacturer: "Cisco" },
    { device_id: "NM002", device_name: "Switch-2", ip_address: "192.168.3.3", category: "Switch", serial: "SN22222", manufacturer: "Juniper" }
  ]
};

const ReportBuilderv3 = () => {
  const [selectedFields, setSelectedFields] = useState({});
  const [serviceNowFilters, setServiceNowFilters] = useState({});
  const [data, setData] = useState(mockData);
  const [comparisonData, setComparisonData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleCheckboxChange = (source, field) => {
    setSelectedFields((prev) => ({
      ...prev,
      [source]: { ...prev[source], [field]: !prev[source]?.[field] },
    }));
  };

  const handleFilterChange = (field, value) => {
    setServiceNowFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleGenerate = () => {
    setComparisonData(data["Service-Now"]);
  };

  return (
    <Container>
      <Grid2 container spacing={3} justifyContent="center" alignItems="center">
        {dataSources.map((source) => (
          <Grid2 item xs={12} sm={6} md={4} key={source} display="flex" justifyContent="center">
            <Card style={{ padding: "16px", width: "100%" }}>
              <CardContent>
                <h3>{source}</h3>
                {source === "Service-Now" && (
                  <div>
                    <TextField label="Filter by Location" onChange={(e) => handleFilterChange("location", e.target.value)} fullWidth />
                    <TextField label="Filter by IP" onChange={(e) => handleFilterChange("ip_address", e.target.value)} fullWidth />
                  </div>
                )}
                <Box display="flex" flexDirection="column">
                  {Object.keys(mockData[source][0] || {}).map((field) => (
                    <FormControlLabel
                      key={field}
                      control={<Checkbox checked={selectedFields[source]?.[field] || false} onChange={() => handleCheckboxChange(source, field)} />}
                      label={field}
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>
      <Grid2 container justifyContent="center" style={{ marginTop: "16px" }}>
        <Button variant="contained" onClick={handleGenerate}>Generate</Button>
      </Grid2>
      {comparisonData.length > 0 && (
        <Grid2 container justifyContent="center" style={{ marginTop: "16px" }}>
          <MaterialReactTable columns={Object.keys(selectedFields).flatMap(source => 
            Object.keys(selectedFields[source] || {}).map(field => 
              selectedFields[source][field] ? { accessorKey: field, header: `${source} - ${field}` } : null
            ).filter(Boolean))} 
            data={comparisonData} 
            isLoading={loading} 
          />
        </Grid2>
      )}
    </Container>
  );
};

export default ReportBuilderv3;
