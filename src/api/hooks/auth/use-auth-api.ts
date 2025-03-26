import { useApi } from "./use-api.ts";
import { routes } from "../../../utils/constants/api.ts";
import AuthClientStore from "../../auth-client-store.ts";
import { ApiMethod } from "../../../utils/api/types.ts";
let debouncedPromise: Promise<unknown> | null;
let debouncedResolve: (...args: unknown[]) => void;
let debouncedReject: (...args: unknown[]) => void;
let timeout: number;

export const useAuthApi = () => {
  const { sendRequest, sendProtectedRequest } = useApi();

  const login = async (email: string, password: string, rememberMe: boolean) => {
    const response = await sendRequest(ApiMethod.POST, routes.auth.login, {
      email,
      password,
      rememberMe,
    });

    AuthClientStore.setAccessToken(response.accessToken);
    // console.log("stored 1")
    AuthClientStore.setRefreshToken(response.refreshToken);

    return response;
  };

  const logout = () => {
    AuthClientStore.removeAccessToken();
    AuthClientStore.removeRefreshToken();
  };
  const refreshTokens = async () => {
    clearTimeout(timeout);
    if (!debouncedPromise) {
      debouncedPromise = new Promise((resolve, reject) => {
        debouncedResolve = resolve;
        debouncedReject = reject;
      });
    }

    timeout = setTimeout(() => {
      const executeLogic = async () => {
        const response = await sendProtectedRequest(
          ApiMethod.POST,
          routes.auth.refreshTokens,
          undefined,
          AuthClientStore.getRefreshToken(),
        );

        AuthClientStore.setAccessToken(response.accessToken);
        AuthClientStore.setRefreshToken(response.refreshToken);
      };

      executeLogic().then(debouncedResolve).catch(debouncedReject);

      debouncedPromise = null;
    }, 200);

    return debouncedPromise;
  };

  const sendAuthGuardedRequest = async (
    userIsNotAuthenticatedCallback: () => void,
    method: ApiMethod,
    path: string,
    body?: any,
    init?: RequestInit,
  ) => {
    try {
      return await sendProtectedRequest(method, path, body, undefined, init);
    } catch (e) {
      if ((e as Response)?.status === 401) {
        try {
          await refreshTokens();
        } catch (e) {
          userIsNotAuthenticatedCallback();
          throw e;
        }
        return await sendProtectedRequest(method, path, body, undefined, init);
      }

      throw e;
    }
  };

  const me = (userIsNotAuthenticatedCallback: () => void) => {
    return sendAuthGuardedRequest(
      userIsNotAuthenticatedCallback,
      ApiMethod.GET,
      routes.auth.me,
    ) as Promise<User>;
  };

  return { login, logout, me, sendAuthGuardedRequest };
};