import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as cors from 'cors';
import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';
import router from './router';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

dotenv.config();

const port = process.env.PORT || 3000;

const corsWhitelist = process.env.CORS_WHITELIST;
const corsOptions = { origin: corsWhitelist };
app.use(cors(corsOptions));

app.use(router);

app.listen(port, () => {
  console.log(`API is running on port ${port}.`);

  mongoose.set('toObject', {
    transform: (doc, ret) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment,no-param-reassign,@typescript-eslint/no-unsafe-call
      ret.id = ret._id.toString();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment,no-param-reassign
      delete ret._id;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment,no-param-reassign
      delete ret.__v;
    }
  });

  mongoose.connect(process.env.DB_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(() => console.log('connected to database'))
    .catch((e) => console.log('Cannot connect to database: ', e));
});
