import { useLocation } from 'react-router-dom';

import { useAppDispatch } from '../../hooks/hooks';
import { onOpen } from '../../features/postModal/postModalSlice';

import './AddPost.scss';

const AddPost = () => {
  const { pathname } = useLocation();

  const dispatch = useAppDispatch();

  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(onOpen());
  };

  if (pathname !== '/' && pathname !== '/posts') {
    return;
  }

  return (
    <div className='add-post'>
      <div className='add-post__container'>
        <svg viewBox='0 0 200 200' width='200' height='200'>
          <path
            id='circlePath'
            fill='none'
            d='M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0'
          />
          <text>
            <textPath href='#circlePath' startOffset='0%'>
              Post your article •
            </textPath>
            <textPath href='#circlePath' startOffset='50%'>
              Share your story •
            </textPath>
          </text>
        </svg>
      </div>
      <button type='button' className='add-post__btn' onClick={handleOpen}>
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
            d='M12 4.5v15m7.5-7.5h-15'
          />
        </svg>
      </button>
    </div>
  );
};

export default AddPost;
