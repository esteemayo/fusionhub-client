import './DeleteContent.scss';

const DeleteContent = ({ text }: { text: string }) => {
  return (
    <div
      className='delete-content'
      role='alertdialog'
      aria-modal='true'
      aria-labelledby='delete-content-title'
      aria-describedby='delete-content-desc'
    >
      <div className='delete-content__container'>
        <h2 id='delete-content-title' className='sr-only'>
          Confirm deletion
        </h2>

        <p id='delete-content-desc' className='delete-content__container--text'>
          {text}
        </p>
      </div>
    </div>
  );
};

export default DeleteContent;
