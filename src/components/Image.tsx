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
  const [cleanPath, queryString] = src.split('?');
  const queryParams = queryString
    ? Object.fromEntries(new URLSearchParams(queryString))
    : {};

  return (
    <IKContext urlEndpoint={urlEndpoint}>
      <IKImage
        key={src}
        path={cleanPath}
        queryParameters={queryParams}
        width={width}
        height={height}
        loading='lazy'
        decoding='async'
        lqip={{ active: true, quality: 20 }}
        transformation={[{ width: width as string, height: height as string }]}
        alt={alt ?? ''}
        className={className}
        aria-hidden={alt ? undefined : true}
      />
    </IKContext>
  );
};

export default Image;
