import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import styled, { css } from 'styled-components';

import { HeaderProps } from '../../types';

import './Header.scss';

interface IWrapper {
  img: string;
}

const Header = ({ posts }: HeaderProps) => {
  const [firstItem, lastItem] = useMemo(() => (posts ? posts : []), [posts]);

  const imageUrl = (url: string) => {
    return `https://ik.imagekit.io/devayo${url}`;
  };

  return (
    <header className='header'>
      <div className='header__container'>
        <div className='header__wrapper'>
          <ImageWrapper
            img={imageUrl(firstItem.img)}
            className='header__wrapper--left'
          >
            <div className='header__info'>
              <Link
                to={`/posts?category=${firstItem.category}`}
                className='header__info--category'
              >
                <span>{firstItem.category}</span>
              </Link>
              <h1 className='header__info--heading'>{firstItem.title}</h1>
              <Link
                to={`/post/${firstItem.slug}`}
                className='header__info--link'
              >
                Read more
              </Link>
            </div>
          </ImageWrapper>
          <ImageWrapper
            img={imageUrl(lastItem.img)}
            className='header__wrapper--right'
          >
            <div className='header__info small'>
              <Link
                to={`/posts?category=${lastItem.category}`}
                className='header__info--category small'
              >
                <span>{lastItem.category}</span>
              </Link>
              <h2 className='header__info--heading small'>{lastItem.title}</h2>
              <Link
                to={`/post/${lastItem.slug}`}
                className='header__info--link small'
              >
                Read more
              </Link>
            </div>
          </ImageWrapper>
        </div>
      </div>
    </header>
  );
};

const ImageWrapper = styled.div<IWrapper>`
  background-image: ${({ img }) => css`
  linear-gradient(
      to right bottom,
      rgba(0, 0, 0, 0.85),
      rgba(50, 53, 56, 0.15)
    ),
    url(${img});
  `};
`;

export default Header;
