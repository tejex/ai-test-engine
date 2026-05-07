import {
  Box,
  Typography,
  TextareaAutosize,
  Button,
  Paper,
  Stack,
  Chip,
  Divider,
} from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';


const RecentMaterialRow = ({ title, dateText, masteryPercent }: any) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        py: 2,
        borderBottom: '1px solid',
        borderColor: '#f0f0f0',
        '&:last-child': {
          borderBottom: 'none',
        },
      }}
    >
    <Stack direction="row" spacing={2} sx={{ alignItems: 'center', mb: 3 }}>
        <DescriptionIcon sx={{ color: '#999', fontSize: 20 }} />
        <Box>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 500,
              color: '#1a1a1a',
              mb: 0.5,
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: '#999',
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
          backgroundColor: masteryPercent >= 70 ? '#e8f5e9' : '#fff3e0',
          color: masteryPercent >= 70 ? '#2e7d32' : '#ed6c02',
          fontWeight: 500,
          fontSize: '12px',
          borderRadius: 1.5,
        }}
      />
    </Box>
  );
};

export default RecentMaterialRow