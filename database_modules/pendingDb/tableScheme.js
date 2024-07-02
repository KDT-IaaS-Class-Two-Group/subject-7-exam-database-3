const product = [
  { name: "product", type: "TEXT NOT NULL PRIMARY KEY" },
  { name: "price", type: "INTEGER NOT NULL" },
  { name: "position", type: "INTEGER NOT NULL" }
];

const members = [
  { name: "name", type: "TEXT NOT NULL PRIMARY KEY" },
  { name: "time", type: "INTEGER NOT NULL" },
  { name: "resource", type: "INTEGER" }
];

const orders = [
  { name: "name", type: "TEXT NOT NULL" },
  { name: "product", type: "TEXT NOT NULL" },
  { name: "date", type: "INTEGER NOT NULL" },
  { foreign: "FOREIGN KEY(name) REFERENCES members(name)" },
  { foreign: "FOREIGN KEY(product) REFERENCES product(product)" }
];

const admin = [
  { name: 'name', type: 'TEXT NOT NULL PRIMARY KEY' },
  { name: 'pw', type: 'TEXT NOT NULL' },
];
const session = [
  { name: 'name', type: 'TEXT NOT NULL' },
  { name: 'sessionKey', type: 'TEXT NOT NULL' },
  { foreign: "FOREIGN KEY(name) REFERENCES admin(name)" }
];

module.exports = { product, members, orders, admin, session};