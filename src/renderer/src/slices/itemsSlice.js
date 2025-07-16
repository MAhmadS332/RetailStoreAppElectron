import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'

const dbMgr = window.api.dbMgr
const initialState = {
  value: dbMgr.items.getAll() || []
}

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { name, qty, price, barcode, categoryId } = action.payload

      const errorMsg = dbMgr.items.add(name, qty, price, barcode, categoryId)
      if (errorMsg === 'SUCCESS') {
        state.value = dbMgr.items.getAll()
        toast.success('Item Added!')
      } else if (errorMsg === 'SQLITE_CONSTRAINT_UNIQUE') {
        toast.error('Item already exists!')
      } else {
        toast.error('Failed to add item!')
      }
    },

    editItem: (state, action) => {
      const { id, name, qty, price, barcode, categoryId } = action.payload
      const errorMsg = dbMgr.items.edit(id, name, qty, price, barcode, categoryId)

      if (errorMsg === 'SUCCESS') {
        state.value = dbMgr.items.getAll()
        toast.success('Item Edited!')
      } else if (errorMsg === 'SQLITE_CONSTRAINT_UNIQUE') {
        toast.error('Item already exists!')
      } else {
        toast.error('Failed to edit item!')
      }
    },
    deleteItem: (state, action) => {
      const id = action.payload
      const errorMsg = dbMgr.items.remove(id)
      if (errorMsg === 'SUCCESS') {
        state.value = dbMgr.items.getAll()
        toast.success('Item Deleted!')
      } else {
        toast.error('Failed to delete item!')
      }
    },
    reduceItemQty: (state, action) => {
      const { id, qty } = action.payload
      dbMgr.items.reduceItemQty(id, qty)
    },
    reloadItems: (state) => {
      state.value = dbMgr.items.getAll()
    }
  }
})

export const { addItem, editItem, deleteItem, reduceItemQty, reloadItems } = itemsSlice.actions
export default itemsSlice.reducer
