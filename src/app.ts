// access libraries
import express, {Application, Request, Response} from 'express';
import bodyParser from 'body-parser';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import mongoose from 'mongoose';

// controller 
import furnitureRouter from './routes/furnitureRoutes';

const app: Application = express();

// global configuration
app.use(bodyParser.json());

// database connection 
const dbUri = process.env.DB!; 

mongoose.connect(dbUri)
.then(() => { console.log('Connected to MongoDB')})
.catch((err: Error) => { console.log(`Connection Failed: ${err.message}`) });

// url dispatching 
app.use('/api/furniture', furnitureRouter);

// swagger configuration
const options = { 
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Couch Potato API',
            version: '1.0.0',
    }
}, 
    apis: ['./dist/controllers/*.js'] // location of api methods
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

app.listen(4000, () => { console.log('Server is running on port 4000')});