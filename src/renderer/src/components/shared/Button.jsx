
const Button = (props) => {
  return (
    <button
      className={`flex items-center justify-center border rounded-sm p-2 ${props.className ? props.className : 'text-white border-white'}`}
      type={props.type ? props.type : ''}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  )
}

export default Button
