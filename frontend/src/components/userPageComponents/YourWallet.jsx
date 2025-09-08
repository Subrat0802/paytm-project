import useGetUser from "../../services/hooks/getuser";


const YourWallet = () => {
  const { user } = useGetUser();
  return (
    <div>
      {
        <p className="text-lg font-bold font-mono">Balance :{user !== null && Math.round(user.account.balance)/10} Rs</p>
      }
      <div>

      </div>
    </div>
  )
}

export default YourWallet