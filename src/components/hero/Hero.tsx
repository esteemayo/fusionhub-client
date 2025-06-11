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
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='size-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
            />
          </svg>
          <time dateTime={createdAt}>
            {new Date(createdAt).toLocaleDateString()}
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
