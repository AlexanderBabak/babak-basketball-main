export const BASE_URL = process.env.REACT_APP_BASE_API_URL;

const request = async (url: string, data: any, token: string | undefined) => {
  const headersToken = token ? { Authorization: `Bearer ${token}` } : {};
  const headersMultiPart =
    typeof data.body === "string"
      ? { "Content-type": "application/json;charset=utf-8" }
      : {};

  const response = await fetch(url, {
    ...data,
    headers: {
      ...headersToken,
      ...headersMultiPart,
    },
  });

  return response;
};

export const get = (url: string, body?: string | FormData, token?: string) =>
  request(`${BASE_URL}${url}`, { method: "GET" }, token);

export const post = (url: string, body: string | FormData, token?: string) => {
  return request(`${BASE_URL}${url}`, { method: "POST", body }, token);
};
export const put = (url: string, body: string, token: string) => {
  return request(`${BASE_URL}${url}`, { method: "PUT", body }, token);
};
export const remove = (url: string, token: string) =>
  request(`${BASE_URL}${url}`, { method: "DELETE" }, token);
