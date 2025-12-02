import { useQuery } from '@tanstack/react-query';

import CategoryListItem from '../categoryListItem/CategoryListItem';
import EmptyMessage from '../emptyMessage/EmptyMessage';
import CategoryListSkeleton from '../categoryListSkeleton/CategoryListSkeleton';

import { getCountByCategory } from '../../services/postService';
import { CategoryItemType, CategoryListsProps } from '../../types';

import './CategoryLists.scss';

const fetchCountByCategory = async () => {
  const { data } = await getCountByCategory();
  return data;
};

const CategoryLists = ({ onClose }: CategoryListsProps) => {
  const { isPending, error, data } = useQuery<CategoryItemType[]>({
    queryKey: ['categoryCount'],
    queryFn: fetchCountByCategory,
  });

  const emptyCategoryLists = (data ?? []).length < 1;

  return (
    <section
      className='category-lists'
      role='region'
      aria-labelledby='categories-heading'
    >
      <div className='category-lists__container'>
        <h2
          id='categories-heading'
          className='category-lists__container--heading'
          tabIndex={-1}
        >
          Categories
        </h2>
        {isPending ? (
          Array.from(new Array(3)).map((_, index) => {
            return <CategoryListSkeleton key={index} />;
          })
        ) : error ? (
          <EmptyMessage
            title='Error loading categories'
            subtitle={
              error.message ||
              'An error occurred while fetching the categories. Please try again later or contact support if the issue persists.'
            }
          />
        ) : emptyCategoryLists ? (
          <EmptyMessage
            title='No categories found'
            subtitle='It seems there are no categories available at the moment. Please check back later or try refreshing the page.'
          />
        ) : (
          <ul className='category-lists__list' role='list'>
            {data
              ?.filter((item) => item.count !== 0)
              .map((item) => {
                return (
                  <li
                    key={item.category}
                    className='category-lists__list--item'
                    role='listitem'
                  >
                    <CategoryListItem {...item} onClose={onClose} />
                  </li>
                );
              })}
          </ul>
        )}
      </div>
    </section>
  );
};

export default CategoryLists;
