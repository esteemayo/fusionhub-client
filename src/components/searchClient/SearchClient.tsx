import { useSearch } from '../../hooks/useSearch';
import MagnifyingGlassIcon from '../icons/MagnifyingGlassIcon';

import './SearchClient.scss';

const Client = () => {
  const { searchQuery, setSearchQuery, handleSubmit } = useSearch();

  return (
    <section className='search-client'>
      <div className='search-client__container'>
        <form
          onSubmit={handleSubmit}
          className='search-client__form'
          role='form'
          noValidate
        >
          <input
            type='text'
            id='search'
            name='search'
            value={searchQuery}
            placeholder='Search posts...'
            className='search-client__form--input'
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <MagnifyingGlassIcon />
        </form>
      </div>
    </section>
  );
};

export default Client;
