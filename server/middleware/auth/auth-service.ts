import { NextFunction, Request, Response } from 'express';
import {ResponseMsg} from "../../api/interfaces";
import axios from "axios";

require("dotenv").config();

export const verifyToken = async(req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);
    try {
        const res = await axios.get(`${process.env.AUTH_API}/user/user-profile`, {headers: { 'Origin': 'https://velora.ogmatrix.net', 'Authorization': `Bearer ${token}` }});
        if (res.data) {
            console.log(res.data);
        }
        return next()
    } catch (e) {
        console.log(e)
        const responseMsg: ResponseMsg = {
            success: false,
            msg: e
        }
        return res.status(403).json(responseMsg)
    }
}

export const authService = {
    verifyToken
};
