'use strict'

import express from 'express';
import routes from './routes.js';
import bodyParser from 'body-parser';

const app = express();

routes(app, express);

app.use(express.static(__dirname + '/client'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// start listening to requests on port 8000
const port = Number(process.env.PORT || 8000);
app.listen(port, () => console.log(`server listening on port ${port}`));
export default app;
