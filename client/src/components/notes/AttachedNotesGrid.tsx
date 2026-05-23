import { Box, Typography } from '@mui/material';
import { useAppTheme } from '../../styles/ThemeModeProvider';
import AttachedNoteCard from './AttachedNoteCard';

type AttachedNotesGridProps = {
  notes: string[];
  onOpenNote: (index: number) => void;
  onRemoveNote: (index: number) => void;
};

const AttachedNotesGrid = ({ notes, onOpenNote, onRemoveNote }: AttachedNotesGridProps) => {
  const { theme } = useAppTheme();

  if (!notes.length) {
    return null;
  }

  return (
    <Box sx={{ mb: 3 }}>
      <Typography
        variant="subtitle2"
        sx={{
          color: theme.mutedText,
          fontWeight: 700,
          letterSpacing: 0.5,
          mb: 1.25,
          fontSize: 12,
        }}
      >
        ATTACHED NOTES
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, minmax(0, 1fr))',
          },
          gap: 1.5,
          maxHeight: 250,
          overflowY: 'auto',
          pr: 0.5,
        }}
      >
        {notes.map((note, index) => (
          <AttachedNoteCard
            key={`${index}-${note.slice(0, 16)}`}
            note={note}
            noteNumber={index + 1}
            onOpen={() => onOpenNote(index)}
            onRemove={() => onRemoveNote(index)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default AttachedNotesGrid;
