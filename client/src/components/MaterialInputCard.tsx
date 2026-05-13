import {
  Typography,
  TextareaAutosize,
  Button,
  Paper,
  Stack,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const MaterialInputCard = ({ text, setText, handleSubmit }:any) => {
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
        backgroundColor: '#e8e9ed',
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: 600,
          mb: 1,
          color: '#0e1015',
        }}
      >
        Master a new topic
      </Typography>
      
      <Typography
        variant="body2"
        sx={{
          color: '#0e1015',
          opacity: 0.7,
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
          border: '1px solid #ccc',
          borderRadius: '8px',
          resize: 'vertical',
          marginBottom: '16px',
          backgroundColor: '#ffffff',
          color: '#0e1015',
          overflow: 'hidden',
        }}
      />

      <Stack direction="row" spacing={2} sx={{ alignItems: 'center', mb: 3 }}>
        <Button
          variant="outlined"
          startIcon={<CloudUploadIcon />}
          onClick={handleFileImport}
          sx={{
            textTransform: 'none',
            borderRadius: 2,
            borderColor: '#5e6ad2',
            color: '#5e6ad2',
            '&:hover': {
              borderColor: '#5e6ad2',
              backgroundColor: 'rgba(94, 106, 210, 0.04)',
            },
          }}
        >
          Import from device
        </Button>
        
        <Typography
          variant="caption"
          sx={{
            color: '#0e1015',
            opacity: 0.6,
            fontSize: '12px',
          }}
        >
          Supports PDF, DOCX, TXT, MD
        </Typography>
      </Stack>

      <Button
        fullWidth
        variant="contained"
        onClick={handleSubmit}
        sx={{
          textTransform: 'none',
          borderRadius: 2,
          py: 1.5,
          backgroundColor: '#5e6ad2', // primary purple
          color: '#ffffff', // white text
          fontWeight: 600,
          '&:hover': {
            backgroundColor: '#4a56b8', // slightly darker purple on hover
          },
        }}
      >
        Generate Test
      </Button>
    </Paper>
  );
};

export default MaterialInputCard;
