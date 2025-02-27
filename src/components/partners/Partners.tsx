import { partnerItems } from '../../data';
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
          {partnerItems.map((item) => {
            const { id, alt, imgSrc } = item;
            return (
              <img
                key={id}
                src={imgSrc}
                width={100}
                height={100}
                alt={alt}
                className='partners__icons--logo'
              />
            );
          })}
        </figure>
      </div>
    </section>
  );
};

export default Partners;
