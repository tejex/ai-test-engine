import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Stack,
  Chip,
} from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';

const RecentMaterialRow = ({ title, dateText, masteryPercent }:any) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        py: 2,
        px: 2,
        borderBottom: '1px solid',
        borderColor: 'rgba(14, 16, 21, 0.1)',
        '&:last-child': {
          borderBottom: 'none',
        },
      }}
    >
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center', flex: 1 }}>
        <DescriptionIcon sx={{ color: '#5e6ad2', fontSize: 20 }} />
        <Box>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 500,
              color: '#0e1015',
              mb: 0.5,
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: '#0e1015',
              opacity: 0.6,
              fontSize: '11px',
            }}
          >
            {dateText}
          </Typography>
        </Box>
      </Stack>
      
      <Chip
        label={`${masteryPercent}% Mastery`}
        size="small"
        sx={{
          backgroundColor: masteryPercent >= 70 ? '#5e6ad2' : 'rgba(94, 106, 210, 0.1)',
          color: masteryPercent >= 70 ? '#ffffff' : '#5e6ad2',
          fontWeight: 500,
          fontSize: '12px',
          borderRadius: 1.5,
        }}
      />
    </Box>
  );
};

const RecentMaterialsSection = () => {
  const recentMaterials = [
    {
      id: 1,
      title: 'Advanced React Patterns.pdf',
      dateText: 'Generated 2 days ago',
      masteryPercent: 78,
    },
    {
      id: 2,
      title: 'System Design Interview Notes',
      dateText: 'Generated last week',
      masteryPercent: 52,
    },
  ];

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography
        variant="subtitle2"
        sx={{
          color: '#e8e9ed',
          fontWeight: 600,
          letterSpacing: '0.5px',
          mb: 2,
          fontSize: '12px',
        }}
      >
        RECENT MATERIALS
      </Typography>
      
      <Paper
        elevation={0}
        sx={{
          backgroundColor: '#e8e9ed',
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        {recentMaterials.map((material) => (
          <RecentMaterialRow
            key={material.id}
            title={material.title}
            dateText={material.dateText}
            masteryPercent={material.masteryPercent}
          />
        ))}
      </Paper>
    </Box>
  );
};

export default RecentMaterialsSection;