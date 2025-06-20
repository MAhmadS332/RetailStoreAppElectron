import React, { useEffect, useState } from 'react'
import ItemCard from './ItemCard'
import CategoryCard from './CategoryCard'
import SearchBox from '../shared/SearchBox'
import { useSelector } from 'react-redux'
import BarcodeReader from '../shared/BarcodeReader'

const ItemsSelectPanel = ({ addItemToReceipt }) => {
  const items = useSelector((state) => state.items.value)
  const categories = useSelector((state) => state.categories.value)

  const [categorizedItems, setCategorizedItems] = useState(items)
  const [searchedItems, setSearchedItems] = useState(items)

  //category state
  const [selectedCategory, setSelectedCategory] = useState('')

  const selectCategory = (name) => {
    setSelectedCategory(name)
    if (name === '') {
      setCategorizedItems(items)
    } else {
      const categorizedItems = items.filter((item) => item.category_name === name)
      setCategorizedItems(categorizedItems)
    }
  }
  useEffect(() => {
    searchHandler(search)
  }, [categorizedItems])

  useEffect(() => {
    selectCategory(selectedCategory)
  }, [items])

  //search state
  const [search, setSearch] = useState('')
  const searchHandler = (searchText) => {
    setSearch(searchText)
    if (searchText === '') {
      setSearchedItems(categorizedItems)
    } else {
      const items = categorizedItems.filter((item) =>
        item.item_name.toLowerCase().includes(searchText.toLowerCase())
      )
      setSearchedItems(items)
    }
  }

  const clearAll = () => {
    setSearch('')
    selectCategory('')
    setCategorizedItems(items)
    setSearchedItems(items)
  }

  return (
    <div className="m-3 grid grid-rows-[0.1fr_0.1fr_0.8fr] overflow-hidden">
      <div className="flex items-center justify-end gap-1 ml-auto">
        <SearchBox search={search} searchHandler={searchHandler} allowAutoFocus={false} />
        <button onClick={clearAll} title="Clear All Filters">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="28px"
            className="fill-text hover:fill-highlight"
          >
            <path d="m592-481-57-57 143-182H353l-80-80h487q25 0 36 22t-4 42L592-481ZM791-56 560-287v87q0 17-11.5 28.5T520-160h-80q-17 0-28.5-11.5T400-200v-247L56-791l56-57 736 736-57 56ZM535-538Z" />
          </svg>
        </button>
      </div>
      <div className="rounded-md flex items-center gap-2 mx-5 overflow-x-auto overflow-y-hidden">
        {categories && categories.length === 0 && (
          <div className="text-text flex items-center text-center justify-center w-full">
            No categories found
          </div>
        )}
        {categories &&
          categories.length > 0 &&
          categories.map((category) => (
            <CategoryCard
              key={category.category_id}
              category={category}
              selectedCategory={selectedCategory}
              selectCategory={selectCategory}
            />
          ))}
      </div>
      <div className="bg-background p-2 flex flex-col">
        <div className="flex flex-wrap items-start gap-2 mx-3 overflow-y-auto overflow-x-hidden">
          {searchedItems && searchedItems.length === 0 && (
            <div className="text-text text-center w-full">
              No items found for the search criteria
            </div>
          )}
          {searchedItems &&
            searchedItems.length !== 0 &&
            searchedItems.map((item) => (
              <ItemCard key={item.item_id} addItemToReceipt={addItemToReceipt} item={item} />
            ))}
        </div>
      </div>
      <BarcodeReader addItemToReceipt={addItemToReceipt} />

      {/* <div className="text-text p-0.5 flex justify-center gap-5 text-xs">
        <span>
          <span className="font-bold">{selectedCategory === '' ? 'All' : selectedCategory}</span>{' '}
          Items
        </span>
        <span>{searchedItems.length} Items</span>
      </div> */}
    </div>
  )
}

export default ItemsSelectPanel
