import { useMemo, useState } from 'react';

import Input from '../input/Input';
import Modal from '../modal/Modal';

import { onClose } from '../../features/postModal/postModalSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import './PostModal.scss';

const enum STEPS {
  INFO = 0,
  IMAGE = 1,
}

const PostModal = () => {
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((state) => ({ ...state.postModal }));

  const [step, setStep] = useState(STEPS.INFO);

  const onBack = () => {
    setStep((value) => {
      return value - 1;
    });
  };

  const onNext = () => {
    setStep((value) => {
      return value + 1;
    });
  };

  const handleClose = () => {
    dispatch(onClose());
  };

  const handleSubmit = () => {
    console.log('submitted');
  };

  let bodyContent: JSX.Element | undefined;

  bodyContent = (
    <>
      <Input name='title' label='Title' placeholder='Title' />
      <Input name='desc' label='Description' placeholder='Description' />
      <Input name='category' label='Category' placeholder='Category' />
    </>
  );

  if (step === STEPS.IMAGE) {
    bodyContent = <div>Image</div>;
  }

  return (
    <Modal
      isOpen={isOpen}
      title='Tell us your story'
      actionLabel='Submit'
      secondaryActionLabel='Prev'
      body={bodyContent}
      onClose={handleClose}
      onSubmit={handleSubmit}
      secondaryAction={() => console.log('clicked')}
    />
  );
};

export default PostModal;
