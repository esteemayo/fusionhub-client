import React, { HTMLInputTypeAttribute } from 'react';
import { Action } from 'redux';
import ReactQuill, { DeltaStatic, EmitterSource } from 'react-quill-new';
import { IconType } from 'react-icons/lib';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { Value } from 'react-phone-number-input';
import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
  UseMutationResult,
} from '@tanstack/react-query';

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
}

export interface LabelProps {
  id?: string;
  label?: string;
  validate?: boolean;
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
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
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
  isLoading?: boolean;
  disabled?: boolean;
  color: 'dark' | 'primary' | 'outline';
  onClick?(e: React.MouseEvent<HTMLButtonElement>): void;
}

export interface FormButtonProps {
  label: string;
  loading?: boolean;
  disabled?: boolean;
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

export interface FeedProps {
  _id: string;
  img: string;
  title: string;
  slug: string;
  createdAt: string;
}

export interface RelatedPostProps {
  _id: string;
  img: string;
  title: string;
  slug: string;
  category: string;
  createdAt: string;
}

export interface TopPostProps {
  _id: string;
  title: string;
  slug: string;
  tags: string[];
  createdAt: string;
  index: number;
}

export interface AuthLinkProps {
  url: string;
  label: string;
  urlLabel: string;
}

export interface FilterItemProps {
  id: string;
  name: string;
  value: string;
  label: string;
}

export type CategoriesType = {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}[];

export type CategoryItemType = {
  category: string;
  count: number;
};

export type CategoryItemProps = CategoryItemType;

export type TagProps = {
  _id: string;
  count: number;
};

export interface TagItemProps {
  label: string;
  count?: number;
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

export interface PostDescriptionProps {
  value: ReactQuill.Value | undefined;
  register: UseFormRegister<FieldValues>;
  error?: string;
  errors: FieldErrors;
  onChangeDesc?(
    value: ReactQuill.Value | undefined,
    delta: DeltaStatic,
    source: EmitterSource,
    editor: ReactQuill.UnprivilegedEditor
  ): void;
}

export interface PostImageProps {
  options: CategoriesType | undefined;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  onChangeFile(e: React.ChangeEvent<HTMLInputElement>): void;
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
  query: string | null;
  file: File | undefined;
  cover: File | undefined;
  onChangeFile(e: React.ChangeEvent<HTMLInputElement>): void;
  onChangeCover(e: React.ChangeEvent<HTMLInputElement>): void;
}

export interface ProfileDetailsProps {
  _id: string;
  name: string;
  email: string;
  username: string;
  bio: string;
  country: string;
  dateOfBirth?: string;
  createdAt: string;
}

export interface ProfileFeaturesProps {
  query: string | null;
  userId: string;
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
  post: string;
  author: AuthorType;
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
  comment: string;
  post: string;
  author: AuthorType;
  createdAt: string;
}

export interface ProfileImageProps {
  name: string;
  bio: string;
  image?: string;
  ref: React.LegacyRef<HTMLInputElement>;
  file: File | undefined;
  onOpen(e: React.MouseEvent<HTMLButtonElement>): void;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
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

export interface ISearch {
  (): {
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
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
    isSaved: boolean;
    error: Error | null;
    savedPosts: PostType[] | undefined;
    saveMutation: UseMutationResult<unknown, unknown, void, unknown>;
    handleSave(): void;
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

export interface IDate {
  (dateTime: string): {
    formattedDate: string;
  };
}

export interface HeaderProps {
  posts: RandomPostType[] | undefined;
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

export interface ActionMenusProps {
  post: PostType;
}

export interface ActionMenuProps {
  label: string;
  isLoading?: boolean;
  onAction(): void;
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
  postAuthorId: string;
}

export interface IComment {
  (postId: string): {
    isPending: boolean;
    isPendingUser: boolean;
    error: Error | null;
    errorUser: Error | null;
    data: CommentType[] | undefined;
    commentUsers: CommentImageType[] | undefined;
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

export interface CommentProps {
  postAuthorId: string;
  isPending: boolean;
  isPendingUser: boolean;
  isLoading: boolean;
  error: Error | null;
  errorUser: Error | null;
  comments: CommentType[] | undefined;
  commentUsers: CommentImageType[] | undefined;
  commentToShow: number;
  mutation: UseMutationResult<unknown, unknown, string, unknown>;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  onClick(e: React.MouseEvent<HTMLButtonElement>): void;
  onUpdate?(commentId: string): void;
  onOpen(): void;
}

export interface CommentCardProps {
  postAuthorId: string;
  comment: CommentType;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  onUpdate?(commentId: string): void;
  onOpen(): void;
}

export interface RepliesProps {
  postAuthorId: string;
  replies?: ReplyType[];
  onUpdate(content: string, replyId: string): void;
}

export interface ReplyProps {
  _id: string;
  content: string;
  post: string;
  author: AuthorType;
  postAuthorId: string;
  createdAt: string;
  updatedAt: string;
  onUpdate(content: string, replyId: string): void;
}

export interface ReplyFormProps {
  content: string;
  isOpen: boolean;
  isLoading: boolean;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  onCancel(e: React.MouseEvent<HTMLButtonElement>): void;
  onSubmit(e: React.FormEvent<HTMLFormElement>): void;
  ref: React.LegacyRef<HTMLTextAreaElement> | undefined;
}

export interface CommentFormProps {
  value: string;
  isLoading?: boolean;
  isPending?: boolean;
  comments: CommentType[];
  onChange: React.Dispatch<React.SetStateAction<string>>;
  onSubmit(e: React.FormEvent<HTMLFormElement>): void;
  ref: React.LegacyRef<HTMLTextAreaElement> | undefined;
}

export interface PostDetailActionProps {
  post: PostType;
}

export interface PostInfoProps {
  username: string;
  authorId: string;
  userId: string | undefined;
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
  isSaved: boolean;
  currentUser: CurrentUserType;
  saveMutation: UseMutationResult<unknown, unknown, void, unknown>;
  onClick(): void;
}

export interface SavePostProps {
  hasSaved: boolean;
  isLoading: boolean;
  currentUser: CurrentUserType;
  onSave(): void;
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
  role: 'admin' | 'user';
}

export interface AuthState {
  user: CurrentUserType | null;
  name?: string;
  isLoading: boolean;
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
};

export type FeatureType = {
  _id: string;
  title: string;
  desc: string;
  img: string;
  slug: string;
  comments: CommentType[];
  createdAt: string;
};

export type TopPostsType = {
  _id: string;
  title: string;
  tags: string[];
  slug: string;
  createdAt: string;
};

type AuthorType = {
  _id: string;
  name: string;
  username: string;
  image?: string;
};

export type CommentType = {
  _id: string;
  content: string;
  post: string;
  author: AuthorType;
  replies?: ReplyType[];
  createdAt: string;
  updatedAt: string;
};

export type ReplyType = {
  _id: string;
  content: string;
  comment: string;
  post: string;
  author: AuthorType;
  createdAt: string;
  updatedAt: string;
};

export type CommentImageType = {
  _id: string;
  name: string;
  image: string;
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
  isActive: boolean;
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

export type CategoryType = {
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

export type PasswordInputType = {
  id: string;
  name: string;
  type: HTMLInputTypeAttribute;
  label: string;
  placeholder: string;
}[];

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
  image?: File;
  banner?: File;
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
  name: string;
  username: string;
  email: string;
  phone?: Value;
  dateOfBirth?: Date | null;
  country: CountrySelectType | string;
  bio: string;
  about?: ReactQuill.Value;
};

export type ProfileMenuItems = {
  id: string;
  label: string;
}[];
