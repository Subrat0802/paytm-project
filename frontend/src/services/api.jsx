const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const authEndpoint = {
    SIGNUP_API : BASE_URL + "/user/signup",
    SIGNIN_API : BASE_URL + "/user/signin",
    GET_USER : BASE_URL + "/user/me",
}