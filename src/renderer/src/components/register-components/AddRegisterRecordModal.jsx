import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

const AddRegisterRecordModal = ({ onClose, addRecordItem }) => {
  const dispach = useDispatch()
  const categories = useSelector((state) => state.categories.value)

  const MAX_LENTGH = 30
  const MAX_PRICE = 99999999
  const [customerName, setCustomerName] = useState('')
  const [loanAmount, setLoanAmount] = useState('')
  const [debtAmount, setDebtAmount] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const newRecord = {
      customer_name: customerName,
      loan_amount: loanAmount,
      debt_amount: debtAmount,
      last_update: new Date().toLocaleDateString()
    }
    addRecordItem(newRecord)
    onClose()
  }

  return (
    <div
      className="w-full h-full fixed top-0 left-0 bg-gray-800 bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div
        className="bg-background text-text px-5 border-accent border-2 h-auto fixed rounded-lg shadow-gray-600 shadow-sm | top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 | flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="ml-auto align-self-end mt-2 rounded inline-flex hover:bg-hover"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="36px"
            viewBox="0 -960 960 960"
            width="36px"
            className="fill-text"
          >
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </svg>
        </button>
        <div>
          <h2 className="text-2xl font-bold mb-4">Add New Record</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label>Customer Name</label>
              <input
                minLength={1}
                maxLength={MAX_LENTGH}
                type="text"
                value={customerName}
                onChange={(e) =>
                  e.target.value.length <= 30 ? setCustomerName(e.target.value) : ''
                }
                className="w-full px-3 py-2 border rounded bg-transparent outline-none focus:outline-primary focus:outline-1"
                placeholder="Enter Item Name"
                required
                ref={inputRef}
              />
            </div>
            <div className="mb-4">
              <label>Loan Amount</label>
              <input
                min={0}
                max={MAX_PRICE}
                type="number"
                value={loanAmount}
                onChange={(e) => (e.target.value <= MAX_PRICE ? setLoanAmount(e.target.value) : '')}
                className="w-full px-3 py-2 border rounded bg-transparent outline-none focus:outline-primary focus:outline-1"
                placeholder="Enter Item Price"
                required
              />
            </div>
            <div className="mb-4">
              <label>Debt Amount</label>
              <input
                min={0}
                max={MAX_PRICE}
                type="number"
                value={debtAmount}
                onChange={(e) => (e.target.value <= MAX_PRICE ? setDebtAmount(e.target.value) : '')}
                className="w-full px-3 py-2 border rounded bg-transparent outline-none focus:outline-primary focus:outline-1"
                placeholder="Enter Item Quantity"
                required
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="my-4 w-full px-4 py-2 text-lg font-bold bg-highlight text-header-text rounded hover:text-xl transition-all"
              >
                Add Record
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddRegisterRecordModal
