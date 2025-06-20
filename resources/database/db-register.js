const db = require('./db-initializer')

function getAll() {
  try {
    const query = 'SELECT * FROM register'

    const qryResult = db.prepare(query).all()

    return qryResult
  } catch (err) {
    console.log('SqliteError: ', err)
  }
}

function add(name, loan_amount, debt_amount, last_update) {
  try {
    const query =
      'INSERT INTO register(customer_name, loan_amount, debt_amount, last_update) VALUES(?,?,?,?)'
    const qryResult = db.prepare(query).run(name, loan_amount, debt_amount, last_update)

    return 'SUCCESS'
  } catch (err) {
    console.log('SqliteError: ', err)
    return err.code
  }
}

function remove(id) {
  try {
    const query = 'DELETE FROM register WHERE id = ?'
    const qryResult = db.prepare(query).run(id)

    return 'SUCCESS'
  } catch (err) {
    console.log('SqliteError: ', err)
    return err.code
  }
}

function edit(id, name, loan_amount, debt_amount, last_update) {
  try {
    const query =
      'UPDATE register SET customer_name = ?,  loan_amount = ?, debt_amount = ?, last_update = ? WHERE id=?'
    const qryResult = db.prepare(query).run(name, loan_amount, debt_amount, last_update, id)

    return 'SUCCESS'
  } catch (err) {
    console.log('SqliteError: ', err)
    return err.code
  }
}

module.exports = {
  getAll,
  add,
  remove,
  edit
}
