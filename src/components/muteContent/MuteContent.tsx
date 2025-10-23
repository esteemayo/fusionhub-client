import { MuteContentProps } from '../../types';

import './MuteContent.scss';

const MuteContent = ({ description }: MuteContentProps) => {
  return (
    <div className='mute-content'>
      <div className='mute-content__container'>
        <p className='mute-content__container--text'>{description}</p>
        <p className='mute-content__container--text'>
          Muting is private — the person won’t know you’ve muted them. You can
          manage muted items anytime in your{' '}
          <strong>Settings → Privacy → Muted list</strong>.
        </p>
      </div>
    </div>
  );
};

export default MuteContent;
