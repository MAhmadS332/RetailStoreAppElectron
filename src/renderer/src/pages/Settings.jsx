import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateSetting } from '../slices/settingsSlice'

const Settings = () => {
  const dispach = useDispatch()
  const [version, setVersion] = useState('') // Placeholder for version, can be updated dynamically
  const settings = useSelector((state) => state.settings.value)

  const [settingsChanged, setSettingsChanged] = useState(false)
  const [storeName, setStoreName] = useState(settings[0].setting_value || '')
  const [currency, setCurrency] = useState(settings[1].setting_value || '$')
  const [storeAddress, setStoreAddress] = useState(settings[2].setting_value || '')
  const [storePhone, setStorePhone] = useState(settings[3].setting_value || '')
  const [countryCode, setCountryCode] = useState(settings[4].setting_value || '+92')
  const [darkMode, setDarkMode] = useState(settings[5].setting_value)
  const [zoom, setZoom] = useState(parseInt(settings[6].setting_value) || '100')

  const handleStoreNameChange = (e) => {
    setStoreName(e.target.value)
    setSettingsChanged(true)
  }
  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value)
    setSettingsChanged(true)
  }
  const handleStoreAddressChange = (e) => {
    setStoreAddress(e.target.value)
    setSettingsChanged(true)
  }
  const handleStorePhoneChange = (e) => {
    setStorePhone(e.target.value)
    setSettingsChanged(true)
  }
  const handleCountryCodeChange = (e) => {
    setCountryCode(e.target.value)
    setSettingsChanged(true)
  }
  const handleDarkModeChange = (e) => {
    setDarkMode(e.target.checked ? 'true' : 'false')
    setSettingsChanged(true)
  }
  const handleZoomChange = (e) => {
    setZoom(e.target.value)
    setSettingsChanged(true)
  }

  const handleSettingsSubmit = (e) => {
    e.preventDefault()
    console.log('Settings submitted:', {
      storeName,
      currency,
      storeAddress,
      storePhone,
      countryCode,
      darkMode,
      zoom
    })

    if (settingsChanged) {
      dispach(
        updateSetting({
          STORE_NAME: storeName,
          CURRENCY: currency,
          STORE_ADDRESS: storeAddress,
          STORE_PHONE: storePhone,
          COUNTRY_CODE: countryCode,
          DARK_MODE: darkMode,
          FONT_SIZE: zoom
        })
      )
      setSettingsChanged(false)

      window.api.setZoom(zoom || 100)
    }
  }

  useEffect(() => {
    const fetchVersion = async () => {
      const currentVersion = await window.api.getCurrentVersion()
      console.log('Current Version:', currentVersion)
      setVersion(currentVersion)
    }
    fetchVersion()
  }, [])

  return (
    <form onSubmit={handleSettingsSubmit} className=" select-none">
      <div className="text-2xl px-5 py-1.5 flex items-end sticky top-0 bg-primary text-header-text shadow-sm shadow-gray-400 border-b border-background">
        <span className="justify-self-center ml-auto  select-none">Settings</span>
        <span className="text-xs ml-auto justify-self-end">v{version}</span>
      </div>

      <div className="max-w-md mx-auto mt-6 p-4 bg-background rounded-md text-text">
        <div className="mb-4">
          <label className="block text-sm font-medium text-text">Store Name</label>
          <input
            type="text"
            className=" bg-background mt-1 block w-full px-3 py-2 border border-accent rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-text sm:text-sm text-text"
            placeholder="Enter your store name"
            value={storeName}
            onChange={handleStoreNameChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-text">Currency</label>
          <select
            className="bg-background mt-1 block w-full px-3 py-2 border border-accent rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-text sm:text-sm text-text"
            value={currency}
            onChange={handleCurrencyChange}
          >
            <option value="$">$</option>
            <option value="Rs.">Rs.</option>
            <option value="€">€</option>
            <option value="₹">₹</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-text">Store Address</label>
          <input
            type="text"
            className="bg-background mt-1 block w-full px-3 py-2 border border-accent rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-text sm:text-sm text-text"
            placeholder="Enter your store address"
            value={storeAddress}
            onChange={handleStoreAddressChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-text">
            Phone <i className="text-xs">(e.g. 92 1111111111)</i>
          </label>
          <div className="flex space-x-2">
            <input
              type="number"
              className="bg-background mt-1 w-1/4 block px-3 py-2 border border-accent rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-text sm:text-sm text-text"
              placeholder="code"
              value={countryCode}
              onChange={handleCountryCodeChange}
            />
            <input
              type="number"
              className="bg-background mt-1 block w-full px-3 py-2 border border-accent rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-text sm:text-sm text-text"
              placeholder="Enter your store phone number"
              value={storePhone}
              onChange={handleStorePhoneChange}
            />
          </div>
        </div>

        <div className="mb-4 bg-background">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-sm">Zoom</h2>
            <span className="text-xs text-text">{zoom}%</span>
          </div>

          <input
            type="range"
            min="75"
            max="125"
            step="5"
            value={zoom}
            onChange={handleZoomChange}
            className="w-full h-2 bg-text rounded-lg appearance-none cursor-pointer accent-blue-500
                   [&::-webkit-slider-thumb]:appearance-none
                   [&::-webkit-slider-thumb]:w-4
                   [&::-webkit-slider-thumb]:h-4
                   [&::-webkit-slider-thumb]:rounded-full
                   [&::-webkit-slider-thumb]:bg-blue-500
                   [&::-webkit-slider-thumb]:border-2
                   [&::-webkit-slider-thumb]:border-white
                   [&::-webkit-slider-thumb]:shadow-md
                   [&::-moz-range-thumb]:bg-blue-500
                   [&::-moz-range-thumb]:border-white"
          />

          <div className="flex justify-end mt-3">
            <button
              type="button"
              className="text-sm px-3 py-1 bg-highlight text-header-text rounded hover:bg-blue-600 transition"
              onClick={() => {
                setZoom(100)
                setSettingsChanged(true)
              }}
            >
              Reset
            </button>
          </div>
        </div>
        <div className="mb-4 flex flex-col gap-1">
          Additional Settings
          <div className="ml-2">
            <label class="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={darkMode === 'true' ? true : false}
                onChange={handleDarkModeChange}
                class="sr-only peer"
              />
              <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
              <span class="ms-3 ml-2 text-sm text-text">Enable Dark Mode</span>
            </label>
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="px-4 py-2 disabled:bg-gray-400 bg-highlight hover:bg-orange-800 text-header-text rounded-md shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 "
            disabled={
              !storeName ||
              !currency ||
              !storeAddress ||
              !storePhone ||
              !countryCode ||
              darkMode === null ||
              settingsChanged === false
            }
          >
            Save Settings
          </button>
        </div>
      </div>
    </form>
  )
}

export default Settings
