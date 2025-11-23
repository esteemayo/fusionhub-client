import MutedListItem from '../mutedListItem/MutedListItem';

import { MutedListProps } from '../../types';

import './MutedList.scss';

const MutedList = ({ lists }: MutedListProps) => {
  return (
    <div className='muted-list'>
      <div className='muted-list__container'>
        {(lists ?? []).map((list) => {
          return <MutedListItem key={list.id} {...list} />;
        })}
      </div>
    </div>
  );
};

export default MutedList;
