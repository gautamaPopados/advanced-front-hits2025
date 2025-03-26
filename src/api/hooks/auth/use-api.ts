import { toast } from "react-toastify";
import { ApiMethod } from "../../../utils/api/types";
import { BASE_URL } from "../../../utils/constants/api";
import AuthClientStore from "../../auth-client-store";

const sendRequest = (
  method: ApiMethod,
  path: string,
  body?: any,
  authToken?: string | null,
  init?: RequestInit,
) => {
  const requestMethod = method;

  return fetch(BASE_URL + path, {
    method,
    ...(body && { body: JSON.stringify(body) }),
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(authToken && { Authorization: `Bearer ${authToken}` }),
      ...init?.headers,
    },
  })
    .then(async (response) => {
      if (response.status >= 400) {
        let data;
        try {
          data = await response.json();
        } catch (e) {
          data = { message: 'Произошла ошибка' };
        }
        throw { response, data };
      }

      const data = await response.json();

      if (['POST', 'PUT', 'DELETE'].includes(requestMethod)) {
        toast.success(data.message || 'Успешно', { className: 'toast-success' });
      }

      return data;
    })
    .catch((error) => {
      if (error.response) {
        const { response, data } = error;
        const status = response.status;

        if (['POST', 'PUT', 'DELETE'].includes(requestMethod)) {
          const message = data.message || 'Ошибка';
          if (status >= 400 && status < 500) {
            toast.warning(message, { className: 'toast-warning' });
          } else if (status >= 500) {
            toast.error(message, { className: 'toast-error' });
          }
        }
      } else if (['POST', 'PUT', 'DELETE'].includes(requestMethod)) {
        toast.error('Ошибка сети', { className: 'toast-error' });
      }

      throw error;
    });
};
  
  const sendProtectedRequest = (
    method: ApiMethod,
    path: string,
    body?: any,
    refreshToken?: string,
    init?: RequestInit,
  ) => {
    const authToken = refreshToken
      ? AuthClientStore.getRefreshToken()
      : AuthClientStore.getAccessToken();
    if (!authToken) {
      throw new Error("No auth token found");
    }
  
    return sendRequest(method, path, body, authToken, init);
  };
  
  export const useApi = () => {
    return { sendRequest, sendProtectedRequest };
  };