import { useEffect, useState } from "react";
import { getUserBySearch, pay } from "../../services/operations/payment";

const MobilePayment = () => {
  const [searchText, setSearchText] = useState("");
  const [debouncedText, setDebouncedText] = useState(searchText);
  const [searchUsersData, setSearchUsersData] = useState(null);
  const [addUserForTransaction, setAddUserForTransaction] = useState(null);
  const [payInputData, setPayinputData] = useState({
    amount:"",
    message:""
  });

  console.log("addUserForTransaction", payInputData);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedText(searchText);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchText]);

  useEffect(() => {
    if (debouncedText) {
      const fetchUser = async () => {
        const response = await getUserBySearch(debouncedText);
        console.log("RESPONSE GET USER BY SEARCH", response);
        if (response.data.length !== 0) {
          setSearchUsersData(response.data);
        }
      };
      fetchUser();
    }
  }, [debouncedText]);

  const handleChange = (e) => {
    if (e.target.value === "") {
      setSearchUsersData(null);
    }
    setSearchText(e.target.value);
  };

  const onChnageAmountData = (e) => {
    const {value, name} = e.target;
    setPayinputData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleClick = (el) => {
    setAddUserForTransaction(el);
    setSearchUsersData(null);
    setSearchText("")
  };


  const handleSentMoney = async () => {
    const {amount, message} = payInputData;
    const userId = addUserForTransaction;
    try{
      await pay(amount, message, userId)
    }catch(error){
      console.log(error);
    }
  }
  return (
    <div className="min-h-[60vh] mt-3">
      <div className="flex gap-1 border-black  w-full">
        <div className="w-[85%] flex flex-col relative">
          <input
            placeholder="Mobile Number"
            value={searchText}
            onChange={(e) => handleChange(e)}
            className="w-[100%] text-sm p-2 border border-black "
            type="number"
          />
          {searchText !== "" && (
            <div className="border bg-white/80 rounded-md ">
              {searchUsersData === null ? (
                <p className="text-sm">Loading..</p>
              ) : (
                <div>
                  {searchUsersData.map((el) => (
                    <p
                      onClick={() => handleClick(el)}
                      className="text-sm border cursor-pointer p-2 hover:text-white hover:bg-black 
                                transition-all duration-100"
                      key={el._id}
                    >
                      {el.email}
                    </p>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        <button
          className="bg-black text-sm text-white p-2 h-fit w-[18%] border border-black hover:bg-black/90
        transition-all duration-200"
        >
          Search
        </button>
      </div>

      <div>
        {addUserForTransaction === null ? (
          <div></div>
        ) : (
          <div>
            {
              <div className="text-sm mt-4 relative h-[40vh] flex flex-col border">
                <p className="text-md font-bold">{addUserForTransaction.firstName}</p>
                <p>{addUserForTransaction.email}</p>
                <input placeholder="Amount" className="border p-2 mt-2" onChange={(e) => onChnageAmountData(e)}
                name="amount" value={payInputData.amount}
                />
                <input placeholder="Message" className="border p-2 mt-2" onChange={(e) => onChnageAmountData(e)}
                name="message" value={payInputData.message}/>

                <button className="absolute bottom-0 w-full p-2 font-bold hover:bg-green-600 transition-all 
                duration-200 bg-green-800" onClick={handleSentMoney}>Send</button>
              </div>
            }
          </div>
        )}
      </div>
    </div>
  );
};

export default MobilePayment;
