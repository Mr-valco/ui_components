import React from 'react';
import { Card, Typography, Box, IconButton } from '@mui/material';
import RouterIcon from '@mui/icons-material/Router';

interface KPICardProps {
  title: string;
  kpi: string;
  subtitle: string;
  icon?: React.ReactNode; // optional icon, defaults to DashboardIcon if not provided
  backgroundImageUrl?: string; // optional URL for the background image
}

const KPICard: React.FC<KPICardProps> = ({
  title,
  kpi,
  subtitle,
  icon = <RouterIcon sx={{height: 100, width: 100, zIndex:2}} />,
  backgroundImageUrl = 'https://picsum.photos/200/300?random=1', // default background image URL
}) => {
  return (
    <Card
      sx={{
        display: 'flex',
        background: 'linear-gradient(to right, #f0f0f0, #ffffff)', // Main gradient (light grey to white)
        borderRadius: 2,
        boxShadow: 3,
        height: 100, // Adjust card height if needed
        padding: 2,
        position: 'relative', // Positioning context for absolute positioning
        overflow: 'hidden', // Prevent the background image from overflowing the card's boundaries
      }}
    >
      {/* Background Image and Gradient Overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 100, // Size of the background image
          height: 100, // Size of the background image
          backgroundImage: `url(${backgroundImageUrl}), linear-gradient(to top left, rgba(255, 255, 255, 0.8), transparent)`, // Add gradient overlay
          backgroundSize: 'cover',
          backgroundPosition: 'top right',
          zIndex: 1, // Place the background image behind the content
          opacity: 0.5, // Makes the background image barely visible
        }}
      />

      {/* Left side content */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start', // Align left side content to the left
          paddingLeft: 1, // Optional padding for spacing
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
          {title}
        </Typography>
        <Typography variant="h4" sx={{ fontSize: 32, fontWeight: 'bold' }}>
          {kpi}
        </Typography>
        <Typography variant="body2" sx={{ color: 'gray' }}>
          {subtitle}
        </Typography>
      </Box>

      {/* Right side content (Icon) */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingLeft: 2,
        }}
      >
        <IconButton>{icon}</IconButton>
      </Box>
    </Card>
  );
};

export default KPICard;
