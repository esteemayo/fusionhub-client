import './Partners.scss';

const Partners = () => {
  return (
    <section className='partners'>
      <div className='partners__container'>
        <h4 className='partners__container--heading'>Partners</h4>
        <p className='partners__container--paragraph'>
          Meet our partners and clients
        </p>
        <figure className='partners__icons'>
          <img
            src='/86-ideas.png'
            alt='86 Ideas Logo'
            className='partners__icons--logo'
          />
          <img
            src='/vairis.png'
            alt='Vairis Logo'
            className='partners__icons--logo'
          />
          <img
            src='/gamelove.png'
            alt='Game Love Logo'
            className='partners__icons--logo'
          />
          <img
            src='/jellyfish.png'
            alt='Jelly Fish Logo'
            className='partners__icons--logo'
          />
          <img
            src='/gen3.png'
            alt='Gen3 Logo'
            className='partners__icons--logo'
          />
          <img
            src='/golfstar.png'
            alt='GolfStar Logo'
            className='partners__icons--logo'
          />
          <img
            src='/guardian.png'
            alt='Guardian Logo'
            className='partners__icons--logo'
          />
          <img
            src='/dragon.png'
            alt='Dragon Logo'
            className='partners__icons--logo'
          />
          <img src='/tp.png' alt='Tp Logo' className='partners__icons--logo' />
          <img
            src='/sakwa.png'
            alt='Sakwa Logo'
            className='partners__icons--logo'
          />
        </figure>
      </div>
    </section>
  );
};

export default Partners;
