import './AboutProfile.scss';

const AboutProfile = () => {
  return (
    <section className='about-profile'>
      <div className='about-profile__container'>
        <h4 className='about-profile__container--heading'>About me</h4>
        <p className='about-profile__container--text'>
          I'm a Full-stack Developer based in United State of America. I
          specialize in Frontend Development, UX/UI design, brand strategy, and
          Webflow development. I'm always striving to grow and learn something
          new and i don't take myself too seriously.
        </p>
        <p className='about-profile__container--text'>
          I'm passionate about helping startups grow, improve their customer
          experience, and to raise venture capital through good design.
        </p>
        <button type='button' className='about-profile__container--btn'>
          Read more
        </button>
      </div>
    </section>
  );
};

export default AboutProfile;
