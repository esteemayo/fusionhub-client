import './SearchForm.scss';

const SearchForm = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('form submitted!');
  };

  return (
    <form className='search-form' onSubmit={handleSubmit}>
      <input
        type='text'
        name='search'
        id='search'
        placeholder='Search posts...'
        className='search-form__input'
      />
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
    </form>
  );
};

export default SearchForm;
