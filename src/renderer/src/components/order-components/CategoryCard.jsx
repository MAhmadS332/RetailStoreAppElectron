import React from 'react'

const CategoryCard = ({ category, selectedCategory, selectCategory }) => {
  return (
    <button
      className={`text-center text-sm max-h-8 whitespace-nowrap w-auto lg:text-base xl:text-lg rounded-md  py-1 px-2 font-bold ${selectedCategory === category.category_name ? 'bg-highlight text-background hover:bg-red-500' : 'bg-background text-text  hover:bg-accent'} border  border-accent `}
      onClick={() => {
        if (selectedCategory === category.category_name) {
          selectCategory('')
        } else {
          selectCategory(category.category_name)
        }
      }}
    >
      {category.category_name}
    </button>
  )
}

export default CategoryCard
