import './Card.scss';

const Card = () => {
  return (
    <article className='card'>
      <img
        src='/post-1.jpg'
        alt='post'
        width={300}
        height={300}
        className='card__img'
      />
    </article>
  );
};

export default Card;
