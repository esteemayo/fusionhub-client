import { useRef } from 'react';

import { ShareContentProps } from '../../types';
import ClipboardDocumentIcon from '../icons/ClipboardDocumentIcon';

import './ShareContent.scss';

const ShareContent = ({ url, text, title, onClick }: ShareContentProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocusClipboard = () => {
    if (inputRef.current) {
      inputRef.current.select();
    }
  };

  return (
    <div className='share-content '>
      <div
        className='share-content__container'
        role='region'
        aria-labelledby='share-content-heading'
        aria-describedby='share-content-description'
      >
        <h4
          id='share-content-heading'
          className='share-content__container--heading'
          aria-label={title || 'Check this out'}
        >
          {title || 'Check this out'}
        </h4>

        <p
          id='share-content-description'
          className='share-content__container--content'
        >
          {text}
        </p>

        <div
          className='share-content__wrapper'
          role='group'
          aria-label='Copy share URL'
        >
          <label htmlFor='share-url' className='sr-only'>
            Shareable link
          </label>

          <input
            id='share-url'
            name='share-url'
            type='url'
            value={url}
            readOnly
            onClick={handleFocusClipboard}
            onFocus={handleFocusClipboard}
            className='share-content__wrapper--input'
            ref={inputRef}
            aria-describedby='share-text'
            aria-readonly='true'
          />
          <button
            type='button'
            onClick={onClick}
            onFocus={handleFocusClipboard}
            onMouseOver={handleFocusClipboard}
            className='share-content__wrapper--btn'
            aria-label='Copy link to clipboard'
          >
            <ClipboardDocumentIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareContent;
