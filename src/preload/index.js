// All the Node.js APIs are available in the preload process.

const { remove } = require('fs-extra')
const dbMgr = require('../../resources/database/db-manager')
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
  dbMgr,
  generatePdf: async (settings, order) => {
    return await ipcRenderer.invoke('generate-pdf', settings, order)
  },
  printPdf: async (path) => {
    return await ipcRenderer.invoke('print-pdf', path)
  },
  openReceiptsFolder: () => {
    ipcRenderer.invoke('open-receipts-folder')
  },
  setZoom: (zoomPercent) => {
    ipcRenderer.invoke('set-zoom', zoomPercent)
  },
  getCurrentVersion: async () => await ipcRenderer.invoke('get-current-version'),
  cancelDownload: async () => await ipcRenderer.invoke('cancel-download'),
  checkForUpdates: () => ipcRenderer.invoke('check-for-updates'),
  checkDownloadedUpdate: async () => await ipcRenderer.invoke('check-downloaded-update'),
  startDownload: async () => await ipcRenderer.invoke('start-download'),
  installUpdate: () => ipcRenderer.invoke('install-update'),
  onUpdateStatus: (cb) => ipcRenderer.on('update-status', (_, code) => cb(code)),
  onUpdateAvailable: (cb) => ipcRenderer.on('update-available', (_, info) => cb(info)),
  onUpdateDownloaded: (cb) => ipcRenderer.on('update-downloaded', cb),
  onDownloadProgress: (cb) => ipcRenderer.on('download-progress', (_, percent) => cb(percent))
})
