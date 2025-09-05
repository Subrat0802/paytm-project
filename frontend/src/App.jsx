import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Header from "./components/common/Header"
import Signup from "./pages/Signup"
import Signin from "./pages/Signin"
 
function App() {

  return (
    <div className="w-full min-h-[100vh] bg-[#0f0f0f] flex justify-center items-center">
      <div className="text-2xl  p-2 md:rounded-md bg-white w-full lg:w-[35%] h-[100dvh] md:h-[95dvh]  overflow-y-scroll custom-scrollbar">
        <Header />
        <Routes>
          <Route path="" element={<Home />}/>
          <Route path="signup" element={<Signup />}/>
          <Route path="signin" element={<Signin />}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
