import './DeleteContent.scss';

const DeleteContent = ({ text }: { text: string }) => {
  return (
    <div className='delete-content'>
      <div className='delete-content__container'>
        <p className='delete-content__container--text'>{text}</p>
      </div>
    </div>
  );
};

export default DeleteContent;
