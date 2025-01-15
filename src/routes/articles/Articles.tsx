import Card from '../../components/card/Card';

import { postItems } from '../../data';

import './Articles.scss';

const Articles = () => {
  return (
    <div className='articles'>
      <div className='articles__container'>
        <div className='articles__header'>
          <h1 className='articles__header--heading'>My posts</h1>
          <span className='articles__header--text'>Stories written by me</span>
        </div>
        <div className='articles__wrapper'>
          {postItems.map((post) => {
            return <Card key={post.id} {...post} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Articles;
