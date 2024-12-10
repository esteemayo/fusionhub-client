import Heading from '../../components/heading/Heading';

import './NotFound.scss';

const NotFound = () => {
  return (
    <div className='notFound'>
      <div className='notFound__container'>
        <div className='notFound__wrapper'>
          <img src='' alt='404' className='notFound__img' />
          <Heading
            title='Page not found'
            subtitle='Please! Try again later'
            center
          />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
