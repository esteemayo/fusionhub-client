import './ActionMenus.scss';

const ActionMenus = () => {
  const isPending = false;

  const handleFeature = () => {
    console.log('post featured!');
  };

  const handleSave = () => {
    console.log('post saved!');
  };

  const handleShare = () => {
    console.log('post shared!');
  };

  const handleUpdate = () => {
    console.log('post updated!');
  };

  const handleDelete = () => {
    console.log('post deleted!');
  };

  return (
    <section className='actionMenus'>
      <div className='actionMenus__container'>
        <h2 className='actionMenus__container--heading'>Actions</h2>
        <div className='actionMenus__action'>
          <button
            type='button'
            className='actionMenus__btn'
            onClick={handleFeature}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='size-6 actionMenus__btn--svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z'
              />
            </svg>
            <span className='actionMenus__btn--label'>Feature post</span>
            {isPending && (
              <span className='actionMenus__btn--loader success'>
                (in progress)
              </span>
            )}
          </button>
        </div>
        <div className='actionMenus__action'>
          <button
            type='button'
            className='actionMenus__btn'
            onClick={handleSave}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='size-6 actionMenus__btn--svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z'
              />
            </svg>
            <span className='actionMenus__btn--label'>Save post</span>
            {isPending && (
              <span className='actionMenus__btn--loader success'>
                (in progress)
              </span>
            )}
          </button>
        </div>
        <div className='actionMenus__action'>
          <button
            type='button'
            className='actionMenus__btn'
            onClick={handleShare}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='size-6 actionMenus__btn--svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z'
              />
            </svg>
            <span className='actionMenus__btn--label'>Share post</span>
            {isPending && (
              <span className='actionMenus__btn--loader success'>
                (in progress)
              </span>
            )}
          </button>
        </div>
        <div className='actionMenus__action'>
          <button
            type='button'
            className='actionMenus__btn'
            onClick={handleUpdate}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='size-6 actionMenus__btn--svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125'
              />
            </svg>
            <span className='actionMenus__btn--label'>Update post</span>
          </button>
        </div>
        <div className='actionMenus__action'>
          <button
            type='button'
            className='actionMenus__btn'
            onClick={handleDelete}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='size-6 actionMenus__btn--svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0'
              />
            </svg>
            <span className='actionMenus__btn--label'>Delete post</span>
            {isPending && (
              <span className='actionMenus__btn--loader error'>
                (in progress)
              </span>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default ActionMenus;
