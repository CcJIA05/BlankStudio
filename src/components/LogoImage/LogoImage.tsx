import { useState, useEffect, CSSProperties } from 'react';
import { loadLogoWithTransparentBackground } from '../utils/logoUtils';

interface LogoImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
}

export default function LogoImage({ src, alt, className, style }: LogoImageProps) {
  const [processedSrc, setProcessedSrc] = useState<string>(src);

  useEffect(() => {
    let mounted = true;
    loadLogoWithTransparentBackground(src)
      .then(result => {
        if (mounted) {
          setProcessedSrc(result);
        }
      })
      .catch(() => {
        // 失败时使用原图
      });
    return () => {
      mounted = false;
    };
  }, [src]);

  return (
    <img
      src={processedSrc}
      alt={alt}
      className={className}
      style={{ mixBlendMode: 'normal', ...style }}
    />
  );
}
