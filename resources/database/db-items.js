const db = require('./db-initializer')

function getAll() {
  try {
    const query =
      'SELECT item_id, item_name, item_qty, item_price, item_barcode, category_name FROM items JOIN categories ON(items.item_category = categories.category_id)'

    const qryResult = db.prepare(query).all()

    return qryResult
  } catch (err) {
    console.log('SqliteError: ', err)
  }
}

function getById(id) {
  try {
    const query =
      'SELECT item_id, item_name, item_qty, item_price, item_barcode, category_name FROM items JOIN categories ON(items.item_category = categories.category_id) WHERE item_id = ?'
    const qryResult = db.prepare(query).get(id)

    return qryResult
  } catch (err) {
    console.log('SqliteError: ', err)
  }
}

function getByCategory(category) {
  try {
    const query =
      'SELECT item_id, item_name, item_qty, item_price, item_barcode, category_name FROM items JOIN categories ON(items.item_category = categories.category_id) WHERE item_category = ?'
    const qryResult = db.prepare(query).all(category)

    return qryResult
  } catch (err) {
    console.log('SqliteError: ', err)
  }
}

function getByName(name) {
  try {
    const query =
      'SELECT item_id, item_name, item_qty, item_price, item_barcode, category_name FROM items JOIN categories ON(items.item_category = categories.category_id) WHERE item_name LIKE ?'
    const qryResult = db.prepare(query).all('%' + name + '%')

    return qryResult
  } catch (err) {
    console.log('SqliteError: ', err)
  }
}

function getByPrice(price) {
  try {
    const query =
      'SELECT item_id, item_name, item_qty, item_price, item_barcode, category_name FROM items JOIN categories ON(items.item_category = categories.category_id) WHERE item_price = ?'
    const qryResult = db.prepare(query).all(price)

    return qryResult
  } catch (err) {
    console.log('SqliteError: ', err)
  }
}

function getByQuantity(qty) {
  try {
    const query =
      'SELECT item_id, item_name, item_qty, item_price, item_barcode, category_name FROM items JOIN categories ON(items.item_category = categories.category_id) WHERE item_qty = ?'
    const qryResult = db.prepare(query).all(qty)

    return qryResult
  } catch (err) {
    console.log('SqliteError: ', err)
  }
}

function getByBarcode(barcode) {
  try {
    const query =
      'SELECT item_id, item_name, item_qty, item_price, item_barcode, category_name FROM items JOIN categories ON(items.item_category = categories.category_id) WHERE item_barcode = ?'
    const qryResult = db.prepare(query).get(barcode)

    return qryResult
  } catch (err) {
    console.log('SqliteError: ', err)
  }
}

function add(name, qty, price, barcode, category) {
  try {
    const query =
      'INSERT INTO items(item_name, item_qty, item_price, item_barcode, item_category) VALUES(?,?,?,?,?)'
    const qryResult = db.prepare(query).run(name, qty, price, barcode, category)

    return 'SUCCESS'
  } catch (err) {
    console.log('SqliteError: ', err)
    return err.code
  }
}

function remove(id) {
  try {
    const query = 'DELETE FROM items WHERE item_id = ?'
    const qryResult = db.prepare(query).run(id)

    return 'SUCCESS'
  } catch (err) {
    console.log('SqliteError: ', err)
    return err.code
  }
}

function edit(id, name, qty, price, barcode, category) {
  try {
    const query =
      'UPDATE items SET item_name = ?,  item_qty = ?, item_price = ?, item_barcode = ?, item_category = ? WHERE item_id=?'
    const qryResult = db.prepare(query).run(name, qty, price, barcode, category, id)

    return 'SUCCESS'
  } catch (err) {
    console.log('SqliteError: ', err)
    return err.code
  }
}

function reduceItemQty(id, qty) {
  try {
    const item = getById(id)
    let newQty = item.item_qty - qty

    if (newQty < 0) {
      newQty = 0
    }
    console.log('Setting New Qty as ' + newQty)

    const query = 'UPDATE items SET item_qty = ? WHERE item_id = ?'
    const qryResult = db.prepare(query).run(newQty, id)

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
  getByPrice,
  getByCategory,
  getByQuantity,
  getByBarcode,
  add,
  remove,
  edit,
  reduceItemQty
}
