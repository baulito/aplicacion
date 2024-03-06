import { User } from "../../../models/user";
export type LoginResponse = ErrorLoginResponse | SuccessLoginResponse;

export interface ErrorLoginResponse {
    error?: string;
    message?: string;
}

export interface SuccessLoginResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  usuario: User;
}

