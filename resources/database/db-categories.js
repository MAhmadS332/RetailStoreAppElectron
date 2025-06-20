const db = require('./db-initializer')

function getAll() {
  try {
    const query = 'SELECT * FROM categories'
    const qryResult = db.prepare(query).all()

    return qryResult
  } catch (err) {
    console.log('SqliteError: ', err)
  }
}

function getById(id) {
  try {
    const query = 'SELECT * FROM categories WHERE category_id = ?'
    const qryResult = db.prepare(query).get(id)

    return qryResult
  } catch (err) {
    console.log('SqliteError: ', err)
  }
}

function getByName(name) {
  try {
    const query = 'SELECT * FROM categories WHERE category_name = ?'
    const qryResult = db.prepare(query).get(name)

    return qryResult
  } catch (err) {
    console.log('SqliteError: ', err)
    return err.code
  }
}

function add(name) {
  try {
    const query = 'INSERT INTO categories(category_name) VALUES (?)'
    const qryResult = db.prepare(query).run(name)

    return 'SUCCESS'
  } catch (err) {
    console.log('SqliteError: ', err)
    return err.code
  }
}

function remove(id) {
  try {
    const query = 'DELETE FROM categories WHERE category_id = ?'
    const qryResult = db.prepare(query).run(id)

    return 'SUCCESS'
  } catch (err) {
    console.log('SqliteError: ', err)
    return err.code
  }
}

function edit(id, name) {
  try {
    const query = 'UPDATE categories SET category_name = ? WHERE category_id=?'
    const qryResult = db.prepare(query).run(name, id)

    return 'SUCCESS'
  } catch (err) {
    console.log('SqliteError: ', err)
    return err.code
  }
}

module.exports = {
  getAll,
  getById,
  getByName,
  add,
  remove,
  edit
}
