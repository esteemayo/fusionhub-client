import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import styled, { css } from 'styled-components';

import { HeroProps } from '../../types';

import './Hero.scss';

interface IHeader {
  img?: string;
}

const Hero = ({ img, slug, title }: HeroProps) => {
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
