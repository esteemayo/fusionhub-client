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
    <section className='search' role='search'>
      <div className='search__container'>
        <h2 className='search__container--heading'>Search</h2>
        <form className='search__container--form' onSubmit={onSubmitHandler}>
          <input
            type='text'
            name='search'
            id='search'
            value={searchQuery}
            placeholder='Search posts...'
            onChange={(e) => setSearchQuery(e.target.value)}
            autoComplete='search'
            aria-label='Search posts'
            aria-describedby='search-help-text'
          />
          <button type='submit'>
            <MagnifyingGlassIcon />
          </button>
        </form>
      </div>
    </section>
  );
};

export default Search;
