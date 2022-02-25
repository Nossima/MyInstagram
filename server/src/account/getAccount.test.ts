import { FakeRequest } from 'global/api';
import AccountAPI from './api';
import {
  set, connect, connection, Connection
} from 'mongoose';
import {
  BadRequest, NotFound, Ok
} from 'global/result';
import { error } from 'global/error';

describe('getting an account by username', () => {
  let db: Connection;

  beforeAll(async () => {
    set('toObject', {
      transform: (doc, ret) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment,no-param-reassign,@typescript-eslint/no-unsafe-call
        ret.id = ret._id.toString();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment,no-param-reassign
        delete ret._id;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment,no-param-reassign
        delete ret.__v;
      }
    });

    await connect('mongodb://localhost:27017/testdb', {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    db = connection;

    const req = new FakeRequest()
      .withBody({
        username: 'TestGet',
        email: 'testget@test.test',
        password: 'Test1234',
        birthDate: 865807200
      });

    await new AccountAPI()
      .register(req);
  });

  afterAll(async () => {
    await db.dropDatabase();
    await db.close();
  });

  it('should return no error', async () => {

    const req = new FakeRequest()
      .withParams({ username: 'TestGet' });

    await new AccountAPI()
      .getByUsername(req)
      .then((res) =>
        expect(res).toMatchObject(Ok({
          account: {
            birthDate: 865807200,
            email: 'testget@test.test',
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            __v: expect.anything(),
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            _id: expect.anything(),
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            password: expect.anything(),
            role: '0',
            username: 'TestGet'
          }
        }))
      );
  });

  it('should return an error if there is no username given', async () => {

    const req = new FakeRequest();

    await new AccountAPI()
      .getByUsername(req)
      .then((res) =>
        expect(res).toEqual(BadRequest([
          error('username', 'error.username.required')
        ]))
      );
  });

  it('should return an error if the user is not found', async () => {

    const req = new FakeRequest()
      .withParams({ username: 'Test1' });

    await new AccountAPI()
      .getByUsername(req)
      .then((res) =>
        expect(res).toEqual(NotFound([
          error('user', 'error.user.unknown')
        ]))
      );
  });
});
