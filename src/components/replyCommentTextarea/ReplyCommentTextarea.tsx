import { ReplyCommentTextareaProps } from '../../types';

import './ReplyCommentTextarea.scss';

const ReplyCommentTextarea = ({
  value,
  placeholder,
  onChange,
}: ReplyCommentTextareaProps) => {
  return (
    <textarea
      name='content'
      id='content'
      value={value || ''}
      placeholder={placeholder}
      rows={5}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default ReplyCommentTextarea;
