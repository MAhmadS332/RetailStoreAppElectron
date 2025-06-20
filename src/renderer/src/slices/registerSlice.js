import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'
const dbMgr = window.api.dbMgr

const initialState = {
  value: dbMgr.register.getAll() || []
}

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    addRecord: (state, action) => {
      const { customer_name, loan_amount, debt_amount, last_update } = action.payload
      const errorMsg = dbMgr.register.add(customer_name, loan_amount, debt_amount, last_update)
      if (errorMsg === 'SUCCESS') {
        state.value = dbMgr.register.getAll()
        toast.success('Record Added!')
      } else if (errorMsg === 'SQLITE_CONSTRAINT_UNIQUE') {
        toast.error('Record already exists!')
      } else {
        toast.error('Failed to add record!')
      }
    },
    editRecord: (state, action) => {
      const { id, customer_name, loan_amount, debt_amount, last_update } = action.payload
      const errorMsg = dbMgr.register.edit(id, customer_name, loan_amount, debt_amount, last_update)
      if (errorMsg === 'SUCCESS') {
        state.value = dbMgr.register.getAll()
        toast.success('Record Edited!')
      } else if (errorMsg === 'SQLITE_CONSTRAINT_UNIQUE') {
        toast.error('Record already exists!')
      } else {
        toast.error('Failed to edit record!')
      }
    },
    deleteRecord: (state, action) => {
      const id = action.payload
      const errorMsg = dbMgr.register.remove(id)
      if (errorMsg === 'SUCCESS') {
        state.value = dbMgr.register.getAll()
        toast.success('Record Removed!')
      } else {
        toast.error('Failed to remove record!')
      }
    }
  }
})

export const { addRecord, editRecord, deleteRecord } = registerSlice.actions
export default registerSlice.reducer
