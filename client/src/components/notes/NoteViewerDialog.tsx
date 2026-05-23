import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextareaAutosize,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AppButton from '../AppButton';
import { useAppTheme } from '../../styles/ThemeModeProvider';
import { getDialogRows } from './noteUtils';

type NoteViewerDialogProps = {
  note: string;
  noteIndex: number | null;
  onClose: () => void;
  onRemove: (index: number) => void;
  onUpdate: (index: number, value: string) => void;
};

const NoteViewerDialog = ({
  note,
  noteIndex,
  onClose,
  onRemove,
  onUpdate,
}: NoteViewerDialogProps) => {
  const { theme } = useAppTheme();
  const isOpen = noteIndex !== null;

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      slotProps={{
        paper: {
          sx: {
            backgroundColor: theme.surface,
            border: `1px solid ${theme.borderStrong}`,
            borderRadius: 2,
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          color: theme.text,
          fontWeight: 800,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        {noteIndex === null ? 'Attached note' : `Note ${noteIndex + 1}`}
        <IconButton aria-label="Close notes dialog" onClick={onClose} sx={{ color: theme.mutedText }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent
        sx={{
          maxHeight: '68vh',
          overflowY: 'auto',
        }}
      >
        <TextareaAutosize
          minRows={getDialogRows(note)}
          maxRows={18}
          value={note}
          onChange={(event) => {
            if (noteIndex !== null) {
              onUpdate(noteIndex, event.target.value);
            }
          }}
          style={{
            width: '100%',
            padding: '14px',
            fontSize: '14px',
            lineHeight: 1.55,
            fontFamily: 'inherit',
            border: `1px solid ${theme.borderStrong}`,
            borderRadius: '8px',
            resize: 'vertical',
            backgroundColor: theme.field,
            color: theme.text,
            overflowY: 'auto',
          }}
        />
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        {noteIndex !== null && (
          <AppButton
            variant="outlined"
            onClick={() => onRemove(noteIndex)}
            sx={{
              mr: 'auto',
              borderColor: theme.danger,
              color: theme.danger,
              '&:hover': {
                borderColor: theme.danger,
                backgroundColor: theme.dangerSoft,
              },
            }}
          >
            Remove note
          </AppButton>
        )}

        <AppButton
          variant="outlined"
          onClick={onClose}
          sx={{
            borderColor: theme.accent,
            color: theme.accent,
            '&:hover': {
              borderColor: theme.accentHover,
              backgroundColor: theme.accentSoft,
            },
          }}
        >
          Done
        </AppButton>
      </DialogActions>
    </Dialog>
  );
};

export default NoteViewerDialog;
