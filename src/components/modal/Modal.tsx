import { useCallback, useEffect, useMemo, useState } from 'react';

import Spinner from '../Spinner';
import CloseIcon from '../icons/CloseIcon';

import { ModalProps } from '../../types';

import './Modal.scss';

const Modal = ({
  isOpen,
  title,
  type,
  isLoading,
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

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    setShowModal(false);

    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  const onCloseHandler = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;

    if (target.classList.contains('modal')) {
      handleClose();
    }
  };

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    },
    [handleClose]
  );

  const handleSubmit = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onSubmit();
    },
    [disabled, onSubmit]
  );

  const handleSecondaryAction = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled || !secondaryAction) {
        return;
      }

      if (type === 'cancel') {
        handleClose();
      }

      if (type !== 'cancel') {
        secondaryAction();
      }
    },
    [disabled, handleClose, secondaryAction, type]
  );

  const containerClasses = useMemo(() => {
    return showModal ? 'modal__container show' : 'modal__container hide';
  }, [showModal]);

  useEffect(() => {
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [handleEscape]);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  if (!isOpen) {
    return;
  }

  return (
    <aside
      className='modal'
      onClick={onCloseHandler}
      role='dialog'
      aria-modal='true'
    >
      <div className={containerClasses}>
        <div className='modal__wrapper'>
          <h1 className='modal__heading' aria-label={title}>
            {title}
          </h1>
          <div className='modal__body'>{body}</div>
          <hr />
          <div className='modal__footer'>
            <div className='modal__btn'>
              {secondaryActionLabel && secondaryAction && (
                <button
                  type='button'
                  onClick={handleSecondaryAction}
                  disabled={disabled}
                  aria-label={secondaryActionLabel}
                  aria-disabled={disabled}
                  className='modal__btn--secondary'
                >
                  {secondaryActionLabel}
                </button>
              )}
              {actionLabel && (
                <button
                  type='button'
                  onClick={handleSubmit}
                  disabled={disabled}
                  aria-label={isLoading ? 'Spinner' : actionLabel}
                  aria-disabled={disabled}
                  className='modal__btn--primary'
                >
                  {isLoading ? <Spinner /> : actionLabel}
                </button>
              )}
            </div>
            {footer}
          </div>
          <div className='modal__close'>
            <button
              type='button'
              onClick={handleClose}
              aria-label='Close modal button'
              className='modal__close--btn'
            >
              <CloseIcon />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Modal;
