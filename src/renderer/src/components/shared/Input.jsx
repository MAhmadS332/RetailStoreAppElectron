
const Input = (props) => {
  const [value, setValue] = props.state
  return (
    <div>
      <label className={`text-${props.color.primary ? props.color.primary : 'black'}`}>
        {props.text}
      </label>
      <input
        className={`text-${props.color.secondary ? props.color.secondary : 'black'}`}
        value={value}
        onChange={(e) => {
          props.setValue(e.target.value)
        }}
      />
    </div>
  )
}

export default Input
