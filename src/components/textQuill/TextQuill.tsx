import { useEffect, useRef, useState } from 'react';
import ReactQuill, { DeltaStatic } from 'react-quill-new';

import Label from '../label/Label';
import ErrorMessage from '../errorMessage/ErrorMessage';

import { TextQuillProps } from '../../types';

import 'react-quill-new/dist/quill.snow.css';
import './TextQuill.scss';

const TextQuill = ({
  id,
  label,
  value,
  placeholder,
  validate,
  error,
  readOnly,
  onChange,
}: TextQuillProps) => {
  const quillRef = useRef<ReactQuill | null>(null);
  const [charCount, setCharCount] = useState(0);

  const instructionsId = `${id}-instructions`;
  const errorId = `${id}-error`;
  const countId = `${id}-count`;

  const handleClick = () => {
    quillRef?.current?.focus();
  };

  const handleClear = () => {
    const q = quillRef.current;
    if (!q) return;

    const editor = q.getEditor();

    const emptyDelta: DeltaStatic = { ops: [] };

    onChange?.('', emptyDelta, 'api', editor);
    editor.setText('');
    setCharCount(0);

    setTimeout(() => q?.focus(), 0);
  };

  useEffect(() => {
    const editor = quillRef.current?.editor?.root;

    if (!editor) return;

    editor.setAttribute('id', id!);
    editor.setAttribute('role', 'textbox');
    editor.setAttribute('aria-multiline', 'true');
    editor.setAttribute('aria-labelledby', id + '-label');
    editor.setAttribute('aria-describedby', `${instructionsId} ${countId}`);

    if (placeholder) {
      editor.setAttribute('data-placeholder', placeholder);
    }

    if (readOnly) {
      editor.setAttribute('aria-readonly', 'true');
    }

    if (error) {
      editor.setAttribute('aria-invalid', 'true');
      editor.setAttribute(
        'aria-describedby',
        `${instructionsId} ${errorId} ${countId}`
      );
    } else {
      editor.removeAttribute('aria-invalid');
    }

    const updateCount = () => {
      const text = editor.innerText || '';
      setCharCount(text.trim().length);
    };

    editor.addEventListener('input', updateCount);
    updateCount();

    return () => editor.removeEventListener('input', updateCount);
  }, [countId, error, errorId, id, instructionsId, placeholder, readOnly]);

  const handleToolbarKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const buttons = Array.from(
      (e.currentTarget as HTMLElement).querySelectorAll('button')
    ) as HTMLButtonElement[];

    if (!buttons.length) return;

    const currentIndex = buttons.indexOf(
      document.activeElement as HTMLButtonElement
    );

    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault();
        buttons[(currentIndex + 1) % buttons.length].focus();
        break;

      case 'ArrowLeft':
        e.preventDefault();
        buttons[(currentIndex - 1 + buttons.length) % buttons.length].focus();
        break;

      default:
        break;
    }
  };

  return (
    <div className='text-quill'>
      <Label
        id={`${id}-label`}
        label={label}
        validate={validate}
        onClick={handleClick}
      />

      <p id={instructionsId} className='sr-only'>
        This is a rich text editor. You can type normally. Use keyboard
        shortcuts for formatting: Ctrl+B for bold, Ctrl+I for italics, and
        Ctrl+U for underline. Use Shift+Tab to edit editor.
      </p>

      <div
        onKeyDown={handleToolbarKey}
        className='quill-toolbar'
        role='group'
        aria-label={`${label} text formatting options`}
      />

      <ReactQuill
        theme='snow'
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        readOnly={readOnly}
        ref={quillRef}
      />

      <div className='text-quill__wrapper'>
        <p
          id={countId}
          className='text-quill__wrapper--count'
          aria-live='polite'
        >
          {charCount} characters
        </p>
        {typeof value === 'string' && value.length > 0 && charCount > 0 && (
          <button
            type='button'
            onClick={handleClear}
            className='text-quill__wrapper--clear-btn'
            aria-label={`Clear ${label}`}
          >
            Clear
          </button>
        )}
      </div>

      {error && <ErrorMessage id={errorId} role='alert' message={error} />}
    </div>
  );
};

export default TextQuill;
