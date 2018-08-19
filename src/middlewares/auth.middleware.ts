import { Request, Response, NextFunction } from 'express';

export default function (req: Request, res: Response, next: NextFunction) {
    if (req.session && req.session.username) {
        next();
    } else {
        res.redirect(301, '/login');
    }
};