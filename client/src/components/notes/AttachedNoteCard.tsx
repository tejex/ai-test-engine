import { Box, IconButton, Paper, Stack, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DescriptionIcon from '@mui/icons-material/Description';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import AppButton from '../AppButton';
import { useAppTheme } from '../../styles/ThemeModeProvider';
import { getNotePreview, getWordCount } from './noteUtils';

type AttachedNoteCardProps = {
  note: string;
  noteNumber: number;
  onOpen: () => void;
  onRemove: () => void;
};

const AttachedNoteCard = ({ note, noteNumber, onOpen, onRemove }: AttachedNoteCardProps) => {
  const { theme } = useAppTheme();

  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: theme.panel,
        border: `1px solid ${theme.borderStrong}`,
        borderRadius: 2,
        p: 1.5,
        minHeight: 150,
      }}
    >
      <Stack spacing={1.25} sx={{ height: '100%' }}>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'flex-start' }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: 2,
              backgroundColor: theme.accentSoft,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <DescriptionIcon sx={{ color: theme.accent, fontSize: 18 }} />
          </Box>

          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography sx={{ color: theme.text, fontWeight: 700, fontSize: 14 }}>
              Note {noteNumber}
            </Typography>
            <Typography sx={{ color: theme.mutedText, fontSize: 12 }}>
              {getWordCount(note)} words
            </Typography>
          </Box>

          <IconButton
            aria-label={`Remove note ${noteNumber}`}
            onClick={onRemove}
            sx={{
              color: theme.mutedText,
              p: 0.5,
            }}
          >
            <CloseIcon sx={{ fontSize: 17 }} />
          </IconButton>
        </Stack>

        <Typography
          component="pre"
          sx={{
            color: theme.mutedText,
            fontFamily: 'inherit',
            fontSize: 12,
            lineHeight: 1.45,
            whiteSpace: 'pre-wrap',
            m: 0,
            maxHeight: 64,
            overflow: 'hidden',
            flex: 1,
          }}
        >
          {getNotePreview(note)}
        </Typography>

        <AppButton
          variant="outlined"
          startIcon={<OpenInFullIcon />}
          onClick={onOpen}
          sx={{
            alignSelf: 'flex-start',
            borderColor: theme.borderStrong,
            color: theme.text,
            '&:hover': {
              borderColor: theme.accent,
              backgroundColor: theme.accentSoft,
            },
          }}
        >
          Open note
        </AppButton>
      </Stack>
    </Paper>
  );
};

export default AttachedNoteCard;
