import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import styled, { css } from 'styled-components';
// import Particles from '@tsparticles/react';
// import { loadFull } from 'tsparticles';
// import type { Engine } from '@tsparticles/engine';
// import { tsParticles } from "@tsparticles/engine"

import { HeroProps } from '../../types';

import './Hero.scss';

interface IHeader {
  img?: string;
}

const Hero = ({ img, slug, title, author, createdAt }: HeroProps) => {
  // const themeColor = '#007bff';
  // const themeMode = 'dark';
  // const backgroundColor = themeMode === 'dark' ? '#0d1117' : '#f0f0f0';

  // const particlesInit = async (engine: Engine) => {
  //   console.log('Particles engine loaded'); // ✅ Debug
  //   await loadFull(engine);
  // };

  const postImage = useMemo(() => {
    return img ? `https://ik.imagekit.io/devayo${img}` : undefined;
  }, [img]);

  // const particlesOptions = useMemo(
  //   () => ({
  //     background: {
  //       color: {
  //         value: 'transparent',
  //       },
  //     },
  //     fpsLimit: 120,
  //     interactivity: {
  //       events: {
  //         onClick: { enable: true, mode: 'push' },
  //         onHover: { enable: true, mode: 'repulse' },
  //         resize: true,
  //       },
  //       modes: {
  //         push: { quantity: 4 },
  //         repulse: { distance: 100, duration: 0.4 },
  //       },
  //     },
  //     particles: {
  //       color: { value: '#ffffff' },
  //       links: {
  //         color: '#ffffff',
  //         distance: 150,
  //         enable: true,
  //         opacity: 0.5,
  //         width: 1,
  //       },
  //       collisions: { enable: false },
  //       move: {
  //         direction: 'none',
  //         enable: true,
  //         outModes: { default: 'bounce' },
  //         random: false,
  //         speed: 2,
  //         straight: false,
  //       },
  //       number: {
  //         density: { enable: true, area: 800 },
  //         value: 60,
  //       },
  //       opacity: { value: 0.5 },
  //       shape: { type: 'circle' },
  //       size: { value: { min: 1, max: 5 } },
  //     },
  //     detectRetina: true,
  //   }),
  //   []
  // );

  return (
    <Header img={postImage} className='hero'>
      {/* {!img && (
        <Particles
          id='tsparticles'
          init={particlesInit}
          options={particlesOptions}
        />
      )} */}
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
  /* background-image: ${({ img }) => css`linear-gradient(
      to right bottom,
      rgba(00, 00, 00, 0.85),
      rgba(50, 53, 56, 0.15)
    ), url(${img})`}; */

  position: relative;
  width: 100%;
  height: 35vw;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;

  ${({ img }) =>
    img
      ? css`
          background-image: linear-gradient(
              to right bottom,
              rgba(0, 0, 0, 0.85),
              rgba(50, 53, 56, 0.15)
            ),
            url(${img});
        `
      : css`
          background-color: rgba(
            0,
            123,
            255,
            0.2
          ); // light background for particles
        `}

  /* position: relative;
  width: 100%;
  height: 35vw; // ✅
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden; */

  #tsparticles {
    position: absolute;
    inset: 0;
    z-index: 0;
    width: 100%;
    height: 100%;
  }
`;

export default Hero;
