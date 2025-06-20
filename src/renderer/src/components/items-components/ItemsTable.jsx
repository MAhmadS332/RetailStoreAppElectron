import React, { useState } from 'react'
import AddItemModal from './AddItemModal'
import EditItemModal from './EditItemModal'
import DeleteItemModal from './DeleteItemModal'
import { useSelector } from 'react-redux'

const ItemsTable = () => {
  const items = useSelector((state) => state.items.value)
  const [addModal, setAddModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [editModalData, setEditModalData] = useState({})
  const [deleteModal, setDeleteModal] = useState(false)
  const [deleteModalData, setDeleteModalData] = useState(-1)

  const handleAdd = () => {
    setAddModal(true)
  }
  const handleEdit = (item) => {
    setEditModalData(item)
    setEditModal(true)
  }
  const handleDelete = (id) => {
    setDeleteModalData(id)
    setDeleteModal(true)
  }

  return (
    <>
      {addModal && <AddItemModal onClose={() => setAddModal(false)} />}
      {editModal && (
        <EditItemModal
          previousData={editModalData}
          onClose={() => {
            setEditModal(false)
            setEditModalData({})
          }}
        />
      )}
      {deleteModal && (
        <DeleteItemModal
          itemId={deleteModalData}
          onClose={() => {
            setDeleteModal(false)
            setDeleteModalData(-1)
          }}
        />
      )}

      <div className="">
        <button
          type="button"
          className="fixed bottom-5 right-5 bg-primary p-2 rounded-lg shadow-sm shadow-gray-500"
          onClick={handleAdd}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="36px"
            viewBox="0 -960 960 960"
            width="36px"
            fill="#e8eaed"
          >
            <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
          </svg>
        </button>

        <table className="w-full bg-background text-text overflow-y-auto overflow-x-hidden">
          <thead className="sticky top-0 z-10">
            <tr className="bg-primary text-header-text text-sm md:text-base lg:text-lg font-bUbuntu">
              <th className="py-[0.65rem] px-3">Sr#</th>
              <th className="py-[0.65rem] px-3">Item Name</th>
              <th className="py-[0.65rem] px-3">Item Qty</th>
              <th className="py-[0.65rem] px-3">Item Rate</th>
              <th className="py-[0.65rem] px-3">Barcode</th>
              <th className="py-[0.65rem] px-3">Category</th>
              <th className="py-[0.65rem] px-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items &&
              items.length !== 0 &&
              items.map((item, index) => (
                <tr
                  key={item.item_id}
                  className={`border-2 border-accent hover:bg-accent ${item.item_qty === 0 ? 'text-highlight' : ''}`}
                >
                  <td className="py-2 px-3 text-center">{index + 1}</td>
                  <td className="py-2 px-3 text-center">{item.item_name}</td>
                  <td className="py-2 px-3 text-center">{item.item_qty}</td>
                  <td className="py-2 px-3 text-center">{item.item_price}</td>
                  <td className="py-2 px-3 text-center">{item.item_barcode || 'NULL'}</td>
                  <td className="py-2 px-3 text-center">{item.category_name}</td>
                  <td className="py-2 px-3 flex justify-center space-x-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="22px"
                        viewBox="0 -960 960 960"
                        width="17px"
                        fill="background"
                      >
                        <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(item.item_id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="22px"
                        viewBox="0 -960 960 960"
                        width="17px"
                        fill="background"
                      >
                        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            {items && items.length === 0 && (
              <tr className="text-center border-b border-accent hover:bg-accent span text-text">
                <td colSpan={7}>No Items</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default ItemsTable
