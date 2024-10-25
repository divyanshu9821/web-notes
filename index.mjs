import express from 'express';
import body_parser from 'body-parser';
import config from './config.mjs';
import router from './app/api_routes.mjs';

const app = express();
const app_port = config.app.port;

app.use(body_parser.json());
app.use('/',router);
app.use(express.static('./app/public/'));
app.listen(app_port, () =>{
    console.log(`Listening on port ${app_port}`);
});