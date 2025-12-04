import Image from '../Image';
import { partnerItems } from '../../data';

import './Partners.scss';

const Partners = () => {
  return (
    <section
      className='partners'
      role='region'
      aria-labelledby='partners-heading'
      aria-describedby='partners-description'
    >
      <div className='partners__container'>
        <h4 id='partners-heading' className='partners__container--heading'>
          Partners
        </h4>

        <p id='partners-description' className='partners__container--paragraph'>
          Meet our partners and clients
        </p>

        <ul className='partners__icons' role='list'>
          {partnerItems.map((item) => {
            const { id, alt, imgSrc } = item;
            return (
              <li key={id} role='listitem'>
                <Image
                  src={imgSrc}
                  width={100}
                  height={100}
                  alt={alt || ''}
                  className='partners__icons--logo'
                />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Partners;
