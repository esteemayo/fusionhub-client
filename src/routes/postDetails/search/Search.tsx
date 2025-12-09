import MagnifyingGlassIcon from '../../../components/icons/MagnifyingGlassIcon';

import { SearchProps } from '../../../types';
import { useSearch } from '../../../hooks/useSearch';

import './Search.scss';

const Search = ({ onClose }: SearchProps) => {
  const { searchQuery, setSearchQuery, handleSubmit } = useSearch();

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    handleSubmit(e);
    onClose?.();
  };

  return (
    <section className='search' role='search' aria-labelledby='search-heading'>
      <div className='search__container'>
        <h2 id='search-heading' className='search__container--heading'>
          Search
        </h2>

        <form
          className='search__container--form'
          onSubmit={onSubmitHandler}
          role='search'
          aria-describedby='search-help-text'
        >
          <label htmlFor='search' className='sr-only'>
            Search posts
          </label>

          <input
            type='text'
            name='search'
            id='search'
            value={searchQuery}
            placeholder='Search posts...'
            onChange={(e) => setSearchQuery(e.target.value)}
            autoComplete='search'
            aria-required='true'
          />

          <button type='submit' aria-label='Submit search'>
            <MagnifyingGlassIcon />
          </button>

          <p id='search-help-text' className='sr-only'>
            Type your search query and press enter to search posts
          </p>
        </form>
      </div>
    </section>
  );
};

export default Search;
