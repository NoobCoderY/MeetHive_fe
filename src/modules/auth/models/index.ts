export interface IUser {
  email: string;
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  group: [];
  profile_picture: string | null;
}

export interface IToken {
  accessToken: string;
  refreshToken: string;
}

export interface IAuthResponse {
  user: IUser | null;
  token: IToken | null;
}
