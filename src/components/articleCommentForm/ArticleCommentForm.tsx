import ReplyBaseForm from '../replyBaseForm/ReplyBaseForm';
import { ArticleCommentFormProps } from '../../types';

import './ArticleCommentForm.scss';

const ArticleCommentForm = (props: ArticleCommentFormProps) => {
  return (
    <ReplyBaseForm
      {...props}
      size={props.size ?? 'lg'}
      maxRows={5}
      classPrefix='article-comment-form'
      submitLabel='Submit comment'
      placeholder='Write your thoughts here... Share your opinion or feedback about the article.'
    />
  );
};

export default ArticleCommentForm;
