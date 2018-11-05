import './controllers/emailController';
//import './connection';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as cors from 'cors';
import * as methodOverride from 'method-override';
import * as glob from 'glob';
import { RegisterRoutes } from './routes';

const app = express();

const corsOptions: cors.CorsOptions = {
  origin: function (origin, callback) {
    if (origin.endsWith('.patrickwoosam.com')) {
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

app.use('/bgimage/:size', (req, res) => {
  const size = req.params.size;
  const filenames = glob.sync(`${__dirname}/assets/bgimage-*.jpg`).sort((a, b) => {
    const aMatches = <string[]>a.match(/[0-9]+/g);
    const aSize = parseInt(aMatches[0]);
    const bMatches = <string[]>b.match(/[0-9]+/g);
    const bSize = parseInt(bMatches[0]);

    return aSize - bSize;
  });
  const filename = filenames.find(item => {
    const matches = <string[]>item.match(/[0-9]+/g);
    if (matches.length == 1) {
      if (size <= parseInt(matches[0])) {
        return true;
      }
    }
    return false;
  });
  if (filename) {
    res.sendFile(filename);
  } else {
    res.sendFile(filenames[filenames.length - 1]);
  }
});

RegisterRoutes(app);

console.log('Starting server on port 3000...');
app.listen(3000);