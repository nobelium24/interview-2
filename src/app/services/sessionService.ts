import jsonWebToken from 'jsonwebtoken';
import { JWT_SECRET } from '../../core/constants';


export class SessionServices {
    constructor(){}
    generateToken = (payload:{email:string, role: 'USER' | 'ADMIN' }): string =>{
        try {
            const token = jsonWebToken.sign(payload, JWT_SECRET, {expiresIn: '24h'});
            return token;
        } catch (error) {
            console.error(error);
            throw {message: 'Error generating token'};
        }
    }

    verifyToken = (token: string): {email: string, role: 'USER' | 'ADMIN'} => {
        try {
            const payload = jsonWebToken.verify(token, JWT_SECRET) as {email: string, role: 'USER' | 'ADMIN'};
            return payload;
        } catch (error) {
            console.error(error);
            throw {message: 'Error verifying token'};
        }
    }
    
}