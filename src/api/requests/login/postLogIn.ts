import { instance } from '../../instance';

export const postLogIn = async (email: string, password: string, rememberMe: boolean) => {
  const response = await instance.post('/Auth/login', { email: email, password: password, rememberMe: rememberMe });

  return response.data;
};