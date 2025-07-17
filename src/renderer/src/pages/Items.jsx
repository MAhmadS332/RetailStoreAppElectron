import { useDispatch, useSelector } from 'react-redux'
import ItemsTable from '../components/items-components/ItemsTable'
import toast from 'react-hot-toast'
import { reloadCategories } from '../slices/categoriesSlice'
import { reloadItems } from '../slices/itemsSlice'
import { useState } from 'react'
import { s } from 'framer-motion/client'

const Items = () => {
  const dispatch = useDispatch()
  const items = useSelector((state) => state.items.value)

  const [showLowStock, setShowLowStock] = useState(true)

  const exportHandler = async () => {
    const success = await window.api.exportToCsv(items)
    if (success) {
      toast.success('Items exported successfully!')
    } else {
      toast.error('Failed to export items!')
    }
  }

  const exportTemplate = async () => {
    const success = await window.api.exportToCsv([])
    if (success) {
      toast.success('Template exported successfully!')
    } else {
      toast.error('Failed to export template!')
    }
  }

  const importHandler = async () => {
    const response = await window.api.importFromCsv()
    console.log('Imported Items:', response.data)

    if (response.success === false) {
      toast.error('Failed to import items!')
      return
    }
    if (response.success && response.data) {
      const errorMsg = await window.api.dbMgr.items.addMany(response.data)
      if (errorMsg === 'SUCCESS') {
        toast.success('Items Imported Successfully!')
        dispatch(reloadItems())
        dispatch(reloadCategories()) // Reload categories after importing items
      } else if (errorMsg === 'SQLITE_CONSTRAINT_UNIQUE') {
        toast.error('Some of the Items already exist!')
      } else {
        toast.error('Failed to import items!')
      }
    }
  }

  return (
    <div className="bg-background text-header-text">
      <div className="flex items-center justify-center  select-none px-5 py-1.5 bg-primary text-header-text shadow-sm shadow-gray-400 border-b border-background">
        <span className="text-2xl text-center ml-auto ">Items</span>
        <span className="flex items-center gap-2 justify-self-end ml-auto">
          <button
            onClick={() => setShowLowStock(!showLowStock)}
            title={showLowStock ? 'Hide Low Stock Items' : 'Show Low Stock Items'}
            className='flex items-center gap-1 bg-yellow-300 px-2 py-1 rounded-md'
          >
            {!showLowStock ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
              className="fill-primary"
              >
                <path d="M480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-40-120v-161l80 80v81h-80Zm433 158L655-419 480-720l-47 80-58-58 105-182 393 678Zm-695 2h469L350-497 178-200ZM819-28l-92-92H40l252-435L27-820l57-57L876-85l-57 57ZM499-348Zm45-181Z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
              className="fill-primary"
              >
                <path d="m40-120 440-760 440 760H40Zm138-80h604L480-720 178-200Zm302-40q17 0 28.5-11.5T520-280q0-17-11.5-28.5T480-320q-17 0-28.5 11.5T440-280q0 17 11.5 28.5T480-240Zm-40-120h80v-200h-80v200Zm40-100Z" />
              </svg>
            )}
          </button>
          <button
            type="button"
            className="flex items-center gap-1 bg-blue-500 px-2 py-1 rounded-md"
            title="No items? Click Export to create a blank template."
            onClick={exportTemplate}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              className="fill-header-text"
            >
              <path d="M480-480ZM202-65l-56-57 118-118h-90v-80h226v226h-80v-89L202-65Zm278-15v-80h240v-440H520v-200H240v400h-80v-400q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H480Z" />
            </svg>
            Export Template
          </button>
          <button
            className="flex items-center gap-1 bg-highlight px-2 py-1 rounded-md"
            onClick={importHandler}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              className="fill-header-text"
            >
              <path d="M440-320v-326L336-542l-56-58 200-200 200 200-56 58-104-104v326h-80ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" />
            </svg>
            Import
          </button>
          <button
            className="flex items-center gap-1 bg-highlight px-2 py-1 rounded-md"
            onClick={exportHandler}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              className="fill-header-text"
            >
              <path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" />
            </svg>
            Export
          </button>
        </span>
      </div>

      <ItemsTable showLowStock={showLowStock} />
    </div>
  )
}

export default Items
