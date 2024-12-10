import EmptyState from '../../components/emptyState/EmptyState';

import './NotFound.scss';

const NotFound = () => {
  return (
    <EmptyState
      title='Page not found'
      subtitle='Please! Try again later'
      alt='404'
      showReset
    />
  );
};

export default NotFound;
