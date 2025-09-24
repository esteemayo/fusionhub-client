import { ArticleMenuListItemProps } from '../../types';

import './ArticleMenuListItem.scss';

const ArticleMenuListItem = ({ label, onClick }: ArticleMenuListItemProps) => {
  return (
    <li className='article-menu-list-item'>
      <button type='button' onClick={onClick}>
        {label}
      </button>
    </li>
  );
};

export default ArticleMenuListItem;
