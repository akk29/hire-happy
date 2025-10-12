
export const LIMIT = `?limit=`
export const OFFSET = `&offset=`
export const LIMIT_OFFSET = (limit,offset) => `${LIMIT}${limit}${OFFSET}${offset}`

const API_V1 = `/api/v1`

/**ADMIN BACKEND URLS */
export const GET_ALL_USERS_ADMIN =  `${API_V1}/admin/users`
export const GET_ALL_APPLICATIONS_ADMIN =  `${API_V1}/admin/applications`
export const ADMIN_LOGIN = `${API_V1}/admin/login`

/**USER BACKEND URLS */
export const GET_ALL_APPLICATIONS =  `${API_V1}/applications`
export const GET_ALL_JOBS = `${API_V1}/jobs`
export const USER_LOGIN = `${API_V1}/login`
export const USER_SIGNUP = `${API_V1}/signup`
export const FORGOT_PASSWORD = `${API_V1}/forgot`
export const VERIFY_PASSWORD = `${API_V1}/verify`
export const CHANGE_PASSWORD = `${API_V1}/change-password`