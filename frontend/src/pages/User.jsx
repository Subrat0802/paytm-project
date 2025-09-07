import { useEffect } from "react";
import useGetUser from "../services/hooks/getuser";
import { ArrowLeftRight, Gamepad, Mail, Share, Wallet } from "lucide-react";
// import WhackAMole from "../components/ui/Whackamole";

const User = () => {
  const { user, refreshUser } = useGetUser();

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
        <div className="flex justify-between items-center flex-col">
          <div className="bg-blue-300 p-3 rounded-xl">
            <Share />
          </div>
          <p>Pay to mobile</p>
        </div>
        <div className="flex justify-between items-center flex-col">
          <div className="bg-blue-300 p-3 rounded-xl">
            <Mail />
          </div>
          <p>Pay to mailid</p>
        </div>
        <div className="flex justify-between items-center flex-col">
          <div className="bg-blue-300 p-3 rounded-xl">
            <Wallet />
          </div>
          <p>Your wallet</p>
        </div>

        <div className="flex justify-between items-center flex-col">
          <div className="bg-blue-300 p-3 rounded-xl">
            <Gamepad />
          </div>
          <p>Games</p>
        </div>
        <div className="flex justify-between items-center flex-col">
          <div className="bg-blue-300 p-3 rounded-xl">
            <ArrowLeftRight />
          </div>
          <p>All transactions</p>
        </div>
      </div>

      {/* <WhackAMole /> */}
    </div>
  );
};

export default User;
