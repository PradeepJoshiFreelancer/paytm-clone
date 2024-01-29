export interface SigninBody {
  username: string;
  password: string;
}

export interface SignupBody {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}



export interface CurrentUserResponse {
  username: string;
  firstName: string;
  lastName: string;
  balance: number
}
