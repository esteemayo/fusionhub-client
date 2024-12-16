import './PostDetail.scss';

const PostDetail = () => {
  return (
    <section className='postDetail'>
      <div className='postDetail__container'>
        <div className='postDetail__user'>
          <div className='postDetail__username'>
            icon
            <span>John doe</span>
          </div>
          <div className='postDetail__date'>
            icon
            <span>19 hours ago</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostDetail;
