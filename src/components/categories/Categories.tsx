import { useQuery } from '@tanstack/react-query';

import CategoryItem from '../categoryItem/CategoryItem';
import ErrorState from '../errorState/ErrorState';
import CategorySkeleton from '../categorySkeleton/CategorySkeleton';

import { CategoryItemType } from '../../types';
import { getCountByCategory } from '../../services/postService';

import './Categories.scss';

const fetchCountByCategory = async () => {
  const { data } = await getCountByCategory();
  return data;
};

const Categories = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['categories'],
    queryFn: () => fetchCountByCategory(),
  });

  if (data?.length < 1) {
    return (
      <section className='categories'>
        <div className='categories__container'>
          <h2 className='categories__container--heading'>Categories</h2>
          <ErrorState
            title='No categories found'
            subtitle='It seems there are no categories available at the moment. Please check back later or try refreshing the page.'
          />
        </div>
      </section>
    );
  }

  return (
    <section className='categories'>
      <div className='categories__container'>
        <h2 className='categories__container--heading'>Categories</h2>
        {isPending ? (
          Array.from(new Array(3)).map((_, index) => {
            return <CategorySkeleton key={index} />;
          })
        ) : error ? (
          <ErrorState
            title='Error loading categories'
            subtitle='An error occurred while fetching the categories. Please try again later or contact support if the issue persists.'
          />
        ) : (
          data?.map((item: CategoryItemType) => {
            return <CategoryItem key={item.category} {...item} />;
          })
        )}
      </div>
    </section>
  );
};

export default Categories;
