import { mergeRefs } from 'react-merge-refs';
import { toast } from 'react-toastify';
import { IKContext, IKUpload } from 'imagekitio-react';
import { useMemo, useRef } from 'react';
import type { UploadResponse } from 'imagekit-javascript/dist/src/interfaces/UploadResponse';

import Label from '../label/Label';

import { UploadProps } from '../../types';

import './Upload.scss';

const devEnv = import.meta.env.MODE !== 'production';
const {
  VITE_DEV_URL_ENDPOINT,
  VITE_PROD_URL_ENDPOINT,
  VITE_IMAGEKIT_URL_ENDPOINT,
  VITE_IMAGEKIT_PUBLIC_KEY,
} = import.meta.env;

const publicKey = VITE_IMAGEKIT_PUBLIC_KEY;
const urlEndpoint = VITE_IMAGEKIT_URL_ENDPOINT;

const baseUrl = devEnv ? VITE_DEV_URL_ENDPOINT : VITE_PROD_URL_ENDPOINT;

const apiEndpoint = `${baseUrl}/uploads/auth`;

const authenticator = async () => {
  try {
    const response = await fetch(apiEndpoint);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    const { signature, expire, token, publicKey } = data;
    return { signature, expire, token, publicKey };
  } catch (error: unknown) {
    throw new Error(`Authentication request failed: ${error}`);
  }
};

const Upload = ({
  id,
  type = 'image',
  label,
  disabled,
  ref,
  setData,
  setProgress,
  children,
}: UploadProps) => {
  const localRef = useRef<HTMLInputElement | null>(null);

  const onError = (err: unknown) => {
    console.log(err);
    toast.error('Image upload failed!');
  };

  const onSuccess = (res: UploadResponse) => {
    console.log(res);
    setData(res);
  };

  const onProgressUpload = (
    progress: ProgressEvent<XMLHttpRequestEventTarget>
  ) => {
    console.log(progress);
    setProgress(Math.round(progress.loaded / progress.total) * 100);
  };

  const handleClick = () => {
    localRef.current?.click();
  };

  const uploadClasses = useMemo(() => {
    return !children ? 'upload show' : 'upload hide';
  }, [children]);

  return (
    <IKContext
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <div className={uploadClasses}>
        <Label id={id} label={label} />
        <IKUpload
          id={id}
          useUniqueFileName
          onError={onError}
          onSuccess={onSuccess}
          onUploadProgress={onProgressUpload}
          ref={mergeRefs([localRef, ref])}
          accept={`${type}/*`}
          disabled={disabled}
          className='upload__control'
        />
      </div>
      {children && <div onClick={handleClick}>{children}</div>}
    </IKContext>
  );
};

export default Upload;
