import User from "../models/User";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();


interface JwtPayload {
    user: {
        id: string;
        email: string;
        role: string;
        status: string;
    };
}

async function AuthMiddleware(req, res, next) {

    try {
        let token = req.headers.authorization;
        if (!token) {
            return  res.status(401).json({
                message: "Unauthorized"
            })
        }
        token = token.split(" ")[1];
        const Decode = jwt.verify(token, process.env.JWT_SECRET || 'SECRET') as JwtPayload;
        const user = await User.findById(Decode.user.id);
        if (!user) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }
        req.user = user;
        next();
    } catch (e) {
        next(e);
    }

}

export default AuthMiddleware;