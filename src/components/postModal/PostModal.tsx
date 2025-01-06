import { useMemo, useState } from 'react';

import Select from '../select/Select';
import Input from '../input/Input';
import Textarea from '../textarea/Textarea';
import Modal from '../modal/Modal';

import { onClose } from '../../features/postModal/postModalSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import { categoryOptions } from '../../data/formData';

import './PostModal.scss';

const enum STEPS {
  DESC = 0,
  IMAGE = 1,
}

const PostModal = () => {
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((state) => ({ ...state.postModal }));

  const [step, setStep] = useState(STEPS.DESC);

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
    if (step !== STEPS.IMAGE) {
      return onNext();
    }

    console.log('submitted');
  };

  const actionLabel = useMemo(() => {
    if (step !== STEPS.IMAGE) {
      return 'Next';
    }

    return 'Submit';
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.IMAGE) {
      return 'Prev';
    }

    return undefined;
  }, [step]);

  const secondaryAction = useMemo(() => {
    if (step !== STEPS.DESC) {
      return onBack;
    }

    return undefined;
  }, [step]);

  let bodyContent: JSX.Element | undefined;

  bodyContent = (
    <>
      <Input name='title' label='Title' placeholder='Title' />
      <Textarea name='desc' label='Description' placeholder='Description' />
    </>
  );

  if (step === STEPS.IMAGE) {
    bodyContent = (
      <>
        <Input name='tags' label='Tags' placeholder='Tags' />
        <Select name='category' label='Category' options={categoryOptions} />
        <Input type='file' label='Image' accept='image/*' />
      </>
    );
  }

  return (
    <Modal
      isOpen={isOpen}
      title='Tell us your story'
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      body={bodyContent}
      onClose={handleClose}
      onSubmit={handleSubmit}
      secondaryAction={secondaryAction}
    />
  );
};

export default PostModal;
