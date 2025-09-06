import { Link, NavLink } from "react-router-dom";
import payment from "../../assets/payment.svg";
import useGetUser from "../../services/hooks/getuser";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setLoggedIn } from "../../services/redux/slice/auth";

const Header = () => {
  const dispatch = useDispatch();
    
    const {user} = useGetUser();

    useEffect(() => {
      if(user){
        dispatch(setLoggedIn(true))
      }
    },[dispatch, user]);
    
  return (
    <div className="w-full p-4 flex justify-between text-black ">
      <NavLink to={"/"}><div className="flex justify-center space-x-1 items-center">
        <img src={payment} alt="payment" className="h-8 w-auto" />
        <p className="italic font-bold  ">
          Pay
        </p>
      </div></NavLink>

      <div className="space-x-2 text-sm flex justify-center items-center">
        <Link to={"/signup"}><button className="bg-black px-3 py-2 text-white hover:bg-[#3b3b3b] transition-all duration-200">Signup</button></Link>
        <Link to={"/signin"}><button className="bg-black px-3 py-2 text-white hover:bg-[#3b3b3b] transition-all duration-200">Signup</button></Link>
      </div>

    </div>
  );
};

export default Header;
