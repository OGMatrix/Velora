import axios from "axios";
import { ApiError, checkTokenFromApi, handleApiErrors } from "../api";
import { useStorage } from "@vueuse/core";

async function login(email: string, password: string) {
    try {
        const options = {
            headers: { 'Origin': 'https://velora.ogmatrix.net', 'Content-Type': 'application/json' },
            responseType: 'json',
            data: {
                userIdent: email,
                pwd: password,
            }
        };
    
        const response = await axios.post(`${import.meta.env.VITE_AUTH_API_HOST}/auth/signIn`, options);
        if (response && response.data) {
            localStorage.setItem('token', response.data.user.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            const welcome = useStorage('welcome', false);
            welcome.value = true;
            return Promise.resolve(true)
        } else {
            return Promise.resolve(false)
        }
    } catch (err) {
        const apiError: ApiError = handleApiErrors(err)
        return Promise.reject(apiError)
    }
}

async function registerUser(username: string, email: string, password: string) {
    try {
        const options = {
            headers: { 'Origin': 'https://velora.ogmatrix.net', 'Content-Type': 'application/json' },
            responseType: 'json'
        };

        const data = {
            username,
            email,
            pwd: password,
            otp: true,
            dsgvoAccepted: "1",
            dsgvoTxt: "DSGVO-Text",
            siteHost: 'https://velora.ogmatrix.net'
        }
    
        const response = await axios.post(`${import.meta.env.VITE_AUTH_API_HOST}/user`, data, options);
        if (response && response.data) {
            localStorage.setItem('token', response.data.user.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            const welcome = useStorage('welcome', false);
            welcome.value = true;
            return Promise.resolve(true)
        } else {
            return Promise.resolve(false)
        }
    } catch (err) {
        const apiError: ApiError = handleApiErrors(err)
        return Promise.reject(apiError)
    }
}

async function verifyOtp(email: string, value: string) {
    try {
        const options = {
            headers: { 'Origin': 'https://velora.ogmatrix.net' }
        };
    
        const response = await axios.get(`${import.meta.env.VITE_AUTH_API_HOST}/user/verify-otp/${email}/${value}`, options);
        if (response && response.data) {
            await checkTokenFromApi(response)
            localStorage.setItem("user", JSON.stringify(response.data.user));
            return Promise.resolve(true)
        } else {
            return Promise.resolve(false)
        }
    } catch (err) {
        const apiError: ApiError = handleApiErrors(err)
        return Promise.reject(apiError)
    }
}

async function sendOtp(email: string) {
    try {
        const options = {
            headers: { 'Origin': 'https://velora.ogmatrix.net' }
        };
    
        const response = await axios.get(`${import.meta.env.VITE_AUTH_API_HOST}/user/new-verify-otp/${email}`, options);
        if (response && response.data.success) {
            return Promise.resolve(true)
        } else {
            return Promise.resolve(false)
        }
    } catch (err) {
        const apiError: ApiError = handleApiErrors(err)
        return Promise.reject(apiError)
    }
}

async function checkUsername(username: string) {
    try {
        const options = {
            headers: { 'Origin': 'https://velora.ogmatrix.net' }
        };
    
        const response = await axios.get(`${import.meta.env.VITE_AUTH_API_HOST}/user/checkUsername/${username}`, options);
        if (response) {
            return Promise.resolve(!response.data.success)
        } else {
            return Promise.resolve(false)
        }
    } catch (err) {
        const apiError: ApiError = handleApiErrors(err)
        return Promise.reject(apiError)
    }
}

async function checkEmail(email: string) {
    try {
        const options = {
            headers: { 'Origin': 'https://velora.ogmatrix.net' }
        };
    
        const response = await axios.get(`${import.meta.env.VITE_AUTH_API_HOST}/user/checkEmail/${email}`, options);
        if (response) {
            return Promise.resolve(!response.data.success)
        } else {
            return Promise.resolve(false)
        }
    } catch (err) {
        const apiError: ApiError = handleApiErrors(err)
        return Promise.reject(apiError)
    }
}

export {login, registerUser, verifyOtp, sendOtp, checkUsername, checkEmail}