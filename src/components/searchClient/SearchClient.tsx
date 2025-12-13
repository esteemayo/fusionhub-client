import { useSearch } from '../../hooks/useSearch';
import MagnifyingGlassIcon from '../icons/MagnifyingGlassIcon';

import './SearchClient.scss';

const Client = () => {
  const { searchQuery, setSearchQuery, handleSubmit } = useSearch();

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
          <MagnifyingGlassIcon />
        </form>
      </div>
    </section>
  );
};

export default Client;
