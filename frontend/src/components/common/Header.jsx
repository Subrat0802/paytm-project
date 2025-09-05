import { Link, NavLink } from "react-router-dom";
import payment from "../../assets/payment.svg";

const Header = () => {
  console.log(payment);
  return (
    <div className="w-full p-2 flex justify-between text-black ">
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
