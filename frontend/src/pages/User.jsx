import { useEffect, useState } from "react";
import useGetUser from "../services/hooks/getuser";
import { ArrowLeftRight, Gamepad, Mail, Share, Wallet } from "lucide-react";
import MobilePayment from "../components/userPageComponents/MobilePayment";
import MailidPayment from "../components/userPageComponents/MailidPayment";
import YourWallet from "../components/userPageComponents/YourWallet";
import Games from "../components/userPageComponents/Games";
import Transactions from "../components/userPageComponents/Transactions";

// import WhackAMole from "../components/ui/Whackamole";

const User = () => {
  const { user, refreshUser } = useGetUser();
  const [activeTab, setActiveTab] = useState("mobile");

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  return (
    <div className="p-2 min-h-[86vh]">
      <div className="text-lg">
        {user ? (
          <>
            <p className="font-bold">
              Hello, {user.firstName} {user.lastName}
            </p>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>

      <div className="flex gap-4 flex-wrap justify-between px-3 items-center text-xs mt-8 font-semibold">
        <div
          className="flex justify-between items-center flex-col"
          onClick={() => setActiveTab("mobile")}
        >
          <div className="bg-blue-300 p-3 rounded-xl">
            <Share />
          </div>
          <p>Pay to mobile</p>
        </div>
        <div
          className="flex justify-between items-center flex-col"
          onClick={() => setActiveTab("mailid")}
        >
          <div className="bg-blue-300 p-3 rounded-xl">
            <Mail />
          </div>
          <p>Pay to mailid</p>
        </div>
        <div
          className="flex justify-between items-center flex-col"
          onClick={() => setActiveTab("wallet")}
        >
          <div className="bg-blue-300 p-3 rounded-xl">
            <Wallet />
          </div>
          <p>Your wallet</p>
        </div>

        <div
          className="flex justify-between items-center flex-col"
          onClick={() => setActiveTab("games")}
        >
          <div className="bg-blue-300 p-3 rounded-xl">
            <Gamepad />
          </div>
          <p>Games</p>
        </div>
        <div
          className="flex justify-between items-center flex-col"
          onClick={() => setActiveTab("transaction")}
        >
          <div className="bg-blue-300 p-3 rounded-xl">
            <ArrowLeftRight />
          </div>
          <p>All transactions</p>
        </div>
      </div>

      {/* <WhackAMole /> */}

      {activeTab === "mobile" && <div
        className={`overflow-hidden transition-all duration-500 ease-in-out mt-5 rounded-lg min-h-[65dvh] bg-gray-100 ${
          activeTab === "mobile"
            ? "max-h-40 opacity-100 p-4"
            : "max-h-0 opacity-0 p-0"
        }`}
      >
        <MobilePayment />
      </div>}

      {activeTab === "mailid" && <div
        className={`overflow-hidden transition-all duration-500 ease-in-out mt-5 rounded-lg min-h-[65dvh] bg-gray-100  ${
          activeTab === "mailid"
            ? "max-h-40 opacity-100 p-4"
            : "max-h-0 opacity-0 p-0"
        }`}
      >
        <MailidPayment />
      </div>}

      {activeTab === "wallet" && <div
        className={`overflow-hidden transition-all duration-500 ease-in-out mt-5 rounded-lg min-h-[65dvh] bg-gray-100 ${
          activeTab === "wallet"
            ? "max-h-40 opacity-100 p-4"
            : "max-h-0 opacity-0 p-0"
        }`}
      >
        <YourWallet />
      </div>}

      { activeTab === "games" && <div
        className={`overflow-hidden transition-all duration-500 ease-in-out mt-5 rounded-lg min-h-[65dvh] bg-gray-100 ${
          activeTab === "games"
            ? "max-h-40 opacity-100 p-4"
            : "max-h-0 opacity-0 p-0"
        }`}
      >
        <Games />
      </div>}

      {activeTab === "transaction" && <div
        className={`overflow-hidden transition-all duration-500 ease-in-out mt-5 rounded-lg min-h-[65dvh] bg-gray-100 ${
          activeTab === "transaction"
            ? "max-h-40 opacity-100 p-4"
            : "max-h-0 opacity-0 p-0"
        }`}
      >
        <Transactions />
      </div>}
    </div>
  );
};

export default User;
