import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'

const initialState = {
  value: {
    date: new Date().toLocaleString(),
    items: [],
    details: {
      subTotal: 0,
      discount: 0,
      amountPaid: 0
    }
  }
}

const currentOrderSlice = createSlice({
  name: 'currentOrder',
  initialState,
  reducers: {
    newOrder: (state) => {
      state.value.date = new Date().toLocaleString()
      state.value.items = []
      state.value.details.subTotal = 0
      state.value.details.discount = 0
      state.value.details.amountPaid = 0
    },

    addItem: (state, action) => {
      const newState = state.value.items
      newState.push(action.payload)
      state.value.items = newState
    },
    editItemPrice: (state, action) => {
      const { id, price } = action.payload
      if (state.value.items.length === 0) return
      const newState = state.value.items.map((item) => {
        if (item.item_id === id) {
          item.item_price = price
        }
        return item
      })
      state.value.items = newState
    },
    editItemQty: (state, action) => {
      const { id, qty } = action.payload
      if (state.value.items.length === 0) return
      const newState = state.value.items.map((item) => {
        if (item.item_id === id) {
          item.qty = qty
        }
        return item
      })
      state.value.items = newState
    },
    removeItem: (state, action) => {
      const id = action.payload
      console.log(id)
      state.value.items = state.value.items.filter((item) => item.item_id !== id)
    },
    clearItems: (state) => {
      state.value.items = []
      toast.success('Receipt Cleared!')
    },
    editDetails: (state, action) => {
      state.value.details = action.payload
    }
  }
})

export const {
  addItem,
  editItemQty,
  removeItem,
  clearItems,
  editItemPrice,
  editDetails,
  newOrder
} = currentOrderSlice.actions
export default currentOrderSlice.reducer
