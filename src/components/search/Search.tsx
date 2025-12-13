import { useSearch } from '../../hooks/useSearch';
import MagnifyingGlassIcon from '../icons/MagnifyingGlassIcon';

import './Search.scss';

const Search = ({
  inputRef,
}: {
  inputRef: React.LegacyRef<HTMLInputElement> | undefined;
}) => {
  const { handleKeyPress } = useSearch();

  return (
    <div className='search-form' role='search'>
      <div className='search-form__container'>
        <input
          type='search'
          id='search'
          name='search'
          placeholder='Search posts...'
          className='search-form__container--input'
          ref={inputRef}
          onKeyDown={handleKeyPress}
          autoComplete='search'
          aria-label='Search posts'
          aria-describedby='search-help-text'
        />
        <MagnifyingGlassIcon />
      </div>

      <p id='search-help-text' className='sr-only'>
        Type your search terma nd press Enter to search posts.
      </p>
    </div>
  );
};

export default Search;
