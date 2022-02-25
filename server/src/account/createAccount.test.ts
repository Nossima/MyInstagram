import { FakeRequest } from 'global/api';
import AccountAPI from './api';
import {
  set, connect, connection, Connection
} from 'mongoose';
import {
  BadRequest, Ok
} from 'global/result';
import { error } from 'global/error';

describe('register route', () => {
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
        username: 'TestUsed',
        email: 'testused@test.test',
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
      .withBody({
        username: 'Test',
        email: 'test@test.test',
        password: 'Test1234',
        birthDate: 865807200
      });

    await new AccountAPI()
      .register(req)
      .then((res) =>
        expect(res).toEqual(Ok({
          account: {
            birthDate: 865807200,
            email: 'test@test.test',
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            id: expect.any(String),
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            password: expect.any(String),
            role: '0',
            username: 'Test',
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            following: [],
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            followedBy: [],
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            posts: [],
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            friendRequests: []
          }
        }))
      );
  });

  it('should return an error if a field is missing', async () => {

    const req = new FakeRequest()
      .withBody({
        email: 'test@test.test',
        password: 'Test1234',
        birthDate: 865807200
      });

    await new AccountAPI()
      .register(req)
      .then((res) =>
        expect(res).toEqual(BadRequest([
          error('username', 'error.username.required')
        ]))
      );
  });

  it('should return an error if the username is already used', async () => {

    const req1 = new FakeRequest()
      .withBody({
        username: 'TestUsed',
        email: 'testused@test.test',
        password: 'Test1234',
        birthDate: 865807200
      });

    await new AccountAPI()
      .register(req1);

    const req = new FakeRequest()
      .withBody({
        username: 'TestUsed',
        email: 'testnotused@test.test',
        password: 'Test1234',
        birthDate: 865807200
      });

    await new AccountAPI()
      .register(req)
      .then((res) =>
        expect(res).toEqual(BadRequest([
          error('register', 'error.register.username.used')
        ]))
      );
  });

  it('should return an error if the email is already used', async () => {

    const req1 = new FakeRequest()
      .withBody({
        username: 'TestUsed',
        email: 'testused@test.test',
        password: 'Test1234',
        birthDate: 865807200
      });

    await new AccountAPI()
      .register(req1);

    const req = new FakeRequest()
      .withBody({
        username: 'TestNotUsed',
        email: 'testused@test.test',
        password: 'Test1234',
        birthDate: 865807200
      });

    await new AccountAPI()
      .register(req)
      .then((res) =>
        expect(res).toEqual(BadRequest([
          error('register', 'error.register.email.used')
        ]))
      );
  });

  it('should return an error if the email is invalid', async () => {

    const req = new FakeRequest()
      .withBody({
        username: 'Test1',
        email: 'test@test',
        password: 'Test1234',
        birthDate: 865807200
      });

    await new AccountAPI()
      .register(req)
      .then((res) =>
        expect(res).toEqual(BadRequest([
          error('email', 'error.email.invalid')
        ]))
      );
  });

  it('should return an error if the password has not 8 characters at minimum', async () => {

    const req = new FakeRequest()
      .withBody({
        username: 'Test1',
        email: 'test@test.test',
        password: 'Test123',
        birthDate: 865807200
      });

    await new AccountAPI()
      .register(req)
      .then((res) =>
        expect(res).toEqual(BadRequest([
          error('password', 'error.password.short')
        ]))
      );
  });
});
