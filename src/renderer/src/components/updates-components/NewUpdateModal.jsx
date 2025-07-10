import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const NewUpdateModal = ({ onClose }) => {
  const navigate = useNavigate()
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const handleCheckUpdate = () => {
    onClose()
    navigate('/updates')
  }

  return (
    <div
      className="w-full h-full fixed top-0 left-0 bg-gray-800 bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div
        className="bg-background text-text px-5 border-accent border-2 h-auto fixed rounded-lg shadow-gray-600 shadow-sm | top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 | flex flex-col categorys-center justify-center"
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
          <h2 className="text-2xl font-bold mb-4">New Update Available</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault()
            }}
          >
            <div className="mb-4">
              There is a new update available for the application. Would you like to check it out
              now?
            </div>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="my-4 px-4 py-2 text-lg font-bold bg-background border-2 border-accent text-text rounded hover:text-xl transition-all"
              >
                Remind Me Later
              </button>
              <button
                onClick={handleCheckUpdate}
                className="my-4 px-4 py-2 text-lg font-bold bg-highlight text-header-text rounded hover:text-xl transition-all"
                ref={inputRef}
              >
                Check It Out
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default NewUpdateModal
