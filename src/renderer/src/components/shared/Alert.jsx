
const Alert = ({ message, visible, onClose }) => {
  return (
    <div
      className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 transition-all duration-300 ${
        visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      } bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg`}
    >
      <div className="flex items-center justify-between gap-4">
        <span>{message}</span>
        <button onClick={onClose} className="text-white font-bold">
          ×
        </button>
      </div>
    </div>
  )
}

export default Alert
