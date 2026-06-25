export function makeLogoTransparent(img: HTMLImageElement): string {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return img.src;
  
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  ctx.drawImage(img, 0, 0);
  
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    
    const brightness = (r + g + b) / 3;
    
    if (brightness < 30) {
      data[i + 3] = 0;
    } else if (brightness < 60) {
      data[i + 3] = Math.floor((brightness - 30) / 30 * 255);
    }
  }
  
  ctx.putImageData(imageData, 0, 0);
  return canvas.toDataURL('image/png');
}

export function loadLogoWithTransparentBackground(src: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const result = makeLogoTransparent(img);
        resolve(result);
      } catch (e) {
        resolve(src);
      }
    };
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = src;
  });
}
