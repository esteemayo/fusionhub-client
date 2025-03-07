import './DeleteComment.scss';

const DeleteComment = () => {
  return (
    <section className='delete-comment'>
      <div className='delete-comment__container'>
        <p className='delete-comment__container--text'>
          Are you sure you want to delete this comment?
        </p>
      </div>
    </section>
  );
};

export default DeleteComment;
