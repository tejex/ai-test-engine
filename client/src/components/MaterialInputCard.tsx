import { useRef, useState } from 'react';
import {
  Typography,
  TextareaAutosize,
  Paper,
} from '@mui/material';
import AppButton from './AppButton';
import AttachedNotesGrid from './notes/AttachedNotesGrid';
import NoteImportActions from './notes/NoteImportActions';
import NoteViewerDialog from './notes/NoteViewerDialog';
import { useAppTheme } from '../styles/ThemeModeProvider';
import {
  extractNoteTextFromFile,
  supportedNoteFileTypes,
} from '../utils/fileTextExtraction';

type MaterialInputCardProps = {
  draftNote: string;
  setDraftNote: (value: string) => void;
  notes: string[];
  setNotes: (notes: string[]) => void;
  handleSubmit: () => void;
  isGenerating?: boolean;
};

const MaterialInputCard = ({
  draftNote,
  setDraftNote,
  notes,
  setNotes,
  handleSubmit,
  isGenerating = false,
}: MaterialInputCardProps) => {
  const { theme } = useAppTheme();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [expandedNoteIndex, setExpandedNoteIndex] = useState<number | null>(null);
  const [isImportingFiles, setIsImportingFiles] = useState(false);
  const [importError, setImportError] = useState('');

  const addNote = (value: string) => {
    const nextNote = value.trim();

    if (!nextNote) {
      return;
    }

    setNotes([...notes, nextNote]);
    setDraftNote('');
  };

  const addNotes = (nextNotes: string[]) => {
    const cleanedNotes = nextNotes.map((note) => note.trim()).filter(Boolean);

    if (!cleanedNotes.length) {
      return;
    }

    setNotes([...notes, ...cleanedNotes]);
    setDraftNote('');
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const pastedText = event.clipboardData.getData('text').trim();

    if (!pastedText) {
      return;
    }

    event.preventDefault();
    addNote(pastedText);
  };

  const handleFileImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);

    if (!files.length) {
      return;
    }

    setIsImportingFiles(true);
    setImportError('');

    try {
      const extractedNotes = await Promise.all(
        files.map(async (file) => {
          const text = await extractNoteTextFromFile(file);
          return text.trim();
        }),
      );

      addNotes(extractedNotes);
    } catch (err) {
      console.error('Failed to import notes', err);
      setImportError('Could not import one of those files. Please try a TXT, PDF, or DOCX file.');
    } finally {
      setIsImportingFiles(false);
      event.target.value = '';
    }
  };

  const updateNote = (index: number, value: string) => {
    setNotes(notes.map((note, noteIndex) => (noteIndex === index ? value : note)));
  };

  const removeNote = (index: number) => {
    setNotes(notes.filter((_, noteIndex) => noteIndex !== index));
    setExpandedNoteIndex(null);
  };

  const hasStudyMaterial = notes.length > 0 || draftNote.trim().length > 0;
  const expandedNote = expandedNoteIndex === null ? '' : notes[expandedNoteIndex] || '';

  return (
    <Paper
      elevation={0}
      sx={{
        maxWidth: 720,
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
        Paste notes to attach them as cards, or type a note and attach it when you are ready.
      </Typography>

      <TextareaAutosize
        minRows={5}
        maxRows={8}
        placeholder="Paste or type a new note here..."
        value={draftNote}
        onPaste={handlePaste}
        onChange={(e) => setDraftNote(e.target.value)}
        style={{
          width: '100%',
          padding: '12px',
          fontSize: '14px',
          fontFamily: 'inherit',
          border: `1px solid ${theme.borderStrong}`,
          borderRadius: '8px',
          resize: 'vertical',
          marginBottom: '12px',
          backgroundColor: theme.field,
          color: theme.text,
          overflowY: 'auto',
        }}
      />

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept={supportedNoteFileTypes}
        onChange={handleFileImport}
        style={{ display: 'none' }}
      />

      <NoteImportActions
        canAttachDraft={Boolean(draftNote.trim())}
        isImportingFiles={isImportingFiles}
        hasAttachedNotes={notes.length > 0}
        onAttachDraft={() => addNote(draftNote)}
        onChooseFiles={() => fileInputRef.current?.click()}
      />

      {importError && (
        <Typography
          variant="body2"
          sx={{
            color: theme.danger,
            mb: 2,
          }}
        >
          {importError}
        </Typography>
      )}

      <AttachedNotesGrid
        notes={notes}
        onOpenNote={setExpandedNoteIndex}
        onRemoveNote={removeNote}
      />

      <AppButton
        fullWidth
        variant="contained"
        disabled={!hasStudyMaterial || isGenerating}
        onClick={handleSubmit}
        sx={{
          py: 1.5,
          backgroundColor: theme.accent,
          color: '#ffffff',
          fontWeight: 600,
          '&:hover': {
            backgroundColor: theme.accentHover,
          },
          '&.Mui-disabled': {
            backgroundColor: theme.border,
            color: theme.mutedText,
          },
        }}
      >
        {isGenerating ? 'Generating...' : 'Generate Test'}
      </AppButton>

      <NoteViewerDialog
        note={expandedNote}
        noteIndex={expandedNoteIndex}
        onClose={() => setExpandedNoteIndex(null)}
        onRemove={removeNote}
        onUpdate={updateNote}
      />
    </Paper>
  );
};

export default MaterialInputCard;
