import { useEffect, useState } from 'react';

import { useSearch } from '../../../hooks/useSearch';
import SearchSkeleton from '../../../components/searchSkeleton/SearchSkeleton';

import './Search.scss';

const Search = () => {
  const { handleSubmit } = useSearch();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 5000);
  }, []);

  return (
    <section className='search'>
      <div className='search__container'>
        <h2 className='search__container--heading'>Search</h2>
        {isLoading ? (
          <SearchSkeleton borderRadius={'0.5rem'} />
        ) : (
          <form className='search__container--form' onSubmit={handleSubmit}>
            <input
              type='search'
              name='search'
              id='search'
              placeholder='Search posts...'
            />
            <button type='submit'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
                />
              </svg>
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default Search;
