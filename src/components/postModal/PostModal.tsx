import { toast } from 'react-toastify';
import { z } from 'zod';
import { useMemo, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import ReactQuill from 'react-quill-new';
import {
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormRegister,
} from 'react-hook-form';

import PostImage from '../PostImage';
import Modal from '../modal/Modal';
import PostDescription from '../PostDescription';

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

  const [file, setFile] = useState<File | undefined>();
  const [step, setStep] = useState(STEPS.IMAGE);
  const [description, setDescription] = useState<ReactQuill.Value | undefined>(
    ''
  );
  const [isLoading, setIsLoading] = useState(false);

  const schema = z
    .object({
      title: z.string(),
      tags: z.string(),
      category: z.string(),
    })
    .required();

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

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

  const handleClear = () => {
    setDescription('');
    setFile(undefined);
  };

  const onSubmitHandler: SubmitHandler<FormData> = (data) => {
    if (step !== STEPS.IMAGE) {
      console.log('next clicked!');
      return onNext();
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      console.log({
        ...data,
        tags: data.tags.split(','),
        description,
        image: file?.name,
      });

      toast.success('Post created!');

      reset();
      handleClear();
      handleClose();
      setStep(STEPS.DESC);
    }, 3000);
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

  let bodyContent: React.JSX.Element | undefined;

  bodyContent = (
    <PostDescription
      value={description}
      register={register as unknown as UseFormRegister<FieldValues>}
      errors={errors}
      onChangeDesc={setDescription}
    />
  );

  if (step === STEPS.IMAGE) {
    bodyContent = (
      <PostImage
        options={categoryOptions}
        register={register as unknown as UseFormRegister<FieldValues>}
        errors={errors}
        onChangeFile={handleFile}
      />
    );
  }

  return (
    <Modal
      isOpen={isOpen}
      title='Tell us your story'
      loading={!!isLoading}
      disabled={!!isLoading}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      body={bodyContent}
      onClose={handleClose}
      onSubmit={handleSubmit(onSubmitHandler)}
      secondaryAction={secondaryAction}
    />
  );
};

export default PostModal;
