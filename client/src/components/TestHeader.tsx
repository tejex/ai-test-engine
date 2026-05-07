import { Box, Typography, Paper, LinearProgress } from '@mui/material';

const TestHeader = ({ overallMastery = 78 }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: '#e8e9ed',
        borderRadius: 2,
        p: 3,
        mb: 3,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            color: '#0e1015',
          }}
        >
          TestFlow AI
        </Typography>
        
        <Box sx={{ textAlign: 'right' }}>
          <Typography
            variant="body2"
            sx={{
              color: '#0e1015',
              opacity: 0.7,
              mb: 0.5,
            }}
          >
            Overall Mastery
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: '#5e6ad2',
            }}
          >
            {overallMastery}%
          </Typography>
        </Box>
      </Box>
      
      <LinearProgress
        variant="determinate"
        value={overallMastery}
        sx={{
          height: 8,
          borderRadius: 4,
          backgroundColor: 'rgba(94, 106, 210, 0.1)',
          '& .MuiLinearProgress-bar': {
            backgroundColor: '#5e6ad2',
            borderRadius: 4,
          },
        }}
      />
    </Paper>
  );
};

export default TestHeader;