// All the Node.js APIs are available in the preload process.

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
  }
})
