import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
// import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { useMemo, useState, useCallback, useEffect } from 'react';
import parse from 'html-react-parser';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import ReactQuill from 'react-quill-new';
import {
  useForm,
  UseFormRegister,
  FieldValues,
  SubmitHandler,
} from 'react-hook-form';

import PostImage from '../PostImage';
import Modal from '../modal/Modal';
import PostDescription from '../PostDescription';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { onClose, resetState } from '../../features/postModal/postModalSlice';

import { getCategories } from '../../services/categoryService';
import { createPost, updatePost } from '../../services/postService';

import { CategoriesType } from '../../types';
import { postSchema } from '../../validations/postSchema';

import './PostModal.scss';

const fetchCategories = async () => {
  const { data } = await getCategories();
  return data;
};

const createpost = async <T extends object>(post: T) => {
  const { data } = await createPost(post);
  return data;
};

const editPost = async <T extends object, U extends string>(
  post: T,
  postId: U
) => {
  const { data } = await updatePost(post, postId);
  return data;
};

const enum STEPS {
  DESC = 0,
  IMAGE = 1,
}

type FormData = z.infer<typeof postSchema>;

const PostModal = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { user: currentUser } = useAppSelector((state) => ({ ...state.auth }));
  const { isOpen, post, postId } = useAppSelector((state) => ({
    ...state.postModal,
  }));

  const { data } = useQuery<CategoriesType>({
    queryKey: ['categories'],
    queryFn: () => fetchCategories(),
    enabled: !!isOpen,
  });

  const createMutation = useMutation({
    mutationFn: (post: object) => createpost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['posts'],
      });
      toast.success('Post created!');
    },
    onError: (error: unknown) => {
      if (
        error instanceof Error &&
        (error as { response?: { data?: string } })?.response?.data
      ) {
        const errorMessage = (
          error as unknown as { response: { data: string } }
        ).response.data;
        toast.error(errorMessage);
      } else {
        toast.error('An error occurred');
      }
    },
  });

  const updateMutation = useMutation({
    mutationFn: (post: object) => editPost(post, postId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['posts'],
      });
      toast.success('Post updated!');
    },
    onError: (error: unknown) => {
      if (
        error instanceof Error &&
        (error as { response?: { data?: string } })?.response?.data
      ) {
        const errorMessage = (
          error as unknown as { response: { data: string } }
        ).response.data;
        toast.error(errorMessage);
      } else {
        toast.error('An error occurred');
      }
    },
  });

  const [step, setStep] = useState(STEPS.DESC);
  const [file, setFile] = useState<File>();
  const [desc, setDesc] = useState<ReactQuill.Value | undefined>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormData>({
    // resolver: zodResolver(postSchema),
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

  const setCustomValue = useCallback(
    (name: keyof FormData, value: string) => {
      setValue(name, value, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
    },
    [setValue]
  );

  const handleClose = useCallback(() => {
    dispatch(onClose());
  }, [dispatch]);

  const handleClear = useCallback(() => {
    setDesc('');
    setFile(undefined);
  }, []);

  const handleReset = useCallback(() => {
    reset();
    handleClear();
    handleClose();
    setStep(STEPS.DESC);
    navigate('/posts');
  }, [handleClear, handleClose, navigate, reset]);

  const onSubmitHandler: SubmitHandler<FormData> = useCallback(
    (data) => {
      if (step !== STEPS.IMAGE) {
        onNext();
        return;
      }

      if (!currentUser) return;

      const post = {
        ...data,
        tags: data.tags.split(','),
        desc,
      };

      if (file) {
        console.log(file.name);
        return;
      }

      if (postId) {
        updateMutation.mutate(post, {
          onSuccess: () => {
            handleReset();
          },
        });
      } else {
        createMutation.mutate(post, {
          onSuccess: () => {
            handleReset();
          },
        });
      }
    },
    [
      createMutation,
      currentUser,
      desc,
      file,
      handleReset,
      onNext,
      step,
      postId,
      updateMutation,
    ]
  );

  const actionLabel = useMemo(() => {
    return step === STEPS.IMAGE ? (postId ? 'Update' : 'Submit') : 'Next';
  }, [postId, step]);

  const secondaryActionLabel = useMemo(() => {
    return step === STEPS.IMAGE ? 'Prev' : undefined;
  }, [step]);

  const secondaryAction = useMemo(() => {
    return step !== STEPS.DESC ? onBack : undefined;
  }, [onBack, step]);

  const titleLabel = useMemo(() => {
    return postId ? 'Update post' : 'Tell us your story';
  }, [postId]);

  const isLoading = useMemo(() => {
    return createMutation.isPending || updateMutation.isPending;
  }, [createMutation.isPending, updateMutation.isPending]);

  useEffect(() => {
    if (post) {
      setCustomValue('title', post.title);
      setCustomValue('tags', post.tags.join(','));
      setCustomValue('category', post.category);

      const parsedDesc = parse(String(post.desc)).toString();
      setDesc(parsedDesc);
    }
  }, [post, setCustomValue]);

  useEffect(() => {
    if (isOpen) {
      return () => {
        dispatch(resetState());
      };
    }
  }, [dispatch, isOpen]);

  const bodyContent =
    step === STEPS.IMAGE ? (
      <PostImage
        options={data}
        register={register as unknown as UseFormRegister<FieldValues>}
        errors={errors}
        onChangeFile={handleFile}
      />
    ) : (
      <PostDescription
        value={desc}
        register={register as unknown as UseFormRegister<FieldValues>}
        errors={errors}
        onChangeDesc={setDesc}
      />
    );

  return (
    <Modal
      isOpen={isOpen}
      title={titleLabel}
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

export default PostModal;
