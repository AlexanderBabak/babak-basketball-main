import { post } from "./baseFetch";
import { User } from "./auth/AuthDto";

const _postImage = async (
  user: User,
  formData: FormData | undefined
): Promise<string> => {
  // @ts-ignore
  const response = await post("api/Image/SaveImage", formData, user.token);
  return response.json();
};

export const getUploadedImage = async (user: User, imageFile: File) => {
  const formData = new FormData();
  formData.append("file", imageFile);
  return await _postImage(user, formData);
};
