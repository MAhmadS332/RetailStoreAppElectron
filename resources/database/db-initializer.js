const path = require('node:path')
const Database = require('better-sqlite3')
const fs = require('fs')

const dirPath = path.join(process.env.APPDATA, '.retailstoreapp')
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath)
  console.log('Directory Created !')
}
const dbDirPath = path.join(dirPath, 'database')
if (!fs.existsSync(dbDirPath)) {
  fs.mkdirSync(dbDirPath)
  console.log('DB Directory Created')
}

console.log(process.env)
const db = new Database(path.join(dbDirPath, 'store-app.db'))
db.pragma('journal_mode = WAL')

function setInitialOrderId(db) {
  // Check if there's already a row in sqlite_sequence for 'orders'
  const check = db.prepare("SELECT seq FROM sqlite_sequence WHERE name = 'orders'").get()

  if (!check) {
    // Insert starting point only if not exists
    db.prepare(
      `
      INSERT INTO sqlite_sequence (name, seq)
      VALUES ('orders', 999)
    `
    ).run()

    console.log('Initialized order ID starting at 1000')
  } else {
    // Already initialized — do nothing
    console.log('Order ID already initialized')
  }
}

function initialize() {
  let query
  query =
    'CREATE TABLE IF NOT EXISTS categories (category_id INTEGER PRIMARY KEY AUTOINCREMENT, category_name TEXT NOT NULL UNIQUE)'
  db.prepare(query).run()

  query =
    'CREATE TABLE IF NOT EXISTS items (item_id INTEGER PRIMARY KEY AUTOINCREMENT, item_name TEXT NOT NULL UNIQUE, item_qty INTEGER NOT NULL, item_price REAL NOT NULL, item_barcode INTEGER, item_category INTEGER NOT NULL, FOREIGN KEY (item_category) REFERENCES categories(category_id), CHECK(item_price >= 0))'
  db.prepare(query).run()

  query =
    'CREATE TABLE IF NOT EXISTS orders (order_id INTEGER PRIMARY KEY AUTOINCREMENT, order_date DATE NOT NULL, total_amount REAL)'
  db.prepare(query).run()

  query =
    'CREATE TABLE IF NOT EXISTS settings (setting_name TEXT PRIMARY KEY, setting_value TEXT NOT NULL)'
  db.prepare(query).run()

  query =
    'CREATE TABLE IF NOT EXISTS register (id INTEGER PRIMARY KEY AUTOINCREMENT, customer_name TEXT NOT NULL UNIQUE, loan_amount INTEGER, debt_amount INTEGER, last_update DATE NOT NULL)'
  db.prepare(query).run()

  setInitialOrderId(db)
  console.log('DATABASE INITIALIZED')
}
initialize()

module.exports = db
