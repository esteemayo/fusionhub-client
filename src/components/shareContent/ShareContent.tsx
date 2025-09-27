import { ShareContentProps } from '../../types';

const ShareContent = ({ url, text, title }: ShareContentProps) => {
  return (
    <div className='share-content '>
      <div className='share-content__container'>
        <h4>{title || 'Share this link'}</h4>
        <p>{text}</p>
        <input
          type='text'
          value={url}
          readOnly
          onClick={(e) => (e.target as HTMLInputElement).select()}
        />
      </div>
    </div>
  );
};

export default ShareContent;
