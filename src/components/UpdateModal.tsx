import ReactQuill from 'react-quill-new';
import { toast } from 'react-toastify';
import { useMemo, useState } from 'react';

import PostImage from './PostImage';
import Modal from './modal/Modal';
import PostDescription from './PostDescription';

import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { onClose } from '../features/updateModal/updateModalSlice';

import { categoryOptions } from '../data/formData';

const enum STEPS {
  DESC = 0,
  IMAGE = 1,
}

const initialState = {
  title: '',
  tags: '',
  category: '',
};

const UpdateModal = () => {
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((state) => ({ ...state.updateModal }));

  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.DESC);
  const [file, setFile] = useState<File | undefined>();
  const [data, setData] = useState(initialState);
  const [value, setValue] = useState<ReactQuill.Value | undefined>('');

  const handleChange = ({
    target: input,
  }: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = input;
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const file = (target.files as FileList)[0];

    setFile(file);
  };

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

    setIsLoading(true);

    console.log({
      ...data,
      tags: data.tags.split(','),
      value,
      image: file?.name,
    });

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    toast.success('Post updated!');
  };

  const actionLabel = useMemo(() => {
    if (step !== STEPS.IMAGE) {
      return 'Next';
    }

    return 'Update';
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

  let bodyContent: React.JSX.Element | undefined;

  bodyContent = (
    <PostDescription
      title={data.title}
      value={value}
      onChange={handleChange}
      onChangeDesc={setValue}
    />
  );

  if (step === STEPS.IMAGE) {
    bodyContent = (
      <PostImage
        tags={data.tags}
        category={data.category}
        options={categoryOptions}
        onChange={handleChange}
        onChangeFile={handleFile}
      />
    );
  }

  return (
    <Modal
      isOpen={isOpen}
      title='Update post'
      loading={!!isLoading}
      disabled={!!isLoading}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      body={bodyContent}
      onClose={handleClose}
      onSubmit={handleSubmit}
      secondaryAction={secondaryAction}
    />
  );
};

export default UpdateModal;
