import jwt from "jsonwebtoken";
import { DecodeToken } from "../utillity/tokenutility.js";

export default (req, res, next) => {
    let token = req.headers['token'] || req.cookies['token'];

    // Decode the token using your utility function
    let decoded = DecodeToken(token);

    if (decoded === null) {
        return res.status(401).send({ status: "fail", message: "Unauthorized" });
    }

    // If the token is valid, set user data in headers for further processing
    req.headers.email = decoded.email;
    req.headers.user_id = decoded.user_id;

    next();
};
