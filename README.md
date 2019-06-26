# quick-mongodb-node
> Simplify mongo usage a little, not big deal.

![npm](https://img.shields.io/npm/v/quick-mongodb-node.svg) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/quick-mongodb-node.svg) ![CircleCI](https://img.shields.io/circleci/build/github/fabienjuif/quick-mongodb-node.svg) ![Coveralls github](https://img.shields.io/coveralls/github/fabienjuif/quick-mongodb-node.svg)

😈 **A static variable is used in this package**

🌏 Note that this package use `MONGO_URL` as an environment variable.

### API and example
```js
const database = require('quick-mongodb-node')

// - connect to the database
// - switch do `my-db` db
// - retrieve the mongodb `my-collection` collection
let collection = await database.getCollection('my-db/my-collection')

// - will NOT connect to the database (already done the line before)
// - switch do `my-db2` db
// - retrieve the mongodb `my-collection2` collection
let collection2 = await database.getCollection('my-db2/my-collection2')

// close the connection
await database.close()
```
