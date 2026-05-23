import { Stack, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AppButton from '../AppButton';
import { useAppTheme } from '../../styles/ThemeModeProvider';

type NoteImportActionsProps = {
  canAttachDraft: boolean;
  isImportingFiles: boolean;
  hasAttachedNotes: boolean;
  onAttachDraft: () => void;
  onChooseFiles: () => void;
};

const NoteImportActions = ({
  canAttachDraft,
  isImportingFiles,
  hasAttachedNotes,
  onAttachDraft,
  onChooseFiles,
}: NoteImportActionsProps) => {
  const { theme } = useAppTheme();

  return (
    <Stack direction="row" spacing={2} sx={{ alignItems: 'center', mb: hasAttachedNotes ? 2 : 3 }}>
      <AppButton
        variant="outlined"
        startIcon={<CloudUploadIcon />}
        disabled={isImportingFiles}
        onClick={onChooseFiles}
        sx={{
          borderColor: theme.accent,
          color: theme.accent,
          '&:hover': {
            borderColor: theme.accent,
            backgroundColor: theme.accentSoft,
          },
        }}
      >
        {isImportingFiles ? 'Importing...' : 'Import from device'}
      </AppButton>

      <AppButton
        variant="outlined"
        disabled={!canAttachDraft}
        onClick={onAttachDraft}
        sx={{
          borderColor: theme.borderStrong,
          color: theme.text,
          '&:hover': {
            borderColor: theme.accent,
            backgroundColor: theme.accentSoft,
          },
          '&.Mui-disabled': {
            borderColor: theme.border,
            color: theme.mutedText,
          },
        }}
      >
        Attach note
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
  );
};

export default NoteImportActions;
