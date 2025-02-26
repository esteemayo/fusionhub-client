import TeamItem from '../teamItem/TeamItem';

import './Team.scss';

const Team = () => {
  return (
    <section className='team'>
      <div className='team__container'>
        <div className='team__wrapper'>
          <h3 className='team__wrapper--heading'>
            We're a multidisciplinary team of strategists, designers,
            developers, writers, directors and producers united by our
            pioneering spirit
          </h3>
        </div>
        <div className='team__box'>
          <TeamItem />
          <TeamItem />
          <TeamItem />
        </div>
      </div>
    </section>
  );
};

export default Team;
