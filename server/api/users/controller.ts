import {Response, Request} from "express"
import { ResponseMsg } from "../interfaces";


export async function insertFilm(req: Request, res: Response) {
    try {
        if (!req.body) {
            let responseMsg: ResponseMsg = {
                success: false,
                msg: "body missing",
                data: {},
              };
        
              return res.status(500).json(responseMsg);
        }
        const {title} = req.body
    
        if (title) {
          let responseMsg: ResponseMsg = {
            success: true,
            msg: "Success",
            data: {
            },
          };
    
          return res.status(200).json(responseMsg);
        } else {
          let responseMsg: ResponseMsg = {
            success: false,
            msg: "title missing",
            data: {},
          };
    
          return res.status(500).json(responseMsg);
        }
      } catch (e) {
        console.log(e);
        let responseMsg: ResponseMsg = {
          success: false,
          msg: e,
          data: { errors: e },
        };
    
        return res.status(500).json(responseMsg);
      }
}