import './PostDetail.scss';

const PostDetail = () => {
  return (
    <section className='postDetail'>
      <div className='postDetail__container'>
        <div className='postDetail__user'>
          <div className='postDetail__username'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='size-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z'
              />
            </svg>
            <span>John doe</span>
          </div>
          <div className='postDetail__date'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='size-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
              />
            </svg>
            <span>19 hours ago</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostDetail;
