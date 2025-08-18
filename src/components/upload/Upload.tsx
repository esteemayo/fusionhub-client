import { useMemo, useRef } from 'react';
import { toast } from 'react-toastify';
import { IKContext, IKUpload } from 'imagekitio-react';

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

const apiEndpoint = `${baseUrl}/api/v1/uploads/auth`;

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
  type,
  label,
  setData,
  setProgress,
  children,
}: UploadProps) => {
  const ref = useRef<HTMLInputElement | null>(null);

  const onError = (err: unknown) => {
    console.log(err);
    toast.error('Image upload failed!');
  };

  const onSuccess = (res) => {
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
    ref.current?.click();
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
          ref={ref}
          accept={`${type}/*`}
          className='upload__control'
        />
      </div>
      {children && <div onClick={handleClick}>{children}</div>}
    </IKContext>
  );
};

export default Upload;
