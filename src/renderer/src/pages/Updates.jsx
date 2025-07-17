import React, { useState, useEffect } from 'react'
import QuitAndInstallModal from '../components/updates-components/QuitAndInstallModal'
import { useSelector, useDispatch } from 'react-redux'
import {
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
} from '../slices/updatesSlice'

const Updates = () => {
  const dispatch = useDispatch()
  const firstTime = useSelector((state) => state.updates.value.firstTime)
  const loading = useSelector((state) => state.updates.value.loading)
  const updateAvailable = useSelector((state) => state.updates.value.updateAvailable)
  const currentVersion = useSelector((state) => state.updates.value.currentVersion)
  const availableVersion = useSelector((state) => state.updates.value.availableVersion)
  const downloadProgress = useSelector((state) => state.updates.value.downloadProgress)
  const downloadSpeed = useSelector((state) => state.updates.value.downloadSpeed)
  const downloading = useSelector((state) => state.updates.value.downloading)
  const updateStatus = useSelector((state) => state.updates.value.updateStatus)
  const lastChecked = useSelector((state) => state.updates.value.lastChecked)
  const estimatedTimeRemaining = useSelector((state) => state.updates.value.estimatedTimeRemaining)
  const releaseDate = useSelector((state) => state.updates.value.releaseDate)
  const [quitAndInstallModal, setQuitAndInstallModal] = useState(false)

  useEffect(() => {
    // Check if update is already downloaded and waiting for install
    const fetchVersion = async () => {
      const currentVersion = await window.api.getCurrentVersion()
      dispatch(setCurrentVersion(currentVersion))
    }
    fetchVersion()

    // Set up event listeners for auto-updater
    //STATUSES: Checking(1), Available(2), Not Available(0), Downloaded(3)
    const handleUpdateStatus = (status) => {
      console.log('Update status:', status)
      switch (status) {
        case 0: // no update available
          dispatch(setUpdateStatus('idle'))
          dispatch(setUpdateAvailable(false))
          dispatch(setLoading(false))
          break
        case 1: // checking for update
          dispatch(setUpdateStatus('checking'))
          dispatch(setLoading(true))
          break
        case 2: // update available
          dispatch(setUpdateStatus('available'))
          dispatch(setLoading(false))
          break
        case 3: // update downloaded
          dispatch(setUpdateStatus('downloaded'))
          dispatch(setDownloading(false))
          dispatch(setDownloadProgress(100))
          break
        default:
          if (typeof status === 'string' && status.startsWith('Error:')) {
            dispatch(setUpdateStatus('error'))
            dispatch(setLoading(false))
            dispatch(setDownloading(false))
          }
      }
    }

    const formatSpeed = (bytesPerSecond) => {
      const kb = bytesPerSecond / 1024
      const mb = kb / 1024
      const gb = mb / 1024

      if (gb >= 1) {
        return `${gb.toFixed(2)} GB/s`
      } else if (mb >= 1) {
        return `${mb.toFixed(2)} MB/s`
      } else {
        return `${Math.round(kb)} KB/s`
      }
    }

    const handleDownloadProgress = (progress) => {
      dispatch(setDownloadProgress(progress.percent || 0))
      if (progress.bytesPerSecond) {
        const formattedSpeed = formatSpeed(progress.bytesPerSecond)
        dispatch(setDownloadSpeed(formattedSpeed))
      }

      if (progress.total && progress.transferred && progress.bytesPerSecond) {
        const remainingBytes = progress.total - progress.transferred
        const secondsRemaining = Math.floor(remainingBytes / progress.bytesPerSecond)

        const minutes = Math.floor(secondsRemaining / 60)
        const seconds = secondsRemaining % 60

        dispatch(setEstimatedTimeRemaining(`${minutes}m ${seconds}s`))
      }
    }

    const handleUpdateDownloaded = () => {
      toast.success('Update Download Complete')
      dispatch(setDownloading(false))
      dispatch(setUpdateStatus('downloaded'))
      dispatch(setDownloadProgress(100))
    }

    const handleUpdateAvailable = (info) => {
      console.log('Update available:', info)
      dispatch(setUpdateAvailable(true))
      dispatch(setAvailableVersion(info.version || 'v1.0.2')) // Fallback version
      dispatch(setReleaseDate(new Date(info.releaseDate).toDateString() || 'Unknown release date'))
      dispatch(setUpdateStatus('available'))
      dispatch(setLoading(false))
      dispatch(setLastChecked(new Date()))
    }

    // Add event listeners
    window.api.onUpdateAvailable(handleUpdateAvailable)
    window.api.onUpdateStatus(handleUpdateStatus)
    window.api.onDownloadProgress(handleDownloadProgress)
    window.api.onUpdateDownloaded(handleUpdateDownloaded)

    if (firstTime) {
      dispatch(setFirstTime(false)) // Reset first check state
      checkForUpdates()
    }

    return () => {
      // Note: You might need to implement removeListeners in your preload script
    }
  }, [])

  const checkForUpdates = async () => {
    dispatch(setLoading(true))
    dispatch(setUpdateStatus('checking'))
    dispatch(setLastChecked(new Date()))

    try {
      await window.api.checkForUpdates()
    } catch (error) {
      console.error('Update check failed:', error)
      dispatch(setUpdateStatus('error'))
      dispatch(setLoading(false))
    }
  }

  const downloadUpdate = async () => {
    dispatch(setDownloading(true))
    dispatch(setUpdateStatus('downloading'))
    dispatch(setDownloadProgress(0))

    try {
      await window.api.startDownload()
    } catch (error) {
      console.error('Download failed:', error)
      dispatch(setUpdateStatus('error'))
      dispatch(setDownloading(false))
    }
  }

  const installUpdate = async () => {
    try {
      await window.api.installUpdate()
    } catch (error) {
      console.error('Install failed:', error)
    }
  }

  const handleCancelDownload = async () => {
    const success = await window.api.cancelDownload()
    if (success) {
      console.log('Download cancelled successfully')
      dispatch(setDownloading(false))
      dispatch(setUpdateStatus('available'))
      dispatch(setLoading(false))
      dispatch(setDownloadProgress(0))
      dispatch(setEstimatedTimeRemaining(''))
      dispatch(setDownloadSpeed('0 KB/s'))
    }
  }

  const formatDate = (date) => {
    return date.toLocaleString()
  }

  return (
    <div className="h-full bg-background text-text  select-none">
      <div className="text-2xl px-5 py-1.5 flex items-center justify-center sticky top-0 bg-primary text-header-text shadow-sm shadow-gray-400 border-b border-background">
        Updates
      </div>
      {quitAndInstallModal && (
        <QuitAndInstallModal
          handleInstall={installUpdate}
          onClose={() => setQuitAndInstallModal(false)}
        />
      )}
      <div className="max-w-2xl mx-auto p-6 space-y-6">
        {/* Current Version Info */}
        <div>
          <div className="text-xl text-text mb-2 flex items-center justify-between">
            <span className="text-lg flex gap-2 items-center font-bold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="28px"
                viewBox="0 -960 960 960"
                width="28px"
                className="fill-text"
              >
                <path d="M204-318q-22-38-33-78t-11-82q0-134 93-228t227-94h7l-64-64 56-56 160 160-160 160-56-56 64-64h-7q-100 0-170 70.5T240-478q0 26 6 51t18 49l-60 60ZM481-40 321-200l160-160 56 56-64 64h7q100 0 170-70.5T720-482q0-26-6-51t-18-49l60-60q22 38 33 78t11 82q0 134-93 228t-227 94h-7l64 64-56 56Z" />
              </svg>
              Current Version
            </span>
            <span className="text-base">{currentVersion}</span>
          </div>
        </div>

        {/* Checking for Updates */}
        {updateStatus === 'checking' && (
          <div className="bg-yellow-100 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <svg
                  className="animate-spin w-5 h-5 text-yellow-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-yellow-800">Checking for Updates...</h3>
                <p className="text-yellow-700">Please wait while we check for available updates</p>
              </div>
            </div>
          </div>
        )}

        {/* Update Status */}
        {updateStatus === 'available' && (
          <div className="bg-green-100 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-800">Update Available!</h3>
                <p className="text-green-700">Version {availableVersion} is ready to download</p>
                <p className="text-green-700">Release Date: {releaseDate}</p>
              </div>
            </div>

            <button
              onClick={downloadUpdate}
              disabled={downloading || updateStatus === 'downloading'}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors duration-200 disabled:bg-gray-400"
            >
              {updateStatus === 'downloading' ? 'Downloading...' : 'Download Update'}
            </button>
          </div>
        )}

        {/* Download Progress */}
        {updateStatus === 'downloading' && (
          <div className="bg-blue-100 border border-blue-200 rounded-lg p-4">
            <div className="flex gap-2 items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-800">Downloading Update...</span>
              {estimatedTimeRemaining && (
                <span className="text-sm text-blue-600">
                  Est. Time Remaining: {estimatedTimeRemaining}
                </span>
              )}
              <span className="text-sm text-blue-600">{downloadSpeed}</span>
              <button className="px-1" onClick={handleCancelDownload}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="16px"
                  viewBox="0 -960 960 960"
                  width="16px"
                  className="fill-red-600"
                >
                  <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                </svg>
              </button>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${downloadProgress}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-blue-600 mt-1">
              <span>{Math.round(downloadProgress)}%</span>
              <span>{downloadProgress < 100 ? 'Downloading...' : 'Download Complete'}</span>
            </div>
          </div>
        )}

        {/* Update Downloaded */}
        {updateStatus === 'downloaded' && (
          <div className="bg-purple-100 border border-purple-200 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-purple-800">Update Downloaded</h3>
                <p className="text-purple-700">Ready to install version {availableVersion}</p>
              </div>
            </div>

            <button
              onClick={() => setQuitAndInstallModal(true)}
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors duration-200"
            >
              Install and Restart
            </button>
          </div>
        )}

        {/* No Updates Available */}
        {updateStatus === 'idle' && !updateAvailable && lastChecked && (
          <div className="bg-gray-100 border border-gray-200 rounded-lg p-4 text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">You're Up to Date!</h3>
            <p className="text-gray-600">No updates available at this time</p>
          </div>
        )}

        {/* Error State */}
        {updateStatus === 'error' && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-red-800">Update Check Failed</h3>
                <p className="text-red-700">Unable to check for updates. Please try again.</p>
              </div>
            </div>

            <button
              onClick={checkForUpdates}
              className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors duration-200"
            >
              Retry
            </button>
          </div>
        )}

        {/* Changelog
        {updateAvailable &&
          (changelog === '' ? (
            <div className="bg-accent rounded-lg p-4 border border-accent">
              No changelog available
            </div>
          ) : (
            <div
              className="bg-accent rounded-lg p-4 border border-accent"
              dangerouslySetInnerHTML={{ __html: changelog }}
            ></div>
          ))} */}

        {/* Auto Update Settings
        <div className="bg-accent rounded-lg p-4 border border-accent">
          <h3 className="text-lg font-semibold mb-3">Update Settings</h3>
          <div className="space-y-3">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                defaultChecked={true}
                className="w-4 h-4 text-primary bg-background border-text rounded focus:ring-primary"
              />
              <span className="text-sm">Automatically check for updates on startup</span>
            </label>
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                defaultChecked={false}
                className="w-4 h-4 text-primary bg-background border-text rounded focus:ring-primary"
              />
              <span className="text-sm">Download updates automatically</span>
            </label>
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                defaultChecked={true}
                className="w-4 h-4 text-primary bg-background border-text rounded focus:ring-primary"
              />
              <span className="text-sm">Include pre-release versions</span>
            </label>
          </div>
        </div> */}

        {/* Check for Updates Button */}
        <div className="">
          <button
            onClick={checkForUpdates}
            disabled={loading || downloading || updateStatus === 'downloading'}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-3 ${
              loading || downloading || updateStatus === 'downloading'
                ? 'bg-gray-400 cursor-not-allowed text-gray-600'
                : 'bg-highlight text-header-text hover:bg-blue-600 hover:shadow-lg'
            }`}
          >
            Check for Updates
          </button>
          <span className="text-sm text-gray-500">
            {lastChecked ? `Last checked: ${formatDate(lastChecked)}` : 'Never checked'}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Updates
