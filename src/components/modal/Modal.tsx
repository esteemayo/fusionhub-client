import { useEffect, useMemo, useState } from 'react';

import { ModalProps } from '../../types';

import './Modal.scss';

const Modal = ({
  isOpen,
  title,
  size = 'small',
  loading,
  disabled,
  actionLabel,
  secondaryActionLabel,
  body,
  footer,
  onClose,
  onSubmit,
  secondaryAction,
}: ModalProps) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  if (!isOpen) {
    return;
  }

  return (
    <aside className='modal'>
      <div className='modal__container'>
        <div className='modal__wrapper'>
          <h1 className='modal__heading'>{title}</h1>
          <div className='modal__body'>{body}</div>
          <hr />
          <div className='modal__footer'>
            <div className='modal__btn'>
              <button
                type='button'
                disabled={disabled}
                className='modal__btn--secondary'
              >
                {loading ? '...' : secondaryActionLabel}
              </button>
              <button
                type='button'
                disabled={disabled}
                className='modal__btn--primary'
              >
                {loading ? '...' : actionLabel}
              </button>
            </div>
            {footer}
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
