import { useState } from "react"
import Input from "../components/ui/Input"

const Signin = () => {
  const [signinData, setSigninData] = useState({
    email:"",
    password:""
  })

  const handleChange = (e) => {
    setSigninData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleClick = () => {

  }
  return (
    <div className="flex flex-col justify-center items-center min-h-[75vh] w-full">
      <div className="mb-5">
        <p>Sign in</p>
      </div>
      <div className="flex flex-col gap-3 w-full justify-center items-center">
        <Input placeText={"Email"} type={"text"} name={"email"} value={signinData.email} onChange={(e) => handleChange(e)}/>
        <Input placeText={"Password"} type={"password"} onChange={(e) => handleChange(e)} name={"password"} value={signinData.password}/>
        <button onClick={handleClick} className="bg-black text-white p-2 mt-2 text-lg w-[80%] hover:bg-[#242323] transition-all duration-200">Signup</button>
      </div>
    </div>
  )
}

export default Signin