import Skeleton from 'react-loading-skeleton';

import './SearchSkeleton.scss';

const SearchSkeleton = ({
  borderRadius,
}: {
  borderRadius: string | number | undefined;
}) => {
  return (
    <div className='search-skeleton'>
      <Skeleton
        width={270}
        height={45}
        borderRadius={borderRadius}
        className='search-skeleton__input'
      />
    </div>
  );
};

export default SearchSkeleton;
