import { Box, Typography, Paper, LinearProgress } from '@mui/material';
import { useAppTheme } from '../styles/ThemeModeProvider';

const TestHeader = ({ overallMastery = 78 }) => {
  const { theme } = useAppTheme();

  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: theme.surface,
        border: `1px solid ${theme.borderStrong}`,
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
            color: theme.text,
          }}
        >
          TestFlow AI
        </Typography>
        
        <Box sx={{ textAlign: 'right' }}>
          <Typography
            variant="body2"
            sx={{
              color: theme.mutedText,
              mb: 0.5,
            }}
          >
            Overall Mastery
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: theme.accent,
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
          backgroundColor: theme.accentSoft,
          '& .MuiLinearProgress-bar': {
            backgroundColor: theme.accent,
            borderRadius: 4,
          },
        }}
      />
    </Paper>
  );
};

export default TestHeader;
