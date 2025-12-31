import { client } from './client';

export interface RegisterDto {
  email: string;
  password: string;
  name: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export const authApi = {
  register: async (data: RegisterDto): Promise<AuthResponse> => {
    const response = await client.post('/auth/register', data);
    return response.data;
  },

  login: async (data: LoginDto): Promise<AuthResponse> => {
    const response = await client.post('/auth/login', data);
    return response.data;
  },
};



