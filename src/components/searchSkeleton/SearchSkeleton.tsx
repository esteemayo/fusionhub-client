import Skeleton from 'react-loading-skeleton';

import { useSkeleton } from '../../hooks/useSkeleton';

import './SearchSkeleton.scss';

const SearchSkeleton = ({
  borderRadius,
}: {
  borderRadius: string | number | undefined;
}) => {
  const { baseColor } = useSkeleton();

  return (
    <div className='search-skeleton'>
      <div className='search-skeleton__input'>
        <Skeleton
          width={270}
          height={45}
          baseColor={baseColor}
          borderRadius={borderRadius}
        />
      </div>
    </div>
  );
};

export default SearchSkeleton;
