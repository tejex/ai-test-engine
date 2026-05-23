import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Stack,
  Chip,
  CircularProgress,
} from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useRecentAttempts } from '../hooks/useRecentAttempts';
import { useAppTheme } from '../styles/ThemeModeProvider';

const formatDate = (value: string) =>
  new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value));

type RecentTestRowProps = {
  title: string;
  dateText: string;
  masteryPercent: number;
  onClick: () => void;
};

const RecentTestRow = ({ title, dateText, masteryPercent, onClick }: RecentTestRowProps) => {
  const { theme } = useAppTheme();

  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        py: 2,
        px: 2,
        gap: 2,
        borderBottom: '1px solid',
        borderColor: theme.border,
        cursor: 'pointer',
        transition: 'background-color 160ms ease',
        '&:hover': {
          backgroundColor: theme.accentSoft,
        },
        '&:last-child': {
          borderBottom: 'none',
        },
      }}
    >
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center', flex: 1, minWidth: 0 }}>
        <DescriptionIcon sx={{ color: theme.accent, fontSize: 20 }} />
        <Box sx={{ minWidth: 0 }}>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 500,
              color: theme.text,
              mb: 0.5,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: theme.mutedText,
              fontSize: '11px',
            }}
          >
            {dateText}
          </Typography>
        </Box>
      </Stack>

      <Stack direction="row" spacing={1} sx={{ alignItems: 'center', flexShrink: 0 }}>
        <Chip
          label={`${masteryPercent}%`}
          size="small"
          sx={{
            backgroundColor: masteryPercent >= 70 ? theme.accent : theme.accentSoft,
            color: masteryPercent >= 70 ? '#ffffff' : theme.accent,
            fontWeight: 600,
            fontSize: '12px',
            borderRadius: 1.5,
          }}
        />
        <ArrowForwardIcon sx={{ color: theme.mutedText, fontSize: 18 }} />
      </Stack>
    </Box>
  );
};

type RecentTestsProps = {
  onNavigate?: () => void;
  variant?: 'page' | 'panel';
};

const RecentTests = ({ onNavigate, variant = 'page' }: RecentTestsProps) => {
  const navigate = useNavigate();
  const { theme } = useAppTheme();
  const { attempts, isLoading } = useRecentAttempts({ limit: 3 });

  return (
    <Box sx={{ maxWidth: variant === 'panel' ? 'none' : 600, mx: 'auto', mt: variant === 'panel' ? 0 : 4 }}>
      <Typography
        variant="subtitle2"
        sx={{
          color: theme.mutedText,
          fontWeight: 600,
          letterSpacing: '0.5px',
          mb: 2,
          fontSize: '12px',
        }}
      >
        RECENT TESTS
      </Typography>
      
      <Paper
        elevation={0}
        sx={{
          backgroundColor: theme.surface,
          border: `1px solid ${theme.borderStrong}`,
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
            <CircularProgress size={22} sx={{ color: theme.accent }} />
          </Box>
        ) : attempts.length === 0 ? (
          <Box sx={{ px: 2, py: 3 }}>
            <Typography
              variant="body2"
              sx={{
                color: theme.mutedText,
                textAlign: 'center',
              }}
            >
              Finished tests will appear here.
            </Typography>
          </Box>
        ) : (
          attempts.map((attempt) => (
            <RecentTestRow
              key={attempt.id}
              title={attempt.test?.document?.title || 'Untitled exam'}
              dateText={`Completed ${formatDate(attempt.createdAt)}`}
              masteryPercent={Math.round(attempt.score * 100)}
              onClick={() => {
                navigate(`/results/${attempt.id}`);
                onNavigate?.();
              }}
            />
          ))
        )}
      </Paper>
    </Box>
  );
};

export default RecentTests;
