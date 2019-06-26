const mongodb = require('mongodb');

const { MongoClient, ObjectId } = mongodb;

let _client; // eslint-disable-line no-underscore-dangle

const getClient = async () => {
  if (_client) return _client;
  if (!process.env.MONGO_URL) throw new Error('MONGO_URL env variable must be set!');

  _client = await MongoClient.connect(process.env.MONGO_URL, { useNewUrlParser: true });

  return _client;
};

const getDb = async (options) => {
  const innerOptions = {};
  if (typeof options === 'string') {
    innerOptions.db = options;
  } else {
    Object.assign(innerOptions, options);
  }

  const client = await getClient(innerOptions);

  const db = await client.db(options.db);

  return db;
};

/**
 * Connect to the database (if not already connected), then switch to the right db, and finally returns the asked collection.
 *
 * @param {Object} options options, can be a string, in which case, with this form: `dbName/collectionName`.
 * @param {String} options.db the database to use.
 * @param {String} options.collection the collection to use and return.
 * @returns {Promise<Collection>} the mongodb collection
 */
const getCollection = async (options) => {
  const innerOptions = {};
  if (typeof options === 'string') {
    innerOptions.collection = options;
  } else {
    Object.assign(innerOptions, options);
  }

  if (!innerOptions.db) {
    const [dbName, collectionName] = innerOptions.collection.split('/');

    innerOptions.db = dbName;
    innerOptions.collection = collectionName;
  }

  const db = await getDb(innerOptions);
  return db.collection(innerOptions.collection);
};

/**
 * Close the database connection.
 */
const close = async () => {
  const client = _client;
  _client = undefined;

  if (client) await client.close();
};

module.exports = ({
  ...mongodb,
  getCollection,
  close,
});
