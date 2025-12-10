import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useMemo, useState, useCallback, useEffect } from 'react';
import parse from 'html-react-parser';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import ReactQuill from 'react-quill-new';
import type { UploadResponse } from 'imagekit-javascript/dist/src/interfaces/UploadResponse';
import { zodResolver } from '@hookform/resolvers/zod';
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

import { validateDescInput } from '../../validations/post';
import {
  DescStepFormData,
  descStepSchema,
  ImageStepFormData,
  imageStepSchema,
} from '../../validations/postSchema';

import { CategoriesType, PostErrorType, PostPayloadType } from '../../types';

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

const PostModal = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const { user: currentUser } = useAppSelector((state) => state.auth);
  const { isOpen, post, postId, queryKey } = useAppSelector(
    (state) => state.postModal
  );

  const { data } = useQuery<CategoriesType>({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    enabled: !!isOpen,
  });

  const createMutation = useMutation({
    mutationFn: (post: object) => createpost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKey],
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
        queryKey: [queryKey],
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

  const [error, setError] = useState<PostErrorType>({});
  const [progress, setProgress] = useState(0);
  const [img, setImg] = useState<UploadResponse | undefined>();
  const [step, setStep] = useState(STEPS.DESC);
  const [image, setImage] = useState<UploadResponse | undefined>();
  const [imgProgress, setImgProgress] = useState(0);
  const [video, setVideo] = useState<UploadResponse | undefined>();
  const [videoProgress, setVideoProgress] = useState(0);
  const [desc, setDesc] = useState<ReactQuill.Value | undefined>('');

  const handleChangeDesc = (value: ReactQuill.Value | undefined) => {
    if (
      (typeof desc === 'string' && desc.trim() !== '') ||
      desc !== undefined
    ) {
      setDesc(value);
      setError((prev) => ({ ...prev, desc: '' }));
    }

    setDesc(value);
  };

  const {
    register: registerDesc,
    handleSubmit: handleSubmitDesc,
    formState: { errors: errorsDesc },
    reset: resetDesc,
    setValue: setValueDesc,
    watch: watchDesc,
  } = useForm<DescStepFormData>({
    resolver: zodResolver(descStepSchema),
  });

  const {
    register: registerImage,
    handleSubmit: handleSubmitImage,
    formState: { errors: errorsImage },
    reset: resetImage,
    setValue: setValueImage,
  } = useForm<ImageStepFormData>({
    resolver: zodResolver(imageStepSchema),
  });

  const title = watchDesc('title');

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

  const setCustomDescValue = useCallback(
    (name: keyof DescStepFormData, value: string) => {
      setValueDesc(name, value, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
    },
    [setValueDesc]
  );

  const setCustomImageValue = useCallback(
    (name: keyof ImageStepFormData, value: string) => {
      setValueImage(name, value, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
    },
    [setValueImage]
  );

  const handleClose = useCallback(() => {
    dispatch(onClose());
  }, [dispatch]);

  const handleClear = useCallback(() => {
    setDesc('');
  }, []);

  const handleReset = useCallback(() => {
    resetDesc();
    resetImage();
    handleClear();
    handleClose();
    setStep(STEPS.DESC);

    if (pathname === '/' || pathname.includes('post')) {
      navigate('/posts');
      return;
    }
  }, [handleClear, handleClose, navigate, pathname, resetDesc, resetImage]);

  const onSubmitDesc: SubmitHandler<DescStepFormData> = useCallback(
    (data) => {
      if (step !== STEPS.IMAGE) {
        onNext();
        return;
      }

      if (!currentUser) return;

      setCustomDescValue('title', data.title);
      onNext();
    },
    [currentUser, onNext, setCustomDescValue, step]
  );

  const onSubmitImage: SubmitHandler<ImageStepFormData> = useCallback(
    (data) => {
      if (!currentUser) return;

      const errors = validateDescInput(desc);
      if (Object.keys(errors).length > 0) setError(errors);

      let imageUrl: string | undefined;

      if (image && progress === 100) {
        imageUrl = image.filePath || undefined;
      }

      const postPayload: PostPayloadType = {
        ...data,
        title,
        category: data.category === '' ? 'general' : data.category,
        tags: data.tags.split(','),
        desc,
        img: imageUrl,
      };

      const mutation = postId ? updateMutation : createMutation;
      mutation.mutate(postPayload, {
        onSuccess: handleReset,
      });
    },
    [
      createMutation,
      currentUser,
      desc,
      handleReset,
      image,
      postId,
      progress,
      title,
      updateMutation,
    ]
  );

  const sortedData = useMemo(() => {
    if (!data) return data;

    if (Array.isArray(data)) {
      return [...data].sort((a, b) => a.name.localeCompare(b.name));
    }

    return data;
  }, [data]);

  const handleModalSubmit = useMemo(
    () =>
      step === STEPS.IMAGE
        ? handleSubmitImage(onSubmitImage)
        : handleSubmitDesc(onSubmitDesc),
    [handleSubmitDesc, handleSubmitImage, onSubmitDesc, onSubmitImage, step]
  );

  const actionLabel = useMemo(
    () => (step === STEPS.IMAGE ? (postId ? 'Update' : 'Submit') : 'Next'),
    [postId, step]
  );

  const secondaryActionLabel = useMemo(
    () => (step === STEPS.IMAGE ? 'Prev' : undefined),
    [step]
  );

  const secondaryAction = useMemo(
    () => (step !== STEPS.DESC ? onBack : undefined),
    [onBack, step]
  );

  const titleLabel = useMemo(
    () => (postId ? 'Update Post Details' : 'Tell Us Your Story'),
    [postId]
  );

  const isLoading = useMemo(
    () => createMutation.isPending || updateMutation.isPending,
    [createMutation.isPending, updateMutation.isPending]
  );

  const isDisabled = useMemo(
    () => isLoading || (progress > 0 && progress < 100),
    [isLoading, progress]
  );

  useEffect(() => {
    if (post) {
      setCustomDescValue('title', post?.title);
      setCustomImageValue('tags', post?.tags.join(','));
      setCustomImageValue('category', post?.category);

      const parsedDesc = parse(String(post?.desc)).toString();
      setDesc(parsedDesc);
    }
  }, [post, setCustomDescValue, setCustomImageValue]);

  useEffect(() => {
    if (image && progress === 100) {
      setProgress(0);
      setImage(undefined);
    }
  }, [image, progress]);

  useEffect(() => {
    if (img) {
      setDesc((prev) => {
        return `
          ${prev}
          <p>
            <img src='${img.url}' />
          </p>
        `;
      });
    }
  }, [img]);

  useEffect(() => {
    if (video) {
      setDesc((prev) => {
        return `
          ${prev}
          <p>
            <iframe src='${video.url}' />
          </p>
        `;
      });
    }
  }, [video]);

  useEffect(() => {
    if (isOpen) {
      return () => {
        dispatch(resetState());
      };
    }
  }, [dispatch, isOpen]);

  const bodyContent: JSX.Element | undefined =
    step === STEPS.IMAGE ? (
      <PostImage
        options={sortedData}
        progress={progress}
        register={registerImage as unknown as UseFormRegister<FieldValues>}
        errors={errorsImage}
        isLoading={isLoading}
        onChangeData={setImage}
        onChangeProgress={setProgress}
      />
    ) : (
      <PostDescription
        value={desc}
        imageProgress={imgProgress}
        videoProgress={videoProgress}
        register={registerDesc as unknown as UseFormRegister<FieldValues>}
        error={error.desc}
        errors={errorsDesc}
        isLoading={isLoading}
        onChangeDesc={handleChangeDesc}
        onChangeImageData={setImg}
        onChangeVideoData={setVideo}
        onChangeImageProgress={setImgProgress}
        onChangeVideoProgress={setVideoProgress}
      />
    );

  return (
    <Modal
      isOpen={isOpen}
      title={titleLabel}
      isLoading={isLoading}
      disabled={isDisabled}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      body={bodyContent}
      onClose={handleClose}
      onSubmit={handleModalSubmit}
      secondaryAction={secondaryAction}
    />
  );
};

export default PostModal;
