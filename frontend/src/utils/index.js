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

/**FILLER */
export const AUTH_DATA = "authData"

export const FILLER = {
  AUTH_DATA
}