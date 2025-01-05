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
            <div className='modal__buttons'>
              <button type='button' className='modal__buttons--btn'>
                secondary
              </button>
              <button type='button' className='modal__buttons--btn'>
                action
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Modal;
