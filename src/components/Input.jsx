const Input = ({ placeholderText, ...props }) => {
  return (
    <>
      <input className="inputField py-[0.3rem] px-2 outline-none text-lg rounded-[5px] border-2 border-black my-0 mx-2 focus:placeholder:font-bold focus:placeholder-black hover:placeholder:font-bold hover:placeholder-black" type="text" placeholder={placeholderText} {...props} />
    </>
  )
}

export default Input;