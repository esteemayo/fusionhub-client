import CategoryItem from '../categoryItem/CategoryItem';

import { categoryItems } from '../../data';

import './Categories.scss';

const Categories = () => {
  return (
    <aside className='categories'>
      <div className='categories__container'>
        <h2 className='categories__container--heading'>Categories</h2>
        {categoryItems.map((category) => {
          return <CategoryItem key={category.id} {...category} />;
        })}
      </div>
    </aside>
  );
};

export default Categories;
