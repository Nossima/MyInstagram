import { FakeRequest } from 'global/api';
import AccountAPI from './api';
import {
  set, connect, connection, Connection
} from 'mongoose';
import {
  BadRequest, Ok, Unauthorized
} from 'global/result';
import { error } from 'global/error';

describe('login route', () => {
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
        username: 'TestLogin',
        email: 'testlogin@test.test',
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

    const req1 = new FakeRequest()
      .withBody({
        username: 'TestLogin',
        email: 'testlogin@test.test',
        password: 'Test1234',
        birthDate: 865807200
      });

    await new AccountAPI()
      .register(req1);

    const req = new FakeRequest()
      .withBody({
        username: 'testlogin@test.test',
        password: 'Test1234'
      });

    await new AccountAPI()
      .login(req)
      .then((res) =>
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        expect(res).toEqual(Ok({ token: expect.anything() }))
      );
  });

  it('should return an error if there is a field missing', async () => {

    const req = new FakeRequest()
      .withBody({ username: 'TestLogin' });

    await new AccountAPI()
      .login(req)
      .then((res) =>
        expect(res).toEqual(BadRequest([
          error('password', 'error.password.required')
        ]))
      );
  });

  it('should return an error if the user is not found', async () => {

    const req1 = new FakeRequest()
      .withBody({
        username: 'TestLogin',
        email: 'testlogin@test.test',
        password: 'Test1234',
        birthDate: 865807200
      });

    await new AccountAPI()
      .register(req1);

    const req = new FakeRequest()
      .withBody({
        username: 'TestLogi',
        password: 'Test1234'
      });

    await new AccountAPI()
      .login(req)
      .then((res) =>
        expect(res).toEqual(Unauthorized([
          error('login', 'error.login.account')
        ]))
      );
  });

  it('should return an error if the password is incorrect', async () => {

    const req1 = new FakeRequest()
      .withBody({
        username: 'TestLogin',
        email: 'testlogin@test.test',
        password: 'Test1234',
        birthDate: 865807200
      });

    await new AccountAPI()
      .register(req1);

    const req = new FakeRequest()
      .withBody({
        username: 'TestLogin',
        password: 'Test123'
      });

    await new AccountAPI()
      .login(req)
      .then((res) =>
        expect(res).toEqual(Unauthorized([
          error('login', 'error.login.password')
        ]))
      );
  });
});
