import mongoose from 'mongoose';
import { Request, Response } from 'express';
import { ProjectModel } from '../models/project.model';

const Project = mongoose.model('Project', ProjectModel);

class ProjectsController 
{
    public index (req: Request, res: Response) 
    {
        Project.find({}, (err, projects) => {
            if (err) {
                res.send(err);
            }
            res.render('admin/projects/index', { projects });
        });
    }

    public create (req: Request, res: Response) 
    {
        res.render('admin/projects/create');
    }

    public store (req: Request, res: Response) 
    {
        let newProject = new Project(req.body);

        newProject.save((err, project) => {
            if (err) {
                res.send(err);
            }    
            res.json(project);
        });        
    }

    public show (req: Request, res: Response) 
    {
        Project.findById(req.params.projectId, (err, project) => {
            if (err) {
                res.send(err);
            }
            res.json(project);
        });        
    }

    public edit (req: Request, res: Response)
    {
        Project.findById(req.params.projectId, (err, project) => {
            if (err) {
                res.send(err);
            }
            res.render('admin/projects/edit', { project });
        });        
    }

    public update (req: Request, res: Response) 
    {           
        Project.findOneAndUpdate(
            { _id: req.params.projectId }, req.body, { new: true }, (err, project) => {
            if (err) {
                res.send(err);
            }
            res.json(project);
        });
    }    

    public delete (req: Request, res: Response) 
    {           
        Project.remove({ _id: req.params.projectId }, (err) => {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Successfully deleted post!'});
        });
    }    
}

export default new ProjectsController;
