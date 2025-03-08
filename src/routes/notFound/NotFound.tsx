import EmptyState from '../../components/emptyState/EmptyState';

import './NotFound.scss';

const NotFound = () => {
  return (
    <EmptyState
      alt='404'
      imgSrc='/svg/under-construction.svg'
      title='Page not found!'
      subtitle='Please! Try again later.'
      showReset
    />
  );
};

export default NotFound;
