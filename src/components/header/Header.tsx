import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { PostItemType } from '../../types';

import './Header.scss';

interface IWrapper {
  img: string;
}

const Header = ({ posts }: { posts: PostItemType }) => {
  const [firstItem, lastItem] = posts;

  return (
    <header className='header'>
      <div className='header__container'>
        <div className='header__wrapper'>
          <ImageWrapper img={firstItem.img} className='header__wrapper--left'>
            <div className='header__info'>
              <span className='header__info--category'>
                {firstItem.category}
              </span>
              <h1 className='header__info--heading'>{firstItem.title}</h1>
              <Link
                to={`/posts/${firstItem.slug}`}
                className='header__info--link'
              >
                Read more
              </Link>
            </div>
          </ImageWrapper>
          <ImageWrapper img={lastItem.img} className='header__wrapper--right'>
            <div className='header__info small'>
              <span className='header__info--category small'>
                {lastItem.category}
              </span>
              <h2 className='header__info--heading small'>{lastItem.title}</h2>
              <Link
                to={`/posts/${lastItem.slug}`}
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
