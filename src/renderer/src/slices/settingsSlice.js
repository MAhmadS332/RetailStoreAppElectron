import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'
const dbMgr = window.api.dbMgr

const initialState = {
  value: dbMgr.settings.getAll() || []
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updateSetting: (state, action) => {
      const settings = action.payload
      const errorMsg = dbMgr.settings.update(settings)

      if (errorMsg === 'SUCCESS') {
        state.value = dbMgr.settings.getAll()
        toast.success('Settings Updated!')
      } else {
        toast.error('Failed to update settings!')
      }
    }
  }
})

export const { updateSetting } = settingsSlice.actions
export default settingsSlice.reducer
