import React from 'react'
import ReceiptItems from './ReceiptItems'
import ReceiptTotal from './ReceiptTotal'
import ReceiptHeader from './ReceiptHeader'
import { useDispatch, useSelector } from 'react-redux'
import { reduceItemQty, reloadItems } from '../../slices/itemsSlice'
import { newOrder } from '../../slices/currentOrderSlice'
import toast from 'react-hot-toast'

const Receipt = ({ receiptItemsFunctions }) => {
  const dispatch = useDispatch()
  const settings = useSelector((state) => state.settings.value)
  const order = useSelector((state) => state.currentOrder.value)

  const executeOrder = (orderItems) => {
    // This function can be used to execute the order, e.g., save it to the database
    // For now, we will just log the items to the console
    orderItems.forEach((item) => {
      dispatch(reduceItemQty({ id: item.item_id, qty: item.qty }))
    })
    dispatch(reloadItems())
    dispatch(newOrder())
    toast.success('Order Successful, Receipt Saved!')
  }

  const generateReceipt = async (settings, order) => {
    if (order.items.length === 0) {
      toast.error('No items in the order!')
      return
    }

    const response = await window.api.generatePdf(settings, order)

    if (!response) return
    await window.api.printPdf(response)

    executeOrder(order.items)
  }

  return (
    <div className="m-3 grid select-none text-text bg-background grid-rows-[0.1fr_0.71fr_0.28fr_0.01fr] border-l-2 border-accent overflow-hidden">
      <ReceiptHeader orderDate={order.date} />
      <ReceiptItems receiptItemsFunctions={receiptItemsFunctions} />
      <ReceiptTotal />
      <button
        // onClick={() => setShowReceipt(true)}
        onClick={() => generateReceipt(settings, order)}
        className="p-2 text-md lg:text-lg font-bUbuntu bg-highlight shadow-md shadow-gray-500 text-header-text hover:opacity-90"
      >
        Proceed to Checkout
      </button>
    </div>
  )
}

export default Receipt
