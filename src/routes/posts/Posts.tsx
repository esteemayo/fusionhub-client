import Search from '../../components/search/Search';

import './Posts.scss';

const Posts = () => {
  return (
    <div className='posts'>
      <div className='posts__container'>
        <div className='posts__container--left'>
          <Search />
        </div>
        <div className='posts__container--right'>Posts Right</div>
      </div>
    </div>
  );
};

export default Posts;
