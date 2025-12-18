import { IKContext, IKImage } from 'imagekitio-react';
import { ImageProps } from '../types';

const urlEndpoint = import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT;

const Image = ({
  alt = 'image',
  src,
  width,
  height,
  className,
}: ImageProps) => {
  if (typeof src !== 'string' || src.trim() === '') {
    return null;
  }

  const [path, queryString] = src.split('?');

  if (!path || path.trim() === '') {
    return null;
  }

  const queryParams = queryString
    ? Object.fromEntries(new URLSearchParams(queryString))
    : {};

  return (
    <IKContext urlEndpoint={urlEndpoint}>
      <IKImage
        key={path}
        path={path}
        queryParameters={queryParams}
        width={width}
        height={height}
        loading='lazy'
        decoding='async'
        lqip={{ active: true, quality: 20 }}
        transformation={
          width || height
            ? [{ width: String(width), height: String(height) }]
            : undefined
        }
        alt={alt}
        className={className}
        aria-hidden={!alt}
      />
    </IKContext>
  );
};

export default Image;
