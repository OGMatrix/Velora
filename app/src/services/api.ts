export interface ApiResponse {
    success: boolean;
    msg: string;
    errors?: [];
    data?: any
}

export interface ApiError {
    statusCode: number;
    statusText: string;
    dataErr?: string;
    dataMsg?: string;
}

function checkTokenFromApi(res: any) {
    if (res.data && res.data.user && res.data.user.newToken) {
        localStorage.setItem('token', res.data.user.token)
    }
}

const handleApiErrors = (errResponse: any): ApiError => {
    return errResponse
}

export { handleApiErrors, checkTokenFromApi }