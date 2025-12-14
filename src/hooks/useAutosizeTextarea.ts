import { useCallback, useLayoutEffect, useRef } from 'react';
import { IAutosizeTextarea } from '../types';

export const useAutosizeTextarea: IAutosizeTextarea = (value, maxRows) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const resize = useCallback(() => {
    const textarea = textareaRef.current!;
    if (!textarea) return;

    textarea.style.height = 'auto';

    const lineHeight = parseInt(
      getComputedStyle(textarea).lineHeight || '20',
      10
    );

    const maxHeight = lineHeight * (maxRows || 3);
    textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;
  }, [maxRows]);

  const handleInput = useCallback(() => {
    resize();
  }, [resize]);

  useLayoutEffect(() => {
    resize();
  }, [value, resize]);

  return {
    textareaRef,
    handleInput,
  };
};
