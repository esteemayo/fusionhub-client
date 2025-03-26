import { IKContext, IKImage } from 'imagekitio-react';

import { ImageProps } from '../types';

const Image = ({ alt, src, width, height, className }: ImageProps) => {
  return (
    <IKContext urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT}>
      <IKImage
        path={src}
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

export default Image;
