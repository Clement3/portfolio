import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';

class AuthController 
{
    public getLogin (req: Request, res: Response) 
    {
        res.render('login');
    }

    public postLogin (req: Request, res: Response) 
    {
        let adminPassword: string = String(process.env.ADMIN_PASSWORD);

        if (req.body.username === process.env.ADMIN_USER && bcrypt.compareSync(req.body.password, adminPassword)) {

            if (req.session) {
                req.session.username = process.env.ADMIN_USER;
            }

            res.redirect('/admin');
        } else {
            res.render('login', { error: 'Nom d\'utilisateur ou mot de passe incorrect.' });
        }
    }

    public logout (req: Request, res: Response, next: NextFunction) 
    {
        if (req.session) {
            req.session.destroy( (err) => {
                if (err) return next(err);
                res.redirect(301, '/login');
            });
        } else {
            res.redirect('back');
        }
    }
}

export default new AuthController;
