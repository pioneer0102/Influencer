import { BASE_URL } from "src/constants";

const jwtServiceConfig = {
  signIn: BASE_URL + '/api/auth/login',
  signUp: BASE_URL + '/api/auth/register',
  accessToken: BASE_URL + '/api/auth/access-token',
  updateUser: BASE_URL + '/api/auth/user/update',
};

export default jwtServiceConfig;
