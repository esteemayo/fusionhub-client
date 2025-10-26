import MutedListItem from '../mutedListItem/MutedListItem';

import './MutedList.scss';

const MutedList = () => {
  return (
    <div className='muted-list'>
      <div className='muted-list__container'>
        <MutedListItem />
        <MutedListItem />
        <MutedListItem />
        <MutedListItem />
      </div>
    </div>
  );
};

export default MutedList;
