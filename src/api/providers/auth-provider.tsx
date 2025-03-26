import { ReactNode, createContext, useState } from "react";
import { useAuthApi } from "../hooks/auth/use-auth-api";
import { ApiMethod } from "../../utils/api/types";
import AuthClientStore from "../auth-client-store";

type ContextType = {
  isAuthenticated: boolean;
  login(email: string, password: string, rememberMe: boolean): Promise<void>;
  logout(): void;
  me(): Promise<User>;
  sendAuthGuardedRequest(
    method: ApiMethod,
    path: string,
    body?: any,
    init?: RequestInit,
  ): Promise<unknown>;
};

const AuthContext = createContext<ContextType | undefined>(undefined);

function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return AuthClientStore.getAccessToken() != "undefined" && AuthClientStore.getAccessToken() != null;
  });  const {
    login: authLogin,
    logout: authLogout,
    me: authMe,
    sendAuthGuardedRequest: authSendAuthGuardedRequest,
  } = useAuthApi();

  const login = async (email: string, password: string, rememberMe: boolean) => {
    try {
      await authLogin(email, password, rememberMe);
      setIsAuthenticated(true);
    } catch (e) {
      setIsAuthenticated(false);
      throw e;
    }
  };

  const logout = () => {
    authLogout();
    setIsAuthenticated(false);
  };

  const me = async () => {
    const user = await authMe(() => {
      setIsAuthenticated(false);
    });
    setIsAuthenticated(true);

    return user;
  };

  const sendAuthGuardedRequest = async (
    method: ApiMethod,
    path: string,
    body?: any,
    init?: RequestInit,
  ) => {
    return authSendAuthGuardedRequest(
      () => {
        setIsAuthenticated(false);
      },
      method,
      path,
      body,
      init,
    );
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        me,
        sendAuthGuardedRequest,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
