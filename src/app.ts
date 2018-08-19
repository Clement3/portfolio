import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import nunjucks from 'nunjucks';
import webRoutes from './routes/web';
import apiRoutes from './routes/api';
import adminRoutes from './routes/admin';
import authMiddleware from './middlewares/auth.middleware';
import session from 'express-session';
import mongoStoreFactory from 'connect-mongo';

// Load .env file
dotenv.config();

class App 
{
    public app: express.Application;
    private mongoUrl: string = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;  

    constructor() 
    {
        this.app = express();
        this.sessionSetup();        
        this.config();
        this.mongoSetup();
        this.viewEngine();
    }
    
    private config(): void 
    {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));

        this.app.use('/', webRoutes);
        this.app.use('/api', apiRoutes);
        this.app.use('/admin', [ authMiddleware, adminRoutes ]);
    }

    private mongoSetup(): void 
    {
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true });
    }

    private viewEngine(): void 
    {
        nunjucks.configure(__dirname + '/views', {
            autoescape: true,
            express: this.app
        });

        this.app.set('view engine', 'html');

    }

    private sessionSetup(): void 
    {
        let MongoStore = mongoStoreFactory(session);

        this.app.use(session({
            name : 'app.sid',
            secret: 'i-love-husky',
            resave: false,
            saveUninitialized: false,
            store: new MongoStore({ 
                url: this.mongoUrl
            })
        }));
    }
}

export default new App().app;
