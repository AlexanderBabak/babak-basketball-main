import { post } from "./baseFetch";
import { User } from "./auth/AuthDto";

const _postImage = async (
  user: User,
  formData: FormData | undefined
): Promise<string> => {
  // @ts-ignore
  return post("api/Image/SaveImage", formData, user.token);
};

export const getUploadedImage = async (imageFile: File) => {
  const formData = new FormData();
  formData.append("file", imageFile);
  const user = JSON.parse(`${localStorage.getItem("user")}`);
  return await _postImage(user, formData);
};
