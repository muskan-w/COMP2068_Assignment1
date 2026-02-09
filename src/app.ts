// access libraries
import express, {Application, Request, Response} from 'express';
import bodyParser from 'body-parser';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import mongoose from 'mongoose';
import rateLimit from 'express-rate-limit'; // rate limiting - see readMe for documentation
import dotenv from 'dotenv'; 
dotenv.config(); // load environment variables from .env file

// controller 
import furnitureRouter from './routes/furnitureRoutes';

const app: Application = express();

// global configuration
app.use(bodyParser.json());

// url dispatching 
app.use('/api/furniture', furnitureRouter);

// database connection 
const dbUri = process.env.DB!; 

mongoose.connect(dbUri)
.then(() =>  console.log('Connected to MongoDB'))
.catch((err: Error) =>  console.log(`Connection Failed: ${err.message}`));


// swagger configuration
const options = { 
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Couch Potato API',
            version: '1.0.0',
    }
}, 
    apis: ['./dist/controllers/*.js'] // location of api methods // location of api methods
};

const openApiSpecs = swaggerJsDoc(options); 
app.use('/api-docs', swaggerUi.serve);

// hardcoded swagger css and js links 
app.get('/api-docs', (req: Request, res: Response) => {
    const html: string = swaggerUi.generateHTML(openApiSpecs, {
        customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
        customJsUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
    });
    res.send(html);
});

// rate limiter - check ReadMe for documentation/source code please (www.npmjs.com)

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // limit each IP to 100 requests per windowMs
    standardHeaders: 'draft-8', 
    legacyHeaders: false, 
    ipv6Subnet: 56,

})

app.use(limiter); // apply rate limiter to all requests

app.listen(4000, () => { console.log('Server is running on port 4000')});