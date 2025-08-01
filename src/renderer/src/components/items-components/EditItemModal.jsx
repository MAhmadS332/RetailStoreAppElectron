const dbMgr = window.api.dbMgr
import React, { useEffect, useRef, useState } from 'react'
import { editItem } from '../../slices/itemsSlice'
import { useDispatch, useSelector } from 'react-redux'

const EditItemModal = ({ previousData, onClose }) => {
  const categories = useSelector((state) => state.categories.value)
  const dispatch = useDispatch()

  const MAX_LENTGH = 30
  const MAX_BARCODE = 9999999999999
  const MAX_PRICE = 9999999999

  const MAX_QTY = 99999
  const [itemName, setItemName] = useState(previousData.item_name || '')
  const [itemPrice, setItemPrice] = useState(previousData.item_price || 0)
  const [itemQty, setItemQty] = useState(previousData.item_qty || 0)
  const [itemBarcode, setItemBarcode] = useState(previousData.item_barcode || '')
  const [category, setCategory] = useState(previousData.category_name || '')
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const categoryId = dbMgr.categories.getByName(category).category_id
    if (
      dispatch(
        editItem({
          id: previousData.item_id,
          name: itemName,
          qty: itemQty,
          price: itemPrice,
          barcode: itemBarcode,
          categoryId: categoryId
        })
      ) == 0
    ) {
      toast('Item already exists', { type: 'error' })
      return
    }
    setItemName('')
    setItemPrice('')
    setItemQty('')
    setItemBarcode('')
    setCategory('')
    onClose()
  }

  return (
    <div
      className="w-full h-full fixed top-0 left-0 bg-gray-800 bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div
        className="bg-background text-text z-60 px-5 border-2 border-accent h-auto fixed rounded-lg shadow-gray-600 shadow-sm | top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 | flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="ml-auto align-self-end mt-2 rounded inline-flex hover:bg-accent"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="36px"
            viewBox="0 -960 960 960"
            width="36px"
            className="fill-text"
          >
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </svg>
        </button>
        <div>
          <h2 className="text-2xl font-bold mb-4">Edit Item</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label>Item Name</label>
              <input
                minLength={1}
                maxLength={MAX_LENTGH}
                type="text"
                value={itemName}
                onChange={(e) => (e.target.value.length <= 30 ? setItemName(e.target.value) : '')}
                className="w-full px-3 py-2 border rounded bg-transparent outline-none focus:outline-primary focus:outline-1"
                placeholder="Enter Item Name"
                required
                ref={inputRef}
              />
            </div>
            <div className="mb-4">
              <label>Item Price</label>
              <input
                min={0}
                max={MAX_PRICE}
                type="number"
                value={itemPrice}
                onChange={(e) => (e.target.value <= MAX_PRICE ? setItemPrice(e.target.value) : '')}
                className="w-full px-3 py-2 border rounded bg-transparent outline-none focus:outline-primary focus:outline-1"
                placeholder="Enter Item Price"
                required
              />
            </div>
            <div className="mb-4">
              <label>Item Quantity</label>
              <input
                min={0}
                max={MAX_QTY}
                type="number"
                value={itemQty}
                onChange={(e) => (e.target.value <= MAX_QTY ? setItemQty(e.target.value) : '')}
                className="w-full px-3 py-2 border rounded bg-transparent outline-none focus:outline-primary focus:outline-1"
                placeholder="Enter Item Quantity"
                required
              />
            </div>
            <div className="mb-4">
              <label>Item Barcode</label>
              <input
                min={0}
                max={MAX_BARCODE}
                type="number"
                value={itemBarcode}
                onChange={(e) =>
                  e.target.value <= MAX_BARCODE ? setItemBarcode(e.target.value) : ''
                }
                className="w-full px-3 py-2 border rounded bg-transparent outline-none focus:outline-primary focus:outline-1"
                placeholder="Enter Item Barcode"
              />
            </div>
            <div className="mb-4">
              <label>Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border rounded bg-background outline-none focus:outline-primary focus:outline-1"
                required
              >
                <option value="" disabled>
                  --- Select a category ---
                </option>
                {categories.map((cat, index) => (
                  <option className="text-text" key={index} value={cat.category_name}>
                    {cat.category_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="my-4 w-full px-4 py-2 text-lg font-bold bg-highlight text-header-text rounded hover:text-xl transition-all"
              >
                Edit Item
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditItemModal
