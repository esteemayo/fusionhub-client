import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import styled, { css } from 'styled-components';

import { HeroProps } from '../../types';

import './Hero.scss';

interface IHeader {
  img?: string;
}

const Hero = ({ img, slug, title, author, createdAt }: HeroProps) => {
  const postImage = useMemo(() => {
    return img
      ? `https://ik.imagekit.io/devayo${img}`
      : 'https://ik.imagekit.io/devayo/dafault-post.jpg';
  }, [img]);

  return (
    <Header img={postImage} className='hero'>
      <div className='hero__breadCrumbs'>
        <Link to='/' className='hero__breadCrumbs--link'>
          Home
        </Link>
        <Link to={`/posts/${slug}`} className='hero__breadCrumbs--link'>
          Post details
        </Link>
      </div>
      <h1 className='hero__heading'>{title}</h1>
      <div className='hero__wrapper'>
        <div className='hero__wrapper--time'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='currentColor'
            className='size-6'
          >
            <path
              fillRule='evenodd'
              d='M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z'
              clipRule='evenodd'
            />
          </svg>
          <time dateTime={createdAt}>
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
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='currentColor'
            className='size-6'
          >
            <path
              fillRule='evenodd'
              d='M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z'
              clipRule='evenodd'
            />
          </svg>
          <Link to={`/posts?author=${author.username}`}>
            <span>{author.name}</span>
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
