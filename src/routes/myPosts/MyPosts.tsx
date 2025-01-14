import Card from '../../components/card/Card';

import { postItems } from '../../data';

import './MyPosts.scss';

const MyPosts = () => {
  return (
    <div className='myPosts'>
      <div className='myPosts__container'>
        <div className='myPosts__header'>
          <h1 className='myPosts__header--heading'>My posts</h1>
          <span className='myPosts__header--text'>Stories written by me</span>
        </div>
        <div className='myPosts__wrapper'>
          {postItems.map((post) => {
            return <Card key={post.id} {...post} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default MyPosts;
