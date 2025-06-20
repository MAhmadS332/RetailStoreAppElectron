import { useEffect, useRef, useState } from 'react'

import { addCategory } from '../../slices/categoriesSlice'
import { useDispatch } from 'react-redux'
import { reloadItems } from '../../slices/itemsSlice'

const AddCategoryCard = ({ customEditCategory, editingCategory }) => {
  const dispach = useDispatch()

  const [categoryName, setCategoryName] = useState('')

  const inputRef = useRef(null)
  const MAX_LENTGH = 30

  useEffect(() => {
    if (editingCategory) {
      setCategoryName(editingCategory.category_name)
    }
    inputRef.current.focus()
  }, [editingCategory])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (editingCategory) {
      customEditCategory(editingCategory.category_id, categoryName)
      setCategoryName('')
      dispach(reloadItems())
      return
    }

    dispach(addCategory(categoryName))
    setCategoryName('')
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="border-t-2 border-accent fixed bottom-0 gap-1 flex justify-center w-full py-4"
      >
        <input
          className="border border-accent bg-background px-2 py-1 outline-none w-[21rem]"
          minLength={1}
          maxLength={MAX_LENTGH}
          placeholder="Enter New Category"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          ref={inputRef}
        />
        <button className="bg-primary text-text px-2 py-1" type="submit">
          {editingCategory === null ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="36px"
              viewBox="0 -960 960 960"
              width="36px"
              className="fill-header-text"
            >
              <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="36px"
              viewBox="0 -960 960 960"
              width="36px"
              className="fill-header-text"
            >
              <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
            </svg>
          )}
        </button>
      </form>
    </>
  )
}

export default AddCategoryCard
