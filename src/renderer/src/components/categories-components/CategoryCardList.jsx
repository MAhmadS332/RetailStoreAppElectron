import { useState } from 'react'

import DeleteCategoryModal from './DeleteCategoryModal'
import { useSelector } from 'react-redux'

const CategoryCardList = ({ setEditingCategory }) => {
  const categories = useSelector((state) => state.categories.value)

  const [modifyingCategory, setModifyingCategory] = useState(null)
  const [deleteModal, setDeleteModal] = useState(false)
  const [selectedCategoryId, setSelectedCategoryId] = useState(-1)

  return (
    <>
      {deleteModal && (
        <DeleteCategoryModal
          categoryId={selectedCategoryId}
          onClose={() => setDeleteModal(false)}
        />
      )}
      <div className=" select-none text-2xl sticky top-0 px-5 py-1.5 bg-primary text-header-text text-center shadow-sm shadow-gray-400 border-b border-background">
        Categories
      </div>
      <div className="flex flex-wrap gap-2 p-5 overflow-hidden pb-[8.25rem] ">
        {categories.length === 0 && <div className="text-text w-full text-center">No Categories Found</div>}
        {categories.length > 0 &&
          categories.map((category) => (
            <div key={category.category_id}>
              {modifyingCategory === category.category_id && (
                <div
                  className="border-2 border-accent w-32 h-14 p-2 shadow-accent shadow-sm text-center rounded-md overflow-hidden flex gap-1 justify-center items-center bg-background"
                  onMouseLeave={() => {
                    setModifyingCategory(null)
                  }}
                >
                  <button
                    className="bg-blue-500 p-1 rounded-lg"
                    onClick={() => setEditingCategory(category)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="22px"
                      viewBox="0 -960 960 960"
                      width="22px"
                      fill="background"
                    >
                      <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                    </svg>
                  </button>
                  <button
                    className="bg-red-500 p-1 rounded-lg"
                    onClick={() => {
                      setSelectedCategoryId(category.category_id)
                      setDeleteModal(true)
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="22px"
                      viewBox="0 -960 960 960"
                      width="22px"
                      fill="background"
                    >
                      <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                    </svg>
                  </button>
                </div>
              )}
              {modifyingCategory !== category.category_id && (
                <div
                  className="border-2 border-accent w-32 h-14 p-2 shadow-accent shadow-sm text-center rounded-md overflow-hidden flex justify-center items-center"
                  onMouseOver={() => {
                    setModifyingCategory(category.category_id)
                  }}
                >
                  <h1 className="inline-block break-words overflow-hidden leading-4">
                    {category.category_name}
                  </h1>
                </div>
              )}
            </div>
          ))}
      </div>
    </>
  )
}

export default CategoryCardList
