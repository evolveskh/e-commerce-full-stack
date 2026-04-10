import cloudinary from "../lib/cloudinary";

export const uploadImage = (buff: Buffer, folder: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder }, (error, result) => {
        if (error || !result) return reject(error);
        resolve(result.secure_url);
      })
      .end(buff);
  });
};
