import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editDetails } from '../../slices/currentOrderSlice'

const ReceiptTotal = () => {
  const receiptItems = useSelector((state) => state.currentOrder.value.items)
  const settings = useSelector((state) => state.settings.value)
  const CURRENCY = settings[1].setting_value
  const dispatch = useDispatch()

  const details = useSelector((state) => state.currentOrder.value.details)

  const [subTotal, setSubTotal] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [amountPaid, setAmountPaid] = useState(0)

  const listStyle = 'grid grid-cols-2 text-sm lg:text-base xl:text-lg'
  const headerStyle = 'px-2 font-bUbuntu text-sm lg:text-base xl:text-lg'
  const dataStyle = 'px-2 font-bUbuntu text-right text-sm lg:text-base xl:text-lg'
  const inputStyle =
    'text-right bg-background border-2 border-accent text-text rounded-sm mx-2 px-1 text-sm lg:text-base xl:text-lg outline-none text-primary focus:outline-1 focus:outline-background'

  useEffect(() => {
    dispatch(editDetails({ subTotal, discount, amountPaid }))
  }, [subTotal, discount, amountPaid])

  useEffect(() => {
    if (
      subTotal == details.subTotal &&
      discount == details.discount &&
      amountPaid == details.amountPaid
    )
      return
    // If the details are already set, we don't need to update them again

    setSubTotal(details.subTotal)
    setDiscount(details.discount)
    setAmountPaid(details.amountPaid)
  }, [details])

  useEffect(() => {
    let subTotal = 0
    receiptItems.forEach((item) => {
      subTotal += item.qty * item.item_price
    })
    setSubTotal(subTotal)
  }, [receiptItems, discount])

  return (
    <ul className="overflow-hidden p-1 flex flex-col justify-center border-t-2 border-accent">
      <li className={listStyle}>
        <div className={headerStyle}>Sub Total</div>
        <div className={dataStyle}>{subTotal}</div>
      </li>
      <li className={listStyle}>
        <div className={headerStyle}>Discount</div>
        <input
          type="number"
          className={inputStyle}
          placeholder="Enter Discount"
          value={discount}
          onClick={(e) => e.target.select()}
          min={0}
          onChange={(e) => setDiscount(e.target.value)}
        />
      </li>
      <li className={listStyle}>
        <div className={headerStyle}>
          <span className="text-md lg:text-xl xl:text-2xl">Total</span>
        </div>
        <div className={dataStyle}>
          <span className="text-md md:text-lg lg:text-xl xl:text-2xl">
            {subTotal - (discount || 0)}
          </span>
        </div>
      </li>
      <li className={listStyle}>
        <div className={headerStyle}>Amount Paid</div>
        <input
          type="number"
          className={inputStyle}
          placeholder="Enter Amount "
          value={amountPaid}
          onClick={(e) => e.target.select()}
          onChange={(e) => setAmountPaid(e.target.value)}
        />
      </li>
      <li className={listStyle}>
        <div className={headerStyle}>Change</div>
        <div className={dataStyle}>{(amountPaid || 0) - (subTotal - (discount || 0))}</div>
      </li>
    </ul>
  )
}

export default ReceiptTotal
