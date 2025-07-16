import { useDispatch, useSelector } from 'react-redux'
import ItemsTable from '../components/items-components/ItemsTable'
import toast from 'react-hot-toast'
import { reloadCategories } from '../slices/categoriesSlice'
import { reloadItems } from '../slices/itemsSlice'

const Items = () => {
  const dispatch = useDispatch()
  const items = useSelector((state) => state.items.value)

  const exportHandler = async () => {
    const success = await window.api.exportToCsv(items)
    if (success) {
      toast.success('Items exported successfully!')
    } else {
      toast.error('Failed to export items!')
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
      <div className="flex items-center justify-center px-5 py-1.5 bg-primary text-header-text shadow-sm shadow-gray-400 border-b border-background">
        <span className="text-2xl text-center ml-auto">Items</span>
        <span className="flex items-center gap-2 justify-self-end ml-auto">
          <i
            type="button"
            title="No items? Click Export to create a blank template."
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="28px"
              viewBox="0 -960 960 960"
              width="28px"
              className="fill-header-text"
            >
              <path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
            </svg>
          </i>
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

      <ItemsTable />
    </div>
  )
}

export default Items
