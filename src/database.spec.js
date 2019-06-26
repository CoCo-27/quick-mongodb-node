/* eslint-env jest */
jest.mock('mongodb', () => ({
  MongoClient: {
    connect: jest.fn(),
  },
}));

const mongodb = require('mongodb');
const database = require('.');

const { MONGO_URL } = process.env;

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
  process.env.MONGO_URL = MONGO_URL;
});

beforeEach(() => {
  process.env.MONGO_URL = 'mongodb://test@jest:8920';
});

it('should connect after close, and not reconnect before', async () => {
  const collection = jest.fn();
  const db = jest.fn(() => ({ collection }));
  const close = jest.fn();

  mongodb.MongoClient.connect.mockReturnValue({ db, close });

  await database.getCollection('testdb/test');
  await database.getCollection('testdb/test');
  await database.close();
  await database.getCollection('testdb/test');

  expect(mongodb.MongoClient.connect).toBeCalledTimes(2);
  expect(close).toBeCalledTimes(1);
  expect(mongodb.MongoClient.connect.mock.calls[0][0]).toEqual('mongodb://test@jest:8920');
  expect(collection).toBeCalledTimes(3);
  expect(collection.mock.calls[0]).toEqual(['test']);
  expect(db).toBeCalledTimes(3);
  expect(db.mock.calls[0]).toEqual(['testdb']);
});
