import './TopPost.scss';

const TopPost = () => {
  return (
    <article className='topPost'>
      <div className='topPost__container'>
        <span className='topPost__container--number'>1</span>
        <span className='topPost__container--title'>
          Omnis velit exercitationem soluta nam nemo error facere fugit minus!
        </span>
        <div className='topPost__container--category'>
          <span>Food, Travel</span>
          <span>-</span>
          <span>DEC 18, 2024</span>
        </div>
      </div>
    </article>
  );
};

export default TopPost;
