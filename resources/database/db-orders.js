const db = require('./db-initializer')

const getAll = () => {
  try {
    const query = 'SELECT * FROM orders'
    const qryResult = db.prepare(query).all()
    return qryResult
  } catch (err) {
    console.log('SqliteError: ', err.code)
  }
}

const getById = (id) => {
  try {
    const query = 'SELECT * FROM orders WHERE order_id = ?'
    const qryResult = db.prepare(query).get(id)
    return qryResult
  } catch (err) {
    console.log('SqliteError: ', err.code)
  }
}

const add = (date, total_amount) => {
  try {
    const query = 'INSERT INTO orders (order_date, total_amount) VALUES (?, ?)'
    const qryResult = db.prepare(query).run(date, total_amount)

    if (qryResult.changes === 1) {
      return qryResult.lastInsertRowid
    }
  } catch (err) {
    console.log('SqliteError: ', err.code)
  }
}

module.exports = {
  getAll,
  getById,
  add
}
