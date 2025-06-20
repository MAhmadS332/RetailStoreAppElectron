const db = require('./db-initializer')

const getAll = () => {
  try {
    const query = 'SELECT * FROM settings'
    const qryResult = db.prepare(query).all()
    return qryResult
  } catch (err) {
    console.log('SqliteError: ', err)
  }
}

const getByName = (name) => {
  try {
    const query = 'SELECT setting_value FROM settings WHERE setting_name = ?'
    const qryResult = db.prepare(query).get(name)
    return qryResult
  } catch (err) {
    console.log('SqliteError: ', err)
  }
}

const update = (settings) => {
  console.log('Updating settings:', settings)
  try {
    const query = 'UPDATE settings SET setting_value = ? WHERE setting_name = ?'
    const qryResult = db.transaction(() => {
      for (const [name, value] of Object.entries(settings)) {
        db.prepare(query).run(value, name)
      }
    })()
    return 'SUCCESS'
  } catch (err) {
    console.log('SqliteError: ', err)
    return err.code
  }
}

const add = (name, value) => {
  try {
    const query = 'INSERT INTO settings (setting_name, setting_value) VALUES (?, ?)'
    const insert = db.prepare(query).run(name, value)
    return insert.changes
  } catch (err) {
    console.log('SqliteError: ', err)
    return 0
  }
}

const edit = (name, value) => {
  try {
    const query = 'UPDATE settings SET setting_value = ? WHERE setting_name = ?'
    const qryResult = db.prepare(query).run(value, name)
    return qryResult.changes
  } catch (err) {
    console.log('SqliteError: ', err)
    return 0
  }
}

const remove = (name) => {
  try {
    const query = 'DELETE FROM settings WHERE setting_name = ?'
    const qryResult = db.prepare(query).run(name)
    return qryResult.changes
  } catch (err) {
    console.log('SqliteError: ', err)
    return 0
  }
}

if (!getByName('STORE_NAME')) {
  add('STORE_NAME', 'My Store')
}
if (!getByName('CURRENCY')) {
  add('CURRENCY', 'Rs.')
}
if (!getByName('STORE_ADDRESS')) {
  add('STORE_ADDRESS', '123 Main St, City, Country')
}
if (!getByName('STORE_PHONE')) {
  add('STORE_PHONE', '11111111111')
}
if (!getByName('COUNTRY_CODE')) {
  add('COUNTRY_CODE', '+92')
}
if (!getByName('DARK_MODE')) {
  add('DARK_MODE', 'false')
}
if (!getByName('FONT_SIZE')) {
  add('FONT_SIZE', '100')
}

module.exports = { getAll, getByName, add, edit, remove, update }
