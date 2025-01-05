import './Modal.scss';

const Modal = () => {
  return (
    <aside className='modal'>
      <div className='modal__container'>
        <div className='modal__wrapper'>
          <h1 className='modal__heading'>Modal heading</h1>
          <div className='modal__body'>Modal body</div>
          <hr />
          <div className='modal__footer'>
            <div className='modal__btn'>
              <button type='button' className='modal__btn--secondary'>
                secondary
              </button>
              <button type='button' className='modal__btn--primary'>
                action
              </button>
            </div>
            Modal footer
          </div>
          <div className='modal__close'>
            <button type='button' className='modal__close--btn'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke-width='1.5'
                stroke='currentColor'
                className='size-6'
              >
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  d='M6 18 18 6M6 6l12 12'
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Modal;
