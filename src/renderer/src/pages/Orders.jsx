import ItemsSelectPanel from '../components/order-components/ItemsSelectPanel'
import Receipt from '../components/order-components/Receipt'
import { useSelector, useDispatch } from 'react-redux'
import {
  addItem,
  editItemQty,
  removeItem,
  clearItems,
  editItemPrice
} from '../slices/currentOrderSlice'

const Orders = () => {
  const dispach = useDispatch()
  const receiptItems = useSelector((state) => state.currentOrder.value.items)

  const addItemToReceipt = (item, rate) => {
    const existingItem = receiptItems.find((receiptItem) => receiptItem.item_id === item.item_id)
    if (existingItem) {
      const updatedItem = { ...existingItem }
      updatedItem.qty += 1
      updatedItem.item_price = rate
        ? rate > 0
          ? rate
          : updatedItem.item_price
        : updatedItem.item_price
      dispach(editItemQty({ id: updatedItem.item_id, qty: updatedItem.qty }))
      dispach(editItemPrice({ id: updatedItem.item_id, price: updatedItem.item_price }))
    } else {
      const newItem = { ...item }
      newItem.qty = 1
      newItem.item_price = rate ? (rate > 0 ? rate : newItem.item_price) : newItem.item_price
      dispach(addItem(newItem))
    }
  }
  const removeItemFromReceipt = (item) => {
    dispach(removeItem(item.item_id))
  }
  const clearReceipt = () => {
    dispach(clearItems())
  }

  const increaseItemQty = (item, qtySize = 1) => {
    if (item.qty + qtySize > 99999999) return
    const qty = item.qty + qtySize
    dispach(editItemQty({ id: item.item_id, qty }))
  }
  const decreaseItemQty = (item, qtySize = 1) => {
    if (item.qty - qtySize < 1) return
    const qty = item.qty - qtySize
    dispach(editItemQty({ id: item.item_id, qty }))
  }
  const changeItemPrice = (item, price) => {
    console.log(item)
    if (price < 0 || price > 99999999) return
    dispach(editItemPrice({ id: item.item_id, price }))
  }

  return (
    <>
      {
        <div className="grid grid-cols-[0.7fr_0.3fr] bg-background h-screen w-full">
          <ItemsSelectPanel addItemToReceipt={addItemToReceipt} />
          <Receipt
            receiptItemsFunctions={{
              removeItemFromReceipt,
              clearReceipt,
              increaseItemQty,
              decreaseItemQty,
              changeItemPrice
            }}
          />
        </div>
      }
    </>
  )
}

export default Orders
