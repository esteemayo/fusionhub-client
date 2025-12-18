import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import styled, { css } from 'styled-components';

import UserIcon from '../icons/UserIcon';
import ClockSolidIcon from '../icons/ClockSolidIcon';

import { HeroProps } from '../../types';

import './Hero.scss';

interface IHeader {
  img?: string;
}

const Hero = ({ img, slug, title, author, createdAt }: HeroProps) => {
  const postImage = useMemo(
    () =>
      img
        ? `https://ik.imagekit.io/devayo${img}`
        : 'https://ik.imagekit.io/devayo/default-post.jpg',
    [img]
  );

  return (
    <Header
      img={postImage}
      className='hero'
      role='banner'
      aria-labelledby='hero-heading'
    >
      <nav className='hero__breadCrumbs' aria-label='Breadcrumb'>
        <ul className='hero__list'>
          <li className='hero__list--item'>
            <Link to='/' className='hero__breadCrumbs--link'>
              Home
            </Link>
          </li>
          <li className='hero__list--item'>
            <Link
              to={`/post/${slug}`}
              className='hero__breadCrumbs--link'
              aria-current='page'
            >
              Post details
            </Link>
          </li>
        </ul>
      </nav>

      <h1 id='hero-heading' className='hero__heading'>
        {title}
      </h1>

      <div className='hero__wrapper'>
        <div className='hero__wrapper--time'>
          <ClockSolidIcon title='Publication date' />
          <time dateTime={createdAt} aria-label={createdAt}>
            {new Date(createdAt).toLocaleString('de-DE', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
            })}
          </time>
        </div>

        <div className='hero__wrapper--author'>
          <UserIcon title='Author' />
          <Link
            to={`/posts?author=${author.username}`}
            aria-label={`Posts by ${author.name}`}
          >
            {author.name}
          </Link>
        </div>
      </div>
    </Header>
  );
};

const Header = styled.header<IHeader>`
  background-image: ${({ img }) => css`linear-gradient(
      to right bottom,
      rgba(00, 00, 00, 0.85),
      rgba(50, 53, 56, 0.15)
    ), url(${img})`};
`;

export default Hero;
