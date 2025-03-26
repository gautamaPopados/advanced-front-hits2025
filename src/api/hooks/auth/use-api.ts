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
    return fetch(BASE_URL + path, {
      method,
      ...(body && { body: JSON.stringify(body) }),
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(authToken && { Authorization: `Bearer ${authToken}` }),
        ...init?.headers,
      },
    }).then((response) => {
      if (
        `${response.status}`.startsWith("4") ||
        `${response.status}`.startsWith("5")
      ) {
        throw response;
      }
  
      return response.json();
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