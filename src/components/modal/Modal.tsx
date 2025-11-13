import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

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
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const firstButtonRef = useRef<HTMLButtonElement | null>(null);

  const [showModal, setShowModal] = useState(false);

  const handleClose = useCallback(() => {
    if (disabled) return;

    setShowModal(false);
    setTimeout(() => onClose(), 300);
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

      if (!disabled) {
        onSubmit();
      }
    },
    [disabled, onSubmit]
  );

  const handleSecondaryAction = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled || !secondaryAction) return;

      if (type === 'cancel') {
        handleClose();
      }

      if (type !== 'cancel') {
        secondaryAction();
      }
    },
    [disabled, handleClose, secondaryAction, type]
  );

  const trapFocus = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;

    const focusableElements = dialogRef.current?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabIndex]:not([tabIndex="-1"])'
    );

    if (!focusableElements || focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault();
      lastElement.focus();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
    }
  };

  const containerClasses = useMemo(() => {
    return showModal ? 'modal__container show' : 'modal__container hide';
  }, [showModal]);

  useEffect(() => {
    if (isOpen) {
      setShowModal(isOpen);
      document.body.setAttribute('aria-hidden', 'true');
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('keydown', trapFocus);

      setTimeout(() => firstButtonRef.current?.focus(), 100);
    } else {
      document.body.removeAttribute('aria-hidden');
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', trapFocus);
    }
  }, [isOpen, handleEscape]);

  if (!isOpen) return;

  return (
    <aside
      className='modal'
      onClick={onCloseHandler}
      role='dialog'
      aria-modal='true'
      aria-labelledby='modal-title'
      aria-describedby='modal-body'
    >
      <div ref={dialogRef} className={containerClasses}>
        <div className='modal__wrapper'>
          <h1 id='modal-title' className='modal__heading' aria-label={title}>
            {title}
          </h1>
          <div id='modal-body' className='modal__body'>
            {body}
          </div>
          <hr aria-hidden='true' />
          <footer className='modal__footer'>
            <div className='modal__btn'>
              {secondaryActionLabel && secondaryAction && (
                <button
                  type='button'
                  onClick={handleSecondaryAction}
                  disabled={disabled}
                  aria-label={secondaryActionLabel}
                  aria-disabled={disabled}
                  className='modal__btn--secondary'
                  ref={firstButtonRef}
                >
                  {secondaryActionLabel}
                </button>
              )}
              {actionLabel && (
                <button
                  type='button'
                  onClick={handleSubmit}
                  disabled={disabled}
                  aria-label={isLoading ? 'Loading' : actionLabel}
                  aria-disabled={disabled}
                  className='modal__btn--primary'
                >
                  {isLoading ? <Spinner /> : actionLabel}
                </button>
              )}
            </div>
            {footer}
          </footer>
          <div className='modal__close'>
            <button
              type='button'
              onClick={handleClose}
              aria-label='Close modal'
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
