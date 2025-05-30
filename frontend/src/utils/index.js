/** RESPONSE CODES */
export const SUCCESS = 200;
export const CREATED = 201;

/** ROLES */
export const RECRUITER_ROLE = 'Recruiter';
export const ADMIN_ROLE = 'Admin';
export const SUPER_USER_ROLE = 'SuperUser';
export const CANDIDATE_ROLE = 'Candidate';

/**ROUTES */
export const ADMIN_SIGNIN_ROUTE = '/admin/signin';
export const APPLICATION_ROUTE = '/applications/:pgno';
export const EDIT_JOB_ROUTE = '/editjob';
export const FORGOT_ROUTE = '/forgot';
export const INDEX_ROUTE = '/';
export const JOB_ROUTE = '/jobs/:pgno';
export const LOGOUT_ROUTE = '/logout';
export const NOT_FOUND_ROUTE = '*';
export const POST_JOB_ROUTE = '/postjob';
export const SIGNIN_ROUTE = '/signin';
export const SIGNUP_ROUTE = '/signup';
export const USERS_ROUTE = '/users/:pgno';
export const VERIFY_TOKEN_ROUTE = '/verify/:uuid64/:token';

export const ROUTES = {
  ADMIN_SIGNIN_ROUTE,
  APPLICATION_ROUTE,
  EDIT_JOB_ROUTE,
  FORGOT_ROUTE,
  INDEX_ROUTE,
  JOB_ROUTE,
  LOGOUT_ROUTE,
  NOT_FOUND_ROUTE,
  POST_JOB_ROUTE,
  SIGNIN_ROUTE,
  SIGNUP_ROUTE,
  USERS_ROUTE,
  VERIFY_TOKEN_ROUTE,
};

/** REQUETS Methods */

export const GET = 'get';
export const POST = 'post';
export const DELETE = 'delete';
export const PATCH = 'patch';

/**OTHERS */
export const AUTH_DATA = 'authData';
export const AUTHORIZATION = 'Authorization';
export const APPLICATION_JSON = 'application/json';
export const CONTENT_TYPE = 'Content-Type';
export const VALIDATION_ERRORS = 'Validation Errors';

export const BEARER = 'Bearer';

export const FILLER = {
  SUCCESS,
  CREATED,
  RECRUITER_ROLE,
  ADMIN_ROLE,
  SUPER_USER_ROLE,
  CANDIDATE_ROLE,
  GET,
  POST,
  DELETE,
  PATCH,
  AUTH_DATA,
  CONTENT_TYPE,
  APPLICATION_JSON,
  VALIDATION_ERRORS,
  AUTHORIZATION,
  BEARER,
};
