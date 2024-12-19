import Card from '../card/Card';

import './PostItems.scss';

const PostItems = () => {
  return (
    <section className='postItems'>
      <div className='postItems__container'>
        <Card />
        <Card />
        <Card />
      </div>
    </section>
  );
};

export default PostItems;
