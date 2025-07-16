import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'
const dbMgr = window.api.dbMgr

const initialState = {
  value: dbMgr.categories.getAll() || []
}

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,

  reducers: {
    reloadCategories: (state) => {
      state.value = dbMgr.categories.getAll()
    },
    addCategory: (state, action) => {
      const name = action.payload
      const errorMsg = dbMgr.categories.add(name)

      if (errorMsg === 'SUCCESS') {
        state.value = dbMgr.categories.getAll()
        toast.success('Category Added!')
      } else {
        errorMsg === 'SQLITE_CONSTRAINT_UNIQUE'
          ? toast.error('Category already exists!')
          : toast.error('Failed to add category!')
      }
    },
    editCategory: (state, action) => {
      const { id, newName } = action.payload
      console.log(id, newName)
      const errorMsg = dbMgr.categories.edit(id, newName)

      if (errorMsg === 'SUCCESS') {
        state.value = dbMgr.categories.getAll()
        toast.success('Category Edited!')
      } else {
        errorMsg === 'SQLITE_CONSTRAINT_UNIQUE'
          ? toast.error('Category already exists!')
          : toast.error('Failed to edit category!')
      }
    },
    deleteCategory: (state, action) => {
      const id = action.payload

      const errorMsg = dbMgr.categories.remove(id)

      if (errorMsg === 'SUCCESS') {
        state.value = dbMgr.categories.getAll()
        toast.success('Category Removed!')
      } else {
        errorMsg === 'SQLITE_CONSTRAINT_FOREIGNKEY'
          ? toast.error('Category is in use!')
          : toast.error('Failed to remove category!')
      }
    }
  }
})

export const { reloadCategories, addCategory, editCategory, deleteCategory } =
  categoriesSlice.actions
export default categoriesSlice.reducer
