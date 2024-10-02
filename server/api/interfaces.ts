export interface User {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
}

export interface LoginResponse {
    user: User;
}

export interface ResponseMsg {
    success: false | true;
    msg: string;
    data?: any;
    linkList?: any[];
    token?;
}
