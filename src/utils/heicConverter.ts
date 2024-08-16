import heic2any from 'heic2any';

const megabyte = 1048576;

export const convertHeic = async (imageFile: File) => {
  const result = await heic2any({
    blob: imageFile,
    toType: 'image/jpeg',
    quality: megabyte / imageFile.size,
  });
  return new File([result], imageFile.name + '.jpg', {
    type: 'image/jpeg',
  });
};
