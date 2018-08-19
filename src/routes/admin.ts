import { Router } from 'express';
import AdminController from '../controllers/admin.controller';
import ProjectsController from '../controllers/projects.controller';

const router: Router = Router();

router.get('/', AdminController.index);
router.get('/projects', ProjectsController.index);
router.get('/projects/create', ProjectsController.create);
router.post('/projects/create', ProjectsController.store);
router.get('/projects/:postId', ProjectsController.show);
router.get('/projects/:postId/edit', ProjectsController.edit);
router.put('/projects/:postId/edit', ProjectsController.update);
router.delete('/projects/:postId', ProjectsController.delete);

export default router;