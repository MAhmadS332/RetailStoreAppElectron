import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: {
    firstTime: true,
    loading: false,
    updateAvailable: false,
    currentVersion: false,
    availableVersion: '',
    downloadProgress: 0,
    downloadSpeed: '0 KB/s',
    downloading: false,
    updateStatus: 'idle',
    lastChecked: null,
    estimatedTimeRemaining: '',
    releaseDate: ''
  }
}

const updatesSlice = createSlice({
  name: 'updates',
  initialState,
  reducers: {
    setFirstTime: (state, action) => {
      state.value.firstTime = action.payload
    },
    setLoading: (state, action) => {
      state.value.loading = action.payload
    },
    setUpdateAvailable: (state, action) => {
      state.value.updateAvailable = action.payload
    },
    setCurrentVersion: (state, action) => {
      state.value.currentVersion = action.payload
    },
    setAvailableVersion: (state, action) => {
      state.value.availableVersion = action.payload
    },
    setDownloadProgress: (state, action) => {
      state.value.downloadProgress = action.payload
    },
    setDownloadSpeed: (state, action) => {
      state.value.downloadSpeed = action.payload
    },
    setDownloading: (state, action) => {
      state.value.downloading = action.payload
    },
    setUpdateStatus: (state, action) => {
      state.value.updateStatus = action.payload
    },
    setLastChecked: (state, action) => {
      state.value.lastChecked = action.payload
    },
    setEstimatedTimeRemaining: (state, action) => {
      state.value.estimatedTimeRemaining = action.payload
    },
    setReleaseDate: (state, action) => {
      state.value.releaseDate = action.payload
    }
  }
})

export const {
  setFirstTime,
  setLoading,
  setUpdateAvailable,
  setCurrentVersion,
  setAvailableVersion,
  setDownloadProgress,
  setDownloadSpeed,
  setDownloading,
  setUpdateStatus,
  setLastChecked,
  setEstimatedTimeRemaining,
  setReleaseDate
} = updatesSlice.actions

export default updatesSlice.reducer
