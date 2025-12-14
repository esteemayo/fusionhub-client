import ReplyBaseForm from '../replyBaseForm/ReplyBaseForm';
import { ReplyFormProps } from '../../types';

import './ReplyForm.scss';

const ReplyForm = (props: ReplyFormProps) => {
  return (
    <ReplyBaseForm
      {...props}
      size={props.size ?? 'sm'}
      classPrefix='reply-form'
      submitLabel='Submit reply'
      updateLabel='Update reply'
    />
  );
};

export default ReplyForm;
