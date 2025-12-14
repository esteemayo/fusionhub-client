import ReplyBaseForm from '../replyBaseForm/ReplyBaseForm';
import { ReplyCommentFormProps } from '../../types';

import './ReplyCommentForm.scss';

const ReplyCommentForm = (props: ReplyCommentFormProps) => {
  return (
    <ReplyBaseForm
      {...props}
      size={props.size ?? 'md'}
      classPrefix='reply-comment-form'
      submitLabel='Submit reply'
      updateLabel='Update comment'
    />
  );
};

export default ReplyCommentForm;
