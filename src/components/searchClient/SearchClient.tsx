import { toast } from 'react-toastify';
import { useEffect, useRef } from 'react';

import MicrophoneIcon from '../icons/MicrophoneIcon';
import MagnifyingGlassIcon from '../icons/MagnifyingGlassIcon';

import { useVoiceSearch } from '../../hooks/useVoiceSearch';
import { useSearch } from '../../hooks/useSearch';
import { useKeyboardShortcut } from '../../hooks/useKeyboardShortcut';

import './SearchClient.scss';

const Client = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { isListening, error, transcript, toggleListening } = useVoiceSearch();
  const { searchQuery, setSearchQuery, executeSearch, handleSubmit } =
    useSearch();

  const handleVoiceButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    toggleListening();
  };

  useKeyboardShortcut({
    key: 'v',
    mod: true,
    callback: () => {
      if (document.activeElement === inputRef.current) return;
      toggleListening();
    },
  });

  useEffect(() => {
    if (!transcript) return;

    setSearchQuery(transcript);
    executeSearch(transcript);
  }, [executeSearch, setSearchQuery, transcript]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <section
      className='search-client'
      role='search'
      aria-labelledby='search-client-heading'
    >
      <h2 id='search-client-heading' className='sr-only'>
        Search posts
      </h2>

      <div className='search-client__container'>
        <form
          onSubmit={handleSubmit}
          className='search-client__form'
          role='search'
          aria-label='Search posts form'
          aria-describedby='search-instructions'
          noValidate
        >
          <p id='search-instructions' className='sr-only'>
            Type a search query or use the voice search button.
          </p>

          <label htmlFor='search' className='sr-only'>
            Search posts
          </label>

          <input
            ref={inputRef}
            type='search'
            id='search'
            name='search'
            value={searchQuery}
            placeholder='Search posts...'
            className='search-client__form--input'
            onChange={(e) => setSearchQuery(e.target.value)}
            readOnly={isListening}
            aria-readonly={isListening}
            aria-required='false'
            aria-label='Search posts'
            aria-describedby='voice-search-status'
            autoComplete='off'
            spellCheck={false}
          />

          <span className='search-client__form--search-icon' aria-hidden='true'>
            <MagnifyingGlassIcon />
          </span>

          <button
            type='button'
            onClick={handleVoiceButtonClick}
            className={`search-client__form--voice-btn ${
              isListening ? 'active' : ''
            }`}
            aria-pressed={isListening}
            aria-label={
              isListening
                ? 'Stop voice search'
                : 'Start voice search (Ctrl or Cmd + V)'
            }
            aria-live='polite'
            aria-keyshortcuts='Control+V Meta+V'
            title='Search by voice'
          >
            <MicrophoneIcon />
          </button>

          <span id='voice-search-status' className='sr-only' aria-live='polite'>
            {isListening
              ? 'Voice search is active. Listening...'
              : 'Voice search inactive.'}
          </span>
        </form>
      </div>
    </section>
  );
};

export default Client;
