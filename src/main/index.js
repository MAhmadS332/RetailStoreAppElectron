const { app, shell, BrowserWindow, ipcMain, dialog, nativeTheme, Menu } = require('electron')
import fs from 'fs'
const PdfDocument = require('pdfkit')
import path, { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
const dbMgr = require('../../resources/database/db-manager')
import icon from '../../resources/assets/imgs/favicon.ico?asset'
const { autoUpdater, AppUpdater, CancellationToken } = require('electron-updater')

autoUpdater.autoDownload = false
autoUpdater.autoInstallOnAppQuit = false

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    minWidth: 800,
    minHeight: 620,
    autoHideMenuBar: true,
    show: false,
    ...(process.platform === 'linux' ? { icon } : {}),
    icon,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  if (!is.dev) {
    mainWindow.webContents.on('before-input-event', (event, input) => {
      if (
        (input.control && input.shift && input.key.toLowerCase() === 'i') ||
        input.key === 'F12'
      ) {
        event.preventDefault()
      }
    })
  }

  mainWindow.center()

  //HANDLERS

  ipcMain.handle('open-receipts-folder', async () => {
    const dirPath = path.join(process.env.APPDATA, '.retailstoreapp')
    const receiptPath = path.join(dirPath, 'receipts')
    if (!fs.existsSync(receiptPath)) {
      fs.mkdirSync(receiptPath)
      console.log('Receipt Path Dir Created')
    }
    shell.openPath(receiptPath)
    console.log('Receipts Folder Opened')
  })

  ipcMain.handle('set-zoom', async (event, zoomPercent) => {
    const zoomFactor = zoomPercent / 100
    mainWindow.webContents.setZoomFactor(zoomFactor)
  })

  const urduCharRegex = new RegExp(/[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]/)

  function flipWords(sentence) {
    if (!urduCharRegex.test(sentence)) return sentence
    // Split the sentence into words based on spaces
    const words = sentence.split(' ')
    // Reverse the order of the words
    const reversedWords = words.reverse()
    // Join the words back together with spaces
    return reversedWords.join('  ')
  }

  ipcMain.handle('generate-pdf', async (event, settings, order) => {
    const storeName = settings[0].setting_value
    const currency = settings[1].setting_value
    const storeAddress = settings[2].setting_value
    const countryCode = settings[4].setting_value
    const storePhone = settings[3].setting_value

    const orderId = dbMgr.orders.add(
      order.date,
      parseFloat(order.details.subTotal) - parseFloat(order.details.discount)
    )

    const orderDate = new Date(order.date)
    const date = orderDate
      .toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      })
      .replace(/ /g, '-') // 06-Jun-2025

    const time = orderDate
      .toTimeString()
      .split(' ')[0]
      .replace(/:/g, 'h')
      .replace(/h(\d+)$/, 'm$1s')

    const doc = new PdfDocument({
      size: 'A4'
    })
    doc.registerFont('Arial', path.join(__dirname, '../../resources/assets/fonts/ARIAL.TTF'))
    doc.font('Helvetica')

    const dirPath = path.join(process.env.APPDATA, '.retailstoreapp')
    const receiptPath = path.join(dirPath, 'receipts')
    console.log(receiptPath)
    if (!fs.existsSync(receiptPath)) {
      fs.mkdirSync(receiptPath)
      console.log('Receipt Path Dir Created')
    }
    const filePath = path.join(receiptPath, `receipt-${orderId}-${date}_${time}.pdf`)
    const writeStream = fs.createWriteStream(filePath)
    doc.pipe(writeStream)

    // Add some content to the PDF
    doc.font('Helvetica-Bold').fontSize(20).text(storeName, { align: 'center', textStroke: 2 })

    doc
      .font('Arial')
      .fontSize(12)
      .text(storeAddress, { align: 'center' })
      .text(`+${countryCode} ${storePhone}`, { align: 'center' })
      .moveDown()
    doc.fontSize(12).text(`Date: ${date}`, { align: 'center' }).moveDown()

    doc
      .font('Helvetica-Bold')
      .fontSize(12)
      .text(`Order ID: ${orderId}`, { align: 'center' })
      .moveDown()

    doc.font('Arial')
    const orderItems = order.items.map((item, index) => {
      item.item_name = flipWords(item.item_name)
      return [
        index + 1,
        item.item_name,
        parseInt(item.qty),
        parseFloat(item.item_price).toFixed(2),
        `${parseFloat(parseFloat(item.item_price) * parseInt(item.qty)).toFixed(2)}`
      ]
    })
    orderItems.unshift([
      { textStroke: 0.75, text: 'Sr#' },
      { textStroke: 0.75, text: 'Item Name' },
      { textStroke: 0.75, text: 'Qty' },
      { textStroke: 0.75, text: `Rate (${currency})` },
      { textStroke: 0.75, text: `Price (${currency})` }
    ])

    doc.table({
      columnStyles: [30, '*', 100, '*', '*'],
      data: orderItems
    })

    // Add a horizontal line
    doc.moveDown()

    doc.table({
      columnStyles: ['*', 100],
      rowStyles: { border: false },
      data: [
        [
          { align: 'right', textStroke: 0.75, text: `Subtotal (${currency})` },

          {
            align: 'right',
            text: `${parseFloat(order.details.subTotal).toFixed(2)}`
          }
        ],
        [
          { align: 'right', textStroke: 0.75, text: `Discount (${currency})` },

          {
            align: 'right',
            text: `${parseFloat(order.details.discount).toFixed(2)}`
          }
        ],
        [
          { align: 'right', textStroke: 0.75, text: `Total (${currency})` },

          {
            align: 'right',
            text: `${(parseFloat(order.details.subTotal) - parseFloat(order.details.discount)).toFixed(2)}`
          }
        ],
        [
          { align: 'right', textStroke: 0.75, text: `Amount Paid (${currency})` },

          {
            align: 'right',
            text: `${parseFloat(order.details.amountPaid).toFixed(2)}`
          }
        ],
        [
          { align: 'right', textStroke: 0.75, text: `Change (${currency})` },
          {
            align: 'right',
            text: `${(
              parseFloat(order.details.amountPaid) -
              (parseFloat(order.details.subTotal) - parseFloat(order.details.discount))
            ).toFixed(2)}`
          }
        ]
      ]
    })

    doc.moveDown(2)
    doc.text('Thank you for your purchase!', {
      align: 'center',
      fontSize: 12
    })

    doc.end()

    writeStream.on('finish', () => {
      console.log('PDF created successfully!')
    })
    writeStream.on('error', (err) => {
      console.error('Error creating PDF:', err)
    })

    return filePath
  })

  ipcMain.handle('print-pdf', async (event, path) => {
    const win = new BrowserWindow({
      parent: mainWindow,
      modal: true,
      show: false,
      autoHideMenuBar: true,
      ...(process.platform === 'linux' ? { icon } : {}),
      icon
    })

    win.loadFile(path)
    win.on('ready-to-show', () => {
      win.show()
      //win.webContents.print({silent: true})
    })
  })

  //Auto Updater Checking

  console.log(autoUpdater.currentVersion)
  ipcMain.handle('check-for-updates', async () => {
    autoUpdater.checkForUpdates()
  })

  let cancellationToken = null

  ipcMain.handle('start-download', () => {
    cancellationToken = new CancellationToken()

    autoUpdater
      .downloadUpdate(cancellationToken)
      .then(() => {
        console.log('Download completed.')
        cancellationToken = null
      })
      .catch((err) => {
        if (cancellationToken && cancellationToken.cancelled) {
          console.log('Download was cancelled.')
        } else {
          console.error('Download error:', err)
        }
        cancellationToken = null
      })

    console.log('Download started...')
  })

  ipcMain.handle('cancel-download', () => {
    if (cancellationToken) {
      cancellationToken.cancel()
      cancellationToken = null
      return true
    }
    return false
  })

  ipcMain.handle('install-update', () => {
    autoUpdater.quitAndInstall()
  })

  //STATUSES: Checking(1), Available(2), Not Available(0), Downloaded(3)

  // Status events
  autoUpdater.on('checking-for-update', () => {
    mainWindow.webContents.send('update-status', 1)
  })

  autoUpdater.on('update-available', (info) => {
    mainWindow.webContents.send('update-available', info)
    mainWindow.webContents.send('update-status', 2)
  })

  autoUpdater.on('update-not-available', () => {
    mainWindow.webContents.send('update-status', 0)
  })
  autoUpdater.on('error', (err) => {
    mainWindow.webContents.send('update-status', `Error: ${err.message}`)
  })

  autoUpdater.on('download-progress', (progress) => {
    mainWindow.webContents.send('download-progress', progress)
  })

  autoUpdater.on('update-downloaded', () => {
    mainWindow.webContents.send('update-downloaded')
    mainWindow.webContents.send('update-status', 3)
  })
  ipcMain.handle('get-current-version', async () => {
    return app.getVersion()
  })

  ipcMain.handle('check-downloaded-update', async () => {})
}

process.on('uncaughtException', (err) => {
  console.log(err)
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  //Check For Updates
  autoUpdater.checkForUpdates()

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
