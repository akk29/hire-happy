/** RESPONSE CODES */
export const SUCCESS = 200;
export const CREATED = 201;

/** ROLES */
export const RECRUITER_ROLE = "Recruiter";
export const ADMIN_ROLE = "Admin";
export const SUPER_USER_ROLE = "SuperUser";
export const CANDIDATE_ROLE = "Candidate";

/**ROUTES */
export const INDEX_ROUTE = "/";
export const LOGOUT_ROUTE = "/logout";
export const SIGNIN_ROUTE = "/signin";
export const ADMIN_SIGNIN_ROUTE = "/admin/signin";
export const SIGNUP_ROUTE = "/signup";
export const FORGOT_ROUTE = "/forgot";
export const POST_JOB_ROUTE = "/postjob";
export const EDIT_JOB_ROUTE = "/editjob";
export const VERIFY_TOKEN_ROUTE = "/verify/:uuid64/:token";
export const JOB_ROUTE = "/jobs/:pgno";
export const APPLICATION_ROUTE = "/applications/:pgno";
export const USERS_ROUTE = "/users/:pgno";
export const NOT_FOUND_ROUTE = "*";

export const ROUTES = {
  INDEX_ROUTE,
  LOGOUT_ROUTE,
  SIGNIN_ROUTE,
  ADMIN_SIGNIN_ROUTE,
  SIGNUP_ROUTE,
  FORGOT_ROUTE,
  POST_JOB_ROUTE,
  EDIT_JOB_ROUTE,
  VERIFY_TOKEN_ROUTE,
  JOB_ROUTE,
  APPLICATION_ROUTE,
  USERS_ROUTE,
  NOT_FOUND_ROUTE,
};

/** REQUETS Methods */

export const GET = "get"
export const POST = "post"
export const DELETE = "delete"
export const PATCH = "patch"

/**OTHERS */
export const AUTH_DATA = "authData"
export const CONTENT_TYPE = "Content-Type"
export const APPLICATION_JSON = "application/json"
export const VALIDATION_ERRORS = 'Validation Errors'
export const AUTHORIZATION = 'Authorization'

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
  AUTHORIZATION
}