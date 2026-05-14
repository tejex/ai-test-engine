import { Box, Typography, Paper, Stack } from '@mui/material';
import { useAppTheme } from '../styles/ThemeModeProvider';

const QuestionNavigation = ({ questions, currentIndex, onSelectQuestion, answers }:any) => {
  const { theme } = useAppTheme();

  const getQuestionStatus = (index: number, questionId: string) => {
    if (index === currentIndex) return 'current';
    if (answers[questionId]) return 'answered';
    return 'unanswered';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'current':
        return theme.accent;
      case 'answered':
        return '#4caf50';
      default:
        return theme.borderStrong;
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: theme.surface,
        border: `1px solid ${theme.borderStrong}`,
        borderRadius: 2,
        p: 3,
        position: 'sticky',
        top: 16,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          color: theme.text,
          mb: 2,
        }}
      >
        QUESTIONS
      </Typography>

      <Stack spacing={1.5}>
        {questions.map((question: any, idx:any) => {
          const status = getQuestionStatus(idx, question.id);
          const isCurrent = status === 'current';
          
          return (
            <Box
              key={idx}
              onClick={() => onSelectQuestion(idx)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: 1.5,
                borderRadius: 1.5,
                cursor: 'pointer',
                backgroundColor: isCurrent ? theme.accentSoft : 'transparent',
                border: '1px solid',
                borderColor: isCurrent ? theme.accent : 'transparent',
                '&:hover': {
                  backgroundColor: theme.accentSoft,
                },
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: theme.text,
                  fontWeight: isCurrent ? 600 : 400,
                }}
              >
                {idx + 1}. Question {idx + 1}
              </Typography>
              
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: getStatusColor(status),
                }}
              />
            </Box>
          );
        })}
      </Stack>
    </Paper>
  );
};

export default QuestionNavigation;
