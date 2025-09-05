
const Input = (prop) => {
  return (
    <input className="border p-2 text-sm w-[80%]"
        placeholder={prop.placeText}
        type={prop.type}
        onChange={prop.onChange}
        name={prop.name}
        value={prop.value}
        autoComplete="off"
    />
  )
}

export default Input