import { useEffect, useState } from "react";
import { getUserBySearch } from "../../services/operations/payment";

const MobilePayment = () => {
  const [searchText, setSearchText] = useState("");
  const [debouncedText, setDebouncedText] = useState(searchText);
  const [searchUsersData, setSearchUsersData] = useState(null);

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
        if(response.data.length !== 0) {
            setSearchUsersData(response.data);
        }
      };
      fetchUser();
    }
  }, [debouncedText]);

  const handleChange = (e) => {
    if(e.target.value === ""){
        setSearchUsersData(null);
    }
    setSearchText(e.target.value);
  };

  const handleClick = () => {
    
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
                {
                    searchUsersData === null ? <p className="text-sm">Loading..</p> : <div>
                        {
                            searchUsersData.map((el, id) => (
                                <p onClick={handleClick} className="text-sm border cursor-pointer p-2 hover:text-white hover:bg-black 
                                transition-all duration-100" key={id}>{el.email}</p>
                            ))
                        }
                    </div>
                    
                }
            </div>
          )}
        </div>
        <button
          className="bg-black text-sm text-white p-2 h-fit w-[18%] border border-black hover:bg-black/90
        transition-all duration-200"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default MobilePayment;
