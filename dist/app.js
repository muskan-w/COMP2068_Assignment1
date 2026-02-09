"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// access libraries
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit")); // rate limiting - see readMe for documentation
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // load environment variables from .env file
// controller 
const furnitureRoutes_1 = __importDefault(require("./routes/furnitureRoutes"));
const app = (0, express_1.default)();
// global configuration
app.use(body_parser_1.default.json());
// url dispatching 
app.use('/api/furniture', furnitureRoutes_1.default);
// database connection 
const dbUri = process.env.DB;
mongoose_1.default.connect(dbUri)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log(`Connection Failed: ${err.message}`));
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
const openApiSpecs = (0, swagger_jsdoc_1.default)(options);
app.use('/api-docs', swagger_ui_express_1.default.serve);
// hardcoded swagger css and js links 
app.get('/api-docs', (req, res) => {
    const html = swagger_ui_express_1.default.generateHTML(openApiSpecs, {
        customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
        customJsUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
    });
    res.send(html);
});
// rate limiter - check ReadMe for documentation/source code please (www.npmjs.com)
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // limit each IP to 100 requests per windowMs
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    ipv6Subnet: 56,
});
app.use(limiter); // apply rate limiter to all requests
app.listen(4000, () => { console.log('Server is running on port 4000'); });
