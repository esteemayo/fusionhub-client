import { MutedListProps } from '../../types';
import MutedListItem from '../mutedListItem/MutedListItem';

import './MutedList.scss';

const MutedList = ({ type, lists }: MutedListProps) => {
  const items = lists ?? [];

  return (
    <section
      className='muted-list'
      role='region'
      aria-label={`Muted ${type} list`}
    >
      <ul className='muted-list__container' role='list'>
        {items.map((list) => {
          return (
            <li key={list.id} role='listitem'>
              <MutedListItem {...list} type={type} />
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default MutedList;
