import { Router } from 'express';
import bcrypt from 'bcrypt';
import HomeController from '../controllers/home.controller';
import AuthController from '../controllers/auth.controller';

const router: Router = Router();

router.get('/', HomeController.index);

// Login
router.get('/login', AuthController.getLogin);
router.post('/login', AuthController.postLogin);

router.get('/logout', AuthController.logout);

// Encode password
router.get('/bcrypt', () => {
    bcrypt.hash('admin', 10, (err, hash) => {
        if (err) {
            console.log('Bcrypt not working.');
        } else {
            console.log(`The hashed password is : ${hash}`);
        }
    });
});

export default router;