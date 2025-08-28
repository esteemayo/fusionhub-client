import { IKContext, IKImage } from 'imagekitio-react';

import { GoogleImageProps } from '../types';

const urlEndpoint = import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT;

const GoogleImage = ({
  src,
  width,
  height,
  alt = 'avatar',
  className,
}: GoogleImageProps) => {
  return (
    <IKContext urlEndpoint={urlEndpoint}>
      <IKImage
        src={src}
        width={width}
        height={height}
        loading='lazy'
        lqip={{ active: true, quality: 20 }}
        transformation={[{ width: width as string, height: height as string }]}
        alt={alt}
        className={className}
      />
    </IKContext>
  );
};

export default GoogleImage;
