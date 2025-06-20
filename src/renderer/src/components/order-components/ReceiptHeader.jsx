import React, { useState } from 'react'
import ClearReceipt from '../order-components/ClearReceipt'

const ReceiptHeader = ({ orderDate }) => {
  const [clearReceiptDialouge, setClearReceiptDialouge] = useState(false)
  return (
    <div className="flex justify-between items-center p-2 border-b-2 border-accent bg-background">
      <div className=" text-text">
        <div className="font-bUbuntu text-lg lg:text-xl">Order</div>
        <div className="italic text-sm">{orderDate}</div>
      </div>
      <button
        className="p-1 bg-red-500 hover:bg-red-700"
        onClick={() => setClearReceiptDialouge(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="20px"
          viewBox="0 -960 960 960"
          width="18px"
          className="fill-header-text"
        >
          <path d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z" />
        </svg>
      </button>
      {clearReceiptDialouge && <ClearReceipt onClose={() => setClearReceiptDialouge(false)} />}
    </div>
  )
}

export default ReceiptHeader
