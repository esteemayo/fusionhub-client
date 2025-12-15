import { useEffect } from 'react';

import MicrophoneIcon from '../icons/MicrophoneIcon';
import MagnifyingGlassIcon from '../icons/MagnifyingGlassIcon';

import { useSearch } from '../../hooks/useSearch';
import { useVoiceSearch } from '../../hooks/useVoiceSearch';

import './SearchClient.scss';

const Client = () => {
  const { searchQuery, setSearchQuery, executeSearch, handleSubmit } =
    useSearch();
  const { isListening, transcript, startListening, stopListening } =
    useVoiceSearch();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    return isListening ? stopListening() : startListening();
  };

  useEffect(() => {
    if (!transcript) return;

    setSearchQuery(transcript);
    executeSearch(transcript);
  }, [executeSearch, setSearchQuery, transcript]);

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
          noValidate
        >
          <label htmlFor='search' className='sr-only'>
            Search posts
          </label>

          <input
            type='search'
            id='search'
            name='search'
            value={searchQuery}
            placeholder='Search posts...'
            className='search-client__form--input'
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-required='false'
            aria-label='Search posts'
          />

          <div className='search-client__form--search-icon'>
            <MagnifyingGlassIcon />
          </div>

          <button
            type='button'
            onClick={handleClick}
            className='search-client__form--voice-btn'
            aria-pressed={isListening}
            aria-label='Search using voice'
          >
            <MicrophoneIcon />
          </button>
        </form>
      </div>
    </section>
  );
};

export default Client;
