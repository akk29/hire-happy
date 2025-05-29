import axios from "axios";
import Store from "../store";
import config from "../main/config";
import { ROUTES } from "../utils";

const AxiosInstance = axios.create({
    baseURL: config.base_url,
    timeout: 600000,
    headers: {
        "Content-Type": "application/json",
    },
});

const getCurrentUserAuthToken = () => {
    const state = Store.getState();
    const { auth } = state;
    if (auth.userinfo) {
        return auth.userinfo.token;
    } else {
        return "";
    }
};

// const getCurrentConfigVersion = () => {
//   const state = Store.store.getState();
//   const { ApplicationReducer } = state;
//   if (ApplicationReducer.config) {
//     return ApplicationReducer.config.version;
//   } else {
//     return "";
//   }
// };

const AuthAxiosInstance = () => {
    const token = getCurrentUserAuthToken();
    const AxiosInstanceAuth = axios.create({
        baseURL: config.base_url,
        timeout: 60000,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    //   AxiosInstanceAuth.interceptors.response.use(
    //     (response) => {
    //       const currentConfig = getCurrentConfigVersion();
    //       const updatedConfig = response.headers["config-version"];
    //       if (updatedConfig) {
    //         if (updatedConfig !== currentConfig) {
    //           if (updatedConfig[0] === "1") {
    //             localStorage.clear();
    //             Store.store.dispatch({
    //               type: APP_UPDATE,
    //               msg: "App Updated. Please Login again",
    //             });
    //             Store.store.dispatch({ type: LOGOUT });
    //           } else {
    //             axios
    //               .post(
    //                 `${BACKEND_URL}${CONFIG_URL}`,
    //                 {},
    //                 {
    //                   headers: {
    //                     "Content-Type": "application/json",
    //                     device: "web",
    //                     Authorization: `bearer ${token}`,
    //                   },
    //                 }
    //               )
    //               .then((res) => {
    //                 const config = res.data.data.getData;
    //                 if (currentConfig !== config.configVerion) {
    //                   Store.store.dispatch({
    //                     type: CONFIG,
    //                     payload: configCache(config),
    //                   });
    //                 }
    //                 return response;
    //               })
    //               .catch((err) => {
    //                 localStorage.clear();
    //                 Store.store.dispatch({
    //                   type: APP_UPDATE,
    //                   msg: "App Updated. Please Login again",
    //                 });
    //                 Store.store.dispatch({ type: LOGOUT });
    //               });
    //           }
    //         }
    //       }
    //       return response;
    //     },
    //     (error) => {
    //       return Promise.reject(error);
    //     }
    //   );

    AxiosInstanceAuth.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            if (error.response.data.code === 401) {
                localStorage.clear();
                window.location.href = ROUTES.SIGNIN_ROUTE;
                // Store.store.dispatch({ type: API_ERROR, error: "Session Expired" });
                // Store.store.dispatch({ type: LOGOUT });
            }
            return Promise.reject(error);
        }
    );

    return AxiosInstanceAuth;
};

const axiosAuthenticated = AuthAxiosInstance()

export { AxiosInstance, AuthAxiosInstance, axiosAuthenticated };
