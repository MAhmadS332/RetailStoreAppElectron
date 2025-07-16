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

function addMany(items) {
  console.log('Adding Many Items:', items)
  if (!items || items.length === 0) {
    console.log('No items to add')
    return 'NO_ITEMS'
  }

  try {
    const insertItemQuery =
      'INSERT INTO items(item_name, item_qty, item_price, item_barcode, item_category) VALUES(?,?,?,?,?)'
    const insertCategoryQuery = 'INSERT OR IGNORE INTO categories(category_name) VALUES (?)'
    const getCategoryIdQuery = 'SELECT category_id FROM categories WHERE category_name = ?'

    const itemQry = db.prepare(insertItemQuery)
    const categoryQry = db.prepare(insertCategoryQuery)
    const getCategoryQry = db.prepare(getCategoryIdQuery)

    const tx = db.transaction((items) => {
      for (const item of items) {
        let categoryId = null

        // If item_category is a string (category name), handle it
        if (typeof item.category_name === 'string') {
          // First, try to insert the category (will be ignored if exists)
          categoryQry.run(item.category_name)

          // Then get the category_id
          const categoryResult = getCategoryQry.get(item.category_name)
          categoryId = categoryResult ? categoryResult.category_id : null

          if (!categoryId) {
            throw new Error(`Failed to create or find category: ${item.category_name}`)
          }
        }

        console.log('Inserting Item:', item.item_name, 'with Category ID:', categoryId)
        itemQry.run(item.item_name, item.item_qty, item.item_price, item.item_barcode, categoryId)
      }
    })
    tx(items)

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
  addMany,
  remove,
  edit,
  reduceItemQty
}
