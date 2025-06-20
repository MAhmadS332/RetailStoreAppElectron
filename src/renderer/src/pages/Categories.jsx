import { useState } from 'react'
import AddCategoryCard from '../components/categories-components/AddCategoryCard'
import CategoryCardList from '../components/categories-components/CategoryCardList'

import { editCategory } from '../slices/categoriesSlice'
import { useDispatch } from 'react-redux'

const Categories = () => {
  const dispach = useDispatch()
  const [editingCategory, setEditingCategory] = useState(null)

  const customEditCategory = (id, newName) => {
    if (newName === '') {
      setEditingCategory(null)
      return
    }
    dispach(editCategory({ id, newName }))
    setEditingCategory(null)
  }
  return (
    <div>
      <CategoryCardList setEditingCategory={setEditingCategory} />
      <AddCategoryCard editingCategory={editingCategory} customEditCategory={customEditCategory} />
    </div>
  )
}

export default Categories
