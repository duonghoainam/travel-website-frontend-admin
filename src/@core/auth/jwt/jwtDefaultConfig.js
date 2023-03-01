// ** Auth Endpoints
export default {
  endPoint: 'http://103.88.122.20:8000',

  loginEndpoint: 'api/v1/auth/jwt/login',
  registerEndpoint: '/jwt/register',
  refreshEndpoint: '/jwt/refresh-token',
  logoutEndpoint: '/jwt/logout',

  // ** This will be prefixed in authorization header with token
  // ? e.g. Authorization: Bearer <token>
  tokenType: 'Bearer',

  // ** Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: 'access_token',
  storageRefreshTokenKeyName: 'refreshToken'
}
