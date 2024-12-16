import './CommentCard.scss';

const CommentCard = () => {
  return (
    <article className='commentCard'>
      <div className='commentCard__user'>
        <img
          src='/user.jpeg'
          width={80}
          height={80}
          alt='avatar'
          className='commentCard__user--img'
        />
      </div>
      <div className='commentCard__details'>
        <div className='commentCard__dateBox'>
          <time
            dateTime={new Date().toDateString()}
            className='commentCard__dateBox--time'
          >
            {new Date().toDateString()}
          </time>
          <button type='button' className='commentCard__dateBox--reply'>
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
                d='M7.49 12 3.74 8.248m0 0 3.75-3.75m-3.75 3.75h16.5V19.5'
              />
            </svg>
            <span>Reply</span>
          </button>
        </div>
        <h5 className='commentCard__details--username'>Rosalina pong</h5>
        <p className='commentCard__details--desc'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
          minus soluta architecto aspernatur repudiandae provident odio
          voluptatibus quia! Beatae aspernatur alias repellat dicta, eum
          voluptas commodi voluptate reiciendis reprehenderit laboriosam.
        </p>
      </div>
    </article>
  );
};

export default CommentCard;
