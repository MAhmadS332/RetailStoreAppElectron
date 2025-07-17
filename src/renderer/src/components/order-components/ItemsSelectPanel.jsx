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
  const [listView, setListView] = useState(false)

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
    <div className="m-1 grid grid-rows-[0.1fr_0.1fr_0.8fr] overflow-hidden">
      <div className="flex items-center justify-end gap-2 ml-auto">
        <SearchBox search={search} searchHandler={searchHandler} allowAutoFocus={false} />
        <button
          title={listView ? 'Enable Grid View' : 'Enable List View'}
          onClick={() => setListView(!listView)}
        >
          {listView ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="28px"
              viewBox="0 -960 960 960"
              width="28px"
              className="fill-text hover:fill-highlight"
            >
              <path d="M120-520v-320h320v320H120Zm0 400v-320h320v320H120Zm400-400v-320h320v320H520Zm0 400v-320h320v320H520ZM200-600h160v-160H200v160Zm400 0h160v-160H600v160Zm0 400h160v-160H600v160Zm-400 0h160v-160H200v160Zm400-400Zm0 240Zm-240 0Zm0-240Z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="28px"
              viewBox="0 -960 960 960"
              width="28px"
              className="fill-text hover:fill-highlight"
            >
              <path d="M360-240h440v-107H360v107ZM160-613h120v-107H160v107Zm0 187h120v-107H160v107Zm0 186h120v-107H160v107Zm200-186h440v-107H360v107Zm0-187h440v-107H360v107ZM160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Z" />
            </svg>
          )}
        </button>
        <button onClick={clearAll} title="Clear All Filters">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="28px"
            viewBox="0 -960 960 960"
            width="28px"
            className="fill-text hover:fill-highlight"
          >
            <path d="m592-481-57-57 143-182H353l-80-80h487q25 0 36 22t-4 42L592-481ZM791-56 560-287v87q0 17-11.5 28.5T520-160h-80q-17 0-28.5-11.5T400-200v-247L56-791l56-57 736 736-57 56ZM535-538Z" />
          </svg>
        </button>
      </div>
      <div className="rounded-md flex items-center  gap-2 mx-5 overflow-x-auto overflow-y-hidden select-none">
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
      <div className="bg-background p-2 flex flex-col items-center overflow-y-auto overflow-x-hidden select-none">
        <div className={`flex flex-wrap items-center m-3 gap-0 ${listView ? 'w-full ' : ''}`}>
          {searchedItems && searchedItems.length === 0 && (
            <div className="text-text text-center w-full">
              No items found for the search criteria
            </div>
          )}
          {searchedItems &&
            searchedItems.length !== 0 &&
            searchedItems.map((item) => (
              <ItemCard
                key={item.item_id}
                addItemToReceipt={addItemToReceipt}
                item={item}
                listView={listView}
              />
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
