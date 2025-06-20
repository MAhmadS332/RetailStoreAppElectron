import { useEffect, useRef } from 'react'

const SearchBox = ({
  search,
  searchHandler,
  className,
  placeholder = 'Search Items',
  allowAutoFocus = true
}) => {
  const inputRef = useRef(null)

  useEffect(() => {
    // Event listener to handle key presses
    const handleKeyPress = () => {
      // Check if no other input is focused
      if (allowAutoFocus && document.activeElement === document.body && inputRef.current) {
        inputRef.current.focus() // Focus on the input field
      }
    }

    // Attach the event listener
    document.addEventListener('keydown', handleKeyPress)

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [])

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className={
        className +
        ' flex justify-center px-1.5 items-center gap-1 border-2 rounded-lg bg-background border-accent'
      }
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="20px"
        className="fill-text"
      >
        <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
      </svg>
      <input
        type="text"
        ref={inputRef}
        placeholder={placeholder}
        value={search}
        onChange={(e) => {
          searchHandler(e.target.value)
        }}
        className="p-1 lg:w-96 text-sm lg:text-base font-Ubuntu rounded-lg bg-transparent outline-none focus:outline-none text-text box-border"
      />
      <button title="Clear Search" type="button" onClick={() => searchHandler('')}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          className="fill-text"
        >
          <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
        </svg>
      </button>
    </form>
  )
}

export default SearchBox
