import EmptyState from '../../components/emptyState/EmptyState';

import './NotFound.scss';

const NotFound = () => {
  return (
    <section
      className='not-found'
      role='main'
      aria-labelledby='not-found-title'
      tabIndex={-1}
    >
      <EmptyState
        alt='A graphic representing a missing page (404)'
        imgSrc='/under-construction.svg'
        title='Page not found!'
        subtitle='Please try again later.'
        showReset
        aria-describedby='not-found-description'
      />

      <h1 id='not-found-title' className='sr-only'>
        Page not found
      </h1>

      <p id='not-found-description' className='sr-only'>
        The page you are looking for does not exist or is currently unavailable
      </p>
    </section>
  );
};

export default NotFound;
