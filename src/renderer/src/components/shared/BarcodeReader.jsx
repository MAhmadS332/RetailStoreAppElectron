import React, { useEffect } from 'react'

const BarcodeReader = ({ addItemToReceipt }) => {
  const [barcode, setBarcode] = React.useState('')
  const [state, setState] = React.useState('')
  const MAX_LENGTH = 13

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Barcode submitted:', barcode)
    if (barcode === '') return
    const item = window.api.dbMgr.items.getByBarcode(barcode)
    if (item) {
      addItemToReceipt(item)
      setState('success')
    } else {
      setState('failure')
    }
    setBarcode('')
  }

  useEffect(() => {
    console.log('State changed:', state)
    setTimeout(() => {
      if (state === 'success' || state === 'failure') {
        setState('')
      }
    }, 500)
    // Clear the state after 2 seconds
  }, [state])

  return (
    <form
      onSubmit={handleSubmit}
      className="border-t-2 border-accent items-center gap-1 flex justify-end py-2"
    >
      <i
        className="justify-self-start mr-auto"
        type="button"
        title="Click The Input Box and Start Scanning Barcode (or Enter Manually)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="28px"
          viewBox="0 -960 960 960"
          width="28px"
          className="fill-text"
        >
          <path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
        </svg>
      </i>
      {state == 'success' && (
        <div className=" text-text font-bold px-2">
          <span className="text-green-500">Item Added</span>
        </div>
      )}
      {state == 'failure' && (
        <div className=" text-text font-bold px-2">
          <span className="text-red-500">No Match</span>
        </div>
      )}
      <input
        className="border border-accent bg-background box-border px-2 outline-none w-[21rem]"
        minLength={1}
        maxLength={MAX_LENGTH}
        placeholder="Scan or Enter Barcode"
        value={barcode}
        onChange={(e) => setBarcode(e.target.value)}
      />
      <button className="bg-primary text-text rounded-sm" type="submit">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="36px"
          viewBox="0 -960 960 960"
          width="36px"
          className="fill-header-text"
        >
          <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
        </svg>
      </button>
    </form>
  )
}

export default BarcodeReader
