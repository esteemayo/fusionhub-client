import { toast } from 'react-toastify';
import { z } from 'zod';
import { useMemo, useState, useCallback } from 'react';
import ReactQuill from 'react-quill-new';
import {
  useForm,
  UseFormRegister,
  FieldValues,
  SubmitHandler,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import PostImage from './PostImage';
import Modal from './modal/Modal';
import PostDescription from './PostDescription';

import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { onClose } from '../features/updateModal/updateModalSlice';

import { categoryOptions } from '../data/formData';
import { postSchema } from '../validations/postSchema';

const enum STEPS {
  DESC = 0,
  IMAGE = 1,
}

type FormData = z.infer<typeof postSchema>;

const UpdateModal = () => {
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((state) => state.updateModal);

  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File>();
  const [description, setDescription] = useState<ReactQuill.Value | undefined>(
    ''
  );
  const [step, setStep] = useState(STEPS.DESC);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(postSchema),
  });

  const handleFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const file = (target.files as FileList)[0];

    setFile(file);
  }, []);

  const onBack = useCallback(() => {
    setStep((value) => {
      return value - 1;
    });
  }, []);

  const onNext = useCallback(() => {
    setStep((value) => {
      return value + 1;
    });
  }, []);

  const handleClose = useCallback(() => {
    dispatch(onClose());
  }, [dispatch]);

  const onSubmitHandler: SubmitHandler<FormData> = useCallback(
    (data) => {
      if (step !== STEPS.IMAGE) {
        onNext();
        return;
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

        toast.success('Post updated!');
        reset();
      }, 3000);
    },
    [description, file, onNext, reset, step]
  );

  const actionLabel = useMemo(() => {
    return step === STEPS.IMAGE ? 'Submit' : 'Next';
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    return step === STEPS.IMAGE ? 'Prev' : undefined;
  }, [step]);

  const secondaryAction = useMemo(() => {
    return step !== STEPS.DESC ? onBack : undefined;
  }, [onBack, step]);

  const bodyContent =
    step === STEPS.IMAGE ? (
      <PostImage
        options={categoryOptions}
        register={register as unknown as UseFormRegister<FieldValues>}
        errors={errors}
        onChangeFile={handleFile}
      />
    ) : (
      <PostDescription
        value={description}
        register={register as unknown as UseFormRegister<FieldValues>}
        errors={errors}
        onChangeDesc={setDescription}
      />
    );

  return (
    <Modal
      isOpen={isOpen}
      title='Update post'
      isLoading={isLoading}
      disabled={isLoading}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      body={bodyContent}
      onClose={handleClose}
      onSubmit={handleSubmit(onSubmitHandler)}
      secondaryAction={secondaryAction}
    />
  );
};

export default UpdateModal;
