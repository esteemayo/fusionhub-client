import Card from '../card/Card';

import { postItems } from '../../data';

import './PostItems.scss';

const PostItems = () => {
  return (
    <section className='postItems'>
      <div className='postItems__container'>
        {postItems.map((post) => {
          return <Card key={post.id} {...post} />;
        })}
      </div>
    </section>
  );
};

export default PostItems;
