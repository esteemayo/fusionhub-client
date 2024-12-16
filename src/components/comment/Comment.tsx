import './Comment.scss';

const Comment = () => {
  return (
    <div className='comment'>
      <h4 className='comment__heading'>Comment</h4>
      <div className='comment__card'>
        <div className='comment__user'>
          <img
            src='/user.jpeg'
            width={50}
            height={50}
            alt='avatar'
            className='comment__user--img'
          />
        </div>
        <div className='comment__details'>
          <div className='comment__dateBox'>
            <time
              dateTime={new Date().toDateString()}
              className='comment__dateBox--time'
            >
              {new Date().toDateString()}
            </time>
            <button type='button' className='comment__dateBox--reply'>
              logo
              <span>Reply</span>
            </button>
          </div>
          <h5 className='comment__details--username'>Rosalina pong</h5>
          <p className='comment__details--desc'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
            minus soluta architecto aspernatur repudiandae provident odio
            voluptatibus quia! Beatae aspernatur alias repellat dicta, eum
            voluptas commodi voluptate reiciendis reprehenderit laboriosam.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
