import { Value } from 'react-phone-number-input';
import { z } from 'zod';
import React, { HTMLInputTypeAttribute, Ref } from 'react';
import { Action } from 'redux';
import type { UploadResponse } from 'imagekit-javascript/dist/src/interfaces/UploadResponse';
import { IconType } from 'react-icons/lib';
import {
  FieldErrors,
  FieldValues,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form';
import ReactQuill, { DeltaStatic, EmitterSource } from 'react-quill-new';
import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
  QueryObserverResult,
  RefetchOptions,
  UseMutationResult,
} from '@tanstack/react-query';

import { profileSchema } from '../validations/profileSchema';
import { registerSchema } from '../validations/registerSchema';

export interface LogoProps {
  isOpen?: boolean;
  onClose?(e: React.MouseEvent<HTMLAnchorElement>): void;
}

export interface NavItemProps {
  url: string;
  label: string;
}

export interface MenuItemProps {
  url: string;
  label: string;
  onClose(): void;
}

export interface FooterMenuItemProps {
  url: string;
  label: string;
}

export interface SocialMenuItemProps {
  url: string;
  icon: IconType;
}

export interface ImageProps {
  alt?: string;
  src: string;
  width?: string | number;
  height?: string | number;
  className?: string;
}

export interface GoogleImageProps {
  alt?: string;
  src: string;
  width?: string | number;
  height?: string | number;
  className?: string;
}

export interface HeadingProps {
  title: string;
  subtitle: string;
  center?: boolean;
}

export interface EmptyStateProps {
  url?: string;
  title: string;
  subtitle: string;
  center?: boolean;
  imgSrc?: string;
  alt?: string;
  label?: string;
  formatImg?: boolean;
  showReset?: boolean;
  showReload?: boolean;
}

export interface ErrorStateProps {
  title: string;
  subtitle: string;
  center?: boolean;
  imgSrc?: string;
  alt?: string;
}

export interface EmptyPostsProps {
  title: string;
  subtitle: string;
}

export interface EmptyMessageProps {
  title: string;
  subtitle?: string;
  center?: boolean;
  type?: 'comment';
}

export interface LabelProps {
  id?: string;
  label?: string;
  isShow?: boolean;
  isPassword?: boolean;
  validate?: boolean;
  onClick?(): void;
  onAction?(): void;
}

export interface PasswordToggleProps {
  isShow?: boolean;
  isPassword?: boolean;
  onClick?(): void;
}

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  name: string;
  type?: HTMLInputTypeAttribute;
  label?: string;
  disabled?: boolean;
  required?: boolean;
  validate?: boolean;
  isShow?: boolean;
  isPassword?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  onAction?(): void;
  onChange?(e: React.ChangeEvent<HTMLInputElement>): void;
}

export interface FileInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  name?: string;
  label?: string;
  disabled?: boolean;
  required?: boolean;
  onChange?(e: React.ChangeEvent<HTMLInputElement>): void;
}

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id?: string;
  name: string;
  label?: string;
  disabled?: boolean;
  required?: boolean;
  validate?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  onChange?(e: React.ChangeEvent<HTMLTextAreaElement>): void;
}

export interface ReplyCommentTextareaProps {
  value: string;
  placeholder: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
}

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  id?: string;
  name: string;
  label?: string;
  disabled?: boolean;
  required?: boolean;
  validate?: boolean;
  options: CategoriesType | undefined;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  onChange?(e: React.ChangeEvent<HTMLSelectElement>): void;
}

export interface CountrySelectProps {
  name: string;
  label?: string;
  value?: CountrySelectType;
  placeholder?: string;
  validate?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  onChange(name: string, value: CountrySelectType | string): void;
}

export interface TextQuillProps {
  id?: string;
  label?: string;
  value: ReactQuill.Value | undefined;
  placeholder?: string;
  validate?: boolean;
  error?: string;
  readOnly?: boolean;
  onChange?(
    value: ReactQuill.Value | undefined,
    delta: DeltaStatic,
    source: EmitterSource,
    editor: ReactQuill.UnprivilegedEditor
  ): void;
}

export interface DateInputProps {
  label?: string;
  startDate: Date | null;
  placeholder?: string;
  validate?: boolean;
  error?: string;
  onChange: React.Dispatch<React.SetStateAction<Date | null>>;
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  icon?: string;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  color?: 'dark' | 'primary' | 'outline';
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?(e: React.MouseEvent<HTMLButtonElement>): void;
}

export interface GoogleButtonProps {
  icon?: string;
  label: string;
  color?: 'dark' | 'primary' | 'outline';
  disabled?: boolean;
}

export interface FormButtonProps {
  label: string;
  loading?: boolean;
  disabled?: boolean;
}

export interface LoginFormProps {
  isLoading?: boolean;
  showPassword: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  onToggle(): void;
  handleSubmit: UseFormHandleSubmit<
    {
      password: string;
      identifier: string;
    },
    {
      password: string;
      identifier: string;
    }
  >;
  onSubmit: SubmitHandler<{
    password: string;
    identifier: string;
  }>;
}

export type RegisterFormData = z.infer<typeof registerSchema>;

export interface RegisterFormProps {
  about: ReactQuill.Value | undefined;
  phone: Value | undefined;
  progress: number;
  startDate: Date | null;
  isLoading?: boolean;
  showPassword: boolean;
  showPasswordConfirm: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  onChangeAbout: React.Dispatch<
    React.SetStateAction<ReactQuill.Value | undefined>
  >;
  onChangePhone: React.Dispatch<React.SetStateAction<Value | undefined>>;
  onChangeStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
  onChangeImage: React.Dispatch<
    React.SetStateAction<UploadResponse | undefined>
  >;
  onChangeProgress: React.Dispatch<React.SetStateAction<number>>;
  onChangeValue(
    name: keyof RegisterFormData,
    value: CountrySelectType | string
  ): void;
  onTogglePassword(): void;
  onTogglePasswordConfirm(): void;
  handleSubmit: UseFormHandleSubmit<
    {
      email: string;
      password: string;
      name: string;
      username: string;
      passwordConfirm: string;
      bio: string;
      country: {
        label: string;
      };
    },
    {
      email: string;
      password: string;
      name: string;
      username: string;
      passwordConfirm: string;
      bio: string;
      country: {
        label: string;
      };
    }
  >;
  onSubmit: SubmitHandler<{
    email: string;
    password: string;
    name: string;
    username: string;
    passwordConfirm: string;
    bio: string;
    country: {
      label: string;
    };
  }>;
}

export interface ForgotPasswordFormProps {
  isLoading?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  handleSubmit: UseFormHandleSubmit<
    {
      email: string;
    },
    {
      email: string;
    }
  >;
  onSubmit: SubmitHandler<{
    email: string;
  }>;
}

export interface ResetPasswordFormProps {
  isLoading?: boolean;
  showPassword: boolean;
  showPasswordConfirm: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  onTogglePassword(): void;
  onTogglePasswordConfirm(): void;
  handleSubmit: UseFormHandleSubmit<
    {
      password: string;
      passwordConfirm: string;
    },
    {
      password: string;
      passwordConfirm: string;
    }
  >;
  onSubmit: SubmitHandler<{
    password: string;
    passwordConfirm: string;
  }>;
}

export type ProfileDataFormData = z.infer<typeof profileSchema>;

export interface ProfileDataFormProps {
  about: ReactQuill.Value | undefined;
  dateOfBirth: Date | null | undefined;
  startDate: Date | null;
  phone: Value | undefined;
  isLoading?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  onChangeAbout: React.Dispatch<
    React.SetStateAction<ReactQuill.Value | undefined>
  >;
  onChangeCustom(
    name: keyof ProfileDataFormData,
    value: string | CountrySelectType
  ): void;
  onChangeDate: React.Dispatch<React.SetStateAction<Date | null>>;
  onChangePhone: React.Dispatch<React.SetStateAction<Value | undefined>>;
  handleSubmit: UseFormHandleSubmit<
    {
      email: string;
      name: string;
      username: string;
      bio: string;
      country: {
        label: string;
      };
    },
    {
      email: string;
      name: string;
      username: string;
      bio: string;
      country: {
        label: string;
      };
    }
  >;
  onSubmit: SubmitHandler<{
    name: string;
    username: string;
    email: string;
    bio: string;
    country: {
      label: string;
    };
  }>;
}

export interface UpdatePasswordFormProps {
  input: PasswordInput;
  inputs: PasswordInput[];
  showPassword: boolean;
  showPasswordConfirm: boolean;
  showPasswordCurrent: boolean;
  isLoading?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  onTogglePassword(): void;
  onTogglePasswordConfirm(): void;
  onTogglePasswordCurrent(): void;
  handleSubmit: UseFormHandleSubmit<
    {
      password: string;
      passwordConfirm: string;
      passwordCurrent: string;
    },
    {
      password: string;
      passwordConfirm: string;
      passwordCurrent: string;
    }
  >;
  onSubmit: SubmitHandler<{
    passwordCurrent: string;
    password: string;
    passwordConfirm: string;
  }>;
}

export interface PostClientProps {
  isOpen: boolean;
  ref: React.LegacyRef<HTMLInputElement> | undefined;
}

export interface PostItemsProps {
  posts: PostType[] | [];
  isLoading: boolean;
  error: Error | null;
  hasNextPage: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions
  ) => Promise<
    InfiniteQueryObserverResult<InfiniteData<unknown, unknown>, Error>
  >;
}

export interface FeedsProps {
  postId: string;
  onClose(): void;
}

export interface FeedProps {
  _id: string;
  img: string;
  title: string;
  slug: string;
  createdAt: string;
  onClose(): void;
}

export interface RelatedPostProps {
  _id: string;
  img: string;
  title: string;
  slug: string;
  category: string;
  createdAt: string;
}

export interface TopPostsProps {
  onClose(): void;
}

export interface TopPostProps {
  _id: string;
  title: string;
  slug: string;
  tags: string[];
  createdAt: string;
  index: number;
  onClose(): void;
}

export interface MostReadProps {
  onClose(): void;
}

export interface MostReadItemProps {
  _id: string;
  title: string;
  views: number;
  slug: string;
  onClose(): void;
}

export interface AuthLinkProps {
  url: string;
  label: string;
  urlLabel: string;
}

export interface FilterProps {
  onClose(): void;
}

export interface FilterItemProps {
  id: string;
  name: string;
  value: string;
  label: string;
  onClose(): void;
}

export type CategoryType = {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type CategoriesType = CategoryType[];

export type CategoryItemType = {
  category: string;
  count: number;
};

export interface CategoryListsProps {
  onClose(): void;
}

type CategoryListItemAction = {
  onClose(): void;
};

export type CategoryListItemProps = CategoryItemType & CategoryListItemAction;

export type TagProps = {
  tag: string;
  count: number;
};

export interface TagsProps {
  onClose(): void;
}

export interface TagItemProps {
  label: string;
  count?: number;
  onClose?(): void;
}

export interface FollowProps {
  onClose(): void;
}

export interface CardProps {
  _id: string;
  img: string;
  title: string;
  slug: string;
  desc: string;
  category: string;
  createdAt: string;
}

export interface PostMenuButtonProps {
  isOpen: boolean;
  onClick(e: React.MouseEvent<HTMLButtonElement>): void;
}

export type PostPayloadType = {
  title: string;
  category: string;
  tags: string[];
  desc: ReactQuill.Value | undefined;
  img?: string;
};

export interface PostDescriptionProps {
  value: ReactQuill.Value | undefined;
  imageProgress: number;
  videoProgress: number;
  register: UseFormRegister<FieldValues>;
  error?: string;
  errors: FieldErrors;
  isLoading?: boolean;
  onChangeDesc(value: ReactQuill.Value | undefined): void;
  onChangeImageData: React.Dispatch<
    React.SetStateAction<UploadResponse | undefined>
  >;
  onChangeVideoData: React.Dispatch<
    React.SetStateAction<UploadResponse | undefined>
  >;
  onChangeImageProgress: React.Dispatch<React.SetStateAction<number>>;
  onChangeVideoProgress: React.Dispatch<React.SetStateAction<number>>;
}

export interface PostTextBoxProps {
  label: string;
  value: ReactQuill.Value | undefined;
  imageProgress: number;
  videoProgress: number;
  error?: string;
  onChangeDesc(value: ReactQuill.Value | undefined): void;
  onChangeImageData: React.Dispatch<
    React.SetStateAction<UploadResponse | undefined>
  >;
  onChangeVideoData: React.Dispatch<
    React.SetStateAction<UploadResponse | undefined>
  >;
  onChangeImageProgress: React.Dispatch<React.SetStateAction<number>>;
  onChangeVideoProgress: React.Dispatch<React.SetStateAction<number>>;
}

export interface PostImageProps {
  options: CategoriesType | undefined;
  progress: number;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  isLoading?: boolean;
  onChangeData: React.Dispatch<
    React.SetStateAction<UploadResponse | undefined>
  >;
  onChangeProgress: React.Dispatch<React.SetStateAction<number>>;
}

export interface ModalProps {
  isOpen: boolean;
  title?: string;
  type?: 'cancel';
  size?: 'small' | 'full';
  isLoading?: boolean;
  disabled?: boolean;
  actionLabel?: string;
  secondaryActionLabel?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  onClose(): void;
  onSubmit(): void;
  secondaryAction?(): void;
}

export interface SpinnerProps {
  size?: number;
  color?: string;
}

export interface PostListProps {
  isLoading: boolean;
  error: Error | null;
  posts: PostType[] | undefined;
}

export interface AccountHeadingProps {
  title: string;
  subtitle: string;
  type?: 'profile';
}

export interface AccountHeaderProps {
  title: string;
  subtitle: string;
}

export interface AccountMenuItemProps {
  id: string;
  url: string;
  icon: string;
  label: string;
  isOpen: boolean;
  activeMenu?: string;
  onAction(): void;
}

export interface BannerProps {
  image?: string;
  banner?: string;
  isFromGoogle?: boolean;
  query: string | null;
  progress: number;
  advancement: number;
  onChangeCoverData: React.Dispatch<
    React.SetStateAction<UploadResponse | undefined>
  >;
  onChangeImageData: React.Dispatch<
    React.SetStateAction<UploadResponse | undefined>
  >;
  onChangeCoverProgress: React.Dispatch<React.SetStateAction<number>>;
  onChangeImageProgress: React.Dispatch<React.SetStateAction<number>>;
}

export interface ProfileDetailsProps {
  _id: string;
  name: string;
  email: string;
  username: string;
  bio: string;
  country: string;
  dateOfBirth?: string;
  role: RoleType;
  createdAt: string;
}

export interface ProfileFeaturesProps {
  query: string | null;
  userId: string;
}

export interface TabsProps {
  tabs: string[];
  defaultValue?: string;
  onChange?(tab: string): void;
  renderContent?(tab: string): React.ReactNode;
}

export interface ProfileArticlesProps {
  posts: PostType[];
  userId: string;
  queryKey: 'articles' | 'likes' | 'dislikes';
  title: string;
  subtitle: string;
  isLoading: boolean;
  hasNextPage: boolean;
  error: Error | null;
  fetchNextPage: (
    options?: FetchNextPageOptions
  ) => Promise<
    InfiniteQueryObserverResult<InfiniteData<unknown, unknown>, Error>
  >;
}

export interface ArticleProps {
  post: PostType;
  userId: string;
  queryKey: 'articles' | 'likes' | 'dislikes';
}

export interface ProfileCommentsProps {
  comments: CommentType[];
  isLoading: boolean;
  hasNextPage: boolean;
  error: Error | null;
  fetchNextPage: (
    options?: FetchNextPageOptions
  ) => Promise<
    InfiniteQueryObserverResult<InfiniteData<unknown, unknown>, Error>
  >;
}

export interface ProfileCommentProps {
  _id: string;
  content: string;
  post: PostTypeWithAuthor;
  author: AuthorType;
  likes: string[];
  likeCount: number;
  createdAt: string;
}

export interface ProfileRepliesProps {
  replies: ReplyType[];
  isLoading: boolean;
  hasNextPage: boolean;
  error: Error | null;
  fetchNextPage: (
    options?: FetchNextPageOptions
  ) => Promise<
    InfiniteQueryObserverResult<InfiniteData<unknown, unknown>, Error>
  >;
}

export interface ProfileReplyProps {
  _id: string;
  content: string;
  comment: CommentType;
  post: PostTypeWithAuthor;
  author: AuthorType;
  likes: string[];
  likeCount: number;
  createdAt: string;
}

export interface ProfileActionProps {
  type?: 'comment' | 'reply';
  authorRole: RoleType;
  currentUser: CurrentUserType | null;
  isAdmin: boolean;
  isCommentAuthor: boolean;
  isPostAuthor: boolean;
  isReplyAuthor?: boolean;
  onDelete(e: React.MouseEvent<HTMLButtonElement>): void;
  onUpdate(e: React.MouseEvent<HTMLButtonElement>): void;
}

export interface ProfileImageProps {
  name: string;
  bio: string;
  image?: string;
  isFromGoogle?: boolean;
  progress: number;
  role: RoleType;
  ref: Ref<HTMLInputElement> | undefined;
  onChangeImage: React.Dispatch<
    React.SetStateAction<UploadResponse | undefined>
  >;
  onChangeProgress: React.Dispatch<React.SetStateAction<number>>;
  onOpen(e: React.MouseEvent<HTMLButtonElement>): void;
  onUpload(e: React.MouseEvent<HTMLButtonElement>): void;
}

export interface ProfileDataProps {
  name: string;
  username: string;
  email: string;
  phone?: Value;
  dateOfBirth?: Date | null;
  country: CountrySelectType;
  bio: string;
  about?: ReactQuill.Value;
}

export interface PhoneNumberProps {
  label?: string;
  value: Value | undefined;
  placeholder?: string;
  validate?: boolean;
  error?: string;
  onChange(value?: Value): void;
}

export interface ToggleButtonProps {
  type?: 'nav';
  label?: string;
  isOpen: boolean;
  onClick(e: React.MouseEvent<HTMLButtonElement>): void;
}

export interface SearchBarProps {
  isOpen: boolean;
  onToggle(e: React.MouseEvent<HTMLButtonElement>): void;
}

export interface CategoryFormProps {
  isLoading: boolean;
  updateMutation: UseMutationResult<
    unknown,
    unknown,
    {
      name: string;
      categoryId: string;
    },
    unknown
  >;
  label: string;
  cancelBtnClasses: 'show' | 'hide';
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  onSubmit(e: React.FormEvent<HTMLFormElement>): void;
  onCancel(e: React.MouseEvent<HTMLButtonElement>): void;
}

export interface CategoryItemsProps {
  categories: CategoriesType | undefined;
  isPending: boolean;
  error: Error | null;
  categoryId: string | null;
  isEditing: boolean;
  currentUser: CurrentUserType | null;
  updateMutation: UseMutationResult<
    unknown,
    unknown,
    {
      name: string;
      categoryId: string;
    },
    unknown
  >;
  onUpdate(
    e: React.MouseEvent<HTMLButtonElement>,
    category: {
      _id: string;
      name: string;
    }
  ): void;
  onDelete(e: React.MouseEvent<HTMLButtonElement>, categoryId: string): void;
}

export interface CategoryItemProps {
  category: CategoryType;
  categoryId: string | null;
  isEditing: boolean;
  currentUser: CurrentUserType | null;
  isLoading: boolean;
  onEdit(
    e: React.MouseEvent<HTMLButtonElement>,
    category: {
      _id: string;
      name: string;
    }
  ): void;
  onRemove(e: React.MouseEvent<HTMLButtonElement>, categoryId: string): void;
}

export interface ICategory {
  (): {
    isPending: boolean;
    error: Error | null;
    data: CategoriesType | undefined;
    categoryMutation: UseMutationResult<unknown, unknown, string, unknown>;
    updateMutation: UseMutationResult<
      unknown,
      unknown,
      {
        name: string;
        categoryId: string;
      },
      unknown
    >;
    deleteMutation: UseMutationResult<unknown, unknown, string, unknown>;
  };
}

export interface ISearch {
  (): {
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  };
}

export interface ISortedComments {
  (comment: CommentType[] | undefined): {
    sort: sortType;
    setSort: React.Dispatch<React.SetStateAction<sortType>>;
    sortedComments: CommentType[];
  };
}

export interface ILogout {
  (isOpen?: boolean, onClose?: () => Action): {
    btnLabel: string;
    isLoading: boolean;
    handleLogout: (e: React.MouseEvent<HTMLButtonElement>) => void;
  };
}

export interface ISavedPosts {
  (postId?: string): {
    isPending: boolean;
    isPendingSavedCount: boolean;
    isSaved: boolean;
    error: Error | null;
    errorSavedCount: Error | null;
    savedPosts: PostType[] | undefined;
    savedPostsCount: number | undefined;
    saveMutation: UseMutationResult<unknown, unknown, string, unknown>;
    handleSave(e: React.MouseEvent<HTMLButtonElement>): null | undefined;
  };
}

export interface IFavourite {
  (post: PostType, currentUser: CurrentUserType): {
    isLiked: boolean;
    isDisliked: boolean;
    likeMutation: UseMutationResult<unknown, unknown, void, unknown>;
    disLikeMutation: UseMutationResult<unknown, unknown, void, unknown>;
    handleLike(): void;
    handleDislike(): void;
  };
}

export interface ILikeComment {
  (commentId: string, likes: string[], queryKey: readonly unknown[]): {
    isLiked: boolean;
    likeCommentMutation: UseMutationResult<unknown, unknown, string, unknown>;
    handleLike(e: React.MouseEvent<HTMLButtonElement>): void;
  };
}

export interface ILikeReply {
  (replyId: string, likes: string[], queryKey: readonly unknown[]): {
    isLiked: boolean;
    likeReplyMutation: UseMutationResult<unknown, unknown, string, unknown>;
    handleLike(e: React.MouseEvent<HTMLButtonElement>): void;
  };
}

export interface IProfile {
  (username?: string): {
    isPending: boolean;
    isPendingUser: boolean;
    error: Error | null;
    errorUser: Error | null;
    data: UserType | undefined;
    userData: UserType | undefined;
    refetch(
      options?: RefetchOptions
    ): Promise<QueryObserverResult<UserType, Error>>;
    refetchUser(
      options?: RefetchOptions
    ): Promise<QueryObserverResult<UserType, Error>>;
  };
}

export interface IWebShare {
  (title: string, desc: string, url: string): {
    error: string | null;
    share(): Promise<void>;
  };
}

export interface IDate {
  (dateTime: string): {
    formattedDate: string;
  };
}

export interface HeaderProps {
  posts: RandomPostType | undefined;
}

export interface FeatureProps {
  img?: string;
  desc: string;
  title: string;
  slug: string;
  comments: CommentType[];
  createdAt: string;
}

export interface FeatureCardProps {
  img?: string;
  title: string;
  slug: string;
  comments: CommentType[];
  createdAt: string;
}

export interface UploadProps {
  id?: string;
  type?: string;
  label?: string;
  disabled?: boolean;
  ref?: Ref<HTMLInputElement> | undefined;
  setData: React.Dispatch<React.SetStateAction<UploadResponse | undefined>>;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  children?: React.ReactNode;
}

export interface ContactInfoItemProps {
  icon: string;
  phone?: string;
  email?: string;
  location?: string;
  text: string;
}

export interface ContactHeadingProps {
  title: string;
  subtitle: string;
  text?: 'sm';
  type: 'lg' | 'md' | 'sm';
}

export interface UnsubscribeFormProps {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  isLoading: boolean;
  onSubmit: SubmitHandler<{
    email: string;
  }>;
  handleSubmit: UseFormHandleSubmit<
    {
      email: string;
    },
    {
      email: string;
    }
  >;
}

export interface AboutItemProps {
  title: string;
  subtitle: string;
}

export interface TeamItemProps {
  img: string;
  name: string;
  role: string;
  socials: IconType[];
}

export interface HeroProps {
  title: string;
  img?: string;
  slug: string;
  author: AuthorType;
  createdAt: string;
}

export interface PostContentProps {
  post: PostType;
  isLoading: boolean;
}

export interface PostMenuActionsProps {
  isOpen: boolean;
  post: PostType;
}

export interface SearchProps {
  onClose(): void;
}

export interface ActionMenusProps {
  post: PostType;
}

export interface ActionMenuProps {
  label: string;
  isLoading?: boolean;
  onAction(e: React.MouseEvent<HTMLButtonElement>): void;
  children: React.ReactNode;
}

export interface PostDetailProps {
  post: PostType;
  isLoading: boolean;
}

export interface RelatedTagsProps {
  isLoading: boolean;
  tags: string[];
}

export interface CommentsProps {
  postId: string;
}

export interface IComment {
  (postId: string): {
    isPending: boolean;
    isPendingUser: boolean;
    error: Error | null;
    errorUser: Error | null;
    data: CommentType[] | undefined;
    commentUsers: CommentImageType[] | undefined;
    refetch: (
      options?: RefetchOptions
    ) => Promise<QueryObserverResult<CommentType[], Error>>;
    refetchCommentUsers: (
      options?: RefetchOptions
    ) => Promise<QueryObserverResult<CommentImageType[], Error>>;
    commentMutation: UseMutationResult<unknown, unknown, string, unknown>;
    updateCommentMutation: UseMutationResult<
      unknown,
      unknown,
      {
        content: string;
        commentId: string;
      },
      unknown
    >;
    deleteCommentMutation: UseMutationResult<unknown, unknown, string, unknown>;
  };
}

export interface IReply {
  (postId: string, commentId: string): {
    isPending: boolean;
    error: Error | null;
    data: ReplyType[] | [] | undefined;
    replyMutation: UseMutationResult<unknown, unknown, string, unknown>;
    updateReplyMutation: UseMutationResult<
      unknown,
      unknown,
      {
        content: string;
        replyId: string;
      },
      unknown
    >;
    deleteReplyMutation: UseMutationResult<unknown, unknown, string, unknown>;
  };
}

export type sortType = 'best' | 'newest' | 'oldest';

export interface CommentProps {
  sort: sortType;
  commentId: string;
  activeCardId: string | null;
  isPending: boolean;
  isPendingUser: boolean;
  isOpen: boolean;
  isLoading: boolean;
  isEditing: boolean;
  error: Error | null;
  errorUser: Error | null;
  comments: CommentType[];
  commentUsers: CommentImageType[] | undefined;
  commentToShow: number;
  mutation: UseMutationResult<unknown, unknown, string, unknown>;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  onChangeActiveCardId: React.Dispatch<React.SetStateAction<string | null>>;
  onClick(e: React.MouseEvent<HTMLButtonElement>): void;
  onUpdate?(commentId: string): void;
  onOpen(): void;
  onClose(): void;
  onToggle(e: React.MouseEvent<HTMLSpanElement>): void;
  onSort: React.Dispatch<React.SetStateAction<sortType>>;
}

export interface CommentUserImagesProps {
  url(user: CommentImageType): string;
  users: CommentImageType[] | undefined;
  totalUsers: CommentImageType[] | undefined;
  isLoading: boolean;
  error: Error | null;
}

export interface CommentUserImageProps {
  id: string;
  url: string;
  src: string;
}

export interface CommentFiltersProps {
  sort: sortType;
  isOpen: boolean;
  totalComments?: number;
  totalCommentUsers?: number;
  onClose(): void;
  onToggle(e: React.MouseEvent<HTMLSpanElement>): void;
  onSort: React.Dispatch<React.SetStateAction<sortType>>;
}

export interface CommentFilterProps {
  isOpen: boolean;
  onClose(): void;
  onSort: React.Dispatch<React.SetStateAction<sortType>>;
}

export interface CommentFilterItemProps {
  value: string;
  onAction(): void;
}

export interface CommentCardProps {
  editId: string;
  editing: boolean;
  activeCardId: string | null;
  comment: CommentType;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  onChangeActiveCardId: React.Dispatch<React.SetStateAction<string | null>>;
  onUpdate?(commentId: string): void;
  onOpen(): void;
}

export interface CommentActionMenuProps {
  authorRole: RoleType;
  currentUser: CurrentUserType | null;
  postAuthorRole: RoleType;
  isAdmin: boolean;
  isCommentAuthor: boolean;
  isPostAuthor: boolean;
  isOpen: boolean;
  isShow: boolean;
  isDisabled: boolean;
  onClose(e: React.MouseEvent<HTMLButtonElement>): void;
  onDelete(e: React.MouseEvent<HTMLButtonElement>): void;
  onUpdate(e: React.MouseEvent<HTMLButtonElement>): void;
}

export interface CommentActionMenuListProps {
  authorRole: RoleType;
  currentUser: CurrentUserType | null;
  postAuthorRole: RoleType;
  isAdmin: boolean;
  isCommentAuthor: boolean;
  isPostAuthor: boolean;
  isDisabled: boolean;
  isOpen: boolean;
  onClose(e: React.MouseEvent<HTMLButtonElement>): void;
  onDelete(e: React.MouseEvent<HTMLButtonElement>): void;
  onUpdate(e: React.MouseEvent<HTMLButtonElement>): void;
}

export interface CommentActionMenuListItemProps {
  label: string;
  disabled?: boolean;
  onAction(e: React.MouseEvent<HTMLButtonElement>): void;
}

export interface HeartButtonProps {
  size?: 'sm';
  count: number;
  hasLiked: boolean;
  isLoading: boolean;
  onLike(e: React.MouseEvent<HTMLButtonElement>): void;
}

export interface RepliesProps {
  replyId: string;
  activeCardId: string | null;
  replyLists?: ReplyType[];
  replyToShow: number;
  isLoading: boolean;
  isEditing: boolean;
  onChangeActiveCardId: React.Dispatch<React.SetStateAction<string | null>>;
  onUpdate(content: string, replyId: string): void;
  onClick(e: React.MouseEvent<HTMLButtonElement>): void;
}

export interface ReplyProps {
  reply: ReplyType;
  activeCardId: string | null;
  isDisabled: boolean;
  onChangeActiveCardId: React.Dispatch<React.SetStateAction<string | null>>;
  onUpdate(content: string, replyId: string): void;
}

export interface ReplyMenuProps {
  authorRole: RoleType;
  commentAuthorRole: RoleType;
  currentUser: CurrentUserType | null;
  postAuthorRole: RoleType;
  isAdmin: boolean;
  isCommentAuthor: boolean;
  isOpen: boolean;
  isPostAuthor: boolean;
  isReplyAuthor: boolean;
  isDisabled: boolean;
  onDelete(e: React.MouseEvent<HTMLButtonElement>): void;
  onUpdate(e: React.MouseEvent<HTMLButtonElement>): void;
}

export interface ReplyMenuListProps {
  authorRole: RoleType;
  commentAuthorRole: RoleType;
  currentUser: CurrentUserType | null;
  postAuthorRole: RoleType;
  isAdmin: boolean;
  isCommentAuthor: boolean;
  isPostAuthor: boolean;
  isReplyAuthor: boolean;
  isDisabled: boolean;
  onDelete(e: React.MouseEvent<HTMLButtonElement>): void;
  onUpdate(e: React.MouseEvent<HTMLButtonElement>): void;
}

export interface ReplyMenuListItemProps {
  label: string;
  disabled?: boolean;
  onAction(e: React.MouseEvent<HTMLButtonElement>): void;
}

export interface ReplyFormProps {
  content: string;
  replyId: string;
  isOpen: boolean;
  isLoading: boolean;
  isEditing: boolean;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  onCancel(e: React.MouseEvent<HTMLButtonElement>): void;
  onSubmit(e: React.FormEvent<HTMLFormElement>): void;
  ref: React.LegacyRef<HTMLTextAreaElement> | undefined;
}

export interface CommentFormProps {
  value: string;
  commentId: string;
  isLoading?: boolean;
  isPending?: boolean;
  isEditing: boolean;
  comments: CommentType[];
  onChange: React.Dispatch<React.SetStateAction<string>>;
  onCancel(e: React.MouseEvent<HTMLButtonElement>): void;
  onSubmit(e: React.FormEvent<HTMLFormElement>): void;
  ref: React.LegacyRef<HTMLTextAreaElement> | undefined;
}

export interface PostDetailActionProps {
  post: PostType;
}

export interface PostInfoProps {
  username: string;
  authorId: string;
  currentUser: CurrentUserType | null;
  createdAt: string;
}

export interface FavoriteButtonProps {
  likeCount: number;
  dislikeCount: number;
  isLiked: boolean;
  isDisliked: boolean;
  likeMutation: UseMutationResult<unknown, unknown, void, unknown>;
  disLikeMutation: UseMutationResult<unknown, unknown, void, unknown>;
  onLike(): void;
  onDislike(): void;
}

export interface LikeButtonProps {
  count: number;
  hasLiked: boolean;
  isLoading: boolean;
  onAction(): void;
}

export interface DislikeButtonProps {
  count: number;
  hasDisliked: boolean;
  isLoading: boolean;
  onAction(): void;
}

export interface ShareProps {
  title: string;
  desc: string;
  savedCount: number;
  slug: string;
  isSaved: boolean;
  currentUser: CurrentUserType;
  saveMutation: UseMutationResult<unknown, unknown, string, unknown>;
  onClick(e: React.MouseEvent<HTMLButtonElement>): void;
}

export interface SavePostProps {
  count: number;
  hasSaved: boolean;
  isLoading: boolean;
  currentUser: CurrentUserType;
  onSave(e: React.MouseEvent<HTMLButtonElement>): void;
}

export interface ShareButtonProps {
  title: string;
  desc: string;
  slug: string;
}

export interface SaveIconProps {
  isLoading: boolean;
  hasSaved: boolean;
  className?: string;
}

export interface PostDescProps {
  post: PostType;
  isLoading: boolean;
}

export interface RelatedPostsProps {
  postId: string;
  tags: string[];
}

export interface RegisterInputs {
  name: string;
  username: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  country?: string;
  bio?: string;
  about?: string;
}

export interface CurrentUserType {
  details: UserDetailType;
  role: RoleType;
}

export interface AuthState {
  user: CurrentUserType | null;
  name?: string;
  isLoading: boolean;
  isPending: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
}

export interface ErrorPayload {
  response?: {
    data?: {
      message: string;
    };
  };
}

export type PostsType = {
  page: number;
  counts: number;
  numberOfPages: number;
  hasMore: boolean;
  posts: PostType[] | [];
};

export type PostType = {
  _id: string;
  title: string;
  desc: string;
  category: string;
  img: string;
  isFeatured: boolean;
  likes: string[];
  dislikes: string[];
  likeCount: number;
  dislikeCount: number;
  tags: string[];
  views: number;
  author: AuthorType;
  savedBy: string[];
  savedCount: number;
  slug: string;
  comments: CommentType[];
  createdAt: string;
  updatedAt: string;
};

export type RandomPostType = {
  _id: string;
  title: string;
  category: string;
  img: string;
  slug: string;
}[];

export type FeatureType = {
  _id: string;
  title: string;
  desc: string;
  img: string;
  slug: string;
  comments: CommentType[];
  createdAt: string;
}[];

export type TopPostsType = {
  _id: string;
  title: string;
  tags: string[];
  slug: string;
  createdAt: string;
}[];

export type MostReadPostType = {
  _id: string;
  title: string;
  views: number;
  slug: string;
}[];

export type FeedType = {
  _id: string;
  title: string;
  desc: string;
  category: string;
  img: string;
  isFeatured: boolean;
  likes: string[];
  dislikes: string[];
  likeCount: number;
  dislikeCount: number;
  tags: string[];
  views: number;
  author: AuthorType;
  savedBy: string[];
  savedCount: number;
  slug: string;
  comments: CommentType[];
  createdAt: string;
  updatedAt: string;
}[];

export type RoleType = 'admin' | 'user';

type AuthorType = {
  _id: string;
  name: string;
  username: string;
  image?: string;
  role: RoleType;
  fromGoogle?: boolean;
};

export type PostTypeWithAuthor = {
  _id: string;
  author: AuthorType;
};

export type CommentType = {
  _id: string;
  content: string;
  post: PostTypeWithAuthor;
  author: AuthorType;
  replies?: ReplyType[];
  likeCount: number;
  likes: string[];
  createdAt: string;
  updatedAt: string;
};

export type ReplyType = {
  _id: string;
  content: string;
  comment: CommentType;
  post: PostTypeWithAuthor;
  author: AuthorType;
  parentReply: string | null;
  replies: ReplyType[] | [];
  likeCount: number;
  likes: string[];
  createdAt: string;
  updatedAt: string;
};

export type CommentImageType = {
  _id: string;
  name: string;
  username: string;
  image: string;
  role: RoleType;
};

export type UserDetailType = {
  _id: string;
  name: string;
  username: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  country: string;
  bio: string;
  about?: string;
  image?: string;
  banner?: string;
  savedPosts: string[];
  tokenExpiration: number;
  fromGoogle: boolean;
  providerId?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type UserType = {
  _id: string;
  name: string;
  username: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  country: string;
  bio: string;
  about?: string;
  image?: string;
  banner?: string;
  savedPosts: string[];
  tokenExpiration: number;
  fromGoogle: boolean;
  providerId?: string;
  isActive: boolean;
  role: RoleType;
  createdAt: string;
  updatedAt: string;
};

export type MenuItemType = {
  id: number;
  url: string;
  label: string;
}[];

export type FooterMenuType = {
  id: number;
  url: string;
  label: string;
}[];

export type SocialMenuType = {
  id: number;
  url: string;
  icon: IconType;
}[];

type TagType = {
  id: number;
  label: string;
};

export type PostItemType = {
  id: string;
  img: string;
  title: string;
  slug: string;
  desc: string;
  category: string;
  isFeatured: boolean;
  createdAt: string;
}[];

export type PostDetailType = {
  id: string;
  title: string;
  slug: string;
  desc: string;
  category: string;
  tags: string[];
  isFeatured: boolean;
  author: {
    id: string;
    name: string;
    username: string;
    img: string;
  };
  likes: string[];
  dislikes: string[];
  likeCount: number;
  dislikeCount: number;
  comments: CommentsType;
  views: number;
  createdAt: string;
  updatedAt: string;
};

export type RelatedTagType = TagType[];

export type CommentsType = {
  id: string;
  desc: string;
  user: {
    name: string;
    img: string;
  };
  createdAt: string;
  updatedAt: string;
}[];

export type CategoryItemsType = {
  id: string;
  name: string;
  total: number;
}[];

export type FeedItemTypes = {
  id: string;
  img: string;
  title: string;
  slug: string;
  createdAt: string;
}[];

export type TagItemType = TagType[];

export type RelatedPostType = {
  id: string;
  img: string;
  title: string;
  slug: string;
  category: string;
  createdAt: string;
}[];

export type TopPostType = {
  id: string;
  title: string;
  slug: string;
  category: string[];
  createdAt: string;
}[];

export type LoginInputType = {
  id: string;
  name: string;
  type?: HTMLInputTypeAttribute;
  label: string;
  placeholder: string;
}[];

export type RegisterInputType = {
  id: string;
  name: string;
  type?: HTMLInputTypeAttribute;
  label: string;
  placeholder: string;
}[];

export type ResetInputType = {
  id: string;
  name: string;
  type: HTMLInputTypeAttribute;
  label: string;
  placeholder: string;
}[];

type PasswordInput = {
  id: string;
  name: string;
  type: HTMLInputTypeAttribute;
  label: string;
  placeholder: string;
};

export type PasswordInputType = PasswordInput[];

export type FilterType = {
  id: string;
  name: string;
  value: string;
  label: string;
}[];

export type CategoryOptionType = {
  id: string;
  name: string;
}[];

export type AccountMenuType = {
  id: string;
  url: string;
  icon: string;
  label: string;
}[];

export type CommentUserType = {
  id: string;
  img: string;
}[];

export type ContactInfoItemType = {
  id: number;
  icon: string;
  phone?: string;
  email?: string;
  location?: string;
  text: string;
}[];

export type aboutItemType = {
  id: number;
  title: string;
  subtitle: string;
}[];

export type TeamType = {
  id: number;
  img: string;
  name: string;
  role: string;
  socials: IconType[];
}[];

export type PartnerItemType = {
  id: number;
  imgSrc: string;
  alt?: string;
}[];

export type CountrySelectType = {
  flag: string;
  label: string;
  region: string;
  value: string;
};

export type RegisterUserType = {
  name: string;
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
  phone?: Value;
  dateOfBirth?: Date | null;
  country?: string;
  bio?: string;
  about?: ReactQuill.Value;
  image?: string;
  banner?: string;
};

export type AuthCrendentialType = {
  identifier: string;
  password: string;
};

export type ResetPasswordType = {
  password: string;
  passwordConfirm: string;
};

export type UpdatePasswordType = {
  passwordCurrent: string;
  password: string;
  passwordConfirm: string;
};

export type UpdateUserDataType = {
  name?: string;
  username?: string;
  email?: string;
  phone?: Value;
  dateOfBirth?: Date | null;
  country?: CountrySelectType | string;
  bio?: string;
  about?: ReactQuill.Value;
  image?: string;
  banner?: string;
};

export type ProfileMenuItems = {
  id: string;
  label: string;
}[];

export type PostErrorType = {
  desc?: string;
};

export type ContactFormData = {
  message: ReactQuill.Value | undefined;
  phone: Value | undefined;
};

export type ContactFormError = {
  message?: string;
  phone?: string;
};

export type CommentFiltersType = {
  id: sortType;
  label: string;
}[];
