import { useMemo } from 'react';

import Upload from '../upload/Upload';
import TextQuill from '../textQuill/TextQuill';

import { PostTextBoxProps } from '../../types';

import './PostTextBox.scss';

const PostTextBox = ({
  label,
  value,
  imageProgress,
  videoProgress,
  error,
  onChangeDesc,
  onChangeImageData,
  onChangeVideoData,
  onChangeImageProgress,
  onChangeVideoProgress,
}: PostTextBoxProps) => {
  const isDisabledImg = useMemo(() => {
    return 0 < imageProgress && imageProgress < 100;
  }, [imageProgress]);

  const isDisabledVideo = useMemo(() => {
    return 0 < videoProgress && videoProgress < 100;
  }, [videoProgress]);

  return (
    <div className='post-text-box'>
      <TextQuill
        label={label}
        value={value}
        onChange={(value) => onChangeDesc(value)}
        error={error}
        validate
      />
      <div className='post-text-box__upload'>
        <Upload
          disabled={isDisabledImg}
          setData={onChangeImageData}
          setProgress={onChangeImageProgress}
        >
          <button
            type='button'
            disabled={isDisabledImg}
            className='post-text-box__upload--img'
          >
            🌆
          </button>
        </Upload>
        <Upload
          type='video'
          disabled={isDisabledVideo}
          setData={onChangeVideoData}
          setProgress={onChangeVideoProgress}
        >
          <button
            type='button'
            disabled={isDisabledVideo}
            className='post-text-box__upload--video'
          >
            ▶️
          </button>
        </Upload>
      </div>
    </div>
  );
};

export default PostTextBox;
