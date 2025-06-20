const dbMgr = window.api.dbMgr
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { clearItems } from '../../slices/currentOrderSlice'

const ClearReceipt = ({ onClose }) => {
  const dispatch = useDispatch()
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(clearItems())

    onClose()
  }
  const inputRef = useRef(null)
  useEffect(() => {
    inputRef.current.focus()
  }, [])

  return (
    <div
      className="w-full h-full fixed top-0 left-0 bg-gray-800 bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div
        className="bg-background text-text border-2 border-accent px-5 h-auto fixed rounded-lg shadow-gray-600 shadow-sm | top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 | flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="ml-auto align-self-end mt-2 rounded inline-flex hover:bg-accent"
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
          <h2 className="text-2xl font-bold mb-4">Clear Receipt</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">Do You Want To Clear the Receipt?</div>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="my-4 px-4 py-2 text-lg font-bold bg-background border-2 border-accent text-header-text rounded hover:text-xl transition-all"
              >
                No
              </button>
              <button
                type="submit"
                className="my-4 px-4 py-2 text-lg font-bold bg-highlight text-header-text rounded hover:text-xl transition-all"
                ref={inputRef}
              >
                Yes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ClearReceipt
