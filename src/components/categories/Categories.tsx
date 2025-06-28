import { useQuery } from '@tanstack/react-query';

import EmptyMessage from '../emptyMessage/EmptyMessage';
import Category from '../category/Category';
import CategorySkeleton from '../categorySkeleton/CategorySkeleton';

import { CategoryItemType } from '../../types';
import { getCountByCategory } from '../../services/postService';

import './Categories.scss';

const fetchCountByCategory = async () => {
  const { data } = await getCountByCategory();
  return data;
};

const Categories = () => {
  const { isPending, error, data } = useQuery<CategoryItemType[]>({
    queryKey: ['categoryCount'],
    queryFn: () => fetchCountByCategory(),
  });

  return (
    <section className='categories'>
      <div className='categories__container'>
        <h2 className='categories__container--heading'>Categories</h2>
        {(data ?? [])?.length < 1 && !isPending ? (
          <EmptyMessage
            title='No categories found'
            subtitle='It seems there are no categories available at the moment. Please check back later or try refreshing the page.'
          />
        ) : isPending ? (
          Array.from(new Array(3)).map((_, index) => {
            return <CategorySkeleton key={index} />;
          })
        ) : error ? (
          <EmptyMessage
            title='Error loading categories'
            subtitle={
              error.message ||
              'An error occurred while fetching the categories. Please try again later or contact support if the issue persists.'
            }
          />
        ) : (
          data
            ?.filter((item) => item.count !== 0)
            .map((item) => {
              return <Category key={item.category} {...item} />;
            })
        )}
      </div>
    </section>
  );
};

export default Categories;
