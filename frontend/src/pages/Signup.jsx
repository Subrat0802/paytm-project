import { useState } from "react";
import Input from "../components/ui/Input";
import { signup } from "../services/operations/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Signup = () => {
  const navigate = useNavigate();
  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber:"",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setSignupData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value
    }))
  }

  const handleClick = async () => {
    const { firstName, lastName, email, phoneNumber, password, confirmPassword } = signupData;
    if(password !== confirmPassword){
      toast.error("Password do not match")
    }
    const response = await signup(firstName, lastName, email, Number(phoneNumber), password);
    if(response){
      navigate("/signin")
    }
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-[75vh] w-full">
      <div className="mb-5">
        <p>Sign up</p>
      </div>
      <div className="flex flex-col gap-3 w-full justify-center items-center">
        <Input placeText={"First Name"} type={"text"} name={"firstName"} value={signupData.firstName} onChange={(e) => handleChange(e)}/>
        <Input placeText={"Last Name"} type={"text"} name={"lastName"} value={signupData.lastName} onChange={(e) => handleChange(e)}/>
        <Input placeText={"Email"} type={"text"} name={"email"} value={signupData.email} onChange={(e) => handleChange(e)}/>
        <Input placeText={"Phone Number"} type={"number"} onChange={(e) => handleChange(e)} name={"phoneNumber"} value={signupData.phoneNumber}/>
        <Input placeText={"Password"} type={"password"} onChange={(e) => handleChange(e)} name={"password"} value={signupData.password}/>
        <Input placeText={"Confirm Password"} type={"password"} onChange={(e) => handleChange(e)} name={"confirmPassword"} value={signupData.confirmPassword}/>
        <button onClick={handleClick} className="bg-black text-white p-2 mt-2 text-lg w-[80%] hover:bg-[#242323] transition-all duration-200">Signup</button>
      </div>
    </div>
  );
};

export default Signup;
