import { useLocation } from 'react-router-dom';

import PlusIcon from '../icons/PlusIcon';

import { onOpen } from '../../features/postModal/postModalSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import './AddPost.scss';

const AddPost = () => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const { user: currentUser } = useAppSelector((state) => state.auth);

  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(onOpen());
  };

  if (!currentUser || (pathname !== '/' && pathname !== '/posts')) return null;

  return (
    <div className='add-post' aria-label='Create a new post'>
      <div className='add-post__container' aria-hidden='true'>
        <svg
          viewBox='0 0 200 200'
          width='200'
          height='200'
          role='img'
          aria-hidden='true'
          focusable='false'
        >
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

      <button
        type='button'
        onClick={handleOpen}
        className='add-post__btn'
        aria-label='Create a new post'
        aria-haspopup='dialog'
      >
        <PlusIcon />
      </button>
    </div>
  );
};

export default AddPost;
