const path = require('path');
const root = 'api';
const version = 'v1';

export default {
  emailSignupVerification: path.join(root, version, 'email/signup/verification/'),
  passwordResetCode: path.join(root, version, 'password/reset-code/'),
  passwordReset: path.join(root, version, 'password/reset/'),
  tenants: path.join(root, version, 'tenants/'),
  tenantInvited: path.join(root, version, 'tenants/invited/'),
  token: path.join(root, version, 'token/'),
  tokenToRefresh: path.join(root, version, 'token/refresh/'),
  tokenToVerify: path.join(root, version, 'token/verify/'),
  tokenToRevoke: path.join(root, version, 'token/revoke/'),
  users: path.join(root, version, 'users/'),
};
