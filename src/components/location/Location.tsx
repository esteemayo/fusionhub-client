import './Location.scss';

const Location = () => {
  return (
    <aside className='location'>
      <div className='location__container'>
        <h3 className='location__container--heading'>Our location</h3>
        <p className='location__container--paragraph'>
          You can find us at our main office located in the heart of the city.
          We are open from Monday to Friday, 9 AM to 5 PM.
        </p>
        <div className='location__wrapper'>
          <iframe
            src='https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d774385.9784301252!2d-74.35859183570642!3d40.697203913127574!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sng!4v1740488913074!5m2!1sen!2sng'
            width='600'
            height='450'
            style={{ border: 0 }}
            allowFullScreen
            loading='lazy'
            referrerPolicy='no-referrer-when-downgrade'
            className='location__wrapper--map'
          ></iframe>
        </div>
      </div>
    </aside>
  );
};

export default Location;
