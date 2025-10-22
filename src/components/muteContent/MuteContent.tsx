import './MuteContent.scss';

const MuteContent = () => {
  return (
    <div className='mute-content'>
      <div className='mute-content__container'>
        <h2>Mute this comment</h2>
        <p>
          This comment will be hidden from your view. You won’t get updates or
          replies related to it, but others can still see and interact with it.
        </p>
      </div>
    </div>
  );
};

export default MuteContent;
