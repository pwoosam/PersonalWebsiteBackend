import './controllers/emailController';
//import './connection';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as cors from 'cors';
import * as methodOverride from 'method-override';
import { RegisterRoutes } from './routes';

const app = express();

const whitelist = ['https://www.patrickwoosam.com', 'http://localhost:9000'];
const corsOptions: cors.CorsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.options('*', cors(corsOptions));

app.use('/docs', express.static(__dirname + '/swagger-ui'));
app.use('/swagger.json', (req, res) => {
    res.sendFile(__dirname + '/swagger.json');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());

RegisterRoutes(app);

console.log('Starting server on port 3000...');
app.listen(3000);