import { createPortal } from 'react-dom';
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
  const modalRef = useRef<HTMLDivElement | null>(null);
  const firstButtonRef = useRef<HTMLButtonElement | null>(null);

  const [showModal, setShowModal] = useState(false);

  const handleClose = useCallback(() => {
    if (disabled) return;

    setShowModal(false);
    setTimeout(() => onClose(), 300);
  }, [disabled, onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleEscKey = useCallback(
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

  const containerClasses = useMemo(
    () => (showModal ? 'modal__container show' : 'modal__container hide'),
    [showModal]
  );

  useEffect(() => {
    if (!isOpen) return;

    const modalEl = modalRef.current;
    if (!modalEl) return;

    const focusable = modalEl.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabIndex]:not([tabIndex="-1"])'
    );

    if (!focusable || focusable.length === 0) return;

    const firstElement = focusable[0];
    const lastElement = focusable[focusable.length - 1];

    firstElement.focus();

    const trapFocus = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('keydown', trapFocus);
    return () => document.removeEventListener('keydown', trapFocus);
  }, [isOpen]);

  useEffect(() => {
    const appRoot = document.getElementById('root') || document.body;

    if (isOpen) {
      appRoot.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = 'hidden';
      document.body.classList.add('no-interact');

      window.addEventListener('keydown', handleEscKey);
    } else {
      appRoot.removeAttribute('aria-hidden');
      document.body.style.overflow = '';
      document.body.classList.remove('no-interact');

      window.removeEventListener('keydown', handleEscKey);
    }

    return () => {
      appRoot.removeAttribute('aria-hidden');
      document.body.style.overflow = '';
      document.body.classList.remove('no-interact');

      window.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, handleEscKey]);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  if (!isOpen) return null;

  const modalContent = (
    <aside
      className='modal'
      onClick={handleBackdropClick}
      role='dialog'
      aria-modal='true'
      aria-labelledby='modal-title'
      aria-describedby='modal-body'
    >
      <div ref={modalRef} className={containerClasses}>
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

  return createPortal(
    modalContent,
    document.getElementById('modal-root') as HTMLElement
  );
};

export default Modal;
