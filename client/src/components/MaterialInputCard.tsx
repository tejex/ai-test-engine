import {
  Typography,
  TextareaAutosize,
  Paper,
  Stack,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AppButton from './AppButton';
import { useAppTheme } from '../styles/ThemeModeProvider';

const MaterialInputCard = ({ text, setText, handleSubmit }:any) => {
  const { theme } = useAppTheme();

  const handleFileImport = () => {
    console.log('Import file clicked');
  };

  return (
    <Paper
      elevation={0}
      sx={{
        maxWidth: 600,
        mx: 'auto',
        p: 3,
        borderRadius: 2,
        backgroundColor: theme.surface,
        border: `1px solid ${theme.borderStrong}`,
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: 600,
          mb: 1,
          color: theme.text,
        }}
      >
        Master a new topic
      </Typography>
      
      <Typography
        variant="body2"
        sx={{
          color: theme.subtleText,
          mb: 3,
          lineHeight: 1.5,
        }}
      >
        Paste your study material or import a document. TestFlow AI will generate a customized test to evaluate and improve your knowledge.
      </Typography>

      <TextareaAutosize
        minRows={6}
        placeholder="Paste your notes, syllabus, or concepts here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          width: '90%',
          padding: '12px',
          fontSize: '14px',
          fontFamily: 'inherit',
          border: `1px solid ${theme.borderStrong}`,
          borderRadius: '8px',
          resize: 'vertical',
          marginBottom: '16px',
          backgroundColor: theme.field,
          color: theme.text,
          overflow: 'hidden',
        }}
      />

      <Stack direction="row" spacing={2} sx={{ alignItems: 'center', mb: 3 }}>
        <AppButton
          variant="outlined"
          startIcon={<CloudUploadIcon />}
          onClick={handleFileImport}
          sx={{
            borderColor: theme.accent,
            color: theme.accent,
            '&:hover': {
              borderColor: theme.accent,
              backgroundColor: theme.accentSoft,
            },
          }}
        >
          Import from device
        </AppButton>
        
        <Typography
          variant="caption"
          sx={{
            color: theme.mutedText,
            fontSize: '12px',
          }}
        >
          Supports PDF, DOCX, TXT, MD
        </Typography>
      </Stack>

      <AppButton
        fullWidth
        variant="contained"
        onClick={handleSubmit}
        sx={{
          py: 1.5,
          backgroundColor: theme.accent,
          color: '#ffffff', // white text
          fontWeight: 600,
          '&:hover': {
            backgroundColor: theme.accentHover,
          },
        }}
      >
        Generate Test
      </AppButton>
    </Paper>
  );
};

export default MaterialInputCard;
