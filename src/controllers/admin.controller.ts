import { Request, Response } from 'express';

class AdminController 
{
    public index(req: Request, res: Response) 
    {
        res.render('admin/index', { message: 'Administration' });
    }
}

export default new AdminController;
