import { useQuery } from '@tanstack/react-query';

import CategoryItem from '../categoryItem/CategoryItem';
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
    queryKey: ['categories'],
    queryFn: () => fetchCountByCategory(),
  });

  return (
    <section className='categories'>
      <div className='categories__container'>
        <h2 className='categories__container--heading'>Categories</h2>
        {(data ?? [])?.length < 1 ? (
          <div className='categories__empty'>
            <span>No categories found</span>
            <span>
              It seems there are no categories available at the moment. Please
              check back later or try refreshing the page.
            </span>
          </div>
        ) : isPending ? (
          Array.from(new Array(3)).map((_, index) => {
            return <CategorySkeleton key={index} />;
          })
        ) : error ? (
          <div className='categories__error'>
            <span>Error loading categories</span>
            <span>
              {error.message ||
                'An error occurred while fetching the categories. Please try again later or contact support if the issue persists.'}
            </span>
          </div>
        ) : (
          data
            ?.filter((item) => item.count !== 0)
            .map((item) => {
              return <CategoryItem key={item.category} {...item} />;
            })
        )}
      </div>
    </section>
  );
};

export default Categories;
