import { Box, Typography, Paper, Stack } from '@mui/material';

const QuestionNavigation = ({ questions, currentIndex, onSelectQuestion, answers }:any) => {
  const getQuestionStatus = (index: number, questionId: string) => {
    if (index === currentIndex) return 'current';
    if (answers[questionId]) return 'answered';
    return 'unanswered';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'current':
        return '#5e6ad2';
      case 'answered':
        return '#4caf50';
      default:
        return 'rgba(14, 16, 21, 0.2)';
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: '#e8e9ed',
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
          color: '#0e1015',
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
                backgroundColor: isCurrent ? 'rgba(94, 106, 210, 0.1)' : 'transparent',
                border: '1px solid',
                borderColor: isCurrent ? '#5e6ad2' : 'transparent',
                '&:hover': {
                  backgroundColor: 'rgba(94, 106, 210, 0.05)',
                },
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: '#0e1015',
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
