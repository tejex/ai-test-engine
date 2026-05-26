export const MIN_STUDY_MATERIAL_CHARACTERS = 300;

export const normalizeStudyMaterial = (value: string) => value.replace(/\s+/g, ' ').trim();

export const getStudyMaterialCharacterCount = (notes: string[], draftNote: string) =>
  normalizeStudyMaterial([...notes, draftNote].filter(Boolean).join(' ')).length;

export const getStudyMaterialValidation = (notes: string[], draftNote: string) => {
  const characterCount = getStudyMaterialCharacterCount(notes, draftNote);
  const remainingCharacters = Math.max(MIN_STUDY_MATERIAL_CHARACTERS - characterCount, 0);

  return {
    characterCount,
    remainingCharacters,
    isValid: remainingCharacters === 0,
  };
};
