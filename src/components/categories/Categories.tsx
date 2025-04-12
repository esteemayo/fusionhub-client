import { useEffect, useState } from 'react';

import CategoryItem from '../categoryItem/CategoryItem';
import CategorySkeleton from '../categorySkeleton/CategorySkeleton';

import { categoryItems } from '../../data';

import './Categories.scss';

const Categories = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  return (
    <section className='categories'>
      <div className='categories__container'>
        <h2 className='categories__container--heading'>Categories</h2>
        {isLoading
          ? Array.from(new Array(3)).map((_, index) => {
              return <CategorySkeleton key={index} />;
            })
          : categoryItems.map((category) => {
              return <CategoryItem key={category.id} {...category} />;
            })}
      </div>
    </section>
  );
};

export default Categories;
